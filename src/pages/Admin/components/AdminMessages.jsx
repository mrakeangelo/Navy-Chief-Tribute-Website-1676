import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMessageSquare, FiCheckCircle, FiXCircle, FiEye, FiFilter } = FiIcons;

const AdminMessages = () => {
  const [filter, setFilter] = useState('all');
  const [messages, setMessages] = useState([
    {
      id: 1,
      name: 'Admiral Sarah Johnson',
      message: 'Chief Thompson, your dedication to excellence and mentorship has inspired countless sailors. Thank you for your unwavering service to our nation.',
      timestamp: '2024-05-10T14:30:00',
      status: 'approved',
      photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 2,
      name: 'Petty Officer Mark Rodriguez',
      message: 'Chief, you taught me what it means to be a true leader. Your guidance shaped my career and made me a better sailor. Congratulations on your promotion!',
      timestamp: '2024-05-09T09:15:00',
      status: 'approved',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 3,
      name: 'Commander Lisa Chen',
      message: 'Working alongside you has been an honor. Your professionalism and dedication to developing young sailors is truly remarkable. Fair winds and following seas!',
      timestamp: '2024-05-07T16:45:00',
      status: 'approved',
      photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 4,
      name: 'Captain James Wilson',
      message: 'Congratulations on your distinguished career, Chief. Your leadership has been an inspiration to us all.',
      timestamp: '2024-05-11T10:20:00',
      status: 'pending',
      photo: null
    },
    {
      id: 5,
      name: 'Lieutenant Ryan Garcia',
      message: 'Chief Thompson exemplifies the best qualities of naval leadership. His mentorship changed the trajectory of my career.',
      timestamp: '2024-05-11T08:15:00',
      status: 'pending',
      photo: null
    },
    {
      id: 6,
      name: 'Spam Account',
      message: 'Buy cheap watches and sunglasses at discount prices! Click here for amazing deals!',
      timestamp: '2024-05-10T23:45:00',
      status: 'rejected',
      photo: null
    }
  ]);
  
  const [expandedMessage, setExpandedMessage] = useState(null);
  
  const filterOptions = [
    { value: 'all', label: 'All Messages' },
    { value: 'pending', label: 'Pending Approval' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' }
  ];
  
  const filteredMessages = filter === 'all' 
    ? messages 
    : messages.filter(msg => msg.status === filter);
    
  const pendingCount = messages.filter(msg => msg.status === 'pending').length;
  
  const handleApprove = (id) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, status: 'approved' } : msg
    ));
  };
  
  const handleReject = (id) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, status: 'rejected' } : msg
    ));
  };
  
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to permanently delete this message?')) {
      setMessages(messages.filter(msg => msg.id !== id));
    }
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="font-playfair text-2xl font-bold text-navy-950">
            Message Moderation
          </h2>
          {pendingCount > 0 && (
            <div className="mt-1 text-gold-950">
              <span className="font-medium">{pendingCount} message{pendingCount !== 1 ? 's' : ''}</span> pending approval
            </div>
          )}
        </div>
        
        <div className="flex items-center">
          <SafeIcon icon={FiFilter} className="h-5 w-5 text-navy-700 mr-2" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-white border border-silver-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
          >
            {filterOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="space-y-4">
        {filteredMessages.length === 0 ? (
          <div className="bg-navy-50 rounded-lg p-6 text-center">
            <SafeIcon icon={FiMessageSquare} className="h-8 w-8 text-navy-400 mx-auto mb-2" />
            <p className="text-navy-700">No messages found with the current filter.</p>
          </div>
        ) : (
          filteredMessages.map((msg) => (
            <motion.div
              key={msg.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`bg-white border rounded-lg overflow-hidden shadow-sm ${
                msg.status === 'pending' ? 'border-gold-300' :
                msg.status === 'approved' ? 'border-green-300' :
                'border-red-300'
              }`}
            >
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3">
                    {msg.photo ? (
                      <img
                        src={msg.photo}
                        alt={msg.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-navy-200 flex items-center justify-center">
                        <span className="text-navy-700 font-semibold text-sm">
                          {msg.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-wrap justify-between items-start gap-2 mb-1">
                      <h3 className="font-semibold text-navy-950">{msg.name}</h3>
                      <div className="flex items-center text-sm">
                        <span className="text-navy-500">{formatDate(msg.timestamp)}</span>
                        <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                          msg.status === 'pending' ? 'bg-gold-100 text-gold-800' :
                          msg.status === 'approved' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {msg.status.charAt(0).toUpperCase() + msg.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    
                    <p className={`text-navy-700 text-sm ${
                      expandedMessage === msg.id ? '' : 'line-clamp-2'
                    }`}>
                      {msg.message}
                    </p>
                    
                    {msg.message.length > 120 && (
                      <button
                        onClick={() => setExpandedMessage(expandedMessage === msg.id ? null : msg.id)}
                        className="text-gold-950 text-xs mt-1 hover:underline"
                      >
                        {expandedMessage === msg.id ? 'Show less' : 'Read more'}
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="mt-3 flex justify-end space-x-2">
                  {msg.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleApprove(msg.id)}
                        className="px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors flex items-center space-x-1"
                      >
                        <SafeIcon icon={FiCheckCircle} className="h-4 w-4" />
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => handleReject(msg.id)}
                        className="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors flex items-center space-x-1"
                      >
                        <SafeIcon icon={FiXCircle} className="h-4 w-4" />
                        <span>Reject</span>
                      </button>
                    </>
                  )}
                  {msg.status !== 'pending' && (
                    <button
                      onClick={() => handleDelete(msg.id)}
                      className="px-3 py-1 bg-navy-100 text-navy-700 rounded-md hover:bg-navy-200 transition-colors text-sm"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminMessages;