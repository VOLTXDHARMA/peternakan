/**
 * Service untuk operasi data ternak.
 * Berisi fungsi untuk mengambil, menambah, mengupdate, dan menghapus data ternak.
 * Digunakan di fitur peternak pada dashboard.
 */
import authService from './authService.js';

const API_URL = '/api';

export interface Ternak {
  id: number;
  user_id: number;
  umkm_id?: number;
  kode_ternak: string;
  jenis_ternak: string;
  ras?: string;
  jenis_kelamin: 'jantan' | 'betina';
  tanggal_lahir?: string;
  umur_bulan?: number;
  berat_awal?: number;
  berat_sekarang?: number;
  kondisi: 'sehat' | 'sakit' | 'karantina' | 'mati';
  harga_beli?: number;
  foto_ternak?: string;
  status: 'aktif' | 'dijual' | 'mati';
  created_at: string;
  updated_at?: string;
}

class TernakService {
  private static instance: TernakService;

  private constructor() {}

  static getInstance(): TernakService {
    if (!TernakService.instance) {
      TernakService.instance = new TernakService();
    }
    return TernakService.instance;
  }

  private getHeaders(): HeadersInit {
    const token = authService.getToken();
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  }

  async getAllTernak(): Promise<Ternak[]> {
    const response = await fetch(`${API_URL}/ternak`, {
      method: 'GET',
      headers: this.getHeaders()
    });

    if (!response.ok) {
      throw new Error('Failed to fetch ternak');
    }

    const result = await response.json();
    return result.data;
  }

  async getTernakById(id: number): Promise<Ternak> {
    const response = await fetch(`${API_URL}/ternak/${id}`, {
      method: 'GET',
      headers: this.getHeaders()
    });

    if (!response.ok) {
      throw new Error('Failed to fetch ternak details');
    }

    const result = await response.json();
    return result.data;
  }

  async createTernak(data: Omit<Ternak, 'id' | 'user_id' | 'created_at' | 'updated_at'>): Promise<Ternak> {
    const response = await fetch(`${API_URL}/ternak`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Failed to create ternak');
    }

    const result = await response.json();
    return result.data;
  }

  async updateTernak(id: number, data: Partial<Omit<Ternak, 'id' | 'user_id' | 'kode_ternak' | 'created_at'>>): Promise<Ternak> {
    const response = await fetch(`${API_URL}/ternak/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Failed to update ternak');
    }

    const result = await response.json();
    return result.data;
  }

  async deleteTernak(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/ternak/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders()
    });

    if (!response.ok) {
      throw new Error('Failed to delete ternak');
    }
  }
}

export default TernakService.getInstance();
