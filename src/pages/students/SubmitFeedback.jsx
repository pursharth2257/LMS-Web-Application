import React, { useState } from 'react';
import StudentTemplate from './StudentTemplate';
import { FaCommentAlt, FaStar, FaThumbsUp, FaThumbsDown, FaPaperPlane, FaCheck } from 'react-icons/fa';

const SubmitFeedback = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedbackType, setFeedbackType] = useState('course');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, this would send the feedback data to a server
    setFeedbackSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFeedbackSubmitted(false);
      setRating(0);
      e.target.reset();
    }, 3000);
  };
  
  return (
    <StudentTemplate 
      title="Submit Feedback" 
      subtitle="Share your thoughts and help us improve your learning experience"
    >
      <div className="space-y-8">
        {/* Feedback Form */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          {feedbackSubmitted ? (
            <div className="text-center py-8">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FaCheck className="text-green-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Thank You for Your Feedback!</h3>
              <p className="text-gray-700">
                Your feedback has been submitted successfully. We appreciate your input and will use it to improve our services.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Share Your Feedback</h3>
              
              {/* Feedback Type Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What would you like to provide feedback on?
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    type="button"
                    onClick={() => setFeedbackType('course')}
                    className={`px-4 py-3 rounded-md text-sm font-medium text-left flex items-center ${
                      feedbackType === 'course'
                        ? 'bg-teal-50 border-2 border-teal-500 text-teal-700'
                        : 'bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <FaCommentAlt className={`mr-3 ${feedbackType === 'course' ? 'text-teal-600' : 'text-gray-500'}`} />
                    Course Content
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setFeedbackType('instructor')}
                    className={`px-4 py-3 rounded-md text-sm font-medium text-left flex items-center ${
                      feedbackType === 'instructor'
                        ? 'bg-teal-50 border-2 border-teal-500 text-teal-700'
                        : 'bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <FaCommentAlt className={`mr-3 ${feedbackType === 'instructor' ? 'text-teal-600' : 'text-gray-500'}`} />
                    Instructor
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setFeedbackType('platform')}
                    className={`px-4 py-3 rounded-md text-sm font-medium text-left flex items-center ${
                      feedbackType === 'platform'
                        ? 'bg-teal-50 border-2 border-teal-500 text-teal-700'
                        : 'bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <FaCommentAlt className={`mr-3 ${feedbackType === 'platform' ? 'text-teal-600' : 'text-gray-500'}`} />
                    Platform Experience
                  </button>
                </div>
              </div>
              
              {/* Course Selection (if course feedback) */}
              {feedbackType === 'course' && (
                <div className="mb-6">
                  <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-2">
                    Select Course
                  </label>
                  <select
                    id="course"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select a course</option>
                    <option value="web-dev">Web Development Fundamentals</option>
                    <option value="js-advanced">Advanced JavaScript</option>
                    <option value="react">React.js Masterclass</option>
                    <option value="data-science">Data Science Fundamentals</option>
                    <option value="ui-ux">UI/UX Design Principles</option>
                  </select>
                </div>
              )}
              
              {/* Instructor Selection (if instructor feedback) */}
              {feedbackType === 'instructor' && (
                <div className="mb-6">
                  <label htmlFor="instructor" className="block text-sm font-medium text-gray-700 mb-2">
                    Select Instructor
                  </label>
                  <select
                    id="instructor"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select an instructor</option>
                    <option value="john-doe">John Doe</option>
                    <option value="jane-smith">Jane Smith</option>
                    <option value="robert-johnson">Robert Johnson</option>
                    <option value="emily-davis">Emily Davis</option>
                    <option value="michael-brown">Michael Brown</option>
                  </select>
                </div>
              )}
              
              {/* Rating */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Overall Rating
                </label>
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => {
                    const ratingValue = index + 1;
                    return (
                      <button
                        type="button"
                        key={index}
                        className={`text-2xl mr-1 focus:outline-none ${
                          (hoverRating || rating) >= ratingValue ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                        onClick={() => setRating(ratingValue)}
                        onMouseEnter={() => setHoverRating(ratingValue)}
                        onMouseLeave={() => setHoverRating(0)}
                      >
                        <FaStar />
                      </button>
                    );
                  })}
                  <span className="ml-2 text-sm text-gray-600">
                    {rating ? `${rating} out of 5 stars` : 'Click to rate'}
                  </span>
                </div>
              </div>
              
              {/* What did you like */}
              <div className="mb-6">
                <label htmlFor="liked" className="block text-sm font-medium text-gray-700 mb-2">
                  What did you like?
                </label>
                <textarea
                  id="liked"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Share what you enjoyed or found helpful..."
                ></textarea>
              </div>
              
              {/* What could be improved */}
              <div className="mb-6">
                <label htmlFor="improvements" className="block text-sm font-medium text-gray-700 mb-2">
                  What could be improved?
                </label>
                <textarea
                  id="improvements"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Share your suggestions for improvement..."
                ></textarea>
              </div>
              
              {/* Additional Comments */}
              <div className="mb-6">
                <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Comments (Optional)
                </label>
                <textarea
                  id="comments"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Any other thoughts or feedback you'd like to share..."
                ></textarea>
              </div>
              
              {/* Would you recommend */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Would you recommend this {feedbackType === 'course' ? 'course' : feedbackType === 'instructor' ? 'instructor' : 'platform'} to others?
                </label>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <FaThumbsUp className="mr-2 text-teal-600" />
                    Yes
                  </button>
                  <button
                    type="button"
                    className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <FaThumbsDown className="mr-2 text-red-600" />
                    No
                  </button>
                </div>
              </div>
              
              {/* Submit Button */}
              <button
                type="submit"
                className="bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition-colors flex items-center justify-center"
              >
                <FaPaperPlane className="mr-2" />
                Submit Feedback
              </button>
            </form>
          )}
        </div>
        
        {/* Why Feedback Matters */}
        <div className="bg-teal-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Why Your Feedback Matters</h3>
          <p className="text-gray-700 mb-4">
            At Brain Bridge, we're committed to providing the best learning experience possible. Your feedback helps us:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Improve course content and teaching methods</li>
            <li>Enhance platform features and user experience</li>
            <li>Address issues and concerns promptly</li>
            <li>Develop new courses based on student interests</li>
            <li>Recognize and reward outstanding instructors</li>
          </ul>
          <p className="text-gray-700 mt-4">
            We review all feedback carefully and use it to make meaningful improvements. Thank you for helping us create a better learning environment for everyone!
          </p>
        </div>
        
        {/* Previous Feedback */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Previous Feedback</h3>
          <div className="border-b border-gray-200 pb-4 mb-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-medium text-gray-900">Web Development Fundamentals</h4>
                <p className="text-sm text-gray-600">Submitted on June 10, 2024</p>
              </div>
              <div className="flex text-yellow-400">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
            </div>
            <p className="text-gray-700">
              "Great course! The content was well-structured and the instructor explained complex concepts in a way that was easy to understand. The practical exercises were particularly helpful."
            </p>
          </div>
          
          <div>
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-medium text-gray-900">Advanced JavaScript</h4>
                <p className="text-sm text-gray-600">Submitted on May 15, 2024</p>
              </div>
              <div className="flex text-yellow-400">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <span className="text-gray-300"><FaStar /></span>
              </div>
            </div>
            <p className="text-gray-700">
              "The course covered advanced topics thoroughly. I would have appreciated more real-world examples, but overall it was very informative and helped me improve my JavaScript skills."
            </p>
          </div>
        </div>
      </div>
    </StudentTemplate>
  );
};

export default SubmitFeedback;