import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMail, FiLock, FiUnlock, FiPlus, FiEdit2, FiTrash2, FiX, FiCalendar, FiSave } = FiIcons;

const AdminTimeCapsule = () => {
  const [timeCapsules, setTimeCapsules] = useState([
    {
      id: 1,
      title: 'Reflections on Leadership',
      createdDate: '2024-01-15',
      unlockDate: '2027-01-15',
      isLocked: true,
      content: 'A personal reflection on what leadership means and lessons learned throughout my naval career...'
    },
    {
      id: 2,
      title: 'Advice to Future Sailors',
      createdDate: '2024-02-20',
      unlockDate: '2025-02-20',
      isLocked: false,
      content: 'To the young sailors who will follow in my footsteps: Remember that leadership is not about commanding others, but about serving them. Your greatest strength will come from lifting others up and helping them achieve their potential. The Navy taught me that honor, courage, and commitment are not just words on a wall - they are the foundation of everything we do. Stay true to these values, and you will find your way through any storm.'
    },
    {
      id: 3,
      title: 'Memories of the Enterprise',
      createdDate: '2024-03-10',
      unlockDate: '2029-03-10',
      isLocked: true,
      content: 'My time aboard the USS Enterprise was transformative...'
    }
  ]);
  
  const [showModal, setShowModal] = useState(false);
  const [editingCapsule, setEditingCapsule] = useState(null);
  
  const calculateTimeRemaining = (unlockDate) => {
    const now = new Date();
    const unlock = new Date(unlockDate);
    const diff = unlock - now;
    
    if (diff <= 0) return 'Unlocked';
    
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
    
    if (years > 0) return `${years} years, ${months} months`;
    if (months > 0) return `${months} months, ${days} days`;
    return `${days} days`;
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this time capsule?')) {
      setTimeCapsules(timeCapsules.filter(capsule => capsule.id !== id));
    }
  };

  const handleEdit = (capsule) => {
    setEditingCapsule({ ...capsule });
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingCapsule(null);
    setShowModal(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-playfair text-2xl font-bold text-navy-950">
          Time Capsule Management
        </h2>
        <button
          onClick={handleAdd}
          className="bg-gold-950 hover:bg-gold-700 text-navy-950 font-semibold px-4 py-2 rounded-md flex items-center space-x-2 transition-colors"
        >
          <SafeIcon icon={FiPlus} className="h-4 w-4" />
          <span>Create Letter</span>
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {timeCapsules.map((capsule) => (
          <motion.div
            key={capsule.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-5">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-playfair text-xl font-bold text-navy-950">
                  {capsule.title}
                </h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(capsule)}
                    className="bg-navy-100 hover:bg-navy-200 p-1.5 rounded-full transition-colors"
                  >
                    <SafeIcon icon={FiEdit2} className="h-4 w-4 text-navy-700" />
                  </button>
                  <button
                    onClick={() => handleDelete(capsule.id)}
                    className="bg-red-100 hover:bg-red-200 p-1.5 rounded-full transition-colors"
                  >
                    <SafeIcon icon={FiTrash2} className="h-4 w-4 text-red-700" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center text-navy-600 text-sm">
                  <SafeIcon icon={FiCalendar} className="h-4 w-4 mr-2" />
                  <span>Created: {formatDate(capsule.createdDate)}</span>
                </div>
                <div className="flex items-center text-navy-600 text-sm">
                  <SafeIcon icon={FiCalendar} className="h-4 w-4 mr-2" />
                  <span>Unlocks: {formatDate(capsule.unlockDate)}</span>
                </div>
                <div className="flex items-center text-navy-600 text-sm">
                  <SafeIcon icon={capsule.isLocked ? FiLock : FiUnlock} className={`h-4 w-4 mr-2 ${capsule.isLocked ? 'text-gold-600' : 'text-green-600'}`} />
                  <span>Status: {capsule.isLocked ? `Locked (${calculateTimeRemaining(capsule.unlockDate)})` : 'Unlocked'}</span>
                </div>
              </div>
              
              <div className="bg-navy-50 rounded-md p-3 mb-3">
                <p className="text-navy-700 text-sm line-clamp-3">
                  {capsule.content}
                </p>
              </div>
              
              {capsule.isLocked && (
                <button
                  onClick={() => {
                    const updatedCapsules = timeCapsules.map(c => 
                      c.id === capsule.id ? { ...c, isLocked: false } : c
                    );
                    setTimeCapsules(updatedCapsules);
                  }}
                  className="w-full bg-gold-950 hover:bg-gold-700 text-navy-950 py-2 rounded-md transition-colors flex items-center justify-center space-x-2 font-medium"
                >
                  <SafeIcon icon={FiUnlock} className="h-4 w-4" />
                  <span>Unlock Now</span>
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <CapsuleModal
            capsule={editingCapsule}
            onClose={() => setShowModal(false)}
            onSave={(capsuleData) => {
              const now = new Date().toISOString().split('T')[0];
              
              if (editingCapsule) {
                // Editing existing capsule
                setTimeCapsules(timeCapsules.map(c => 
                  c.id === editingCapsule.id ? { 
                    ...c, 
                    ...capsuleData,
                    isLocked: new Date(capsuleData.unlockDate) > new Date()
                  } : c
                ));
              } else {
                // Adding new capsule
                setTimeCapsules([
                  ...timeCapsules,
                  {
                    id: Date.now(),
                    ...capsuleData,
                    createdDate: now,
                    isLocked: new Date(capsuleData.unlockDate) > new Date()
                  }
                ]);
              }
              setShowModal(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const CapsuleModal = ({ capsule, onClose, onSave }) => {
  const [capsuleData, setCapsuleData] = useState(
    capsule || {
      title: '',
      unlockDate: '',
      content: ''
    }
  );
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCapsuleData({
      ...capsuleData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(capsuleData);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-navy-950/70 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-playfair text-xl font-bold text-navy-950">
            {capsule ? 'Edit Time Capsule' : 'Create New Time Capsule'}
          </h3>
          <button
            onClick={onClose}
            className="text-navy-500 hover:text-navy-700 transition-colors"
          >
            <SafeIcon icon={FiX} className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-navy-700 mb-1">
              Letter Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={capsuleData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-silver-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
              placeholder="Enter a title for your letter"
            />
          </div>
          
          <div>
            <label htmlFor="unlockDate" className="block text-sm font-medium text-navy-700 mb-1">
              Unlock Date
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SafeIcon icon={FiCalendar} className="h-5 w-5 text-navy-500" />
              </div>
              <input
                type="date"
                id="unlockDate"
                name="unlockDate"
                value={capsuleData.unlockDate}
                onChange={handleChange}
                required
                min={new Date().toISOString().split('T')[0]}
                className="w-full pl-10 pr-3 py-2 border border-silver-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
              />
            </div>
            <p className="text-xs text-navy-500 mt-1">
              The letter will remain locked until this date unless manually unlocked.
            </p>
          </div>
          
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-navy-700 mb-1">
              Letter Content
            </label>
            <textarea
              id="content"
              name="content"
              value={capsuleData.content}
              onChange={handleChange}
              required
              rows={12}
              className="w-full px-3 py-2 border border-silver-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent resize-none"
              placeholder="Write your letter to your future self..."
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-silver-300 rounded-md text-navy-700 hover:bg-navy-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gold-950 hover:bg-gold-700 text-navy-950 rounded-md transition-colors flex items-center space-x-2"
            >
              <SafeIcon icon={FiSave} className="h-4 w-4" />
              <span>{capsule ? 'Update Letter' : 'Save Letter'}</span>
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AdminTimeCapsule;