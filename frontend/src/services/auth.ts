import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

interface AuthResponse {
  success: boolean;
  token?: string;
  error: string | null;
}

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const authService = {
  async register(email: string, password: string) {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    localStorage.setItem('token', data.token);
    return data;
  },

  async login(email: string, password: string) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    localStorage.setItem('token', data.token);
    return data;
  },

  async getProfile() {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/auth/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
  },

  logout() {
    localStorage.removeItem('token');
  }
};

export const signup = async (data: SignUpData) => {
  try {
    console.log('Sending signup request:', { ...data, password: '***' });
    
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.message || 'User already exists'
      };
    }

    return {
      success: true,
      token: result.token,
      user: result.user
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to connect to server'
    };
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Invalid credentials');
    }

    return response.json();
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const googleAuth = async (): Promise<void> => {
  window.location.href = `${API_URL}/auth/google`;
};

export const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/auth/login';
};

export const requestPasswordReset = async (email: string): Promise<AuthResponse> => {
  try {
    const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });
    return { success: true, error: null };
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Failed to send reset code';
    return { success: false, error: errorMessage };
  }
};

export const verifyResetCode = async (code: string): Promise<AuthResponse> => {
  try {
    const response = await axios.post(`${API_URL}/auth/verify-reset-code`, { code });
    return { success: true, error: null };
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Invalid code';
    return { success: false, error: errorMessage };
  }
};

export const resetPassword = async (code: string, newPassword: string): Promise<AuthResponse> => {
  try {
    const response = await axios.post(`${API_URL}/auth/reset-password`, {
      code,
      newPassword
    });
    return { success: true, error: null };
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Failed to reset password';
    return { success: false, error: errorMessage };
  }
};

export const verifyEmail = async (token: string): Promise<AuthResponse> => {
  try {
    const response = await axios.post(`${API_URL}/auth/verify-email`, { token });
    return { success: true, error: null };
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Failed to verify email';
    return { success: false, error: errorMessage };
  }
};

const register = async (userData: SignUpData) => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    
    if (response.ok) {
      // Make sure we're storing the token after registration
      localStorage.setItem('token', data.token);
      return data;
    } else {
      throw new Error(data.error || 'Registration failed');
    }
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}; 