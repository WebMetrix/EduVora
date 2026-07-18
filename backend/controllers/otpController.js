import nodemailer from 'nodemailer';
import logger from '../utils/logger.js';
import "dotenv/config";
import pool, { sql } from "../config/db.js";

// Simple In-Memory Cache for OTPs
export const otpCache = new Map();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export const sendOtp = async (req, res) => {
    const { emailAddress, type } = req.body;

    if (!emailAddress) {
        return res.status(400).send({ message: 'Email address is required' });
    }

    try {
        if (type === 'forgot_password') {
            const userCheckReq = pool.request();
            userCheckReq.input('EmailAddress', sql.VarChar(150), emailAddress);
            const userCheckRes = await userCheckReq.query('SELECT 1 FROM dbo.Tb_User WHERE EmailAddress = @EmailAddress AND IsActive = 1');
            
            if (userCheckRes.recordset.length === 0) {
                return res.status(404).send({ message: 'User not found or account is inactive.' });
            }
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Save to memory cache (Expires in 5 minutes)
        otpCache.set(emailAddress, {
            otp,
            expiresAt: Date.now() + 5 * 60 * 1000
        });

        await transporter.sendMail({
            from: `"Eduvora Platform" <${process.env.SMTP_USER}>`,
            to: emailAddress,
            subject: 'Your Eduvora Verification Code',
            html: `
                <h3>Welcome to Eduvora!</h3>
                <p>Your email verification code is: <strong>${otp}</strong></p>
                <p>This code is valid for 5 minutes. Do not share it with anyone.</p>
            `
        });

        logger.info(`OTP successfully sent to ${emailAddress}`);
        res.status(200).send({ message: 'OTP sent successfully to your email.' });

    } catch (err) {
        logger.error(`SEND OTP ERROR: ${err.message}`, { stack: err.stack });
        res.status(500).send({ message: 'Failed to send OTP email.' });
    }
};



export const verifyOtp = async (req, res) => {
    const { emailAddress, otp } = req.body;

    try {
        const cachedData = otpCache.get(emailAddress);

        if (!cachedData) {
            return res.status(400).send({ message: 'No OTP found for this email, or it has expired.' });
        }

        if (Date.now() > cachedData.expiresAt) {
            otpCache.delete(emailAddress);
            return res.status(400).send({ message: 'OTP has expired. Please request a new one.' });
        }

        if (cachedData.otp !== otp) {
            return res.status(400).send({ message: 'Invalid OTP. Please try again.' });
        }

        // Success - Do NOT clear the cache yet! 
        // We need it for the final password reset step.
        // It will expire in 5 minutes anyway or be deleted by the password reset endpoint.
        logger.info(`Email ${emailAddress} verified successfully.`);

        res.status(200).send({ message: 'Email verified successfully.' });

    } catch (err) {
        logger.error(`VERIFY OTP ERROR: ${err.message}`, { stack: err.stack });
        res.status(500).send({ message: 'Something went wrong during verification.' });
    }
};



export const resendOtp = async (req, res) => {
    const { emailAddress } = req.body;

    if (!emailAddress) {
        return res.status(400).send({ message: 'Email address is required' });
    }

    try {
        // Generate a new 6-digit random OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Overwrite the old cache entry with the new OTP and a fresh 5-minute timer
        otpCache.set(emailAddress, {
            otp,
            expiresAt: Date.now() + 5 * 60 * 1000
        });

        // Send the email with a slightly updated subject/body for clarity
        await transporter.sendMail({
            from: `"Eduvora Platform" <${process.env.SMTP_USER}>`,
            to: emailAddress,
            subject: 'Your New Eduvora Verification Code',
            html: `
                <h3>Eduvora Verification</h3>
                <p>You requested a new code. Your fresh email verification code is: <strong>${otp}</strong></p>
                <p>This code is valid for 5 minutes. Do not share it with anyone.</p>
            `
        });

        logger.info(`OTP successfully resent to ${emailAddress}`);
        res.status(200).send({ message: 'A new OTP has been sent to your email.' });

    } catch (err) {
        logger.error(`RESEND OTP ERROR: ${err.message}`, { stack: err.stack });
        res.status(500).send({ message: 'Failed to resend OTP email.' });
    }
};