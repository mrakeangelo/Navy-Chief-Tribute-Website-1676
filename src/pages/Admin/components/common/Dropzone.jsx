import React, { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import SafeIcon from '../../../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUpload, FiX, FiFile, FiImage } = FiIcons;

const Dropzone = ({ 
  onFileAccepted, 
  accept = { 'image/*': [] }, 
  maxFiles = 1, 
  maxSize = 5 * 1024 * 1024 // 5MB default
}) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    setError('');
    
    if (rejectedFiles && rejectedFiles.length > 0) {
      const rejectionError = rejectedFiles[0].errors[0];
      if (rejectionError.code === 'file-too-large') {
        setError(`File is too large. Max size is ${formatFileSize(maxSize)}.`);
      } else if (rejectionError.code === 'file-invalid-type') {
        setError('Invalid file type. Please upload an image file.');
      } else {
        setError(rejectionError.message);
      }
      return;
    }
    
    if (acceptedFiles && acceptedFiles.length > 0) {
      const acceptedFile = acceptedFiles[0];
      setFile(acceptedFile);
      onFileAccepted(acceptedFile);
    }
  }, [maxSize, onFileAccepted]);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles,
    maxSize
  });
  
  const removeFile = () => {
    setFile(null);
    onFileAccepted(null);
  };
  
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} bytes`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };
  
  return (
    <div className="space-y-2">
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer transition-colors ${
          isDragActive 
            ? 'border-gold-500 bg-gold-50' 
            : file 
              ? 'border-green-500 bg-green-50'
              : error
                ? 'border-red-500 bg-red-50'
                : 'border-silver-300 hover:border-gold-500 hover:bg-gold-50'
        }`}
      >
        <input {...getInputProps()} />
        
        {file ? (
          <div className="flex items-center justify-center space-x-2">
            <SafeIcon 
              icon={file.type.startsWith('image/') ? FiImage : FiFile} 
              className="h-5 w-5 text-green-600" 
            />
            <span className="text-green-700 font-medium">{file.name}</span>
            <button 
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeFile();
              }}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              <SafeIcon icon={FiX} className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div>
            <SafeIcon icon={FiUpload} className={`h-8 w-8 mx-auto mb-2 ${error ? 'text-red-500' : 'text-navy-500'}`} />
            {error ? (
              <p className="text-red-600 text-sm">{error}</p>
            ) : (
              <>
                <p className="text-navy-700 font-medium">
                  {isDragActive ? 'Drop the file here' : 'Drag & drop a file here, or click to select'}
                </p>
                <p className="text-navy-500 text-xs mt-1">
                  Max file size: {formatFileSize(maxSize)}
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropzone;