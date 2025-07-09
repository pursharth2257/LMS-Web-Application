import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../axiosConfig';
import { motion } from 'framer-motion';
import { FaStar, FaUsers, FaClock, FaPlay, FaFilter, FaSearch, FaBookmark } from 'react-icons/fa';

// Constants
const CATEGORIES = ['All', 'Web Development', 'Data Science', 'Design', 'Business', 'Marketing'];

const ERROR_MESSAGES = {
  NO_TOKEN: 'Please log in to bookmark courses',
  SESSION_EXPIRED: 'Session expired. Please log in again.',
  FETCH_COURSES: 'Failed to fetch courses',
  FETCH_BOOKMARKS: 'Failed to fetch bookmarked courses',
  BOOKMARK_FAILED: 'Failed to update bookmark',
};

// Modal Component (Reused from JobSupportReviews.js and Courses.js)
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

// Course Card Component
const CourseCard = memo(({ course, bookmarkedCourses, handleBookmark }) => {
  const getLevelColor = useCallback(level => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }, []);

  return (
    <Link
      to={`/courses/${course.id}`}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleBookmark(course.id);
          }}
          className={`absolute top-2 right-2 p-2 rounded-full z-10 ${
            bookmarkedCourses.includes(course.id)
              ? 'text-yellow-500 bg-white'
              : 'text-gray-400 bg-white hover:text-yellow-500'
          }`}
        >
          <FaBookmark />
        </button>
        <div className="relative overflow-hidden">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/500x300?text=No+Image';
              e.target.onerror = null;
              console.error('Image load error for URL:', course.image);
            }}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <FaPlay className="text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(course.level)}`}>
            {course.level}
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-purple-600 font-medium">{course.category}</span>
            <div className="flex items-center">
              <FaStar className="text-yellow-400 w-4 h-4" />
              <span className="text-sm text-gray-600 ml-1">{course.rating}</span>
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">
            {course.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
          <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
            <div className="flex items-center">
              <FaUsers className="w-4 h-4 mr-1" />
              <span>{course.students.toLocaleString()}</span>
            </div>
            <div className="flex items-center">
              <FaClock className="w-4 h-4 mr-1" />
              <span>{course.duration}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-purple-600">${course.price}</span>
              {course.originalPrice && (
                <span className="text-sm text-gray-500 line-through">${course.originalPrice}</span>
              )}
            </div>
            <button className="bg-teal-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-teal-700 transition-colors duration-300">
              Enroll Now
            </button>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-600">
              Instructor: <span className="font-medium text-gray-900">{course.instructor}</span>
            </p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
});

// Component
const CoursesPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [courses, setCourses] = useState([]);
  const [bookmarkedCourses, setBookmarkedCourses] = useState([]);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get('/courses');
        console.log('Courses response:', response.data);
        if (response.data.success) {
          setCourses(response.data.data || []);
        } else {
          throw new Error(response.data.message || ERROR_MESSAGES.FETCH_COURSES);
        }
      } catch (err) {
        console.error('Fetch Courses Error:', err.response?.data || err);
        let errorMessage = err.response?.data?.message || ERROR_MESSAGES.FETCH_COURSES;
        if (err.response?.status === 401) {
          errorMessage = ERROR_MESSAGES.SESSION_EXPIRED;
          localStorage.removeItem('Token');
          localStorage.removeItem('user');
          setTimeout(() => navigate('/'), 2000);
        }
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [navigate]);

  // Fetch bookmarked courses
  useEffect(() => {
    const fetchBookmarkedCourses = async () => {
      try {
        const token = localStorage.getItem('Token');
        if (!token) return;

        const response = await api.get('/students/courses/bookmarked');
        console.log('Bookmarked Courses response:', response.data);
        if (response.data.success) {
          setBookmarkedCourses(response.data.data.map(course => course.id));
        } else {
          throw new Error(response.data.message || ERROR_MESSAGES.FETCH_BOOKMARKS);
        }
      } catch (err) {
        console.error('Fetch Bookmarked Courses Error:', err.response?.data || err);
        setNotification({ message: ERROR_MESSAGES.FETCH_BOOKMARKS, type: 'error' });
        setTimeout(() => setNotification({ message: '', type: '' }), 3000);
      }
    };
    fetchBookmarkedCourses();
  }, []);

  // Handle bookmark
  const handleBookmark = useCallback(async (courseId) => {
    try {
      const token = localStorage.getItem('Token');
      if (!token) {
        setNotification({ message: ERROR_MESSAGES.NO_TOKEN, type: 'error' });
        setTimeout(() => navigate('/'), 2000);
        return;
      }

      const isBookmarked = bookmarkedCourses.includes(courseId);
      const response = await api.patch(`/students/courses/${courseId}/bookmark`);
      console.log('Bookmark response:', response.data);

      if (response.data.success) {
        setNotification({
          message: isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks',
          type: 'success',
        });
        setBookmarkedCourses(prev =>
          isBookmarked ? prev.filter(id => id !== courseId) : [...prev, courseId]
        );
      } else {
        throw new Error(response.data.message || ERROR_MESSAGES.BOOKMARK_FAILED);
      }
    } catch (err) {
      console.error('Bookmark Error:', err.response?.data || err);
      setNotification({
        message: err.response?.data?.message || ERROR_MESSAGES.BOOKMARK_FAILED,
        type: 'error',
      });
    }
    setTimeout(() => setNotification({ message: '', type: '' }), 3000);
  }, [bookmarkedCourses, navigate]);

  // Filter courses
  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [courses, selectedCategory, searchTerm]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Modal
        isOpen={!!notification.message}
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: '', type: '' })}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-poppins">
            Our Courses
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our comprehensive collection of courses designed to help you master new skills and advance your career.
          </p>
        </motion.div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <FaFilter className="text-gray-500" />
              <span className="text-gray-700 font-medium">Filter by:</span>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                      selectedCategory === category
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredCourses.length} of {courses.length} courses
          </p>
        </div>

        {/* Courses Grid */}
        {error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : filteredCourses.length === 0 ? (
          <p className="text-center text-gray-500">No courses available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map(course => (
              <CourseCard
                key={course.id}
                course={course}
                bookmarkedCourses={bookmarkedCourses}
                handleBookmark={handleBookmark}
              />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-8 py-3 rounded-full font-semibold hover:from-teal-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl">
            Load More Courses
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;