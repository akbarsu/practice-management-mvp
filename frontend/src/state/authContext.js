// Context for managing authentication state
import React, { createContext, useReducer, useContext } from 'react';
import { registerUser, loginUser } from '../services/authService';

const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      // ...handle login success...
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case 'LOGOUT':
      // ...handle logout...
      return initialState;
    default:
      return state;
  }
}

export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  const login = async (credentials) => {
    const response = await loginUser(credentials);
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: {
        user: response.data.user,
        token: response.data.token,
      },
    });
  };

  const register = async (userData) => {
    const response = await registerUser(userData);
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: {
        user: response.data.user,
        token: response.data.token,
      },
    });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const getToken = () => authState.token;

  return (
    <AuthContext.Provider
      value={{ authState, login, register, logout, getToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);