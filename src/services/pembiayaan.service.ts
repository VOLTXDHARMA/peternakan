import * as repo from '../repositories/pembiayaan.repository';

export const getAll = async () => repo.findAll();
export const getById = async (id: string) => repo.findById(id);
export const create = async (data: repo.Pembiayaan) => repo.insert(data);
export const update = async (id: string, data: Partial<repo.Pembiayaan>) => repo.update(id, data);
export const remove = async (id: string) => repo.remove(id);
