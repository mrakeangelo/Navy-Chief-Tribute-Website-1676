import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMail, FiLock, FiUnlock, FiCalendar, FiClock, FiEdit3, FiSave } = FiIcons;

const TimeCapsule = () => {
  const [newLetter, setNewLetter] = useState({
    title: '',
    content: '',
    unlockDate: ''
  });
  const [showForm, setShowForm] = useState(false);

  const timeCapsules = [
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
    },
    {
      id: 4,
      title: 'Family and Service Balance',
      createdDate: '2024-04-05',
      unlockDate: '2026-04-05',
      isLocked: true,
      content: 'Balancing family life with naval service has been one of my greatest challenges...'
    }
  ];

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLetter(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newLetter.title && newLetter.content && newLetter.unlockDate) {
      // Here you would typically save to a backend
      console.log('New time capsule:', newLetter);
      setNewLetter({ title: '', content: '', unlockDate: '' });
      setShowForm(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-50 to-silver-100 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-navy-950 mb-4">
            Time Capsule
          </h1>
          <p className="text-xl text-navy-700 max-w-2xl mx-auto">
            Letters to myself - wisdom preserved for future reflection
          </p>
          <div className="h-1 w-24 bg-gold-950 mx-auto mt-6"></div>
        </motion.div>

        {/* Create New Letter Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-gold-950 hover:bg-gold-600 text-navy-950 font-semibold py-3 px-8 rounded-lg transition-colors duration-300 flex items-center space-x-2 mx-auto"
          >
            <SafeIcon icon={FiEdit3} className="h-5 w-5" />
            <span>Write New Letter</span>
          </button>
        </motion.div>

        {/* New Letter Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-12"
          >
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="font-playfair text-2xl font-bold text-navy-950 mb-6">
                Create New Time Capsule
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-navy-700 mb-2">
                    Letter Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={newLetter.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-silver-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    placeholder="Enter a title for your letter"
                  />
                </div>

                <div>
                  <label htmlFor="unlockDate" className="block text-sm font-medium text-navy-700 mb-2">
                    Unlock Date
                  </label>
                  <input
                    type="date"
                    id="unlockDate"
                    name="unlockDate"
                    value={newLetter.unlockDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-silver-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-navy-700 mb-2">
                    Letter Content
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    value={newLetter.content}
                    onChange={handleInputChange}
                    required
                    rows={8}
                    className="w-full px-3 py-2 border border-silver-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent resize-none"
                    placeholder="Write your letter to your future self..."
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="bg-gold-950 hover:bg-gold-600 text-navy-950 font-semibold py-2 px-6 rounded-md transition-colors duration-300 flex items-center space-x-2"
                  >
                    <SafeIcon icon={FiSave} className="h-4 w-4" />
                    <span>Save Letter</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="bg-silver-300 hover:bg-silver-400 text-navy-950 font-semibold py-2 px-6 rounded-md transition-colors duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}

        {/* Time Capsules Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {timeCapsules.map((capsule, index) => (
            <motion.div
              key={capsule.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-playfair text-xl font-bold text-navy-950">
                    {capsule.title}
                  </h3>
                  <SafeIcon 
                    icon={capsule.isLocked ? FiLock : FiUnlock} 
                    className={`h-6 w-6 ${capsule.isLocked ? 'text-gold-600' : 'text-green-600'}`} 
                  />
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-navy-600 text-sm">
                    <SafeIcon icon={FiCalendar} className="h-4 w-4 mr-2" />
                    <span>Created: {new Date(capsule.createdDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-navy-600 text-sm">
                    <SafeIcon icon={FiClock} className="h-4 w-4 mr-2" />
                    <span>Unlocks: {new Date(capsule.unlockDate).toLocaleDateString()}</span>
                  </div>
                </div>

                {capsule.isLocked ? (
                  <div className="bg-gold-50 border border-gold-200 rounded-md p-4 text-center">
                    <SafeIcon icon={FiLock} className="h-8 w-8 text-gold-600 mx-auto mb-2" />
                    <p className="text-gold-700 font-medium">Locked</p>
                    <p className="text-gold-600 text-sm">
                      Opens in {calculateTimeRemaining(capsule.unlockDate)}
                    </p>
                  </div>
                ) : (
                  <div className="bg-green-50 border border-green-200 rounded-md p-4">
                    <div className="flex items-center mb-2">
                      <SafeIcon icon={FiUnlock} className="h-5 w-5 text-green-600 mr-2" />
                      <span className="text-green-700 font-medium">Unlocked</span>
                    </div>
                    <p className="text-navy-700 leading-relaxed">{capsule.content}</p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimeCapsule;