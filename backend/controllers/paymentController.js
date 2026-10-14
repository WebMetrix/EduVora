import { Cashfree, CFEnvironment } from "cashfree-pg";
import pool, { sql } from "../config/db.js";
import logger from "../utils/logger.js";
import { sendEmail } from "../services/emailService.js";
import EmailEvents from "../utils/emailEvents.js";

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

        const { packageId, amount, packageName, customerName, customerEmail, customerPhone } = req.body;
        const uuid = req.user.id; // From isLoggedIn middleware

        // 1. Extract customer details from session (req.user) or frontend (req.body)
        const finalCustomerName = customerName || req.user.name || req.user.FullName;
        const finalCustomerEmail = customerEmail || req.user.email || req.user.EmailAddress;
        const finalCustomerPhone = customerPhone || req.user.phone || req.user.MobileNumber;

        // Cashfree requires name, email, and phone. If missing, reject the request instead of using dummy data.
        if (!finalCustomerName || !finalCustomerEmail || !finalCustomerPhone) {
            return res.status(400).json({
                success: false,
                message: "Missing required customer details. Please provide customerName, customerEmail, and customerPhone in the request body."
            });
        }

        const orderAmount = Number(amount) || 1;

        // 2. Initialize Order in Database to get OrderNumber
        const initReq = pool.request();
        initReq.input('ActionType', sql.Int, 1); // 1 = INITIATE
        initReq.input('UUID', sql.VarChar(36), uuid);
        initReq.input('PackageId', sql.Int, parseInt(packageId) || 1);
        initReq.input('Amount', sql.Decimal(18, 2), orderAmount);

        const initRes = await initReq.execute('dbo.EV_ProcessCashfreePayment');

        if (!initRes.recordset || initRes.recordset.length === 0) {
            throw new Error("Failed to generate Order in database");
        }

        const orderId = initRes.recordset[0].OrderNumber;

        // 3. Create Cashfree Order
        var request = {
            "order_amount": orderAmount,
            "order_currency": process.env.UNIT,
            "order_id": orderId,
            "customer_details": {
                "customer_id": uuid, // Strictly link Cashfree to Eduvora UUID
                "customer_phone": finalCustomerPhone,
                "customer_name": finalCustomerName,
                "customer_email": finalCustomerEmail
            },
            "order_meta": {
                // In production, use your real domain here
                "notify_url": process.env.WEBHOOK
            },
            "order_note": packageName ? `Payment for ${packageName}` : "Package Purchase",
            "order_tags": {
                "package_id": String(packageId || 1)
            }
        };

        const response = await cashfree.PGCreateOrder(request);
        logger.info(`Cashfree Order Created: ${response.data.order_id} for UUID: ${uuid}`);

        // Trigger PAYMENT_PENDING email asynchronously (Event 22)
        if (finalCustomerEmail) {
            sendEmail({
                eventId: EmailEvents.PAYMENT_PENDING,
                to: finalCustomerEmail,
                replacements: {
                    FullName: finalCustomerName,
                    OrderId: orderId,
                    PaymentAmount: `₹${orderAmount.toLocaleString('en-IN')}`,
                    TransactionId: response.data.payment_session_id || orderId,
                    PaymentDateTime: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
                }
            }).catch(err => logger.error(`Failed to send Payment Pending email to ${finalCustomerEmail}: ${err.message}`));
        }

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
            const gatewayOrderId = paymentData?.cf_payment_id || orderData?.cf_order_id || 'UNKNOWN';
            const packageId = orderData.order_tags?.package_id;
            const customerUid = orderData.customer_details?.customer_id;
            const paymentStatus = paymentData?.payment_status; // SUCCESS, FAILED

            // Extract the payment method/group (e.g., net_banking, upi, card)
            const paymentMethod = paymentData?.payment_group || paymentData?.payment_method?.card?.card_network;

            logger.info(`Processing Webhook for Order: ${orderNumber}, Status: ${paymentStatus}, Method: ${paymentMethod}`);
            // logger.info(`Extracted cf_payment_id: ${paymentData?.cf_payment_id}`);
            // logger.info(`Final gatewayOrderId: ${gatewayOrderId}`);
            // logger.info(`String(gatewayOrderId): ${String(gatewayOrderId)}`);

            // Update Database with Webhook data
            const hookReq = pool.request();
            hookReq.input('ActionType', sql.Int, 2); // 2 = WEBHOOK
            hookReq.input('OrderNumber', sql.VarChar(50), orderNumber);
            hookReq.input('GatewayOrderId', sql.VarChar(100), String(gatewayOrderId));
            hookReq.input('PaymentStatus', sql.VarChar(50), paymentStatus);
            hookReq.input('GatewayResponse', sql.NVarChar(sql.MAX), JSON.stringify(payload));
            hookReq.input('UUID', sql.VarChar(36), customerUid);
            hookReq.input('PackageId', sql.Int, parseInt(packageId) || 1);
            hookReq.input('PaymentMethod', sql.VarChar(50), String(paymentMethod).toUpperCase());

            await hookReq.execute('dbo.EV_ProcessCashfreePayment');
            logger.info(`Database updated successfully from Webhook for Order: ${orderNumber}`);

            // Asynchronously dispatch dynamic email notifications based on payment result
            (async () => {
                try {
                    let customerEmail = orderData.customer_details?.customer_email;
                    let customerName = orderData.customer_details?.customer_name;
                    let childUserId = null;

                    if (customerUid) {
                        const uReq = pool.request();
                        uReq.input('UUID', sql.VarChar(36), customerUid);
                        const uRes = await uReq.execute('dbo.EV_GetUserProfile');
                        if (uRes.recordset && uRes.recordset.length > 0) {
                            const u = uRes.recordset[0];
                            if (u.EmailAddress) customerEmail = u.EmailAddress;
                            if (u.FullName) customerName = u.FullName;
                            childUserId = u.UserID;
                        }
                    }

                    // Fetch Package Name using existing stored procedure EV_GetPackages
                    let packageName = "Course Package";
                    if (packageId) {
                        const pkgRes = await pool.request().execute('dbo.EV_GetPackages');
                        if (pkgRes.recordset && pkgRes.recordset.length > 0) {
                            const matchedPkg = pkgRes.recordset.find(p => p.PackageId === parseInt(packageId));
                            if (matchedPkg) {
                                packageName = matchedPkg.PackageName;
                            }
                        }
                    }

                    const orderAmount = Number(orderData.order_amount || paymentData?.payment_amount || 0);
                    const formattedAmount = `₹${orderAmount.toLocaleString('en-IN')}`;
                    const paymentDateStr = paymentData?.payment_completion_time || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
                    const paymentMethodStr = String(paymentMethod || 'Online Payment').toUpperCase();
                    const invoiceNumber = `INV-${orderNumber.replace(/[^0-9]/g, '').slice(-8) || Date.now()}`;

                    if (paymentStatus === 'SUCCESS') {
                        if (customerEmail) {
                            // 1. Payment Successful (Event 17)
                            sendEmail({
                                eventId: EmailEvents.PAYMENT_SUCCESSFUL,
                                to: customerEmail,
                                replacements: {
                                    FullName: customerName || 'Valued Member',
                                    PackageName: packageName,
                                    PaidAmount: formattedAmount,
                                    TransactionId: String(gatewayOrderId),
                                    OrderId: orderNumber,
                                    PaymentDateTime: paymentDateStr,
                                    PaymentMethod: paymentMethodStr
                                }
                            }).catch(err => logger.error(`Failed to send Payment Successful email: ${err.message}`));

                            // 2. Order Confirmation (Event 16)
                            sendEmail({
                                eventId: EmailEvents.ORDER_CONFIRMATION,
                                to: customerEmail,
                                replacements: {
                                    FullName: customerName || 'Valued Member',
                                    OrderId: orderNumber,
                                    PackageName: packageName,
                                    OrderDate: new Date().toLocaleDateString('en-IN'),
                                    OrderAmount: formattedAmount,
                                    PaymentStatus: 'Paid'
                                }
                            }).catch(err => logger.error(`Failed to send Order Confirmation email: ${err.message}`));

                            // 3. Package Activated (Event 20)
                            sendEmail({
                                eventId: EmailEvents.PACKAGE_ACTIVATED,
                                to: customerEmail,
                                replacements: {
                                    FullName: customerName || 'Valued Member',
                                    PackageName: packageName,
                                    ActivationDate: new Date().toLocaleDateString('en-IN'),
                                    OrderId: orderNumber,
                                    PackageExpiryDate: 'Lifetime Access'
                                }
                            }).catch(err => logger.error(`Failed to send Package Activated email: ${err.message}`));

                            // 4. Invoice Generated (Event 19)
                            sendEmail({
                                eventId: EmailEvents.INVOICE_GENERATED,
                                to: customerEmail,
                                replacements: {
                                    FullName: customerName || 'Valued Member',
                                    InvoiceNumber: invoiceNumber,
                                    OrderId: orderNumber,
                                    InvoiceDate: new Date().toLocaleDateString('en-IN'),
                                    PackageName: packageName,
                                    InvoiceAmount: formattedAmount
                                }
                            }).catch(err => logger.error(`Failed to send Invoice Generated email: ${err.message}`));
                        }

                        // 5. Notify Direct Sponsor (Event 34: Referral Purchased Package)
                        if (childUserId) {
                            const spReq = pool.request();
                            spReq.input('ChildUserId', sql.VarChar(100), childUserId);
                            const spRes = await spReq.execute('dbo.EV_GetSponsorDetails');

                            if (spRes.recordset && spRes.recordset.length > 0) {
                                const { SponsorEmail, SponsorName } = spRes.recordset[0];
                                if (SponsorEmail) {
                                    sendEmail({
                                        eventId: EmailEvents.REFERRAL_PURCHASED_PACKAGE,
                                        to: SponsorEmail,
                                        replacements: {
                                            FullName: SponsorName,
                                            ReferralName: customerName || 'Your Referral',
                                            ReferralUserId: childUserId,
                                            PackageName: packageName,
                                            PurchaseDate: paymentDateStr,
                                            OrderId: orderNumber,
                                            CommissionAmount: 'Calculated in Wallet',
                                            CommissionStatus: 'Credited'
                                        }
                                    }).catch(err => logger.error(`Failed to send Referral Purchased Package email to sponsor: ${err.message}`));
                                }
                            }
                        }

                    } else if (paymentStatus === 'FAILED') {
                        const failureReason = paymentData?.payment_message || 'Payment was declined or timed out.';

                        if (customerEmail) {
                            // 1. Payment Failed (Event 18)
                            sendEmail({
                                eventId: EmailEvents.PAYMENT_FAILED,
                                to: customerEmail,
                                replacements: {
                                    FullName: customerName || 'Valued Member',
                                    PackageName: packageName,
                                    OrderId: orderNumber,
                                    OrderAmount: formattedAmount,
                                    PaymentFailureReason: failureReason,
                                    PaymentDateTime: paymentDateStr
                                }
                            }).catch(err => logger.error(`Failed to send Payment Failed email: ${err.message}`));

                            // 2. Payment Failure Notice (Event 23)
                            sendEmail({
                                eventId: EmailEvents.PAYMENT_FAILURE_NOTICE,
                                to: customerEmail,
                                replacements: {
                                    FullName: customerName || 'Valued Member',
                                    OrderId: orderNumber,
                                    PaymentAmount: formattedAmount,
                                    TransactionId: String(gatewayOrderId),
                                    PaymentFailureReason: failureReason
                                }
                            }).catch(err => logger.error(`Failed to send Payment Failure Notice email: ${err.message}`));
                        }
                    }
                } catch (notifyErr) {
                    logger.error(`Error sending webhook email notifications: ${notifyErr.message}`, { error: notifyErr });
                }
            })();
        }

        // Return 200 OK to acknowledge receipt of the webhook to Cashfree
        res.status(200).send("Webhook received");
    } catch (error) {
        logger.error(`Error processing webhook: ${error.message || String(error)}`, { error });
        res.status(500).send("Webhook error");
    }
};
