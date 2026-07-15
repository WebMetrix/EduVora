import sql from "mssql";
import dotenv from "dotenv";

dotenv.config();

const pool = new sql.ConnectionPool(process.env.DATABASE_URL);

try {
  await pool.connect();
  console.log("SQL Server Connected");
} catch (err) {
  console.error("SQL Server Connection Error:", err);
}

export default pool;
export { sql };