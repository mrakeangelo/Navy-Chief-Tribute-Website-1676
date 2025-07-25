import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import Dropzone from './common/Dropzone';

const { FiPlus, FiEdit2, FiTrash2, FiX, FiCalendar, FiMapPin, FiSave } = FiIcons;

const AdminTimeline = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      years: '2003-2007',
      location: 'Naval Station Great Lakes, IL',
      position: 'Seaman Recruit to Petty Officer 3rd Class',
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Began his distinguished naval career with basic training and advanced technical education. Demonstrated exceptional leadership potential from the start.',
      achievements: ['Honor Graduate', 'Leadership Award', 'Technical Excellence']
    },
    {
      id: 2,
      years: '2007-2011',
      location: 'USS Enterprise (CVN-65)',
      position: 'Petty Officer 2nd Class',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Served aboard the legendary USS Enterprise during multiple deployments. Gained invaluable experience in naval operations and team leadership.',
      achievements: ['Navy Achievement Medal', 'Good Conduct Medal', 'Deployment Ribbon']
    },
    {
      id: 3,
      years: '2011-2015',
      location: 'Naval Air Station Pensacola, FL',
      position: 'Petty Officer 1st Class',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Advanced to senior enlisted positions with increased responsibilities in training and mentoring junior sailors.',
      achievements: ['Navy Commendation Medal', 'Instructor Qualification', 'Mentor of the Year']
    }
  ]);
  
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this timeline event?')) {
      setEvents(events.filter(event => event.id !== id));
    }
  };

  const handleEdit = (event) => {
    setEditingEvent({ ...event });
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingEvent(null);
    setShowModal(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-playfair text-2xl font-bold text-navy-950">
          Career Timeline Management
        </h2>
        <button
          onClick={handleAdd}
          className="bg-gold-950 hover:bg-gold-700 text-navy-950 font-semibold px-4 py-2 rounded-md flex items-center space-x-2 transition-colors"
        >
          <SafeIcon icon={FiPlus} className="h-4 w-4" />
          <span>Add Event</span>
        </button>
      </div>

      {/* Timeline Events List */}
      <div className="space-y-6">
        {events.map((event) => (
          <motion.div
            key={event.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white border border-silver-200 rounded-lg overflow-hidden shadow-md"
          >
            <div className="md:flex">
              <div className="md:w-1/4 relative">
                <img
                  src={event.image}
                  alt={`${event.position} at ${event.location}`}
                  className="w-full h-48 md:h-full object-cover"
                />
                <div className="absolute top-2 right-2 flex space-x-2">
                  <button
                    onClick={() => handleEdit(event)}
                    className="bg-white/90 hover:bg-white p-2 rounded-full transition-colors"
                  >
                    <SafeIcon icon={FiEdit2} className="h-4 w-4 text-navy-700" />
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="bg-white/90 hover:bg-white p-2 rounded-full transition-colors"
                  >
                    <SafeIcon icon={FiTrash2} className="h-4 w-4 text-red-600" />
                  </button>
                </div>
              </div>
              <div className="md:w-3/4 p-4">
                <div className="flex flex-wrap md:flex-nowrap md:items-center gap-3 mb-2">
                  <div className="flex items-center text-gold-600">
                    <SafeIcon icon={FiCalendar} className="h-4 w-4 mr-1" />
                    <span className="font-semibold">{event.years}</span>
                  </div>
                  <div className="flex items-center text-navy-600">
                    <SafeIcon icon={FiMapPin} className="h-4 w-4 mr-1" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <h3 className="font-playfair text-xl font-bold text-navy-950 mb-2">
                  {event.position}
                </h3>
                <p className="text-navy-700 mb-3">{event.description}</p>
                <div className="mt-3">
                  <h4 className="font-medium text-navy-800 mb-2">Achievements:</h4>
                  <div className="flex flex-wrap gap-2">
                    {event.achievements.map((achievement, idx) => (
                      <span 
                        key={idx} 
                        className="bg-navy-50 text-navy-700 px-2 py-1 rounded-md text-sm"
                      >
                        {achievement}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <EventModal
            event={editingEvent}
            onClose={() => setShowModal(false)}
            onSave={(eventData) => {
              if (editingEvent) {
                // Editing existing event
                setEvents(events.map(e => 
                  e.id === editingEvent.id ? { ...e, ...eventData } : e
                ));
              } else {
                // Adding new event
                setEvents([
                  ...events,
                  {
                    id: Date.now(), // Simple ID generation for demo
                    ...eventData
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

const EventModal = ({ event, onClose, onSave }) => {
  const [eventData, setEventData] = useState(
    event || {
      years: '',
      location: '',
      position: '',
      description: '',
      achievements: [''],
      image: ''
    }
  );
  
  const [file, setFile] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value
    });
  };
  
  const handleAchievementChange = (index, value) => {
    const newAchievements = [...eventData.achievements];
    newAchievements[index] = value;
    setEventData({
      ...eventData,
      achievements: newAchievements
    });
  };
  
  const addAchievement = () => {
    setEventData({
      ...eventData,
      achievements: [...eventData.achievements, '']
    });
  };
  
  const removeAchievement = (index) => {
    const newAchievements = [...eventData.achievements];
    newAchievements.splice(index, 1);
    setEventData({
      ...eventData,
      achievements: newAchievements
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Filter out empty achievements
    const filteredAchievements = eventData.achievements.filter(a => a.trim() !== '');
    
    // In a real app, you would upload the file to a storage service
    // and get back a URL to store in the database
    if (file) {
      // Simulate file upload by using a FileReader to get a data URL
      const reader = new FileReader();
      reader.onloadend = () => {
        onSave({
          ...eventData,
          achievements: filteredAchievements,
          image: reader.result
        });
      };
      reader.readAsDataURL(file);
    } else {
      onSave({
        ...eventData,
        achievements: filteredAchievements
      });
    }
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
            {event ? 'Edit Timeline Event' : 'Add New Timeline Event'}
          </h3>
          <button
            onClick={onClose}
            className="text-navy-500 hover:text-navy-700 transition-colors"
          >
            <SafeIcon icon={FiX} className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="years" className="block text-sm font-medium text-navy-700 mb-1">
                Years
              </label>
              <input
                type="text"
                id="years"
                name="years"
                value={eventData.years}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-silver-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                placeholder="e.g., 2010-2015"
              />
            </div>
            
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-navy-700 mb-1">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={eventData.location}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-silver-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                placeholder="e.g., USS Enterprise"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="position" className="block text-sm font-medium text-navy-700 mb-1">
              Position/Title
            </label>
            <input
              type="text"
              id="position"
              name="position"
              value={eventData.position}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-silver-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
              placeholder="e.g., Petty Officer 1st Class"
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-navy-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={eventData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-silver-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent resize-none"
              placeholder="Describe this period of service..."
            />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-navy-700">
                Achievements
              </label>
              <button
                type="button"
                onClick={addAchievement}
                className="text-sm text-gold-950 hover:text-gold-700 transition-colors"
              >
                + Add Achievement
              </button>
            </div>
            <div className="space-y-2">
              {eventData.achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={achievement}
                    onChange={(e) => handleAchievementChange(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-silver-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    placeholder="e.g., Navy Achievement Medal"
                  />
                  {eventData.achievements.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeAchievement(index)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <SafeIcon icon={FiX} className="h-5 w-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1">
              Event Photo
            </label>
            {eventData.image && (
              <div className="mb-2">
                <img
                  src={eventData.image}
                  alt="Preview"
                  className="h-40 object-cover rounded-md"
                />
                <p className="text-xs text-navy-500 mt-1">Current photo</p>
              </div>
            )}
            <Dropzone
              onFileAccepted={(acceptedFile) => {
                setFile(acceptedFile);
              }}
              accept={{
                'image/*': ['.jpeg', '.jpg', '.png', '.gif']
              }}
              maxFiles={1}
              maxSize={5 * 1024 * 1024} // 5MB
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
              <span>{event ? 'Update Event' : 'Add Event'}</span>
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AdminTimeline;