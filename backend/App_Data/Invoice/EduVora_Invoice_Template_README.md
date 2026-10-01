# EduVora Invoice Template --- Configuration & Usage Guide

## 1. Overview

This package contains the EduVora invoice HTML template designed for
server-side generation with Node.js.

The template is written using **EJS syntax**, so all business, customer,
payment, tax, branding, and footer information can be supplied
dynamically from your Node.js application/database.

The intended flow is:

``` text
Payment Successfully Verified
        ↓
Create Order
        ↓
Prepare Invoice Data
        ↓
Render EJS HTML
        ↓
Generate PDF
        ↓
Save Invoice
        ↓
Email Invoice to Customer
```

The template does not contain hardcoded customer/order information.

------------------------------------------------------------------------

# 2. Files

The package contains:

``` text
EduVora_Invoice_Template.html
```

Use this file as your EJS invoice template.

Recommended project structure:

``` text
backend/
│
├── src/
│   ├── controllers/
│   ├── services/
│   │   └── invoiceService.js
│   ├── templates/
│   │   └── EduVora_Invoice_Template.ejs
│   └── utils/
│
├── generated/
│   └── invoices/
│
└── package.json
```

Rename the downloaded file from:

``` text
EduVora_Invoice_Template.html
```

to:

``` text
EduVora_Invoice_Template.ejs
```

when using EJS.

------------------------------------------------------------------------

# 3. Prerequisites

Install Node.js and the following packages:

``` bash
npm install ejs puppeteer
```

If you already have an Express/Node.js project, add these packages to
the existing project.

EJS is responsible for replacing dynamic values.

Puppeteer is recommended for converting the rendered HTML into an A4
PDF.

------------------------------------------------------------------------

# 4. How Dynamic Data Works

The HTML contains expressions such as:

``` ejs
<%= company.name %>
```

This means:

> Get the `name` property from the `company` object.

For example:

``` javascript
company: {
    name: "EduVora"
}
```

will produce:

``` text
EduVora
```

The template also supports conditions:

``` ejs
<% if (company.phone) { %>
    <%= company.phone %>
<% } %>
```

This means the phone number will only appear when a value exists.

Arrays are used for invoice items:

``` ejs
<% items.forEach(function(item, index) { %>
```

Therefore, you can have one or many products/packages on the same
invoice.

------------------------------------------------------------------------

# 5. Complete Data Object

Your Node.js invoice service should prepare an object similar to this:

``` javascript
const invoiceData = {

    company: {
        name: "EduVora",
        legalName: "EduVora Technologies Pvt. Ltd.",

        logoUrl: "https://yourdomain.com/assets/eduvora-logo.png",

        tagline: "LEARN • GROW • EARN",

        addressLine1: "123 Business Park",
        addressLine2: "Andheri East",

        city: "Mumbai",
        state: "Maharashtra",
        postalCode: "400069",
        country: "India",

        phone: "+91 9876543210",
        email: "support@eduvora.com",
        website: "https://theduvora.com",

        taxNumber: "27XXXXXXXXXX",
        pan: "XXXXXXXXXX",
        registrationNumber: "UXXXXXXXXXX",

        primaryColor: "#1769E0"
    },


    invoice: {
        title: "INVOICE",

        invoiceNumber: "INV-2026-000125",

        orderNumber: "ORD-2026-000125",

        invoiceDate: "02 October 2026",

        dueDate: null
    },


    customer: {
        name: "Customer Name",

        email: "customer@example.com",

        phone: "+91 9000000000",

        address: "Customer Address",

        city: "Mumbai",

        state: "Maharashtra",

        postalCode: "400001",

        country: "India",

        taxNumber: null
    },


    items: [
        {
            name: "Digital Growth Package",

            description: "Premium EBook + Audio Collection",

            details: "5 EBooks • 5 Audio Versions",

            imageUrl: "https://yourdomain.com/assets/package.jpg",

            quantity: 1,

            unitPriceFormatted: "₹999.00",

            taxFormatted: "₹179.82",

            amountFormatted: "₹1,178.82"
        }
    ],


    totals: {
        subtotalFormatted: "₹999.00",

        discount: 0,

        discountFormatted: "₹0.00",

        tax: 179.82,

        taxLabel: "GST (18%)",

        taxFormatted: "₹179.82",

        totalFormatted: "₹1,178.82"
    },


    payment: {
        paymentDate: "02 October 2026",

        method: "UPI",

        transactionId: "TXN123456789",

        status: "Success"
    },


    termsAndConditions:
        "This invoice confirms payment for the digital products listed above. " +
        "Digital products are subject to the applicable terms of purchase.",


    footer: {
        message: "Thank you for choosing EduVora!",

        email: "support@eduvora.com",

        phone: "+91 9876543210",

        website: "https://theduvora.com",

        termsUrl: "https://theduvora.com/terms",

        privacyUrl: "https://theduvora.com/privacy"
    }
};
```

------------------------------------------------------------------------

# 6. Configurable Company Information

The following values come from:

``` javascript
company
```

### Company Name

``` javascript
name: "EduVora"
```

Used by:

``` ejs
<%= company.name %>
```

### Legal Company Name

``` javascript
legalName: "EduVora Technologies Pvt. Ltd."
```

Used in the Seller Details section.

### Logo

``` javascript
logoUrl: "https://yourdomain.com/assets/eduvora-logo.png"
```

The logo is displayed using:

``` ejs
<img src="<%= company.logoUrl %>">
```

For production, use an HTTPS URL accessible by the PDF generation
server.

Avoid relying on:

``` text
C:\...
localhost
127.0.0.1
```

for a production invoice PDF.

### Tagline

``` javascript
tagline: "LEARN • GROW • EARN"
```

### Address

``` javascript
addressLine1: "123 Business Park",
addressLine2: "Andheri East",
city: "Mumbai",
state: "Maharashtra",
postalCode: "400069",
country: "India"
```

### Contact Information

``` javascript
phone: "+91 9876543210",
email: "support@eduvora.com",
website: "https://theduvora.com"
```

### Tax/Registration Information

``` javascript
taxNumber: "27XXXXXXXXXX",
pan: "XXXXXXXXXX",
registrationNumber: "UXXXXXXXXXX"
```

These should come from your company configuration table rather than
being hardcoded in the application.

------------------------------------------------------------------------

# 7. Changing Invoice Colors

The primary invoice color is controlled by:

``` javascript
company.primaryColor
```

Example:

``` javascript
primaryColor: "#1769E0"
```

This value controls:

-   Header border
-   Company name
-   Section headings
-   Invoice table header
-   Total amount
-   Footer message
-   Other primary UI elements

Therefore, changing:

``` javascript
primaryColor: "#1769E0"
```

to:

``` javascript
primaryColor: "#0F4C81"
```

changes the main invoice theme.

For EduVora, it is recommended to keep the primary color aligned with
the official brand configuration.

------------------------------------------------------------------------

# 8. Invoice Information

The `invoice` object contains document-level information.

``` javascript
invoice: {
    title: "INVOICE",
    invoiceNumber: "INV-2026-000125",
    orderNumber: "ORD-2026-000125",
    invoiceDate: "02 October 2026",
    dueDate: null
}
```

## Invoice Number

Should be generated by your backend.

Example:

``` text
INV-2026-000125
```

Do not generate invoice numbers in the HTML.

Recommended:

``` text
Database → Invoice Number Generator → Invoice Record → HTML
```

## Order Number

Pass the actual order number:

``` javascript
orderNumber: order.orderNumber
```

## Invoice Date

Use the date when the invoice is issued.

For EduVora, this should normally be generated after successful payment
verification and order creation.

------------------------------------------------------------------------

# 9. Customer Information

Customer information is passed through:

``` javascript
customer
```

Example:

``` javascript
customer: {
    name: user.fullName,
    email: user.email,
    phone: user.mobile,
    address: user.address,
    city: user.city,
    state: user.state,
    postalCode: user.postalCode,
    country: user.country,
    taxNumber: user.taxNumber
}
```

Do not fetch customer information inside the HTML template.

The invoice service should fetch the information from the database first
and then pass it to EJS.

------------------------------------------------------------------------

# 10. Invoice Items

Items are passed as an array:

``` javascript
items: [
    {
        name: "Digital Growth Package",
        description: "Premium EBook + Audio Collection",
        details: "5 EBooks • 5 Audio Versions",
        imageUrl: "https://yourdomain.com/assets/package.jpg",
        quantity: 1,
        unitPriceFormatted: "₹999.00",
        taxFormatted: "₹179.82",
        amountFormatted: "₹1,178.82"
    }
]
```

Multiple items are supported.

Example:

``` javascript
items: [
    {
        name: "EBook Package A",
        description: "Business EBooks",
        quantity: 1,
        unitPriceFormatted: "₹500.00",
        taxFormatted: "₹90.00",
        amountFormatted: "₹590.00"
    },
    {
        name: "EBook Package B",
        description: "Technology EBooks",
        quantity: 1,
        unitPriceFormatted: "₹400.00",
        taxFormatted: "₹72.00",
        amountFormatted: "₹472.00"
    }
]
```

The template automatically creates one table row per item.

------------------------------------------------------------------------

# 11. Package/EBook Image

The item image is optional.

``` javascript
imageUrl: "https://yourdomain.com/assets/package.jpg"
```

If no image is provided:

``` javascript
imageUrl: null
```

the image is automatically omitted.

This is controlled by:

``` ejs
<% if(item.imageUrl){ %>
```

------------------------------------------------------------------------

# 12. Amount and Tax Information

The `totals` object controls the invoice summary.

``` javascript
totals: {
    subtotalFormatted: "₹999.00",

    discount: 0,

    discountFormatted: "₹0.00",

    tax: 179.82,

    taxLabel: "GST (18%)",

    taxFormatted: "₹179.82",

    totalFormatted: "₹1,178.82"
}
```

Important:

The HTML should **display** calculated amounts.

It should not calculate tax or totals.

Calculate them in your backend.

Recommended flow:

``` text
Package Price
      ↓
Discount Calculation
      ↓
Tax Calculation
      ↓
Final Amount
      ↓
Invoice Data
      ↓
HTML
```

------------------------------------------------------------------------

# 13. Discount

If there is no discount:

``` javascript
discount: 0
```

The discount row will not be displayed.

If there is a discount:

``` javascript
discount: 100,
discountFormatted: "₹100.00"
```

the discount row automatically appears.

------------------------------------------------------------------------

# 14. Payment Details

Payment information is passed through:

``` javascript
payment
```

Example:

``` javascript
payment: {
    paymentDate: "02 October 2026",
    method: "UPI",
    transactionId: "TXN123456789",
    status: "Success"
}
```

Recommended database mapping:

``` text
Tb_Payment.PaymentDate
Tb_Payment.PaymentMethod
Tb_Payment.TransactionId
Tb_Payment.PaymentStatus
```

------------------------------------------------------------------------

# 15. Terms & Conditions

The terms are passed as a single configurable value:

``` javascript
termsAndConditions:
    "This invoice confirms payment for the digital products listed above."
```

For a production system, store the active invoice terms in a
configuration table.

For example:

``` text
Tb_CompanyConfiguration
```

or:

``` text
Tb_InvoiceConfiguration
```

Then pass the current terms to the invoice service.

------------------------------------------------------------------------

# 16. Footer

Footer information is controlled through:

``` javascript
footer
```

Example:

``` javascript
footer: {
    message: "Thank you for choosing EduVora!",
    email: "support@eduvora.com",
    phone: "+91 9876543210",
    website: "https://theduvora.com",
    termsUrl: "https://theduvora.com/terms",
    privacyUrl: "https://theduvora.com/privacy"
}
```

This allows the footer to be changed without modifying the HTML
template.

------------------------------------------------------------------------

# 17. Rendering the EJS Template

Create:

``` text
src/services/invoiceService.js
```

Example:

``` javascript
import fs from "fs/promises";
import path from "path";
import ejs from "ejs";

export async function renderInvoice(invoiceData) {

    const templatePath = path.join(
        process.cwd(),
        "src",
        "templates",
        "EduVora_Invoice_Template.ejs"
    );

    const template = await fs.readFile(
        templatePath,
        "utf8"
    );

    return ejs.render(
        template,
        invoiceData
    );
}
```

Usage:

``` javascript
const html = await renderInvoice(invoiceData);

console.log(html);
```

At this point, `html` contains the final invoice HTML with all EJS
variables replaced.

------------------------------------------------------------------------

# 18. Generate PDF Using Puppeteer

Example:

``` javascript
import puppeteer from "puppeteer";

export async function generateInvoicePdf(
    html,
    outputPath
) {

    const browser = await puppeteer.launch({
        headless: true
    });

    try {

        const page = await browser.newPage();

        await page.setContent(html, {
            waitUntil: "networkidle0"
        });

        await page.pdf({
            path: outputPath,
            format: "A4",
            printBackground: true,
            margin: {
                top: "0",
                right: "0",
                bottom: "0",
                left: "0"
            }
        });

    } finally {

        await browser.close();
    }
}
```

------------------------------------------------------------------------

# 19. Complete Invoice Generation Flow

Your Node.js backend can have a single service:

``` javascript
export async function createInvoicePdf(invoiceData) {

    const html = await renderInvoice(invoiceData);

    const fileName =
        `${invoiceData.invoice.invoiceNumber}.pdf`;

    const outputPath = path.join(
        process.cwd(),
        "generated",
        "invoices",
        fileName
    );

    await generateInvoicePdf(
        html,
        outputPath
    );

    return {
        fileName,
        outputPath
    };
}
```

------------------------------------------------------------------------

# 20. EduVora Payment Flow

For the actual EduVora system, use this sequence:

``` text
User Purchases Package
        ↓
Payment Gateway
        ↓
Payment Callback/Webhook
        ↓
Verify Payment
        ↓
Payment = SUCCESS
        ↓
Create/Update Order
        ↓
Generate Invoice Number
        ↓
Create Invoice Record
        ↓
Prepare Invoice Data
        ↓
Render EJS Template
        ↓
Generate PDF
        ↓
Store Invoice PDF
        ↓
Send Payment Success Email
        ↓
Attach Invoice PDF
        ↓
Activate Package
```

Do not generate the invoice merely because the user reaches the payment
success page.

Generate it only after your backend has verified the payment
successfully.

------------------------------------------------------------------------

# 21. Recommended Database Configuration

Keep configurable company information outside the HTML.

Example:

``` text
Tb_CompanyConfiguration
---------------------------------
CompanyName
LegalName
LogoUrl
Tagline
AddressLine1
AddressLine2
City
State
PostalCode
Country
Phone
Email
Website
GSTIN
PAN
RegistrationNumber
PrimaryColor
TermsAndConditions
PrivacyUrl
TermsUrl
```

Then your invoice service can load:

``` javascript
const companyConfig =
    await getCompanyConfiguration();
```

and map it into:

``` javascript
company: {
    name: companyConfig.CompanyName,
    legalName: companyConfig.LegalName,
    logoUrl: companyConfig.LogoUrl,
    tagline: companyConfig.Tagline,
    ...
}
```

------------------------------------------------------------------------

# 22. Important: Store an Invoice Snapshot

Do not rely only on the current company configuration when displaying an
old invoice.

For example:

``` text
2026 Invoice
Company Address = Mumbai

2027 Company Address = Delhi
```

If the user downloads the 2026 invoice in 2027, it should still show the
information that was applicable when the invoice was issued.

Therefore, when generating the invoice, save a snapshot of:

``` text
Seller Details
Customer Details
Invoice Number
Order Number
Items
Prices
Discount
Tax
Total
Payment Details
Terms
```

Recommended architecture:

``` text
Current Configuration
        ↓
Invoice Generation
        ↓
Invoice Snapshot
        ↓
PDF
```

------------------------------------------------------------------------

# 23. Do Not Put Sensitive Data in the HTML Template

Do not put:

``` text
Database Password
JWT Secret
Payment Gateway Secret
Encryption Key
SMTP Password
API Secret
```

inside the template.

Only pass data required to display the invoice.

------------------------------------------------------------------------

# 24. Logo Recommendation

For PDF generation, the safest approach is to use a publicly accessible
HTTPS image or embed the image as Base64.

Recommended production option:

``` javascript
logoUrl:
"https://theduvora.com/assets/images/eduvora-logo.png"
```

Avoid:

``` text
C:\Images\EduVora.png
```

or:

``` text
http://localhost:5173/Eduvora.png
```

when generating invoices on the production server.

------------------------------------------------------------------------

# 25. Testing Checklist

Before deploying the invoice:

### Company

-   [ ] Logo displays
-   [ ] Company name correct
-   [ ] Legal name correct
-   [ ] Address correct
-   [ ] GSTIN correct
-   [ ] PAN correct
-   [ ] Email correct
-   [ ] Phone correct
-   [ ] Website correct

### Invoice

-   [ ] Invoice number generated correctly
-   [ ] Order number correct
-   [ ] Invoice date correct
-   [ ] Customer details correct
-   [ ] Package name correct
-   [ ] Quantity correct
-   [ ] Unit price correct
-   [ ] Discount correct
-   [ ] Tax correct
-   [ ] Final amount correct

### Payment

-   [ ] Payment date correct
-   [ ] Payment method correct
-   [ ] Transaction ID correct
-   [ ] Payment status correct

### PDF

-   [ ] A4 size
-   [ ] No content overflow
-   [ ] No text overlap
-   [ ] Logo visible
-   [ ] Background colors visible
-   [ ] Table fits correctly
-   [ ] Footer visible
-   [ ] Multiple items work
-   [ ] Long customer names work
-   [ ] Long package names work
-   [ ] Long terms wrap correctly

------------------------------------------------------------------------

# 26. Recommended Final Project Structure

``` text
backend/
│
├── src/
│   │
│   ├── controllers/
│   │   └── invoiceController.js
│   │
│   ├── services/
│   │   └── invoiceService.js
│   │
│   ├── templates/
│   │   └── EduVora_Invoice_Template.ejs
│   │
│   ├── utils/
│   │   └── pdfGenerator.js
│   │
│   └── config/
│       └── invoiceConfig.js
│
├── generated/
│   └── invoices/
│
└── package.json
```

------------------------------------------------------------------------

# 27. Quick Start

### Step 1

Copy:

``` text
EduVora_Invoice_Template.html
```

into:

``` text
src/templates/
```

### Step 2

Rename it:

``` text
EduVora_Invoice_Template.ejs
```

### Step 3

Install:

``` bash
npm install ejs puppeteer
```

### Step 4

Create your `invoiceData` object.

### Step 5

Render:

``` javascript
const html = ejs.render(template, invoiceData);
```

### Step 6

Generate PDF:

``` javascript
await page.pdf({
    path: outputPath,
    format: "A4",
    printBackground: true
});
```

### Step 7

Save the PDF.

### Step 8

Attach the PDF to the Payment Successful/Invoice email.

------------------------------------------------------------------------

# 28. Key Rule

The HTML template should remain a **presentation layer only**.

Do not put:

``` text
Tax calculations
Discount calculations
Invoice number generation
Payment verification
Order creation
Database queries
Business rules
```

inside the HTML.

Those belong in your Node.js services/database layer.

The responsibility should be:

``` text
Database
   ↓
Business Logic
   ↓
Invoice Data Object
   ↓
EJS Template
   ↓
HTML
   ↓
Puppeteer
   ↓
PDF
```

This keeps the invoice reusable, maintainable, and easy to modify later.
