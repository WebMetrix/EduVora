import express from 'express';
import { getUserOrders, getOrderDetails, getOrdersExport } from '../controllers/orderController.js';
import { isLoggedIn } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', isLoggedIn, getUserOrders);
router.get('/details/:orderNumber', isLoggedIn, getOrderDetails);
router.get('/export', isLoggedIn, getOrdersExport);

export default router;
