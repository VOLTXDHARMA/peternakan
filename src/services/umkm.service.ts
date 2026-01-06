
import {
    findAllUmkm,
    findUmkmById,
    insertUmkm,
    updateUmkm,
    deleteUmkm
} from '../repositories/umkm.repository.js';

// Service untuk mendapatkan semua UMKM
export const getAllUmkm = async () => {
    return await findAllUmkm();
};

// Service untuk mendapatkan detail UMKM berdasarkan ID
export const getUmkmDetail = async (id: string | number) => {
    const umkm = await findUmkmById(id);
    if (!umkm) {
        throw new Error('UMKM not found');
    }
    return umkm;
};

// Service untuk membuat UMKM baru
export const createUmkm = async (data: {
    user_id: string;
    nama_lengkap: string;
    jenis_usaha: string;
    lokasi_peternakan?: string;
    jenis_peternakan_utama?: string;
    foto_profile?: string;
}) => {
    return await insertUmkm(data);
};

// Service untuk mengupdate UMKM
export const updateUmkmService = async (id: string | number, data: Partial<{
    user_id: string;
    nama_lengkap: string;
    jenis_usaha: string;
    lokasi_peternakan: string;
    jenis_peternakan_utama: string;
    foto_profile: string;
}>) => {
    const existingUmkm = await findUmkmById(id);
    if (!existingUmkm) {
        return null;
    }

    return await updateUmkm(id, data as any);
};

// Service untuk menghapus UMKM
export const deleteUmkmService = async (id: string | number) => {
    const existingUmkm = await findUmkmById(id);
    if (!existingUmkm) {
        throw new Error('UMKM not found');
    }

    return await deleteUmkm(id);
};
