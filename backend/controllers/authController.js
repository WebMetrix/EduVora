import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool, { sql } from "../config/db.js";
import "dotenv/config"
import { OAuth2Client } from 'google-auth-library';
import crypto from 'crypto';
import logger from '../utils/logger.js';

// Initialize the Google Client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


// Register User
export const registerUser = async (req, res) => {
    let { fullName, emailAddress, mobileNumber, password, referralCode } = req.body;

    try {
        // 1. Generate core identifiers
        const userUUID = crypto.randomUUID();
        const derivedUsername = emailAddress.split('@')[0] + Math.floor(1000 + Math.random() * 9000);
        const derivedUserID = 'USR-' + crypto.randomBytes(4).toString('hex').toUpperCase();


        // 2. Hash Password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        // 3. Pre-sign JWT (since we already generated the UUID)
        let token = jwt.sign({ id: userUUID, email: emailAddress }, process.env.JWT_SECRET, { expiresIn: '1d' });
        let dbSessionId = crypto.randomUUID();

        // 4. Execute Stored Procedure
        const request = pool.request();
        request.input('UUID', sql.VarChar(36), userUUID);
        request.input('FullName', sql.VarChar(100), fullName);
        request.input('EmailAddress', sql.VarChar(150), emailAddress);
        request.input('MobileNumber', sql.VarChar(20), mobileNumber || null);
        request.input('Password', sql.VarChar(255), hash);
        request.input('ReferralCode', sql.VarChar(50), referralCode || null);
        request.input('SessionId', sql.VarChar(255), dbSessionId);
        request.input('SignupMethod', sql.VarChar(50), '1');    // 1 = Standard
        request.input('UserID', sql.VarChar(100), derivedUserID);
        request.input('Username', sql.VarChar(50), derivedUsername);
        request.input('RoleID', sql.Int, 3); // 3 = User

        request.output('Result', sql.Int);

        const result = await request.execute('dbo.EV_CreateUser');
        const procResult = result.output.Result;

        // 5. Handle SP Outputs
        if (procResult === -1) return res.status(400).send({ message: 'User already exists with this email or mobile' });
        if (procResult === -2) return res.status(400).send({ message: 'Username or UserID already taken' });
        if (procResult === 0) return res.status(500).send({ message: 'System error during registration' });

        // 6. Set Cookie & Respond on Success (Result === 1)
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000
        });

        // The frontend will use this token payload to save to sessionStorage
        res.status(200).send({ message: 'User registered successfully', token });

    } catch (err) {
        logger.error(`REGISTER ERROR: ${err.message}`, { stack: err.stack });
        res.status(400).send({ message: 'Something went wrong' });
    }
};



// Logout User
export const logoutUser = async (req, res) => {
    try {
        // Clear SessionId from database upon logout
        if (req.user && req.user.id) {
            const clearSessionRequest = pool.request();
            clearSessionRequest.input('UUID', sql.VarChar(36), req.user.id);

            await clearSessionRequest.query(`
                UPDATE dbo.Tb_User 
                SET SessionId = NULL 
                WHERE UUID = @UUID
            `);
        }
        res.clearCookie('token', { sameSite: 'none', secure: false });
        // res.redirect('/login');
        res.status(200).send({ message: 'Logged out successfully' });
    } catch (err) {
        logger.error(`LOGOUT ERROR: ${err.message}`, { stack: err.stack });
        res.status(500).send({ message: 'Something went wrong during logout' });
    }


};



// Login User
export const loginUser = async (req, res) => {
    let { emailAddress, password } = req.body;

    try {
        // 1. Execute Login Stored Procedure
        const request = pool.request();
        request.input('Email', sql.VarChar(150), emailAddress);
        request.output('Result', sql.Int);

        const result = await request.execute('dbo.EV_LogIn');
        const procResult = result.output.Result;

        // 2. Handle SP Outputs
        if (procResult === -1) return res.status(400).send({ message: 'Invalid credentials or user not found' });
        if (procResult === -2) return res.status(403).send({ message: 'Account is inactive. Please contact support.' });

        // 3. User found, validate password
        const user = result.recordset[0];
        const isMatch = await bcrypt.compare(password, user.Password);

        if (!isMatch) {
            return res.status(400).send({ message: 'Invalid credentials' });
        }

        // 4. Sign JWT 
        let token = jwt.sign({ id: user.UUID, email: user.EmailAddress }, process.env.JWT_SECRET, { expiresIn: '1d' });
        let dbSessionId = crypto.randomUUID();

        // EV_LogIn doesn't update the SessionId, so we run a quick update here
        const updateSessionReq = pool.request();
        updateSessionReq.input('SessionId', sql.VarChar(255), dbSessionId);
        updateSessionReq.input('UUID', sql.VarChar(36), user.UUID);
        await updateSessionReq.query(`UPDATE dbo.Tb_User SET SessionId = @SessionId WHERE UUID = @UUID`);

        // 5. Set Cookie & Respond
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000
        });

        res.send({
            message: 'Login successful', token, user: {
                id: user.UUID, name: user.FullName, email: user.EmailAddress, username: user.Username, role: user.RoleID
            }
        });

    } catch (err) {
        logger.error(`LOGIN ERROR: ${err.message}`, { stack: err.stack });
        res.status(500).send({ message: 'Something went wrong' });
    }
};



// Google Auth (Handles both Login & Register via Stored Procedures)
export const googleAuthUser = async (req, res) => {
    const { credential } = req.body; // The token string from Google

    try {
        // 1. Verify the Google Token
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const emailAddress = payload.email;
        const fullName = payload.name;

        // 2. Try to Log the user in using the SP
        const loginReq = pool.request();
        loginReq.input('Email', sql.VarChar(150), emailAddress);
        loginReq.output('Result', sql.Int);

        const loginResult = await loginReq.execute('dbo.EV_LogIn');
        const loginStatus = loginResult.output.Result;

        let user;

        if (loginStatus === 1) {
            // USER EXISTS: Set user data from the login SP result
            user = loginResult.recordset[0];

        } else if (loginStatus === -1) {
            // USER DOES NOT EXIST: Create them using the EV_CreateUser SP
            const userUUID = crypto.randomUUID();
            const derivedUsername = emailAddress.split('@')[0] + Math.floor(1000 + Math.random() * 9000);
            const derivedUserID = 'USR-' + crypto.randomBytes(4).toString('hex').toUpperCase();

            // Generate a random dummy password for Google users so they can't login via standard form
            const dummyPassword = crypto.randomBytes(16).toString('hex');
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(dummyPassword, salt);

            const createReq = pool.request();
            createReq.input('UUID', sql.VarChar(36), userUUID);
            createReq.input('FullName', sql.VarChar(100), fullName);
            createReq.input('EmailAddress', sql.VarChar(150), emailAddress);
            createReq.input('MobileNumber', sql.VarChar(20), null);
            createReq.input('Password', sql.VarChar(255), hash);
            createReq.input('ReferralCode', sql.VarChar(50), null);
            createReq.input('SessionId', sql.VarChar(255), null); // We will set this momentarily
            createReq.input('SignupMethod', sql.VarChar(50), '2'); // 2 = Google
            createReq.input('UserID', sql.VarChar(100), derivedUserID);
            createReq.input('Username', sql.VarChar(50), derivedUsername);
            createReq.input('RoleID', sql.Int, 3); // 3 = User
            createReq.output('Result', sql.Int);

            const createResult = await createReq.execute('dbo.EV_CreateUser');

            if (createResult.output.Result !== 1) {
                return res.status(500).send({ message: 'Failed to create Google user' });
            }

            // Set user object structure to match what login requires downstream
            user = {
                UUID: userUUID,
                FullName: fullName,
                EmailAddress: emailAddress,
                Username: derivedUsername,
                RoleID: 3
            };
        } else if (loginStatus === -2) {
            return res.status(403).send({ message: 'Account is inactive. Please contact support.' });
        }

        // 3. Sign JWT for the user (whether newly created or existing)
        let token = jwt.sign({ id: user.UUID, email: user.EmailAddress }, process.env.JWT_SECRET, { expiresIn: '1d' });
        let dbSessionId = crypto.randomUUID();

        // 4. Update the Database with the new SessionId
        const updateSessionReq = pool.request();
        updateSessionReq.input('SessionId', sql.VarChar(255), dbSessionId);
        updateSessionReq.input('UUID', sql.VarChar(36), user.UUID);
        await updateSessionReq.query(`UPDATE dbo.Tb_User SET SessionId = @SessionId WHERE UUID = @UUID`);

        // 5. Set Cookie & Respond
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(200).send({
            message: 'Google authentication successful', token, user: {
                id: user.UUID,
                name: user.FullName,
                email: user.EmailAddress,
                username: user.Username,
                role: user.RoleID
            }
        });

    } catch (err) {
        logger.error(`GOOGLE AUTH ERROR: ${err.message}`, { stack: err.stack });
        res.status(500).send({ message: 'Google authentication failed' });
    }
}