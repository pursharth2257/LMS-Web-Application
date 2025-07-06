import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import dashboardImage from '../../assets/dashboard.png';
import { FaPlay } from 'react-icons/fa';
import { ThemeContext } from '../../contexts/ThemeContext';
import CourseCards from './Coursecard';

const Notification = ({ message, type, onClose }) => {
  if (!message) return null;

  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded-md shadow-lg text-white transition-opacity duration-300 z-50 ${
        type === 'error' ? 'bg-red-500 dark:bg-red-600' : 'bg-green-500 dark:bg-green-600'
      } max-w-xs w-full`}
    >
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 hover:text-gray-200 dark:hover:text-gray-100">
          ✕
        </button>
      </div>
    </div>
  );
};

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => setNotification({ message: '', type: '' }), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification.message]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('Token');
        if (!token) {
          setNotification({ message: 'No authentication token found. Please log in.', type: 'error' });
          setTimeout(() => navigate('/'), 2000);
          return;
        }

        const response = await axios.get(
          'https://lms-backend-flwq.onrender.com/api/v1/students/courses',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const validCourses = response.data.data.filter((c) => c.course !== null);
        setCourses(validCourses);
      } catch (error) {
        console.error('Error fetching student courses:', error);
        let message = 'Failed to load courses. Please try again.';
        if (error.response?.status === 401) {
          message = 'Session expired or invalid token. Please log in again.';
          setNotification({ message, type: 'error' });
          setTimeout(() => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/');
          }, 2000);
        } else if (error.response?.data?.message) {
          message = error.response.data.message;
        }
        setNotification({ message, type: 'error' });
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [navigate]);

  const handlePlay = (courseId) => {
    navigate(`/course-player/${courseId}`);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const displayedCourses = courses.slice(0, 3);

  return (
    <div className="w-full">
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: '', type: '' })}
      />
      <div className="flex justify-between items-start mb-6">
        <h3
          className={`text-xl font-semibold ${
            theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
          }`}
        >
          Our Courses
        </h3>
      </div>

      {loading ? (
        <div className={`flex justify-center items-center h-64 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>
          <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${
            theme === 'dark' ? 'border-blue-400' : 'border-blue-500'
          }`}></div>
        </div>
      ) : courses.length === 0 ? (
        <p
          className={`text-sm text-center ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          No enrolled courses found.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedCourses.map((item) => (
              <div
                key={item._id}
                className={`p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow relative cursor-pointer ${
                  theme === 'dark' ? 'bg-gray-900' : 'bg-white'
                }`}
                onClick={() => navigate(`/course-player/${item.course._id}`)}
                aria-label={`View course ${item.course.title}`}
              >
                <div className={`relative h-48 rounded-lg overflow-hidden flex items-center justify-center ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  {item.course.thumbnail ? (
                    <img
                      src={item.course.thumbnail}
                      alt={item.course.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error(`Failed to load thumbnail for ${item.course.title}: ${item.course.thumbnail}`);
                        e.target.src = 'https://via.placeholder.com/300x200?text=No+Thumbnail';
                      }}
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full">
                      {item.course.title.includes("C++") && (
                        <img
                          src="https://via.placeholder.com/300x200?text=C++"
                          alt="C++ Thumbnail"
                          className="w-full h-full object-contain"
                        />
                      )}
                      {item.course.title.includes("Python") && (
                        <img
                          src="https://via.placeholder.com/300x200?text=Python"
                          alt="Python Thumbnail"
                          className="w-full h-full object-contain"
                        />
                      )}
                      {item.course.title.includes("MERN") && (
                        <img
                          src="https://via.placeholder.com/300x200?text=MERN"
                          alt="MERN Thumbnail"
                          className="w-full h-full object-contain"
                        />
                      )}
                      {!item.course.title.includes("C++") && !item.course.title.includes("Python") && !item.course.title.includes("MERN") && (
                        <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                          No thumbnail
                        </span>
                      )}
                    </div>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlay(item.course._id);
                    }}
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white p-2 rounded-full shadow-lg hover:scale-110 z-10 ${
                      theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                    title="Play Course"
                    aria-label={`Play course ${item.course.title}`}
                  >
                    <FaPlay className="text-sm" />
                  </button>
                </div>
                <div className="p-3">
                  <h3
                    className={`text-md font-medium mb-1 truncate ${
                      theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                    }`}
                  >
                    {item.course.title}
                  </h3>
                  <p
                    className={`text-sm mb-2 line-clamp-2 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    {item.course.description || "Learn about this course"}
                  </p>
                  <div
                    className={`flex justify-between items-center text-sm ${
                      theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                    }`}
                  >
                    {item.course.discountPrice && item.course.price ? (
                      <>
                        <span className="font-bold">₹{item.course.price - item.course.discountPrice}</span>
                        <span
                          className={`line-through ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                          }`}
                        >
                          ₹{item.course.price}
                        </span>
                      </>
                    ) : (
                      <span className="font-bold">{item.course.price ? `₹${item.course.price}` : 'Price unavailable'}</span>
                    )}
                  </div>
                  <div className="flex items-center mt-2">
                    <img
                      src={item.course.instructor?.avatar || "https://via.placeholder.com/24"}
                      alt={item.course.instructor?.firstName || "Instructor"}
                      className="w-6 h-6 rounded-full mr-2"
                    />
                    <span
                      className={`text-sm mr-2 truncate ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      {item.course.instructor?.firstName || 'Unknown'} {item.course.instructor?.lastName || ''}
                    </span>
                    <span className="text-yellow-500">⭐ {item.course.rating || 'N/A'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {courses.length > 3 && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={openModal}
                className={`px-8 py-3 rounded-full font-semibold text-lg text-white shadow-lg transition-colors duration-300 ${
                  theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                View All Courses
              </button>
            </div>
          )}
          <CourseCards courses={courses} />

          {isModalOpen && (
            <div
              className={`fixed inset-0 flex items-center justify-center z-50 ${
                theme === 'dark' ? 'bg-gray-900 bg-opacity-70' : 'bg-black bg-opacity-50'
              }`}
            >
              <div
                className={`p-6 rounded-lg shadow-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto ${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                }`}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3
                    className={`text-lg font-semibold ${
                      theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                    }`}
                  >
                    All Enrolled Courses
                  </h3>
                  <button
                    onClick={closeModal}
                    className={`${
                      theme === 'dark' ? 'text-gray-300 hover:text-gray-100' : 'text-gray-600 hover:text-gray-800'
                    }`}
                    aria-label="Close modal"
                  >
                    ✕
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((item) => (
                    <div
                      key={item._id}
                      className={`p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow relative cursor-pointer ${
                        theme === 'dark' ? 'bg-gray-900' : 'bg-white'
                      }`}
                      onClick={() => {
                        navigate(`/course-player/${item.course._id}`);
                        closeModal();
                      }}
                      aria-label={`View course ${item.course.title}`}
                    >
                      <div className={`relative h-48 rounded-lg overflow-hidden flex items-center justify-center ${
                        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                      }`}>
                        {item.course.thumbnail ? (
                          <img
                            src={item.course.thumbnail}
                            alt={item.course.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/300x200?text=No+Thumbnail';
                            }}
                          />
                        ) : (
                          <div className="flex items-center justify-center w-full h-full">
                            {item.course.title.includes("C++") && (
                              <img
                                src="https://via.placeholder.com/300x200?text=C++"
                                alt="C++ Thumbnail"
                                className="w-full h-full object-contain"
                              />
                            )}
                            {item.course.title.includes("Python") && (
                              <img
                                src="https://via.placeholder.com/300x200?text=Python"
                                alt="Python Thumbnail"
                                className="w-full h-full object-contain"
                              />
                            )}
                            {item.course.title.includes("MERN") && (
                              <img
                                src="https://via.placeholder.com/300x200?text=MERN"
                                alt="MERN Thumbnail"
                                className="w-full h-full object-contain"
                              />
                            )}
                            {!item.course.title.includes("C++") && !item.course.title.includes("Python") && !item.course.title.includes("MERN") && (
                              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                                No thumbnail
                              </span>
                            )}
                          </div>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePlay(item.course._id);
                            closeModal();
                          }}
                          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white p-2 rounded-full shadow-lg hover:scale-110 z-10 ${
                            theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
                          }`}
                          title="Play Course"
                          aria-label={`Play course ${item.course.title}`}
                        >
                          <FaPlay className="text-sm" />
                        </button>
                      </div>
                      <div className="p-3">
                        <h3
                          className={`text-md font-medium mb-1 truncate ${
                            theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                          }`}
                        >
                          {item.course.title}
                        </h3>
                        <p
                          className={`text-sm mb-2 line-clamp-2 ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                          }`}
                        >
                          {item.course.description || "Learn about this course"}
                        </p>
                        <div
                          className={`flex justify-between items-center text-sm ${
                            theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                          }`}
                        >
                          {item.course.discountPrice && item.course.price ? (
                            <>
                              <span className="font-bold">₹{item.course.price - item.course.discountPrice}</span>
                              <span
                                className={`line-through ${
                                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                                }`}
                              >
                                ₹{item.course.price}
                              </span>
                            </>
                          ) : (
                            <span className="font-bold">{item.course.price ? `₹${item.course.price}` : 'Price unavailable'}</span>
                          )}
                        </div>
                        <div className="flex items-center mt-2">
                          <img
                            src={item.course.instructor?.avatar || "https://via.placeholder.com/24"}
                            alt={item.course.instructor?.firstName || "Instructor"}
                            className="w-6 h-6 rounded-full mr-2"
                          />
                          <span
                            className={`text-sm mr-2 truncate ${
                              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                            }`}
                          >
                            {item.course.instructor?.firstName || 'Unknown'} {item.course.instructor?.lastName || ''}
                          </span>
                          <span className="text-yellow-500">⭐ {item.course.rating || 'N/A'}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

const Dashboard = () => {
  const [student, setStudent] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => setNotification({ message: '', type: '' }), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification.message]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');

        const res = await axios.get('https://lms-backend-flwq.onrender.com/api/v1/students/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setStudent(res.data.data);
      } catch (err) {
        console.error('Error fetching profile:', err);
        console.log("response",res.response);

        let message = 'Unable to retrieve profile data. Please try again later.';
        if (err.response?.status === 401) {
          message = 'Session expired or invalid token. Please log in again.';
          setNotification({ message, type: 'error' });
          setTimeout(() => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/');
          }, 2000);
        } else if (err.response?.data?.message) {
          message = err.response.data.message;
        }
        setNotification({ message, type: 'error' });
      }
    };

    fetchProfile();
  }, [navigate]);

  return (
    <div
      className={`p-4 sm:p-6 w-full min-h-screen ${
        theme === 'dark'
          ? 'bg-gradient-to-r from-gray-800 to-gray-900'
          : 'bg-gradient-to-r from-gray-100 to-gray-200'
      }`}
    >
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: '', type: '' })}
      />
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <div className="max-w-full sm:max-w-[70%] mb-4 sm:mb-0">
          <h1 className={`font-bold text-xl sm:text-2xl ${
            theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
          }`}>
            Hey {student?.firstName || 'User'}.
          </h1>
          <p
            className={`text-sm sm:text-base ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            } mt-2`}
          >
            Welcome back! We’re here to support you on your learning journey. Dive into your classes and keep progressing towards your goals
          </p>
        </div>
        <div className="w-24 sm:w-32 md:w-40 lg:w-48">
          <img
            src={dashboardImage}
            alt="Illustration"
            className={`w-full h-auto ${
              theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
            } border-2 rounded-md`}
          />
        </div>
      </div>
      <MyCourses />
    </div>
  );
};

export default Dashboard;