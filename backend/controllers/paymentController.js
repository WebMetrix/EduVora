import { Cashfree, CFEnvironment } from "cashfree-pg";

// Initialize Cashfree SDK instance
const cashfree = new Cashfree(
    CFEnvironment.SANDBOX, 
    process.env.CASHFREE_APP_ID,
    process.env.CASHFREE_SECRET_KEY
);


export const createDemoOrder = async (req, res) => {
    // #swagger.tags = ['Payment']
    try {
        const { packageId, amount, packageName } = req.body;
        
        const orderId = `order_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
        const orderAmount = amount || 1; // Use provided amount or default to 1

        var request = {
            "order_amount": orderAmount,
            "order_currency": "INR",
            "order_id": orderId,
            "customer_details": {
                "customer_id": "cust_demo_123",
                "customer_phone": "9999999999",
                "customer_name": "Demo User",
                "customer_email": "demo@example.com"
            },
            "order_meta": {
                // In a real app, this should be the absolute URL to your backend webhook
                // Cashfree cannot reach localhost unless using a tool like ngrok.
                // For demo purposes, we will just set it to a dummy url or a local ip.
                // Usually webhook should be a publicly accessible URL.
                "notify_url": "https://webhook.site/dummy-webhook-url-replace-later"
            },
            "order_note": packageName ? `Payment for ${packageName}` : "Demo test order"
        };

        const response = await cashfree.PGCreateOrder(request);
        console.log("Cashfree Order Created:", response.data);

        res.status(200).json({
            success: true,
            payment_session_id: response.data.payment_session_id,
            order_id: response.data.order_id
        });

    } catch (error) {
        console.error("Error creating demo Cashfree order:", error.response?.data || error.message);
        res.status(500).json({
            success: false,
            message: "Failed to create demo order",
            error: error.response?.data || error.message
        });
    }
};

export const handleWebhook = async (req, res) => {
    // #swagger.tags = ['Payment']
    try {
        console.log("-----------------------------------------");
        console.log("Webhook Received from Cashfree!");
        console.log("Headers:", req.headers);
        console.log("Body:", JSON.stringify(req.body, null, 2));
        console.log("-----------------------------------------");

        // Here you would verify the signature to ensure authenticity
        // Cashfree.PGVerifyWebhookSignature(req.headers["x-webhook-signature"], req.rawBody, Cashfree.XClientSecret);
        
        // Return 200 OK to acknowledge receipt of the webhook
        res.status(200).send("Webhook received");
    } catch (error) {
        console.error("Error processing webhook:", error);
        res.status(500).send("Webhook error");
    }
};
