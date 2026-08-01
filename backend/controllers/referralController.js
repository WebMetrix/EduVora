import pool, { sql } from "../config/db.js";
import logger from '../utils/logger.js';
import { t } from '../utils/translation.js';
import { decryptUserId } from '../utils/encryption.js';

export const assignReferral = async (req, res) => {
    // #swagger.tags = ['Referral']
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

export const getReferralsList = async (req, res) => {
    // #swagger.tags = ['Referral']
    const uuid = req.user.id;
    const { filter, search } = req.query;

    try {
        // 1. Get the UserID from the UUID via profile SP
        const userReq = pool.request();
        console.log("Fetching profile for UUID:", uuid);
        userReq.input('UUID', sql.VarChar(36), uuid);
        const userRes = await userReq.execute('dbo.EV_GetUserProfile');
        
        console.log("Profile SP Recordset Length:", userRes.recordset.length);

        if (!userRes.recordset || userRes.recordset.length === 0) {
            console.log("404 Triggered: User profile not found for UUID:", uuid);
            return res.status(404).json({ message: t('api.profile.notFound') });
        }

        const userId = userRes.recordset[0].UserID;
        console.log("Found UserID:", userId);

        // 2. Fetch the referrals using the UserID
        const request = pool.request();
        request.input('UserID', sql.VarChar(100), userId);
        request.input('DateFilter', sql.VarChar(20), filter || null);
        request.input('SearchQuery', sql.VarChar(100), search || null);

        const result = await request.execute('dbo.EV_GetMyReferralsList');
        
        return res.status(200).send({
            message: t('api.referral.listSuccess'),
            data: result.recordset || []
        });

    } catch (err) {
        logger.error(`GET REFERRALS LIST ERROR: ${err.message}`, { stack: err.stack });
        res.status(500).send({ message: t('api.referral.listError') });
    }
};
