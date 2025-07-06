import React from 'react';
import { FaTimes } from 'react-icons/fa';

const ComingSoonPopup = ({ isOpen, onClose, featureName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with blur effect and opacity */}
      <div
        className="absolute inset-0 bg-white bg-opacity-30 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Popup Content */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-sm sm:max-w-md w-full p-4 sm:p-6 transform transition-all duration-300 scale-100">
        
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <FaTimes className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        
        {/* Content */}
        <div className="text-center">
        
          <div className="mx-auto flex items-center justify-center h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-teal-100 mb-3 sm:mb-4">
            <svg className="h-6 w-6 sm:h-8 sm:w-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

        
          <h3 className="text-base sm:text-lg font-normal text-gray-900 mb-2">
            Coming Soon!
          </h3>

          
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
            {featureName ? `${featureName} is` : 'This feature is'} currently under development.
            We're working hard to bring you this exciting new feature soon!
          </p>

          
          <button
            onClick={onClose}
            className="w-full bg-teal-600 text-white px-4 py-2 sm:py-3 rounded-md hover:bg-teal-700 transition-colors font-normal text-sm sm:text-base"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPopup;
