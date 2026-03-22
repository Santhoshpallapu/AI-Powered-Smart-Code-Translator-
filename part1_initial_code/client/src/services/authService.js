import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  // Register a new user
  register: async (userData) => {
    return api.post('/auth/register', userData);
  },

  // Login user
  login: async (credentials) => {
    return api.post('/auth/login', credentials);
  },

  // Get current user profile
  getProfile: async () => {
    return api.get('/auth/profile');
  },

  // Update user profile
  updateProfile: async (userData) => {
    return api.put('/auth/profile', userData);
  },

  // Logout (client-side only, token is removed)
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

export default api;
