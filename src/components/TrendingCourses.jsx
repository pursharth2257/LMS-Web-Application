import React, { useState, useEffect, useCallback, memo, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../axiosConfig';
import { motion } from 'framer-motion';
import { FaStar, FaRegClock, FaUserGraduate, FaTimes, FaBookmark } from 'react-icons/fa';

// Constants
const ERROR_MESSAGES = {
  FETCH_COURSES: 'Failed to fetch courses. Please try again.',
  FETCH_BOOKMARKS: 'Error fetching bookmarked courses.',
  UPDATE_BOOKMARK: 'Failed to update bookmark. Please try again.',
  LOGIN_REQUIRED: 'Please log in to bookmark courses.',
};

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
    <div className="fixed top-4 right-4 p-4 rounded-md shadow-lg text-white z-60">
      <div
        className={`p-4 rounded-lg max-w-sm w-full ${
          type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`}
      >
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">{message}</p>
          <button onClick={onClose} className="ml-4 text-white">
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

// Course Card Component
const CourseCard = memo(({ course, handleBookmark, bookmarkedCourses }) => (
  <motion.div
    key={course._id}
    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-200 relative"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="relative pb-[56.25%]">
      <img
        src={course.thumbnail || 'https://res.cloudinary.com/dcgilmdbm/image/upload/v1747893719/default_avatar_xpw8jv.jpg'}
        alt={course.title}
        className="absolute h-full w-full object-cover"
        loading="lazy"
      />
      <button
        onClick={(e) => handleBookmark(course._id, e)}
        className={`absolute top-2 right-2 p-2 rounded-full z-10 ${
          bookmarkedCourses.includes(course._id)
            ? 'text-yellow-500 bg-white'
            : 'text-gray-400 bg-white hover:text-yellow-500'
        }`}
        aria-label={bookmarkedCourses.includes(course._id) ? 'Remove bookmark' : 'Add bookmark'}
      >
        <FaBookmark />
      </button>
    </div>
    <div className="p-4 sm:p-5">
      <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-2 line-clamp-2">{course.title}</h3>
      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{course.description || 'Learn key skills in this course'}</p>
      <div className="flex items-center mb-3">
        <p className="text-sm text-gray-700">
          By <span className="font-medium">{course.instructor?.firstName} {course.instructor?.lastName}</span>
        </p>
      </div>
      <div className="flex flex-wrap items-center mb-3 gap-1">
        <div className="flex items-center">
          <span className="text-yellow-400 font-bold mr-1 text-sm">{course.rating || 0}</span>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`w-3 h-3 ${i < Math.floor(course.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
              />
            ))}
          </div>
        </div>
        <span className="text-xs text-gray-500 ml-1">({course.totalRatings || 0})</span>
        <span className="text-xs text-gray-500 ml-2 sm:ml-4 hidden sm:inline">
          {(course.totalStudents || 0).toLocaleString()} students
        </span>
      </div>
      <div className="flex flex-wrap items-center text-xs text-gray-500 mb-4 gap-2 sm:gap-3">
        <div className="flex items-center">
          <FaRegClock className="mr-1" />
          <span>
            {course.duration} {course.duration === 1 ? 'hour' : 'hours'}
          </span>
        </div>
        <div className="flex items-center">
          <FaUserGraduate className="mr-1" />
          <span>{(course.level || 'All Levels').replace(/^\w/, (c) => c.toUpperCase())}</span>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
          <span className="font-bold text-gray-900 text-lg">
            ₹{course.discountPrice && course.discountPrice > 0 ? course.price - course.discountPrice : course.price}
          </span>
          {course.discountPrice && course.discountPrice > 0 && (
            <span className="text-gray-500 text-sm line-through">₹{course.price}</span>
          )}
        </div>
        <Link
          to={`/courses/${course._id}`}
          className="bg-teal-600 text-white px-4 py-2 rounded text-sm hover:bg-teal-700 transition-colors inline-block text-center w-full sm:w-auto"
        >
          View Course
        </Link>
      </div>
    </div>
  </motion.div>
));

// Component
const TrendingCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookmarkedCourses, setBookmarkedCourses] = useState([]);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const navigate = useNavigate();

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('/courses/popular');
        console.log('Courses response:', response.data);
        if (response.data.success) {
          setCourses(response.data.data);
        } else {
          throw new Error(response.data.message || ERROR_MESSAGES.FETCH_COURSES);
        }
      } catch (err) {
        console.error('Fetch Courses Error:', err.response?.data || err);
        setError(err.response?.data?.message || ERROR_MESSAGES.FETCH_COURSES);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // Fetch bookmarked courses
  useEffect(() => {
    const fetchBookmarkedCourses = async () => {
      try {
        const token = localStorage.getItem('Token');
        if (!token) return;

        const response = await api.get('/students/courses/bookmarked');
        console.log('Bookmarked courses response:', response.data);
        if (response.data.success) {
          setBookmarkedCourses(response.data.data.map((course) => course._id));
        } else {
          throw new Error(response.data.message || ERROR_MESSAGES.FETCH_BOOKMARKS);
        }
      } catch (err) {
        console.error('Fetch Bookmarks Error:', err.response?.data || err);
        setNotification({ message: ERROR_MESSAGES.FETCH_BOOKMARKS, type: 'error' });
      }
    };
    fetchBookmarkedCourses();
  }, []);

  // Toggle modal
  const toggleModal = useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, []);

  // Handle bookmark
  const handleBookmark = useCallback(
    async (courseId, e) => {
      e.preventDefault();
      e.stopPropagation();

      try {
        const token = localStorage.getItem('Token');
        if (!token) {
          setNotification({ message: ERROR_MESSAGES.LOGIN_REQUIRED, type: 'error' });
          setTimeout(() => navigate('/'), 2000);
          return;
        }

        const isBookmarked = bookmarkedCourses.includes(courseId);
        const response = await api.patch(`/students/courses/${courseId}/bookmark`, {
          bookmarked: !isBookmarked,
        });
        console.log('Bookmark response:', response.data);

        if (response.data.success) {
          setNotification({
            message: isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks',
            type: 'success',
          });
          setBookmarkedCourses((prev) =>
            isBookmarked ? prev.filter((id) => id !== courseId) : [...prev, courseId]
          );
        } else {
          throw new Error(response.data.message || ERROR_MESSAGES.UPDATE_BOOKMARK);
        }
      } catch (err) {
        console.error('Bookmark Error:', err.response?.data || err);
        const errorMsg = err.response?.data?.message || ERROR_MESSAGES.UPDATE_BOOKMARK;
        setNotification({ message: errorMsg, type: 'error' });
      }
    },
    [bookmarkedCourses, navigate]
  );

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isModalOpen]);

  // Memoized bookmarked courses
  const bookmarkedCourseIds = useMemo(() => bookmarkedCourses, [bookmarkedCourses]);

  if (loading) {
    return (
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-2 text-gray-600">Loading courses...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-600">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <Modal
        isOpen={!!notification.message}
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: '', type: '' })}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center sm:text-left mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Trending <span className="text-teal-600">Courses</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600">Find courses that are best for your profession</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {courses.slice(0, 3).map((course) => (
            <CourseCard
              key={course._id}
              course={course}
              handleBookmark={handleBookmark}
              bookmarkedCourses={bookmarkedCourseIds}
            />
          ))}
        </div>
        {courses.length > 3 && (
          <div className="text-center mt-8">
            <button
              onClick={toggleModal}
              className="bg-teal-600 text-white px-6 py-3 rounded text-sm font-medium hover:bg-teal-700 transition-colors inline-block"
            >
              View All Courses
            </button>
          </div>
        )}
      </div>
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-white rounded-lg w-full max-w-5xl mx-4 max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={toggleModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              aria-label="Close modal"
            >
              <FaTimes className="w-6 h-6" />
            </button>
            <div className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                All <span className="text-teal-600">Courses</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {courses.map((course) => (
                  <CourseCard
                    key={course._id}
                    course={course}
                    handleBookmark={handleBookmark}
                    bookmarkedCourses={bookmarkedCourseIds}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default TrendingCourses;