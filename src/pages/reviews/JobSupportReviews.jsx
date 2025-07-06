import React from 'react';
import { Link } from 'react-router-dom';

const JobSupportReviews = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">


        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-teal-600 mb-6">
            Job Support Reviews
          </h1>



          {/* Navigation Menu */}
          <div className="bg-teal-600 rounded-lg p-1 mb-8">
            <div className="flex flex-wrap gap-1 text-sm">
              <Link to="/about" className="px-4 py-2 text-white hover:bg-teal-700 rounded transition-colors">About Henry Harvin</Link>
              <Link to="/media" className="px-4 py-2 text-white hover:bg-teal-700 rounded transition-colors">Henry Harvin in Media</Link>
              <Link Link to="/affiliations" className="px-4 py-2 text-white hover:bg-teal-700 rounded transition-colors">Our Affiliations</Link>
              <Link to="/customers" className="px-4 py-2 text-white hover:bg-teal-700 rounded transition-colors">Our Customers</Link>
              <Link to="/csr" className="px-4 py-2 text-white hover:bg-teal-700 rounded transition-colors">Our CSR Activities</Link>
              <Link Link to="/gallery" className="px-4 py-2 text-white hover:bg-teal-700 rounded transition-colors">Our Gallery</Link>
              <Link to="/reviews/participant" className="px-4 py-2 text-white hover:bg-teal-700 rounded transition-colors">Participant Reviews</Link>
              <Link to="/reviews/corporate" className="px-4 py-2 text-white hover:bg-teal-700 rounded transition-colors">Corporate Training Reviews</Link>
              <Link to="/reviews/college" className="px-4 py-2 text-white hover:bg-teal-700 rounded transition-colors">College Training Reviews</Link>
              <span className="px-4 py-2 bg-white text-teal-600 rounded font-medium">Job Support Reviews</span>
            </div>
          </div>
        </div>

        {/* Job Support Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Card 1 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200">
            {/* Image Placeholder */}
            <div className="h-48 bg-gray-100 flex items-center justify-center border-b border-gray-200">
              <div className="text-center">
                <div className="text-4xl text-gray-400 mb-2">📷</div>
                <p className="text-gray-500 text-sm">Add Image Here</p>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Job Support Review 1</h3>
              <p className="text-gray-600 text-sm mb-4">
                Add your job support review content here. This could include testimonials, success stories, or placement details.
              </p>

              {/* Badge */}
              <div className="flex justify-center">
                <span className="bg-teal-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                  Job Support
                </span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200">
            {/* Image Placeholder */}
            <div className="h-48 bg-gray-100 flex items-center justify-center border-b border-gray-200">
              <div className="text-center">
                <div className="text-4xl text-gray-400 mb-2">📷</div>
                <p className="text-gray-500 text-sm">Add Image Here</p>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Job Support Review 2</h3>
              <p className="text-gray-600 text-sm mb-4">
                Add your job support review content here. This could include testimonials, success stories, or placement details.
              </p>

              {/* Badge */}
              <div className="flex justify-center">
                <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                  Success Story
                </span>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200">
            {/* Image Placeholder */}
            <div className="h-48 bg-gray-100 flex items-center justify-center border-b border-gray-200">
              <div className="text-center">
                <div className="text-4xl text-gray-400 mb-2">📷</div>
                <p className="text-gray-500 text-sm">Add Image Here</p>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Job Support Review 3</h3>
              <p className="text-gray-600 text-sm mb-4">
                Add your job support review content here. This could include testimonials, success stories, or placement details.
              </p>

              {/* Badge */}
              <div className="flex justify-center">
                <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                  Placement
                </span>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200">
            {/* Image Placeholder */}
            <div className="h-48 bg-gray-100 flex items-center justify-center border-b border-gray-200">
              <div className="text-center">
                <div className="text-4xl text-gray-400 mb-2">📷</div>
                <p className="text-gray-500 text-sm">Add Image Here</p>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Job Support Review 4</h3>
              <p className="text-gray-600 text-sm mb-4">
                Add your job support review content here. This could include testimonials, success stories, or placement details.
              </p>

              {/* Badge */}
              <div className="flex justify-center">
                <span className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                  Career Growth
                </span>
              </div>
            </div>
          </div>

          {/* Card 5 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200">
            {/* Image Placeholder */}
            <div className="h-48 bg-gray-100 flex items-center justify-center border-b border-gray-200">
              <div className="text-center">
                <div className="text-4xl text-gray-400 mb-2">�</div>
                <p className="text-gray-500 text-sm">Add Image Here</p>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Job Support Review 5</h3>
              <p className="text-gray-600 text-sm mb-4">
                Add your job support review content here. This could include testimonials, success stories, or placement details.
              </p>

              {/* Badge */}
              <div className="flex justify-center">
                <span className="bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                  Interview Success
                </span>
              </div>
            </div>
          </div>

          {/* Card 6 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200">
            {/* Image Placeholder */}
            <div className="h-48 bg-gray-100 flex items-center justify-center border-b border-gray-200">
              <div className="text-center">
                <div className="text-4xl text-gray-400 mb-2">📷</div>
                <p className="text-gray-500 text-sm">Add Image Here</p>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Job Support Review 6</h3>
              <p className="text-gray-600 text-sm mb-4">
                Add your job support review content here. This could include testimonials, success stories, or placement details.
              </p>

              {/* Badge */}
              <div className="flex justify-center">
                <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                  Testimonial
                </span>
              </div>
            </div>
          </div>

          {/* Card 7 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200">
            {/* Image Placeholder */}
            <div className="h-48 bg-gray-100 flex items-center justify-center border-b border-gray-200">
              <div className="text-center">
                <div className="text-4xl text-gray-400 mb-2">📷</div>
                <p className="text-gray-500 text-sm">Add Image Here</p>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Job Support Review 7</h3>
              <p className="text-gray-600 text-sm mb-4">
                Add your job support review content here. This could include testimonials, success stories, or placement details.
              </p>

              {/* Badge */}
              <div className="flex justify-center">
                <span className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                  Skill Development
                </span>
              </div>
            </div>
          </div>

          {/* Card 8 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200">
            {/* Image Placeholder */}
            <div className="h-48 bg-gray-100 flex items-center justify-center border-b border-gray-200">
              <div className="text-center">
                <div className="text-4xl text-gray-400 mb-2">📷</div>
                <p className="text-gray-500 text-sm">Add Image Here</p>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Job Support Review 8</h3>
              <p className="text-gray-600 text-sm mb-4">
                Add your job support review content here. This could include testimonials, success stories, or placement details.
              </p>

              {/* Badge */}
              <div className="flex justify-center">
                <span className="bg-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                  Mentorship
                </span>
              </div>
            </div>
          </div>

          {/* Card 9 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200">
            {/* Image Placeholder */}
            <div className="h-48 bg-gray-100 flex items-center justify-center border-b border-gray-200">
              <div className="text-center">
                <div className="text-4xl text-gray-400 mb-2">📷</div>
                <p className="text-gray-500 text-sm">Add Image Here</p>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Job Support Review 9</h3>
              <p className="text-gray-600 text-sm mb-4">
                Add your job support review content here. This could include testimonials, success stories, or placement details.
              </p>

              {/* Badge */}
              <div className="flex justify-center">
                <span className="bg-yellow-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                  Achievement
                </span>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default JobSupportReviews;