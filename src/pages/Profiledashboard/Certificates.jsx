import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../contexts/ThemeContext';

const Certificates = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [certificates, setCertificates] = useState([]);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalError, setModalError] = useState(null);

  // Fetch all certificates for the student
  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const token = localStorage.getItem('Token');
        if (!token) {
          setError('Please log in to view certificates');
          navigate('/');
          return;
        }

        const response = await axios.get(
          'https://new-lms-backend-vmgr.onrender.com/api/v1/certificates/student/6819e09cc2c88d511699fdb9',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setCertificates(response.data.data);
        } else {
          setError('Failed to fetch certificates');
        }
      } catch (err) {
        if (err.response?.status === 401) {
          setError('Unauthorized: Invalid or expired token. Please log in again.');
          localStorage.removeItem('Token');
          navigate('/');
        } else {
          setError(`Error fetching certificates: ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, [navigate]);

  // Fetch single certificate by ID
  const CertificateById = async (certificateId) => {
    try {
      setModalError(null);
      const token = localStorage.getItem('Token');
      if (!token) {
        setModalError('Please log in to view certificate details');
        navigate('/');
        return;
      }

      const response = await axios.get(
        `https://new-lms-backend-vmgr.onrender.com/api/v1/certificates/${certificateId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setSelectedCertificate(response.data.data);
      } else {
        setModalError('Failed to fetch certificate details');
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setModalError('Unauthorized: Invalid or expired token. Please log in again.');
        localStorage.removeItem('Token');
        navigate('/');
      } else {
        setModalError(`Error fetching certificate details: ${err.message}`);
      }
    }
  };

  // Close modal
  const closeModal = () => {
    setSelectedCertificate(null);
    setModalError(null);
  };

  if (loading) {
    return (
      <div
        className={`container mx-auto p-4 min-h-screen transition-colors duration-300 ${
          theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
        }`}
      >
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`container mx-auto p-4 min-h-screen transition-colors duration-300 ${
          theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
        }`}
      >
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div
      className={`container mx-auto p-4 min-h-screen transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
      }`}
    >
      <div
        className={`p-6 rounded-lg shadow-sm ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <div className="flex justify-between mb-4">
          <h2
            className={`text-lg font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            Certificates
          </h2>
          <span
            className={`text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            {`1-${certificates.length} of ${certificates.length}`}
          </span>
        </div>
        <table className="w-full">
          <thead>
            <tr
              className={`border-b ${
                theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
              }`}
            >
              <th
                className={`text-left py-2 ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-900'
                }`}
              >
                Title
              </th>
              <th
                className={`text-left py-2 ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-900'
                }`}
              >
                Type
              </th>
              <th
                className={`text-left py-2 ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-900'
                }`}
              >
                Issued On
              </th>
              <th className="text-left py-2"></th>
            </tr>
          </thead>
          <tbody>
            {certificates.map((certificate) => (
              <tr
                key={certificate._id}
                className={`border-b ${
                  theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                }`}
              >
                <td
                  className={`py-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-800'
                  }`}
                >
                  {certificate.course.title}
                </td>
                <td
                  className={`py-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-800'
                  }`}
                >
                  Content Completion
                </td>
                <td
                  className={`py-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-800'
                  }`}
                >
                  {new Date(certificate.issueDate).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </td>
                <td className="py-2">
                  <a
                    href={certificate.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-3 py-1 rounded text-sm ${
                      theme === 'dark'
                        ? 'bg-blue-600 text-white hover:bg-blue-500'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    Download
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for certificate details */}
      {selectedCertificate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className={`p-6 rounded-lg shadow-lg max-w-lg w-full ${
              theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'
            }`}
          >
            <h3 className="text-lg font-bold mb-4">Certificate Details</h3>
            {modalError ? (
              <p className="text-red-500 mb-4">{modalError}</p>
            ) : (
              <div>
                <p>
                  <strong>Title:</strong> {selectedCertificate.course.title}
                </p>
                <p>
                  <strong>Student:</strong> {selectedCertificate.student.firstName}{' '}
                  {selectedCertificate.student.lastName}
                </p>
                <p>
                  <strong>Instructor:</strong> {selectedCertificate.instructor.firstName}{' '}
                  {selectedCertificate.instructor.lastName}
                </p>
                <p>
                  <strong>Issued On:</strong>{' '}
                  {new Date(selectedCertificate.issueDate).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
                <p>
                  <strong>Verification Code:</strong> {selectedCertificate.metadata.verificationCode}
                </p>
                <p>
                  <strong>Verification URL:</strong>{' '}
                  <a
                    href={selectedCertificate.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={theme === 'dark' ? 'text-blue-400' : 'text-blue-500'}
                  >
                    Verify
                  </a>
                </p>
                <p>
                  <strong>PDF:</strong>{' '}
                  <a
                    href={selectedCertificate.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={theme === 'dark' ? 'text-blue-400' : 'text-blue-500'}
                  >
                    Download PDF
                  </a>
                </p>
              </div>
            )}
            <button
              onClick={closeModal}
              className={`mt-4 px-4 py-2 rounded ${
                theme === 'dark'
                  ? 'bg-gray-700 text-gray-100 hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
              }`}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Certificates;