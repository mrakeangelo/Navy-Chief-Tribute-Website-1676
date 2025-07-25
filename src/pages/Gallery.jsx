import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiX, FiChevronLeft, FiChevronRight, FiFilter } = FiIcons;

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'deployment', label: 'Deployment' },
    { id: 'training', label: 'Training' },
    { id: 'ceremonies', label: 'Ceremonies' },
    { id: 'family', label: 'Family' }
  ];

  const galleryItems = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'ceremonies',
      title: 'Promotion Ceremony',
      description: 'Chief Thompson during his promotion ceremony'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'deployment',
      title: 'USS Enterprise Deployment',
      description: 'Serving aboard the legendary USS Enterprise'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'training',
      title: 'Flight Operations Training',
      description: 'Advanced training at Naval Air Station Pensacola'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'deployment',
      title: 'Naval Operations',
      description: 'Leading operations at Naval Station Norfolk'
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'training',
      title: 'Recruiter Training',
      description: 'Training new recruits for naval service'
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'family',
      title: 'Family Portrait',
      description: 'Chief Thompson with his family'
    },
    {
      id: 7,
      src: 'https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'ceremonies',
      title: 'Award Ceremony',
      description: 'Receiving commendation for outstanding service'
    },
    {
      id: 8,
      src: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'deployment',
      title: 'At Sea',
      description: 'Naval operations during deployment'
    }
  ];

  const filteredItems = activeFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  const openLightbox = (image) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    const currentIndex = filteredItems.findIndex(item => item.id === selectedImage.id);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % filteredItems.length;
    } else {
      newIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    }
    
    setSelectedImage(filteredItems[newIndex]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-50 to-silver-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-navy-950 mb-4">
            Photo Gallery
          </h1>
          <p className="text-xl text-navy-700 max-w-2xl mx-auto">
            Capturing moments of service, leadership, and dedication throughout the years
          </p>
          <div className="h-1 w-24 bg-gold-950 mx-auto mt-6"></div>
        </motion.div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                activeFilter === category.id
                  ? 'bg-gold-950 text-navy-950 shadow-lg'
                  : 'bg-white text-navy-700 hover:bg-gold-100 shadow-md'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                className="group cursor-pointer"
                onClick={() => openLightbox(item)}
              >
                <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-navy-950/0 group-hover:bg-navy-950/20 transition-all duration-300"></div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-playfair font-semibold text-navy-950 mb-1">{item.title}</h3>
                    <p className="text-navy-600 text-sm">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              onClick={closeLightbox}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-4xl max-h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white rounded-b-lg">
                  <h3 className="font-playfair text-xl font-semibold mb-2">{selectedImage.title}</h3>
                  <p className="text-silver-200">{selectedImage.description}</p>
                </div>
                
                {/* Navigation buttons */}
                <button
                  onClick={() => navigateImage('prev')}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-navy-950/50 hover:bg-navy-950/70 text-white p-3 rounded-full transition-all"
                >
                  <SafeIcon icon={FiChevronLeft} className="h-6 w-6" />
                </button>
                <button
                  onClick={() => navigateImage('next')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-navy-950/50 hover:bg-navy-950/70 text-white p-3 rounded-full transition-all"
                >
                  <SafeIcon icon={FiChevronRight} className="h-6 w-6" />
                </button>
                
                {/* Close button */}
                <button
                  onClick={closeLightbox}
                  className="absolute top-4 right-4 bg-navy-950/50 hover:bg-navy-950/70 text-white p-3 rounded-full transition-all"
                >
                  <SafeIcon icon={FiX} className="h-6 w-6" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Gallery;