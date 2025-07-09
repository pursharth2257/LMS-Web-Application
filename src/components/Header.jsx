import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../axiosConfig';
import { motion } from 'framer-motion';
import { FaSearch, FaChevronDown, FaGraduationCap } from 'react-icons/fa';
import { useSignUp } from '../contexts/SignUpContext';
import ComingSoonPopup from './ComingSoonPopup';

// Constants
const ERROR_MESSAGES = {
  SESSION_EXPIRED: 'Session expired. Please log in again.',
  FETCH_PROFILE: 'Failed to fetch user profile',
  INVALID_TOKEN: 'Invalid token. Please log in again.',
};

const NAV_ITEMS = [
  {
    label: 'All Courses',
    to: '/courses/all',
    isButton: true,
  },
  {
    label: 'Review',
    submenu: [
      { label: 'Participant Reviews', to: '/reviews/participant' },
      { label: 'Video Reviews', to: '/reviews/video' },
      { label: 'Corporate Training Reviews', to: '/reviews/corporate' },
      { label: 'College Training Reviews', to: '/reviews/college' },
      { label: 'Job Support Reviews', to: '/reviews/job-support' },
      { label: 'MouthShut Reviews', comingSoon: true },
      { label: 'JustDial Reviews', comingSoon: true },
      { label: 'Reviews Reporter', to: '/reviews/reporter' },
      { label: 'LinkedIn Reviews', comingSoon: true },
      { label: 'YouTube Reviews', comingSoon: true },
      { label: 'Learner Reviews & Complaints', to: '/reviews/complaints' },
      { label: 'Medium Reviews', comingSoon: true },
    ],
  },
  {
    label: 'Corporate Training',
    to: '/corporate-training',
  },
  {
    label: 'Existing Students',
    submenu: [
      { label: 'Student Support', to: '/students/student-support' },
      { label: 'Events', to: '/students/events' },
      { label: 'Internship Support', comingSoon: true },
      { label: 'Career Support', comingSoon: true },
      { label: 'Certification', to: '/students/certification' },
      { label: 'Submit Feedback', to: '/students/submit-feedback' },
    ],
  },
  {
    label: 'About Us',
    submenu: [
      { label: 'About BrainBridge', to: '/about/company' },
      { label: 'Our Affiliation', to: '/about/team' },
      { label: 'Our Student', to: '/about/mission' },
      { label: 'Placement Partners', to: '/about/testimonials' },
      { label: 'Contact Us', to: '/about/contact' },
    ],
  },
];

// Modal Component (Reused from other components)
const Modal = ({ isOpen, message, type, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => onClose(), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`p-6 rounded-lg shadow-lg max-w-sm w-full ${
          type === 'success' ? 'bg-green-100' : 'bg-red-100'
        }`}
      >
        <p
          className={`text-sm font-medium ${
            type === 'success' ? 'text-green-800' : 'text-red-800'
          }`}
        >
          {message}
        </p>
        <button
          onClick={onClose}
          className={`mt-4 px-4 py-2 rounded text-white text-sm ${
            type === 'success' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
          }`}
        >
          Close
        </button>
      </div>
    </div>
  );
};

// NavItem Component (Desktop)
const NavItem = memo(({ item, handleComingSoonClick, closeMobileMenu }) => (
  <div className="relative group">
    {item.submenu ? (
      <>
        <button
          className="flex items-center text-gray-700 hover:text-teal-600 transition-colors duration-300 text-sm whitespace-nowrap"
          aria-label={`${item.label} menu`}
        >
          {item.label}
          <FaChevronDown className="ml-1 w-2 h-2" />
        </button>
        <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {item.submenu.map((subItem, index) => (
              <div key={index}>
                {subItem.comingSoon ? (
                  <button
                    onClick={() => handleComingSoonClick(subItem.label)}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-teal-600"
                    role="menuitem"
                  >
                    {subItem.label}
                  </button>
                ) : (
                  <Link
                    to={subItem.to}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-teal-600"
                    role="menuitem"
                    onClick={closeMobileMenu}
                  >
                    {subItem.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </>
    ) : item.isButton ? (
      <Link
        to={item.to}
        className="bg-gray-100 text-gray-700 px-2 xl:px-3 py-1.5 rounded text-sm hover:bg-gray-200 transition-colors duration-300 whitespace-nowrap"
        onClick={closeMobileMenu}
      >
        {item.label}
      </Link>
    ) : (
      <Link
        to={item.to}
        className="text-gray-700 hover:text-teal-600 transition-colors duration-300 text-sm whitespace-nowrap"
        onClick={closeMobileMenu}
      >
        {item.label}
      </Link>
    )}
  </div>
));

// MobileNavItem Component
const MobileNavItem = memo(({ item, handleComingSoonClick, closeMobileMenu }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li>
      {item.submenu ? (
        <>
          <button
            className="flex items-center justify-between w-full text-left text-gray-700 hover:text-teal-600 py-2 px-2 rounded-lg hover:bg-gray-50 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={`${item.label} menu`}
          >
            <span className="font-medium">{item.label}</span>
            <FaChevronDown
              className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            />
          </button>
          <div className={`mt-2 ml-4 border-l-2 border-teal-200 pl-4 space-y-1 ${isOpen ? '' : 'hidden'}`}>
            {item.submenu.map((subItem, index) => (
              <div key={index}>
                {subItem.comingSoon ? (
                  <button
                    onClick={() => {
                      handleComingSoonClick(subItem.label);
                      closeMobileMenu();
                    }}
                    className="block w-full text-left py-2 text-sm text-gray-600 hover:text-teal-600 hover:bg-teal-50 px-2 rounded transition-colors"
                  >
                    {subItem.label}
                  </button>
                ) : (
                  <Link
                    to={subItem.to}
                    className="block py-2 text-sm text-gray-600 hover:text-teal-600 hover:bg-teal-50 px-2 rounded transition-colors"
                    onClick={closeMobileMenu}
                  >
                    {subItem.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <Link
          to={item.to}
          className={`block w-full text-left ${item.isButton ? 'bg-gray-100' : ''} text-gray-700 hover:text-teal-600 py-2 px-2 rounded-lg hover:bg-gray-50 transition-colors font-medium`}
          onClick={closeMobileMenu}
        >
          {item.label}
        </Link>
      )}
    </li>
  );
});

// Component
const Header = () => {
  const navigate = useNavigate();
  const { showSignUpPopup, user, setUser, isLoading, setIsLoading, isLogin, setIsLogin } = useSignUp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [comingSoonFeature, setComingSoonFeature] = useState('');
  const [notification, setNotification] = useState({ message: '', type: '' });

  // Parse JWT
  const parseJwt = useCallback(token => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error('Error decoding JWT:', e);
      return null;
    }
  }, []);

  // Fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('Token');
      if (token && !user) {
        setIsLoading(true);
        try {
          const decodedToken = parseJwt(token);
          if (!decodedToken?.role) {
            throw new Error('Invalid token');
          }
          const profileEndpoint =
            decodedToken.role === 'instructor'
              ? '/instructors/profile'
              : '/students/profile';
          const response = await api.get(profileEndpoint);
          console.log('Profile response:', response.data);
          if (response.data.success) {
            setUser(response.data.data);
          } else {
            throw new Error(response.data.message || ERROR_MESSAGES.FETCH_PROFILE);
          }
        } catch (error) {
          console.error('Fetch Profile Error:', error.response?.data || error.message);
          let errorMessage = error.response?.data?.message || ERROR_MESSAGES.FETCH_PROFILE;
          if (error.response?.status === 401 || error.response?.status === 403 || error.message === 'Invalid token') {
            errorMessage = ERROR_MESSAGES.SESSION_EXPIRED;
            localStorage.removeItem('Token');
            localStorage.removeItem('user');
            setUser(null);
            setIsLogin(false);
            setNotification({ message: errorMessage, type: 'error' });
            setTimeout(() => navigate('/login'), 2000);
          } else {
            setNotification({ message: errorMessage, type: 'error' });
          }
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchUserProfile();
  }, [navigate, user, setUser, setIsLoading, setIsLogin, parseJwt]);

  // Toggle mobile menu
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  // Handle coming soon
  const handleComingSoonClick = useCallback(featureName => {
    setComingSoonFeature(featureName);
    setShowComingSoon(true);
  }, []);

  // Memoized user data
  const userData = useMemo(() => user || null, [user]);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <Modal
        isOpen={!!notification.message}
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: '', type: '' })}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center flex-shrink-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
              <div className="flex items-center">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-teal-600 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                  <FaGraduationCap className="text-white text-sm sm:text-xl" />
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                  BrainBridge
                </h3>
              </div>
            </Link>
          </motion.div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-4 lg:mx-6">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="What do you want to learn?"
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 text-sm"
                aria-label="Search courses"
              />
              <button
                className="absolute right-1 top-1 bottom-1 px-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors duration-300 flex items-center justify-center"
                aria-label="Search"
              >
                <FaSearch className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Navigation Links - Desktop */}
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6 flex-shrink-0">
            {NAV_ITEMS.map((item, index) => (
              <NavItem
                key={index}
                item={item}
                handleComingSoonClick={handleComingSoonClick}
                closeMobileMenu={() => {}}
              />
            ))}
            {isLoading ? (
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
            ) : userData ? (
              <Link
                to="/profile-dashboard"
                className="flex items-center"
                aria-label="View profile"
              >
                <img
                  src={userData.avatar || 'https://via.placeholder.com/32'}
                  alt={`${userData.firstName} ${userData.lastName}'s profile`}
                  className="w-8 h-8 rounded-full object-cover border border-teal-600"
                  loading="lazy"
                />
              </Link>
            ) : (
              <div className="flex mb-4 mt-4 sm:mb-6 justify-center">
                <button
                  className={`
                    w-32 sm:w-40 px-3 py-1.5 sm:px-5 sm:py-2 text-white font-medium rounded-md
                    ${isLogin ? 'bg-teal-600 hover:bg-teal-700' : 'bg-teal-400 hover:bg-teal-500'}
                    focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-1 
                    transition-colors duration-200 text-xs sm:text-sm shadow-sm
                  `}
                  onClick={() => {
                    showSignUpPopup();
                    setIsLogin(true);
                  }}
                >
                  LOGIN
                </button>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden flex flex-col gap-1 p-2 text-gray-700 ml-2"
            aria-label="Toggle mobile menu"
          >
            <span
              className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
              }`}
            ></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? 'max-h-screen pb-4' : 'max-h-0'
          }`}
          initial={{ height: 0 }}
          animate={{ height: isMobileMenuOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
        >
          <nav className="px-4 py-4 bg-white border-t border-gray-200">
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="What do you want to learn?"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                  aria-label="Search courses"
                />
                <button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
                  aria-label="Search"
                >
                  <FaSearch className="w-4 h-4" />
                </button>
              </div>
            </div>
            <ul className="flex flex-col gap-3">
              {NAV_ITEMS.map((item, index) => (
                <MobileNavItem
                  key={index}
                  item={item}
                  handleComingSoonClick={handleComingSoonClick}
                  closeMobileMenu={() => setIsMobileMenuOpen(false)}
                />
              ))}
              <li className="pt-2">
                {isLoading ? (
                  <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
                ) : userData ? (
                  <Link
                    to="/profile-dashboard"
                    className="flex items-center w-full text-left py-2 px-2 rounded-lg hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="View profile"
                  >
                    <img
                      src={userData.avatar || 'https://via.placeholder.com/32'}
                      alt={`${userData.firstName} ${userData.lastName}'s profile`}
                      className="w-10 h-10 rounded-full object-cover border border-teal-600 mr-2"
                      loading="lazy"
                    />
                    <span className="font-medium text-gray-700">{`${userData.firstName} ${userData.lastName}`}</span>
                  </Link>
                ) : (
                  <div className="flex mb-4 mt-4 sm:mb-6 justify-center">
                    <button
                      className={`
                        w-32 sm:w-40 px-3 py-1.5 sm:px-5 sm:py-2 text-white font-medium rounded-md
                        ${isLogin ? 'bg-teal-600 hover:bg-teal-700' : 'bg-teal-400 hover:bg-teal-500'}
                        focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-1 
                        transition-colors duration-200 text-xs sm:text-sm shadow-sm
                      `}
                      onClick={() => {
                        showSignUpPopup();
                        setIsLogin(true);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      LOGIN
                    </button>
                  </div>
                )}
              </li>
            </ul>
          </nav>
        </motion.div>
      </div>

      {/* Coming Soon Popup */}
      <ComingSoonPopup
        isOpen={showComingSoon}
        onClose={() => setShowComingSoon(false)}
        featureName={comingSoonFeature}
      />
    </header>
  );
};

export default Header;