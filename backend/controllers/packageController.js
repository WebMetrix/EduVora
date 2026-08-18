import pool from '../config/db.js';

export const getPackages = async (req, res) => {
    try {
        const result = await pool.request().execute('EV_GetPackages');
        res.status(200).json(result.recordset);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
