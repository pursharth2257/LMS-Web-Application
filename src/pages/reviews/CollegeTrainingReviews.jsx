import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import Pagination from '../../components/Pagination';

// College training reviews data
const collegeTrainingReviews = [
  {
    id: 1,
    collegeName: "Indian Institute of Technology Ropar",
    logo: "https://via.placeholder.com/120x120/1e40af/ffffff?text=IIT",
    description: "Premier engineering institute known for innovation and research excellence",
    location: "Punjab, India",
    category: "Engineering",
    type: "IIT",
    established: "2008"
  },
  {
    id: 2,
    collegeName: "K. J. Somaiya College of Engineering Mumbai",
    logo: "https://via.placeholder.com/120x120/dc2626/ffffff?text=KJS",
    description: "Leading engineering college with strong industry connections",
    location: "Mumbai, Maharashtra",
    category: "Engineering",
    type: "Private",
    established: "1983"
  },
  {
    id: 3,
    collegeName: "Lovely Professional University",
    logo: "https://via.placeholder.com/120x120/f59e0b/ffffff?text=LPU",
    description: "Multi-disciplinary university offering diverse programs",
    location: "Punjab, India",
    category: "University",
    type: "Private",
    established: "2005"
  },
  {
    id: 4,
    collegeName: "Delhi Technological University",
    logo: "https://via.placeholder.com/120x120/059669/ffffff?text=DTU",
    description: "Premier technical university in the capital",
    location: "Delhi, India",
    category: "Engineering",
    type: "Government",
    established: "1941"
  },
  {
    id: 5,
    collegeName: "Vellore Institute of Technology",
    logo: "https://via.placeholder.com/120x120/7c3aed/ffffff?text=VIT",
    description: "Leading private engineering institute",
    location: "Vellore, Tamil Nadu",
    category: "Engineering",
    type: "Private",
    established: "1984"
  },
  {
    id: 6,
    collegeName: "Manipal Institute of Technology",
    logo: "https://via.placeholder.com/120x120/ea580c/ffffff?text=MIT",
    description: "Renowned engineering college with global recognition",
    location: "Manipal, Karnataka",
    category: "Engineering",
    type: "Private",
    established: "1957"
  },
  {
    id: 7,
    collegeName: "Birla Institute of Technology Mesra",
    logo: "https://via.placeholder.com/120x120/0891b2/ffffff?text=BIT",
    description: "Prestigious technical institute with excellent placement record",
    location: "Ranchi, Jharkhand",
    category: "Engineering",
    type: "Private",
    established: "1955"
  },
  {
    id: 8,
    collegeName: "SRM Institute of Science and Technology",
    logo: "https://via.placeholder.com/120x120/dc2626/ffffff?text=SRM",
    description: "Leading university with strong research focus",
    location: "Chennai, Tamil Nadu",
    category: "University",
    type: "Private",
    established: "1985"
  },
  {
    id: 9,
    collegeName: "Amity University Noida",
    logo: "https://via.placeholder.com/120x120/7c2d12/ffffff?text=AU",
    description: "Multi-campus university with diverse academic programs",
    location: "Noida, Uttar Pradesh",
    category: "University",
    type: "Private",
    established: "2005"
  }
];

const CollegeTrainingReviews = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationData, setPaginationData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredReviews, setFilteredReviews] = useState(collegeTrainingReviews);

  // Search function
  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = collegeTrainingReviews.filter(college =>
      college.collegeName.toLowerCase().includes(term.toLowerCase()) ||
      college.location.toLowerCase().includes(term.toLowerCase()) ||
      college.type.toLowerCase().includes(term.toLowerCase()) ||
      college.category.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredReviews(filtered);
    setCurrentPage(1);
    setSearchParams({ page: '1' });
  };

  // Pagination function
  const getPaginatedReviews = (page = 1, itemsPerPage = 9) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = filteredReviews.slice(startIndex, endIndex);

    return {
      reviews: paginatedData,
      totalPages: Math.ceil(filteredReviews.length / itemsPerPage),
      currentPage: page,
      totalReviews: filteredReviews.length,
      hasNextPage: endIndex < filteredReviews.length,
      hasPrevPage: page > 1
    };
  };

  useEffect(() => {
    const page = parseInt(searchParams.get('page')) || 1;
    setCurrentPage(page);
    const data = getPaginatedReviews(page, 9);
    setPaginationData(data);
  }, [searchParams, filteredReviews]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSearchParams({ page: page.toString() });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!paginationData) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading reviews...</p>
        </div>
      </div>
    );
  }

  const { reviews, totalPages } = paginationData;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">


        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-teal-600 mb-6">
            College Training Reviews
          </h1>



          {/* Navigation Menu */}
          <div className="bg-teal-600 rounded-lg p-1 mb-8">
            <div className="flex flex-wrap gap-1 text-sm">
              <Link to="/about" className="px-4 py-2 text-white hover:bg-teal-700 rounded transition-colors">About Henry Harvin</Link>
              <Link to="/media" className="px-4 py-2 text-white hover:bg-teal-700 rounded transition-colors">Henry Harvin in Media</Link>
              <Link to="/affiliations" className="px-4 py-2 text-white hover:bg-teal-700 rounded transition-colors">Our Affiliations</Link>
              <Link to="/customers" className="px-4 py-2 text-white hover:bg-teal-700 rounded transition-colors">Our Customers</Link>
              <Link to="/csr" className="px-4 py-2 text-white hover:bg-teal-700 rounded transition-colors">Our CSR Activities</Link>
              <Link to="/gallery" className="px-4 py-2 text-white hover:bg-teal-700 rounded transition-colors">Our Gallery</Link>
              <Link to="/reviews/participant" className="px-4 py-2 text-white hover:bg-teal-700 rounded transition-colors">Participant Reviews</Link>
              <Link to="/reviews/corporate" className="px-4 py-2 text-white hover:bg-teal-700 rounded transition-colors">Corporate Training Reviews</Link>
              <span className="px-4 py-2 bg-white text-teal-600 rounded font-medium">College Training Reviews</span>
              <Link to="/reviews/job-support" className="px-4 py-2 text-white hover:bg-teal-700 rounded transition-colors">Job Support Reviews</Link>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="mb-8">
          <div className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search colleges by name, location, or type..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full px-4 py-3 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Search Results Info */}
          {searchTerm && (
            <div className="text-center mt-4">
              <p className="text-gray-600">
                Found {filteredReviews.length} college{filteredReviews.length !== 1 ? 's' : ''} matching "{searchTerm}"
              </p>
            </div>
          )}
        </div>

        {/* College Training Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {reviews.map((college) => (
            <div key={college.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200">
              {/* College Logo Section */}
              <div className="p-6 text-center bg-gray-50">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-200">
                  <img
                    src={college.logo}
                    alt={`${college.collegeName} logo`}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                </div>
                <h3 className="text-teal-600 text-lg font-bold text-center leading-tight">
                  {college.collegeName}
                </h3>
              </div>

              {/* College Details */}
              <div className="p-6">
                <div className="mb-4">
                  <p className="text-gray-700 text-sm mb-3 leading-relaxed">
                    {college.description}
                  </p>
                  <div className="space-y-2">
                    <p className="text-gray-600 text-sm">
                      <span className="font-medium">📍 Location:</span> {college.location}
                    </p>
                    <p className="text-gray-600 text-sm">
                      <span className="font-medium">🏛️ Type:</span> {college.type}
                    </p>
                    <p className="text-gray-600 text-sm">
                      <span className="font-medium">📅 Established:</span> {college.established}
                    </p>
                  </div>
                </div>

                {/* History Button */}
                <div className="flex justify-center">
                  <button className="bg-white border-2 border-orange-400 text-gray-700 px-8 py-2 rounded-md text-sm font-medium hover:bg-orange-50 transition-colors">
                    History
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mb-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>

        {/* Results Info */}
        <div className="text-center text-gray-600 mb-8">
          <p>
            Showing {((currentPage - 1) * 9) + 1} to {Math.min(currentPage * 9, paginationData.totalReviews)} of {paginationData.totalReviews} college training reviews
          </p>
        </div>


      </div>
    </div>
  );
};

export default CollegeTrainingReviews;