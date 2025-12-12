import {
    findAllPelatihan,
    findPelatihanById,
    insertPelatihan,
    updatePelatihan,
    deletePelatihan
} from '../repositories/pelatihan.repository';

// Service untuk mendapatkan semua pelatihan
export const getAllPelatihan = async () => {
    return await findAllPelatihan();
};

// Service untuk mendapatkan detail pelatihan berdasarkan ID
export const getPelatihanDetail = async (id: number) => {
    const pelatihan = await findPelatihanById(id);
    if (!pelatihan) {
        throw new Error('Pelatihan not found');
    }
    return pelatihan;
};

// Service untuk membuat pelatihan baru
export const createPelatihan = async (data: {
    judul_pelatihan: string;
    deskripsi: string;
    kategori: string;
    tingkat_kesulitan: string;
    durasi_menit: number;
    instruktur?: string;
    thumbnail?: string;
    video_url?: string;
    dokumen_url?: string;
    passing_score?: number;
    is_published?: boolean;
}) => {
    return await insertPelatihan(data);
};

// Service untuk mengupdate pelatihan
export const updatePelatihanService = async (id: number, data: Partial<{
    judul_pelatihan: string;
    deskripsi: string;
    kategori: string;
    tingkat_kesulitan: string;
    durasi_menit: number;
    instruktur: string;
    passing_score: number;
    is_published: boolean;
}>) => {
    const existingPelatihan = await findPelatihanById(id);
    if (!existingPelatihan) {
        return null;
    }

    return await updatePelatihan(id, data);
};

// Service untuk menghapus pelatihan
export const deletePelatihanService = async (id: number) => {
    const existingPelatihan = await findPelatihanById(id);
    if (!existingPelatihan) {
        throw new Error('Pelatihan not found');
    }

    await deletePelatihan(id);
};
