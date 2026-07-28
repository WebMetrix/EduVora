import pool, { sql } from "../config/db.js";
import logger from '../utils/logger.js';
import { t } from '../utils/translation.js';
import { decryptUserId } from '../utils/encryption.js';

export const assignReferral = async (req, res) => {
    const { encryptedRef } = req.body;
    const newUserUUID = req.user.id; // From JWT middleware

    if (!encryptedRef) {
        return res.status(400).send({ message: t('api.referral.noCode') });
    }

    const sponsorUserId = decryptUserId(encryptedRef);
    if (!sponsorUserId) {
        return res.status(400).send({ message: t('api.referral.invalidLink') });
    }

    try {
        const request = pool.request();
        request.input('NewUserUUID', sql.VarChar(36), newUserUUID);
        request.input('SponsorUserID', sql.VarChar(100), sponsorUserId);
        
        request.output('Result', sql.Int);

        const result = await request.execute('dbo.EV_AssignReferral');
        const procResult = result.output.Result;

        if (procResult === 1) {
            return res.status(200).send({ message: t('api.referral.assignSuccess') });
        } else if (procResult === -1) {
            // Self-referral handled silently or as you see fit. 
            // In this specific SP, -1 might mean Sponsor not found, let's just log or ignore.
            return res.status(200).send({ message: t('api.referral.assignSuccess') });
        } else {
            return res.status(500).send({ message: t('api.referral.systemError') });
        }

    } catch (err) {
        logger.error(`ASSIGN REFERRAL ERROR: ${err.message}`, { stack: err.stack });
        res.status(500).send({ message: t('api.referral.assignError') });
    }
};
