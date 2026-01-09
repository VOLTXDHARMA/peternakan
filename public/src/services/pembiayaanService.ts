/**
 * Service untuk operasi data pembiayaan (CRUD ke backend).
 * Berisi fungsi untuk mengambil, menambah, mengupdate, dan menghapus data pembiayaan.
 */
// Import service autentikasi untuk mendapatkan token JWT
import authService from './authService.js';

// URL dasar untuk endpoint API backend
const API_URL = '/api';

// Interface (tipe data) untuk objek Pembiayaan
// Berisi semua field yang merepresentasikan data pembiayaan di aplikasi
export interface Pembiayaan {
  id: string;
  nomor_pembiayaan: string;
  user_id: number;
  tujuan_pembiayaan: 'beli_pakan' | 'beli_alat' | 'pengembangan_usaha' | 'modal_kerja';
  nominal_pengajuan: number;
  nominal_disetujui?: number;
  jangka_waktu_bulan: number;
  bunga_persen?: number;
  angsuran_per_bulan?: number;
  tanggal_pengajuan: string;
  tanggal_verifikasi?: string;
  tanggal_persetujuan?: string;
  tanggal_pencairan?: string;
  status_pengajuan: 'draf' | 'kk' | 'surat_usaha' | 'npwp' | 'rekening_koran';
  alasan_penolakan?: string;
  dokumen_pendukung?: any;
  mitra_nama?: string;
  mitra_tipe?: string;
  mitra_kontak?: string;
  mitra_alamat?: string;
  credit_score?: number;
  created_at: string;
  updated_at?: string;
}

// Kelas PembiayaanService untuk mengelola operasi CRUD pembiayaan
// Menggunakan pola Singleton agar hanya ada satu instance
class PembiayaanService {
  // Instance tunggal dari PembiayaanService
  private static instance: PembiayaanService;

  // Constructor private agar tidak bisa dibuat instance baru dari luar
  private constructor() {}

  // Method untuk mendapatkan instance PembiayaanService (Singleton pattern)
  static getInstance(): PembiayaanService {
    if (!PembiayaanService.instance) {
      PembiayaanService.instance = new PembiayaanService();
    }
    return PembiayaanService.instance;
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

  // Method untuk mengambil semua data pembiayaan dari backend
  async getAllPembiayaan(): Promise<Pembiayaan[]> {
    const response = await fetch(`${API_URL}/pembiayaan`, {
      method: 'GET',
      headers: this.getHeaders()
    });

    // Jika response gagal, lempar error
    if (!response.ok) {
      throw new Error('Failed to fetch pembiayaan');
    }

    // Parse response dan kembalikan data pembiayaan
    const result = await response.json();
    return result.data;
  }

  // Method untuk mengambil detail pembiayaan berdasarkan ID
  async getPembiayaanById(id: string): Promise<Pembiayaan> {
    const response = await fetch(`${API_URL}/pembiayaan/${id}`, {
      method: 'GET',
      headers: this.getHeaders()
    });

    // Jika response gagal, lempar error
    if (!response.ok) {
      throw new Error('Failed to fetch pembiayaan details');
    }

    // Parse response dan kembalikan data pembiayaan
    const result = await response.json();
    return result.data;
  }

  // Method untuk membuat data pembiayaan baru
  // Parameter: data pembiayaan yang akan dikirim ke backend
  async createPembiayaan(data: any): Promise<Pembiayaan> {
    const response = await fetch(`${API_URL}/pembiayaan`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data)
    });

    // Jika response gagal, lempar error
    if (!response.ok) {
      throw new Error('Failed to create pembiayaan');
    }

    // Parse response dan kembalikan data pembiayaan yang baru dibuat
    const result = await response.json();
    return result.data;
  }

  // Method untuk mengupdate data pembiayaan berdasarkan ID
  // Parameter: id pembiayaan dan data baru yang akan diupdate
  async updatePembiayaan(id: string, data: any): Promise<Pembiayaan> {
    const response = await fetch(`${API_URL}/pembiayaan/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(data)
    });

    // Jika response gagal, lempar error
    if (!response.ok) {
      throw new Error('Failed to update pembiayaan');
    }

    // Parse response dan kembalikan data pembiayaan yang sudah diupdate
    const result = await response.json();
    return result.data;
  }

  // Method untuk menghapus data pembiayaan berdasarkan ID
  async deletePembiayaan(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/pembiayaan/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders()
    });

    // Jika response gagal, lempar error
    if (!response.ok) {
      throw new Error('Failed to delete pembiayaan');
    }
  }
}

// Export instance PembiayaanService agar bisa digunakan di file lain
export default PembiayaanService.getInstance();
