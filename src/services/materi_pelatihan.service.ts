import * as repo from '../repositories/materi_pelatihan.repository.js';

export const getAll = async () => {
    return await repo.findAllMateri();
};

export const getById = async (id: string) => {
    return await repo.findMateriById(id);
};

export const getByPelatihan = async (pelatihanId: string) => {
    return await repo.findByPelatihanId(pelatihanId);
};

export const create = async (payload: any) => {
    return await repo.insertMateri(payload);
};

export const update = async (id: string, payload: any) => {
    return await repo.updateMateri(id, payload);
};

export const remove = async (id: string) => {
    return await repo.deleteMateri(id);
};
