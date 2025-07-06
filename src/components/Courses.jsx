import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaBookmark } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Courses = () => {
  const [showModal, setShowModal] = useState(false);
  const [courses, setCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookmarkedCourses, setBookmarkedCourses] = useState([]);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const navigate = useNavigate();

  // Color palette for dynamic assignment
  const colorPalette = [
    { bgColor: 'bg-purple-500', textColor: 'text-purple-500' },
    { bgColor: 'bg-teal-600', textColor: 'text-teal-600' },
    { bgColor: 'bg-green-500', textColor: 'text-green-500' },
    { bgColor: 'bg-orange-500', textColor: 'text-orange-500' },
    { bgColor: 'bg-red-500', textColor: 'text-red-500' },
    { bgColor: 'bg-indigo-500', textColor: 'text-indigo-500' },
    { bgColor: 'bg-yellow-500', textColor: 'text-yellow-600' },
    { bgColor: 'bg-teal-700', textColor: 'text-teal-700' },
    { bgColor: 'bg-teal-500', textColor: 'text-teal-500' },
    { bgColor: 'bg-cyan-500', textColor: 'text-cyan-500' },
    { bgColor: 'bg-emerald-500', textColor: 'text-emerald-500' },
    { bgColor: 'bg-rose-500', textColor: 'text-rose-500' },
    { bgColor: 'bg-violet-500', textColor: 'text-violet-500' },
    { bgColor: 'bg-amber-500', textColor: 'text-amber-600' },
    { bgColor: 'bg-slate-600', textColor: 'text-slate-600' },
    { bgColor: 'bg-lime-500', textColor: 'text-lime-600' },
  ];

  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('https://lms-backend-flwq.onrender.com/api/v1/courses');
        setCourses(response.data.data || []);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch courses');
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
        console.error('Error fetching bookmarked courses:', err);
      }
    };

    fetchBookmarkedCourses();
  }, []);

  const handleBookmark = async (courseId) => {
    try {
      const token = localStorage.getItem('Token');
      if (!token) {
        setNotification({ message: 'Please login to bookmark courses', type: 'error' });
        navigate('/');
        return;
      }

      const isBookmarked = bookmarkedCourses.includes(courseId);
      
      const response = await axios.patch(
        `https://new-lms-backend-vmgr.onrender.com/api/v1/students/courses/${courseId}/bookmark`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setNotification({
          message: isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks',
          type: 'success',
        });
        // Update bookmarked courses list
        if (isBookmarked) {
          setBookmarkedCourses(bookmarkedCourses.filter(id => id !== courseId));
        } else {
          setBookmarkedCourses([...bookmarkedCourses, courseId]);
        }
      }
    } catch (err) {
      console.error('Bookmark Error:', err);
      setNotification({
        message: err.response?.data?.message || 'Failed to update bookmark',
        type: 'error',
      });
    }
  };

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setShowModal(false);
      }
    };

    if (showModal) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

  // Generate dynamic categories from API
  const categories = [...new Set(courses.map((course) => course.category).filter(Boolean))].map((category, index) => ({
    id: index + 1,
    title: category,
    courses: `${courses.filter((course) => course.category === category).length} Courses`,
    ...colorPalette[index % colorPalette.length], // Assign colors cyclically
  }));

  // Show first 8 categories by default
  const mainCategories = categories.slice(0, 8);

  // Handle category click to show modal with courses
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  // Filter courses by selected category
  const filteredCourses = selectedCategory
    ? courses.filter((course) => course.category === selectedCategory.title)
    : [];

  // Calculate display price for a course
  const getDisplayPrice = (course) => {
    if (course.price === 0) return 'Free';
    if (course.discountPrice) {
      return `₹${course.price - course.discountPrice}`;
    }
    return `₹${course.price}`;
  };

  // Calculate original price for display
  const getOriginalPrice = (course) => {
    if (course.discountPrice && course.price !== 0) {
      return `₹${course.price}`;
    }
    return null;
  };

  // Calculate discount percentage
  const getDiscountPercentage = (course) => {
    if (course.discountPrice && course.price !== 0) {
      return Math.round(((course.price - (course.price - course.discountPrice)) / course.price) * 100);
    }
    return null;
  };

  return (
    <section className="py-16">
      <div className="w-full px-0 sm:px-2 lg:px-4">
        {/* Section Header */}
        <div className="mb-8 px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-full text-sm font-medium mb-4">
            Course Categories
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
            Choose your <span className="text-teal-600">area of interest</span>
          </h2>
        </div>

        {/* Categories Grid */}
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : categories.length === 0 ? (
          <p className="text-center text-gray-500">No categories available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
            {mainCategories.map((category) => (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category)}
                className="group rounded-2xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border-[0.5px] border-gray-200 relative overflow-hidden bg-teal-50 hover:bg-teal-100"
              >
                {/* Icon with dotted circle */}
                <div className="flex justify-center mb-3 sm:mb-4">
                  <div className="relative">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-dashed rounded-full absolute inset-0 border-teal-600"></div>
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center m-2 shadow-sm">
                      <svg className="w-6 h-6 sm:w-8 sm:h-8 text-teal-600" fill="currentColor" viewBox="0 0 24 24">
                        {category.id % 16 === 1 && (
                          <path d="M10 2v2H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-2V2h-4zm2 4h4v12H8V6h4z" />
                        )}
                        {category.id % 16 === 2 && (
                          <path d="M7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3zm13.71-9.37l-1.34-1.34c-.39-.39-1.02-.39-1.41 0L9 12.25 11.75 15l8.96-8.96c.39-.39.39-1.02 0-1.41z" />
                        )}
                        {category.id % 16 === 3 && (
                          <path d="M7 4V2c0-.55.45-1 1-1h8c.55 0 1 .45 1 1v2h4c.55 0 1 .45 1 1v5c0 2.76-2.24 5-5 5h-1.41l1.13 2.26c.11.22.03.49-.19.6L12 20.62l-4.53-1.76c-.22-.11-.3-.38-.19-.6L8.41 16H7c-2.76 0-5-2.24-5-5V5c0-.55.45-1 1-1h4zm2 0h6V3H9v1z" />
                        )}
                        {category.id % 16 === 4 && (
                          <path d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7l-2 3v1h8v-1l-2-3h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 12H3V4h18v10z" />
                        )}
                        {category.id % 16 === 5 && (
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        )}
                        {category.id % 16 === 6 && (
                          <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
                        )}
                        {category.id % 16 === 7 && (
                          <path d="M12 15.2c1.77 0 3.2-1.43 3.2-3.2s-1.43-3.2-3.2-3.2S8.8 10.23 8.8 12s1.43 3.2 3.2 3.2zm0-5.2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm7-3h-2.4L15 5H9L7.4 7H5c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm0 12H3V4h18v10z" />
                        )}
                        {category.id % 16 === 8 && (
                          <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z" />
                        )}
                        {category.id % 16 === 9 && (
                          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                        )}
                        {category.id % 16 === 10 && (
                          <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z" />
                        )}
                        {category.id % 16 === 11 && (
                          <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
                        )}
                        {category.id % 16 === 12 && (
                          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                        )}
                        {category.id % 16 === 13 && (
                          <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
                        )}
                        {category.id % 16 === 14 && (
                          <path d="M20 6h-2.5l-1.5-1.5h-5L9.5 6H7c-1.1 0-1.99.9-1.99 2L5 18c0 1.1.9 2 2 2h13c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H7V8h13v10z" />
                        )}
                        {category.id % 16 === 15 && (
                          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
                        )}
                        {category.id % 16 === 0 && (
                          <path d="M16 1H8C6.34 1 5 2.34 5 4v16c0 1.66 1.34 3 3 3h8c1.66 0 3-1.34 3-3V4c0-1.66-1.34-3-3-3zm-2 20h-4v-1h4v1zm3.25-3H6.75V4h10.5v14z" />
                        )}
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 relative">
                    {category.title}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 w-8 sm:w-12 rounded-full bg-teal-600"></div>
                  </h3>
                  <div className="inline-block px-2 sm:px-3 py-1 border border-gray-200 rounded-md bg-white">
                    <p className="text-teal-600 font-medium text-xs">{category.courses}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-8 sm:mt-12">
          <Link
            to="/courses/all"
            className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-teal-600 text-white rounded-lg font-semibold text-sm transition-all duration-300 ease-in-out hover:bg-teal-700 hover:shadow-lg"
          >
            View All Courses
            <svg className="ml-2 w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Notification */}
      {notification.message && (
        <div className={`fixed top-4 right-4 p-4 rounded-md shadow-2xl text-white z-[60] transition-all duration-300 transform ${
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

      {/* Modal Popup */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
          {/* Backdrop */}
          <div
            className="fixed inset-0 backdrop-blur-lg bg-white bg-opacity-10"
            onClick={() => setShowModal(false)}
          ></div>

          {/* Modal Content */}
          <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-6xl max-h-[95vh] sm:max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex-shrink-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 rounded-t-xl sm:rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                    {selectedCategory?.title} Courses
                  </h2>
                  <p className="text-teal-600 mt-1 text-sm sm:text-base">
                    Explore {filteredCourses.length} courses in this category
                  </p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 flex-shrink-0"
                >
                  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              {filteredCourses.length === 0 ? (
                <p className="text-center text-gray-500">No courses available in this category.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {filteredCourses.map((course) => (
                    <Link
                      to={`/courses/${course._id}`}
                      key={course._id}
                      className="group rounded-2xl p-4 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border-[0.5px] border-gray-200 bg-white hover:bg-teal-50"
                    >
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleBookmark(course._id);
                        }}
                        className={`absolute top-2 right-2 p-2 rounded-full ${
                          bookmarkedCourses.includes(course._id)
                            ? 'text-yellow-500 bg-white'
                            : 'text-gray-400 bg-white hover:text-yellow-500'
                        }`}
                      >
                        <FaBookmark />
                      </button>
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-40 object-cover rounded-lg mb-4"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/150';
                          console.error('Thumbnail load error for URL:', course.thumbnail);
                        }}
                      />
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{course.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        By {course.instructor.firstName} {course.instructor.lastName}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-teal-600 font-semibold">{getDisplayPrice(course)}</span>
                          {getOriginalPrice(course) && (
                            <span className="text-sm text-gray-500 line-through">{getOriginalPrice(course)}</span>
                          )}
                          {getDiscountPercentage(course) && (
                            <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded-full text-xs font-medium">
                              {getDiscountPercentage(course)}% OFF
                            </span>
                          )}
                        </div>
                        <span className="text-sm text-gray-500">{course.totalStudents} students</span>
                      </div>
                      <div className="flex items-center mt-2">
                        <span className="text-yellow-500">{'★'.repeat(Math.round(course.rating))}</span>
                        <span className="text-sm text-gray-500 ml-2">({course.totalRatings} ratings)</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Courses;