/**
 * Service untuk operasi data pelatihan (CRUD ke backend).
 * Berisi fungsi untuk mengambil, menambah, mengupdate, dan menghapus data pelatihan.

 */
import authService from './authService.js';

const API_URL = '/api';

// Interface (tipe data) untuk objek Pelatihan
// Berisi semua field yang merepresentasikan data pelatihan di aplikasi
export interface Pelatihan {
  id: number;
  judul_pelatihan: string;
  deskripsi: string;
  kategori: 'manajemen_kandang' | 'kesehatan' | 'kewirausahaan' | 'biosecurity';
  tingkat_kesulitan: 'pemula' | 'menengah' | 'lanjutan';
  durasi_menit: number;
  instruktur?: string;
  thumbnail?: string;
  video_url?: string;
  dokumen_url?: string;
  passing_score?: number;
  is_published: boolean;
  created_at: string;
  updated_at?: string;
}

// Kelas PelatihanService untuk mengelola operasi CRUD pelatihan
// Menggunakan pola Singleton agar hanya ada satu instance
class PelatihanService {
  // Instance tunggal dari PelatihanService
  private static instance: PelatihanService;

  // Constructor private agar tidak bisa dibuat instance baru dari luar
  private constructor() {}

  // Method untuk mendapatkan instance PelatihanService (Singleton pattern)
  static getInstance(): PelatihanService {
    if (!PelatihanService.instance) {
      PelatihanService.instance = new PelatihanService();
    }
    return PelatihanService.instance;
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

  // Method untuk mengambil semua data pelatihan dari backend
  async getAllPelatihan(): Promise<Pelatihan[]> {
    const response = await fetch(`${API_URL}/pelatihan`, {
      method: 'GET',
      headers: this.getHeaders()
    });

    // Jika response gagal, lempar error
    if (!response.ok) {
      throw new Error('Failed to fetch pelatihan');
    }

    // Parse response dan kembalikan data pelatihan
    const result = await response.json();
    return result.data;
  }

  // Method untuk mengambil detail pelatihan berdasarkan ID
  async getPelatihanById(id: number): Promise<Pelatihan> {
    const response = await fetch(`${API_URL}/pelatihan/${id}`, {
      method: 'GET',
      headers: this.getHeaders()
    });

    // Jika response gagal, lempar error
    if (!response.ok) {
      throw new Error('Failed to fetch pelatihan details');
    }

    // Parse response dan kembalikan data pelatihan
    const result = await response.json();
    return result.data;
  }

  // Method untuk membuat data pelatihan baru
  // Parameter: data pelatihan yang akan dikirim ke backend
  async createPelatihan(data: Omit<Pelatihan, 'id' | 'created_at' | 'updated_at'>): Promise<Pelatihan> {
    const response = await fetch(`${API_URL}/pelatihan`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data)
    });

    // Jika response gagal, lempar error
    if (!response.ok) {
      throw new Error('Failed to create pelatihan');
    }

    // Parse response dan kembalikan data pelatihan yang baru dibuat
    const result = await response.json();
    return result.data;
  }

  // Method untuk mengupdate data pelatihan berdasarkan ID
  // Parameter: id pelatihan dan data baru yang akan diupdate
  async updatePelatihan(id: number, data: Partial<Omit<Pelatihan, 'id' | 'created_at'>>): Promise<Pelatihan> {
    const response = await fetch(`${API_URL}/pelatihan/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(data)
    });

    // Jika response gagal, lempar error
    if (!response.ok) {
      throw new Error('Failed to update pelatihan');
    }

    // Parse response dan kembalikan data pelatihan yang sudah diupdate
    const result = await response.json();
    return result.data;
  }

  // Method untuk menghapus data pelatihan berdasarkan ID
  async deletePelatihan(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/pelatihan/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders()
    });

    // Jika response gagal, lempar error
    if (!response.ok) {
      throw new Error('Failed to delete pelatihan');
    }
  }
}

// Export instance PelatihanService agar bisa digunakan di file lain
export default PelatihanService.getInstance();
