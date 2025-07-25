import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import AdminGallery from './components/AdminGallery';
import AdminTimeline from './components/AdminTimeline';
import AdminMessages from './components/AdminMessages';
import AdminTimeCapsule from './components/AdminTimeCapsule';
import AdminSettings from './components/AdminSettings';

const { FiGrid, FiClock, FiImage, FiMessageSquare, FiMail, FiSettings, FiLogOut } = FiIcons;

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: FiGrid },
    { id: 'gallery', label: 'Gallery', icon: FiImage },
    { id: 'timeline', label: 'Timeline', icon: FiClock },
    { id: 'messages', label: 'Messages', icon: FiMessageSquare },
    { id: 'timecapsule', label: 'Time Capsule', icon: FiMail },
    { id: 'settings', label: 'Settings', icon: FiSettings }
  ];

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'gallery':
        return <AdminGallery />;
      case 'timeline':
        return <AdminTimeline />;
      case 'messages':
        return <AdminMessages />;
      case 'timecapsule':
        return <AdminTimeCapsule />;
      case 'settings':
        return <AdminSettings />;
      case 'dashboard':
      default:
        return <AdminDashboardHome />;
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-navy-950">
          Admin Control Panel
        </h1>
        <button
          onClick={onLogout}
          className="bg-navy-950 hover:bg-navy-800 text-white px-4 py-2 rounded-md flex items-center space-x-2 transition-colors"
        >
          <SafeIcon icon={FiLogOut} className="h-4 w-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
      
      {/* Admin Navigation */}
      <div className="bg-white rounded-lg shadow-md mb-6 overflow-x-auto">
        <div className="flex p-1 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-md transition-colors ${
                activeTab === tab.id 
                  ? 'bg-gold-950 text-navy-950 font-medium' 
                  : 'text-navy-700 hover:bg-navy-50'
              }`}
            >
              <SafeIcon icon={tab.icon} className="h-5 w-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Active Component */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        {renderActiveComponent()}
      </motion.div>
    </div>
  );
};

const AdminDashboardHome = () => {
  const stats = [
    { label: 'Gallery Items', value: 8, icon: FiImage },
    { label: 'Timeline Events', value: 5, icon: FiClock },
    { label: 'Messages', value: 12, icon: FiMessageSquare, highlight: 3 },
    { label: 'Time Capsules', value: 4, icon: FiMail }
  ];
  
  const recentActivities = [
    { type: 'message', text: 'New message from Admiral Johnson', time: '2 hours ago' },
    { type: 'gallery', text: 'Photo "USS Enterprise" uploaded', time: '1 day ago' },
    { type: 'timeline', text: 'Timeline entry "2019-Present" edited', time: '3 days ago' },
    { type: 'message', text: 'Message from Petty Officer Williams approved', time: '1 week ago' }
  ];
  
  return (
    <div>
      <h2 className="font-playfair text-2xl font-bold text-navy-950 mb-6">
        Dashboard Overview
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-navy-50 rounded-lg p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-navy-600 text-sm mb-1">{stat.label}</p>
                <p className="font-playfair text-3xl font-bold text-navy-950">{stat.value}</p>
                {stat.highlight && (
                  <div className="mt-1 bg-gold-100 text-gold-800 text-xs px-2 py-1 rounded-full inline-block">
                    {stat.highlight} new
                  </div>
                )}
              </div>
              <div className="bg-white p-3 rounded-full">
                <SafeIcon icon={stat.icon} className="h-6 w-6 text-navy-700" />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="font-playfair text-xl font-bold text-navy-950 mb-4 flex items-center">
            <SafeIcon icon={FiMessageSquare} className="mr-2 h-5 w-5 text-gold-950" />
            Recent Activity
          </h3>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="border-l-2 border-navy-300 pl-4 py-1">
                <p className="text-navy-950 font-medium">{activity.text}</p>
                <p className="text-navy-500 text-sm">{activity.time}</p>
              </div>
            ))}
          </div>
          <button className="mt-4 text-gold-950 font-medium hover:text-gold-700 transition-colors">
            View all activity →
          </button>
        </div>
        
        <div>
          <h3 className="font-playfair text-xl font-bold text-navy-950 mb-4 flex items-center">
            <SafeIcon icon={FiMessageSquare} className="mr-2 h-5 w-5 text-gold-950" />
            Quick Actions
          </h3>
          <div className="space-y-3">
            <button className="w-full bg-navy-50 hover:bg-navy-100 text-navy-950 font-medium py-3 px-4 rounded-md text-left transition-colors flex items-center">
              <SafeIcon icon={FiImage} className="mr-3 h-5 w-5 text-navy-700" />
              Upload New Photos
            </button>
            <button className="w-full bg-navy-50 hover:bg-navy-100 text-navy-950 font-medium py-3 px-4 rounded-md text-left transition-colors flex items-center">
              <SafeIcon icon={FiClock} className="mr-3 h-5 w-5 text-navy-700" />
              Add Timeline Event
            </button>
            <button className="w-full bg-navy-50 hover:bg-navy-100 text-navy-950 font-medium py-3 px-4 rounded-md text-left transition-colors flex items-center">
              <SafeIcon icon={FiMessageSquare} className="mr-3 h-5 w-5 text-navy-700" />
              Moderate Pending Messages
              <span className="ml-auto bg-gold-100 text-gold-800 text-xs px-2 py-1 rounded-full">
                3 new
              </span>
            </button>
            <button className="w-full bg-navy-50 hover:bg-navy-100 text-navy-950 font-medium py-3 px-4 rounded-md text-left transition-colors flex items-center">
              <SafeIcon icon={FiMail} className="mr-3 h-5 w-5 text-navy-700" />
              Create New Time Capsule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;