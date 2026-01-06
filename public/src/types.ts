// ===== DEFINISI TIPE DATA =====
// File ini berisi interface TypeScript untuk type safety

// Interface untuk data User
// Digunakan di seluruh aplikasi untuk merepresentasikan data pengguna
export interface User {
  id: number;                    // ID unik user
  username: string;              // Nama user untuk login
  email: string;                 // Email user untuk login
  password?: string;             // Password (optional, tidak selalu ditampilkan)
  nomor_hp?: string;            // Nomor HP user (optional)
  role: 'peternak' | 'investor' | 'penyedia_kios' | 'admin';  // Role/peran user
  is_verified: boolean;         // Status verifikasi email
  created_at: string;           // Tanggal pembuatan akun (ISO string)
}

// Interface untuk response dari endpoint login
export interface AuthResponse {
  status: string;               // Status response ('success' atau 'error')
  message: string;              // Pesan dari server
  data: {
    accessToken: string;        // Token JWT untuk autentikasi (berlaku 15 menit)
    refreshToken: string;       // Token untuk refresh access token (berlaku 7 hari)
  };
}

// Interface generic untuk response API standar
// T adalah tipe data yang dikembalikan (bisa User, User[], atau tipe lain)
export interface ApiResponse<T> {
  status: string;               // Status response ('success' atau 'error')
  message: string;              // Pesan dari server
  data: T;                      // Data yang dikembalikan (tipe generic)
}
