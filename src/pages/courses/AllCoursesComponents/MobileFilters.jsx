import { FaFilter, FaStar, FaChevronDown } from 'react-icons/fa';


// Mobile Filters Component
const MobileFilters = ({ showFilters, setShowFilters, filters, handleFilterChange, clearAllFilters }) => (
  <div className="md:hidden mb-6 courses-mobile-filters">
    <button
      onClick={() => setShowFilters(!showFilters)}
      className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-md shadow-sm"
    >
      <div className="flex items-center">
        <FaFilter className="text-gray-500 mr-2" />
        <span className="font-medium text-gray-700">Filters</span>
      </div>
      <FaChevronDown className={`text-gray-500 transition-transform ${showFilters ? 'transform rotate-180' : ''}`} />
    </button>
    {showFilters && (
      <div className="mt-2 p-4 bg-white border border-gray-200 rounded-md shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-gray-900">Filter Options</h3>
          <button
            onClick={clearAllFilters}
            className="text-sm text-teal-600 hover:text-teal-700 font-medium"
          >
            Clear All
          </button>
        </div>
        <div className="space-y-4">
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
    )}
  </div>
);

export default MobileFilters;