import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUsers, FiTarget, FiTrendingUp, FiAward, FiQuote } = FiIcons;

const CurrentRole = () => {
  const achievements = [
    {
      icon: FiUsers,
      title: 'Recruits Mentored',
      value: '150+',
      description: 'Young sailors guided into naval service'
    },
    {
      icon: FiTarget,
      title: 'Recruitment Goals',
      value: '125%',
      description: 'Consistently exceeded annual targets'
    },
    {
      icon: FiTrendingUp,
      title: 'Retention Rate',
      value: '95%',
      description: 'Of recruits successfully completing training'
    },
    {
      icon: FiAward,
      title: 'Awards Received',
      value: '12',
      description: 'Excellence in recruiting and leadership'
    }
  ];

  const testimonials = [
    {
      name: 'Seaman Rachel Martinez',
      quote: 'Chief Thompson saw potential in me that I didn\'t even know existed. His guidance helped me find my purpose in the Navy.',
      rating: 5
    },
    {
      name: 'Petty Officer James Wilson',
      quote: 'The Chief\'s mentorship program changed my life. He taught me that being a sailor is about more than just the uniform.',
      rating: 5
    },
    {
      name: 'Seaman David Kim',
      quote: 'Chief Thompson\'s passion for the Navy is contagious. He made me proud to serve before I even stepped foot on a ship.',
      rating: 5
    }
  ];

  const responsibilities = [
    'Recruit and mentor future naval personnel',
    'Conduct community outreach programs',
    'Develop recruitment strategies and programs',
    'Provide career guidance and counseling',
    'Maintain relationships with educational institutions',
    'Coordinate with other military branches for joint initiatives'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-50 to-silver-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-navy-950 mb-4">
            Navy Reserve Recruiter
          </h1>
          <p className="text-xl text-navy-700 max-w-2xl mx-auto">
            Inspiring the next generation of naval leaders and building tomorrow's fleet
          </p>
          <div className="h-1 w-24 bg-gold-950 mx-auto mt-6"></div>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden mb-16"
        >
          <div className="md:flex">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Chief Thompson with recruits"
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8">
              <h2 className="font-playfair text-3xl font-bold text-navy-950 mb-4">
                Building Tomorrow's Navy
              </h2>
              <p className="text-navy-700 leading-relaxed mb-6">
                As a Navy Reserve Recruiter, Chief Thompson plays a crucial role in identifying, 
                recruiting, and mentoring the next generation of naval personnel. His passion for 
                service and exceptional leadership skills have made him one of the most successful 
                recruiters in the region.
              </p>
              <p className="text-navy-700 leading-relaxed">
                Beyond just recruitment, Chief Thompson serves as a mentor, counselor, and advocate 
                for young people seeking to serve their country. His commitment to excellence ensures 
                that every recruit is prepared for the challenges and opportunities that await them 
                in naval service.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
            >
              <div className="bg-gold-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <SafeIcon icon={achievement.icon} className="h-8 w-8 text-gold-600" />
              </div>
              <h3 className="font-playfair text-2xl font-bold text-navy-950 mb-2">
                {achievement.value}
              </h3>
              <h4 className="font-semibold text-navy-700 mb-2">{achievement.title}</h4>
              <p className="text-navy-600 text-sm">{achievement.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Responsibilities and Testimonials */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Responsibilities */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h3 className="font-playfair text-2xl font-bold text-navy-950 mb-6">
              Key Responsibilities
            </h3>
            <ul className="space-y-3">
              {responsibilities.map((responsibility, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gold-950 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-navy-700">{responsibility}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Testimonials */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h3 className="font-playfair text-2xl font-bold text-navy-950 mb-6">
              What Recruits Say
            </h3>
            <div className="space-y-6">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="border-l-4 border-gold-950 pl-4">
                  <div className="flex items-center mb-2">
                    <SafeIcon icon={FiQuote} className="h-4 w-4 text-gold-600 mr-2" />
                    <span className="font-semibold text-navy-950">{testimonial.name}</span>
                  </div>
                  <p className="text-navy-700 italic text-sm leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex mt-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-gold-500 text-sm">★</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-navy-950 rounded-lg shadow-lg p-8 text-center text-white"
        >
          <h3 className="font-playfair text-3xl font-bold mb-4">
            Interested in Naval Service?
          </h3>
          <p className="text-silver-200 mb-6 max-w-2xl mx-auto">
            Chief Thompson is always available to discuss opportunities in the Navy Reserve. 
            Whether you're considering a career change or looking to serve your country, 
            he's here to guide you through the process.
          </p>
          <button className="bg-gold-950 hover:bg-gold-600 text-navy-950 font-semibold py-3 px-8 rounded-lg transition-colors duration-300">
            Contact Chief Thompson
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default CurrentRole;