import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMail, FiPhone, FiMapPin, FiSend, FiUpload, FiUser, FiMessageSquare } = FiIcons;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    file: null
  });
  const [submitted, setSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: FiMail,
      title: 'Email',
      value: 'chief.thompson@navy.mil',
      description: 'Official correspondence'
    },
    {
      icon: FiPhone,
      title: 'Phone',
      value: '(555) 123-4567',
      description: 'Recruiting office direct line'
    },
    {
      icon: FiMapPin,
      title: 'Location',
      value: 'Naval Reserve Center',
      description: 'San Diego, CA'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      file: e.target.files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', subject: '', message: '', file: null });
      }, 3000);
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
            Contact & Admin
          </h1>
          <p className="text-xl text-navy-700 max-w-2xl mx-auto">
            Get in touch or upload content to honor Chief Thompson's legacy
          </p>
          <div className="h-1 w-24 bg-gold-950 mx-auto mt-6"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <h2 className="font-playfair text-2xl font-bold text-navy-950 mb-6">
              Send a Message
            </h2>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <SafeIcon icon={FiSend} className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-playfair text-xl font-semibold text-navy-950 mb-2">
                  Message Sent!
                </h3>
                <p className="text-navy-700">
                  Thank you for your message. We'll get back to you soon.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-navy-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-silver-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-navy-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-silver-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-navy-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-silver-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    placeholder="Message subject"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-navy-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-3 py-2 border border-silver-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent resize-none"
                    placeholder="Your message..."
                  />
                </div>

                <div>
                  <label htmlFor="file" className="block text-sm font-medium text-navy-700 mb-2">
                    Attach File (Optional)
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="file"
                      id="file"
                      name="file"
                      onChange={handleFileChange}
                      className="hidden"
                      accept="image/*,video/*,.pdf,.doc,.docx"
                    />
                    <label
                      htmlFor="file"
                      className="cursor-pointer bg-silver-100 hover:bg-silver-200 text-navy-700 px-4 py-2 rounded-md transition-colors duration-300 flex items-center space-x-2"
                    >
                      <SafeIcon icon={FiUpload} className="h-4 w-4" />
                      <span>Choose File</span>
                    </label>
                    {formData.file && (
                      <span className="text-sm text-navy-600">{formData.file.name}</span>
                    )}
                  </div>
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

          {/* Contact Information & Admin Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="font-playfair text-2xl font-bold text-navy-950 mb-6">
                Contact Information
              </h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-gold-100 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                      <SafeIcon icon={info.icon} className="h-6 w-6 text-gold-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy-950 mb-1">{info.title}</h3>
                      <p className="text-navy-700 font-medium">{info.value}</p>
                      <p className="text-navy-600 text-sm">{info.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Admin Upload Section */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="font-playfair text-2xl font-bold text-navy-950 mb-6">
                Admin Upload
              </h2>
              <p className="text-navy-700 mb-6">
                Use this section to upload photos, videos, or documents to add to Chief Thompson's legacy website.
              </p>
              <div className="space-y-4">
                <button className="w-full bg-navy-950 hover:bg-navy-800 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-300 flex items-center justify-center space-x-2">
                  <SafeIcon icon={FiUpload} className="h-5 w-5" />
                  <span>Upload Photos</span>
                </button>
                <button className="w-full bg-navy-950 hover:bg-navy-800 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-300 flex items-center justify-center space-x-2">
                  <SafeIcon icon={FiUpload} className="h-5 w-5" />
                  <span>Upload Videos</span>
                </button>
                <button className="w-full bg-navy-950 hover:bg-navy-800 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-300 flex items-center justify-center space-x-2">
                  <SafeIcon icon={FiMessageSquare} className="h-5 w-5" />
                  <span>Moderate Messages</span>
                </button>
              </div>
            </div>

            {/* Speaking Engagements */}
            <div className="bg-gold-50 border border-gold-200 rounded-lg p-6">
              <h3 className="font-playfair text-xl font-bold text-navy-950 mb-3">
                Speaking Engagements
              </h3>
              <p className="text-navy-700 mb-4">
                Chief Thompson is available for speaking engagements, leadership seminars, and mentorship programs.
              </p>
              <button className="bg-gold-950 hover:bg-gold-600 text-navy-950 font-semibold py-2 px-4 rounded-md transition-colors duration-300">
                Book Speaking Event
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;