import * as repo from '../repositories/pelatihan.repository';

export const getAll = async () => {
    return await repo.findAllPelatihan();
};

export const getById = async (id: string) => {
    return await repo.findPelatihanById(id);
};

export const create = async (payload: any) => {
    return await repo.insertPelatihan(payload);
};

export const update = async (id: string, payload: any) => {
    return await repo.updatePelatihan(id, payload);
};

export const remove = async (id: string) => {
    return await repo.deletePelatihan(id);
};
