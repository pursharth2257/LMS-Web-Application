import { FaSearch } from 'react-icons/fa';

// Course Search Component
const CourseSearch = ({ searchQuery, setSearchQuery, filteredCourses, currentPage, totalPages }) => (
  <div className="mb-6">
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-2">
      <h2 className="text-xl font-bold text-gray-900">
        {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'} available
        {totalPages > 1 && (
          <span className="text-sm font-normal text-gray-600 ml-2">
            (Page {currentPage} of {totalPages})
          </span>
        )}
      </h2>
      <div className="max-w-md w-full md:w-auto relative">
        <input
          type="text"
          placeholder="Search for courses, instructors, or topics..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-700 transition-all duration-300"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center">
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="mr-2 p-1 hover:bg-gray-200 rounded-full transition-colors duration-200"
              title="Clear search"
            >
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          <FaSearch className={`text-gray-400 transition-colors duration-300 ${searchQuery ? 'text-teal-500' : ''}`} />
        </div>
      </div>
    </div>
    {searchQuery && (
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span>Search results for:</span>
        <span className="bg-teal-100 text-teal-800 px-2 py-1 rounded-md font-medium">
          "{searchQuery}"
        </span>
        <button
          onClick={() => setSearchQuery('')}
          className="text-teal-600 hover:text-teal-700 font-medium"
        >
          Clear search
        </button>
      </div>
    )}
  </div>
);

export default CourseSearch;