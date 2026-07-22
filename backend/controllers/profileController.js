import pool, { sql } from "../config/db.js";
import logger from '../utils/logger.js';

// Get Complete User Profile
export const getUserProfile = async (req, res) => {
    try {
        const request = pool.request();

        // Grab UUID from JWT authentication middleware
        request.input('UUID', sql.VarChar(36), req.user.id);

        const result = await request.execute('dbo.EV_GetUserProfile');

        if (result.recordset.length === 0) {
            return res.status(404).send({ message: 'User profile not found.' });
        }

        let userProfile = result.recordset[0];

        // Return the first record (since UUID is unique)
        res.status(200).send(userProfile);
    } catch (err) {
        logger.error(`GET PROFILE ERROR: ${err.message}`, { stack: err.stack });
        res.status(500).send({ message: 'Failed to fetch user profile.' });
    }
};

// Edit User Profile
export const editUser = async (req, res) => {
    // Extracting all fields from the frontend request body, including Bank details
    const {
        fullName, dateOfBirth, gender, nationality,
        // username,
        mobileNumber, whatsAppNumber, addressLine1, addressLine2,
        country, state, city, pincode,
        accountHolderName, accountNumber, bankName, branchName, ifscCode, accountType, additionalBankNotes
    } = req.body;

    const profilePicturePath = req.file ? req.file.path : null;

    try {
        const request = pool.request();

        // Ensure UUID is grabbed securely from the auth middleware
        request.input('UUID', sql.VarChar(36), req.user.id);

        // Personal & Contact Info
        request.input('FullName', sql.VarChar(100), fullName);
        // request.input('Username', sql.VarChar(50), username);
        // Username update has been disabled as per requirements
        request.input('Username', sql.VarChar(50), null);
        request.input('DateOfBirth', sql.Date, dateOfBirth || null);
        request.input('Gender', sql.VarChar(50), gender || null);
        request.input('Nationality', sql.VarChar(50), nationality || null);
        request.input('ProfilePicturePath', sql.VarChar(500), profilePicturePath || null);
        request.input('MobileNumber', sql.VarChar(20), mobileNumber || null);
        request.input('WhatsAppNumber', sql.VarChar(20), whatsAppNumber || null);

        // Address Info
        request.input('AddressLine1', sql.VarChar(255), addressLine1 || null);
        request.input('AddressLine2', sql.VarChar(255), addressLine2 || null);
        request.input('Country', sql.VarChar(100), country || null);
        request.input('State', sql.VarChar(100), state || null);
        request.input('City', sql.VarChar(100), city || null);
        request.input('Pincode', sql.VarChar(20), pincode || null);

        // Bank Info
        request.input('AccountHolderName', sql.VarChar(100), accountHolderName || null);
        request.input('AccountNumber', sql.VarChar(50), accountNumber || null);
        request.input('BankName', sql.VarChar(100), bankName || null);
        request.input('BranchName', sql.VarChar(100), branchName || null);
        request.input('IFSCCode', sql.VarChar(20), ifscCode || null);
        request.input('AccountType', sql.VarChar(50), accountType || null);
        request.input('AdditionalBankNotes', sql.VarChar(200), additionalBankNotes || null);

        request.output('Result', sql.Int);

        const result = await request.execute('dbo.EV_EditUser');
        const procResult = result.output.Result;

        if (procResult === -1) return res.status(404).send({ message: 'User not found.' });
        if (procResult === -2) return res.status(400).send({ message: 'Username is already taken.' });
        if (procResult === -3) return res.status(400).send({ message: 'Mobile number is already registered to another account.' });
        if (procResult === 0) return res.status(500).send({ message: 'System error during profile update.' });

        res.status(200).send({ message: 'Profile updated successfully.' });

    } catch (err) {
        logger.error(`EDIT PROFILE ERROR: ${err.message}`, { stack: err.stack });
        res.status(500).send({ message: 'Something went wrong while updating the profile.' });
    }
};

// Instant Profile Picture Update
export const updateProfilePicture = async (req, res) => {
    const profilePicturePath = req.file ? req.file.path : null;

    if (!profilePicturePath) {
        return res.status(400).send({ message: 'No image provided.' });
    }

    try {
        const request = pool.request();
        request.input('UUID', sql.VarChar(36), req.user.id);
        request.input('ProfilePicturePath', sql.VarChar(500), profilePicturePath);

        await request.execute('dbo.EV_UpdateProfilePicture');

        res.status(200).send({ 
            message: 'Profile picture updated successfully.',
            profilePicturePath: profilePicturePath
        });

    } catch (err) {
        logger.error(`UPDATE PICTURE ERROR: ${err.message}`, { stack: err.stack });
        res.status(500).send({ message: 'Something went wrong while updating the picture.' });
    }
};

// Check Username Availability
export const checkUsername = async (req, res) => {
    const { username } = req.body;

    if (!username) return res.status(400).send({ message: 'Username is required.' });

    try {
        const request = pool.request();
        request.input('Username', sql.VarChar(50), username);
        request.output('IsAvailable', sql.Bit);

        const result = await request.execute('dbo.EV_CheckUsernameAvailability');
        const isAvailable = result.output.IsAvailable;

        // sql.Bit is typically parsed as a boolean (true/false) by the mssql driver
        res.status(200).send({ isAvailable: isAvailable === true || isAvailable === 1 });
    } catch (err) {
        logger.error(`CHECK USERNAME ERROR: ${err.message}`, { stack: err.stack });
        res.status(500).send({ message: 'Error checking username availability.' });
    }
};

// Get Genders Dropdown
export const getGenders = async (req, res) => {
    try {
        const result = await pool.request().execute('dbo.EV_GetGenders');
        res.status(200).send(result.recordset);
    } catch (err) {
        logger.error(`GET GENDERS ERROR: ${err.message}`, { stack: err.stack });
        res.status(500).send({ message: 'Failed to fetch genders.' });
    }
};

// Get States Dropdown
export const getStates = async (req, res) => {
    try {
        const result = await pool.request().execute('dbo.EV_GetStates');
        res.status(200).send(result.recordset);
    } catch (err) {
        logger.error(`GET STATES ERROR: ${err.message}`, { stack: err.stack });
        res.status(500).send({ message: 'Failed to fetch states.' });
    }
};

// Get Cities Dropdown (Filtered by State)
export const getCities = async (req, res) => {
    const { stateName } = req.query;
    try {
        const request = pool.request();
        if (stateName) {
            request.input('StateName', sql.VarChar(100), stateName);
        }
        const result = await request.execute('dbo.EV_GetCities');
        res.status(200).send(result.recordset);
    } catch (err) {
        logger.error(`GET CITIES ERROR: ${err.message}`, { stack: err.stack });
        res.status(500).send({ message: 'Failed to fetch cities.' });
    }
};

// Get Bank Account Types Dropdown
export const getBankAccountTypes = async (req, res) => {
    try {
        const result = await pool.request().execute('dbo.EV_GetBankAccountTypes');
        res.status(200).send(result.recordset);
    } catch (err) {
        logger.error(`GET BANK TYPES ERROR: ${err.message}`, { stack: err.stack });
        res.status(500).send({ message: 'Failed to fetch bank account types.' });
    }
};

// Verify IFSC Code and Fetch Bank Details
export const verifyIfsc = async (req, res) => {
    const { ifscCode } = req.params;

    if (!ifscCode) {
        return res.status(400).send({ message: 'IFSC code is required.' });
    }

    try {
        const response = await fetch(`${process.env.IFSC_API_URL}/${ifscCode}`);

        if (!response.ok) {
            return res.status(404).send({ message: 'Invalid IFSC code. Please check and try again.' });
        }

        const data = await response.json();

        // Send back the specific fields your UI needs to auto-fill
        res.status(200).send({
            message: 'IFSC verified successfully',
            bankDetails: {
                bankName: data.BANK,
                branchName: data.BRANCH,
                city: data.CITY,
                state: data.STATE
            }
        });

    } catch (err) {
        logger.error(`IFSC VERIFICATION ERROR: ${err.message}`, { stack: err.stack });
        res.status(500).send({ message: 'Failed to verify IFSC code due to a server error.' });
    }
};