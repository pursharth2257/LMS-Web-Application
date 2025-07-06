import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaRegClock, FaUserGraduate, FaTimes, FaBookmark } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TrendingCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookmarkedCourses, setBookmarkedCourses] = useState([]);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('https://lms-backend-flwq.onrender.com/api/v1/courses/popular');
        if (response.data.success) {
          setCourses(response.data.data);
        } else {
          setError('Failed to fetch courses');
        }
      } catch (err) {
        setError('Error fetching courses: ' + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // Fetch bookmarked courses when component mounts
  useEffect(() => {
    const fetchBookmarkedCourses = async () => {
      try {
        const token = localStorage.getItem('Token');
        if (!token) return;

        const response = await axios.get(
          'https://new-lms-backend-vmgr.onrender.com/api/v1/students/courses/bookmarked',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setBookmarkedCourses(response.data.data.map(course => course._id));
        }
      } catch (err) {
        console.error('Error fetching bookmarks:', err);
      }
    };

    fetchBookmarkedCourses();
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleBookmark = async (courseId, e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const token = localStorage.getItem('Token');
      if (!token) {
        setNotification({ message: 'Please log in to bookmark courses', type: 'error' });
        setTimeout(() => navigate('/'), 2000);
        return;
      }

      console.log('bookmarkedCourses:', bookmarkedCourses);
      const isBookmarked = bookmarkedCourses.includes(courseId);

      const response = await axios.patch(
        `https://new-lms-backend-vmgr.onrender.com/api/v1/students/courses/${courseId}/bookmark`,
        { bookmarked: !isBookmarked },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Bookmark response:', response.data);

      const success = response.data.success || response.data.data?.success || response.data.status === 'success';
      if (!success) {
        throw new Error('Bookmark update failed. Unexpected response structure.');
      }

      setNotification({
        message: isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks',
        type: 'success',
      });

      if (isBookmarked) {
        setBookmarkedCourses(bookmarkedCourses.filter(id => id !== courseId));
      } else {
        setBookmarkedCourses([...bookmarkedCourses, courseId]);
      }
    } catch (err) {
      console.error('Bookmark Error:', err);
      const errorMsg = err.response?.data?.message || 'Failed to update bookmark. Please try again.';
      setNotification({ message: errorMsg, type: 'error' });
    }
  };

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

  // Auto-hide notification after 3 seconds
  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        setNotification({ message: '', type: '' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  if (loading) {
    return (
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">Loading courses...</div>
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

  const renderCourseCard = (course) => (
    <div
      key={course._id}
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-200 relative"
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
        >
          <FaBookmark />
        </button>
      </div>
      <div className="p-4 sm:p-5">
        <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-2 line-clamp-2">
          {course.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {course.description || 'Learn key skills in this course'}
        </p>

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
            <span>{course.duration} {course.duration === 1 ? 'hour' : 'hours'}</span>
          </div>
          <div className="flex items-center">
            <FaUserGraduate className="mr-1" />
            <span>{(course.level || 'All Levels').replace(/^\w/, c => c.toUpperCase())}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
            <span className="font-bold text-gray-900 text-lg">
              ₹{course.discountPrice && course.discountPrice > 0 ? course.price - course.discountPrice : course.price}
            </span>
            {course.discountPrice && course.discountPrice > 0 && (
              <span className="text-gray-500 text-sm line-through">
                ₹{course.price}
              </span>
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
    </div>
  );

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      {notification.message && (
        <div className={`fixed top-4 right-4 p-4 rounded-md shadow-lg text-white z-60 ${
          notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'
        }`}>
          <div className="flex items-center justify-between">
            <span>{notification.message}</span>
            <button onClick={() => setNotification({ message: '', type: '' })} className="ml-4">
              ✕
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center sm:text-left mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Trending <span className="text-teal-600">Courses</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600">Find courses that are best for your profession</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {courses.slice(0, 3).map(renderCourseCard)}
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
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
                {courses.map(renderCourseCard)}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TrendingCourses;