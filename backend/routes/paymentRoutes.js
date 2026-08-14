import express from 'express';
import { createOrder, processWebhook } from '../controllers/paymentController.js';

import { isLoggedIn } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create-order', isLoggedIn, createOrder);
router.post('/webhook', processWebhook);

export default router;
