import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/authService.js';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      setUser(JSON.parse(userData));
    }

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      // Temporarily bypass backend for testing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser = { id: 1, email, username: email.split('@')[0] };
      const mockToken = 'mock-jwt-token';
      
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      toast.success('Login successful! (Demo mode)');
      return { success: true };
    } catch (error) {
      toast.error('Login failed');
      return { success: false, error: 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  const register = async (username, email, password) => {
    try {
      setLoading(true);
      // Temporarily bypass backend for testing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser = { id: 1, email, username };
      const mockToken = 'mock-jwt-token';
      
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      toast.success('Registration successful! (Demo mode)');
      return { success: true };
    } catch (error) {
      toast.error('Registration failed');
      return { success: false, error: 'Registration failed' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    toast.success('Logged out successfully');
  };

  const isAuthenticated = () => {
    return !!user && !!localStorage.getItem('token');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
