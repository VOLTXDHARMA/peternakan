
// Import fungsi repository untuk operasi database user
import {
    findUserById,
    findAllUsers,
    insertUser,
    modifyUser,
    removeUserById
} from '../repositories/user.repository';


// Mendapatkan detail user berdasarkan ID
export const getUserDetail = async (id: string) => {
    const user = await findUserById(id);
    if (!user) throw new Error('User not found');
    return user;
};


// Mendapatkan semua data user
export const getAllUsers = async () => {
    return await findAllUsers();
};


// Membuat user baru dengan data username, email, dan password
export const createUser = async (data: {
    username: string;
    email: string;
    password: string;
}) => {
    return await insertUser(data);
};


// Mengupdate user berdasarkan ID, username/email boleh opsional
export const updateUser = async (
    id: string,
    data: { username?: string; email?: string }
) => {
    const updated = await modifyUser(id, data);
    if (!updated) throw new Error('User not found or update failed');
    return updated;
};


// Menghapus user berdasarkan ID
export const deleteUser = async (id: string) => {
    const success = await removeUserById(id);
    if (!success) throw new Error('User not found or delete failed');
};