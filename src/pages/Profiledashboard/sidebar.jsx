import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ThemeContext } from '../../contexts/ThemeContext';
import { Bell, Grid, Heart, Home, MessageSquare, Settings, Star } from 'lucide-react';
import { RiMedalLine } from 'react-icons/ri';
import { FaSignOutAlt } from 'react-icons/fa';

const Navigation = ({ activePage, setActivePage, userName, isSidebarOpen, setIsSidebarOpen, toggleSidebar, setSidebarWidth, sidebarWidth }) => {
  const { theme, setTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [error, setError] = useState(null);

  // Sidebar width logic for desktop and mobile
  useEffect(() => {
    if (window.innerWidth >= 768) {
      setSidebarWidth(isExpanded ? '256px' : '64px');
    } else {
      setSidebarWidth(isSidebarOpen ? '70vw' : '0px');
    }
  }, [isExpanded, isSidebarOpen, setSidebarWidth]);

  const pageName = activePage.charAt(0).toUpperCase() + activePage.slice(1);
  const subtitle = `Welcome back! Here's your ${pageName.toLowerCase()} overview`;
  const initials = userName ? userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'JP';

  const menu = [
    { name: 'home', icon: <Home className="w-5 h-5 sm:w-6 sm:h-6" />, label: 'Go to Home' },
    { name: 'dashboard', icon: <Grid className="w-5 h-5 sm:w-6 sm:h-6" />, label: 'Dashboard' },
    { name: 'Achievements', icon: <RiMedalLine className="w-5 h-5 sm:w-6 sm:h-6" />, label: 'Achievements' },
    { name: 'assessmentscore', icon: <Star className="w-5 h-5 sm:w-6 sm:h-6" />, label: 'Assessment Score' },
    { name: 'Interest', icon: <Heart className="w-5 h-5 sm:w-6 sm:h-6" />, label: 'Interest' },
    { name: 'contact', icon: <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />, label: 'Contact' },
    { name: 'Settings', icon: <Settings className="w-5 h-5 sm:w-6 sm:h-6" />, label: 'Settings' },
  ];

  const fetchNotifications = async () => {
    const token = localStorage.getItem('Token');
    if (!token) {
      setError('Authentication failed. Please log in again.');
      setNotifications([]);
      setNotificationCount(0);
      return;
    }

    try {
      const response = await fetch('https://new-lms-backend-vmgr.onrender.com/api/v1/notifications?read=false', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          setError('Authentication failed. Please log in again.');
          navigate('/');
          return;
        }
        throw new Error('Failed to fetch notifications. Please check your connection.');
      }
      const data = await response.json();
      if (data.success) {
        const unreadNotifications = data.data.filter(notification => !notification.isRead);
        // Log notifications for debugging
        console.log('Fetched notifications:', unreadNotifications);
        setNotifications(unreadNotifications);
        setNotificationCount(unreadNotifications.length);
        setError(null);
      } else {
        throw new Error('API response unsuccessful. Please try again later.');
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setError(error.message || 'Unable to load notifications. Please try again later.');
      setNotifications([]);
      setNotificationCount(0);
    }
  };

  const markAsRead = async (notificationId) => {
    const token = localStorage.getItem('Token');
    if (!token) {
      navigate('/');
      return;
    }
    try {
      const response = await fetch(`https://new-lms-backend-vmgr.onrender.com/api/v1/notifications/${notificationId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ isRead: true }),
      });
      if (!response.ok) {
        throw new Error('Failed to mark notification as read');
      }
      setNotifications((prev) => prev.filter((n) => n._id !== notificationId));
      setNotificationCount((prev) => prev - 1);
    } catch (error) {
      console.error('Error marking notification as read:', error);
      setError(error.message || 'Failed to mark notification as read');
    }
  };

  const markAllAsRead = async () => {
    const token = localStorage.getItem('Token');
    if (!token) {
      navigate('/');
      return;
    }
    try {
      const response = await fetch('https://new-lms-backend-vmgr.onrender.com/api/v1/notifications/mark-all-read', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to mark all notifications as read');
      }
      const data = await response.json();
      if (data.success) {
        setNotifications([]);
        setNotificationCount(0);
        setError(null);
        await fetchNotifications();
      } else {
        throw new Error('API response unsuccessful');
      }
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      setError(error.message || 'Failed to mark all notifications as read');
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const toggleThemeHandler = () => {
    console.log('Toggling theme from:', theme);
    setTheme(theme === 'light' ? 'dark' : 'light');
    setIsUserMenuOpen(false);
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
    setIsUserMenuOpen(false);
  };

  const handleRetry = () => {
    const token = localStorage.getItem('Token');
    if (!token) {
      navigate('/');
      return;
    }
    setError(null);
    fetchNotifications();
  };

  const handleLogout = () => {
    localStorage.removeItem('Token');
    navigate('/');
    window.location.reload();
    setIsUserMenuOpen(false);
  };

  const handleMenuClick = (itemName) => {
    try {
      if (itemName === 'home') {
        navigate('/');
        setIsSidebarOpen(false);
      } else {
        if (typeof setActivePage === 'function') {
          setActivePage(itemName);
          setIsSidebarOpen(false);
        } else {
          console.error('setActivePage is not a function');
        }
      }
    } catch (error) {
      console.error('Error in handleMenuClick:', error);
    }
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
    setIsPopupOpen(false);
  };

  // Optional: Validate ObjectId format
  const isValidObjectId = (id) => {
    return /^[0-9a-fA-F]{24}$/.test(id);
  };

  return (
    <>
      <div
        className={`shadow-md flex flex-col items-center py-6 space-y-1 fixed top-0 h-screen transition-all duration-300 z-[1000] ${
          theme === 'dark' ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-600'
        } ${isSidebarOpen ? 'w-[70vw] left-0' : 'w-0 left-[-100%] md:w-16 md:left-0 md:hover:w-64'}`}
        onMouseEnter={() => window.innerWidth >= 768 && setIsExpanded(true)}
        onMouseLeave={() => window.innerWidth >= 768 && setIsExpanded(false)}
      >
        {menu.map((item) => (
          <div
            key={item.name}
            className="relative group w-full flex justify-center p-3 cursor-pointer rounded-xl transition-colors duration-200"
            onClick={() => handleMenuClick(item.name)}
          >
            <div
              className={`flex items-center gap-4 rounded-xl p-2 transition-colors duration-200 ${
                activePage === item.name && item.name !== 'home'
                  ? theme === 'dark'
                    ? 'bg-gray-700 text-gray-100'
                    : 'bg-gray-200 text-gray-800'
                  : theme === 'dark'
                  ? 'text-gray-300 group-hover:bg-gray-700 group-hover:text-gray-100'
                  : 'text-gray-600 group-hover:bg-gray-200 group-hover:text-gray-800'
              } ${isExpanded || isSidebarOpen ? 'w-full pl-4' : 'w-10 justify-center'}`}
            >
              {item.icon}
              {(isExpanded || isSidebarOpen) && <span className="text-sm capitalize">{item.label}</span>}
            </div>
          </div>
        ))}
        <div
          className="relative group w-full flex justify-center p-3 cursor-pointer rounded-xl transition-colors duration-200 mt-auto"
          onClick={handleLogout}
        >
          <div
            className={`flex items-center gap-4 rounded-xl p-2 transition-colors duration-200 ${
              theme === 'dark'
                ? 'text-gray-300 group-hover:bg-gray-700 group-hover:text-gray-100'
                : 'text-gray-600 group-hover:bg-gray-200 group-hover:text-gray-800'
            } ${isExpanded || isSidebarOpen ? 'w-full pl-4' : 'w-10 justify-center'}`}
          >
            <FaSignOutAlt className="w-5 h-5 sm:w-6 sm:h-6" />
            {(isExpanded || isSidebarOpen) && <span className="text-sm capitalize">Sign Out</span>}
          </div>
        </div>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <nav
        className={`p-4 shadow-md flex items-center justify-between transition-colors duration-300 ${
          theme === 'dark' ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'
        }`}
        style={{ marginLeft: window.innerWidth >= 768 ? sidebarWidth : '0px' }}
      >
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="md:hidden p-2"
            aria-label="Toggle sidebar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
          <div>
            <h1 className="text-xl font-bold">{pageName}</h1>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {subtitle}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-4">
            <button
              className="p-2"
              onClick={toggleThemeHandler}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              <svg
                className="w-6 h-6"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{ color: theme === 'dark' ? '#FFD700' : 'currentColor' }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            </button>
            <div className="relative flex items-center">
              <button
                className={`p-2 rounded-full text-sm relative flex items-center ${
                  theme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-600'
                }`}
                onClick={togglePopup}
                aria-label={`Notifications, ${notificationCount} new`}
              >
                <Bell className="w-5 h-5" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </button>
            </div>
            <button
              className={`p-2 text-white rounded-full w-8 h-8 flex items-center justify-center ${
                theme === 'dark' ? 'bg-purple-700' : 'bg-purple-600'
              }`}
              aria-label={`User profile for ${userName || 'User'}`}
            >
              {initials}
            </button>
          </div>
          <div className="md:hidden relative">
            <button
              className={`p-2 text-white rounded-full w-8 h-8 flex items-center justify-center ${
                theme === 'dark' ? 'bg-purple-700' : 'bg-purple-600'
              }`}
              onClick={toggleUserMenu}
              aria-label={`User profile menu for ${userName || 'User'}`}
            >
              {initials}
            </button>
            {isUserMenuOpen && (
              <div
                className={`absolute top-12 right-0 rounded-lg shadow-lg w-48 z-50 border ${
                  theme === 'dark' ? 'bg-gray-800 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-800'
                }`}
              >
                <div className="p-4 flex flex-col space-y-2">
                  <button
                    className="flex items-center space-x-2 text-sm"
                    onClick={toggleThemeHandler}
                    aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                  >
                    <svg
                      className="w-5 h-5"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      style={{ color: theme === 'dark' ? '#FFD700' : 'currentColor' }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                      />
                    </svg>
                    <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
                  </button>
                  <div className="relative">
                    <button
                      className={`flex items-center space-x-2 text-sm w-full text-left ${
                        theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                      }`}
                      onClick={togglePopup}
                      aria-label={`Notifications, ${notificationCount} new`}
                    >
                      <Bell className="w-5 h-5" />
                      <span>Notifications</span>
                      {notificationCount > 0 && (
                        <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {notificationCount}
                        </span>
                      )}
                    </button>
                  </div>
                  <button
                    className={`flex items-center space-x-2 text-sm ${
                      theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                    }`}
                    onClick={handleLogout}
                    aria-label="Sign out"
                  >
                    <FaSignOutAlt className="w-5 h-5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {isPopupOpen && (
          <div
            className={`absolute top-16 right-4 rounded-lg shadow-lg w-80 max-h-96 overflow-y-auto z-50 border ${
              theme === 'dark' ? 'bg-gray-800 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-800'
            }`}
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">Notifications</h2>
                {notifications.length > 0 && (
                  <button
                    className={`text-sm ${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}
                    onClick={markAllAsRead}
                    aria-label="Mark all notifications as read"
                  >
                    Mark All Read
                  </button>
                )}
              </div>
              {error ? (
                <div className={`text-sm ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
                  <p>{error}</p>
                  <button
                    className={`text-sm mt-2 ${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}
                    onClick={handleRetry}
                    aria-label="Retry loading notifications"
                  >
                    Retry
                  </button>
                </div>
              ) : notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div
                    key={notification._id}
                    className={`p-3 border-b last:border-b-0 hover:bg-opacity-10 transition-colors ${
                      theme === 'dark' ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <h3 className="text-sm font-medium">{notification.title}</h3>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {notification.message}
                    </p>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                      {new Date(notification.createdAt).toLocaleString()}
                    </p>
                    {notification.actionUrl && notification.relatedEntity && isValidObjectId(notification.relatedEntity._id) ? (
                      <Link
                        to={`/courses/${notification.relatedEntity._id}`}
                        className={`text-xs ${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'} hover:underline mt-1 block`}
                        onClick={() => {
                          togglePopup();
                          markAsRead(notification._id);
                          setActivePage('courseplayer');
                        }}
                        aria-label={`View course: ${notification.relatedEntity.title || 'Course'}`}
                      >
                        View Course
                      </Link>
                    ) : (
                      notification.actionUrl && (
                        <p className={`text-xs ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
                          Invalid course ID
                        </p>
                      )
                    )}
                  </div>
                ))
              ) : (
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  No new notifications
                </p>
              )}
              <button
                className={`mt-2 w-full text-sm ${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'} hover:underline`}
                onClick={togglePopup}
                aria-label="Close notifications popup"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navigation;