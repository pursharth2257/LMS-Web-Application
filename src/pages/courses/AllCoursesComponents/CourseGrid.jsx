import { FaStar, FaRegClock, FaUserGraduate, FaBookmark } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import DefaultImageCourse from '../../../assets/DefaultImageCourse.webp'; 

// Course Grid Component
const CourseGrid = ({ currentCourses, coursesScrollRef, searchQuery, setSearchQuery, bookmarkedCourses, handleBookmark }) => {
  // Debug course object structure
  console.log('CourseGrid courses:', currentCourses);

  // Helper to parse price strings (e.g., "₹1000" -> 1000, "Free" -> 0)
  const parsePrice = (priceStr) => {
    if (priceStr === 'Free') return 0;
    if (typeof priceStr === 'string' && priceStr.startsWith('₹')) {
      return parseFloat(priceStr.replace('₹', '')) || 0;
    }
    return parseFloat(priceStr) || 0;
  };

  return (
    <div className="relative h-[600px]">
      <div
        ref={coursesScrollRef}
        className="h-full overflow-y-auto pr-4 scrollbar-hide courses-scrollable-container"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
          paddingRight: '10px'
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-4">
          {currentCourses.map(course => {
            const originalPriceNum = parsePrice(course.originalPrice);
            const discountPriceNum = parsePrice(course.price);
            const hasDiscount = course.price && originalPriceNum > 0 && discountPriceNum < originalPriceNum;

            return (
              <div key={course.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-200">
                <div className="relative pb-[56.25%]">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleBookmark(course.id);
                    }}
                    className={`absolute top-2 right-2 p-2 rounded-full z-10 ${
                      bookmarkedCourses.includes(course.id)
                        ? 'text-yellow-500 bg-white'
                        : 'text-gray-400 bg-white hover:text-yellow-500'
                    }`}
                  >
                    <FaBookmark />
                  </button>
                  <img
    src={course.image || DefaultImageCourse}
    alt={course.title}
    className="absolute h-full w-full object-cover"
    onError={(e) => {
      e.target.src = DefaultImageCourse;
      e.target.onerror = null;
    }}
  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2">{course.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{course.description}</p>
                  <div className="flex items-center mb-3">
                    <p className="text-sm text-gray-700">By <span className="font-medium">{course.instructor}</span></p>
                  </div>
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      <span className="text-yellow-400 font-bold mr-1">{course.rating}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={`w-3 h-3 ${i < Math.floor(course.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 ml-2">({course.reviews})</span>
                    <span className="text-xs text-gray-500 ml-4">{course.students.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500 mb-4">
                    <div className="flex items-center mr-3">
                      <FaRegClock className="mr-1" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <FaUserGraduate className="mr-1" />
                      <span>{course.level}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-gray-900">
                        {course.originalPrice === 'Free' ? 'Free' : `₹${course.price ? originalPriceNum - discountPriceNum : originalPriceNum}`}
                      </span>
                      {hasDiscount && (
                        <>
                          <span className="text-gray-500 text-sm line-through ml-2">₹{originalPriceNum}</span>
                        </>
                      )}
                    </div>
                    <Link
                      to={`/courses/${course.id}`}
                      className="bg-teal-600 text-white px-4 py-2 rounded text-sm hover:bg-teal-700 transition-colors inline-block text-center"
                    >
                      View Course
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {currentCourses.length === 0 && (
        <div className="bg-white p-8 rounded-lg text-center">
          <div className="max-w-md mx-auto">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              {searchQuery ? `No results found for "${searchQuery}"` : 'No courses found'}
            </h3>
            <p className="text-gray-600 mb-4">
              {searchQuery
                ? 'Try searching with different keywords or check your spelling'
                : 'Try adjusting your filter criteria'
              }
            </p>
            {searchQuery && (
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Suggestions:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {['React', 'JavaScript', 'Python', 'Data Science', 'Web Development'].map(suggestion => (
                    <button
                      key={suggestion}
                      onClick={() => setSearchQuery(suggestion)}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseGrid;