import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useTheme } from '../../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import Navigation from './sidebar';
import Dashboard from './dashboard';
import MyCourses from './mycourses';
import Contact from './contact';
import AssessmentScores from './assessmentscore';
import Interest from './Interest';
import Settings from './Settings';
import CoursePlayer from '../CoursePlayer';

const Notification = ({ message, type, onClose }) => {
  if (!message) return null;
  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded-md shadow-lg text-white transition-opacity duration-300 z-50 ${
        type === 'error' ? 'bg-red-500' : 'bg-green-500'
      } max-w-xs w-full`}
    >
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 hover:text-gray-200">✕</button>
      </div>
    </div>
  );
};

const ParentLayout = () => {
  const { theme } = useTheme();
  const [activePage, setActivePage] = useState('dashboard');
  const [courseId, setCourseId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState('64px'); // Default to 64px for desktop
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const sidebarRef = useRef(null);

  useEffect(() => {
    if (notification.message) {
      console.log('Notification:', notification.message, 'Type:', notification.type, 'Time:', new Date().toISOString());
      const timer = setTimeout(() => {
        setNotification({ message: '', type: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification.message]);

  useEffect(() => {
    let Mounted = true;

    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('Token');
        console.log('Token in ParentLayout:', token);
        if (!token) {
          setNotification({ message: 'Please log in to continue.', type: 'error' });
          setTimeout(() => navigate('/'), 3000);
          return;
        }

        const res = await axios.get('https://new-lms-backend-vmgr.onrender.com/api/v1/students/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Profile API Response:', res.data);
        if (Mounted) {
          setUser(res.data.data);
        }
      } catch (err) {
        console.error('Profile API Error:', err.response);
        let message = 'Unable to retrieve profile data. Please try again later.';
        if (err.response?.status === 401) {
          message = 'Session expired. Please log in again.';
          localStorage.removeItem('Token');
          setNotification({ message, type: 'error' });
          setTimeout(() => navigate('/'), 3000);
        } else if (err.response?.data?.message) {
          message = err.response.data.message;
        }
        setNotification({ message, type: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
    return () => {
      Mounted = false;
    };
  }, [navigate]);

  useEffect(() => {
    // Update sidebar width based on screen size and sidebar state
    const updateSidebarWidth = () => {
      if (window.innerWidth >= 768) {
        // Desktop: Use sidebarWidth from Navigation component
        setSidebarWidth(isSidebarOpen ? '256px' : '64px');
      } else {
        // Mobile: Sidebar width is either 70vw when open or 0px when closed
        setSidebarWidth(isSidebarOpen ? '70vw' : '0px');
      }
    };

    updateSidebarWidth();
    window.addEventListener('resize', updateSidebarWidth);
    return () => window.removeEventListener('resize', updateSidebarWidth);
  }, [isSidebarOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isSidebarOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderPage = () => {
    if (loading) {
      return (
        <div className={`flex justify-center items-center h-64 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${theme === 'dark' ? 'border-blue-400' : 'border-blue-500'}`}></div>
        </div>
      );
    }
    if (!user) {
      return null;
    }
    switch (activePage) {
      case 'home':
        return <Home sidebarWidth={sidebarWidth} user={user} />;
      case 'dashboard':
        return <Dashboard sidebarWidth={sidebarWidth} user={user} />;
      case 'Achievements':
        return <MyCourses sidebarWidth={sidebarWidth} />;
      case 'contact':
        return <Contact sidebarWidth={sidebarWidth} relatedCourseId={null} />;
      case 'assessmentscore':
        return <AssessmentScores sidebarWidth={sidebarWidth} />;
      case 'Interest':
        return <Interest sidebarWidth={sidebarWidth} />;
      case 'Settings':
        return <Settings sidebarWidth={sidebarWidth} />;
      case 'courseplayer':
        return <CoursePlayer sidebarWidth={sidebarWidth} courseId={courseId} />;
      default:
        return <Dashboard sidebarWidth={sidebarWidth} user={user} />;
    }
  };

  return (
    <div
      className={`flex flex-col min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-nutrition:50'}`}
    >
      <Notification message={notification.message} type={notification.type} onClose={() => setNotification({ message: '', type: '' })} />

      <div ref={sidebarRef}>
        <Navigation
          activePage={activePage}
          setActivePage={(page, courseId) => {
            setActivePage(page);
            if (courseId) setCourseId(courseId);
            setIsSidebarOpen(false);
          }}
          userName={user ? `${user.firstName} ${user.lastName}` : 'User'}
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          setSidebarWidth={setSidebarWidth}
          sidebarWidth={sidebarWidth} // Pass sidebarWidth as prop
        />
      </div>

      <div
        className={`flex-1 overflow-auto px-2 min-h-screen transition-all duration-300 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}
        style={{ marginLeft: window.innerWidth >= 768 ? sidebarWidth : '0px' }} // Apply margin only on desktop
      >
        {renderPage()}
      </div>
    </div>
  );
};

export default ParentLayout;