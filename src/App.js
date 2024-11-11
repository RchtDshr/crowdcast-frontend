import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import SignIn from './Pages/Signin';
import SignUp from './Pages/SignUp';
import VerifyOTP from './Pages/VerifyOpt';
import DashboardLayout from './Layout/DashboardLayout';
import AdDetails from './Pages/AdDetails';
import CreateAd from './Pages/CreateAd';
import { setAuthToken } from './utils/authUtils';
import WalletPage from './Pages/WalletPage';

// ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/signin" replace />;
  }
  return children;
};

function App() {
  const token = localStorage.getItem('token');
  if (token) {
    setAuthToken(token);
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Protected Routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<AdDetails />} />
          <Route path="dashboard" element={<AdDetails />} />
          <Route path="create-ad" element={<CreateAd />} />
          <Route path="wallet" element={<WalletPage />} />
        </Route>

        {/* Public Routes */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />

        {/* Redirect any unknown route to SignIn if not authenticated, otherwise to Dashboard */}
        <Route path="*" element={
          token ? <Navigate to="/dashboard" replace /> : <Navigate to="/signin" replace />
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;