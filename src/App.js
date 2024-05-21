import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UploadPage from './components/upload/upload';
import ProfilePage from './components/profilePgae';
import SellerProfilePage from './components/sellerProfilePage';
import LoginPage from './components/login';
import RegisterPage from './components/register';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/seller/:sellerId" element={<SellerProfilePage />} /> {/* Add route for SellerProfilePage */}
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
};

export default App;
