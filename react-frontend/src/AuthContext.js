import React, { createContext, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
  const login = (token) => {
    console.log("Login token: ", token)
    localStorage.setItem('token', token); // Store token in localStorage
  };

  const logout = () => {
    localStorage.removeItem('token'); // Clear token from localStorage
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem('token'); // Return true if token exists
  };

  return (
    <AuthContext.Provider value={{ login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};