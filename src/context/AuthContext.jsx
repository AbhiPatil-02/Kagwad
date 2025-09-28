// src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';
import { loginUser, registerUser, updateUserProfile } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async ({ mobile, password }) => {
    setLoading(true);
    try {
      const result = await loginUser({ mobile, password });
      if (result.success) {
        setUser(result.user);
        return { success: true };
      } else {
        return { success: false, message: result.message };
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => setUser(null);

  const register = async (userData) => {
    setLoading(true);
    try {
      const result = await registerUser(userData);
      if (result.success) {
        setUser(result.user);
        return { success: true };
      } else {
        return { success: false, message: result.message };
      }
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (userId, userData) => {
    setLoading(true);
    try {
      const result = await updateUserProfile(userId, userData);
      if (result.success) {
        setUser(result.user);
        return { success: true };
      } else {
        return { success: false, message: 'Failed to update profile' };
      }
    } finally {
      setLoading(false);
    }
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{ 
        user, 
        login, 
        logout, 
        register, 
        updateProfile,
        loading, 
        isAuthenticated, 
        isAdmin 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);