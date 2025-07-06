import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ThemeContext } from '../../contexts/ThemeContext';

const Notification = ({ message, type, onClose }) => {
  const { theme } = useContext(ThemeContext);
  if (!message) return null;

  return (
    <div
      className={`fixed top-4 right-2 sm:right-4 p-3 sm:p-4 rounded-md shadow-lg text-white transition-opacity duration-300 z-50 w-11/12 sm:w-auto max-w-xs sm:max-w-md ${
        type === 'error'
          ? theme === 'dark'
            ? 'bg-red-700'
            : 'bg-red-500'
          : theme === 'dark'
          ? 'bg-green-700'
          : 'bg-green-500'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm sm:text-base">{message}</span>
        <button
          onClick={onClose}
          className={`ml-2 sm:ml-4 text-sm sm:text-base ${
            theme === 'dark' ? 'hover:text-gray-300' : 'hover:text-gray-200'
          }`}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

const SettingsAndPayment = () => {
  const { theme, setTheme,  setLanguage } = useContext(ThemeContext);
  const [student, setStudent] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    role: '',
    email: '',
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [ setPaymentData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    amount: '',
  });
  const [ setProcessing] = useState(false);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => setNotification({ message: '', type: '' }), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification.message]);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('Token');
      if (!token) {
        setNotification({ message: 'Authentication required. Please log in to access your profile.', type: 'error' });
        return;
      }
      try {
        const res = await axios.get('https://lms-backend-flwq.onrender.com/api/v1/students/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data.data;
        if (!data) {
          throw new Error('No profile data returned from the server.');
        }
        setStudent(data);
        setFormData({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          phone: data.phone || '',
          role: data.role || '',
          email: data.email || '',
        });
        setAvatarPreview(data.avatar || null);
      } catch (err) {
        console.error('Error fetching profile:', err);
        if (err.response?.status === 401) {
          setNotification({ message: 'Session expired. Please log in again.', type: 'error' });
          localStorage.removeItem('token');
        } else {
          setNotification({
            message: err.response?.data?.message || 'Unable to retrieve profile data. Please try again later.',
            type: 'error',
          });
        }
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const token = localStorage.getItem('Token');
        if (!token) return;
        
        const response = await axios.get('https://lms-backend-flwq.onrender.com/api/v1/payments/my-payments', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data.success) {
          // Filter only completed payments
          const completedPayments = response.data.data.filter(payment => payment.status === 'completed');
          setPaymentHistory(completedPayments);
        } else {
          setNotification({ message: 'Failed to fetch payment history.', type: 'error' });
        }
      } catch (err) {
        setNotification({
          message: err.message || 'Failed to fetch payment history.',
          type: 'error',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentHistory();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setNotification({ message: 'Invalid file format. Please select a valid image file (e.g., JPG, PNG).', type: 'error' });
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setNotification({ message: 'File size exceeds the limit. Please select an image smaller than 5MB.', type: 'error' });
        return;
      }
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async () => {
    setSaving(true);
    setNotification({ message: '', type: '' });
    const token = localStorage.getItem('Token');
    if (!token) {
      setNotification({ message: 'Authentication required. Please log in.', type: 'error' });
      setSaving(false);
      return;
    }
    try {
      const payload = new FormData();
      Object.keys(formData).forEach((key) => payload.append(key, formData[key]));
      if (avatarFile) payload.append('avatar', avatarFile);
      const res = await axios.put('https://lms-backend-flwq.onrender.com/api/v1/auth/updatedetails', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      const updatedData = res.data.data;
      setStudent((prev) => ({
        ...prev,
        ...formData,
        avatar: updatedData.avatar || prev.avatar,
      }));
      setNotification({ message: 'Your profile has been updated successfully.', type: 'success' });
      setAvatarFile(null);
      setAvatarPreview(updatedData.avatar || avatarPreview);
      setIsEditing(false);
    } catch (err) {
      setNotification({
        message: `Failed to update profile: ${err.response?.data?.message || 'An error occurred. Please try again.'}`,
        type: 'error',
      });
    } finally {
      setSaving(false);
    }
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
    setAvatarFile(null);
    setNotification({ message: '', type: '' });
    if (!isEditing) setAvatarPreview(student?.avatar || null);
  };

  const LaageChange = (e) => {
    setLanguage(e.target.value);
    alert(`Application will reload after switching to ${e.target.value === 'en' ? 'English' : 'Hindi'}`);
  };

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  const Payment = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setNotification({ message: '', type: '' });
    try {
      const token = localStorage.getItem('Token');
      if (!token) {
        setNotification({ message: 'Authentication required. Please log in.', type: 'error' });
        return;
      }
      
      // Simulated payment API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setNotification({ message: 'Payment processed successfully!', type: 'success' });
      setPaymentData({ cardNumber: '', expiry: '', cvv: '', amount: '' });
      
      // Refresh payment history after successful payment
      const response = await axios.get('https://lms-backend-flwq.onrender.com/api/v1/payments/my-payments', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        // Filter only completed payments
        const completedPayments = response.data.data.filter(payment => payment.status === 'completed');
        setPaymentHistory(completedPayments);
      }
    } catch (err) {
      setNotification({
        message: err.message || 'Payment failed. Please try again.',
        type: 'error',
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div
      className={`p-4 sm:p-5 font-sans min-h-screen transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'
      }`}
    >
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: '', type: '' })}
      />
      
      {/* Edit Profile Section */}
      <div
        className={`rounded-lg p-4 sm:p-5 shadow-md mb-4 sm:mb-5 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <h2
            className={`text-lg sm:text-xl ${
              theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
            }`}
          >
            Edit Profile
          </h2>
          <button
            onClick={toggleEditMode}
            className={`mt-2 sm:mt-0 px-4 sm:px-6 py-2 rounded-md text-sm transition ${
              theme === 'dark'
                ? 'bg-gray-600 text-gray-200 hover:bg-gray-700'
                : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
            }`}
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>
        {student && (
          <div>
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-4 sm:mb-6">
              <div className="relative">
                <img
                  src={avatarPreview || 'https://via.placeholder.com/150'}
                  alt="Profile"
                  className={`w-12 sm:w-16 h-12 sm:h-16 rounded-full border-2 sm:border-4 ${
                    theme === 'dark'
                      ? 'border-gray-800'
                      : 'border-white'
                  } shadow`}
                />
                {isEditing && (
                  <>
                    <label
                      htmlFor="avatar-upload"
                      className={`absolute bottom-0 right-0 rounded-full p-1 sm:p-2 cursor-pointer text-white transition ${
                        theme === 'dark'
                          ? 'bg-blue-600 hover:bg-blue-700'
                          : 'bg-blue-500 hover:bg-blue-600'
                      }`}
                    >
                      <svg
                        className="w-3 sm:w-4 h-3 sm:h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </label>
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </>
                )}
              </div>
              <div>
                <h2
                  className={`text-base sm:text-lg font-semibold ${
                    theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                  }`}
                >
                  {student.firstName} {student.lastName}
                </h2>
                <p
                  className={`text-xs sm:text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  {student.email}
                </p>
                {/* <p
                  className={`text-xs ${
                    theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                  }`}
                >
                  1 month ago
                </p> */}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:gap-4">
              {['firstName', 'lastName', 'phone', 'role',  'email'].map((field) => (
                <div key={field}>
                  <label
                    className={`block text-xs sm:text-sm capitalize ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    } mb-1`}
                  >
                    {field
                      .replace('email', 'Email Address')
                      .replace('firstName', 'First Name')
                      .replace('lastName', 'Last Name')}
                  </label>
                  {field === 'role' && isEditing ? (
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className={`w-full border rounded-md p-2 text-xs sm:text-sm ${
                        theme === 'dark'
                          ? 'border-gray-600 bg-gray-800 text-gray-100'
                          : 'border-gray-300 bg-white text-gray-900'
                      }`}
                    >
                      <option value="">Select Role</option>
                      <option value="Student">Student</option>
                      <option value="Teacher">Teacher</option>
                      <option value="Administrator">Administrator</option>
                    </select>
                  ) : (
                    <input
                      type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      className={`w-full border rounded-md p-2 text-xs sm:text-sm ${
                        theme === 'dark'
                          ? isEditing
                            ? 'border-gray-600 bg-gray-800 text-gray-100'
                            : 'border-gray-600 bg-gray-700 text-gray-100'
                          : isEditing
                          ? 'border-gray-300 bg-white text-gray-900'
                          : 'border-gray-300 bg-gray-100 text-gray-900'
                      } ${!isEditing && field === 'email' ? 'cursor-not-allowed' : ''}`}
                      readOnly={!isEditing || field === 'email'}
                      disabled={!isEditing && field === 'email'}
                    />
                  )}
                </div>
              ))}
            </div>
            {isEditing && (
              <div className="mt-4 sm:mt-6 flex justify-end">
                <button
                  onClick={handleUpdate}
                  className={`px-4 sm:px-6 py-2 rounded-md text-sm text-white transition ${
                    theme === 'dark'
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'bg-blue-500 hover:bg-blue-600'
                  } ${saving ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Choose Your Theme Section */}
      <div
        className={`rounded-lg p-4 sm:p-5 mb-4 sm:mb-5 shadow-md ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <h2
          className={`text-lg sm:text-xl mb-2 ${
            theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
          }`}
        >
          Choose Your Theme
        </h2>
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5">
          <label className="flex flex-col items-center gap-2 cursor-pointer w-full sm:w-auto">
            <input
              type="radio"
              name="theme"
              value="ograft"
              checked={theme === 'light'}
              onChange={handleThemeChange}
              className="hidden"
            />
            <div
              className={`w-full sm:w-48 h-12 sm:h-16 border rounded ${
                theme === 'dark'
                  ? 'border-gray6-600 bg-white'
                  : 'border-gray-300 bg-white'
              } ${theme === 'light' ? 'ring-2 ring-blue-500' : ''}`}
            ></div>
            <span
              className={`text-sm ${
                theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
              }`}
            >
              Light
            </span>
          </label>
          <label className="flex flex-col items-center gap-2 cursor-pointer w-full sm:w-auto">
            <input
              type="radio"
              name="theme"
              value="dark"
              checked={theme === 'dark'}
              onChange={handleThemeChange}
              className="hidden"
            />
            <div
              className={`w-full sm:w-48 h-12 sm:h-16 border rounded ${
                theme === 'dark'
                  ? 'border-gray-600 bg-gray-800'
                  : 'border-gray-300 bg-gray-800'
              } ${theme === 'dark' ? 'ring-2 ring-blue-500' : ''}`}
            ></div>
            <span
              className={`text-sm ${
                theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
              }`}
            >
              Dark
            </span>
          </label>
        </div>
      </div>
      
      {/* Choose Your Language Section */}
     
      
      {/* Payment History Section */}
      <div
        className={`rounded-lg p-6 sm:p-8 shadow-lg ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <h2
          className={`text-2xl font-bold mb-6 text-center ${
            theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
          }`}
        >
          Payment History
        </h2>
        {loading ? (
          <div className="text-center">
            <svg
              className="animate-spin h-8 w-8 mx-auto text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z"
              ></path>
            </svg>
            <p className="mt-2">Loading payment history...</p>
          </div>
        ) : paymentHistory.length === 0 ? (
          <p className="text-center text-gray-500">No completed payments available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table
              className={`w-full text-sm ${
                theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
              }`}
            >
              <thead>
                <tr
                  className={`text-left ${
                    theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                  }`}
                >
                  <th className="py-3 px-4 font-semibold">Course</th>
                  <th className="py-3 px-4 font-semibold">Amount (INR)</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold">Date</th>
                  <th className="py-3 px-4 font-semibold">Transaction ID</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((payment) => (
                  <tr
                    key={payment._id}
                    className={`border-b ${
                      theme === 'dark' ? 'border-gray-600' : 'border-gray-200'
                    } hover:${
                      theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                    } transition duration-150`}
                  >
                    <td className="py-3 px-4">{payment.course?.title || 'N/A'}</td>
                    <td className="py-3 px-4">{payment.amount?.toFixed(2) || '0.00'}</td>
                    <td
                      className={`py-3 px-4 font-medium text-green-500`}
                    >
                      {payment.status?.charAt(0).toUpperCase() + payment.status?.slice(1) || 'Unknown'}
                    </td>
                    <td className="py-3 px-4">
                      {payment.paymentDate ? 
                        new Date(payment.paymentDate).toLocaleString('en-IN', {
                          dateStyle: 'medium',
                          timeStyle: 'short',
                        }) : 'N/A'}
                    </td>
                    <td className="py-3 px-4 text-xs">{payment.transactionId || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsAndPayment;