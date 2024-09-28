// Context for managing authentication state
import React, { createContext, useState, useContext, useEffect } from 'react';
import { getUserProfile } from '../services/userService';
import { useUser } from './userContext';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    token: null,
  });

  // Load token and user from localStorage on initial render
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Optionally, decode token to get user info or fetch user profile
      setAuthState({
        isAuthenticated: true,
        user: null, // Fetch or decode user info
        token,
      });
    }
  }, []);

  const { updateUserProfile } = useUser();

  const login = async (user, token) => {
    setAuthState({
      isAuthenticated: true,
      user,
      token,
    });
    localStorage.setItem('token', token);

    try {
      // Fetch user profile
      const profileResponse = await getUserProfile(token);
      updateUserProfile(profileResponse.data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null,
    });
    localStorage.removeItem('token');
  };

  const getToken = () => {
    return authState.token || localStorage.getItem('token');
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;