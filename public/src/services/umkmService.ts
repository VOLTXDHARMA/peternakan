/**
 * Service untuk operasi data UMKM.
 * Berisi fungsi untuk mengambil semua UMKM, detail UMKM, menambah, mengupdate, dan menghapus UMKM.
 * Digunakan di fitur UMKM pada dashboard.
 */

// Import authService untuk mendapatkan token autentikasi
import authService from './authService.js';
// URL dasar untuk API endpoint
const API_URL = '/api';

// Interface (tipe data) untuk objek UMKM
export interface UMKM {
  id: number;
  user_id: number;
  nama_lengkap: string;
  jenis_usaha: 'peternak' | 'investor' | 'penyedia_kios';
  lokasi_peternakan: string;
  jenis_peternakan_utama: string;
  foto_profile?: string;
  created_at: string;
  updated_at?: string;
}

// Class UmkmService untuk mengelola operasi CRUD UMKM
// Menggunakan Singleton pattern agar hanya ada satu instance
class UmkmService {
  // Instance tunggal dari UmkmService
  private static instance: UmkmService;

  // Constructor private agar tidak bisa dibuat instance baru dari luar
  private constructor() {}

  // Method untuk mendapatkan instance UmkmService (Singleton pattern)
  static getInstance(): UmkmService {
    if (!UmkmService.instance) {
      UmkmService.instance = new UmkmService();
    }
    return UmkmService.instance;
  }

  // Method private untuk membuat headers HTTP dengan token autentikasi
  // Return: object headers yang berisi Content-Type dan Authorization
  private getHeaders(): HeadersInit {
    const token = authService.getToken();
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  }

  // Method untuk mengambil semua data UMKM dari backend
  async getAllUmkm(): Promise<UMKM[]> {
    const response = await fetch(`${API_URL}/umkm`, {
      method: 'GET',
      headers: this.getHeaders()
    });

    // Jika response gagal, lempar error
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch UMKM');
    }

    // Parse response dan kembalikan data UMKM
    const data = await response.json();
    return data.data;
  }

  // Method untuk mengambil detail UMKM berdasarkan ID
  async getUmkmById(id: number): Promise<UMKM> {
    const response = await fetch(`${API_URL}/umkm/${id}`, {
      method: 'GET',
      headers: this.getHeaders()
    });

    // Jika response gagal, lempar error
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch UMKM detail');
    }

    // Parse response dan kembalikan data UMKM
    const data = await response.json();
    return data.data;
  }

  // Method untuk membuat data UMKM baru
  // Parameter: data UMKM yang akan dikirim ke backend
  async createUmkm(umkmData: Omit<UMKM, 'id' | 'created_at' | 'updated_at' | 'user_id'>): Promise<UMKM> {
    const response = await fetch(`${API_URL}/umkm`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(umkmData)
    });

    // Jika response gagal, lempar error
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create UMKM');
    }

    // Parse response dan kembalikan data UMKM yang baru dibuat
    const data = await response.json();
    return data.data;
  }

  // Method untuk mengupdate data UMKM berdasarkan ID
  // Parameter: id UMKM dan data baru yang akan diupdate
  async updateUmkm(id: number, umkmData: Partial<Omit<UMKM, 'id' | 'user_id' | 'created_at'>>): Promise<UMKM> {
    const response = await fetch(`${API_URL}/umkm/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(umkmData)
    });

    // Jika response gagal, lempar error
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update UMKM');
    }

    // Parse response dan kembalikan data UMKM yang sudah diupdate
    const data = await response.json();
    return data.data;
  }

  // Method untuk menghapus data UMKM berdasarkan ID
  async deleteUmkm(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/umkm/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders()
    });

    // Jika response gagal, lempar error
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete UMKM');
    }
  }
}

// Export instance tunggal dari UmkmService agar bisa digunakan di seluruh aplikasi
export default UmkmService.getInstance();
