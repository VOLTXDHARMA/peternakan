import {
    findAllTernak,
    findTernakById,
    insertTernak,
    updateTernak,
    deleteTernak,
    TernakCreate,
    TernakUpdate
} from '../repositories/ternak.repository';

export const getAllTernak = async () => {
    return await findAllTernak();
};

export const getTernakDetail = async (id: string) => {
    const ternak = await findTernakById(id);
    if (!ternak) throw new Error('Ternak not found');
    return ternak;
};

export const createTernak = async (data: TernakCreate) => {
    return await insertTernak(data);
};

export const updateTernakById = async (id: string, data: TernakUpdate) => {
    const updated = await updateTernak(id, data);
    if (!updated) throw new Error('Ternak not found or update failed');
    return updated;
};

export const removeTernak = async (id: string) => {
    const success = await deleteTernak(id);
    if (!success) throw new Error('Ternak not found or delete failed');
};