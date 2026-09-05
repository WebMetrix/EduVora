import pool, { sql } from '../config/db.js';
import path from 'path';
import { validateKycSubmission } from '../utils/kycBasicValidator.js';
import { publishKycTask } from '../utils/rabbitmq.js';


export const getKycDetails = async (req, res) => {
    // #swagger.tags = ['KYC']
    try {
        const uuid = req.user.id;

        const request = pool.request();
        request.input('Action', sql.VarChar(20), 'GET');
        request.input('UUID', sql.VarChar(36), uuid);

        const result = await request.execute('dbo.EV_ManageUserKYC');

        if (result.recordset && result.recordset.length > 0) {
            res.json(result.recordset[0]);
        } else {
            res.json(null); // No KYC found for this user yet
        }
    } catch (error) {
        console.error('Error in getKycDetails:', error);
        res.status(500).json({ message: 'Failed to retrieve KYC details', error: error.message });
    }
};

export const submitKyc = async (req, res) => {
    // #swagger.tags = ['KYC']

    try {
        const uuid = req.user.id;
        const {
            panNumber,
            identityProofType,
            identityProofNumber
        } = req.body;

        // ── Server-side validation (mirrors frontend kyc_document_rules.json) ──
        const { valid, errors } = await validateKycSubmission(req.body, req.files);
        if (!valid) {
            return res.status(400).json({ message: errors[0], errors });
        }

        
        const getDbPath = (file) => {
            if (!file) return null;
            // Multer's file.path contains the full absolute path
            return file.path; 
        };

        const identityProofFrontPath = getDbPath(req.files['IdentityProofFrontPath']?.[0]);
        const identityProofBackPath = getDbPath(req.files['IdentityProofBackPath']?.[0]);
        const panCardPath = getDbPath(req.files['PanCardPath']?.[0]);

        const request = pool.request();
        request.input('Action', sql.VarChar(20), 'SUBMIT');
        request.input('UUID', sql.VarChar(36), uuid);
        request.input('PanNumber', sql.VarChar(20), panNumber || null);
        request.input('IdentityProofType', sql.VarChar(50), identityProofType);
        request.input('IdentityProofNumber', sql.VarChar(50), identityProofNumber);
        request.input('IdentityProofFrontPath', sql.NVarChar(sql.MAX), identityProofFrontPath);
        request.input('IdentityProofBackPath', sql.NVarChar(sql.MAX), identityProofBackPath);
        request.input('PanCardPath', sql.NVarChar(sql.MAX), panCardPath);

        const result = await request.execute('dbo.EV_ManageUserKYC');

        if (result.recordset && result.recordset.length > 0 && result.recordset[0].Success === 1) {
            
            // ── Trigger Celery Worker via RabbitMQ HTTP API ──
            await publishKycTask(uuid, identityProofType, identityProofFrontPath, identityProofBackPath, panCardPath);
            
            res.status(200).json({ message: result.recordset[0].Message });
        } else {
            res.status(400).json({ message: 'Failed to submit KYC.' });
        }

    } catch (error) {
        console.error('Error in submitKyc:', error);
        res.status(500).json({ message: 'Failed to submit KYC details', error: error.message });
    }
};

export const kycWebhook = async (req, res) => {
    // #swagger.tags = ['KYC']
    // Receives updates from the Python Celery Worker when processing finishes
    try {
        const { uuid, status, reason } = req.body;
        console.log(`\n[KYC WEBHOOK RECEIVED] UUID: ${uuid} | Status: ${status} | Reason: ${reason || 'N/A'}`);
        
        // Here you can emit a Socket.io event to the frontend, send an email, etc.
        
        res.status(200).json({ message: 'Webhook received successfully' });
    } catch (error) {
        console.error('Error in kycWebhook:', error);
        res.status(500).json({ message: 'Webhook processing failed' });
    }
};
