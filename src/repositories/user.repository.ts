import { db } from '../config/database';

export const findAllUsers = async () => {
    const result = await db.query('SELECT id, username, email, nomor_hp, role, is_verified FROM users');
    return result.rows;
};

export const findUserById = async (id: string) => {
    const result = await db.query('SELECT id, username, email, nomor_hp, role, is_verified FROM users WHERE id = $1', [id]);
    return result.rows[0] || null;
};

export const findUserByEmail = async (email: string) => {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0] || null;
};

export const insertUser = async (data: { username: string; email: string; password: string; nomor_hp: string; role?: string }) => {
    const result = await db.query(
        'INSERT INTO users (username, email, password, nomor_hp, role, is_verified) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, username, email, nomor_hp, role',
        [data.username, data.email, data.password, data.nomor_hp, data.role || 'investor', true]
    );
    return result.rows[0];
};

export const modifyUser = async (id: string, data: { username?: string; email?: string; nomor_hp?: string }) => {
    const existing = await findUserById(id);
    if (!existing) return null;

    const updated = {
        username: data.username || existing.username,
        email: data.email || existing.email,
        nomor_hp: data.nomor_hp || existing.nomor_hp
    };

    const result = await db.query(
        'UPDATE users SET username = $1, email = $2, nomor_hp = $3, update_at = NOW() WHERE id = $4 RETURNING id, username, email, nomor_hp, role',
        [updated.username, updated.email, updated.nomor_hp, id]
    );

    return result.rows[0];
};

export const removeUserById = async (id: string): Promise<boolean> => {
    const result = await db.query('DELETE FROM users WHERE id = $1', [id]);
    return (result.rowCount ?? 0) > 0;
};