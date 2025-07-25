import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMapPin, FiCalendar, FiChevronDown, FiChevronUp, FiAward } = FiIcons;

const Timeline = () => {
  const [expandedItem, setExpandedItem] = useState(null);

  const timelineData = [
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
    },
    {
      id: 4,
      years: '2015-2019',
      location: 'Naval Station Norfolk, VA',
      position: 'Senior Chief Petty Officer',
      image: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Promoted to Senior Chief, taking on greater leadership responsibilities and strategic planning roles.',
      achievements: ['Meritorious Service Medal', 'Division Leadership Award', 'Fleet Excellence']
    },
    {
      id: 5,
      years: '2019-Present',
      location: 'Naval Reserve Center, Multiple Locations',
      position: 'Chief Petty Officer & Reserve Recruiter',
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Currently serving as Chief Petty Officer and Reserve Recruiter, inspiring the next generation of naval leaders.',
      achievements: ['Outstanding Recruiter Award', 'Community Service Medal', 'Leadership Excellence']
    }
  ];

  const toggleExpanded = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
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
            Career Timeline
          </h1>
          <p className="text-xl text-navy-700 max-w-2xl mx-auto">
            A journey through two decades of distinguished naval service and leadership
          </p>
          <div className="h-1 w-24 bg-gold-950 mx-auto mt-6"></div>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gold-950"></div>

          {timelineData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="relative mb-12 ml-16"
            >
              {/* Timeline dot */}
              <div className="absolute -left-10 top-6 w-4 h-4 bg-gold-950 rounded-full border-4 border-white shadow-lg"></div>

              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img 
                      src={item.image} 
                      alt={`${item.location} - ${item.years}`}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <div className="flex items-center text-gold-600 mb-2">
                      <SafeIcon icon={FiCalendar} className="h-4 w-4 mr-2" />
                      <span className="font-semibold">{item.years}</span>
                    </div>
                    <div className="flex items-center text-navy-600 mb-4">
                      <SafeIcon icon={FiMapPin} className="h-4 w-4 mr-2" />
                      <span>{item.location}</span>
                    </div>
                    <h3 className="font-playfair text-xl font-bold text-navy-950 mb-3">
                      {item.position}
                    </h3>
                    <p className="text-navy-700 mb-4">{item.description}</p>
                    
                    <button
                      onClick={() => toggleExpanded(item.id)}
                      className="flex items-center text-gold-600 hover:text-gold-700 font-semibold transition-colors"
                    >
                      <SafeIcon icon={FiAward} className="h-4 w-4 mr-2" />
                      <span>View Achievements</span>
                      <SafeIcon 
                        icon={expandedItem === item.id ? FiChevronUp : FiChevronDown} 
                        className="h-4 w-4 ml-2" 
                      />
                    </button>

                    {expandedItem === item.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t border-silver-200"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {item.achievements.map((achievement, idx) => (
                            <div key={idx} className="flex items-center text-navy-600">
                              <SafeIcon icon={FiAward} className="h-3 w-3 mr-2 text-gold-600" />
                              <span className="text-sm">{achievement}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;