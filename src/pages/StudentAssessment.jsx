import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function StudentAssessment() {
  const { courseId, assessmentId } = useParams();
  const navigate = useNavigate();
  const [assessment, setAssessment] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const token = localStorage.getItem('Token');
        if (!token) {
          throw new Error('No authentication token found');
        }
        if (!courseId || !assessmentId) {
          throw new Error('Invalid course or assessment ID');
        }

        console.log('Fetching assessment for:', { courseId, assessmentId }); // Debug
        const response = await axios.get(
          `https://lms-backend-flwq.onrender.com/api/v1/students/courses/${courseId}/assessments/${assessmentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log('Assessment response:', response.data); // Debug
        if (response.data.success) {
          setAssessment(response.data.data);
          setIsSubmitted(response.data.data.isSubmitted || false);
        } else {
          setError('Failed to load assessment.');
        }
      } catch (err) {
        console.error('Error fetching assessment:', err);
        setError(
          err.response?.status === 404
            ? 'Assessment not found.'
            : err.response?.status === 401
            ? 'Unauthorized. Please log in again.'
            : err.message || 'Failed to load assessment.'
        );
        if (err.response?.status === 401) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAssessment();
  }, [courseId, assessmentId, navigate]);

  const handleAnswerSelect = (questionId, optionId) => {
    if (!isSubmitted) {
      setAnswers((prev) => ({
        ...prev,
        [questionId]: optionId,
      }));
    }
  };

  const handleSubmit = async () => {
    if (isSubmitted) return;

    if (Object.keys(answers).length !== assessment?.questions?.length) {
      setError('Please answer all questions before submitting.');
      setTimeout(() => {
        navigate(`/course-player/${courseId}`);
      }, 2000);
      return;
    }

    setSubmitting(true);
    setError('');
    setSubmissionResult('');

    try {
      const token = localStorage.getItem('Token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      console.log('Submitting answers:', answers); // Debug
      const response = await axios.post(
        `https://lms-backend-flwq.onrender.com/api/v1/students/courses/${courseId}/assessments/${assessmentId}/submit`,
        { answers },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Submission response:', response.data); // Debug
      if (response.data.success) {
        setSubmissionResult('Assessment submitted successfully!');
        setAnswers({});
        setIsSubmitted(true);
        setTimeout(() => {
          navigate(`/course-player/${courseId}`);
        }, 2000);
      } else {
        setError('Failed to submit assessment.');
      }
    } catch (err) {
      console.error('Error submitting assessment:', err);
      setError(
        err.response?.status === 404
          ? 'Assessment not found.'
          : err.response?.status === 401
          ? 'Unauthorized. Please log in again.'
          : err.message || 'Failed to submit assessment.'
      );
      if (err.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#eaf5ff] p-1 sm:p-2 md:p-4 flex flex-col min-h-[calc(100vh-3.5rem)] w-full mt-[3.5rem]">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-lg shadow p-4 sm:p-6 max-w-3xl mx-auto w-full"
      >
        {loading ? (
          <p className="text-gray-600 text-sm text-center">Loading assessment...</p>
        ) : error ? (
          <div className="text-center">
            <p className="text-red-500 text-sm mb-4">{error}</p>
            <button
              onClick={() => navigate(`/course-player/${courseId}`)}
              className="bg-[#49BBBD] text-white px-6 py-2 rounded-md text-sm sm:text-base hover:bg-[#3AA8AA] transition"
            >
              Back to Course
            </button>
          </div>
        ) : assessment ? (
          <>
            <h2 className="text-lg sm:text-xl font-semibold mb-2">{assessment.title}</h2>
            <p className="text-xs sm:text-sm text-gray-600 mb-4">{assessment.description}</p>
            {isSubmitted ? (
              <div className="text-center">
                <p className="text-red-500 text-sm mb-4">
                  You have already attempted this test. Please attend other assessments.
                </p>
                <button
                  onClick={() => navigate(`/course-player/${courseId}`)}
                  className="bg-[#49BBBD] text-white px-6 py-2 rounded-md text-sm sm:text-base hover:bg-[#3AA8AA] transition"
                >
                  Back to Course
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-6">
                  {assessment.questions?.map((question, index) => (
                    <div key={question._id} className="border rounded-lg p-3 sm:p-4">
                      <h3 className="text-sm sm:text-base font-medium mb-2">
                        {index + 1}. {question.questionText || 'Untitled Question'}
                      </h3>
                      <div className="space-y-2">
                        {question.options?.map((option) => (
                          <label
                            key={option._id}
                            className="flex items-center gap-2 text-xs sm:text-sm cursor-pointer"
                          >
                            <input
                              type="radio"
                              name={question._id}
                              value={option._id}
                              checked={answers[question._id] === option._id}
                              onChange={() => handleAnswerSelect(question._id, option._id)}
                              className="h-4 w-4 text-blue-500"
                              disabled={submitting}
                            />
                            {option.text || 'No option text'}
                          </label>
                        ))}
                      </div>
                    </div>
                  )) || (
                    <p className="text-sm text-gray-600">No questions available for this assessment.</p>
                  )}
                </div>
                {submissionResult && (
                  <p className="text-green-500 text-sm mt-4 text-center">{submissionResult}</p>
                )}
                {error && (
                  <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
                )}
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={handleSubmit}
                    disabled={submitting || !assessment?.questions?.length}
                    className="bg-[#49BBBD] text-white px-6 py-2 rounded-md text-sm sm:text-base hover:bg-[#3AA8AA] transition disabled:bg-blue-300"
                  >
                    {submitting ? 'Submitting...' : 'Submit Test'}
                  </button>
                </div>
              </>
            )}
          </>
        ) : (
          <div className="text-center">
            <p className="text-gray-600 text-sm">No assessment data available.</p>
            <button
              onClick={() => navigate(`/course-player/${courseId}`)}
              className="bg-[#49BBBD] text-white px-6 py-2 rounded-md text-sm sm:text-base hover:bg-[#3AA8AA] transition mt-4"
            >
              Back to Course
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}