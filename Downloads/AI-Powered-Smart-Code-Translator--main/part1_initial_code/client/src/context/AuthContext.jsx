import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import { authService } from '../services/authService.js';

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
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }

    setLoading(false);
  }, []);

  const persistSession = (session) => {
    if (!session?.token || !session?.user) {
      throw new Error('Invalid authentication response from server');
    }

    localStorage.setItem('token', session.token);
    localStorage.setItem('user', JSON.stringify(session.user));
    setUser(session.user);
  };

  const login = async (email, password) => {
    try {
      setLoading(true);

      const session = await authService.login({ email, password });
      persistSession(session);

      toast.success(
        session.mode === 'memory' ? 'Login successful (local mode)' : 'Login successful'
      );

      return { success: true };
    } catch (error) {
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        'Login failed';

      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (username, email, password) => {
    try {
      setLoading(true);

      const session = await authService.register({ username, email, password });
      persistSession(session);

      toast.success(
        session.mode === 'memory'
          ? 'Registration successful (local mode)'
          : 'Registration successful'
      );

      return { success: true };
    } catch (error) {
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        'Registration failed';

      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
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
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
