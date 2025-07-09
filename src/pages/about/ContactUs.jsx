import React, { useState, useEffect, useCallback } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaYoutube, FaPaperPlane, FaComments, FaHeadset, FaGlobe, FaGraduationCap, FaBuilding } from 'react-icons/fa';
import api from '../../../axiosConfig'; // Import configured axios instance named 'api'
import './ContactUs.css'; // Import separate CSS file

// Data for quick contact cards
const quickContactCards = [
  {
    title: 'Program Inquiries',
    phone: '1800 210 2020',
    email: 'programs@brainbridge.com',
    description: 'Course details, admissions, curriculum',
    icon: <FaGraduationCap className="text-white text-2xl group-hover:text-teal-600 transition-colors duration-500" />,
  },
  {
    title: 'Corporate Training',
    phone: '1800 210 2021',
    email: 'enterprise@brainbridge.com',
    description: 'Corporate partnerships, bulk training',
    icon: <FaBuilding className="text-white text-2xl group-hover:text-teal-600 transition-colors duration-500" />,
  },
  {
    title: 'Technical Support',
    phone: '1800 210 2022',
    email: 'support@brainbridge.com',
    description: 'Technical issues, platform help',
    icon: <FaHeadset className="text-white text-2xl group-hover:text-teal-600 transition-colors duration-500" />,
  },
];

// Data for contact info cards
const contactInfoCards = [
  {
    title: 'Our Office',
    icon: <FaMapMarkerAlt className="text-white text-lg" />,
    iconBg: 'from-teal-500 to-teal-600',
    details: [
      'Brain Bridge Education Hub',
      'Tech Park, Sector 5',
      'Bangalore, Karnataka 560001',
      'India',
    ],
  },
  {
    title: 'Call Us',
    icon: <FaPhone className="text-white text-lg" />,
    iconBg: 'from-blue-500 to-blue-600',
    details: [
      '📞 1800 210 2020',
      '📱 +91 98765 43210',
      'Mon-Fri: 9AM-6PM IST',
    ],
  },
  {
    title: 'Email Us',
    icon: <FaEnvelope className="text-white text-lg" />,
    iconBg: 'from-purple-500 to-purple-600',
    details: [
      '📧 info@brainbridge.com',
      '📧 support@brainbridge.com',
      'Response within 24 hours',
    ],
  },
  {
    title: 'Follow Us',
    icon: <FaGlobe className="text-white text-lg" />,
    iconBg: 'from-green-500 to-green-600',
    socialLinks: [
      { href: '#', icon: <FaFacebook size={14} />, bg: 'bg-blue-600 hover:bg-blue-700' },
      { href: '#', icon: <FaTwitter size={14} />, bg: 'bg-blue-400 hover:bg-blue-500' },
      { href: '#', icon: <FaLinkedin size={14} />, bg: 'bg-blue-700 hover:bg-blue-800' },
      { href: '#', icon: <FaInstagram size={14} />, bg: 'bg-pink-600 hover:bg-pink-700' },
      { href: '#', icon: <FaYoutube size={14} />, bg: 'bg-red-600 hover:bg-red-700' },
    ],
  },
];

// Data for quick stats
const quickStats = [
  { value: '24/7', label: 'Support' },
  { value: '<2h', label: 'Response Time' },
  { value: '50K+', label: 'Happy Students' },
];

// Data for form options
const formOptions = [
  { value: 'technical', label: 'Technical Support' },
  { value: 'financial', label: 'Financial Inquiry' },
  { value: 'general', label: 'General Question' },
];

// Reusable Components
const QuickContactCard = React.memo(({ title, phone, email, description, icon }) => (
  <div className="group relative bg-gradient-to-br from-teal-50 to-teal-100 p-8 rounded-2xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
    <div className="absolute inset-0 bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <div className="relative z-10">
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg group-hover:bg-white transition-all duration-500">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-4 text-center group-hover:text-white transition-colors duration-500">{title}</h3>
      <div className="space-y-3 text-center">
        <p className="text-teal-700 font-bold text-lg group-hover:text-teal-200 transition-colors duration-500">📞 {phone}</p>
        <p className="text-teal-600 font-medium group-hover:text-teal-100 transition-colors duration-500">📧 {email}</p>
        <p className="text-sm text-gray-600 group-hover:text-gray-200 transition-colors duration-500">{description}</p>
      </div>
    </div>
  </div>
));

const ContactInfoCard = React.memo(({ title, icon, iconBg, details, socialLinks }) => (
  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 min-h-[160px]">
    <div className="flex items-start space-x-4 h-full">
      <div className="flex-shrink-0">
        <div className={`w-12 h-12 bg-gradient-to-br ${iconBg} rounded-full flex items-center justify-center`}>{icon}</div>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">{title}</h3>
        {details ? (
          <div className="text-sm text-gray-600 space-y-1 leading-relaxed">
            {details.map((detail, index) => (
              <p key={index} className="break-words">{detail}</p>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 mt-2">
            {socialLinks.map((link, index) => (
              <a key={index} href={link.href} className={`w-8 h-8 ${link.bg} rounded-full flex items-center justify-center text-white transition-colors flex-shrink-0`}>
                {link.icon}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
));

const QuickStat = React.memo(({ value, label }) => (
  <div className="text-center">
    <div className="text-3xl font-bold text-white mb-1">{value}</div>
    <div className="text-sm text-teal-200">{label}</div>
  </div>
));

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: '',
    query: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!document.getElementById('privacy').checked) {
      setSubmitMessage('Please agree to the Privacy Policy and Terms of Service');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    const token = localStorage.getItem('Token');

    try {
      await api.post('/contacts', {
        name: formData.name,
        email: formData.email,
        subject: formData.type,
        query: formData.query,
        type: formData.type,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
  }, [formData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800">
        <div className="absolute inset-0 bg-black/10 contact-bg-pattern"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
              <div className="grid grid-cols-3 gap-6 mb-8">
                {quickStats.map((stat, index) => (
                  <QuickStat key={index} {...stat} />
                ))}
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-teal-400 to-teal-600 rounded-3xl blur-lg opacity-30 animate-pulse"></div>
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Professional team ready to help"
                  className="relative w-full max-w-lg h-96 object-cover rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/500x400/14b8a6/ffffff?text=Contact+Us";
                  }}
                />
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
            {quickContactCards.map((card, index) => (
              <QuickContactCard key={index} {...card} />
            ))}
          </div>
        </div>
      </div>

      {/* Main Contact Section */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Let's Start a <span className="text-teal-600">Conversation</span>
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  We're here to help you succeed. Whether you have questions about our programs, need technical support, or want to explore partnership opportunities, our team is ready to assist.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contactInfoCards.map((card, index) => (
                  <ContactInfoCard key={index} {...card} />
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-2xl mx-auto my-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full mb-4">
                  <FaPaperPlane className="text-white text-2xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Send Us a Message</h2>
                <p className="text-gray-600">We'll get back to you within 24 hours</p>
              </div>
              <div className="space-y-6">
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
                    {formOptions.map((option, index) => (
                      <option key={index} value={option.value}>{option.label}</option>
                    ))}
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
                  <p className={`text-sm ${submitMessage.includes('Error') || submitMessage.includes('Please') ? 'text-red-600' : 'text-green-600'}`}>
                    {submitMessage}
                  </p>
                )}
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white py-4 px-6 rounded-lg hover:from-teal-700 hover:to-teal-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transform hover:-translate-y-0.5 hover:shadow-lg font-semibold text-lg flex items-center justify-center space-x-2 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <FaPaperPlane className="text-lg" />
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                </button>
              </div>
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