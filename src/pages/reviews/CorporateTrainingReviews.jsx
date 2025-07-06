import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import Pagination from '../../components/Pagination';

// Corporate training reviews data
const corporateTrainingReviews = [
  {
    id: 1,
    companyName: "Udaan",
    logo: "https://via.placeholder.com/80x80/dc2626/ffffff?text=U",
    trainingName: "Confidential",
    language: "English Language",
    type: "Virtual Training Udaan",
    category: "Training Session",
    bgColor: "bg-white"
  },
  {
    id: 2,
    companyName: "Globallogic",
    logo: "https://via.placeholder.com/80x80/ea580c/ffffff?text=G",
    trainingName: "Confidential",
    language: "Japanese Language N5 Demo Session",
    type: "Globallogic",
    category: "Training Session",
    bgColor: "bg-white"
  },
  {
    id: 3,
    companyName: "LPU",
    logo: "https://via.placeholder.com/80x80/f59e0b/ffffff?text=LPU",
    trainingName: "Confidential",
    language: "Instructional Design Virtual Training Session",
    type: "LPU",
    category: "Training Session",
    bgColor: "bg-white"
  },
  {
    id: 4,
    companyName: "TCS",
    logo: "https://via.placeholder.com/80x80/0891b2/ffffff?text=TCS",
    trainingName: "Confidential",
    language: "Data Science Corporate Training",
    type: "TCS Digital Transformation",
    category: "Training Session",
    bgColor: "bg-white"
  },
  {
    id: 5,
    companyName: "Infosys",
    logo: "https://via.placeholder.com/80x80/7c3aed/ffffff?text=INF",
    trainingName: "Confidential",
    language: "Cloud Computing AWS Training",
    type: "Infosys Cloud Solutions",
    category: "Training Session",
    bgColor: "bg-white"
  },
  {
    id: 6,
    companyName: "Wipro",
    logo: "https://via.placeholder.com/80x80/059669/ffffff?text=WIP",
    trainingName: "Confidential",
    language: "Agile Project Management Training",
    type: "Wipro Enterprise Solutions",
    category: "Training Session",
    bgColor: "bg-white"
  },
  {
    id: 7,
    companyName: "Accenture",
    logo: "https://via.placeholder.com/80x80/dc2626/ffffff?text=ACC",
    trainingName: "Confidential",
    language: "Digital Marketing Strategy Session",
    type: "Accenture Digital",
    category: "Training Session",
    bgColor: "bg-white"
  },
  {
    id: 8,
    companyName: "Cognizant",
    logo: "https://via.placeholder.com/80x80/2563eb/ffffff?text=COG",
    trainingName: "Confidential",
    language: "Machine Learning & AI Training",
    type: "Cognizant Technology Solutions",
    category: "Training Session",
    bgColor: "bg-white"
  },
  {
    id: 9,
    companyName: "HCL",
    logo: "https://via.placeholder.com/80x80/7c2d12/ffffff?text=HCL",
    trainingName: "Confidential",
    language: "Cybersecurity Awareness Training",
    type: "HCL Technologies",
    category: "Training Session",
    bgColor: "bg-white"
  },
  {
    id: 9,
    companyName: "HCL",
    logo: "https://via.placeholder.com/80x80/7c2d12/ffffff?text=HCL",
    trainingName: "Confidential",
    language: "Cybersecurity Awareness Training",
    type: "HCL Technologies",
    category: "Training Session",
    bgColor: "bg-white"
  }
];

const CorporateTrainingReviews = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationData, setPaginationData] = useState(null);

  // Pagination function
  const getPaginatedReviews = (page = 1, itemsPerPage = 9) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = corporateTrainingReviews.slice(startIndex, endIndex);

    return {
      reviews: paginatedData,
      totalPages: Math.ceil(corporateTrainingReviews.length / itemsPerPage),
      currentPage: page,
      totalReviews: corporateTrainingReviews.length,
      hasNextPage: endIndex < corporateTrainingReviews.length,
      hasPrevPage: page > 1
    };
  };

  useEffect(() => {
    const page = parseInt(searchParams.get('page')) || 1;
    setCurrentPage(page);
    const data = getPaginatedReviews(page, 9);
    setPaginationData(data);
  }, [searchParams]);

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
            Corporate Training Reviews
          </h1>

          {/* Featured Badge and Rating */}
          {/* <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="bg-white rounded-lg px-6 py-3 shadow-sm border border-gray-200">
                <span className="text-gray-600 text-sm">Featured</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-gray-900">Forbes</span>
                <div className="flex items-center bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-200">
                  <span className="text-lg font-bold text-gray-900 mr-2">4.8/5</span>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-lg">★</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-gray-900">HENRY</div>
              <div className="text-lg font-bold text-gray-900">HARVIN®</div>
            </div>
          </div> */}

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
              <span className="px-4 py-2 bg-white text-teal-600 rounded font-medium">Corporate Training Reviews</span>
              <Link to="/reviews/college" className="px-4 py-2 text-white hover:bg-teal-700 rounded transition-colors">College Training Reviews</Link>
              <Link to="/reviews/job-support" className="px-4 py-2 text-white hover:bg-teal-700 rounded transition-colors">Job Support Reviews</Link>
            </div>
          </div>
        </div>

        {/* Corporate Training Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
              {/* Company Logo Section */}
              <div className={`${review.bgColor} p-6 text-center`}>
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white flex items-center justify-center">
                  <img
                    src={review.logo}
                    alt={`${review.companyName} logo`}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </div>
                <h3 className="text-white text-xl font-bold">- {review.companyName}</h3>
              </div>

              {/* Training Details */}
              <div className="p-6">
                <div className="mb-4">
                  <p className="text-gray-700 text-sm mb-2">
                    <span className="font-medium">Training Name:</span> {review.trainingName}
                  </p>
                  <p className="text-gray-700 text-sm mb-2">
                    {review.language}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {review.type}
                  </p>
                </div>

                {/* Training Session Badge */}
                <div className="flex justify-center">
                  <span className="bg-teal-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                    {review.category}
                  </span>
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
            Showing {((currentPage - 1) * 9) + 1} to {Math.min(currentPage * 9, paginationData.totalReviews)} of {paginationData.totalReviews} corporate training reviews
          </p>
        </div>


      </div>
    </div>
  );
};

export default CorporateTrainingReviews;