import nodemailer from "nodemailer";
import pool, { sql } from "../config/db.js";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

export const sendEmail = async ({
    eventId,
    to,
    replacements
}) => {

    // Fetch template
    const request = pool.request();

    request.input("EventId", sql.Int, eventId);

    const result = await request.execute("EV_GetEmailTemplate");

    if (!result.recordset.length) {
        throw new Error("Email template not found.");
    }

    const {
        EmailSubject,
        EmailTemplate
    } = result.recordset[0];

    let html = EmailTemplate;

    const common = {
        LogoUrl: process.env.COMPANY_LOGO_URL,
        CompanyName: process.env.COMPANY_NAME,
        LoginUrl: process.env.LOGIN_URL,
        TermsUrl: process.env.TERMS_URL,
        PrivacyUrl: process.env.PRIVACY_URL,
        SupportEmail: process.env.SUPPORT_EMAIL,
        CurrentYear: new Date().getFullYear()
    };

    const values = {
        ...common,
        ...replacements
    };

    Object.keys(values).forEach(key => {
        html = html.replace(
            new RegExp(`{{${key}}}`, "g"),
            values[key] ?? ""
        );
    });

    await transporter.sendMail({
        from: `"${process.env.COMPANY_NAME}" <${process.env.SMTP_USER}>`,
        to,
        subject: EmailSubject,
        html
    });

};