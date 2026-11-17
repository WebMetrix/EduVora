import ejs from 'ejs';
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import pool, { sql } from '../config/db.js';
import logger from '../utils/logger.js';

// Base UNC path for invoices
const DEFAULT_INVOICE_REPO_PATH = '\\\\EDUVORA-001\\EduVora-001\\Invoices';

/**
 * Resolves the browser executable path on Windows/Linux environments
 */
function getBrowserExecutablePath() {
    if (process.env.PUPPETEER_EXECUTABLE_PATH && fs.existsSync(process.env.PUPPETEER_EXECUTABLE_PATH)) {
        return process.env.PUPPETEER_EXECUTABLE_PATH;
    }
    const candidates = [
        'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
        'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
    ];
    for (const p of candidates) {
        if (fs.existsSync(p)) return p;
    }
    return undefined; // Puppeteer will use default bundled Chromium if available
}

/**
 * Resolves base64 data URI for Eduvora logo so Puppeteer can embed it offline
 */
function getLogoDataUri() {
    try {
        const logoPath = path.resolve(process.cwd(), 'App_Data', 'Images', 'Eduvora.png');
        if (fs.existsSync(logoPath)) {
            const buffer = fs.readFileSync(logoPath);
            return `data:image/png;base64,${buffer.toString('base64')}`;
        }
    } catch (err) {
        logger.warn(`Could not load local Eduvora logo: ${err.message}`);
    }
    return process.env.COMPANY_LOGO_PATH || 'https://theduvora.com/assets/images/Eduvora.png';
}

/**
 * Retrieves the base invoices repository directory
 */
export async function getInvoicesRepositoryPath() {
    try {
        const request = pool.request();
        request.input('DocumentType', sql.VarChar(100), 'Invoice');
        const result = await request.execute('dbo.EV_GetFileRepositoryPath');
        if (result.recordset && result.recordset.length > 0 && result.recordset[0].path) {
            return result.recordset[0].path;
        }
    } catch (err) {
        // Fallback to configured or default network path
    }
    return process.env.INVOICE_REPOSITORY_PATH || DEFAULT_INVOICE_REPO_PATH;
}

/**
 * Generates the incremental invoice number with format:
 * #INV_EV-YYYYMMDD-0001
 */
export async function generateNextInvoiceNumber() {
    // Current date formatted in YYYYMMDD (Asia/Kolkata)
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
    const parts = formatter.formatToParts(now);
    const yyyy = parts.find(p => p.type === 'year')?.value;
    const mm = parts.find(p => p.type === 'month')?.value;
    const dd = parts.find(p => p.type === 'day')?.value;
    const datePrefix = `${yyyy}${mm}${dd}`;
    const prefix = `#INV_EV-${datePrefix}-`;

    try {
        // Try calling Stored Procedure EV_GetNextInvoiceNumber if it exists
        const request = pool.request();
        request.input('DatePrefix', sql.VarChar(8), datePrefix);
        const result = await request.execute('dbo.EV_GetNextInvoiceNumber');
        if (result.recordset && result.recordset.length > 0 && result.recordset[0].NextInvoiceNumber) {
            return result.recordset[0].NextInvoiceNumber;
        }
    } catch (spErr) {
        // SP might not exist yet, fallback to checking Tb_Invoice table
        try {
            const checkReq = pool.request();
            checkReq.input('Prefix', sql.NVarChar(50), `${prefix}%`);
            const checkRes = await checkReq.query(`
                SELECT ISNULL(MAX(CAST(RIGHT(InvoiceNumber, 4) AS INT)), 0) AS MaxSeq 
                FROM dbo.Tb_Invoice 
                WHERE InvoiceNumber LIKE @Prefix
            `);
            const maxSeq = (checkRes.recordset && checkRes.recordset[0]?.MaxSeq) || 0;
            const nextSeq = maxSeq + 1;
            return `${prefix}${String(nextSeq).padStart(4, '0')}`;
        } catch (queryErr) {
            logger.warn(`Could not query Tb_Invoice for next sequence: ${queryErr.message}`);
        }
    }

    // Default fallback if database is inaccessible
    return `${prefix}0001`;
}

/**
 * Renders the EJS invoice template into HTML string
 */
export async function renderInvoiceHtml(data) {
    const templatePath = path.resolve(process.cwd(), 'App_Data', 'Invoice', 'EduVora_Invoice_Template.html');
    if (!fs.existsSync(templatePath)) {
        throw new Error(`Invoice template not found at ${templatePath}`);
    }

    const templateContent = fs.readFileSync(templatePath, 'utf8');
    return ejs.render(templateContent, data);
}

/**
 * Generates an A4 PDF from rendered HTML using Puppeteer
 */
export async function generateInvoicePdf(html, outputPath) {
    const executablePath = getBrowserExecutablePath();
    const launchOptions = {
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    };
    if (executablePath) {
        launchOptions.executablePath = executablePath;
    }

    const browser = await puppeteer.launch(launchOptions);
    try {
        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: 'networkidle0' });
        await page.pdf({
            path: outputPath,
            format: 'A4',
            printBackground: true,
            margin: {
                top: '0',
                right: '0',
                bottom: '0',
                left: '0'
            }
        });
        logger.info(`Invoice PDF generated successfully at: ${outputPath}`);
    } finally {
        await browser.close();
    }
}

/**
 * Saves the invoice record to dbo.Tb_Invoice via Stored Procedure
 */
export async function saveInvoiceToDatabase({
    invoiceNumber,
    orderNumber,
    orderId,
    billingName,
    billingAddress,
    subTotal,
    gstAmount,
    totalAmount,
    invoiceDate,
    invoicePath
}) {
    try {
        const request = pool.request();
        request.input('InvoiceNumber', sql.NVarChar(50), invoiceNumber);
        request.input('OrderNumber', sql.VarChar(50), orderNumber || null);
        request.input('OrderId', sql.Int, orderId || null);
        request.input('BillingName', sql.NVarChar(255), billingName || 'Valued Member');
        request.input('BillingAddress', sql.NVarChar(sql.MAX), billingAddress || '');
        request.input('SubTotal', sql.Decimal(18, 2), subTotal);
        request.input('GSTAmount', sql.Decimal(18, 2), gstAmount);
        request.input('TotalAmount', sql.Decimal(18, 2), totalAmount);
        request.input('InvoiceDate', sql.DateTime, invoiceDate || new Date());
        request.input('InvoicePath', sql.NVarChar(500), invoicePath || null);

        await request.execute('dbo.EV_CreateInvoice');
        logger.info(`Invoice record ${invoiceNumber} saved to database successfully.`);
        return true;
    } catch (err) {
        logger.warn(`Failed to execute dbo.EV_CreateInvoice: ${err.message}. Ensure stored procedure is deployed.`);
        return false;
    }
}

/**
 * Main function: Generates the invoice PDF, writes to \\EDUVORA-001\EduVora-001\Invoices\<UUID>\,
 * and saves the database record.
 */
export async function generateAndSaveInvoice({
    orderNumber,
    orderId,
    userUuid,
    customerDetails = {},
    packageDetails = {},
    paymentDetails = {}
}) {
    try {
        logger.info(`Starting invoice generation for Order: ${orderNumber}, User: ${userUuid}`);

        // 1. Generate incremental Invoice Number (#INV_EV-YYYYMMDD-0001)
        const invoiceNumber = await generateNextInvoiceNumber();

        // 2. Base Repository Path and User Folder
        const baseRepoPath = await getInvoicesRepositoryPath();
        const userFolder = path.join(baseRepoPath, userUuid || 'General');

        if (!fs.existsSync(userFolder)) {
            fs.mkdirSync(userFolder, { recursive: true });
        }

        const fileName = `${invoiceNumber}.pdf`;
        const filePath = path.join(userFolder, fileName);

        // 3. Calculate Amounts
        const totalAmount = Number(packageDetails.price || paymentDetails.amount || 0);
        const subTotal = Number((totalAmount / 1.18).toFixed(2));
        const gstAmount = Number((totalAmount - subTotal).toFixed(2));

        const formatInr = (val) => new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2
        }).format(val);

        const formatDisplayDate = (d) => {
            const dateObj = d ? new Date(d) : new Date();
            return dateObj.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            }); // e.g. "17 November 2026"
        };

        const invoiceDateStr = formatDisplayDate(paymentDetails.paymentDate);

        // 4. Construct Customer Address
        const customerAddressParts = [
            customerDetails.address,
            customerDetails.addressLine1,
            customerDetails.addressLine2
        ].filter(Boolean);
        const customerAddress = customerAddressParts.join(', ') || 'N/A';

        // 5. Build Complete Data Object for EJS Template
        const logoDataUri = getLogoDataUri();
        const invoiceData = {
            company: {
                name: process.env.COMPANY_NAME || "EduVora",
                legalName: process.env.COMPANY_LEGAL_NAME || "EduVora Technologies Pvt. Ltd.",
                logoUrl: logoDataUri,
                tagline: "LEARN • GROW • EARN",
                addressLine1: process.env.COMPANY_ADDRESS_1 || "123 Business Park",
                addressLine2: process.env.COMPANY_ADDRESS_2 || "Andheri East",
                city: process.env.COMPANY_CITY || "Mumbai",
                state: process.env.COMPANY_STATE || "Maharashtra",
                postalCode: process.env.COMPANY_POSTAL_CODE || "400069",
                country: "India",
                phone: process.env.COMPANY_PHONE || "+91 9876543210",
                email: process.env.SUPPORT_EMAIL || "support@eduvora.com",
                website: process.env.WEBSITE_URL || "https://theduvora.com",
                taxNumber: process.env.COMPANY_GSTIN || "27XXXXXXXXXX",
                pan: process.env.COMPANY_PAN || "XXXXXXXXXX",
                registrationNumber: process.env.COMPANY_CIN || "UXXXXXXXXXX",
                primaryColor: "#1769E0"
            },
            invoice: {
                title: "TAX INVOICE",
                invoiceNumber: invoiceNumber,
                orderNumber: orderNumber || "N/A",
                invoiceDate: invoiceDateStr,
                dueDate: null
            },
            customer: {
                name: customerDetails.name || "Valued Member",
                email: customerDetails.email || "",
                phone: customerDetails.phone || "",
                address: customerAddress,
                city: customerDetails.city || "",
                state: customerDetails.state || "",
                postalCode: customerDetails.postalCode || customerDetails.pincode || "",
                country: customerDetails.country || "India",
                taxNumber: customerDetails.taxNumber || null
            },
            items: [
                {
                    name: packageDetails.packageName || "Course Package",
                    description: "Digital Learning & Affiliate Membership Package",
                    details: "Lifetime Access to Courses, Modules & Community",
                    imageUrl: null,
                    quantity: 1,
                    unitPriceFormatted: formatInr(subTotal),
                    taxFormatted: formatInr(gstAmount),
                    amountFormatted: formatInr(totalAmount)
                }
            ],
            totals: {
                subtotalFormatted: formatInr(subTotal),
                discount: 0,
                discountFormatted: "₹0.00",
                tax: gstAmount,
                taxLabel: "GST (18%)",
                taxFormatted: formatInr(gstAmount),
                totalFormatted: formatInr(totalAmount)
            },
            payment: {
                paymentDate: invoiceDateStr,
                method: paymentDetails.paymentMethod || "Online Payment",
                transactionId: paymentDetails.transactionId || orderNumber || "TXN",
                status: "Success"
            },
            termsAndConditions: "This invoice confirms full payment for the digital products and memberships listed above. Digital products and packages are granted lifetime access subject to the standard terms of service.",
            footer: {
                message: "Thank you for choosing EduVora!",
                email: process.env.SUPPORT_EMAIL || "support@eduvora.com",
                phone: process.env.COMPANY_PHONE || "+91 9876543210",
                website: process.env.WEBSITE_URL || "https://theduvora.com",
                termsUrl: process.env.TERMS_URL || "https://theduvora.com/terms",
                privacyUrl: process.env.PRIVACY_URL || "https://theduvora.com/privacy"
            }
        };

        // 6. Render HTML & Generate PDF
        const renderedHtml = await renderInvoiceHtml(invoiceData);
        await generateInvoicePdf(renderedHtml, filePath);

        // 7. Save Record to Database (Stored Procedure)
        await saveInvoiceToDatabase({
            invoiceNumber,
            orderNumber,
            orderId,
            billingName: customerDetails.name || "Valued Member",
            billingAddress: `${customerAddress}, ${customerDetails.city || ''} ${customerDetails.state || ''} ${customerDetails.postalCode || ''}`.trim(),
            subTotal,
            gstAmount,
            totalAmount,
            invoiceDate: new Date(),
            invoicePath: filePath
        });

        return {
            success: true,
            invoiceNumber,
            fileName,
            filePath,
            totalAmount,
            invoiceDate: invoiceDateStr
        };
    } catch (err) {
        logger.error(`Error in generateAndSaveInvoice: ${err.message}`, { error: err });
        throw err;
    }
}
