import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import DefaultImageCourse from '../../assets/DefaultImageCourse.webp'; 
const DEFAULT_AVATAR = 'https://res.cloudinary.com/dcgilmdbm/image/upload/v1747893719/default_avatar_xpw8jv.jpg';
import {
  FaStar,
  FaRegClock,
  FaUserGraduate,
  FaUsers,
  FaCheck,
  FaDownload,
  FaGlobe,
  FaCertificate,
  FaChevronDown,
  FaChevronUp,
  FaShare,
  FaLock,
  FaPlayCircle,
  FaQuestionCircle,
  FaCode,
  FaArrowLeft,
  FaShoppingCart
} from 'react-icons/fa';

// Modal Component for Success/Error Feedback
const Modal = ({ isOpen, message, type, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
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

// Hardcoded values to avoid process.env
const API_BASE_URL = 'https://new-lms-backend-vmgr.onrender.com/api/v1';
const REVIEWS_API_BASE_URL = 'https://lms-backend-flwq.onrender.com/api/v1';
const RAZORPAY_KEY_ID = 'rzp_test_wEHfns4O1eHdMO';

const ViewCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedModule, setExpandedModule] = useState(null);
  const [course, setCourse] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reviewsError, setReviewsError] = useState(null);
  const [enrollLoading, setEnrollLoading] = useState(false);
  const [enrollError, setEnrollError] = useState(null);
  const [enrollSuccess, setEnrollSuccess] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);

  // Load Razorpay script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Scroll to top when component mounts or when course ID changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  // Fetch course data and enrollment status from API
  useEffect(() => {
    const fetchCourse = async () => {
      if (!/^[0-9a-fA-F]{24}$/.test(id)) {
        setError('Invalid course ID format');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const token = localStorage.getItem('Token');
        console.log('Token:', token);
        console.log('Course ID:', id);
        if (!token) {
          setError('Please log in to view course details');
          setTimeout(() => navigate('/'), 2000);
          return;
        }
        const headers = { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        };

        // Fetch course details
        const response = await axios.get(`${API_BASE_URL}/courses/${id}`, { headers });
        console.log('Course details response:', response.data);

        if (response.data.success) {
          const courseData = response.data.data;
          const transformedCourse = {
            id: courseData._id,
            title: courseData.title,
            description: courseData.description,
            longDescription: courseData.longDescription || courseData.description,
            instructor: `${courseData.instructor.firstName} ${courseData.instructor.lastName}`,
            instructorBio: courseData.instructorBio || 'Experienced instructor with expertise in the field.',
            instructorAvatar: courseData.instructor.avatar || 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
            rating: courseData.rating,
            reviews: courseData.totalRatings,
            students: courseData.totalStudents,
            duration: `${courseData.duration} hours`,
            level: courseData.level.charAt(0).toUpperCase() + courseData.level.slice(1),
            category: courseData.category.toLowerCase(),
           price: courseData.discountPrice && courseData.price !== 0 
  ? `₹${courseData.price - courseData.discountPrice}` 
  : courseData.price === 0 
    ? 'Free' 
    : `₹${courseData.price}`,
originalPrice: courseData.discountPrice && courseData.price !== 0 
  ? `₹${courseData.price}` 
  : null,
            image: courseData.thumbnail,
            thumbnail: courseData.thumbnail || DefaultImageCourse,
            videoUrl: courseData.videoUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            language: courseData.language || 'English',
            subtitles: courseData.subtitles || ['English', 'Hindi'],
            lastUpdated: courseData.lastUpdated || 'December 2024',
            certificate: courseData.certificate !== undefined ? courseData.certificate : true,
            downloadable: courseData.downloadable !== undefined ? courseData.downloadable : true,
            lifetime: courseData.lifetime !== undefined ? courseData.lifetime : true,
            mobileAccess: courseData.mobileAccess !== undefined ? courseData.mobileAccess : true,
            modules: courseData.modules || [],
            learningOutcomes: courseData.learningOutcomes || [
              'Master key concepts and skills',
              'Apply knowledge to real-world projects',
              'Gain industry-relevant expertise'
            ],
            requirements: courseData.requirements || [
              'Basic computer skills',
              'Internet access',
              'Willingness to learn'
            ],
            features: courseData.features || [
              { icon: FaRegClock, text: `${courseData.duration} hours of on-demand video` },
              { icon: FaDownload, text: 'Downloadable resources' },
              { icon: FaGlobe, text: 'Access on mobile and desktop' },
              { icon: FaCertificate, text: 'Certificate of completion' },
              { icon: FaUsers, text: 'Access to student community' }
            ]
          };
          console.log('Thumbnail URL:', courseData.thumbnail);
          console.log('Course pricing:', {
            price: courseData.price,
            discountPrice: courseData.discountPrice,
            transformedPrice: transformedCourse.price,
            transformedOriginalPrice: transformedCourse.originalPrice
          });
          setCourse(transformedCourse);

          // Check enrollment status
          try {
            const enrollmentResponse = await axios.get(`${API_BASE_URL}/students/courses`, { headers });
            console.log('Enrollment response:', enrollmentResponse.data);
            console.log('Enrolled courses:', enrollmentResponse.data.data);
            if (enrollmentResponse.data.success) {
              const enrolledCourses = enrollmentResponse.data.data || enrollmentResponse.data.courses || [];
              const enrolled = enrolledCourses.some(course => {
                console.log('Checking course:', course);
                return (
                  course._id === id ||
                  course.courseId === id ||
                  course.id === id ||
                  (course.course && course.course._id === id) ||
                  (course.course && course.course.id === id)
                );
              });
              setIsEnrolled(enrolled);
              console.log('Is Enrolled:', enrolled);
            } else {
              console.warn('Enrollment check failed:', enrollmentResponse.data.message);
              setEnrollError('Failed to check enrollment status: ' + enrollmentResponse.data.message);
              setTimeout(() => setEnrollError(null), 3000);
            }
          } catch (enrollErr) {
            console.error('Enrollment check error:', enrollErr.response?.data || enrollErr);
            setEnrollError('Failed to check enrollment status');
            setTimeout(() => setEnrollError(null), 3000);
          }
        } else {
          throw new Error(response.data.message || 'Failed to fetch course details');
        }
      } catch (err) {
        console.error('Fetch Course Error:', err.response?.data || err);
        let errorMessage = err.response?.data?.message || 'Error fetching course details';
        if (err.response?.status === 401) {
          errorMessage = 'Session expired. Please log in again.';
          localStorage.removeItem('Token');
          localStorage.removeItem('user');
          setTimeout(() => navigate('/'), 2000);
        }
        setError(errorMessage);
        setEnrollError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id, navigate]);

  // Fetch reviews data when reviews tab is active
  useEffect(() => {
    if (activeTab === 'reviews') {
      const fetchReviews = async () => {
        try {
          setReviewsLoading(true);
          setReviewsError(null);
          const token = localStorage.getItem('Token');
          if (!token) {
            setReviewsError('Please log in to view reviews');
            return;
          }
          const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
          const response = await axios.get(`${REVIEWS_API_BASE_URL}/courses/${id}/reviews`, { headers });
          console.log('Reviews response:', response.data);
          if (response.data.success) {
            setReviews(response.data.data);
          } else {
            throw new Error(response.data.message || 'Failed to fetch reviews');
          }
        } catch (err) {
          console.error('Fetch Reviews Error:', err.response?.data || err);
          setReviewsError(err.response?.data?.message || 'Error fetching reviews');
        } finally {
          setReviewsLoading(false);
        }
      };
      fetchReviews();
    }
  }, [activeTab, id]);

  const toggleModule = (moduleId) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: course?.title || 'Course',
        text: course?.description || 'Check out this course!',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setEnrollSuccess('Course link copied to clipboard!');
      setTimeout(() => setEnrollSuccess(null), 3000);
    }
  };

  const handleEnrollNow = async () => {
    if (isEnrolled) {
      setEnrollSuccess('You are already enrolled in this course!');
      setTimeout(() => setEnrollSuccess(null), 3000);
      return;
    }

    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      setEnrollError('Invalid course ID format');
      return;
    }

    const token = localStorage.getItem('Token');
    if (!token) {
      setEnrollError('You must be logged in to enroll.');
      setTimeout(() => navigate('/'), 2000);
      return;
    }

    try {
      console.log('Checking enrollment before proceeding:', id);
      const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
      const enrollmentResponse = await axios.get(`${API_BASE_URL}/students/courses`, { headers });
      console.log('Pre-enrollment check response:', enrollmentResponse.data);
      console.log('Enrolled courses in pre-check:', enrollmentResponse.data.data);
      if (enrollmentResponse.data.success) {
        const enrolledCourses = enrollmentResponse.data.data || enrollmentResponse.data.courses || [];
        const enrolled = enrolledCourses.some(course => {
          console.log('Checking course in pre-check:', course);
          return (
            course._id === id ||
            course.courseId === id ||
            course.id === id ||
            (course.course && course.course._id === id) ||
            (course.course && course.course.id === id)
          );
        });
        if (enrolled) {
          setIsEnrolled(true);
          setEnrollSuccess('You are already enrolled in this course!');
          setTimeout(() => setEnrollSuccess(null), 3000);
          return;
        }
      } else {
        console.warn('Pre-enrollment check failed:', enrollmentResponse.data.message);
      }
    } catch (enrollErr) {
      console.error('Pre-enrollment check error:', enrollErr.response?.data || enrollErr);
    }

    if (!RAZORPAY_KEY_ID) {
      setEnrollError('Razorpay Key ID is not configured');
      setEnrollLoading(false);
      return;
    }

    setEnrollLoading(true);
    setEnrollError(null);
    setEnrollSuccess(null);

    try {
      if (course.price === 'Free') {
        console.log('Enrolling in free course with ID:', id);
        const enrollResponse = await axios.post(
          `${API_BASE_URL}/students/courses`,
          { courseId: id, paymentId: null },
          { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
        );
        console.log('Enroll response:', enrollResponse.data);

        if (enrollResponse.data.success) {
          setEnrollSuccess('You have been enrolled successfully!');
          setIsEnrolled(true);
          setTimeout(() => navigate('/profile-dashboard'), 2000);
        } else {
          setEnrollError(enrollResponse.data.message || 'Enrollment failed');
        }
        setEnrollLoading(false);
        return;
      }

      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        setEnrollError('Failed to load Razorpay payment gateway');
        setEnrollLoading(false);
        return;
      }

      console.log('Creating order for course with ID:', id);
      const orderResponse = await axios.post(
        `${API_BASE_URL}/payments/create-order`,
        { courseId: id },
        { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
      );
      console.log('Order response:', orderResponse.data);

      if (!orderResponse.data.success) {
        console.error('Order creation failed:', orderResponse.data);
        if (orderResponse.data.message === 'Already enrolled in this course') {
          setIsEnrolled(true);
          setEnrollSuccess('You are already enrolled in this course!');
          setTimeout(() => setEnrollSuccess(null), 3000);
        } else {
          setEnrollError(orderResponse.data.message || 'Failed to create payment order');
        }
        setEnrollLoading(false);
        return;
      }

      const { orderId, amount, currency, paymentId } = orderResponse.data.data;
      console.log('Order created:', { orderId, amount, currency, paymentId });

      const options = {
        key: RAZORPAY_KEY_ID,
        amount,
        currency,
        name: 'LMS Platform',
        description: `Payment for course: ${course.title}`,
        order_id: orderId,
        handler: async function (response) {
          console.log('Razorpay payment response:', response);
          try {
            const verifyResponse = await axios.post(
              `${API_BASE_URL}/payments/verify`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                paymentId
              },
              { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
            );
            console.log('Verify response:', verifyResponse.data);

            if (!verifyResponse.data.success) {
              setEnrollError(verifyResponse.data.message || 'Payment verification failed');
              setEnrollLoading(false);
              return;
            }

            console.log('Enrolling with paymentId:', verifyResponse.data.data.paymentId);
            const enrollResponse = await axios.post(
              `${API_BASE_URL}/students/courses`,
              { courseId: id, paymentId: verifyResponse.data.data.paymentId },
              { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
            );
            console.log('Enroll response:', enrollResponse.data);

            if (enrollResponse.data.success) {
              setEnrollSuccess('You have been enrolled successfully!');
              setIsEnrolled(true);
              setTimeout(() => navigate('/profile-dashboard'), 2000);
            } else {
              setEnrollError(enrollResponse.data.message || 'Enrollment failed');
            }
          } catch (error) {
            console.error('Payment verification or enrollment error:', error.response?.data || error);
            const errorMessage =
              error.response?.data?.message ||
              error.message ||
              'An error occurred during payment verification or enrollment';
            setEnrollError(errorMessage);
          } finally {
            setEnrollLoading(false);
          }
        },
        prefill: {
          name: localStorage.getItem('user') || 'Student',
          email: localStorage.getItem('userEmail') || 'student@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#0D9488'
        },
        modal: {
          ondismiss: () => {
            console.log('Razorpay modal dismissed');
            setEnrollError('Payment was cancelled');
            setEnrollLoading(false);
          }
        }
      };

      console.log('Razorpay options:', options);
      const razorpay = new window.Razorpay(options);
      razorpay.on('payment.failed', function (response) {
        console.error('Razorpay payment failed:', response);
        setEnrollError(`Payment failed: ${response.error.description || 'Unknown error'}`);
        setEnrollLoading(false);
      });
      razorpay.open();
    } catch (error) {
      console.error('Enroll API error:', error.response?.data || error);
      const errorMessage =
        error.response?.data?.message || error.message || 'An error occurred during enrollment';
      if (errorMessage === 'Already enrolled in this course') {
        setIsEnrolled(true);
        setEnrollSuccess('You are already enrolled in this course!');
        setTimeout(() => setEnrollSuccess(null), 3000);
      } else {
        setEnrollError(errorMessage);
      }
      setEnrollLoading(false);
    }
  };

  // Validate thumbnail URL
  const isValidThumbnailUrl = (url) => {
    if (!url) return false;
    return /^https?:\/\/.*$/i.test(url);
  };

  const getLessonIcon = (type) => {
    switch (type) {
      case 'video':
        return <FaPlayCircle className="text-teal-600" />;
      case 'quiz':
        return <FaQuestionCircle className="text-blue-600" />;
      case 'project':
        return <FaCode className="text-purple-600" />;
      default:
        return <FaPlayCircle className="text-teal-600" />;
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const closeModal = () => {
    setEnrollSuccess(null);
    setEnrollError(null);
    setReviewsError(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-teal-600"></div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error || 'Course not found'}
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Modal
        isOpen={!!enrollSuccess || !!enrollError || !!reviewsError}
        message={enrollSuccess || enrollError || reviewsError}
        type={enrollSuccess ? 'success' : 'error'}
        onClose={closeModal}
      />
      {/* Course Header */}
      <section className="py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link to="/courses/all" className="flex items-center text-teal-600 hover:text-teal-700">
              <FaArrowLeft className="mr-2" />
              Back to All Courses
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Left Content */}
            <motion.div
              className="lg:col-span-2 space-y-6 lg:space-y-8"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              {/* Course Badge */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="bg-teal-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                  {course.category}
                </span>
                <span className="bg-yellow-500 text-gray-900 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold">
                  Bestseller
                </span>
                <span className="bg-green-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                  Updated {course.lastUpdated}
                </span>
              </div>

              {/* Course Title and Description */}
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">{course.title}</h1>
                <p className="text-lg sm:text-xl text-gray-400 mb-4 sm:mb-6">{course.description}</p>
                
                {/* Course Stats */}
                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span className="font-semibold mr-1">{course.rating}</span>
                    <span className="text-black">({course.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center text-black">
                    <FaUsers className="mr-1" />
                    <span>{course.students.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center text-black">
                    <FaRegClock className="mr-1" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center text-black">
                    <FaUserGraduate className="mr-1" />
                    <span>{course.level}</span>
                  </div>
                </div>

                {/* Instructor Info */}
                <div className="flex items-center mt-6">
                  <div>
                    <p className="text-sm text-black">Created by</p>
                    <p className="font-semibold">{course.instructor}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-4 mt-8">
                  <button
                    onClick={handleShare}
                    className="flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-teal-100 transition-all duration-300 hover:border-teal-500"
                  >
                    <FaShare className="mr-2" />
                    Share Course
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Right Content - Course Preview */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden sticky top-4">
                {/* Thumbnail Display */}
<div className="w-full h-60 relative">
  {course.thumbnail && isValidThumbnailUrl(course.thumbnail) ? (
    <img
      src={course.thumbnail}
      alt={course.title}
      className="w-full h-full object-cover"
      onError={(e) => {
        e.target.src = DefaultImageCourse;
        e.target.onerror = null;
        console.error('Thumbnail load error for URL:', course.thumbnail);
      }}
    />
  ) : (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      <img 
        src={DefaultImageCourse} 
        alt="Default course thumbnail" 
        className="w-full h-full object-cover"
      />
    </div>
  )}
</div>

                {/* Pricing and Enrollment */}
                <div className="p-5">
                  <div className="text-center mb-5">
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <span className="text-2xl font-bold text-gray-900">{course.price}</span>
                      {course.originalPrice && (
                        <span className="text-lg text-gray-500 line-through">{course.originalPrice}</span>
                      )}
                    </div>
                    {course.originalPrice && course.price !== 'Free' && (
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                          {Math.round(((parseFloat(course.originalPrice.replace('₹', '')) - parseFloat(course.price.replace('₹', ''))) / parseFloat(course.originalPrice.replace('₹', ''))) * 100)}% OFF
                        </span>
                        <span className="text-sm text-gray-600">Limited time offer!</span>
                      </div>
                    )}
                    <div className="text-xs text-gray-500">
                      ⏰ Offer ends in 2 days
                    </div>
                  </div>
                  <ul className="text-xs text-gray-700 space-y-2 mb-4">
                    <li>✔ Full lifetime access</li>
                    <li>✔ Certificate of completion</li>
                    <li>✔ Access on mobile and TV</li>
                    <li>✔ Training for 5+ people</li>
                  </ul>
                  <div className="relative">
                    <button
                      onClick={handleEnrollNow}
                      disabled={enrollLoading || isEnrolled}
                      className={`w-full py-3 rounded-lg font-semibold text-lg transition-colors shadow-lg transform hover:-translate-y-0.5 mb-4 ${
                        isEnrolled
                          ? 'bg-gray-400 text-white cursor-not-allowed'
                          : 'bg-teal-600 text-white hover:bg-teal-700'
                      } ${enrollLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <FaShoppingCart className="inline mr-2" />
                      {isEnrolled ? 'Enrolled' : enrollLoading ? 'Processing Payment...' : 'Enroll Now'}
                    </button>
                    {enrollLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-teal-600 bg-opacity-50 rounded-lg">
                        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-white"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              {/* Tab Navigation */}
              <div className="border-b border-gray-200 mb-8">
                <nav className="flex space-x-8">
                  {[
                    { id: 'overview', label: 'Overview' },
                    { id: 'curriculum', label: 'Curriculum' },
                    { id: 'instructor', label: 'Instructor' },
                    { id: 'reviews', label: 'Reviews' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab.id
                          ? 'border-teal-600 text-teal-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">About this course</h3>
                    <p className="text-gray-700 leading-relaxed mb-6">{course.longDescription}</p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">What you'll learn</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {course.learningOutcomes.map((outcome, index) => (
                        <div key={index} className="flex items-start">
                          <FaCheck className="text-teal-600 mr-3 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Requirements</h3>
                    <ul className="space-y-2">
                      {course.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-2 h-2 bg-gray-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                          <span className="text-gray-700">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'curriculum' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">Course curriculum</h3>
                    <div className="text-sm text-gray-600">
                      {course.modules.length} sections • {course.modules.reduce((total, module) => total + module.lessons.length, 0)} lessons • {course.duration}
                    </div>
                  </div>
                  <div className="space-y-4">
                    {course.modules.map((module, moduleIndex) => (
                      <div key={module.id} className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <button
                          onClick={() => toggleModule(module.id)}
                          className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mr-4 font-bold text-sm">
                              {moduleIndex + 1}
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 text-lg">{module.title}</h4>
                              <p className="text-sm text-gray-600">{module.lessons.length} lessons • {module.duration}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              {module.lessons.filter(l => l.preview).length} preview{module.lessons.filter(l => l.preview).length !== 1 ? 's' : ''}
                            </span>
                            {expandedModule === module.id ? (
                              <FaChevronUp className="text-gray-400" />
                            ) : (
                              <FaChevronDown className="text-gray-400" />
                            )}
                          </div>
                        </button>
                        {expandedModule === module.id && (
                          <div className="border-t border-gray-200 bg-gray-50">
                            {module.lessons.map((lesson) => (
                              <div key={lesson.id} className="flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0 hover:bg-white transition-colors">
                                <div className="flex items-center flex-1">
                                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4 shadow-sm">
                                    {getLessonIcon(lesson.type)}
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2">
                                      <p className="font-medium text-gray-900">{lesson.title}</p>
                                      {lesson.preview && (
                                        <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-medium">
                                          FREE
                                        </span>
                                      )}
                                    </div>
                                    <div className="flex items-center space-x-4 mt-1">
                                      <p className="text-sm text-gray-600">{lesson.duration}</p>
                                      <span className="text-xs text-gray-500 capitalize">{lesson.type}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                  {lesson.preview ? (
                                    <button className="text-teal-600 text-sm font-medium hover:text-teal-700 flex items-center">
                                      <FaPlayCircle className="mr-1 text-xs" />
                                      Preview
                                    </button>
                                  ) : (
                                    <FaLock className="text-gray-400 text-sm" />
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'instructor' && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Meet your instructor</h3>
                  <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-6">
                    <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
                      <div className="flex-shrink-0">
                        <img
                          src={course.instructorAvatar}
                          alt={course.instructor}
                          className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80';
                            console.error('Instructor avatar load error for URL:', course.instructorAvatar);
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-2xl font-bold text-gray-900 mb-2">{course.instructor}</h4>
                        <p className="text-teal-600 font-medium mb-4">Senior Instructor</p>
                        <p className="text-gray-700 leading-relaxed mb-6">{course.instructorBio}</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                            <div className="flex items-center justify-center mb-2">
                              <FaStar className="text-yellow-400 mr-1" />
                              <span className="font-bold text-lg">{course.rating}</span>
                            </div>
                            <p className="text-sm text-gray-600">Instructor Rating</p>
                          </div>
                          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                            <div className="flex items-center justify-center mb-2">
                              <FaUsers className="text-teal-600 mr-1" />
                              <span className="font-bold text-lg">{(course.students / 1000).toFixed(0)}K+</span>
                            </div>
                            <p className="text-sm text-gray-600">Students Taught</p>
                          </div>
                          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                            <div className="flex items-center justify-center mb-2">
                              <FaCertificate className="text-purple-600 mr-1" />
                              <span className="font-bold text-lg">15+</span>
                            </div>
                            <p className="text-sm text-gray-600">Courses Created</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm">Expert Instructor</span>
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{course.category} Specialist</span>
                          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Industry Leader</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Student reviews</h3>
                  {reviewsLoading ? (
                    <div className="flex items-center justify-center py-10">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-teal-600"></div>
                    </div>
                  ) : reviewsError ? (
                    <div className="bg-red-100 rounded-lg p-6 text-center">
                      <p className="text-red-600">{reviewsError}</p>
                    </div>
                  ) : reviews.length === 0 ? (
                    <div className="bg-gray-100 rounded-lg p-6 text-center">
                      <p className="text-gray-600">No reviews yet for this course.</p>
                      <p className="text-sm text-gray-500 mt-2">Be the first to leave a review after completing the course!</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div
                          key={review._id}
                          className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start space-x-4">
                            <img
                              src={review.user.avatar}
                              alt={`${review.user.firstName} ${review.user.lastName}`}
                              className="w-12 h-12 rounded-full border-2 border-gray-200"
                              onError={(e) => {
                                e.target.src = 'https://res.cloudinary.com/dcgilmdbm/image/upload/v1747893719/default_avatar_xpw8jv.jpg';
                                console.error('User avatar load error for URL:', review.user.avatar);
                              }}
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-semibold text-gray-900">{`${review.user.firstName} ${review.user.lastName}`}</p>
                                  <div className="flex items-center mt-1">
                                    {[...Array(5)].map((_, index) => (
                                      <FaStar
                                        key={index}
                                        className={index < review.rating ? 'text-yellow-400' : 'text-gray-300'}
                                      />
                                    ))}
                                    <span className="ml-2 text-sm text-gray-600">{review.rating}/5</span>
                                  </div>
                                </div>
                                <p className="text-sm text-gray-500">{formatDate(review.createdAt)}</p>
                              </div>
                              <p className="mt-3 text-gray-700 leading-relaxed">{review.comment}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </motion.div>

            {/* Sidebar */}
            <motion.div
              className="lg:col-span-1 space-y-6"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
                <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                  <FaCertificate className="mr-2 text-teal-600" />
                  Course Details
                </h4>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 flex items-center">
                      <FaUserGraduate className="mr-2 text-gray-400" />
                      Level:
                    </span>
                    <span className="font-medium bg-teal-100 text-teal-800 px-2 py-1 rounded">{course.level}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 flex items-center">
                      <FaRegClock className="mr-2 text-gray-400" />
                      Duration:
                    </span>
                    <span className="font-medium">{course.duration}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 flex items-center">
                      <FaGlobe className="mr-2 text-gray-400" />
                      Language:
                    </span>
                    <span className="font-medium">{course.language}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Last updated:</span>
                    <span className="font-medium">{course.lastUpdated}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600 flex items-center">
                      <FaCertificate className="mr-2 text-gray-400" />
                      Certificate:
                    </span>
                    <span className="font-medium text-green-600">
                      {course.certificate ? '✓ Included' : 'Not included'}
                    </span>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h5 className="font-semibold text-gray-900 mb-3">Share this course</h5>
                  <button
                    onClick={handleShare}
                    className="w-full bg-gradient-to-r from-teal-600 to-blue-600 text-white py-2 rounded-lg hover:from-teal-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
                  >
                    <FaShare className="inline mr-2" />
                    Share Course
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ViewCourse;