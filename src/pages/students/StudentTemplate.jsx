import React from 'react';
import { Link } from 'react-router-dom';

const StudentTemplate = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{title}</h1>
          {subtitle && <p className="text-gray-600 text-sm sm:text-base">{subtitle}</p>}
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default StudentTemplate;