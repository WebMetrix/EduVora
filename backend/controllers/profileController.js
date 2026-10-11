import pool, { sql } from "../config/db.js";
import logger from '../utils/logger.js';
import { t } from '../utils/translation.js';
import { encryptUserId } from '../utils/encryption.js';

// Get Complete User Profile
export const getUserProfile = async (req, res) => {
    // #swagger.tags = ['Profile']
    try {
        const request = pool.request();

        // Grab UUID from JWT authentication middleware
        request.input('UUID', sql.VarChar(36), req.user.id);

        const result = await request.execute('dbo.EV_GetUserProfile');

        if (result.recordset.length === 0) {
            return res.status(404).send({ message: t('api.profile.notFound') });
        }

        let userProfile = result.recordset[0];

        // Encrypt their UserID to generate the ReferralCode securely
        if (userProfile.UserID) {
            userProfile.ReferralCode = encryptUserId(userProfile.UserID);
        }

        // Initialize dynamic account overview fields with lean primitive defaults
        userProfile.WalletBalance = 0;
        userProfile.TotalEarnings = 0;
        userProfile.SponsorID = null;
        userProfile.SponsorName = null;
        userProfile.TotalReferrals = 0;

        // Fetch earnings and network stats concurrently; slice strictly only the needed scalar fields
        try {
            const earningsPromise = (async () => {
                const reqPool = pool.request();
                reqPool.input('UUID', sql.VarChar(36), req.user.id);
                return await reqPool.execute('dbo.EV_GetMyEarnings');
            })();

            const networkPromise = (async () => {
                if (!userProfile.UserID) return null;
                const reqPool = pool.request();
                reqPool.input('RootUserID', sql.NVarChar(100), userProfile.UserID);
                return await reqPool.execute('dbo.EV_GetMyNetwork');
            })();

            const [earningsResult, networkResult] = await Promise.allSettled([earningsPromise, networkPromise]);

            // Slice only WalletBalance and TotalEarnings from earnings summary (no transactions/charts attached)
            if (earningsResult.status === 'fulfilled' && earningsResult.value?.recordsets?.[0]?.length > 0) {
                const summary = earningsResult.value.recordsets[0][0];
                userProfile.WalletBalance = summary.CurrentBalance ?? 0;
                userProfile.TotalEarnings = summary.TotalEarned ?? 0;
            }

            // Slice only Sponsor and direct ChildrenCount from network hierarchy (no tree nodes/downline attached)
            if (networkResult.status === 'fulfilled' && networkResult.value?.recordsets?.[0]?.length > 0) {
                const flatData = networkResult.value.recordsets[0];
                const rootRow = flatData.find(r => r.UserID === userProfile.UserID) || flatData[0];
                if (rootRow) {
                    userProfile.SponsorID = rootRow.SponsorID || null;
                    userProfile.SponsorName = rootRow.SponsorName || null;
                    userProfile.TotalReferrals = rootRow.ChildrenCount ?? 0;
                }
            }
        } catch (overviewErr) {
            logger.warn(`Could not slice overview data for user profile: ${overviewErr.message}`);
        }

        // Return the first record (since UUID is unique) with dynamic account overview data
        res.status(200).send(userProfile);
    } catch (err) {
        logger.error(`GET PROFILE ERROR: ${err.message}`, { stack: err.stack });
        res.status(500).send({ message: t('api.profile.fetchError') });
    }
};

// Edit User Profile
export const editUser = async (req, res) => {
    // #swagger.tags = ['Profile']
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

        if (procResult === -1) return res.status(404).send({ message: t('api.profile.userNotFound') });
        if (procResult === -2) return res.status(400).send({ message: t('api.profile.usernameTaken') });
        if (procResult === -3) return res.status(400).send({ message: t('api.profile.mobileTaken') });
        if (procResult === 0) return res.status(500).send({ message: t('api.profile.systemError') });

        res.status(200).send({ message: t('api.profile.updateSuccess') });

    } catch (err) {
        logger.error(`EDIT PROFILE ERROR: ${err.message}`, { stack: err.stack });
        res.status(500).send({ message: t('api.profile.updateError') });
    }
};

// Instant Profile Picture Update
export const updateProfilePicture = async (req, res) => {
    // #swagger.tags = ['Profile']
    const profilePicturePath = req.file ? req.file.path : null;

    if (!profilePicturePath) {
        return res.status(400).send({ message: t('api.profile.noImage') });
    }

    try {
        const request = pool.request();
        request.input('UUID', sql.VarChar(36), req.user.id);
        request.input('ProfilePicturePath', sql.VarChar(500), profilePicturePath);

        await request.execute('dbo.EV_UpdateProfilePicture');

        res.status(200).send({
            message: t('api.profile.pictureUpdateSuccess'),
            profilePicturePath: profilePicturePath
        });

    } catch (err) {
        logger.error(`UPDATE PICTURE ERROR: ${err.message}`, { stack: err.stack });
        res.status(500).send({ message: t('api.profile.pictureUpdateError') });
    }
};

// Check Username Availability
export const checkUsername = async (req, res) => {
    // #swagger.tags = ['Profile']
    const { username } = req.body;

    if (!username) return res.status(400).send({ message: t('api.profile.usernameRequired') });

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
        res.status(500).send({ message: t('api.profile.usernameCheckError') });
    }
};

// Get Genders Dropdown
export const getGenders = async (req, res) => {
    // #swagger.tags = ['Profile']
    try {
        const result = await pool.request().execute('dbo.EV_GetGenders');
        res.status(200).send(result.recordset);
    } catch (err) {
        logger.error(`GET GENDERS ERROR: ${err.message}`, { stack: err.stack });
        res.status(500).send({ message: t('api.profile.fetchGendersError') });
    }
};

// Get States Dropdown
export const getStates = async (req, res) => {
    // #swagger.tags = ['Profile']
    try {
        const result = await pool.request().execute('dbo.EV_GetStates');
        res.status(200).send(result.recordset);
    } catch (err) {
        logger.error(`GET STATES ERROR: ${err.message}`, { stack: err.stack });
        res.status(500).send({ message: t('api.profile.fetchStatesError') });
    }
};

// Get Cities Dropdown (Filtered by State)
export const getCities = async (req, res) => {
    // #swagger.tags = ['Profile']
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
        res.status(500).send({ message: t('api.profile.fetchCitiesError') });
    }
};

// Get Bank Account Types Dropdown
export const getBankAccountTypes = async (req, res) => {
    // #swagger.tags = ['Profile']
    try {
        const result = await pool.request().execute('dbo.EV_GetBankAccountTypes');
        res.status(200).send(result.recordset);
    } catch (err) {
        logger.error(`GET BANK TYPES ERROR: ${err.message}`, { stack: err.stack });
        res.status(500).send({ message: t('api.profile.fetchBankTypesError') });
    }
};

// Verify IFSC Code and Fetch Bank Details
export const verifyIfsc = async (req, res) => {
    // #swagger.tags = ['Profile']
    const { ifscCode } = req.params;

    if (!ifscCode) {
        return res.status(400).send({ message: t('api.profile.ifscRequired') });
    }

    try {
        const response = await fetch(`${process.env.IFSC_API_URL}/${ifscCode}`);

        if (!response.ok) {
            return res.status(404).send({ message: t('api.profile.invalidIfsc') });
        }

        const data = await response.json();

        // Send back the specific fields your UI needs to auto-fill
        res.status(200).send({
            message: t('api.profile.ifscVerifySuccess'),
            bankDetails: {
                bankName: data.BANK,
                branchName: data.BRANCH,
                city: data.CITY,
                state: data.STATE
            }
        });

    } catch (err) {
        logger.error(`IFSC VERIFICATION ERROR: ${err.message}`, { stack: err.stack });
        res.status(500).send({ message: t('api.profile.ifscVerifyError') });
    }
};

// Update About Me Notes
export const updateAbout = async (req, res) => {
    // #swagger.tags = ['Profile']
    const { aboutNotes } = req.body;

    try {
        const request = pool.request();
        request.input('UUID', sql.VarChar(36), req.user.id);
        request.input('AboutNotes', sql.VarChar(200), aboutNotes || null);

        const result = await request.execute('dbo.EV_UpdateAboutMe');

        if (result.recordset && result.recordset[0].Success === 1) {
            res.status(200).send({ message: result.recordset[0].Message });
        } else {
            res.status(400).send({ message: result.recordset[0].Message || t('api.profile.aboutUpdateFailed') });
        }
    } catch (err) {
        logger.error(`UPDATE ABOUT ERROR: ${err.message}`, { stack: err.stack });
        res.status(500).send({ message: t('api.profile.aboutUpdateError') });
    }
};