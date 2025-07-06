import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { ThemeContext } from '../../contexts/ThemeContext';

const Contact = ({ relatedCourseId }) => {
  const { theme } = useContext(ThemeContext);
  const [form, setForm] = useState({
    name: '',
    subject: '',
    message: '',
    category: 'technical',
    relatedCourse: relatedCourseId || '',
  });
  const [loading, setLoading] = useState(false);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('Token');
        if (!token) {
          setErrorMsg('Please log in to access this feature.');
          setCoursesLoading(false);
          return;
        }

        const profileRes = await axios.get(
          'https://lms-backend-flwq.onrender.com/api/v1/students/profile',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const { firstName, lastName } = profileRes.data.data;
        setForm((prev) => ({ ...prev, name: `${firstName} ${lastName}` }));

        const coursesRes = await axios.get(
          'https://lms-backend-flwq.onrender.com/api/v1/students/courses',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (coursesRes.data.success && Array.isArray(coursesRes.data.data)) {
          const validCourses = coursesRes.data.data
            .filter((enrollment) => enrollment.course !== null)
            .map((enrollment) => ({
              _id: enrollment.course._id,
              title: enrollment.course.title,
            }));
          setCourses(validCourses);
        } else {
          setErrorMsg('Failed to load courses.');
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setErrorMsg('Failed to load profile or courses.');
      } finally {
        setCoursesLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    const allowedCategories = ['technical', 'course', 'billing', 'account', 'other'];
    if (!allowedCategories.includes(form.category)) {
      setErrorMsg('Invalid category selected.');
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('Token');
      if (!token) {
        setErrorMsg('Please log in to submit a ticket.');
        setLoading(false);
        return;
      }

      const response = await axios.post(
        'https://lms-backend-flwq.onrender.com/api/v1/students/support',
        {
          subject: form.subject,
          message: form.message,
          category: form.category,
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
          category: 'technical',
          relatedCourse: relatedCourseId || '',
        }));
      } else {
        setErrorMsg('Failed to submit the ticket. Server returned success: false.');
      }
    } catch (error) {
      console.error('Error submitting ticket:', error);
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
      className={`sm:p-0 mt-12 md:mt-0 h-fit px-[10px] lg:py-6 lg:px-6 rounded-lg space-y-6 max-w-7xl mx-auto transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'
      }`}
    >
      <div className="w-full max-w-full sm:max-w-[60%] px-4 py-6 mx-0 mt-12 md:mt-6 sm:mx-auto sm:px-6">
        <h2
          className={`text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-6 text-center ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}
        >
          Ticket Support
        </h2>

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
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              disabled
              className={`w-full border rounded-lg p-2 sm:p-3 bg-gray-100 cursor-not-allowed text-sm sm:text-base focus:ring-0 ${
                theme === 'dark'
                  ? 'border-gray-600 bg-gray-800 text-gray-400'
                  : 'border-gray-300 bg-gray-100 text-gray-600'
              }`}
            />
          </div>
          <div>
            <label
              className={`block mb-1 text-sm sm:text-base font-medium ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Related Course
            </label>
            <select
              name="relatedCourse"
              value={form.relatedCourse}
              onChange={handleChange}
              disabled={coursesLoading}
              className={`w-full border rounded-lg p-2 sm:p-3 text-sm sm:text-base focus:ring-2 focus:border-blue-500 ${
                theme === 'dark'
                  ? 'border-gray-600 bg-gray-800 text-gray-100 focus:ring-blue-400'
                  : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500'
              }`}
            >
              {coursesLoading ? (
                <option>Loading courses...</option>
              ) : (
                <>
                  <option value="">Select a course (optional)</option>
                  {courses.length === 0 ? (
                    <option disabled>No courses available</option>
                  ) : (
                    courses.map((course) => (
                      <option key={course._id} value={course._id}>
                        {course.title}
                      </option>
                    ))
                  )}
                </>
              )}
            </select>
          </div>
          <div>
            <label
              className={`block mb-1 text-sm sm:text-base font-medium ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
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
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
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
            ></textarea>
          </div>
          <div>
            <label
              className={`block mb-1 text-sm sm:text-base font-medium ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
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
              required
            >
              <option value="technical">Technical</option>
              <option value="billing">Billing</option>
              <option value="course">Course</option>
              <option value="account">Account</option>
              <option value="other">Other</option>
            </select>
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full py-2 sm:py-3 px-4 rounded-lg text-sm sm:text-base font-medium text-white transition duration-200 ${
              theme === 'dark'
                ? 'bg-blue-600 hover:bg-blue-500 disabled:bg-blue-400'
                : 'bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300'
            } disabled:cursor-not-allowed`}
          >
            {loading ? 'Submitting...' : 'Submit Ticket'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;