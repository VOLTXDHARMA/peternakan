import * as repo from '../repositories/umkm.repository';

export const getAll = async () => {
    return await repo.findAllUmkm();
};

export const getById = async (id: string) => {
    return await repo.findUmkmById(id);
};

export const create = async (payload: any) => {
    return await repo.insertUmkm(payload);
};

export const update = async (id: string, payload: any) => {
    return await repo.updateUmkm(id, payload);
};

export const remove = async (id: string) => {
    return await repo.deleteUmkm(id);
};
