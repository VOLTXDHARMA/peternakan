/**
 * Service untuk operasi data dokumen pembiayaan.
 * Berisi fungsi untuk mengambil, menambah, mengupdate, dan menghapus dokumen pembiayaan.
 * Digunakan di fitur pembiayaan pada dashboard.
 */
import authService from './authService';

const API_URL = 'http://localhost:3000/api';

export interface DokumenPembiayaan {
  id: number;
  pembiayaan_id: string;
  jenis_dokumentasi: 'ktp' | 'kk' | 'surat_usaha' | 'npwp' | 'rekening_koran';
  url_file: string;
  status_verifikasi: 'pending' | 'diterima' | 'ditolak';
  catatan_verifikasi?: string;
  created_at?: string;
  updated_at?: string;
}

export const dokumenPembiayaanService = {
  async getAllDokumen(): Promise<DokumenPembiayaan[]> {
    const token = authService.getToken();
    const response = await fetch(`${API_URL}/dokumen_pembiayaan`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) throw new Error('Failed to fetch dokumen');
    
    const result = await response.json();
    return result.data;
  },

  async getDokumenById(id: number): Promise<DokumenPembiayaan> {
    const token = authService.getToken();
    const response = await fetch(`${API_URL}/dokumen_pembiayaan/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) throw new Error('Dokumen not found');
    
    const result = await response.json();
    return result.data;
  },

  async createDokumen(data: Omit<DokumenPembiayaan, 'id' | 'created_at' | 'updated_at'>): Promise<DokumenPembiayaan> {
    const token = authService.getToken();
    const response = await fetch(`${API_URL}/dokumen_pembiayaan`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) throw new Error('Failed to create dokumen');
    
    const result = await response.json();
    return result.data;
  },

  async updateDokumen(id: number, data: Partial<DokumenPembiayaan>): Promise<DokumenPembiayaan> {
    const token = authService.getToken();
    const response = await fetch(`${API_URL}/dokumen_pembiayaan/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) throw new Error('Failed to update dokumen');
    
    const result = await response.json();
    return result.data;
  },

  async deleteDokumen(id: number): Promise<void> {
    const token = authService.getToken();
    const response = await fetch(`${API_URL}/dokumen_pembiayaan/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) throw new Error('Failed to delete dokumen');
  }
};
