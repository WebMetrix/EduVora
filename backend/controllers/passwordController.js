import bcrypt from 'bcrypt';
import pool, { sql } from "../config/db.js";
import logger from '../utils/logger.js';
import { otpCache } from '../controllers/otpController.js';



export const resetPassword = async (req, res) => {
    const { emailAddress, otp, newPassword } = req.body;

    if (!emailAddress || !otp || !newPassword) {
        return res.status(400).send({ message: 'Missing required fields' });
    }

    try {
        const cachedData = otpCache.get(emailAddress);
        if (!cachedData || cachedData.otp !== otp || Date.now() > cachedData.expiresAt) {
            return res.status(400).send({ message: 'Invalid or expired OTP. Please restart the process.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        const request = pool.request();
        request.input('EmailAddress', sql.VarChar(150), emailAddress);
        request.input('Password', sql.VarChar(255), hashedPassword);
        request.output('Result', sql.Int);

        const result = await request.execute('dbo.EV_ResetPassword');
        const procResult = result.output.Result;

        if (procResult === -1) return res.status(404).send({ message: 'User not found' });
        if (procResult === 0) return res.status(500).send({ message: 'System error during password reset' });

        otpCache.delete(emailAddress);
        logger.info(`Password successfully reset for ${emailAddress}`);

        res.status(200).send({ message: 'Password has been reset successfully.' });

    } catch (err) {
        logger.error(`RESET PASSWORD ERROR: ${err.message}`, { stack: err.stack });
        res.status(500).send({ message: 'Something went wrong while resetting the password.' });
    }
};