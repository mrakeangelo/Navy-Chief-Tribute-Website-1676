import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiKey, FiSave, FiAlertTriangle, FiCheckCircle } = FiIcons;

const ADMIN_KEY = 'chief_legacy_admin_auth';

const AdminSettings = () => {
  const [currentPasscode, setCurrentPasscode] = useState('');
  const [newPasscode, setNewPasscode] = useState('');
  const [confirmPasscode, setConfirmPasscode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Reset messages
    setError('');
    setSuccess('');
    
    // Validate inputs
    if (!currentPasscode) {
      setError('Please enter your current passcode');
      return;
    }
    
    if (!newPasscode) {
      setError('Please enter a new passcode');
      return;
    }
    
    if (newPasscode.length < 8) {
      setError('New passcode must be at least 8 characters long');
      return;
    }
    
    if (newPasscode !== confirmPasscode) {
      setError('New passcodes do not match');
      return;
    }
    
    // In a real app, you would verify the current passcode against a secure backend
    // For demo purposes, we're using a hardcoded passcode
    if (currentPasscode !== 'ChiefNavy2024') {
      setError('Current passcode is incorrect');
      return;
    }
    
    // Update would happen on the backend in a real app
    // Here we just show a success message
    setSuccess('Passcode updated successfully');
    
    // Clear form
    setCurrentPasscode('');
    setNewPasscode('');
    setConfirmPasscode('');
  };
  
  return (
    <div>
      <h2 className="font-playfair text-2xl font-bold text-navy-950 mb-6">
        Admin Settings
      </h2>
      
      <div className="max-w-xl">
        <div className="bg-navy-50 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <SafeIcon icon={FiAlertTriangle} className="h-5 w-5 text-navy-700 mt-0.5 mr-2 flex-shrink-0" />
            <p className="text-navy-700 text-sm">
              This page allows you to change your admin passcode. For security, please use a strong, 
              unique passcode that you don't use for other accounts.
            </p>
          </div>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-start mb-4">
            <SafeIcon icon={FiAlertTriangle} className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}
        
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md flex items-start mb-4">
            <SafeIcon icon={FiCheckCircle} className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
            <p>{success}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="currentPasscode" className="block text-sm font-medium text-navy-700 mb-2">
              Current Passcode
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SafeIcon icon={FiKey} className="h-5 w-5 text-navy-500" />
              </div>
              <input
                type="password"
                id="currentPasscode"
                value={currentPasscode}
                onChange={(e) => setCurrentPasscode(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-silver-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                placeholder="Enter current passcode"
                autoComplete="current-password"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="newPasscode" className="block text-sm font-medium text-navy-700 mb-2">
              New Passcode
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SafeIcon icon={FiKey} className="h-5 w-5 text-navy-500" />
              </div>
              <input
                type="password"
                id="newPasscode"
                value={newPasscode}
                onChange={(e) => setNewPasscode(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-silver-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                placeholder="Enter new passcode"
                autoComplete="new-password"
              />
            </div>
            <p className="text-xs text-navy-500 mt-1">
              Passcode must be at least 8 characters long
            </p>
          </div>
          
          <div>
            <label htmlFor="confirmPasscode" className="block text-sm font-medium text-navy-700 mb-2">
              Confirm New Passcode
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SafeIcon icon={FiKey} className="h-5 w-5 text-navy-500" />
              </div>
              <input
                type="password"
                id="confirmPasscode"
                value={confirmPasscode}
                onChange={(e) => setConfirmPasscode(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-silver-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                placeholder="Confirm new passcode"
                autoComplete="new-password"
              />
            </div>
          </div>
          
          <div className="pt-2">
            <button
              type="submit"
              className="bg-gold-950 hover:bg-gold-700 text-navy-950 font-semibold py-2 px-6 rounded-md transition-colors flex items-center space-x-2"
            >
              <SafeIcon icon={FiSave} className="h-5 w-5" />
              <span>Update Passcode</span>
            </button>
          </div>
        </form>
        
        <div className="mt-8 border-t border-navy-200 pt-6">
          <h3 className="font-playfair text-xl font-bold text-navy-950 mb-3">
            Admin Session Info
          </h3>
          <SessionInfo />
        </div>
      </div>
    </div>
  );
};

const SessionInfo = () => {
  const [sessionData, setSessionData] = useState(null);
  
  useEffect(() => {
    const adminAuth = localStorage.getItem(ADMIN_KEY);
    if (adminAuth) {
      try {
        const authData = JSON.parse(adminAuth);
        setSessionData(authData);
      } catch (error) {
        console.error('Error parsing admin auth data', error);
      }
    }
  }, []);
  
  if (!sessionData) {
    return (
      <p className="text-navy-700">No active session information available.</p>
    );
  }
  
  const expiryDate = new Date(sessionData.expiry);
  const now = new Date();
  const hoursRemaining = Math.round((expiryDate - now) / (1000 * 60 * 60));
  
  return (
    <div className="bg-navy-50 rounded-lg p-4">
      <p className="text-navy-700">
        <span className="font-medium">Session Expires:</span>{' '}
        {expiryDate.toLocaleString('en-US', {
          dateStyle: 'medium',
          timeStyle: 'short'
        })}
      </p>
      <p className="text-navy-700 mt-1">
        <span className="font-medium">Time Remaining:</span>{' '}
        {hoursRemaining > 0 ? `${hoursRemaining} hours` : 'Expired'}
      </p>
      <p className="text-sm text-navy-500 mt-2">
        Your session will automatically expire after 24 hours.
        You'll need to log in again after expiration.
      </p>
    </div>
  );
};

export default AdminSettings;