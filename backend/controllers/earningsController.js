import pool, { sql } from '../config/db.js';
import logger from '../utils/logger.js';

export const getMyEarnings = async (req, res) => {
    // #swagger.tags = ['Earnings']
    try {
        const uuid = req.user.id;

        const request = pool.request();

        // Mapped strictly to Tb_User.UUID (varchar(36))
        request.input('UUID', sql.VarChar(36), uuid);

        const result = await request.execute('dbo.EV_GetMyEarnings');

        // Mssql returns multiple result sets as an array of arrays in `result.recordsets`

        // 1. Wallet & Summary Stats (Top Cards)
        const summary = result.recordsets[0] && result.recordsets[0].length > 0
            ? result.recordsets[0][0]
            : null;

        // 2. Timeframe Dashboard Stats (Monthly/Quarterly/Yearly totals and growth %)
        const periodStats = result.recordsets[1] || [];

        // 3. Earnings Overview Chart (Time series grouped by Day/Month)
        const chartData = result.recordsets[2] || [];

        // 4. Earnings By Level (Doughnut Chart data for current month)
        const levelStats = result.recordsets[3] || [];

        // 5. Commission History Table (Deep list with user details)
        const commissions = result.recordsets[4] || [];

        // 6. Wallet Transactions Table (Credits, Withdrawals, Pending)
        const transactions = result.recordsets[5] || [];

        res.status(200).json({
            summary,
            periodStats,
            chartData,
            levelStats,
            commissions,
            transactions
        });

    } catch (error) {
        logger.error('Error fetching earnings details:', error);
        res.status(500).json({ message: 'Failed to retrieve earnings details', error: error.message });
    }
};
