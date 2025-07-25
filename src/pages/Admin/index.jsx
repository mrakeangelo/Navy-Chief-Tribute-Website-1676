import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navigate, useNavigate } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiLock, FiShield } = FiIcons;

const ADMIN_KEY = 'chief_legacy_admin_auth';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is already authenticated in local storage
    const adminAuth = localStorage.getItem(ADMIN_KEY);
    if (adminAuth) {
      try {
        const authData = JSON.parse(adminAuth);
        const now = new Date().getTime();
        
        // Check if the auth token is still valid (24 hours)
        if (authData.expiry && authData.expiry > now) {
          setIsAuthenticated(true);
        } else {
          // Token expired, remove it
          localStorage.removeItem(ADMIN_KEY);
        }
      } catch (error) {
        console.error('Error parsing admin auth data', error);
        localStorage.removeItem(ADMIN_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (passcode) => {
    // In a real app, you would verify this against a secure backend
    // For demo purposes, we're using a hardcoded passcode
    if (passcode === 'ChiefNavy2024') {
      const now = new Date().getTime();
      const expiryTime = now + (24 * 60 * 60 * 1000); // 24 hours
      
      localStorage.setItem(ADMIN_KEY, JSON.stringify({
        authenticated: true,
        expiry: expiryTime
      }));
      
      setIsAuthenticated(true);
    } else {
      return false;
    }
    return true;
  };

  const handleLogout = () => {
    localStorage.removeItem(ADMIN_KEY);
    setIsAuthenticated(false);
    navigate('/admin');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy-50 to-silver-100 flex items-center justify-center">
        <div className="text-navy-950 flex items-center">
          <SafeIcon icon={FiLock} className="animate-pulse h-6 w-6 mr-2" />
          <span>Verifying access...</span>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-navy-50 to-silver-100 py-20"
    >
      {isAuthenticated ? (
        <AdminDashboard onLogout={handleLogout} />
      ) : (
        <AdminLogin onLogin={handleLogin} />
      )}
    </motion.div>
  );
};

export default Admin;