import {
    findUserById,
    findAllUsers,
    insertUser,
    modifyUser,
    removeUserById
} from '../repositories/user.repository';

export const getUserDetail = async (id: string) => {
    const user = await findUserById(id);
    if (!user) throw new Error('User not found');
    return user;
};

export const getAllUsers = async () => {
    return await findAllUsers();
};

export const createUser = async (data: { username: string; email: string; password: string; nomor_hp?: string; role?: string }) => {
    // ensure repository expects username, email, password, nomor_hp
    return await insertUser({ username: data.username, email: data.email, password: data.password, nomor_hp: data.nomor_hp || '', role: data.role });
};

export const updateUser = async (id: string, data: { username?: string; email?: string; nomor_hp?: string }) => {
    const updated = await modifyUser(id, data);
    if (!updated) throw new Error('User not found or update failed');
    return updated;
};

export const deleteUser = async (id: string) => {
    const success = await removeUserById(id);
    if (!success) throw new Error('User not found or delete failed');
};