import pool, { sql } from '../config/db.js';
import logger from '../utils/logger.js';

// Helper to normalize SP order row into uniform structure (supporting camelCase & PascalCase)
const normalizeOrder = (o) => {
    if (!o) return null;
    return {
        ...o,
        orderId: o.OrderId ?? o.orderId,
        orderNumber: o.OrderNumber ?? o.orderNumber,
        totalAmount: o.TotalAmount ?? o.totalAmount ?? 0,
        gstAmount: o.GSTAmount ?? o.gstAmount ?? 0,
        subTotal: o.SubTotal ?? o.subTotal ?? (o.TotalAmount - (o.GSTAmount || 0)),
        orderStatusId: o.OrderStatusId ?? o.orderStatusId,
        orderStatus: o.OrderStatus ?? o.orderStatus ?? (o.OrderStatusId === '2' ? 'Completed' : 'Pending'),
        statusCode: (o.StatusCode ?? o.statusCode ?? o.OrderStatus ?? (o.OrderStatusId === '2' ? 'completed' : 'pending')).toLowerCase(),
        paymentMethod: o.PaymentMethod ?? o.paymentMethod ?? 'Net Banking',
        transactionId: o.TransactionId ?? o.transactionId ?? '-',
        orderDate: o.OrderDate ?? o.orderDate,
        orderDateIST: o.OrderDateIST ?? o.orderDateIST,
        packageId: o.PackageId ?? o.packageId,
        packageName: o.PackageName ?? o.packageName ?? 'Course Package',
        packagePrice: o.PackagePrice ?? o.packagePrice ?? 0,
        packageDescription: o.PackageDescription ?? o.packageDescription ?? '',
        invoiceId: o.InvoiceId ?? o.invoiceId,
        invoiceNumber: o.InvoiceNumber ?? o.invoiceNumber,
        invoiceDate: o.InvoiceDate ?? o.invoiceDate,
        invoicePath: o.InvoicePath ?? o.invoicePath,
        hasInvoice: o.HasInvoice === 1 || o.hasInvoice === 1 || !!o.InvoiceNumber
    };
};

// Get Paginated Orders and Summary Stats (ActionType 1)
export const getUserOrders = async (req, res) => {
    // #swagger.tags = ['Orders']
    try {
        const uuid = req.user.id;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || req.query.searchQuery || null;
        const timeFilter = req.query.timeFilter || req.query.dateFilter || null;
        const statusFilter = req.query.statusFilter || null;

        const request = pool.request();
        request.input('ActionType', sql.Int, 1);
        request.input('UUID', sql.VarChar(36), uuid);
        request.input('PageNumber', sql.Int, page);
        request.input('PageSize', sql.Int, limit);
        request.input('SearchQuery', sql.NVarChar(100), search);
        request.input('DateFilter', sql.VarChar(20), timeFilter);
        request.input('StatusFilter', sql.VarChar(20), statusFilter);

        const result = await request.execute('dbo.EV_GetUserOrders');

        // Result Set 1: Summary Stats
        const statsRow = result.recordsets[0]?.[0] || {
            TotalOrders: 0,
            CompletedOrders: 0,
            PendingOrders: 0,
            FailedOrders: 0
        };

        // Result Set 2: Paginated List
        const rawOrders = result.recordsets[1] || [];
        const orders = rawOrders.map(normalizeOrder);
        const totalCount = orders[0]?.FilteredTotal || orders[0]?.filteredTotal || 0;
        const totalPages = orders[0]?.TotalPages || orders[0]?.totalPages || 1;

        res.status(200).json({
            success: true,
            stats: {
                total: statsRow.TotalOrders,
                completed: statsRow.CompletedOrders,
                pending: statsRow.PendingOrders,
                failed: statsRow.FailedOrders
            },
            orders,
            pagination: {
                page,
                limit,
                total: totalCount,
                totalPages
            }
        });
    } catch (error) {
        logger.error(`Error fetching user orders: ${error.message}`, { error });
        res.status(500).json({
            success: false,
            message: 'Failed to fetch user orders'
        });
    }
};

// Get Single Order Details (ActionType 2)
export const getOrderDetails = async (req, res) => {
    // #swagger.tags = ['Orders']
    try {
        const uuid = req.user.id;
        const { orderNumber } = req.params;

        if (!orderNumber) {
            return res.status(400).json({
                success: false,
                message: 'Order number is required'
            });
        }

        const request = pool.request();
        request.input('ActionType', sql.Int, 2);
        request.input('UUID', sql.VarChar(36), uuid);
        request.input('OrderNumber', sql.VarChar(50), orderNumber);

        const result = await request.execute('dbo.EV_GetUserOrders');
        const rawOrder = result.recordset?.[0];

        if (!rawOrder) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        res.status(200).json({
            success: true,
            order: normalizeOrder(rawOrder)
        });
    } catch (error) {
        logger.error(`Error fetching order details: ${error.message}`, { error });
        res.status(500).json({
            success: false,
            message: 'Failed to fetch order details'
        });
    }
};

// Get Filtered Orders for Excel Export (ActionType 3)
export const getOrdersExport = async (req, res) => {
    // #swagger.tags = ['Orders']
    try {
        const uuid = req.user.id;
        const search = req.query.search || null;
        const timeFilter = req.query.timeFilter || null;
        const statusFilter = req.query.statusFilter || null;

        const request = pool.request();
        request.input('ActionType', sql.Int, 3);
        request.input('UUID', sql.VarChar(36), uuid);
        request.input('SearchQuery', sql.NVarChar(100), search);
        request.input('DateFilter', sql.VarChar(20), timeFilter);
        request.input('StatusFilter', sql.VarChar(20), statusFilter);

        const result = await request.execute('dbo.EV_GetUserOrders');

        res.status(200).json({
            success: true,
            data: result.recordset || []
        });
    } catch (error) {
        logger.error(`Error exporting orders: ${error.message}`, { error });
        res.status(500).json({
            success: false,
            message: 'Failed to export orders'
        });
    }
};
