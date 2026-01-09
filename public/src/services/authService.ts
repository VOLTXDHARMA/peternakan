/**
 * Service untuk autentikasi user.
 * Berisi fungsi login, register, logout, cek token, dan mengambil data user dari localStorage.
 * Mengelola token JWT dan status login user.
 */
// URL dasar untuk API endpoint
const API_URL = '/api';

// Class AuthService untuk mengelola autentikasi user
// Menggunakan Singleton pattern agar hanya ada satu instance
class AuthService {
  // Instance tunggal dari AuthService (Singleton pattern)
  private static instance: AuthService;
  // Token JWT yang disimpan di memory
  private token: string | null = null;

  // Constructor private agar tidak bisa dibuat instance baru dari luar
  // Token diambil dari localStorage saat aplikasi dimuat
  private constructor() {
    this.token = localStorage.getItem('authToken');
  }

  // Method untuk mendapatkan instance AuthService (Singleton pattern)
  // Jika belum ada instance, buat baru. Jika sudah ada, kembalikan yang sudah ada
  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  // Method untuk login user
  // Parameter: email dan password user
  // Return: data response dari server (termasuk accessToken dan refreshToken)
  async login(email: string, password: string): Promise<any> {
    // Kirim request POST ke endpoint login dengan email dan password
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    // Jika response tidak OK (status bukan 2xx), throw error
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    // Parse response dan simpan token ke localStorage dan memory
    const data = await response.json();
    this.token = data.data.accessToken;
    localStorage.setItem('authToken', this.token!);
    // Simpan user info (decode dari JWT atau dari response jika ada)
    // Asumsi backend mengirim user info di response.data.user, jika tidak, decode dari JWT
    if (data.data.user) {
      localStorage.setItem('currentUser', JSON.stringify(data.data.user));
    } else {
      // Coba decode JWT untuk ambil role
      try {
        const tokenParts = this.token?.split('.') ?? [];
        if (tokenParts.length === 3) {
          const payload = JSON.parse(atob(tokenParts[1]));
          localStorage.setItem('currentUser', JSON.stringify(payload));
        }
      } catch {}
    }
    return data;
  }

  // Method untuk registrasi user baru
  // Parameter: data user (username, email, nomor_hp, role, password)
  // Return: data response dari server
  async register(userData: {
    username: string;
    email: string;
    nomor_hp: string;
    role: string;
    password: string;
  }): Promise<any> {
    // Kirim request POST ke endpoint register dengan data user
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });

    // Jika response tidak OK, throw error dengan pesan dari server
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }

    return response.json();
  }

  // Method untuk logout user
  // Menghapus token dari memory dan localStorage
  logout(): void {
    this.token = null;
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
  }


  // Method untuk mendapatkan token yang tersimpan
  // Return: token JWT atau null jika tidak ada
  getToken(): string | null {
    return this.token;
  }

  // Method untuk mendapatkan user info yang tersimpan
  getCurrentUser(): any {
    const userStr = localStorage.getItem('currentUser');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  // Method untuk mengecek apakah user sudah login
  // Return: true jika ada token, false jika tidak ada
  isAuthenticated(): boolean {
    return !!this.token;
  }
}

export default AuthService.getInstance();
