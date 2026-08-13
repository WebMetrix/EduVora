import express from 'express';
import { createDemoOrder, handleWebhook } from '../controllers/paymentController.js';

const router = express.Router();

// Demo routes for testing Cashfree integration
router.post('/demo/create-order', createDemoOrder);
router.post('/demo/webhook', handleWebhook);

export default router;
