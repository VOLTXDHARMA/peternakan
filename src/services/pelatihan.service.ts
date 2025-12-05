import {
  findAllPelatihan,
  findPelatihanById,
  insertPelatihan,
  updatePelatihan,
  deletePelatihan
} from '../repositories/pelatihan.repository';

export const getAllPelatihan = async () => {
  return await findAllPelatihan();
};

export const getPelatihanDetail = async (id: string | number) => {
  const pelatihan = await findPelatihanById(id);
  if (!pelatihan) throw new Error('Pelatihan not found');
  return pelatihan;
};

export const createPelatihan = async (data: {
  judul_pelatihan: string;
  deskripsi: string;
  kategori: string;
  tingkat_kesulitan: string;
  durasi_menit: number;
  instruktur?: string;
  tumbnail?: string;
  video_url?: string;
  dokumen_url?: string;
  passing_score?: number;
  is_published?: boolean;
}) => {
  return await insertPelatihan(data);
};

export const updatePelatihanService = async (
  id: string | number,
  data: Partial<{
    judul_pelatihan: string;
    deskripsi: string;
    kategori: string;
    tingkat_kesulitan: string;
    durasi_menit: number;
    instruktur: string;
    tumbnail: string;
    video_url: string;
    dokumen_url: string;
    passing_score: number;
    is_published: boolean;
  }>
) => {
  return await updatePelatihan(id, data);
};

export const deletePelatihanService = async (id: string | number) => {
  return await deletePelatihan(id);
};
