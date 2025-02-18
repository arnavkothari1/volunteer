import axios from '../axios';

interface LoginData {
  email: string;
  password: string;
}

export class AuthService {
  static async login(credentials: LoginData) {
    const response = await axios.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  }

  static async register(userData: { email: string; password: string; name: string }) {
    const response = await axios.post('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  }

  static logout() {
    localStorage.removeItem('token');
  }

  static isAuthenticated() {
    return !!localStorage.getItem('token');
  }
} 