// Import tipe data User dan ApiResponse dari types
import { User, ApiResponse } from '../types.js';
// Import authService untuk mendapatkan token autentikasi
import authService from './authService.js';

// URL dasar untuk API endpoint
const API_URL = '/api';

// Class UserService untuk mengelola data user
// Menggunakan Singleton pattern agar hanya ada satu instance
class UserService {
  // Instance tunggal dari UserService (Singleton pattern)
  private static instance: UserService;

  // Constructor private agar tidak bisa dibuat instance baru dari luar
  private constructor() {}

  // Method untuk mendapatkan instance UserService (Singleton pattern)
  static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  // Method private untuk membuat headers HTTP dengan token autentikasi
  // Return: object headers yang berisi Content-Type dan Authorization
  private getHeaders(): HeadersInit {
    // Ambil token dari authService
    const token = authService.getToken();
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Token JWT untuk autentikasi
    };
  }

  async getAllUsers(): Promise<User[]> {
    try {
      console.log('Fetching users from:', `${API_URL}/users`);
      const response = await fetch(`${API_URL}/users`, {
        headers: this.getHeaders()
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Failed to fetch users: ${response.status} ${response.statusText}`);
      }

      const data: ApiResponse<User[]> = await response.json();
      console.log('Received data:', data);
      return data.data;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }

  async getUserById(id: number): Promise<User> {
    const response = await fetch(`${API_URL}/users/${id}`, {
      headers: this.getHeaders()
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }

    const data: ApiResponse<User> = await response.json();
    return data.data;
  }

  // Method untuk membuat user baru
  // Parameter: data user (bisa partial, tidak semua field wajib)
  // Return: data user yang baru dibuat
  async createUser(userData: Partial<User>): Promise<User> {
    // Kirim request POST ke endpoint register
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    // Jika response tidak OK, throw error
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create user');
    }

    // Parse response dan kembalikan data user
    const data: ApiResponse<User> = await response.json();
    return data.data;
  }

  // Method untuk mengupdate data user
  // Parameter: id user dan data user yang akan diupdate
  // Return: data user yang sudah diupdate
  async updateUser(id: number, userData: Partial<User>): Promise<User> {
    // Kirim request PUT ke endpoint users dengan id user
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(), // Sertakan token autentikasi
      body: JSON.stringify(userData)
    });

    // Jika response tidak OK, throw error
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update user');
    }

    // Parse response dan kembalikan data user yang sudah diupdate
    const data: ApiResponse<User> = await response.json();
    return data.data;
  }

  // Method untuk menghapus user
  // Parameter: id user yang akan dihapus
  // Return: void (tidak mengembalikan nilai)
  async deleteUser(id: number): Promise<void> {
    // Kirim request DELETE ke endpoint users dengan id user
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders() // Sertakan token autentikasi
    });

    // Jika response tidak OK, throw error
    if (!response.ok) {
      throw new Error('Failed to delete user');
    }
  }
}

export default UserService.getInstance();
