import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Payment = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    amount: '',
  });
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [processing, setProcessing] = useState(false);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch payment history from the API
  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const response = await axios.get('https://lms-backend-flwq.onrender.com/api/v1/payments/my-payments');
        if (response.data.success) {
          setPaymentHistory(response.data.data);
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
    setPaymentData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setNotification({ message: '', type: '' });
    try {
      // Simulated payment API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setNotification({ message: 'Payment processed successfully!', type: 'success' });
      setPaymentData({ cardNumber: '', expiry: '', cvv: '', amount: '' });
      setTimeout(() => navigate('/settings'), 2000);
    } catch (err) {
      setNotification({
        message: err.message || 'Payment failed. Please try again.',
        type: 'error',
      });
    } finally {
      setProcessing(false);
    }
  };

  const Notification = ({ message, type }) => {
    if (!message) return null;
    return (
      <div
        className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg text-white transition-opacity duration-300 z-50 max-w-sm ${
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
          <span className="text-sm">{message}</span>
          <button
            onClick={() => setNotification({ message: '', type: '' })}
            className={`ml-4 text-sm ${
              theme === 'dark' ? 'hover:text-gray-300' : 'hover:text-gray-200'
            }`}
          >
            ✕
          </button>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`min-h-screen font-sans p-4 sm:p-6 ${
        theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'
      }`}
    >
      <Notification message={notification.message} type={notification.type} />
      <div className="flex flex-col items-center space-y-8">
        {/* Payment Form */}
        <div
          className={`rounded-lg p-6 sm:p-8 shadow-lg w-full max-w-md ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h2
            className={`text-2xl font-bold mb-6 text-center ${
              theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
            }`}
          >
            Make a Payment
          </h2>
          <div className="space-y-4">
            <div>
              <label
                className={`block text-sm font-medium ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                } mb-1`}
              >
                Card Number
              </label>
              <input
                type="text"
                name="cardNumber"
                value={paymentData.cardNumber}
                onChange={handleChange}
                placeholder="1234 5678 9012 3456"
                className={`w-full border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 ${
                  theme === 'dark'
                    ? 'border-gray-600 bg-gray-800 text-gray-100 focus:ring-blue-500'
                    : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-400'
                }`}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  className={`block text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  } mb-1`}
                >
                  Expiry Date
                </label>
                <input
                  type="text"
                  name="expiry"
                  value={paymentData.expiry}
                  onChange={handleChange}
                  placeholder="MM/YY"
                  className={`w-full border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 ${
                    theme === 'dark'
                      ? 'border-gray-600 bg-gray-800 text-gray-100 focus:ring-blue-500'
                      : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-400'
                  }`}
                  required
                />
              </div>
              <div>
                <label
                  className={`block text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  } mb-1`}
                >
                  CVV
                </label>
                <input
                  type="text"
                  name="cvv"
                  value={paymentData.cvv}
                  onChange={handleChange}
                  placeholder="123"
                  className={`w-full border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 ${
                    theme === 'dark'
                      ? 'border-gray-600 bg-gray-800 text-gray-100 focus:ring-blue-500'
                      : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-400'
                  }`}
                  required
                />
              </div>
            </div>
            <div>
              <label
                className={`block text-sm font-medium ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                } mb-1`}
              >
                Amount (INR)
              </label>
              <input
                type="number"
                name="amount"
                value={paymentData.amount}
                onChange={handleChange}
                placeholder="0.00"
                className={`w-full border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 ${
                  theme === 'dark'
                    ? 'border-gray-600 bg-gray-800 text-gray-100 focus:ring-blue-500'
                    : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-400'
                }`}
                required
              />
            </div>
            <button
              onClick={handlePayment}
              className={`w-full py-2 rounded-lg text-sm font-medium text-white transition duration-200 ${
                theme === 'dark'
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-blue-500 hover:bg-blue-600'
              } ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={processing}
            >
              {processing ? 'Processing...' : 'Make Payment'}
            </button>
          </div>
        </div>

        {/* Payment History */}
        <div
          className={`rounded-lg p-6 sm:p-8 shadow-lg w-full max-w-5xl ${
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
            <p className="text-center text-gray-500">No payment history available.</p>
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
                      <td className="py-3 px-4">{payment.course.title}</td>
                      <td className="py-3 px-4">{payment.amount.toFixed(2)}</td>
                      <td
                        className={`py-3 px-4 font-medium ${
                          payment.status === 'completed'
                            ? 'text-green-500'
                            : 'text-red-500'
                        }`}
                      >
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </td>
                      <td className="py-3 px-4">
                        {new Date(payment.paymentDate).toLocaleString('en-IN', {
                          dateStyle: 'medium',
                          timeStyle: 'short',
                        })}
                      </td>
                      <td className="py-3 px-4 text-xs">{payment.transactionId}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;