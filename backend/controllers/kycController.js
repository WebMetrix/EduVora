import pool, { sql } from '../config/db.js';
import path from 'path';
import { validateKycSubmission } from '../utils/kycBasicValidator.js';
import { publishKycTask } from '../utils/rabbitmq.js';
import logger from '../utils/logger.js';
import { encryptData, decryptData } from '../utils/encryption.js';
import { sendEmail } from '../services/emailService.js';
import EmailEvents from '../utils/emailEvents.js';

export const getIdentityProofTypes = async (req, res) => {
    // #swagger.tags = ['KYC']
    try {
        const result = await pool.request().execute('dbo.EV_GetIdentityProofTypes');
        res.json(result.recordset);
    } catch (error) {
        logger.error('Error fetching identity proof types:', error);
        res.status(500).json({ message: 'Failed to fetch identity proof types', error: error.message });
    }
};


export const getKycDetails = async (req, res) => {
    // #swagger.tags = ['KYC']
    try {
        const uuid = req.user.id;

        const request = pool.request();
        request.input('Action', sql.Int, 1); // 1 = GET
        request.input('UUID', sql.VarChar(36), uuid);

        const result = await request.execute('dbo.EV_ManageUserKYC');

        if (result.recordset && result.recordset.length > 0) {
            const kyc = result.recordset[0];
            // Decrypt the stored numbers
            if (kyc.PanNumber) kyc.PanNumber = decryptData(kyc.PanNumber);
            if (kyc.IdentityProofNumber) kyc.IdentityProofNumber = decryptData(kyc.IdentityProofNumber);
            res.json(kyc);
        } else {
            res.json(null); // No KYC found for this user yet
        }
    } catch (error) {
        logger.error('Error in getKycDetails:', error);
        res.status(500).json({ message: 'Failed to retrieve KYC details', error: error.message });
    }
};

export const submitKyc = async (req, res) => {
    // #swagger.tags = ['KYC']

    try {
        const uuid = req.user.id;
        const {
            panNumber,
            identityTypeId,
            identityProofNumber
        } = req.body;

        // ── Server-side validation (mirrors frontend kyc_document_rules.json) ──
        const { valid, errors } = await validateKycSubmission(req.body, req.files);
        if (!valid) {
            return res.status(400).json({ message: errors[0], errors });
        }

        const maskNumber = (val, type) => {
            if (!val) return '';
            let unformatted = val.replace(/[^A-Z0-9]/ig, '').toUpperCase();
            let masked = '';
            for (let i = 0; i < unformatted.length; i++) {
                if (i >= unformatted.length - 4) {
                    masked += unformatted[i];
                } else {
                    masked += 'X';
                }
            }
            if (type === 'AADHAR') return masked.match(/.{1,4}/g)?.join('-') || masked;
            return masked;
        };

        const maskedPan = panNumber ? maskNumber(panNumber, 'PAN') : null;
        const maskedIdentityProof = identityProofNumber ? maskNumber(identityProofNumber, parseInt(identityTypeId) === 1 ? 'AADHAR' : 'DEFAULT') : null;

        // Encrypt the sensitive numbers before saving to DB
        const encryptedPan = maskedPan ? encryptData(maskedPan) : null;
        const encryptedIdentityProof = maskedIdentityProof ? encryptData(maskedIdentityProof) : null;


        const getDbPath = (file) => {
            if (!file) return null;
            // Multer's file.path contains the full absolute path
            return file.path;
        };

        let identityProofFrontPath = getDbPath(req.files['IdentityProofFrontPath']?.[0]);
        let identityProofBackPath = getDbPath(req.files['IdentityProofBackPath']?.[0]);
        let panCardPath = getDbPath(req.files['PanCardPath']?.[0]);

        // If no new files were uploaded, fetch the existing paths from the DB to send to the worker
        if (!identityProofFrontPath || !panCardPath) {
            const kycReq = pool.request();
            kycReq.input('Action', sql.Int, 1);
            kycReq.input('UUID', sql.VarChar(36), uuid);
            const kycRes = await kycReq.execute('dbo.EV_ManageUserKYC');
            if (kycRes.recordset && kycRes.recordset.length > 0) {
                const existing = kycRes.recordset[0];
                if (!identityProofFrontPath) identityProofFrontPath = existing.IdentityProofFrontPath;
                if (!identityProofBackPath) identityProofBackPath = existing.IdentityProofBackPath;
                if (!panCardPath) panCardPath = existing.PanCardPath;
            }
        }

        // Generate Application ID: EDV-KYC-[TIMESTAMP]-[FIRST_4_LETTERS_OF_NAME]
        const userReq = pool.request();
        userReq.input('UUID', sql.VarChar(36), uuid);
        const userRes = await userReq.execute('dbo.EV_GetUserProfile');
        let userNamePart = 'USER';
        if (userRes.recordset && userRes.recordset.length > 0) {
            const fullName = userRes.recordset[0].FullName || '';
            userNamePart = fullName.replace(/[^a-zA-Z]/g, '').substring(0, 4).toUpperCase();
            if (userNamePart.length < 4) userNamePart = userNamePart.padEnd(4, 'X');
        }
        const applicationId = `EDV-KYC-${Date.now()}-${userNamePart}`;

        const request = pool.request();
        request.input('Action', sql.Int, 2); // 2 = SUBMIT
        request.input('UUID', sql.VarChar(36), uuid);
        request.input('ApplicationId', sql.VarChar(50), applicationId);
        request.input('PanNumber', sql.VarChar(255), encryptedPan);
        request.input('IdentityTypeId', sql.Int, parseInt(identityTypeId));
        request.input('IdentityProofNumber', sql.VarChar(255), encryptedIdentityProof);
        request.input('IdentityProofFrontPath', sql.NVarChar(sql.MAX), identityProofFrontPath);
        request.input('IdentityProofBackPath', sql.NVarChar(sql.MAX), identityProofBackPath);
        request.input('PanCardPath', sql.NVarChar(sql.MAX), panCardPath);

        const result = await request.execute('dbo.EV_ManageUserKYC');

        if (result.recordset && result.recordset.length > 0 && result.recordset[0].Success === 1) {

            // ── Trigger Celery Worker via RabbitMQ HTTP API ──
            await publishKycTask(uuid, parseInt(identityTypeId), identityProofFrontPath, identityProofBackPath, panCardPath);

            res.status(200).json({ message: result.recordset[0].Message });
        } else {
            res.status(400).json({ message: 'Failed to submit KYC.' });
        }

    } catch (error) {
        logger.error('Error in submitKyc:', error);
        res.status(500).json({ message: 'Failed to submit KYC details', error: error.message });
    }
};

export const kycWebhook = async (req, res) => {
    // #swagger.tags = ['KYC']
    // Receives updates from the Python Celery Worker when processing finishes
    try {
        const { uuid, status, reasonId } = req.body;
        logger.info(`[KYC WEBHOOK RECEIVED] UUID: ${uuid} | Status: ${status} | ReasonID: ${reasonId || 'N/A'}`);

        // Here you can emit a Socket.io event to the frontend, send an email, etc.
        const userReq = pool.request();
        userReq.input('UUID', sql.VarChar(36), uuid);
        const userRes = await userReq.execute('dbo.EV_GetUserProfile');
        
        if (userRes.recordset && userRes.recordset.length > 0) {
            const user = userRes.recordset[0];
            
            if (status === 'APPROVED') {
                sendEmail({
                    eventId: EmailEvents.KYC_APPROVED,
                    to: user.EmailAddress,
                    replacements: {
                        FullName: user.FullName
                    }
                }).catch(err => logger.error(`Failed to send KYC Approved email: ${err}`));
            } else if (status === 'REJECTED') {
                // Fetch the reason text
                const kycReq = pool.request();
                kycReq.input('Action', sql.Int, 1);
                kycReq.input('UUID', sql.VarChar(36), uuid);
                const kycRes = await kycReq.execute('dbo.EV_ManageUserKYC');
                
                let reasonText = "Quality checks failed.";
                if (kycRes.recordset && kycRes.recordset.length > 0) {
                    reasonText = kycRes.recordset[0].RejectionReason || reasonText;
                }
                
                sendEmail({
                    eventId: EmailEvents.KYC_REJECTED,
                    to: user.EmailAddress,
                    replacements: {
                        FullName: user.FullName,
                        Reason: reasonText
                    }
                }).catch(err => logger.error(`Failed to send KYC Rejected email: ${err}`));
            }
        }

        res.status(200).json({ message: 'Webhook received successfully' });
    } catch (error) {
        logger.error('Error in kycWebhook:', error);
        res.status(500).json({ message: 'Webhook processing failed' });
    }
};
