import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center justify-center text-center">
        <h1 className="text-9xl font-bold text-teal-600 mb-4">404</h1>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

      </div>
    </div>
  );
};

export default NotFound;