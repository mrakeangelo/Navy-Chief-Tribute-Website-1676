import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMessageSquare, FiArrowRight, FiStar, FiAnchor } = FiIcons;

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
          alt="Navy Chief in uniform"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-navy-950/70"></div>
      </div>

      {/* Naval insignia overlay */}
      <div className="absolute inset-0 z-10 opacity-10">
        <SafeIcon icon={FiAnchor} className="absolute top-20 right-20 h-32 w-32 text-gold-950 animate-pulse" />
        <SafeIcon icon={FiStar} className="absolute bottom-32 left-16 h-24 w-24 text-gold-950 animate-pulse" />
      </div>

      {/* Content */}
      <motion.div 
        className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex justify-center mb-6">
            <div className="h-24 w-24 bg-gold-950 rounded-full flex items-center justify-center">
              <SafeIcon icon={FiAnchor} className="h-12 w-12 text-navy-950" />
            </div>
          </div>
          <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Chief Michael J. Thompson
          </h1>
          <div className="h-1 w-24 bg-gold-950 mx-auto mb-6"></div>
          <p className="text-xl sm:text-2xl text-gold-100 font-medium">
            A Life of Service, Leadership, and Legacy
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex flex-wrap justify-center gap-4 text-silver-200 font-inter">
            <span className="bg-navy-800/50 px-4 py-2 rounded-full">U.S. Navy Chief</span>
            <span className="bg-navy-800/50 px-4 py-2 rounded-full">Reserve Recruiter</span>
            <span className="bg-navy-800/50 px-4 py-2 rounded-full">Mentor</span>
            <span className="bg-navy-800/50 px-4 py-2 rounded-full">Patriot</span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/messages"
            className="bg-gold-950 hover:bg-gold-600 text-navy-950 font-semibold py-3 px-8 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 group"
          >
            <SafeIcon icon={FiMessageSquare} className="h-5 w-5" />
            <span>Leave a Message</span>
          </Link>
          <Link
            to="/timeline"
            className="border-2 border-gold-950 text-gold-950 hover:bg-gold-950 hover:text-navy-950 font-semibold py-3 px-8 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 group"
          >
            <span>Explore His Journey</span>
            <SafeIcon icon={FiArrowRight} className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-16">
          <p className="text-silver-300 font-inter italic text-lg max-w-2xl mx-auto">
            "Leadership is not about being in charge. It is about taking care of those in your charge."
          </p>
          <p className="text-silver-400 font-inter text-sm mt-2">— Chief Thompson</p>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <div className="w-6 h-10 border-2 border-gold-950 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gold-950 rounded-full mt-2 animate-bounce"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;