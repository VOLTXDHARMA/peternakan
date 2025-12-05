
// Import Router dari Express dan controller serta middleware terkait user
import { Router } from 'express';
import {
    getUser,
    getUsers,
    postUser,
    putUser,
    deleteUserById
} from '../controllers/user.controller';
import { authenticate } from '../middlewares/auth.middleware';


// Inisialisasi router untuk endpoint user
const router = Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 */

// Endpoint untuk mendapatkan semua user (dengan autentikasi)
router.get('/', authenticate, getUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A user
 *       404:
 *         description: User not found
 */

// Endpoint untuk mendapatkan user berdasarkan ID (dengan autentikasi)
router.get('/:id', authenticate, getUser);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user (Registration)
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 */

// Endpoint untuk membuat user baru (tanpa autentikasi untuk registrasi)
router.post('/', postUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated
 */

// Endpoint untuk mengupdate user berdasarkan ID (dengan autentikasi)
router.put('/:id', authenticate, putUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: User deleted
 */

// Endpoint untuk menghapus user berdasarkan ID (dengan autentikasi)
router.delete('/:id', authenticate, deleteUserById);


// Export router agar bisa digunakan di file utama
export default router;
