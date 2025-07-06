import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const LearnerReviewsComplaints = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  const reviewsData = [
    {
      id: 1,
      name: "Mohit Singhal",
      rating: 5,
      designation: "Spanish Language Course",
      review: "The practical training for the Spanish language course I received in Henry Harvin was exceptional. The highly qualified trainers, easy course content and flexible learning schedule helped students gain expertise in the language. Henry Harvin's customer service is the best in the country. I strongly recommend Henry Harvin.",
      date: "2023-03-16",
      stars: "★★★★★"
    },
    {
      id: 2,
      name: "Gopal Verma",
      rating: 5,
      designation: "Digital Marketing Course",
      review: "Henry Harvin's Digital Marketing course exceeded my expectations. The comprehensive curriculum, hands-on projects, and expert guidance helped me transition into a successful digital marketing career. The support team was always available to help.",
      date: "2023-03-15",
      stars: "★★★★★"
    },
    {
      id: 3,
      name: "Priya Sharma",
      rating: 4,
      designation: "Data Science Bootcamp",
      review: "Excellent learning experience with Henry Harvin. The Data Science bootcamp provided practical knowledge and real-world projects. The instructors were knowledgeable and the course material was well-structured.",
      date: "2023-03-14",
      stars: "★★★★☆"
    },
    {
      id: 4,
      name: "Rajesh Kumar",
      rating: 5,
      designation: "Project Management Course",
      review: "Outstanding training program! The Project Management course at Henry Harvin helped me advance my career significantly. The certification is well-recognized in the industry and the practical approach was very beneficial.",
      date: "2023-03-13",
      stars: "★★★★★"
    },
    {
      id: 5,
      name: "Anita Desai",
      rating: 4,
      designation: "Content Writing Course",
      review: "Great course content and excellent support from instructors. The Content Writing course provided me with the skills needed to start my freelancing career. Highly recommend for aspiring writers.",
      date: "2023-03-12",
      stars: "★★★★☆"
    },
    {
      id: 6,
      name: "Vikram Singh",
      rating: 5,
      designation: "Web Development Bootcamp",
      review: "Henry Harvin's Web Development bootcamp is comprehensive and practical. The hands-on approach and industry-relevant projects helped me land a job as a full-stack developer. Excellent value for money.",
      date: "2023-03-11",
      stars: "★★★★★"
    },
    {
      id: 7,
      name: "Meera Patel",
      rating: 4,
      designation: "Business Analytics Course",
      review: "The Business Analytics course provided deep insights into data analysis and business intelligence. The instructors were experienced professionals and the course material was up-to-date with industry standards.",
      date: "2023-03-10",
      stars: "★★★★☆"
    },
    {
      id: 8,
      name: "Arjun Reddy",
      rating: 5,
      designation: "Machine Learning Course",
      review: "Exceptional learning experience! The Machine Learning course at Henry Harvin covered both theoretical concepts and practical implementation. The support team was responsive and helpful throughout the journey.",
      date: "2023-03-09",
      stars: "★★★★★"
    },
    {
      id: 9,
      name: "Kavya Nair",
      rating: 4,
      designation: "Graphic Design Course",
      review: "Creative and comprehensive course structure. The Graphic Design course helped me develop professional design skills. The portfolio projects were particularly valuable for showcasing my work to potential clients.",
      date: "2023-03-08",
      stars: "★★★★☆"
    }
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Purple Header Section */}
      <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header Content */}
          <div className="">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="lg:w-1/2 mb-8 lg:mb-0">
                <h1 className="text-4xl text-teal-600 lg:text-5xl font-bold mb-6">
                  Reviews And Complaints
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed mb-6 ">
                  We believe in transparency. Read both positive feedback and resolved complaints from our students.
                  Learn how we address concerns and continuously improve our courses based on student feedback.
                </p>
              </div>


            </div>
          </div>

          {/* Navigation Menu */}
          <div className="bg-teal-600 rounded-lg p-1 mb-8">
            <div className="flex flex-wrap gap-1 text-sm">
              <Link to="/about" className="px-4 py-2 text-white hover:bg-teal-700 rounded transition-colors">About Henry Harvin</Link>
              <Link to="/media" className="px-4 py-2 text-white hover:bg-teal-700 rounded transition-colors">Henry Harvin in Media</Link>
              <Link to="/affiliations" className="px-4 py-2 text-white hover:bg-teal-700 rounded transition-colors">Our Affiliations</Link>
              <Link to="/customers" className="px-4 py-2 text-white hover:bg-teal-700 rounded transition-colors">Our Customers</Link>
              <Link to="/csr" className="px-4 py-2 text-white hover:bg-teal-700 rounded transition-colors">Our CSR Activities</Link>
              <Link to="/gallery" className="px-4 py-2 text-white hover:bg-teal-700 rounded transition-colors">Our Gallery</Link>
              <Link to="/reviews/participant" className="px-4 py-2 bg-white text-teal-600 rounded font-medium">Participant Reviews</Link>
              <Link to="/reviews/corporate-training" className="px-4 py-2 text-white hover:bg-teal-700 rounded transition-colors">Corporate Training Reviews</Link>
              <Link to="/reviews/college-training" className="px-4 py-2 text-white hover:bg-teal-700 rounded transition-colors">College Training Reviews</Link>
              <Link to="/reviews/job-support" className="px-4 py-2 text-white hover:bg-teal-700 rounded transition-colors">Job Support Reviews</Link>

            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {reviewsData.map((review) => (
            <div key={review.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200">
              {/* Review Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-900">{review.name}</h3>
                  <div className="flex items-center space-x-1">
                    <div className="text-green-600 text-sm">★★★★★</div>
                  </div>
                </div>

                <div className="mb-3">
                  <span className="text-sm text-teal-600 font-medium">Designation:</span>
                  <p className="text-sm text-gray-700 mt-1">{review.designation}</p>
                </div>
              </div>

              {/* Review Content */}
              <div className="p-6">
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  {review.review}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Review Date: {review.date}</span>
                  <div className="flex items-center space-x-2">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      Verified
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center space-x-2 mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-2 text-sm font-medium rounded-md ${currentPage === page
                ? 'bg-teal-600 text-white'
                : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default LearnerReviewsComplaints;