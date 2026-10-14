import nodemailer from "nodemailer";
import pool, { sql } from "../config/db.js";
import logger from "../utils/logger.js";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use STARTTLS
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

export const sendEmail = async ({
    eventId,
    to,
    replacements = {}
}) => {
    try {
        if (!to) {
            throw new Error(`Cannot send email for EventId ${eventId}: recipient 'to' address is missing.`);
        }

        // Fetch template from dbo.Tb_EventMaster via stored procedure
        const request = pool.request();
        request.input("EventId", sql.Int, eventId);

        const result = await request.execute("dbo.EV_GetEmailTemplate");

        if (!result.recordset || !result.recordset.length) {
            throw new Error(`Email template not found for EventId ${eventId}.`);
        }

        const {
            EmailSubject,
            EmailTemplate
        } = result.recordset[0];

        let html = EmailTemplate || "";
        let subject = EmailSubject || "";

        const baseUrl = process.env.LOGIN_URL
            ? process.env.LOGIN_URL.replace(/\/login\/?$/, '')
            : 'http://localhost:5173';

        // Default common variables required across all 35 email templates in Tb_EventMaster
        const common = {
            LogoUrl: process.env.COMPANY_LOGO_PATH || `${baseUrl}/assets/images/Eduvora.png`,
            CompanyName: process.env.COMPANY_NAME || "Eduvora",
            LoginUrl: process.env.LOGIN_URL || `${baseUrl}/login`,
            TermsUrl: process.env.TERMS_URL || `${baseUrl}/terms`,
            PrivacyUrl: process.env.PRIVACY_URL || `${baseUrl}/privacy`,
            SupportEmail: process.env.SUPPORT_EMAIL || "support@eduvora.com",
            CurrentYear: new Date().getFullYear(),

            // Feature Deep Links
            KycUrl: `${baseUrl}/kyc`,
            KycStatusUrl: `${baseUrl}/kyc`,
            WalletUrl: `${baseUrl}/earnings`,
            WithdrawalUrl: `${baseUrl}/payouts`,
            CommissionStatementUrl: `${baseUrl}/payouts`,
            ReferralDashboardUrl: `${baseUrl}/myreferrals`,
            GenealogyUrl: `${baseUrl}/mynetwork`,
            OrderUrl: `${baseUrl}/orders`,
            PackageUrl: `${baseUrl}/courses`,
            PaymentUrl: `${baseUrl}/orders`,
            PaymentStatusUrl: `${baseUrl}/orders`,
            InvoiceUrl: `${baseUrl}/orders`
        };

        const values = {
            ...common,
            ...replacements
        };

        // Replace both {{key}} and {key} in HTML template and Subject
        Object.keys(values).forEach(key => {
            const val = values[key] !== undefined && values[key] !== null ? String(values[key]) : "";

            // Replace in HTML body
            html = html
                .replace(new RegExp(`\\{\\{${key}\\}\\}`, "g"), val)
                .replace(new RegExp(`\\{${key}\\}`, "g"), val);

            // Replace in Subject line
            subject = subject
                .replace(new RegExp(`\\{\\{${key}\\}\\}`, "g"), val)
                .replace(new RegExp(`\\{${key}\\}`, "g"), val);
        });

        // Clean up any remaining unreplaced {placeholder} tags
        html = html
            .replace(/\{\{[a-zA-Z0-9_]+\}\}/g, "")
            .replace(/\{[a-zA-Z0-9_]+\}/g, "");

        subject = subject
            .replace(/\{\{[a-zA-Z0-9_]+\}\}/g, "")
            .replace(/\{[a-zA-Z0-9_]+\}/g, "");

        const info = await transporter.sendMail({
            from: `"${process.env.COMPANY_NAME || 'Eduvora'}" <${process.env.SMTP_USER}>`,
            to,
            subject,
            html
        });

        logger.info(`[EMAIL SENT] EventId: ${eventId} | To: ${to} | Subject: "${subject}" | MessageId: ${info.messageId}`);
        return info;
    } catch (err) {
        logger.error(`[EMAIL ERROR] EventId ${eventId} to ${to}: ${err.message}`);
        throw err;
    }
};