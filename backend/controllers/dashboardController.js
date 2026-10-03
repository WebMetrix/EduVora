import pool, { sql } from "../config/db.js";
import logger from '../utils/logger.js';
import { t } from '../utils/translation.js';

export const getRecentActivities = async (req, res) => {
    // #swagger.tags = ['Dashboard']
    const uuid = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    try {
        const request = pool.request();
        request.input('UUID', sql.VarChar(36), uuid);
        request.input('PageNumber', sql.Int, page);
        request.input('PageSize', sql.Int, limit);

        const result = await request.execute('dbo.EV_GetRecentActivities');

        return res.status(200).send({
            message: t('api.dashboard.activitiesSuccess') || 'Activities fetched successfully',
            data: result.recordset || []
        });

    } catch (err) {
        logger.error(`GET RECENT ACTIVITIES ERROR: ${err.message}`, { stack: err.stack });
        res.status(500).send({ message: t('api.dashboard.activitiesError') || 'Failed to fetch activities' });
    }
};
