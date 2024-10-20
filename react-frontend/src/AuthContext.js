import React, { createContext, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const login = (token, expiresAt) => {
    console.log("Login token: ", token);
    console.log("Login expiresAt: ", expiresAt);
    localStorage.setItem('token', token); 
    localStorage.setItem('tokenExpiry', expiresAt); // Store server-side expiration time
  };


  const logout = () => {
    localStorage.removeItem('token'); // Clear token from localStorage
    localStorage.removeItem('tokenExpiry'); // Clear expiration time
  };

  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    const tokenExpiry = localStorage.getItem('tokenExpiry');
  
    if (!token || !tokenExpiry) {
      return false;
    }
  
    const localTimeNow = Date.now(); // Current local time in milliseconds
  
    if (localTimeNow >= tokenExpiry) {
      logout(); // Token is expired, log out
      return false;
    }
  
    return true; // Token is still valid
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
