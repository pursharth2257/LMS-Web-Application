import { FaStar } from 'react-icons/fa';

// Desktop Filters Component
const DesktopFilters = ({ filters, handleFilterChange, clearAllFilters }) => (
  <div className="hidden md:block w-64 flex-shrink-0 mr-8 courses-sidebar">
    <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm sticky top-24">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-gray-900">Filters</h2>
        <button
          onClick={clearAllFilters}
          className="text-sm text-teal-600 hover:text-teal-700 font-medium"
        >
          Clear All
        </button>
      </div>
      <div className="space-y-6">
       

        {/* Price Filter */}
        <div>
          <h3 className="font-medium text-gray-900 mb-2">Price</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded text-teal-600 focus:ring-teal-500"
                checked={filters.price.free}
                onChange={() => handleFilterChange('price', 'free')}
              />
              <span className="ml-2 text-gray-700">Free</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded text-teal-600 focus:ring-teal-500"
                checked={filters.price.paid}
                onChange={() => handleFilterChange('price', 'paid')}
              />
              <span className="ml-2 text-gray-700">Paid</span>
            </label>
          </div>
        </div>

        {/* Level filters  */}
        <div>
          <h3 className="font-medium text-gray-900 mb-2">Level</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded text-teal-600 focus:ring-teal-500"
                checked={filters.level.beginner}
                onChange={() => handleFilterChange('level', 'beginner')}
              />
              <span className="ml-2 text-gray-700">Beginner</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded text-teal-600 focus:ring-teal-500"
                checked={filters.level.intermediate}
                onChange={() => handleFilterChange('level', 'intermediate')}
              />
              <span className="ml-2 text-gray-700">Intermediate</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded text-teal-600 focus:ring-teal-500"
                checked={filters.level.advanced}
                onChange={() => handleFilterChange('level', 'advanced')}
              />
              <span className="ml-2 text-gray-700">Advanced</span>
            </label>
          </div>
        </div>
         {/* Language Filter Section */}
        <div>
          <h3 className="font-medium text-gray-900 mb-2">Language</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded text-teal-600 focus:ring-teal-500"
                checked={filters.language?.english || false}
                onChange={() => handleFilterChange('language', 'english')}
              />
              <span className="ml-2 text-gray-700">English</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded text-teal-600 focus:ring-teal-500"
                checked={filters.language?.hindi || false}
                onChange={() => handleFilterChange('language', 'hindi')}
              />
              <span className="ml-2 text-gray-700">Hindi</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded text-teal-600 focus:ring-teal-500"
                checked={filters.language?.other || false}
                onChange={() => handleFilterChange('language', 'other')}
              />
              <span className="ml-2 text-gray-700">Other</span>
            </label>
          </div>
        </div>

        {/* Duration Filter */}
        <div>
          <h3 className="font-medium text-gray-900 mb-2">Duration</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded text-teal-600 focus:ring-teal-500"
                checked={filters.duration.short}
                onChange={() => handleFilterChange('duration', 'short')}
              />
              <span className="ml-2 text-gray-700">0-10 hours</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded text-teal-600 focus:ring-teal-500"
                checked={filters.duration.medium}
                onChange={() => handleFilterChange('duration', 'medium')}
              />
              <span className="ml-2 text-gray-700">10-20 hours</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded text-teal-600 focus:ring-teal-500"
                checked={filters.duration.long}
                onChange={() => handleFilterChange('duration', 'long')}
              />
              <span className="ml-2 text-gray-700">20+ hours</span>
            </label>
          </div>
        </div>

        {/* Rating filters */}
        <div>
          <h3 className="font-medium text-gray-900 mb-2">Rating</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded text-teal-600 focus:ring-teal-500"
                checked={filters.rating.high}
                onChange={() => handleFilterChange('rating', 'high')}
              />
              <span className="ml-2 text-gray-700 flex items-center">
                4.5 & up <FaStar className="text-yellow-400 ml-1" size={12} />
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded text-teal-600 focus:ring-teal-500"
                checked={filters.rating.good}
                onChange={() => handleFilterChange('rating', 'good')}
              />
              <span className="ml-2 text-gray-700 flex items-center">
                4.0 & up <FaStar className="text-yellow-400 ml-1" size={12} />
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded text-teal-600 focus:ring-teal-500"
                checked={filters.rating.average}
                onChange={() => handleFilterChange('rating', 'average')}
              />
              <span className="ml-2 text-gray-700 flex items-center">
                3.5 & up <FaStar className="text-yellow-400 ml-1" size={12} />
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default DesktopFilters;