import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHeadset, FaCalendarAlt, FaBriefcase, FaGraduationCap, FaCertificate, FaCommentAlt } from 'react-icons/fa';

const StudentTemplate = ({ children, title, subtitle }) => {
  const location = useLocation();
  
  const sidebarLinks = [
    { path: '/students/dashboard', icon: <FaHeadset />, label: 'Customer Support' },
    { path: '/students/events', icon: <FaCalendarAlt />, label: 'Events' },
    { path: '/students/internship', icon: <FaBriefcase />, label: 'Internship Support' },
    { path: '/students/career', icon: <FaGraduationCap />, label: 'Career Support' },
    { path: '/students/certification', icon: <FaCertificate />, label: 'Certification' },
    { path: '/students/feedback', icon: <FaCommentAlt />, label: 'Submit Feedback' },
  ];
  
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link to="/" className="text-gray-700 hover:text-teal-600 text-sm font-medium">
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="text-gray-400 mx-2">/</span>
                  <span className="text-gray-700 text-sm font-medium">
                    Existing Students
                  </span>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <span className="text-gray-400 mx-2">/</span>
                  <span className="text-gray-500 text-sm font-medium">{title}</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Student Resources</h2>
              <p className="text-sm text-gray-600">Access all student services</p>
            </div>
            
            <nav className="p-4">
              <ul className="space-y-2">
                {sidebarLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                        location.pathname === link.path
                          ? 'bg-teal-50 text-teal-600'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-teal-600'
                      }`}
                    >
                      <span className="mr-3">{link.icon}</span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
              {subtitle && <p className="text-gray-600">{subtitle}</p>}
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentTemplate;