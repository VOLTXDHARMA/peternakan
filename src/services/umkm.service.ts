import {
  findAllUmkm,
  findUmkmById,
  insertUmkm,
  updateUmkm,
  deleteUmkm
} from '../repositories/umkm.repository';

export const getAllUmkm = async () => {
  return await findAllUmkm();
};

export const getUmkmDetail = async (id: string | number) => {
  const umkm = await findUmkmById(id);
  if (!umkm) throw new Error('UMKM not found');
  return umkm;
};

export const createUmkm = async (data: {
  user_id: number;
  nama_lengkap: string;
  jenis_usaha: string;
  lokasi_peternakan?: string;
  jenis_peternakan_utama?: string;
  foto_profile?: string;
}) => {
  return await insertUmkm(data);
};

export const updateUmkmService = async (
  id: string | number,
  data: Partial<{
    user_id: number;
    nama_lengkap: string;
    jenis_usaha: string;
    lokasi_peternakan: string;
    jenis_peternakan_utama: string;
    foto_profile: string;
  }>
) => {
  return await updateUmkm(id, data);
};

export const deleteUmkmService = async (id: string | number) => {
  return await deleteUmkm(id);
};
