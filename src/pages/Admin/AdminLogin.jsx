import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiLock, FiLogIn, FiX, FiShield, FiAlertTriangle } = FiIcons;

const AdminLogin = ({ onLogin }) => {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [showHint, setShowHint] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!passcode.trim()) {
      setError('Please enter the admin passcode');
      return;
    }
    
    const success = onLogin(passcode);
    if (!success) {
      setError('Invalid passcode. Please try again.');
      setPasscode('');
    }
  };
  
  return (
    <div className="max-w-md mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg p-8"
      >
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 bg-navy-950 rounded-full flex items-center justify-center">
            <SafeIcon icon={FiShield} className="h-10 w-10 text-gold-950" />
          </div>
        </div>
        
        <h1 className="font-playfair text-3xl font-bold text-navy-950 mb-2 text-center">
          Admin Access
        </h1>
        <p className="text-navy-600 text-center mb-8">
          Enter the admin passcode to access the control panel
        </p>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-start mb-6">
            <SafeIcon icon={FiAlertTriangle} className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-sm">{error}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="passcode" className="block text-sm font-medium text-navy-700 mb-2">
              Admin Passcode
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SafeIcon icon={FiLock} className="h-5 w-5 text-navy-500" />
              </div>
              <input
                type="password"
                id="passcode"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setError('');
                }}
                className="w-full pl-10 pr-3 py-2 border border-silver-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                placeholder="Enter passcode"
                autoComplete="off"
              />
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-navy-950 hover:bg-navy-800 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-300 flex items-center justify-center space-x-2"
          >
            <SafeIcon icon={FiLogIn} className="h-5 w-5" />
            <span>Access Admin Panel</span>
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowHint(!showHint)}
            className="text-navy-600 text-sm hover:text-navy-800 transition-colors"
          >
            {showHint ? 'Hide hint' : 'Need a hint?'}
          </button>
          
          {showHint && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 text-sm text-navy-700 bg-navy-50 p-3 rounded-md"
            >
              <p>For this demo, use: <span className="font-mono font-medium">ChiefNavy2024</span></p>
              <p className="mt-1 text-xs text-navy-500">In production, this would be a secure passcode provided to Chief Thompson.</p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;