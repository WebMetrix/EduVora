import jwt from 'jsonwebtoken';
import logger from '../utils/logger.js';
import { t } from '../utils/translation.js';
import "dotenv/config";

export const isLoggedIn = (req, res, next) => {
    // Check if cookie exists and has a token and can be romoved later
    console.log("Cookies received:", req.cookies);

    let token = req.cookies?.token;

    if (!token) {
        return res.status(401).send({ message: t('api.auth.missingToken') });
    }

    try {
        let data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data;
        next();
    } catch (err) {
        return res.status(401).send({ message: t('api.auth.generalError') });
    }
};
