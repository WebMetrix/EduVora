import bcrypt from 'bcrypt';
import pool, { sql } from "../config/db.js";
import logger from '../utils/logger.js';
import { otpCache } from '../controllers/otpController.js';
import { t } from '../utils/translation.js';



export const resetPassword = async (req, res) => {
    // #swagger.tags = ['Password']
    const { emailAddress, otp, newPassword } = req.body;

    if (!emailAddress || !otp || !newPassword) {
        return res.status(400).send({ message: t('api.password.missingFields') });
    }

    try {
        const cachedData = otpCache.get(emailAddress);
        if (!cachedData || cachedData.otp !== otp || Date.now() > cachedData.expiresAt) {
            return res.status(400).send({ message: t('api.password.invalidOtp') });
        }

        // Fetch user to check current password
        const checkUserReq = pool.request();
        checkUserReq.input('Email', sql.VarChar(150), emailAddress);
        checkUserReq.output('Result', sql.Int);
        const userResult = await checkUserReq.execute('dbo.EV_LogIn');
        
        if (userResult.output.Result === 1) {
            const currentHash = userResult.recordset[0].Password;
            const isSameAsOld = await bcrypt.compare(newPassword, currentHash);
            
            if (isSameAsOld) {
                return res.status(400).send({ message: t('api.password.samePassword') });
            }
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        const request = pool.request();
        request.input('EmailAddress', sql.VarChar(150), emailAddress);
        request.input('Password', sql.VarChar(255), hashedPassword);
        request.output('Result', sql.Int);

        const result = await request.execute('dbo.EV_ResetPassword');
        const procResult = result.output.Result;

        if (procResult === -1) return res.status(404).send({ message: t('api.password.userNotFound') });
        if (procResult === 0) return res.status(500).send({ message: t('api.password.systemError') });

        otpCache.delete(emailAddress);
        logger.info(`Password successfully reset for ${emailAddress}`);

        res.status(200).send({ message: t('api.password.resetSuccess') });

    } catch (err) {
        logger.error(`RESET PASSWORD ERROR: ${err.message}`, { stack: err.stack });
        res.status(500).send({ message: t('api.password.resetError') });
    }
};