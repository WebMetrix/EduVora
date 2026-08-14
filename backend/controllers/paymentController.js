import { Cashfree, CFEnvironment } from "cashfree-pg";
import pool, { sql } from "../config/db.js";
import logger from "../utils/logger.js";

export const createOrder = async (req, res) => {
    // #swagger.tags = ['Payment']
    try {
        // Initialize Cashfree SDK instance with environment and keys
        const cashfree = new Cashfree(
            CFEnvironment.SANDBOX,
            process.env.CASHFREE_APP_ID,
            process.env.CASHFREE_SECRET_KEY
        );
        
        // Using the latest API version (requires newer TEST_... Sandbox keys)
        // cashfree.XApiVersion = "2023-08-01";

        const { packageId, amount, packageName } = req.body;
        const uuid = req.user.id; // From isLoggedIn middleware

        // 1. Fetch user profile for Cashfree customer details
        const profileReq = pool.request();
        profileReq.input('UUID', sql.VarChar(36), uuid);
        const profileRes = await profileReq.execute('dbo.EV_GetUserProfile');
        
        if (!profileRes.recordset || profileRes.recordset.length === 0) {
            return res.status(404).json({ success: false, message: "User profile not found." });
        }
        
        const userProfile = profileRes.recordset[0];
        const customerName = userProfile.FullName || "Eduvora Student";
        const customerEmail = userProfile.EmailAddress || "student@eduvora.com";
        const customerPhone = userProfile.PrimaryMobile || userProfile.ContactMobile || "9999999999";
        const orderAmount = Number(amount) || 1;

        // 2. Initialize Order in Database to get OrderNumber
        const initReq = pool.request();
        initReq.input('ActionType', sql.VarChar(20), 'INITIATE');
        initReq.input('UUID', sql.VarChar(36), uuid);
        initReq.input('PackageId', sql.Int, parseInt(packageId) || 1);
        initReq.input('Amount', sql.Decimal(18,2), orderAmount);
        
        const initRes = await initReq.execute('dbo.EV_ProcessCashfreePayment');
        
        if (!initRes.recordset || initRes.recordset.length === 0) {
             throw new Error("Failed to generate Order in database");
        }
        
        const orderId = initRes.recordset[0].OrderNumber;

        // 3. Create Cashfree Order
        var request = {
            "order_amount": orderAmount,
            "order_currency": "INR",
            "order_id": orderId,
            "customer_details": {
                "customer_id": uuid, // Strictly link Cashfree to Eduvora UUID
                "customer_phone": customerPhone,
                "customer_name": customerName,
                "customer_email": customerEmail
            },
            "order_meta": {
                // In production, use your real domain here
                "notify_url": "https://webhook.site/dummy-webhook-url-replace-later"
            },
            "order_note": packageName ? `Payment for ${packageName}` : "Package Purchase",
            "order_tags": {
                "package_id": String(packageId || 1)
            }
        };

        const response = await cashfree.PGCreateOrder(request);
        logger.info(`Cashfree Order Created: ${response.data.order_id} for UUID: ${uuid}`);

        res.status(200).json({
            success: true,
            payment_session_id: response.data.payment_session_id,
            order_id: response.data.order_id
        });

    } catch (error) {
        logger.error(`Error creating Cashfree order for UUID ${req.user?.id}: ${error.message || String(error)}`, { error: error.response?.data || error });
        res.status(500).json({
            success: false,
            message: "Failed to create order",
            error: error.response?.data || error.message || String(error)
        });
    }
};

export const processWebhook = async (req, res) => {
    // #swagger.tags = ['Payment']
    try {
        logger.info("-----------------------------------------");
        logger.info("Webhook Received from Cashfree!");
        
        const payload = req.body;
        
        if (payload && payload.data && payload.data.order) {
            const orderData = payload.data.order;
            const paymentData = payload.data.payment;
            
            // Extract core fields
            const orderNumber = orderData.order_id; // Our internal OrderNumber
            const gatewayOrderId = orderData.cf_order_id;
            const packageId = orderData.order_tags?.package_id;
            const customerUid = orderData.customer_details?.customer_id;
            const paymentStatus = paymentData?.payment_status; // SUCCESS, FAILED
            
            // Extract the payment method/group (e.g., net_banking, upi, card)
            const paymentMethod = paymentData?.payment_group || paymentData?.payment_method?.card?.card_network || 'UNKNOWN';
            
            logger.info(`Processing Webhook for Order: ${orderNumber}, Status: ${paymentStatus}, Method: ${paymentMethod}`);
            
            // Update Database with Webhook data
            const hookReq = pool.request();
            hookReq.input('ActionType', sql.VarChar(20), 'WEBHOOK');
            hookReq.input('OrderNumber', sql.VarChar(50), orderNumber);
            hookReq.input('GatewayOrderId', sql.VarChar(100), String(gatewayOrderId));
            hookReq.input('PaymentStatus', sql.VarChar(50), paymentStatus);
            hookReq.input('GatewayResponse', sql.NVarChar(sql.MAX), JSON.stringify(payload));
            hookReq.input('UUID', sql.VarChar(36), customerUid);
            hookReq.input('PackageId', sql.Int, parseInt(packageId) || 1);
            hookReq.input('PaymentMethod', sql.VarChar(50), String(paymentMethod).toUpperCase());
            
            await hookReq.execute('dbo.EV_ProcessCashfreePayment');
            logger.info(`Database updated successfully from Webhook for Order: ${orderNumber}`);
        }

        // Return 200 OK to acknowledge receipt of the webhook to Cashfree
        res.status(200).send("Webhook received");
    } catch (error) {
        logger.error(`Error processing webhook: ${error.message || String(error)}`, { error });
        res.status(500).send("Webhook error");
    }
};
