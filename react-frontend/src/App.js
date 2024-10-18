import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import Login from './components/Login';
import Home from './components/Homepage';
import History from './components/History';
import Profile from './components/Profile';
import AddAnggaran from './components/AddAnggaran';
import EditAnggaran from './components/EditAnggaran';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
          <Route path='/profile' element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
          <Route path='/anggarans/add' element={<ProtectedRoute><AddAnggaran/></ProtectedRoute>}/>
          <Route path='/edit/:id' element={<ProtectedRoute><EditAnggaran/></ProtectedRoute>}/>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;