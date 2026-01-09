/**
 * Service untuk operasi data materi pelatihan (CRUD ke backend).
 * Berisi fungsi untuk mengambil, menambah, mengupdate, dan menghapus materi pelatihan.
  */
// Import service autentikasi untuk mendapatkan token JWT
import authService from './authService';

// URL dasar untuk endpoint API backend
const API_URL = 'http://localhost:3000/api';

// Interface (tipe data) untuk objek MateriPelatihan
// Berisi semua field yang merepresentasikan data materi pelatihan di aplikasi
export interface MateriPelatihan {
  id: number;
  pelatihan_id: number;
  urutan: number;
  judul_materi: string;
  tipe_konten: 'video' | 'dokumen' | 'kuis' | 'webinar';
  konten_url?: string;
  durasi_menit?: number;
  deskripsi?: string;
  created_at?: string;
  updated_at?: string;
}

// Object service berisi semua operasi CRUD materi pelatihan
export const materiPelatihanService = {
  // Method untuk mengambil semua data materi pelatihan dari backend
  async getAllMateri(): Promise<MateriPelatihan[]> {
    // Ambil token JWT dari authService
    const token = authService.getToken();
    // Request GET ke endpoint materi_pelatihan
    const response = await fetch(`${API_URL}/materi_pelatihan`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    // Jika response gagal, lempar error
    if (!response.ok) throw new Error('Failed to fetch materi pelatihan');
    
    // Parse response dan kembalikan data materi pelatihan
    const result = await response.json();
    return result.data;
  },

  // Method untuk mengambil detail materi pelatihan berdasarkan ID
  async getMateriById(id: number): Promise<MateriPelatihan> {
    // Ambil token JWT dari authService
    const token = authService.getToken();
    // Request GET ke endpoint materi_pelatihan/{id}
    const response = await fetch(`${API_URL}/materi_pelatihan/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    // Jika response gagal, lempar error
    if (!response.ok) throw new Error('Materi not found');
    
    // Parse response dan kembalikan data materi pelatihan
    const result = await response.json();
    return result.data;
  },

  // Method untuk mengambil semua materi berdasarkan pelatihan tertentu
  async getMateriByPelatihan(pelatihanId: number): Promise<MateriPelatihan[]> {
    // Ambil token JWT dari authService
    const token = authService.getToken();
    // Request GET ke endpoint materi_pelatihan/pelatihan/{pelatihanId}
    const response = await fetch(`${API_URL}/materi_pelatihan/pelatihan/${pelatihanId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    // Jika response gagal, lempar error
    if (!response.ok) throw new Error('Failed to fetch materi');
    
    // Parse response dan kembalikan data materi pelatihan
    const result = await response.json();
    return result.data;
  },

  // Method untuk membuat data materi pelatihan baru
  // Parameter: data materi pelatihan yang akan dikirim ke backend
  async createMateri(data: Omit<MateriPelatihan, 'id' | 'created_at' | 'updated_at'>): Promise<MateriPelatihan> {
    // Ambil token JWT dari authService
    const token = authService.getToken();
    // Request POST ke endpoint materi_pelatihan
    const response = await fetch(`${API_URL}/materi_pelatihan`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    // Jika response gagal, lempar error
    if (!response.ok) throw new Error('Failed to create materi');
    
    // Parse response dan kembalikan data materi pelatihan yang baru dibuat
    const result = await response.json();
    return result.data;
  },

  // Method untuk mengupdate data materi pelatihan berdasarkan ID
  // Parameter: id materi dan data baru yang akan diupdate
  async updateMateri(id: number, data: Partial<MateriPelatihan>): Promise<MateriPelatihan> {
    // Ambil token JWT dari authService
    const token = authService.getToken();
    // Request PUT ke endpoint materi_pelatihan/{id}
    const response = await fetch(`${API_URL}/materi_pelatihan/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    // Jika response gagal, lempar error
    if (!response.ok) throw new Error('Failed to update materi');
    
    // Parse response dan kembalikan data materi pelatihan yang sudah diupdate
    const result = await response.json();
    return result.data;
  },

  // Method untuk menghapus data materi pelatihan berdasarkan ID
  async deleteMateri(id: number): Promise<void> {
    // Ambil token JWT dari authService
    const token = authService.getToken();
    // Request DELETE ke endpoint materi_pelatihan/{id}
    const response = await fetch(`${API_URL}/materi_pelatihan/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    // Jika response gagal, lempar error
    if (!response.ok) throw new Error('Failed to delete materi');
  }
};
