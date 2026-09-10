import crypto from 'crypto';
import "dotenv/config";
import { t } from './translation.js';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; 
const FIXED_IV = process.env.FIXED_IV; 

/**
 * Encrypts the UserID (e.g., 'EV-2026-6305') into a URL-safe hex string
 */
export const encryptUserId = (userId) => {
    if (!userId) return null;
    try {
        const cipher = crypto.createCipheriv(
            t('api.encryption.algorithm'), 
            Buffer.from(ENCRYPTION_KEY), 
            Buffer.from(FIXED_IV)
        );
        let encrypted = cipher.update(userId, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        
        return encrypted; 
    } catch (err) {
        console.error(`${t('api.encryption.error')}`, err);
        return null;
    }
};

/**
 * Decrypts the hex string back into the UserID
 */
export const decryptUserId = (encryptedString) => {
    if (!encryptedString) return null;
    try {
        const decipher = crypto.createDecipheriv(
            t('api.encryption.algorithm'), 
            Buffer.from(ENCRYPTION_KEY), 
            Buffer.from(FIXED_IV)
        );
        let decrypted = decipher.update(encryptedString, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        
        return decrypted; 
    } catch (err) {
        console.error(`${t('api.encryption.decryptError')}`, err);
        return null;
    }
};

/**
 * Encrypts generic string data
 */
export const encryptData = (data) => {
    if (!data) return null;
    try {
        const cipher = crypto.createCipheriv(
            t('api.encryption.algorithm'), 
            Buffer.from(ENCRYPTION_KEY), 
            Buffer.from(FIXED_IV)
        );
        let encrypted = cipher.update(data, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted; 
    } catch (err) {
        console.error(`Encryption error:`, err);
        return null;
    }
};

/**
 * Decrypts generic hex string data
 */
export const decryptData = (encryptedString) => {
    if (!encryptedString) return null;
    // If it's not a hex string (e.g. legacy plain text), return it as is or handle error
    try {
        const decipher = crypto.createDecipheriv(
            t('api.encryption.algorithm'), 
            Buffer.from(ENCRYPTION_KEY), 
            Buffer.from(FIXED_IV)
        );
        let decrypted = decipher.update(encryptedString, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted; 
    } catch (err) {
        // If decryption fails, it might be unencrypted legacy data, so return original
        return encryptedString;
    }
};
