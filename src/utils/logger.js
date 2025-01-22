import winston from "winston";
import path from "path";
import fs from "fs";

// Define log file paths
const logsDir = path.join(process.cwd(), "logs");
const errorLog = path.join(logsDir, "error.log");
const combinedLog = path.join(logsDir, "combined.log");

// Ensure logs directory exists
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Create Winston logger
const logger = winston.createLogger({
  level: "info", // Default log level
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.File({ filename: errorLog, level: "error" }),
    new winston.transports.File({ filename: combinedLog }),
  ],
});

// Add console transport for development
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ level, message }) => {
          return `[${level.toUpperCase()}]: ${message}`;
        })
      ),
    })
  );
}

export default logger;
