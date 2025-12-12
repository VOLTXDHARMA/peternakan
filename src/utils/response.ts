

// Import tipe Response dari Express
import { Response } from 'express';


// Fungsi utilitas untuk mengirim response sukses dengan format standar
export const successResponse = (
    res: Response,
    message: string,
    data: any = null,
    statusCode: number = 200
) => {
    // Jika status 204 (No Content), kirim tanpa body
    if (statusCode === 204) return res.status(statusCode).send();
    // Kirim response JSON dengan status, pesan, dan data
    return res.status(statusCode).json({
        status: 'success',
        message,
        data
    });
};
