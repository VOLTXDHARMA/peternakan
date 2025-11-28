
// Import library express-rate-limit untuk membatasi jumlah request
import rateLimit from "express-rate-limit";


// Middleware untuk membatasi jumlah request dari satu IP
export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 menit
    max: 100, // maksimum 100 request per 15 menit
    message: {
        status: 429,
        message: "Terlalu banyak permintaan, silakan coba lagi nanti.",
    },
    standardHeaders: true, // mengirimkan info rate limit di headers
    legacyHeaders: false, // menonaktifkan headers `X-RateLimit-*`
});
