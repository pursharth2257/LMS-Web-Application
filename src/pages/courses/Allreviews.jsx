import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaStar, FaArrowLeft } from 'react-icons/fa';

// Modal Component for Error Feedback
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
          type === 'error' ? 'bg-red-100' : 'bg-green-100'
        }`}
      >
        <p
          className={`text-sm font-medium ${
            type === 'error' ? 'text-red-800' : 'text-green-800'
          }`}
        >
          {message}
        </p>
        <button
          onClick={onClose}
          className={`mt-4 px-4 py-2 rounded text-white text-sm ${
            type === 'error' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          Close
        </button>
      </div>
    </div>
  );
};

// Hardcoded API base URL
const REVIEWS_API_BASE_URL = 'https://lms-backend-flwq.onrender.com/api/v1';

const AllReviews = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch reviews data
  useEffect(() => {
    const fetchReviews = async () => {
      if (!/^[0-9a-fA-F]{24}$/.test(id)) {
        setError('Invalid course ID format');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const token = localStorage.getItem('Token');
        if (!token) {
          setError('Please log in to view reviews');
          setTimeout(() => navigate('/'), 2000);
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
        let errorMessage = err.response?.data?.message || 'Error fetching reviews';
        if (err.response?.status === 401) {
          errorMessage = 'Session expired. Please log in again.';
          localStorage.removeItem('Token');
          localStorage.removeItem('user');
          setTimeout(() => navigate('/'), 2000);
        }
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [id, navigate]);

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const closeModal = () => {
    setError(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <Modal isOpen={!!error} message={error} type="error" onClose={closeModal} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <Link
              to={`/courses/${id}`}
              className="flex items-center text-teal-600 hover:text-teal-700 text-sm font-medium"
            >
              <FaArrowLeft className="mr-2" />
              Back to Course
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-6">All Reviews</h1>
          {reviews.length === 0 ? (
            <div className="bg-gray-100 rounded-lg p-6 text-center">
              <p className="text-gray-600">No reviews yet for this course.</p>
              <p className="text-sm text-gray-500 mt-2">Be the first to leave a review after completing the course!</p>
            </div>
          ) : (
            <div className="max-h-[600px] overflow-y-auto space-y-6 pr-2">
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
        </motion.div>
      </div>
    </div>
  );
};

export default AllReviews;