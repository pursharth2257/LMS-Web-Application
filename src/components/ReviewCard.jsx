import React from 'react';
import { FaComment } from 'react-icons/fa';

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="p-4 sm:p-6">
        
        <div className="mb-3 sm:mb-4">
          <h3 className="text-teal-600 text-sm sm:text-base font-bold mb-1 leading-tight">
            {review.name}, {review.rating} {review.course.includes('Henry Harvin') ? review.course.split('Henry Harvin')[1] : review.course}
          </h3>
        </div>

        {/* Course title */}
        <h4 className="text-teal-600 text-xs sm:text-sm font-bold mb-3 sm:mb-4 leading-snug">
          {review.course}
        </h4>

        {/* Review text */}
        <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5 text-justify">
          {review.review}
        </p>

        {/* Footer with avatar and category */}
        <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm sm:text-base">
              {review.avatar}
            </div>
            <span className="text-teal-600 text-xs font-medium">
              {review.category}
            </span>
          </div>
          <div className="w-6 h-6 bg-gray-600 rounded flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors">
            <FaComment className="text-white text-xs" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
