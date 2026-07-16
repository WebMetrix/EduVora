import winston from 'winston';
import 'winston-daily-rotate-file';

// Define the custom log format
const logFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.printf(({ timestamp, level, message, stack }) => {
        return `[${timestamp}] ${level.toUpperCase()}: ${stack || message}`;
    })
);

// 1. General Application Transport (Info level)
const infoTransport = new winston.transports.DailyRotateFile({
    filename: 'logs/application-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    level: 'info',        // Captures info and warnings (ignores debug)
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
});

// 2. Dedicated Error Transport (Error level only)
const errorTransport = new winston.transports.DailyRotateFile({
    filename: 'logs/error-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    level: 'error',      // Exclusively captures errors
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
});

// Create the logger instance
const logger = winston.createLogger({
    level: 'info', // Sets the minimum logging level to info (disabling debug entirely)
    format: logFormat,
    transports: [
        infoTransport,
        errorTransport,
        new winston.transports.Console() // Keeps console output active for local terminal viewing
    ]
});

export default logger;