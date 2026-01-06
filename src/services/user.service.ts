
// Import fungsi repository untuk operasi database user
// Repository bertugas melakukan query langsung ke database
import {
    findUserById,
    findAllUsers,
    insertUser,
    modifyUser,
    removeUserById
} from '../repositories/user.repository.js';


// Service untuk mendapatkan detail user berdasarkan ID
// Parameter: id (string) - ID user yang akan dicari
// Return: data user jika ditemukan
// Throw error jika user tidak ditemukan
export const getUserDetail = async (id: string) => {
    // Panggil repository untuk mencari user di database
    const user = await findUserById(id);
    // Jika user tidak ditemukan, lempar error
    if (!user) throw new Error('User not found');
    // Kembalikan data user
    return user;
};


// Service untuk mendapatkan semua data user dari database
// Return: array berisi semua data user
export const getAllUsers = async () => {
    // Panggil repository untuk mengambil semua user
    return await findAllUsers();
};


// Service untuk membuat user baru
// Parameter: data user (username, email, password)
// Return: data user yang baru dibuat
export const createUser = async (data: {
    username: string;
    email: string;
    password: string;
}) => {
    // Panggil repository untuk insert user baru ke database
    return await insertUser(data);
};


// Service untuk mengupdate data user
// Parameter: id user dan data yang akan diupdate (username dan/atau email)
// Return: data user yang sudah diupdate
// Throw error jika user tidak ditemukan atau update gagal
export const updateUser = async (
    id: string,
    data: { username?: string; email?: string }
) => {
    // Panggil repository untuk update user di database
    const updated = await modifyUser(id, data);
    // Jika update gagal atau user tidak ditemukan, lempar error
    if (!updated) throw new Error('User not found or update failed');
    // Kembalikan data user yang sudah diupdate
    return updated;
};


// Service untuk menghapus user berdasarkan ID
// Parameter: id user yang akan dihapus
// Throw error jika user tidak ditemukan atau delete gagal
export const deleteUser = async (id: string) => {
    // Panggil repository untuk menghapus user dari database
    const success = await removeUserById(id);
    // Jika delete gagal atau user tidak ditemukan, lempar error
    if (!success) throw new Error('User not found or delete failed');
};