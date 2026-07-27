import pool, { sql } from "../config/db.js";
import logger from '../utils/logger.js';
import { t } from '../utils/translation.js';
import { decryptUserId } from '../utils/encryption.js';

export const assignReferral = async (req, res) => {
    const { encryptedRef } = req.body;
    const newUserUUID = req.user.id; // From JWT middleware

    if (!encryptedRef) {
        return res.status(400).send({ message: "No referral code provided." });
    }

    const sponsorUserId = decryptUserId(encryptedRef);
    if (!sponsorUserId) {
        return res.status(400).send({ message: "Invalid or corrupted referral link." });
    }

    try {
        const request = pool.request();
        request.input('NewUserUUID', sql.VarChar(36), newUserUUID);
        request.input('SponsorUserID', sql.VarChar(100), sponsorUserId);
        
        request.output('Result', sql.Int);

        const result = await request.execute('dbo.EV_AssignReferral');
        const procResult = result.output.Result;

        if (procResult === 1) {
            return res.status(200).send({ message: "Referral assigned successfully." });
        } else if (procResult === -1) {
            return res.status(404).send({ message: "Sponsor not found." });
        } else {
            return res.status(500).send({ message: "System error assigning referral." });
        }

    } catch (err) {
        logger.error(`ASSIGN REFERRAL ERROR: ${err.message}`, { stack: err.stack });
        res.status(500).send({ message: "Error assigning referral." });
    }
};
