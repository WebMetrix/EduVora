import nodemailer from 'nodemailer';
import logger from '../utils/logger.js';
import { t } from '../utils/translation.js';
import "dotenv/config";
import pool, { sql } from "../config/db.js";
import path from 'path';

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
    const { emailAddress, type, fullName } = req.body;

    if (!emailAddress) {
        return res.status(400).send({ message: t('api.otp.emailRequired') });
    }

    try {
        if (type === 'forgot_password') {
            const userCheckReq = pool.request();
            userCheckReq.input('EmailAddress', sql.VarChar(150), emailAddress);
            const userCheckRes = await userCheckReq.execute("EV_CheckUserExistsByEmail");
            const userExists = userCheckRes.recordset[0].EmailExists;

            if (!userExists) {
                return res.status(404).send({ message: t('api.otp.userNotFound') });
            }
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Save to memory cache (Expires in 5 minutes)
        otpCache.set(emailAddress, {
            otp,
            expiresAt: Date.now() + 5 * 60 * 1000
        });

        // await transporter.sendMail({
        //     from: `"Eduvora Platform" <${process.env.SMTP_USER}>`,
        //     to: emailAddress,
        //     subject: 'Your Eduvora Verification Code',
        //     html: `
        //         <h3>Welcome to Eduvora!</h3>
        //         <p>Your email verification code is: <strong>${otp}</strong></p>
        //         <p>This code is valid for 5 minutes. Do not share it with anyone.</p>
        //     `
        // });

        // Fetch Email Template
        const templateReq = pool.request();
        templateReq.input("EventId", sql.Int, 1);

        const templateRes = await templateReq.execute("EV_GetEmailTemplate");

        if (templateRes.recordset.length === 0) {
            return res.status(500).json({
                message: t('api.otp.templateNotFound')
            });
        }

        const {
            EmailSubject,
            EmailTemplate
        } = templateRes.recordset[0];

        // Replace placeholders
        let html = EmailTemplate;

        const replacements = {
            LogoUrl: process.env.COMPANY_LOGO_URL,
            FullName: fullName,
            CompanyName: process.env.COMPANY_NAME,
            OTP: otp,
            OtpExpiryMinutes: process.env.OTP_Expiration_Time,
            LoginUrl: process.env.LOGIN_URL,
            TermsUrl: process.env.TERMS_URL,
            PrivacyUrl: process.env.PRIVACY_URL,
            SupportEmail: process.env.SUPPORT_EMAIL,
            CurrentYear: new Date().getFullYear()
        };

        Object.keys(replacements).forEach(key => {
            html = html.replace(
                new RegExp(`{{${key}}}`, "g"),
                replacements[key]
            );
        });

        // Send Email
        await transporter.sendMail({
            from: `"${process.env.COMPANY_NAME}" <${process.env.SMTP_USER}>`,
            to: emailAddress,
            subject: EmailSubject,
            html
        });

        logger.info(`OTP successfully sent to ${emailAddress}`);
        res.status(200).send({ message: t('api.otp.sendSuccess') });

    } catch (err) {
        logger.error(`SEND OTP ERROR: ${err.message}`, { stack: err.stack });
        res.status(500).send({ message: t('api.otp.sendError') });
    }
};



export const verifyOtp = async (req, res) => {
    const { emailAddress, otp } = req.body;

    try {
        const cachedData = otpCache.get(emailAddress);

        if (!cachedData) {
            return res.status(400).send({ message: t('api.otp.noOtpFound') });
        }

        if (Date.now() > cachedData.expiresAt) {
            otpCache.delete(emailAddress);
            return res.status(400).send({ message: t('api.otp.otpExpired') });
        }

        if (cachedData.otp !== otp) {
            return res.status(400).send({ message: t('api.otp.invalidOtp') });
        }

        // Success - Do NOT clear the cache yet! 
        // We need it for the final password reset step.
        // It will expire in 5 minutes anyway or be deleted by the password reset endpoint.
        logger.info(`Email ${emailAddress} verified successfully.`);

        res.status(200).send({ message: t('api.otp.verifySuccess') });

    } catch (err) {
        logger.error(`VERIFY OTP ERROR: ${err.message}`, { stack: err.stack });
        res.status(500).send({ message: t('api.otp.verifyError') });
    }
};



export const resendOtp = async (req, res) => {
    const { emailAddress } = req.body;

    if (!emailAddress) {
        return res.status(400).send({ message: t('api.otp.emailRequired') });
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
        res.status(200).send({ message: t('api.otp.resendSuccess') });

    } catch (err) {
        logger.error(`RESEND OTP ERROR: ${err.message}`, { stack: err.stack });
        res.status(500).send({ message: t('api.otp.resendError') });
    }
};