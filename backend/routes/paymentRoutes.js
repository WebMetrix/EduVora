import express from 'express';
import { createOrder, processWebhook, downloadInvoice } from '../controllers/paymentController.js';

import { isLoggedIn } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create-order', isLoggedIn, createOrder);
router.post('/webhook', processWebhook);
router.get('/invoice', isLoggedIn, downloadInvoice);
router.get('/invoice/:orderNumber', isLoggedIn, downloadInvoice);

export default router;
