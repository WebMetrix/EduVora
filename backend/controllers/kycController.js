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

        // Generate Application ID: EDV-KYC-[DDMMYYYY]-[RANDOM_4_DIGITS]
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        const random4 = Math.floor(1000 + Math.random() * 9000);
        const applicationId = `EDV-KYC-${dd}${mm}${yyyy}-${random4}`;

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

export const adminVerifyKyc = async (req, res) => {
    // #swagger.tags = ['KYC Admin']
    // Admin manually verifies the KYC and triggers the email
    try {
        const { uuid } = req.body;
        if (!uuid) return res.status(400).json({ message: 'UUID is required' });

        // Update only the Tb_User table since Python worker already updated Tb_UserKYC
        const updateReq = pool.request();
        updateReq.input('UUID', sql.VarChar(36), uuid);
        await updateReq.query(`
            UPDATE [dbo].[Tb_User] SET IsKYCVerified = 2 WHERE UUID = @UUID;
        `);

        // Get User Profile to send email
        const userReq = pool.request();
        userReq.input('UUID', sql.VarChar(36), uuid);
        const userRes = await userReq.execute('dbo.EV_GetUserProfile');
        
        if (userRes.recordset && userRes.recordset.length > 0) {
            const user = userRes.recordset[0];
            
            // Get ApplicationId
            const kycReq = pool.request();
            kycReq.input('Action', sql.Int, 1);
            kycReq.input('UUID', sql.VarChar(36), uuid);
            const kycRes = await kycReq.execute('dbo.EV_ManageUserKYC');
            
            let kycRef = "N/A";
            if (kycRes.recordset && kycRes.recordset.length > 0) {
                kycRef = kycRes.recordset[0].ApplicationId || "N/A";
            }

            // Trigger Email
            await sendEmail({
                eventId: EmailEvents.KYC_APPROVED,
                to: user.EmailAddress,
                replacements: {
                    FullName: user.FullName,
                    KycReference: kycRef,
                    KycApprovedDateTime: new Date().toLocaleString()
                }
            });
            
            logger.info(`[ADMIN KYC VERIFIED] UUID: ${uuid} verified manually.`);
            res.status(200).json({ message: 'User KYC manually verified and email triggered successfully.' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        logger.error('Error in adminVerifyKyc:', error);
        res.status(500).json({ message: 'Failed to verify KYC' });
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
            
            if (status === 2) { // 2 = Verified (Approved)
                // Python worker has verified the documents.
                // The admin will now review the file path manually and trigger adminVerifyKyc
                // No email is sent here; it is deferred until admin review.
                logger.info(`[KYC WEBHOOK] UUID: ${uuid} verified by Python. Awaiting Admin manual review.`);
            } else if (status === 3) { // 3 = Rejected
                // Fetch the reason text
                const kycReq = pool.request();
                kycReq.input('Action', sql.Int, 1);
                kycReq.input('UUID', sql.VarChar(36), uuid);
                const kycRes = await kycReq.execute('dbo.EV_ManageUserKYC');
                
                let reasonText = "Quality checks failed.";
                let kycRef = "N/A";
                if (kycRes.recordset && kycRes.recordset.length > 0) {
                    reasonText = kycRes.recordset[0].RejectionReason || reasonText;
                    kycRef = kycRes.recordset[0].ApplicationId || "N/A";
                }
                
                sendEmail({
                    eventId: EmailEvents.KYC_REJECTED,
                    to: user.EmailAddress,
                    replacements: {
                        FullName: user.FullName,
                        KycReference: kycRef,
                        KycRejectedDateTime: new Date().toLocaleString(),
                        KycRejectionReason: reasonText
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
