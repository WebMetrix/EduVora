import crypto from 'crypto';
import "dotenv/config";

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || '531add3155a7f298cfe89c75e0a71a15'; 
const FIXED_IV = process.env.FIXED_IV || 'a017c7892740e661'; 

/**
 * Encrypts the UserID (e.g., 'EV-2026-6305') into a URL-safe hex string
 */
export const encryptUserId = (userId) => {
    if (!userId) return null;
    try {
        const cipher = crypto.createCipheriv(
            'aes-256-cbc', 
            Buffer.from(ENCRYPTION_KEY), 
            Buffer.from(FIXED_IV)
        );
        let encrypted = cipher.update(userId, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        
        return encrypted; 
    } catch (err) {
        console.error("Encryption Error:", err);
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
            'aes-256-cbc', 
            Buffer.from(ENCRYPTION_KEY), 
            Buffer.from(FIXED_IV)
        );
        let decrypted = decipher.update(encryptedString, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        
        return decrypted; 
    } catch (err) {
        console.error("Decryption Error (Invalid Link):", err);
        return null;
    }
};
