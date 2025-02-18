import axios from 'axios'
import io from 'socket.io-client'

// API base configuration
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

// Axios instance with default config
export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// WebSocket connection
export const socket = io(BASE_URL)

// API error handling
export class APIError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = 'APIError'
  }
}

// Define a type for the notification data
interface NotificationData {
  id: string;
  title: string;
  content: string;
}

// Common API requests
export const api = {
  async get(endpoint: string) {
    try {
      const token = localStorage.getItem('token');
      const url = `${BASE_URL}/api${endpoint}`;
      console.log('Making GET request to:', url);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const responseData = await response.json();

      if (!response.ok) {
        return { error: responseData.error || 'Server error' };
      }

      return responseData;
    } catch (error: any) {
      return { error: 'An unexpected error occurred' };
    }
  },

  async post(endpoint: string, data: any) {
    try {
      const token = localStorage.getItem('token');
      const url = `${BASE_URL}/api${endpoint}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        return { error: responseData.error || 'Server error' };
      }

      return responseData;
    } catch (error: any) {
      return { error: 'An unexpected error occurred' };
    }
  },

  put: async <T, D>(endpoint: string, data: D) => {
    try {
      const response = await apiClient.put<T>(endpoint, data)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new APIError(error.response?.status || 500, error.message)
      }
      throw new APIError(500, 'An unexpected error occurred')
    }
  },

  // WebSocket events
  subscribeToNotifications: (callback: (data: NotificationData) => void) => {
    socket.on('notification', callback)
    return () => socket.off('notification', callback)
  },
}

// Request interceptor for authentication
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error('API request failed');
  }

  return response.json();
}; 