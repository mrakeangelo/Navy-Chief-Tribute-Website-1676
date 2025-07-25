import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import Dropzone from './common/Dropzone';

const { FiImage, FiPlus, FiEdit2, FiTrash2, FiX, FiFilter, FiSave } = FiIcons;

const AdminGallery = () => {
  const [photos, setPhotos] = useState([
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
    }
  ]);
  const [filter, setFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState(null);
  
  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'deployment', label: 'Deployment' },
    { id: 'training', label: 'Training' },
    { id: 'ceremonies', label: 'Ceremonies' },
    { id: 'family', label: 'Family' }
  ];

  const filteredPhotos = filter === 'all' 
    ? photos 
    : photos.filter(photo => photo.category === filter);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this photo?')) {
      setPhotos(photos.filter(photo => photo.id !== id));
    }
  };

  const handleEdit = (photo) => {
    setEditingPhoto({ ...photo });
    setShowAddModal(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-playfair text-2xl font-bold text-navy-950">
          Photo Gallery Management
        </h2>
        <button
          onClick={() => {
            setEditingPhoto(null);
            setShowAddModal(true);
          }}
          className="bg-gold-950 hover:bg-gold-700 text-navy-950 font-semibold px-4 py-2 rounded-md flex items-center space-x-2 transition-colors"
        >
          <SafeIcon icon={FiPlus} className="h-4 w-4" />
          <span>Add Photo</span>
        </button>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setFilter(category.id)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              filter === category.id
                ? 'bg-navy-950 text-white'
                : 'bg-navy-100 text-navy-700 hover:bg-navy-200'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPhotos.map((photo) => (
          <motion.div
            key={photo.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white border border-silver-200 rounded-lg overflow-hidden shadow-md"
          >
            <div className="relative h-48">
              <img
                src={photo.src}
                alt={photo.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 flex space-x-2">
                <button
                  onClick={() => handleEdit(photo)}
                  className="bg-white/90 hover:bg-white p-2 rounded-full transition-colors"
                >
                  <SafeIcon icon={FiEdit2} className="h-4 w-4 text-navy-700" />
                </button>
                <button
                  onClick={() => handleDelete(photo.id)}
                  className="bg-white/90 hover:bg-white p-2 rounded-full transition-colors"
                >
                  <SafeIcon icon={FiTrash2} className="h-4 w-4 text-red-600" />
                </button>
              </div>
              <div className="absolute bottom-2 left-2">
                <span className="bg-navy-950/80 text-white text-xs px-2 py-1 rounded-full">
                  {photo.category}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-navy-950 mb-1">{photo.title}</h3>
              <p className="text-navy-600 text-sm">{photo.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showAddModal && (
          <PhotoModal
            photo={editingPhoto}
            categories={categories.filter(c => c.id !== 'all')}
            onClose={() => setShowAddModal(false)}
            onSave={(photoData) => {
              if (editingPhoto) {
                // Editing existing photo
                setPhotos(photos.map(p => 
                  p.id === editingPhoto.id ? { ...p, ...photoData } : p
                ));
              } else {
                // Adding new photo
                setPhotos([
                  ...photos,
                  {
                    id: Date.now(), // Simple ID generation for demo
                    ...photoData
                  }
                ]);
              }
              setShowAddModal(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const PhotoModal = ({ photo, categories, onClose, onSave }) => {
  const [photoData, setPhotoData] = useState(
    photo || {
      title: '',
      description: '',
      category: 'deployment',
      src: ''
    }
  );
  
  const [file, setFile] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPhotoData({
      ...photoData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, you would upload the file to a storage service
    // and get back a URL to store in the database
    if (file) {
      // Simulate file upload by using a FileReader to get a data URL
      const reader = new FileReader();
      reader.onloadend = () => {
        onSave({
          ...photoData,
          src: reader.result
        });
      };
      reader.readAsDataURL(file);
    } else {
      onSave(photoData);
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
        className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-playfair text-xl font-bold text-navy-950">
            {photo ? 'Edit Photo' : 'Add New Photo'}
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
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={photoData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-silver-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
              placeholder="Photo title"
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-navy-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={photoData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-silver-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent resize-none"
              placeholder="Photo description"
            />
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-navy-700 mb-1">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={photoData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-silver-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent bg-white"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1">
              Photo
            </label>
            {photoData.src && (
              <div className="mb-2">
                <img
                  src={photoData.src}
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
              <span>{photo ? 'Update Photo' : 'Add Photo'}</span>
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AdminGallery;