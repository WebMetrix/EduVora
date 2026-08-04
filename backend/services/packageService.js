import pool from '../config/db.js';

export const getPackages = async () => {
    try {
        const result = await pool.request().execute('EV_GetPackages');
        return result.recordset;
    } catch (error) {
        throw new Error(error.message);
    }
};
