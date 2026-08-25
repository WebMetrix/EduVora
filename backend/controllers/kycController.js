import pool, { sql } from '../config/db.js';
import path from 'path';


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

        // Ensure files were uploaded
        if (!req.files || !req.files['IdentityProofFrontPath'] || !req.files['PanCardPath']) {
            return res.status(400).json({ message: 'Required documents are missing.' });
        }

        
        const getRelativePath = (file) => {
            if (!file) return null;
            return path.join(uuid, file.filename).replace(/\\/g, '/');
        };

        const identityProofFrontPath = getRelativePath(req.files['IdentityProofFrontPath'][0]);
        const identityProofBackPath = req.files['IdentityProofBackPath'] ? getRelativePath(req.files['IdentityProofBackPath'][0]) : null;
        const panCardPath = getRelativePath(req.files['PanCardPath'][0]);

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
            res.status(200).json({ message: result.recordset[0].Message });
        } else {
            res.status(400).json({ message: 'Failed to submit KYC.' });
        }

    } catch (error) {
        console.error('Error in submitKyc:', error);
        res.status(500).json({ message: 'Failed to submit KYC details', error: error.message });
    }
};
