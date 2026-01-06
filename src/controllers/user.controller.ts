
// Import tipe yang diperlukan dari Express untuk menangani HTTP request, response, dan middleware
import { Request, Response, NextFunction } from 'express';

// Import fungsi layanan terkait user untuk logika bisnis
import {
    getUserDetail,
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
} from '../services/user.service.js';

// Import utilitas untuk mengirim response sukses yang terstandarisasi
import { successResponse } from '../utils/response.js';


// Controller untuk mendapatkan detail satu user berdasarkan ID dari parameter URL
// Fungsi ini async karena memanggil database yang memerlukan waktu
export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Panggil service untuk mendapatkan detail user berdasarkan ID dari params
        const user = await getUserDetail(req.params.id);
        // Kirim response sukses dengan data user
        successResponse(res, 'User retrieved successfully', user);
    } catch (err) {
        // Jika terjadi error, teruskan ke error handler middleware
        next(err);
    }
};


// Controller untuk mendapatkan daftar semua user dari database
// Parameter _req dengan underscore berarti parameter tidak digunakan (untuk menghindari warning)
export const getUsers = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        // Panggil service untuk mendapatkan semua user
        const users = await getAllUsers();
        // Kirim response sukses dengan array data user
        successResponse(res, 'User retrieved successfully', users);
    } catch (err) {
        // Jika terjadi error, teruskan ke error handler middleware
        next(err);
    }
};


// Tipe data untuk body yang diharapkan saat membuat user baru
// Definisi tipe membantu TypeScript melakukan type checking
type CreateUserBody = {
    username: string;
    email: string;
    password: string;
};

// Controller untuk membuat user baru
// Request generic: <params, resBody, reqBody> untuk type safety
export const postUser = async (
    req: Request<{}, {}, CreateUserBody>,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    // Validasi: cek apakah request body ada
    if (!req.body) {
        return res.status(400).json({ message: 'Request body is required' });
    }

    try {
        // Panggil service untuk membuat user baru dengan data dari request body
        const newUser = await createUser(req.body);

        // Jika pembuatan user gagal (null), kembalikan error 500
        if (newUser === null) {
            return res.status(500).json({ message: 'Failed to create user' });
        }

        // Kembalikan user yang berhasil dibuat dengan status 201 (Created)
        successResponse(res, 'User created successfully', newUser, 201);
    } catch (err) {
        // Jika terjadi error, teruskan ke error handler middleware
        next(err);
    }
};


// Controller untuk mengupdate data user berdasarkan ID
// Generic type Request: <params dengan id, resBody, reqBody dengan username dan email optional>
export const putUser = async (
    req: Request<{ id: string }, {}, { username?: string; email?: string }>,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        // Panggil service untuk mengupdate user dengan ID dari params dan data dari body
        const updatedUser = await updateUser(req.params.id, req.body);
        if (!updatedUser) {
            // Jika user tidak ditemukan atau update gagal, kembalikan 404
            return res.status(404).json({ message: 'User not found or update failed' });
        }
        // Kembalikan data user yang sudah diupdate dengan status 200 (OK)
        return res.status(200).json({ message: 'User updated successfully', data: updatedUser });
    } catch (error) {
        // Jika terjadi error, teruskan ke error handler middleware
        next(error);
    }
};


// Controller untuk menghapus user berdasarkan ID
// Return type Promise<void> karena tidak mengembalikan nilai apapun
export const deleteUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Panggil service untuk menghapus user berdasarkan ID dari params
        await deleteUser(req.params.id);
        // Beri response 204 No Content jika berhasil (standar untuk DELETE request)
        res.status(204).send();
    } catch (err) {
        // Jika terjadi error, teruskan ke error handler middleware
        next(err);
    }
};