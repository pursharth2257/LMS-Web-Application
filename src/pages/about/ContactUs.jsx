import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaYoutube, FaPaperPlane, FaComments, FaHeadset, FaGlobe, FaGraduationCap, FaBuilding } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
import axios from 'axios';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: '',
    query: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false); // Added state for back-to-top button

  // Handle scroll to show/hide back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) { // Show button after scrolling 300px
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); // Cleanup on unmount
  }, []);

  // Function to scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!document.getElementById('privacy').checked) {
      setSubmitMessage('Please agree to the Privacy Policy and Terms of Service');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    const token = localStorage.getItem('Token'); // Adjust 'token' key based on your app's storage

    try {
      const response = await axios.post(
        'https://new-lms-backend-vmgr.onrender.com/api/v1/contacts',
        {
          name: formData.name,
          email: formData.email,
          subject: formData.type,
          query: formData.query,
          type: formData.type
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      setSubmitMessage('Message sent successfully!');
      setFormData({ name: '', email: '', type: '', query: '' });
      document.getElementById('privacy').checked = false;
    } catch (error) {
      if (error.response?.status === 401) {
        setSubmitMessage('Authentication failed. Please log in and try again.');
      } else {
        setSubmitMessage('Error sending message. Please try again.');
      }
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50">
      {/* Hero Section with Gradient Background */}
      <div className="relative overflow-hidden bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black/10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <div className="text-white">
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <FaHeadset className="mr-2 text-white" />
                <span className="text-sm font-medium">24/7 Support Available</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Get in <span className="text-teal-200">Touch</span>
              </h1>

              <p className="text-xl text-teal-100 mb-8 leading-relaxed">
                Ready to transform your career with Brain Bridge? Our expert team is here to guide you every step of the way. Let's start your learning journey today!
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">24/7</div>
                  <div className="text-sm text-teal-200">Support</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">&lt;2h</div>
                  <div className="text-sm text-teal-200">Response Time</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">50K+</div>
                  <div className="text-sm text-teal-200">Happy Students</div>
                </div>
              </div>
            </div>

            {/* Right side - Featured Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-teal-400 to-teal-600 rounded-3xl blur-lg opacity-30 animate-pulse"></div>
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Professional team ready to help"
                  className="relative w-full max-w-lg h-96 object-cover rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/500x400/14b8a6/ffffff?text=Contact+Us";
                  }}
                />

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-lg animate-bounce">
                  <FaComments className="text-teal-600 text-2xl" />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white rounded-full p-4 shadow-lg animate-pulse">
                  <FaPaperPlane className="text-teal-600 text-2xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Contact Cards */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Multiple Ways to <span className="text-teal-600">Connect</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the most convenient way to reach us. Our dedicated team is ready to assist you with any questions or concerns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Program Queries */}
            <div className="group relative bg-gradient-to-br from-teal-50 to-teal-100 p-8 rounded-2xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg group-hover:bg-white transition-all duration-500">
                    <FaGraduationCap className="text-white text-2xl group-hover:text-teal-600 transition-colors duration-500" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center group-hover:text-white transition-colors duration-500">
                  Program Inquiries
                </h3>
                <div className="space-y-3 text-center">
                  <p className="text-teal-700 font-bold text-lg group-hover:text-teal-200 transition-colors duration-500">
                    📞 1800 210 2020
                  </p>
                  <p className="text-teal-600 font-medium group-hover:text-teal-100 transition-colors duration-500">
                    📧 programs@brainbridge.com
                  </p>
                  <p className="text-sm text-gray-600 group-hover:text-gray-200 transition-colors duration-500">
                    Course details, admissions, curriculum
                  </p>
                </div>
              </div>
            </div>

            {/* Business Queries */}
            <div className="group relative bg-gradient-to-br from-teal-50 to-teal-100 p-8 rounded-2xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg group-hover:bg-white transition-all duration-500">
                    <FaBuilding className="text-white text-2xl group-hover:text-teal-600 transition-colors duration-500" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center group-hover:text-white transition-colors duration-500">
                  Corporate Training
                </h3>
                <div className="space-y-3 text-center">
                  <p className="text-teal-700 font-bold text-lg group-hover:text-teal-200 transition-colors duration-500">
                    📞 1800 210 2021
                  </p>
                  <p className="text-teal-600 font-medium group-hover:text-teal-100 transition-colors duration-500">
                    📧 enterprise@brainbridge.com
                  </p>
                  <p className="text-sm text-gray-600 group-hover:text-gray-200 transition-colors duration-500">
                    Corporate partnerships, bulk training
                  </p>
                </div>
              </div>
            </div>

            {/* Support */}
            <div className="group relative bg-gradient-to-br from-teal-50 to-teal-100 p-8 rounded-2xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg group-hover:bg-white transition-all duration-500">
                    <FaHeadset className="text-white text-2xl group-hover:text-teal-600 transition-colors duration-500" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center group-hover:text-white transition-colors duration-500">
                  Technical Support
                </h3>
                <div className="space-y-3 text-center">
                  <p className="text-teal-700 font-bold text-lg group-hover:text-teal-200 transition-colors duration-500">
                    📞 1800 210 2022
                  </p>
                  <p className="text-teal-600 font-medium group-hover:text-teal-100 transition-colors duration-500">
                    📧 support@brainbridge.com
                  </p>
                  <p className="text-sm text-gray-600 group-hover:text-gray-200 transition-colors duration-500">
                    Technical issues, platform help
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Contact Section */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Side - Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Let's Start a <span className="text-teal-600">Conversation</span>
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  We're here to help you succeed. Whether you have questions about our programs, need technical support, or want to explore partnership opportunities, our team is ready to assist.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 min-h-[160px]">
                  <div className="flex items-start space-x-4 h-full">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center">
                        <FaMapMarkerAlt className="text-white text-lg" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Our Office</h3>
                      <div className="text-sm text-gray-600 space-y-1 leading-relaxed">
                        <p className="break-words">Brain Bridge Education Hub</p>
                        <p className="break-words">Tech Park, Sector 5</p>
                        <p className="break-words">Bangalore, Karnataka 560001</p>
                        <p className="break-words">India</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 min-h-[160px]">
                  <div className="flex items-start space-x-4 h-full">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                        <FaPhone className="text-white text-lg" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Call Us</h3>
                      <div className="text-sm text-gray-600 space-y-1 leading-relaxed">
                        <p className="font-medium break-words">📞 1800 210 2020</p>
                        <p className="break-words">📱 +91 98765 43210</p>
                        <p className="text-xs text-gray-500 break-words">Mon-Fri: 9AM-6PM IST</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 min-h-[160px]">
                  <div className="flex items-start space-x-4 h-full">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                        <FaEnvelope className="text-white text-lg" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Email Us</h3>
                      <div className="text-sm text-gray-600 space-y-1 leading-relaxed">
                        <p className="break-words">📧 info@brainbridge.com</p>
                        <p className="break-words">📧 support@brainbridge.com</p>
                        <p className="text-xs text-gray-500 break-words">Response within 24 hours</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 min-h-[160px]">
                  <div className="flex items-start space-x-4 h-full">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                        <FaGlobe className="text-white text-lg" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Follow Us</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <a href="#" className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors flex-shrink-0">
                          <FaFacebook size={14} />
                        </a>
                        <a href="#" className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-white hover:bg-blue-500 transition-colors flex-shrink-0">
                          <FaTwitter size={14} />
                        </a>
                        <a href="#" className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center text-white hover:bg-blue-800 transition-colors flex-shrink-0">
                          <FaLinkedin size={14} />
                        </a>
                        <a href="#" className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center text-white hover:bg-pink-700 transition-colors flex-shrink-0">
                          <FaInstagram size={14} />
                        </a>
                        <a href="#" className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition-colors flex-shrink-0">
                          <FaYoutube size={14} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-2xl mx-auto my-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full mb-4">
                  <FaPaperPlane className="text-white text-2xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Send Us a Message</h2>
                <p className="text-gray-600">We'll get back to you within 24 hours</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover:border-teal-300"
                      placeholder="Your name"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover:border-teal-300"
                      placeholder="youremail@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="type" className="block text-sm font-semibold text-gray-700 mb-2">
                    Type *
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover:border-teal-300"
                    required
                  >
                    <option value="">Select a type</option>
                    
                    <option value="technical">Technical Support</option>
                    <option value="financial">Financial Inquiry</option>
                    
                    <option value="general">General Question</option>
                    
                  </select>
                </div>

                <div>
                  <label htmlFor="query" className="block text-sm font-semibold text-gray-700 mb-2">
                    Query *
                  </label>
                  <textarea
                    id="query"
                    name="query"
                    value={formData.query}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover:border-teal-300 resize-none"
                    placeholder="Tell us how we can help you..."
                    required
                  ></textarea>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="privacy"
                    className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                    required
                  />
                  <label htmlFor="privacy" className="ml-2 text-sm text-gray-600">
                    I agree to the <a href="#" className="text-teal-600 hover:text-teal-700 underline">Privacy Policy</a> and <a href="#" className="text-teal-600 hover:text-teal-700 underline">Terms of Service</a>
                  </label>
                </div>

                {submitMessage && (
                  <p className={`text-sm ${submitMessage.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
                    {submitMessage}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white py-4 px-6 rounded-lg hover:from-teal-700 hover:to-teal-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transform hover:-translate-y-0.5 hover:shadow-lg font-semibold text-lg flex items-center justify-center space-x-2 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <FaPaperPlane className="text-lg" />
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-teal-600 to-teal-700 text-white p-4 rounded-full shadow-lg hover:from-teal-700 hover:to-teal-800 transition-all duration-300 transform hover:scale-110 z-50"
          aria-label="Back to top"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ContactUs;