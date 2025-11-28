
// Import library winston untuk logging
import winston from 'winston';


// Membuat logger dengan level info, format timestamp dan json, output ke console
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [new winston.transports.Console()]
});


// Export logger agar bisa digunakan di file lain
export default logger;
