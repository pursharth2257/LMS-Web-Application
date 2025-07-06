import React, { useState, useEffect, useRef, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronDown, HelpCircle, Star, Bell, Video } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import arrowLeft from '../assets/image (1).png';
import { ThemeContext } from '../pages/Profiledashboard/ThemeContext';

export default function CoursePlayer() {
  const context = useContext(ThemeContext);
  const theme = context ? context.theme : 'light';
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [modules, setModules] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [courseTitle, setCourseTitle] = useState('Course Player');
  const [instructorName, setInstructorName] = useState('Unknown Instructor');
  const [courses, setCourses] = useState([]);
  const [activeLecture, setActiveLecture] = useState({ moduleIndex: null, lessonIndex: null });
  const [assessments, setAssessments] = useState([]);
  const [isAssessmentsModalOpen, setIsAssessmentsModalOpen] = useState(false);
  const [isHelpSidebarOpen, setIsHelpSidebarOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isLiveClassesOpen, setIsLiveClassesOpen] = useState(false);
  const [liveClasses, setLiveClasses] = useState([]);
  const [liveClassesError, setLiveClassesError] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [notificationsError, setNotificationsError] = useState('');
  const [assessmentsError, setAssessmentsError] = useState('');
  const [contentError, setContentError] = useState('');
  const [form, setForm] = useState({
    name: '',
    subject: '',
    message: '',
    category: 'course',
    relatedCourse: courseId || '',
  });
  const [feedback, setFeedback] = useState({
    rating: 0,
    comment: '',
  });
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [feedbackSuccess, setFeedbackSuccess] = useState('');
  const [feedbackError, setFeedbackError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [contactCourses, setContactCourses] = useState([]);
  const notificationsPopupRef = useRef(null);
  const liveClassesPopupRef = useRef(null);

  useEffect(() => {
    console.log('CoursePlayer: Context:', context);
    console.log('CoursePlayer: Current theme:', theme);
    console.log('CoursePlayer: Document classes:', document.documentElement.classList.toString());
  }, [theme, context]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('Token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        console.log('Fetching data for courseId:', courseId); // Debug courseId
        console.log('Using token:', token); // Debug token

        const [contentRes, enrollmentRes, coursesRes, assessmentsRes, profileRes, notificationsRes, liveClassesRes] = await Promise.all([
          axios.get(`https://lms-backend-flwq.onrender.com/api/v1/courses/${courseId}/content`, {
            headers: { Authorization: `Bearer ${token}` },
          }).catch((err) => ({ data: { success: false }, error: err })),
          axios.get('https://lms-backend-flwq.onrender.com/api/v1/students/courses', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('https://lms-backend-flwq.onrender.com/api/v1/courses', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`https://lms-backend-flwq.onrender.com/api/v1/students/courses/${courseId}/assessments`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('https://lms-backend-flwq.onrender.com/api/v1/students/profile', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`https://new-lms-backend-vmgr.onrender.com/api/v1/notifications/course/${courseId}?page=1&limit=10&isRead=false`, {
            headers: { Authorization: `Bearer ${token}` },
          }).catch((err) => ({ data: { success: false }, error: err })),
          axios.get(`https://new-lms-backend-vmgr.onrender.com/api/v1/live-classes/course/${courseId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }).catch((err) => {
            console.error('Live Classes API Error:', err.response?.data || err.message);
            return { data: { success: false }, error: err };
          }),
        ]);

        if (profileRes.data.data) {
          const { firstName, lastName } = profileRes.data.data;
          setForm((prev) => ({ ...prev, name: `${firstName} ${lastName}` }));
        }

        if (enrollmentRes.data.success) {
          const enrolledCourses = enrollmentRes.data.data || [];
          const course = enrolledCourses.find(
            (enrollment) => enrollment.course && String(enrollment.course._id) === String(courseId)
          );
          if (course?.course) {
            setCourseTitle(course.course.title);
            setInstructorName(`${course.course.instructor.firstName} ${course.course.instructor.lastName}`);
          } else {
            setCourseTitle('Course Not Found');
            setInstructorName('Unknown Instructor');
          }

          setContactCourses(
            enrolledCourses
              .filter((enrollment) => enrollment.course && enrollment.course._id)
              .map((enrollment) => ({
                _id: enrollment.course._id,
                title: enrollment.course.title,
              }))
          );
        }

        if (contentRes.data.success && Array.isArray(contentRes.data.data)) {
          const formattedModules = contentRes.data.data.map((section) => ({
            title: section.sectionTitle || 'Untitled Section',
            lessons: (section.lectures || []).map((lecture, index) => ({
              title: lecture.title || `Lesson ${index + 1}`,
              time: lecture.duration
                ? `${Math.floor(lecture.duration / 60)}:${(lecture.duration % 60).toString().padStart(2, '0')}`
                : '0:00',
              content: lecture.content || {},
              isPreview: lecture.isPreview || false,
            })),
            active: false,
          }));
          setModules(formattedModules);

          if (formattedModules.length > 0 && formattedModules[0].lessons.length > 0) {
            const firstLecture = formattedModules[0].lessons[0];
            if (firstLecture.content?.url) {
              setSelectedVideo({
                title: firstLecture.content.title || firstLecture.title,
                description: firstLecture.content.description || 'No description available.',
                url: firstLecture.content.url,
              });
              setActiveLecture({ moduleIndex: 0, lessonIndex: 0 });
              setModules((prev) => [
                { ...prev[0], active: true },
                ...prev.slice(1),
              ]);
            } else {
              setContentError('No playable videos available for this course.');
            }
          } else {
            setContentError('No lessons available for this course.');
          }
        } else {
          setContentError('Failed to load course content.');
          console.error('Content API Error:', contentRes.error?.message || 'Unknown error');
        }

        if (coursesRes.data.success) {
          setCourses(coursesRes.data.data.filter((course) => String(course._id) !== String(courseId)));
        }

        if (assessmentsRes.data.success) {
          console.log('Assessments fetched:', assessmentsRes.data.data);
          setAssessments(assessmentsRes.data.data);
        } else {
          setAssessmentsError('No assessments found for this course.');
          console.error('Assessments API Error:', assessmentsRes.error?.message || 'Unknown error');
        }

        if (notificationsRes.data.success) {
          setNotifications(notificationsRes.data.data);
        } else {
          setNotificationsError('Failed to load notifications.');
          console.error('Notifications API Error:', notificationsRes.error?.message || 'Unknown error');
        }

        if (liveClassesRes.data.success) {
          console.log('Live Classes fetched:', liveClassesRes.data.data); // Debug live classes
          setLiveClasses(liveClassesRes.data.data);
        } else {
          const errorMessage = liveClassesRes.error?.response?.data?.message || liveClassesRes.error?.message || 'Failed to load live classes.';
          setLiveClassesError(errorMessage);
          console.error('Live Classes API Error:', liveClassesRes.error?.response?.data || liveClassesRes.error);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setErrorMsg(
          error.message === 'No authentication token found' || error.response?.status === 401
            ? 'Unauthorized access. Please log in again.'
            : 'Failed to load course data. Please try again later.'
        );
        if (error.response?.status === 401) {
          navigate('/login');
        }
      }
    };

    fetchData();
  }, [courseId, navigate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isNotificationsOpen && notificationsPopupRef.current && !notificationsPopupRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
      if (isLiveClassesOpen && liveClassesPopupRef.current && !liveClassesPopupRef.current.contains(event.target)) {
        setIsLiveClassesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isNotificationsOpen, isLiveClassesOpen]);

  const toggleModule = (index) => {
    setModules((prevModules) =>
      prevModules.map((mod, i) => ({
        ...mod,
        active: i === index ? !mod.active : mod.active,
      }))
    );
  };

  const toggleAssessmentsModal = () => {
    setIsAssessmentsModalOpen(!isAssessmentsModalOpen);
  };

  const toggleHelpSidebar = () => {
    setIsHelpSidebarOpen(!isHelpSidebarOpen);
  };

  const toggleFeedback = () => {
    setIsFeedbackOpen(!isFeedbackOpen);
  };

  const toggleNotificationsModal = () => {
    setIsNotificationsOpen((prev) => !prev);
  };

  const toggleLiveClassesModal = () => {
    setIsLiveClassesOpen((prev) => !prev);
  };

  const markAllNotificationsAsRead = async () => {
    try {
      const token = localStorage.getItem('Token');
      if (!token) {
        setNotificationsError('Authentication failed. Please log in again.');
        navigate('/login');
        return;
      }

      const response = await axios.put(
        'https://new-lms-backend-vmgr.onrender.com/api/v1/notifications/mark-all-read',
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setNotifications([]);
        setNotificationsError('');
        setIsNotificationsOpen(false);
      } else {
        setNotificationsError('Failed to mark all notifications as read.');
      }
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      setNotificationsError(error.message || 'Failed to mark all notifications as read.');
    }
  };

  const handleAttemptAssessment = (assessmentId) => {
    if (!courseId || !assessmentId) {
      console.error('Invalid courseId or assessmentId:', { courseId, assessmentId });
      setAssessmentsError('Cannot navigate to assessment. Invalid IDs.');
      return;
    }
    console.log('Navigating to:', `/courses/${courseId}/assessments/${assessmentId}`);
    navigate(`/courses/${courseId}/assessments/${assessmentId}`);
    setIsAssessmentsModalOpen(false);
  };

  const handleNotificationClick = (actionUrl) => {
    if (actionUrl) {
      window.location.href = actionUrl;
    }
    setIsNotificationsOpen(false);
  };

  const handleLiveClassClick = (joinUrl) => {
    if (joinUrl) {
      window.open(joinUrl, '_blank');
    }
    setIsLiveClassesOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setFeedback((prev) => ({ ...prev, [name]: value }));
  };

  const handleStarClick = (rating) => {
    setFeedback((prev) => ({ ...prev, rating }));
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    setFeedbackLoading(true);
    setFeedbackSuccess('');
    setFeedbackError('');

    try {
      const token = localStorage.getItem('Token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.post(
        `https://lms-backend-flwq.onrender.com/api/v1/courses/${courseId}/reviews`,
        {
          rating: feedback.rating,
          comment: feedback.comment,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setFeedbackSuccess('Feedback submitted successfully.');
        setFeedback({ rating: 0, comment: '' });
      } else {
        setFeedbackError('Failed to submit feedback. Server returned success: false.');
      }
    } catch (error) {
      setFeedbackError(
        error?.response?.data?.message ||
        'Failed to submit feedback due to a network or server error.'
      );
    } finally {
      setFeedbackLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const token = localStorage.getItem('Token');
      const response = await axios.post(
        'https://lms-backend-flwq.onrender.com/api/v1/students/support',
        {
          subject: form.subject,
          message: form.message,
          category: 'course',
          relatedCourse: form.relatedCourse || undefined,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setSuccessMsg('Support ticket submitted successfully.');
        setForm((prev) => ({
          ...prev,
          subject: '',
          message: '',
          category: 'course',
          relatedCourse: courseId || '',
        }));
      } else {
        setErrorMsg('Failed to submit the ticket. Server returned success: false.');
      }
    } catch (error) {
      setErrorMsg(
        error?.response?.data?.message ||
        'Failed to submit the ticket due to a network or server error.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`p-4 flex flex-col min-h-[calc(100vh-3.5rem)] w-full transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`flex flex-col sm:flex-row sm:items-center sm:justify-between px-3 py-2 rounded-xl shadow w-full gap-y-2 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <div className="flex items-center gap-3 min-w-[12rem] w-full sm:flex-1">
          <Link
            to="/courses"
            className={`p-1 w-[2.5rem] h-[2.5rem] rounded-full ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
            } flex-shrink-0`}
          >
            <img src={arrowLeft} alt="Back" className="w-full h-full rounded-md" />
          </Link>
          <div className="w-full flex-1">
            <h1
              className={`font-medium text-sm truncate ${
                theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
              }`}
            >
              Course: {courseTitle}
            </h1>
            <p
              className={`text-xs w-fit text-white ${
                theme === 'dark' ? 'bg-green-500' : 'bg-green-300'
              } px-2 py-1 rounded`}
            >
              {instructorName}
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-2 w-full sm:flex-row justify-end sm:gap-2">
          <div className="relative flex items-center">
            <button
              onClick={toggleLiveClassesModal}
              className={`bg-transparent px-4 py-2 rounded-md text-sm border border-[#49BBBD] transition flex items-center gap-1 flex-1 sm:flex-none justify-center sm:justify-start ${
                theme === 'dark'
                  ? 'text-gray-100 hover:bg-[#49BBBD] hover:text-white'
                  : 'text-gray-900 hover:bg-[#49BBBD] hover:text-white'
              }`}
            >
              <Video className="w-4 h-4" />
              Live Classes
              {liveClasses.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {liveClasses.length}
                </span>
              )}
            </button>
          </div>
          <div className="relative flex items-center">
            <button
              onClick={toggleNotificationsModal}
              className={`bg-transparent px-4 py-2 rounded-md text-sm border border-[#49BBBD] transition flex items-center gap-1 flex-1 sm:flex-none justify-center sm:justify-start ${
                theme === 'dark'
                  ? 'text-gray-100 hover:bg-[#49BBBD] hover:text-white'
                  : 'text-gray-900 hover:bg-[#49BBBD] hover:text-white'
              }`}
            >
              <Bell className="w-4 h-4" />
              Notifications
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>
          </div>
          <button
            onClick={toggleAssessmentsModal}
            className={`px-4 py-2 rounded-md text-sm text-white transition flex-1 sm:flex-none ${
              theme === 'dark' ? 'bg-[#49BBBD] hover:bg-[#3AA8AA]' : 'bg-[#49BBBD] hover:bg-[#3AA8AA]'
            }`}
          >
            Assessments
          </button>
          <button
            onClick={toggleHelpSidebar}
            className={`bg-transparent px-4 py-2 rounded-md text-sm border border-[#49BBBD] transition flex items-center gap-1 flex-1 sm:flex-none justify-center sm:justify-start ${
              theme === 'dark'
                ? 'text-gray-100 hover:bg-[#49BBBD] hover:text-white'
                : 'text-gray-900 hover:bg-[#49BBBD] hover:text-white'
              }`}
          >
            <HelpCircle className="w-4 h-4" />
            Help
          </button>
        </div>
      </motion.div>

      {contentError && (
        <div
          className={`p-2 rounded-md mt-2 text-sm text-center ${
            theme === 'dark' ? 'bg-red-900 text-gray-100' : 'bg-red-100 text-gray-900'
          }`}
        >
          {contentError}
        </div>
      )}

      <AnimatePresence>
        {isLiveClassesOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`fixed inset-0 bg-black flex items-center justify-center z-50 p-4 ${
              theme === 'dark' ? 'bg-opacity-75' : 'bg-opacity-50'
            }`}
          >
            <div
              ref={liveClassesPopupRef}
              className={`rounded-lg p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <h2
                  className={`text-xl font-semibold ${
                    theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                  }`}
                >
                  Live Classes
                </h2>
                <button
                  onClick={toggleLiveClassesModal}
                  className={`hover:${
                    theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                  } ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {liveClassesError ? (
                <p
                  className={`text-sm ${
                    theme === 'dark' ? 'text-red-400' : 'text-red-500'
                  }`}
                >
                  {liveClassesError}
                </p>
              ) : liveClasses.length === 0 ? (
                <p
                  className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  No live classes available.
                </p>
              ) : (
                <div className="space-y-4">
                  {liveClasses.map((liveClass) => (
                    <div
                      key={liveClass._id}
                      className={`border rounded-lg p-3 flex justify-between items-center cursor-pointer hover:${
                        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                      } ${
                        theme === 'dark'
                          ? 'bg-gray-800 border-gray-700'
                          : 'bg-white border-gray-200'
                      }`}
                      onClick={() => handleLiveClassClick(liveClass.joinUrl)}
                    >
                      <div>
                        <h3
                          className={`text-base font-semibold ${
                            theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                          }`}
                        >
                          {liveClass.title}
                        </h3>
                        <p
                          className={`text-sm ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                          }`}
                        >
                          {liveClass.description}
                        </p>
                        <p
                          className={`text-xs ${
                            theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                          }`}
                        >
                          {new Date(liveClass.startTime).toLocaleString()} ({liveClass.duration} min)
                        </p>
                        <p
                          className={`text-xs ${
                            theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                          }`}
                        >
                          Instructor: {liveClass.instructor.firstName} {liveClass.instructor.lastName}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isNotificationsOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`fixed inset-0 bg-black flex items-center justify-center z-50 p-4 ${
              theme === 'dark' ? 'bg-opacity-75' : 'bg-opacity-50'
            }`}
          >
            <div
              ref={notificationsPopupRef}
              className={`rounded-lg p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <h2
                  className={`text-xl font-semibold ${
                    theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                  }`}
                >
                  Notifications
                </h2>
                <div className="flex items-center gap-2">
                  {notifications.length > 0 && (
                    <button
                      onClick={markAllNotificationsAsRead}
                      className={`text-sm hover:underline ${
                        theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                      }`}
                      aria-label="Mark all notifications as read"
                    >
                      Mark All Read
                    </button>
                  )}
                  <button
                    onClick={toggleNotificationsModal}
                    className={`hover:${
                      theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                    } ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              {notificationsError ? (
                <p
                  className={`text-sm ${
                    theme === 'dark' ? 'text-red-400' : 'text-red-500'
                  }`}
                >
                  {notificationsError}
                </p>
              ) : notifications.length === 0 ? (
                <p
                  className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  No new notifications.
                </p>
              ) : (
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div
                      key={notification._id}
                      className={`border rounded-lg p-3 flex justify-between items-center cursor-pointer hover:${
                        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                      } ${
                        theme === 'dark'
                          ? 'bg-gray-800 border-gray-700'
                          : 'bg-white border-gray-200'
                      }`}
                      onClick={() => handleNotificationClick(notification.actionUrl)}
                    >
                      <div>
                        <h3
                          className={`text-base font-semibold ${
                            theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                          }`}
                        >
                          {notification.title}
                        </h3>
                        <p
                          className={`text-sm ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                          }`}
                        >
                          {notification.message}
                        </p>
                        <p
                          className={`text-xs ${
                            theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                          }`}
                        >
                          {new Date(notification.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isAssessmentsModalOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`fixed inset-0 bg-black flex items-center justify-center z-50 p-4 ${
              theme === 'dark' ? 'bg-opacity-75' : 'bg-opacity-50'
            }`}
          >
            <div
              className={`rounded-lg p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <h2
                  className={`text-xl font-semibold ${
                    theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                  }`}
                >
                  Course Assessments
                </h2>
                <button
                  onClick={toggleAssessmentsModal}
                  className={`hover:${
                    theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                  } ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {assessmentsError ? (
                <p
                  className={`text-sm ${
                    theme === 'dark' ? 'text-red-400' : 'text-red-500'
                  }`}
                >
                  {assessmentsError}
                </p>
              ) : assessments.length === 0 ? (
                <p
                  className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  No assessments available.
                </p>
              ) : (
                <div className="space-y-4">
                  {assessments.map((assessment) => (
                    <div
                      key={assessment._id}
                      className={`border rounded-lg p-3 flex justify-between items-center ${
                        theme === 'dark'
                          ? 'bg-gray-800 border-gray-700'
                          : 'bg-white border-gray-200'
                      }`}
                    >
                      <div>
                        <h3
                          className={`text-base font-semibold ${
                            theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                          }`}
                        >
                          {assessment.title || 'Untitled Assessment'}
                        </h3>
                        <p
                          className={`text-sm ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                          }`}
                        >
                          {assessment.description || 'No description available.'}
                        </p>
                      </div>
                      <button
                        onClick={() => handleAttemptAssessment(assessment._id)}
                        className={`px-3 py-1 rounded-md text-sm text-white transition ${
                          theme === 'dark'
                            ? 'bg-green-600 hover:bg-green-700'
                            : 'bg-green-500 hover:bg-green-600'
                        }`}
                        disabled={!assessment._id}
                      >
                        Attempt
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isHelpSidebarOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className={`fixed inset-y-0 right-0 w-full sm:w-96 shadow-xl z-50 overflow-y-auto ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <div
              className={`flex justify-between items-center p-4 border-b ${
                theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
              }`}
            >
              <h2
                className={`text-xl sm:text-2xl font-semibold ${
                  theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                }`}
              >
                Contact Support
              </h2>
              <button
                onClick={toggleHelpSidebar}
                className={`hover:${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                } ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="p-4 sm:p-6"
            >
              {successMsg && (
                <p
                  className={`text-sm sm:text-base mb-4 sm:mb-6 text-center ${
                    theme === 'dark' ? 'text-green-400' : 'text-green-600'
                  }`}
                >
                  {successMsg}
                </p>
              )}
              {errorMsg && (
                <p
                  className={`text-sm sm:text-base mb-4 sm:mb-6 text-center ${
                    theme === 'dark' ? 'text-red-400' : 'text-red-600'
                  }`}
                >
                  {errorMsg}
                </p>
              )}
              <div className="space-y-4 sm:space-y-5">
                <div>
                  <label
                    className={`block mb-1 text-sm sm:text-base font-medium ${
                      theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                    }`}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    disabled
                    className={`w-full border rounded-lg p-2 sm:p-3 cursor-not-allowed text-sm sm:text-base focus:ring-0 ${
                      theme === 'dark'
                        ? 'border-gray-600 bg-gray-700 text-gray-300'
                        : 'border-gray-300 bg-gray-100 text-gray-600'
                    }`}
                  />
                </div>
                <div>
                  <label
                    className={`block mb-1 text-sm sm:text-base font-medium ${
                      theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                    }`}
                  >
                    Related Course
                  </label>
                  <select
                    name="relatedCourse"
                    value={form.relatedCourse}
                    onChange={handleChange}
                    className={`w-full border rounded-lg p-2 sm:p-3 text-sm sm:text-base focus:ring-2 focus:border-blue-500 ${
                      theme === 'dark'
                        ? 'border-gray-600 bg-gray-800 text-gray-100 focus:ring-blue-400'
                        : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500'
                    }`}
                  >
                    <option value="">Select a course (optional)</option>
                    {contactCourses.map((course) => (
                      <option key={course._id} value={course._id}>
                        {course.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    className={`block mb-1 text-sm sm:text-base font-medium ${
                      theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                    }`}
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className={`w-full border rounded-lg p-2 sm:p-3 text-sm sm:text-base focus:ring-2 focus:border-blue-500 ${
                      theme === 'dark'
                        ? 'border-gray-600 bg-gray-800 text-gray-100 focus:ring-blue-400'
                        : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500'
                    }`}
                    required
                  />
                </div>
                <div>
                  <label
                    className={`block mb-1 text-sm sm:text-base font-medium ${
                      theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                    }`}
                  >
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    className={`w-full border rounded-lg p-2 sm:p-3 text-sm sm:text-base focus:ring-2 focus:border-blue-500 resize-y ${
                      theme === 'dark'
                        ? 'border-gray-600 bg-gray-800 text-gray-100 focus:ring-blue-400'
                        : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500'
                    }`}
                    rows={4}
                    required
                  />
                </div>
                <div>
                  <label
                    className={`block mb-1 text-sm sm:text-base font-medium ${
                      theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                    }`}
                  >
                    Category
                  </label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className={`w-full border rounded-lg p-2 sm:p-3 text-sm sm:text-base focus:ring-2 focus:border-blue-500 ${
                      theme === 'dark'
                        ? 'border-gray-600 bg-gray-800 text-gray-100 focus:ring-blue-400'
                        : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500'
                    }`}
                    disabled
                  >
                    <option value="course">Course</option>
                  </select>
                </div>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className={`w-full py-2 sm:py-3 px-4 rounded-lg text-sm sm:text-base font-medium text-white transition duration-200 ${
                    theme === 'dark'
                      ? 'bg-[#49BBBD] hover:bg-[#3AA8AA] disabled:bg-blue-300'
                      : 'bg-[#49BBBD] hover:bg-[#3AA8AA] disabled:bg-blue-300'
                  } disabled:cursor-not-allowed`}
                >
                  {loading ? 'Submitting...' : 'Submit Ticket'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 mt-2 w-full max-w-7xl mx-auto flex-1">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2 flex flex-col gap-4"
        >
          <div
            className={`rounded-lg overflow-hidden shadow p-3 flex flex-col ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            {selectedVideo?.url ? (
              <video
                src={selectedVideo.url}
                controls
                controlsList="nodownload"
                className="rounded-lg object-cover w-full max-h-[500px]"
              />
            ) : (
              <div
                className={`rounded-lg w-full h-[400px] flex items-center justify-center ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                }`}
              >
                <p
                  className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  Select a lesson to play the video.
                </p>
              </div>
            )}
            {selectedVideo && (
              <div className="mt-4">
                <h2
                  className={`text-lg font-semibold mb-1 ${
                    theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                  }`}
                >
                  {selectedVideo.title || 'Untitled Video'}
                </h2>
                <p
                  className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  {selectedVideo.description || 'No description available.'}
                </p>
              </div>
            )}
          </div>
          <div
            className={`rounded-lg shadow p-3 flex flex-col ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <div
              className="flex justify-between items-center cursor-pointer lg:cursor-default"
              onClick={() => {
                if (window.innerWidth < 1024) toggleFeedback();
              }}
            >
              <h2
                className={`text-lg font-semibold ${
                  theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                }`}
              >
                Leave Feedback
              </h2>
              <ChevronDown
                className={`w-5 h-5 lg:hidden transform transition-transform ${
                  isFeedbackOpen ? 'rotate-180' : ''
                }`}
              />
            </div>

            <AnimatePresence>
              {(isFeedbackOpen || (typeof window !== 'undefined' && window.innerWidth >= 1024)) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  {feedbackSuccess && (
                    <p
                      className={`text-sm mt-3 mb-3 text-center ${
                        theme === 'dark' ? 'text-green-400' : 'text-green-600'
                      }`}
                    >
                      {feedbackSuccess}
                    </p>
                  )}
                  {feedbackError && (
                    <p
                      className={`text-sm mt-3 mb-3 text-center ${
                        theme === 'dark' ? 'text-red-400' : 'text-red-600'
                      }`}
                    >
                      {feedbackError}
                    </p>
                  )}

                  <div className="flex items-center mb-3">
                    <label
                      className={`text-sm font-medium mr-3 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      Rating:
                    </label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 cursor-pointer ${
                            feedback.rating >= star
                              ? 'text-yellow-400 fill-yellow-400'
                              : theme === 'dark'
                              ? 'text-gray-500'
                              : 'text-gray-300'
                          }`}
                          onClick={() => handleStarClick(star)}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="mb-3">
                    <label
                      className={`block mb-1 text-sm font-medium ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      Comment
                    </label>
                    <textarea
                      name="comment"
                      value={feedback.comment}
                      onChange={handleFeedbackChange}
                      className={`w-full border rounded-lg p-2 text-sm focus:ring-2 focus:border-blue-500 resize-y ${
                        theme === 'dark'
                          ? 'border-gray-600 bg-gray-800 text-gray-100 focus:ring-blue-400'
                          : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500'
                      }`}
                      rows={3}
                      placeholder="Share your thoughts about the course..."
                    />
                  </div>

                  <button
                    onClick={handleFeedbackSubmit}
                    disabled={feedbackLoading || feedback.rating === 0}
                    className={`py-2 px-4 rounded-lg text-sm font-medium text-white transition duration-200 ${
                      theme === 'dark'
                        ? 'bg-[#49BBBD] hover:bg-[#3AA8AA] disabled:bg-blue-300'
                        : 'bg-[#49BBBD] hover:bg-[#3AA8AA] disabled:bg-blue-300'
                    } disabled:cursor-not-allowed`}
                  >
                    {feedbackLoading ? 'Submitting...' : 'Submit Feedback'}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-1 flex flex-col"
        >
          <div
            className={`p-3 rounded-lg shadow h-fit flex flex-col overflow-hidden ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <div>
              <h2
                className={`font-bold text-base ${
                  theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                }`}
              >
                {instructorName}
              </h2>
              <p
                className={`text-xs ${
                  theme === 'dark' ? 'text-green-400' : 'text-green-600'
                }`}
              >
                {modules.length} Modules
              </p>
            </div>
            <div className="flex-1 overflow-y-auto mt-3 pr-2" style={{ maxHeight: 'calc(100vh - 230px)' }}>
              {modules.map((mod, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={i !== modules.length - 1 ? 'mb-3' : ''}
                >
                  <div
                    className={`border rounded-lg p-2 ${
                      theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                    }`}
                  >
                    <div
                      className={`flex justify-between font-semibold items-center cursor-pointer ${
                        theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                      } ${mod.active ? 'text-black' : ''}`}
                      onClick={() => toggleModule(i)}
                    >
                      <span className="truncate text-sm">{mod.title}</span>
                      {mod.active ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <span className="text-xs">{mod.lessons.length} Lessons</span>
                      )}
                    </div>
                    {mod.active && (
                      <div className="mt-1 space-y-1 text-sm">
                        {mod.lessons.map((lesson, idx) => (
                          <div
                            key={idx}
                            className={`flex justify-between items-center p-1 cursor-pointer text-[#00c8a0] hover:${
                              theme === 'dark' ? 'bg-gray-600' : 'bg-gray-100'
                            } ${
                              activeLecture.moduleIndex === i && activeLecture.lessonIndex === idx
                                ? theme === 'dark'
                                  ? 'bg-green-900'
                                  : 'bg-green-50'
                                : theme === 'dark'
                                ? 'bg-gray-700'
                                : 'bg-gray-50'
                            }`}
                            onClick={() => {
                              if (lesson.content?.url) {
                                setSelectedVideo({
                                  title: lesson.content.title || lesson.title,
                                  description: lesson.content.description || 'No description available.',
                                  url: lesson.content.url,
                                });
                                setActiveLecture({ moduleIndex: i, lessonIndex: idx });
                              }
                            }}
                          >
                            <span
                              className={`${
                                theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                              }`}
                            >
                              {lesson.title || `Lesson ${idx + 1}`}
                            </span>
                            <span
                              className={`text-[10px] ${
                                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                              }`}
                            >
                              {lesson.time || '0:00'}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
            <div
              className={`p-3 rounded-lg border shadow mt-3 ${
                theme === 'dark'
                  ? 'border-gray-700 bg-gray-800'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <h2
                className={`font-bold text-base mb-2 ${
                  theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                }`}
              >
                Explore more
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {courses.map((course, idx) => (
                  <Link
                    to={`/courses/${course._id}`}
                    key={idx}
                    className={`p-1 rounded-lg border shadow hover:shadow-md transition-shadow ${
                      theme === 'dark'
                        ? 'border-gray-700 bg-gray-800'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <img
                      src={course.thumbnail}
                      className="rounded-lg mb-1 h-24 object-cover w-full"
                      alt={course.title}
                    />
                    <p
                      className={`text-xs font-semibold truncate ${
                        theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                      }`}
                    >
                      {course.title}
                    </p>
                    <p
                      className={`text-xs ${
                        theme === 'dark' ? 'text-green-400' : 'text-green-600'
                      }`}
                    >
                      ₹{course.discountPrice || course.price}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}