import * as repo from '../repositories/progres_pelatihan.repository.js';

export const getAll = async () => {
    return await repo.findAll();
};

export const getById = async (id: string) => {
    return await repo.findById(id);
};

export const getByUserAndPelatihan = async (userId: string, pelatihanId: string) => {
    return await repo.findByUserAndPelatihan(userId, pelatihanId);
};

export const create = async (payload: any) => {
    return await repo.insert(payload);
};

export const update = async (id: string, payload: any) => {
    return await repo.update(id, payload);
};

export const remove = async (id: string) => {
    return await repo.remove(id);
};
