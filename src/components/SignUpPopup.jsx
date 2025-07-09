import React, { useState, useEffect, useCallback, memo } from 'react';
import api from '../../axiosConfig';
import { motion } from 'framer-motion';
import { FaTimes, FaRocket, FaStar, FaGraduationCap } from 'react-icons/fa';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useSignUp } from '../contexts/SignUpContext';
import { useNavigate } from 'react-router-dom';

// Constants
const ERROR_MESSAGES = {
  INVALID_TOKEN: 'Invalid token detected. Please try again.',
  GOOGLE_SCRIPT_FAILED: 'Failed to load Google Sign-In script. Please try again later.',
  GOOGLE_AUTH_FAILED: 'Google authentication failed. Please try again.',
  PASSWORDS_MISMATCH: 'Passwords do not match!',
  PASSWORD_TOO_SHORT: 'Password must be at least 6 characters long!',
  INVALID_EMAIL_PASSWORD: 'Please enter both email and password.',
  INVALID_OTP: 'Please enter a valid 6-digit OTP.',
  REGISTRATION_FAILED: 'An error occurred during registration. Please try again.',
  OTP_VERIFICATION_FAILED: 'Invalid OTP. Please try again.',
  LOGIN_FAILED: 'Invalid email or password. Please try again.',
  NOT_FOUND: 'Service unavailable. Please try again later or contact support.',
  FORGOT_PASSWORD: 'Forgot Password functionality not implemented.',
  EMAIL_ALREADY_VERIFIED: 'Email already registered and verified. Please log in.',
};

// Modal Component
const Modal = ({ isOpen, message, type, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => onClose(), 3000);
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

// Login Form Component
const LoginForm = memo(({ loginData, handleLoginChange, handleLogin, isLoading, showPassword, togglePassword, setErrorMessage }) => (
  <div className="space-y-3 sm:space-y-4">
    <form onSubmit={handleLogin} className="space-y-3 sm:space-y-4">
      <div className="mb-3 sm:mb-4">
        <label className="block text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">Email</label>
        <input
          type="email"
          name="email"
          value={loginData.email}
          onChange={handleLoginChange}
          className="w-full p-2 sm:p-3 border border-teal-500 rounded-md text-sm sm:text-base"
          required
        />
      </div>
      <div className="mb-3 sm:mb-4 relative">
        <label className="block text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">Password</label>
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={loginData.password}
          onChange={handleLoginChange}
          className="w-full p-2 sm:p-3 border border-teal-500 rounded-md pr-8 sm:pr-10 text-sm sm:text-base"
          required
        />
        <button
          type="button"
          onClick={togglePassword}
          className="absolute right-2 sm:right-3 top-9 sm:top-11 text-gray-600 hover:text-gray-800"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible className="w-4 h-4 sm:w-5 sm:h-5" />
          ) : (
            <AiOutlineEye className="w-4 h-4 sm:w-5 sm:h-5" />
          )}
        </button>
      </div>
      <div className="flex justify-between items-center mb-4 sm:mb-5">
        <button
          type="submit"
          disabled={isLoading}
          className={`py-2 px-4 sm:py-3 sm:px-6 bg-teal-500 text-white rounded-md hover:bg-teal-600 text-sm sm:text-base ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        <button
          type="button"
          onClick={() => setErrorMessage(ERROR_MESSAGES.FORGOT_PASSWORD)}
          className="text-teal-600 hover:underline text-sm sm:text-base"
        >
          Forgot Password?
        </button>
      </div>
    </form>
    <div
      id="g_id_onload"
      data-client_id="985947726470-5lflb818ib5ee246iucdbkpru7m5i1c8.apps.googleusercontent.com"
      data-callback="handleCredentialResponse"
      data-auto_prompt="false"
      data-ux_mode="popup"
      className="w-full flex justify-center"
    >
      <div
        className="g_id_signin"
        data-type="standard"
        data-size="large"
        data-theme="outline"
        data-text="signin_with"
        data-shape="rectangular"
        data-logo_alignment="left"
      ></div>
    </div>
  </div>
));

// Register Form Component
const RegisterForm = memo(({ registerData, handleRegisterChange, handleRegisterSubmit, isLoading, showPassword, togglePassword }) => (
  <div className="space-y-3 sm:space-y-4">
    <form onSubmit={handleRegisterSubmit} className="space-y-3 sm:space-y-4 max-h-80 sm:max-h-96 overflow-y-auto scrollbar-hide">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <label className="block text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">First Name</label>
          <input
            type="text"
            name="firstName"
            value={registerData.firstName}
            onChange={handleRegisterChange}
            className="w-full p-2 sm:p-3 border border-teal-500 rounded-md text-sm sm:text-base"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={registerData.lastName}
            onChange={handleRegisterChange}
            className="w-full p-2 sm:p-3 border border-teal-500 rounded-md text-sm sm:text-base"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">Email</label>
        <input
          type="email"
          name="email"
          value={registerData.email}
          onChange={handleRegisterChange}
          className="w-full p-2 sm:p-3 border border-teal-500 rounded-md text-sm sm:text-base"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">Phone Number (optional)</label>
        <div className="flex">
          <div className="flex items-center bg-gray-50 border border-teal-500 rounded-l-md px-3">
            <img
              src="https://flagcdn.com/w20/in.png"
              alt="India"
              className="w-5 h-3 mr-2"
              loading="lazy"
            />
            <span className="text-gray-700 font-medium">+91</span>
          </div>
          <input
            type="tel"
            name="phone"
            value={registerData.phone}
            onChange={handleRegisterChange}
            className="flex-1 p-2 sm:p-3 border border-l-0 border-teal-500 rounded-r-md text-sm sm:text-base"
          />
        </div>
      </div>
      <div className="relative">
        <label className="block text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">Password</label>
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={registerData.password}
          onChange={handleRegisterChange}
          className="w-full p-2 sm:p-3 border border-teal-500 rounded-md pr-8 sm:pr-10 text-sm sm:text-base"
          required
          minLength="6"
        />
        <button
          type="button"
          onClick={togglePassword}
          className="absolute right-2 sm:right-3 top-9 sm:top-11 text-gray-600 hover:text-gray-800"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible className="w-4 h-4 sm:w-5 sm:h-5" />
          ) : (
            <AiOutlineEye className="w-4 h-4 sm:w-5 sm:h-5" />
          )}
        </button>
      </div>
      <div className="relative">
        <label className="block text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">Confirm Password</label>
        <input
          type={showPassword ? 'text' : 'password'}
          name="confirmPassword"
          value={registerData.confirmPassword}
          onChange={handleRegisterChange}
          className="w-full p-2 sm:p-3 border border-teal-500 rounded-md pr-8 sm:pr-10 text-sm sm:text-base"
          required
          minLength="6"
        />
        <button
          type="button"
          onClick={togglePassword}
          className="absolute right-2 sm:right-3 top-9 sm:top-11 text-gray-600 hover:text-gray-800"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible className="w-4 h-4 sm:w-5 sm:h-5" />
          ) : (
            <AiOutlineEye className="w-4 h-4 sm:w-5 sm:h-5" />
          )}
        </button>
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-2 px-4 sm:py-3 sm:px-6 bg-teal-500 text-white rounded-md hover:bg-teal-600 text-sm sm:text-base ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isLoading ? 'Registering...' : 'Create Account'}
      </button>
    </form>
    <div
      id="g_id_onload"
      data-client_id="985947726470-5lflb818ib5ee246iucdbkpru7m5i1c8.apps.googleusercontent.com"
      data-callback="handleCredentialResponse"
      data-auto_prompt="false"
      data-ux_mode="popup"
      className="w-full flex justify-center"
    >
      <div
        className="g_id_signin"
        data-type="standard"
        data-size="large"
        data-theme="outline"
        data-text="signup_with"
        data-shape="rectangular"
        data-logo_alignment="left"
      ></div>
    </div>
  </div>
));

// Otp Form Component
const OtpForm = memo(({ otp, setOtp, handleOtpSubmit, handleResendOtp, isLoading, email, setIsLogin, setShowOtpPopup }) => (
  <div className="p-4 sm:p-6 lg:p-8 flex flex-col justify-center items-center">
    <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center">Enter OTP</h2>
    <p className="text-gray-600 mb-4 text-sm sm:text-base">
      An OTP has been sent to {email}. Please enter it below.
    </p>
    <form onSubmit={handleOtpSubmit} className="w-full max-w-xs sm:max-w-sm space-y-4">
      <div>
        <label className="block text-gray-700 mb-2 text-sm sm:text-base">OTP</label>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full p-2 sm:p-3 border border-teal-500 rounded-md text-sm sm:text-base"
          required
          maxLength="6"
          placeholder="Enter 6-digit OTP"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-2 px-4 sm:py-3 sm:px-6 bg-teal-500 text-white rounded-md hover:bg-teal-600 text-sm sm:text-base ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isLoading ? 'Verifying...' : 'Verify OTP'}
      </button>
      <button
        type="button"
        onClick={handleResendOtp}
        disabled={isLoading}
        className={`w-full py-2 px-4 sm:py-3 sm:px-6 bg-gray-500 text-white rounded-md hover:bg-gray-600 text-sm sm:text-base ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        Resend OTP
      </button>
      <button
        type="button"
        onClick={() => {
          setShowOtpPopup(false);
          setIsLogin(true);
        }}
        className="w-full py-2 px-4 sm:py-3 sm:px-6 text-teal-600 hover:underline text-sm sm:text-base"
      >
        Back to Login
      </button>
    </form>
  </div>
));

// Component
const SignUpPopup = () => {
  const { isPopupVisible, hideSignUpPopup, showSignUpPopup } = useSignUp();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'student',
  });
  const [userId, setUserId] = useState(''); // Store userId for OTP verification

  // Initialize Google Sign-In
  useEffect(() => {
    const token = localStorage.getItem('Token');
    if (token) {
      try {
        const parts = token.split('.');
        if (parts.length !== 3) throw new Error('Invalid token format');
      } catch (error) {
        console.error('Invalid token detected:', error);
        localStorage.removeItem('Token');
        setNotification({ message: ERROR_MESSAGES.INVALID_TOKEN, type: 'error' });
      }
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.onerror = () => {
      setNotification({ message: ERROR_MESSAGES.GOOGLE_SCRIPT_FAILED, type: 'error' });
      console.error('Google Sign-In script failed to load.');
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      delete window.handleCredentialResponse;
    };
  }, []);

  // Auto-show popup
  useEffect(() => {
    const interval = setInterval(() => showSignUpPopup(), 900000);
    const initialTimeout = setTimeout(() => showSignUpPopup(), 900000);
    return () => {
      clearInterval(interval);
      clearTimeout(initialTimeout);
    };
  }, [showSignUpPopup]);

  // Handle Google Sign-In
  const handleCredentialResponse = useCallback(async (response) => {
    try {
      setIsLoading(true);
      setNotification({ message: '', type: '' });
      console.log('Google ID Token:', response.credential);
      const res = await api.post('/auth/google', { idToken: response.credential });
      console.log('Google Sign-In response:', res.data);
      if (res.data.success && res.data.data.token) {
        localStorage.setItem('Token', res.data.data.token);
        setNotification({ message: 'Google authentication successful! Welcome!', type: 'success' });
        setTimeout(() => {
          hideSignUpPopup();
          navigate('/');
          window.location.reload();
        }, 2000);
      } else {
        throw new Error(res.data.message || ERROR_MESSAGES.GOOGLE_AUTH_FAILED);
      }
    } catch (error) {
      console.error('Google authentication error:', error.response?.data || error);
      const errorMsg = error.response?.status === 404
        ? ERROR_MESSAGES.NOT_FOUND
        : error.response?.data?.message || ERROR_MESSAGES.GOOGLE_AUTH_FAILED;
      setNotification({ message: errorMsg, type: 'error' });
      localStorage.removeItem('Token');
    } finally {
      setIsLoading(false);
    }
  }, [hideSignUpPopup, navigate]);

  // Register global Google callback
  useEffect(() => {
    window.handleCredentialResponse = handleCredentialResponse;
    return () => {
      delete window.handleCredentialResponse;
    };
  }, [handleCredentialResponse]);

  // Handle close
  const handleClose = useCallback(() => {
    hideSignUpPopup();
    setNotification({ message: '', type: '' });
    setIsLogin(false);
    setShowOtpPopup(false);
    setOtp('');
    setLoginData({ email: '', password: '' });
    setRegisterData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      role: 'student',
    });
    setUserId('');
  }, [hideSignUpPopup]);

  // Handle login input change
  const handleLoginChange = useCallback((e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  }, []);

  // Handle register input change
  const handleRegisterChange = useCallback((e) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({ ...prev, [name]: value }));
  }, []);

  // Handle login submit
  const handleLogin = useCallback(async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setNotification({ message: '', type: '' });

    if (!loginData.email || !loginData.password) {
      setNotification({ message: ERROR_MESSAGES.INVALID_EMAIL_PASSWORD, type: 'error' });
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.post('/auth/login', {
        email: loginData.email,
        password: loginData.password,
      });
      console.log('Login response:', response.data);
      const { success, message, data } = response.data;
      if (success && data.token) {
        localStorage.setItem('Token', data.token);
        setNotification({ message: 'Login successful! Welcome back!', type: 'success' });
        setLoginData({ email: '', password: '' });
        setTimeout(() => {
          handleClose();
          navigate('/');
          window.location.reload();
        }, 2000);
      } else {
        throw new Error(message || ERROR_MESSAGES.LOGIN_FAILED);
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error);
      const errorMsg = error.response?.data?.message || ERROR_MESSAGES.LOGIN_FAILED;
      setNotification({ message: errorMsg, type: 'error' });
      localStorage.removeItem('Token');
    } finally {
      setIsLoading(false);
    }
  }, [loginData, navigate, handleClose]);

  // Handle register submit
  const handleRegisterSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setNotification({ message: '', type: '' });

    if (registerData.password !== registerData.confirmPassword) {
      setNotification({ message: ERROR_MESSAGES.PASSWORDS_MISMATCH, type: 'error' });
      setIsLoading(false);
      return;
    }

    if (registerData.password.length < 6) {
      setNotification({ message: ERROR_MESSAGES.PASSWORD_TOO_SHORT, type: 'error' });
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.post('/auth/register', {
        firstName: registerData.firstName,
        lastName: registerData.lastName,
        email: registerData.email,
        phone: registerData.phone,
        password: registerData.password,
        role: registerData.role,
      });
      console.log('Register response:', response.data);
      const { success, message, data } = response.data;
      if (success) {
        setUserId(data.id);
        setShowOtpPopup(true);
        setNotification({ message: message, type: 'success' });
      } else {
        throw new Error(message || ERROR_MESSAGES.REGISTRATION_FAILED);
      }
    } catch (error) {
      console.error('Registration error:', error.response?.data || error);
      const errorMsg = error.response?.data?.message || ERROR_MESSAGES.REGISTRATION_FAILED;
      if (errorMsg.includes('Email already registered and verified')) {
        setNotification({ message: ERROR_MESSAGES.EMAIL_ALREADY_VERIFIED, type: 'error' });
        setTimeout(() => setIsLogin(true), 3000);
      } else {
        setNotification({ message: errorMsg, type: 'error' });
      }
    } finally {
      setIsLoading(false);
    }
  }, [registerData]);

  // Handle OTP submit
  const handleOtpSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setNotification({ message: '', type: '' });

    if (!/^\d{6}$/.test(otp)) {
      setNotification({ message: ERROR_MESSAGES.INVALID_OTP, type: 'error' });
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.post('/auth/verify-email', {
        email: registerData.email,
        otp,
      });
      console.log('OTP verification response:', response.data);
      if (response.data.success) {
        localStorage.setItem('Token', response.data.data?.token || ''); // Backend may not return token
        setNotification({ message: 'Email verified successfully! Please log in.', type: 'success' });
        setShowOtpPopup(false);
        setOtp('');
        setRegisterData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: '',
          role: 'student',
        });
        setUserId('');
        setTimeout(() => {
          setIsLogin(true);
          setNotification({ message: '', type: '' });
        }, 2000);
      } else {
        throw new Error(response.data.message || ERROR_MESSAGES.OTP_VERIFICATION_FAILED);
      }
    } catch (error) {
      console.error('OTP verification error:', error.response?.data || error);
      const errorMsg = error.response?.data?.message || ERROR_MESSAGES.OTP_VERIFICATION_FAILED;
      setNotification({ message: errorMsg, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  }, [otp, registerData.email]);

  // Handle resend OTP
  const handleResendOtp = useCallback(async () => {
    setIsLoading(true);
    setNotification({ message: '', type: '' });

    try {
      const response = await api.post('/auth/resend-otp', {
        email: registerData.email,
      });
      console.log('Resend OTP response:', response.data);
      const { success, message, data } = response.data;
      if (success) {
        setUserId(data.id);
        setShowOtpPopup(true);
        setNotification({ message: message, type: 'success' });
      } else {
        throw new Error(message || 'Failed to resend OTP.');
      }
    } catch (error) {
      console.error('Resend OTP error:', error.response?.data || error);
      const errorMsg = error.response?.data?.message || 'Failed to resend OTP.';
      setNotification({ message: errorMsg, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  }, [registerData.email]);

  if (!isPopupVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
      <Modal
        isOpen={!!notification.message}
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: '', type: '' })}
      />
      <motion.div
        className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 w-7 h-7 sm:w-8 sm:h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
        >
          <FaTimes className="text-gray-600 text-sm sm:text-base" />
        </button>

        {showOtpPopup ? (
          <OtpForm
            otp={otp}
            setOtp={setOtp}
            handleOtpSubmit={handleOtpSubmit}
            handleResendOtp={handleResendOtp}
            isLoading={isLoading}
            email={registerData.email}
            setIsLogin={setIsLogin}
            setShowOtpPopup={setShowOtpPopup}
          />
        ) : (
          <div className="flex flex-col lg:flex-row">
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-teal-50 to-blue-50 p-6 lg:p-8 flex-col justify-center items-center relative">
              <div className="absolute top-4 lg:top-6 left-4 lg:left-6 bg-white rounded-full px-2 lg:px-3 py-1 shadow-sm">
                <div className="flex items-center text-xs lg:text-sm">
                  <FaRocket className="text-purple-500 mr-1" />
                  <span className="text-gray-700 font-medium">Career Switch</span>
                </div>
              </div>
              <div className="absolute top-16 lg:top-20 right-4 lg:right-6 bg-white rounded-full px-2 lg:px-3 py-1 shadow-sm">
                <div className="flex items-center text-xs lg:text-sm">
                  <FaGraduationCap className="text-blue-500 mr-1" />
                  <span className="text-gray-700 font-medium">Promotion</span>
                </div>
              </div>
              <div className="absolute bottom-16 lg:bottom-20 left-4 lg:left-6 bg-white rounded-full px-2 lg:px-3 py-1 shadow-sm">
                <div className="flex items-center text-xs lg:text-sm">
                  <FaStar className="text-green-500 mr-1" />
                  <span className="text-gray-700 font-medium">Salary Hike</span>
                </div>
              </div>
              <div className="relative">
                <div className="w-48 h-64 bg-gradient-to-b from-red-400 to-red-500 rounded-t-full relative overflow-hidden">
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-48 bg-white rounded-t-3xl shadow-lg">
                    <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
                      <div className="w-16 h-16 bg-gradient-to-b from-orange-300 to-orange-400 rounded-full relative">
                        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-orange-200 rounded-full">
                          <div className="absolute top-3 left-2 w-1 h-1 bg-black rounded-full"></div>
                          <div className="absolute top-3 right-2 w-1 h-1 bg-black rounded-full"></div>
                          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-3 h-1 border-b-2 border-black rounded-full"></div>
                        </div>
                        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-10 h-6 bg-black rounded-t-full"></div>
                      </div>
                    </div>
                    <div className="absolute top-28 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-blue-200 rounded-full border-2 border-gray-300"></div>
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-20 h-8 bg-gray-200 rounded"></div>
                  </div>
                  <div className="absolute bottom-0 left-4 w-0 h-0 border-l-8 border-r-8 border-b-16 border-l-transparent border-r-transparent border-b-red-600"></div>
                  <div className="absolute bottom-0 right-4 w-0 h-0 border-l-8 border-r-8 border-b-16 border-l-transparent border-r-transparent border-b-red-600"></div>
                </div>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-t from-yellow-400 via-orange-500 to-red-500 rounded-full opacity-80"></div>
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-t from-yellow-300 to-orange-400 rounded-full"></div>
              </div>
            </div>

            <div className="w-full lg:w-1/2 p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
              <h2 className="text-xl text-center sm:text-2xl font-semibold mb-2 text-center">Welcome to LMS!</h2>
              <div className="flex mb-4 sm:mb-6 justify-center">
                <button
                  className={`px-4 py-2 sm:px-6 sm:py-2 text-white rounded-l-md ${isLogin ? 'bg-teal-500' : 'bg-teal-300'} text-sm sm:text-base`}
                  onClick={() => setIsLogin(true)}
                >
                  LOGIN
                </button>
                <button
                  className={`px-4 py-2 sm:px-6 sm:py-2 text-white rounded-r-md ${!isLogin ? 'bg-teal-500' : 'bg-teal-300'} text-sm sm:text-base`}
                  onClick={() => setIsLogin(false)}
                >
                  REGISTER
                </button>
              </div>
              <div className="w-full max-w-xs sm:max-w-sm">
                {isLogin ? (
                  <LoginForm
                    loginData={loginData}
                    handleLoginChange={handleLoginChange}
                    handleLogin={handleLogin}
                    isLoading={isLoading}
                    showPassword={showPassword}
                    togglePassword={() => setShowPassword(!showPassword)}
                    setErrorMessage={(msg) => setNotification({ message: msg, type: 'error' })}
                  />
                ) : (
                  <RegisterForm
                    registerData={registerData}
                    handleRegisterChange={handleRegisterChange}
                    handleRegisterSubmit={handleRegisterSubmit}
                    isLoading={isLoading}
                    showPassword={showPassword}
                    togglePassword={() => setShowPassword(!showPassword)}
                  />
                )}
              </div>
              <div className="mt-8 text-center">
                <p className="text-xs text-gray-500">
                  By signing up, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default SignUpPopup;