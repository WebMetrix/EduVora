import logger from "../utils/logger.js";
import { t } from "../utils/translation.js";
import "dotenv/config";
import pool, { sql } from "../config/db.js";
import EmailEvents from "../utils/emailEvents.js";
import { sendEmail } from "../services/emailService.js";
import geoip from "geoip-lite";

// Simple In-Memory Cache for OTPs
export const otpCache = new Map();

const getLocation = (req) => {
    let ip =
        req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
        req.socket.remoteAddress ||
        req.ip;

    // Handle localhost
    if (ip === "::1" || ip === "127.0.0.1" || ip?.includes("127.0.0.1")) {
        return "Local Development";
    }

    // IPv6 mapped IPv4
    if (ip?.startsWith("::ffff:")) {
        ip = ip.replace("::ffff:", "");
    }

    const geo = geoip.lookup(ip);

    if (!geo) {
        return "Unknown";
    }

    return [
        geo.city,
        geo.region,
        geo.country
    ]
        .filter(Boolean)
        .join(", ");
};

export const sendOtp = async (req, res) => {
    const { emailAddress, type, fullName } = req.body;

    if (!emailAddress) {
        return res.status(400).send({
            message: t("api.otp.emailRequired")
        });
    }

    try {

        // Forgot Password - Check if user exists
        if (type === "forgot_password") {

            const userCheckReq = pool.request();

            userCheckReq.input("EmailAddress", sql.VarChar(150), emailAddress);

            const userCheckRes = await userCheckReq.execute("EV_CheckUserExistsByEmail");

            const userExists = userCheckRes.recordset[0].EmailExists;

            if (!userExists) {
                return res.status(404).send({
                    message: t("api.otp.userNotFound")
                });
            }
        }

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Save OTP in memory cache
        otpCache.set(emailAddress, {
            otp,
            expiresAt:
                Date.now() +
                Number(process.env.OTP_Expiration_Time) *
                60 *
                1000
        });

        // Decide Email Event
        const eventId = type === "forgot_password" ? EmailEvents.FORGOT_PASSWORD_OTP : EmailEvents.REGISTER_OTP;

        // Send Email
        await sendEmail({
            eventId,
            to: emailAddress,
            replacements: {
                FullName: fullName,
                OTP: otp,
                OtpExpiryMinutes: process.env.OTP_Expiration_Time,
                IPAddress: req.ip,
                Browser: req.headers["user-agent"],
                Location: getLocation(req)
            }
        });

        logger.info(
            `OTP successfully sent to ${emailAddress}`
        );

        res.status(200).send({
            message: t("api.otp.sendSuccess")
        });

    } catch (err) {

        logger.error(
            `SEND OTP ERROR: ${err.message}`,
            {
                stack: err.stack
            }
        );

        res.status(500).send({
            message: t("api.otp.sendError")
        });
    }
};

export const verifyOtp = async (req, res) => {

    const { emailAddress, otp } = req.body;

    try {

        const cachedData = otpCache.get(emailAddress);

        if (!cachedData) {
            return res.status(400).send({
                message: t("api.otp.noOtpFound")
            });
        }

        if (Date.now() > cachedData.expiresAt) {

            otpCache.delete(emailAddress);

            return res.status(400).send({
                message: t("api.otp.otpExpired")
            });
        }

        if (cachedData.otp !== otp) {

            return res.status(400).send({
                message: t("api.otp.invalidOtp")
            });
        }

        logger.info(`Email ${emailAddress} verified successfully.`);

        res.status(200).send({
            message: t("api.otp.verifySuccess")
        });

    } catch (err) {

        logger.error(
            `VERIFY OTP ERROR: ${err.message}`,
            {
                stack: err.stack
            }
        );

        res.status(500).send({
            message: t("api.otp.verifyError")
        });
    }
};

export const resendOtp = async (req, res) => {

    const { emailAddress, fullName } = req.body;

    if (!emailAddress) {
        return res.status(400).send({
            message: t("api.otp.emailRequired")
        });
    }

    try {

        // Generate new OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Update Cache
        otpCache.set(emailAddress, {
            otp,
            expiresAt:
                Date.now() +
                Number(process.env.OTP_Expiration_Time) *
                60 *
                1000
        });

        // Send Email
        await sendEmail({
            eventId: EmailEvents.REGISTER_OTP,
            to: emailAddress,
            replacements: {
                FullName: fullName,
                OTP: otp,
                OtpExpiryMinutes: process.env.OTP_Expiration_Time,
                IPAddress: req.ip,
                Browser: req.headers["user-agent"],
                Location: getLocation(req)
            }
        });

        logger.info(
            `OTP successfully resent to ${emailAddress}`
        );

        res.status(200).send({
            message: t("api.otp.resendSuccess")
        });

    } catch (err) {

        logger.error(
            `RESEND OTP ERROR: ${err.message}`,
            {
                stack: err.stack
            }
        );

        res.status(500).send({
            message: t("api.otp.resendError")
        });
    }
};