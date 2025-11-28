
// Import tipe yang diperlukan dari Express untuk menangani HTTP request, response, dan middleware
import { Request, Response, NextFunction } from 'express';

// Import fungsi layanan terkait user untuk logika bisnis
import {
    getUserDetail,
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
} from '../services/user.service';

// Import utilitas untuk mengirim response sukses yang terstandarisasi
import { successResponse } from '../utils/response';


// Controller untuk mendapatkan detail satu user berdasarkan ID
export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await getUserDetail(req.params.id);
        successResponse(res, 'User retrieved successfully', user);
    } catch (err) {
        next(err);
    }
};


// Controller untuk mendapatkan daftar semua user
export const getUsers = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await getAllUsers();
        successResponse(res, 'User retrieved successfully', users);
    } catch (err) {
        next(err);
    }
};


// Tipe data untuk body yang diharapkan saat membuat user baru
type CreateUserBody = {
    username: string;
    email: string;
    password: string;
};

// Controller untuk membuat user baru
export const postUser = async (
    req: Request<{}, {}, CreateUserBody>,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    // Cek apakah request body ada
    if (!req.body) {
        return res.status(400).json({ message: 'Request body is required' });
    }

    try {
        // Panggil service untuk membuat user baru
        const newUser = await createUser(req.body);

        // Jika pembuatan user gagal, kembalikan error
        if (newUser === null) {
            return res.status(500).json({ message: 'Failed to create user' });
        }

        // Kembalikan user yang berhasil dibuat dengan status 201
        return res.status(201).json(newUser);
    } catch (err) {
        next(err);
    }
};


// Controller untuk mengupdate user berdasarkan ID
export const putUser = async (
    req: Request<{ id: string }, {}, { username?: string; email?: string }>,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        // Panggil service untuk mengupdate user dengan ID dan body yang diberikan
        const updatedUser = await updateUser(req.params.id, req.body);
        if (!updatedUser) {
            // Jika user tidak ditemukan atau update gagal, kembalikan 404
            return res.status(404).json({ message: 'User not found or update failed' });
        }
        // Kembalikan data user yang sudah diupdate
        return res.status(200).json({ message: 'User updated successfully', data: updatedUser });
    } catch (error) {
        next(error);
    }
};


// Controller untuk menghapus user berdasarkan ID
export const deleteUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Panggil service untuk menghapus user
        await deleteUser(req.params.id);
        // Beri response 204 No Content jika berhasil
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};
