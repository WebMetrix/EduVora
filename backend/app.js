import "dotenv/config";
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import pool from "./config/db.js";
const app = express();

// import routes
import authRoutes from "./routes/authRoutes.js";
import otpRoutes from "./routes/otpRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import passwordRoutes from './routes/passwordRoutes.js';
import referralRoutes from './routes/referralRoutes.js';


// Cors configuration
app.use(cors({
    origin: [
        "http://localhost:5173"       
    ],
    credentials: true, // This allows the cookies to be sent back and forth
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Cookie']
}))



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Added to serve static files from the network path
app.use('/avatars', express.static('\\\\EduVora-001\\EduVora-001\\UserData\\Profile'));

// app.get("/", async (req, res) => {
//     try {
//         const result = await pool.request().query("SELECT * FROM dbo.Tb_User");
//         res.json(result.recordset);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });


// routes 
app.use("/auth", authRoutes);
app.use('/otp', otpRoutes);
app.use('/profile', profileRoutes);
app.use('/password', passwordRoutes);
app.use('/referral', referralRoutes);



const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});