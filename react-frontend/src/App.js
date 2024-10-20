import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import Login from './components/Login';
import Home from './components/Homepage';
import History from './components/History';
import Profile from './components/Profile';
import AddAnggaran from './components/AddAnggaran';
import EditAnggaran from './components/EditAnggaran';
import Register from './components/Register';

const useTokenExpirationChecker = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenExpirationOnLoad = () => {
      const tokenExpiry = localStorage.getItem('tokenExpiry');
      if (tokenExpiry && Date.now() >= tokenExpiry) {
        logout();
        navigate('/login');
      }
    };
  
    checkTokenExpirationOnLoad(); // Check on page load
  
    const interval = setInterval(() => {
      const tokenExpiry = localStorage.getItem('tokenExpiry');
      if (tokenExpiry && Date.now() >= tokenExpiry) {
        logout();
        navigate('/login');
      }
    }, 10000); // Check every 10 seconds
  
    return () => clearInterval(interval); // Clear interval when component unmounts
  }, [logout, navigate]);
};

const MainApp = () => {
  useTokenExpirationChecker(); // Run the token expiration checker

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
      <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>}/>
      <Route path='/anggarans/add' element={<ProtectedRoute><AddAnggaran /></ProtectedRoute>}/>
      <Route path='/edit/:id' element={<ProtectedRoute><EditAnggaran /></ProtectedRoute>}/>
    </Routes>
  );
};

const App = () => (
  <AuthProvider>
    <Router>
      <MainApp />
    </Router>
  </AuthProvider>
);

export default App;
