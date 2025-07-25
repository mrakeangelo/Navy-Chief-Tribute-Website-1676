import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMessageSquare, FiSend, FiUser, FiHeart, FiClock } = FiIcons;

const Messages = () => {
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    photo: null
  });
  const [submitted, setSubmitted] = useState(false);

  const existingMessages = [
    {
      id: 1,
      name: 'Admiral Sarah Johnson',
      message: 'Chief Thompson, your dedication to excellence and mentorship has inspired countless sailors. Thank you for your unwavering service to our nation.',
      timestamp: '2 days ago',
      photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 2,
      name: 'Petty Officer Mark Rodriguez',
      message: 'Chief, you taught me what it means to be a true leader. Your guidance shaped my career and made me a better sailor. Congratulations on your promotion!',
      timestamp: '3 days ago',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 3,
      name: 'Commander Lisa Chen',
      message: 'Working alongside you has been an honor. Your professionalism and dedication to developing young sailors is truly remarkable. Fair winds and following seas!',
      timestamp: '5 days ago',
      photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 4,
      name: 'Seaman Jennifer Walsh',
      message: 'Chief Thompson believed in me when I didn\'t believe in myself. His mentorship changed my life and career path. Thank you for everything, Chief!',
      timestamp: '1 week ago',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.message) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', message: '', photo: null });
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-50 to-silver-100 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-navy-950 mb-4">
            Messages of Congratulations
          </h1>
          <p className="text-xl text-navy-700 max-w-2xl mx-auto">
            Share your thoughts, memories, and congratulations for Chief Thompson
          </p>
          <div className="h-1 w-24 bg-gold-950 mx-auto mt-6"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Message Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h2 className="font-playfair text-2xl font-bold text-navy-950 mb-6 flex items-center">
              <SafeIcon icon={FiMessageSquare} className="h-6 w-6 mr-2 text-gold-950" />
              Leave a Message
            </h2>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <SafeIcon icon={FiHeart} className="h-12 w-12 text-gold-950 mx-auto mb-4" />
                <h3 className="font-playfair text-xl font-semibold text-navy-950 mb-2">
                  Thank You!
                </h3>
                <p className="text-navy-700">
                  Your message has been submitted and will be reviewed before posting.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-navy-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-silver-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-navy-700 mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-3 py-2 border border-silver-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent resize-none"
                    placeholder="Share your thoughts, memories, or congratulations..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gold-950 hover:bg-gold-600 text-navy-950 font-semibold py-3 px-6 rounded-md transition-colors duration-300 flex items-center justify-center space-x-2"
                >
                  <SafeIcon icon={FiSend} className="h-5 w-5" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </motion.div>

          {/* Messages Wall */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h2 className="font-playfair text-2xl font-bold text-navy-950 mb-6 flex items-center">
              <SafeIcon icon={FiHeart} className="h-6 w-6 mr-2 text-gold-950" />
              Wall of Thanks
            </h2>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {existingMessages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-start space-x-3">
                    <img
                      src={msg.photo}
                      alt={msg.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-navy-950">{msg.name}</h4>
                        <div className="flex items-center text-navy-500 text-sm">
                          <SafeIcon icon={FiClock} className="h-3 w-3 mr-1" />
                          {msg.timestamp}
                        </div>
                      </div>
                      <p className="text-navy-700 text-sm leading-relaxed">{msg.message}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-navy-600 text-sm italic">
                {existingMessages.length} messages and counting...
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Messages;