import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar, FaQuoteLeft, FaThumbsUp, FaComment, FaShare } from 'react-icons/fa';

const ReviewTemplate = ({ category, description, source, externalLink }) => {
  const [sortBy, setSortBy] = useState('newest');
  const [filter, setFilter] = useState('participant');

  // Sample review data
  const allReviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      course: "Web Development Bootcamp",
      rating: 5,
      date: "March 15, 2024",
      comment: "This course exceeded all my expectations. The instructor was incredibly knowledgeable and explained complex concepts in a way that was easy to understand. I went from knowing nothing about web development to building my own portfolio website in just 8 weeks!",
      type: "participant",
      likes: 42,
      comments: 8,
      shares: 5
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      course: "Data Science Fundamentals",
      rating: 4.5,
      date: "February 28, 2024",
      comment: "A comprehensive introduction to data science. The practical exercises were particularly helpful in reinforcing the theoretical concepts. I would have liked more advanced topics towards the end, but overall it was an excellent course.",
      type: "participant",
      likes: 36,
      comments: 12,
      shares: 7
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
      course: "UX/UI Design Masterclass",
      rating: 5,
      date: "April 2, 2024",
      comment: "As someone transitioning from graphic design to UX/UI, this course was exactly what I needed. The instructor's feedback on my projects was invaluable, and I now have a portfolio that has already helped me land interviews.",
      type: "video",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      likes: 51,
      comments: 14,
      shares: 9
    },
    {
      id: 4,
      name: "David Kim",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
      course: "Mobile App Development with React Native",
      rating: 4,
      date: "March 10, 2024",
      comment: "Solid course with good explanations of React Native concepts. The project-based approach helped me understand how everything fits together. Some of the content could use updating for the latest React Native version.",
      type: "corporate",
      company: "Tech Innovations Inc.",
      likes: 28,
      comments: 6,
      shares: 3
    },
    {
      id: 5,
      name: "Olivia Wilson",
      avatar: "https://randomuser.me/api/portraits/women/5.jpg",
      course: "Digital Marketing Strategy",
      rating: 4.5,
      date: "April 15, 2024",
      comment: "This course provided actionable strategies that I was able to implement immediately in my role as a marketing coordinator. The section on social media analytics was particularly useful for measuring campaign effectiveness.",
      type: "college",
      institution: "Marketing University",
      likes: 33,
      comments: 9,
      shares: 11
    },
    {
      id: 6,
      name: "James Taylor",
      avatar: "https://randomuser.me/api/portraits/men/6.jpg",
      course: "Python for Data Analysis",
      rating: 5,
      date: "March 25, 2024",
      comment: "Excellent course for anyone looking to learn Python specifically for data analysis. The instructor's explanations of pandas and NumPy were clear and the exercises were challenging but doable. Highly recommend!",
      type: "job_support",
      jobTitle: "Data Analyst",
      likes: 47,
      comments: 15,
      shares: 8
    },
    {
      id: 7,
      name: "Sophia Martinez",
      avatar: "https://randomuser.me/api/portraits/women/7.jpg",
      course: "Graphic Design Essentials",
      rating: 4,
      date: "February 18, 2024",
      comment: "A good introduction to graphic design principles. I appreciated the focus on both theory and practical application. The Adobe Creative Suite tutorials were helpful, though I wish there were more advanced techniques covered.",
      type: "mouthshut",
      externalUrl: "https://www.mouthshut.com/review/12345",
      likes: 31,
      comments: 7,
      shares: 4
    },
    {
      id: 8,
      name: "Daniel Brown",
      avatar: "https://randomuser.me/api/portraits/men/8.jpg",
      course: "JavaScript Advanced Concepts",
      rating: 5,
      date: "April 5, 2024",
      comment: "This course took my JavaScript skills to the next level. The deep dives into closures, prototypes, and async programming were exactly what I needed. The instructor's coding examples were clear and well-explained.",
      type: "justdial",
      externalUrl: "https://www.justdial.com/review/67890",
      likes: 56,
      comments: 18,
      shares: 12
    },
    {
      id: 9,
      name: "Emma Davis",
      avatar: "https://randomuser.me/api/portraits/women/9.jpg",
      course: "Social Media Marketing Mastery",
      rating: 4.5,
      date: "March 20, 2024",
      comment: "The strategies taught in this course helped me grow my client's Instagram following by 300% in just two months. The section on content calendars and scheduling was particularly useful for planning campaigns.",
      type: "reporter",
      publication: "Tech Review Weekly",
      likes: 39,
      comments: 11,
      shares: 14
    },
    {
      id: 10,
      name: "Ryan Wilson",
      avatar: "https://randomuser.me/api/portraits/men/10.jpg",
      course: "iOS App Development with Swift",
      rating: 4,
      date: "February 25, 2024",
      comment: "A comprehensive introduction to Swift and iOS development. The course projects were engaging and built upon each other nicely. Some sections could use updating for the latest iOS version, but overall it was very valuable.",
      type: "linkedin",
      linkedinUrl: "https://www.linkedin.com/in/ryanwilson/",
      likes: 27,
      comments: 8,
      shares: 5
    },
    {
      id: 11,
      name: "Ava Thompson",
      avatar: "https://randomuser.me/api/portraits/women/11.jpg",
      course: "Machine Learning Fundamentals",
      rating: 5,
      date: "April 10, 2024",
      comment: "This course demystified machine learning for me. The instructor broke down complex algorithms into understandable components, and the Python implementations helped solidify my understanding. Excellent course!",
      type: "youtube",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      likes: 48,
      comments: 16,
      shares: 9
    },
    {
      id: 12,
      name: "Noah Garcia",
      avatar: "https://randomuser.me/api/portraits/men/12.jpg",
      course: "Responsive Web Design",
      rating: 4.5,
      date: "March 5, 2024",
      comment: "Great course on creating responsive websites. The mobile-first approach was well-explained, and the challenges helped reinforce the concepts. I'm now much more confident in building sites that work well on all devices.",
      type: "complaint",
      resolution: "Resolved within 24 hours",
      likes: 35,
      comments: 10,
      shares: 7
    },
    {
      id: 13,
      name: "Isabella Lee",
      avatar: "https://randomuser.me/api/portraits/women/13.jpg",
      course: "Photography Masterclass",
      rating: 5,
      date: "April 8, 2024",
      comment: "This course transformed my photography skills. The instructor's explanations of composition, lighting, and post-processing were excellent. I've received so many compliments on my work since completing this course!",
      type: "medium",
      mediumUrl: "https://medium.com/@isabellaleephotography/my-journey-12345",
      likes: 52,
      comments: 13,
      shares: 10
    }
  ];

  // Filter reviews based on the category and filter type
  const filteredReviews = allReviews.filter(review => {
    return review.type === filter;
  });

  // Sort reviews based on the selected option
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === 'highest') return b.rating - a.rating;
    if (sortBy === 'lowest') return a.rating - b.rating;
    // Default: newest
    return new Date(b.date) - new Date(a.date);
  });

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }
    
    return stars;
  };

  // Calculate average rating
  const averageRating = filteredReviews.reduce((acc, review) => acc + review.rating, 0) / filteredReviews.length;

  // Count ratings by star
  const ratingCounts = {
    5: filteredReviews.filter(r => Math.floor(r.rating) === 5).length,
    4: filteredReviews.filter(r => Math.floor(r.rating) === 4).length,
    3: filteredReviews.filter(r => Math.floor(r.rating) === 3).length,
    2: filteredReviews.filter(r => Math.floor(r.rating) === 2).length,
    1: filteredReviews.filter(r => Math.floor(r.rating) === 1).length,
  };

  // Render different review card based on type
  const renderReviewCard = (review) => {
    const baseCard = (
      <div className="p-4 sm:p-6">
        <div className="flex items-start">
          {/* Avatar and Name */}
          <div className="mr-3 sm:mr-4">
            <img
              src={review.avatar}
              alt={review.name}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
            />
          </div>

          {/* Review Content */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{review.name}</h4>
              <span className="text-xs sm:text-sm text-gray-500">{review.date}</span>
            </div>
            
            <div className="mb-2">
              <h5 className="font-medium text-gray-800 text-sm sm:text-base">
                Course: {review.course}
              </h5>
            </div>

            <div className="flex mb-3 sm:mb-4">
              {renderStars(review.rating)}
            </div>

            {/* Type-specific content */}
            {review.type === 'video' || review.type === 'youtube' ? (
              <div className="mb-3 sm:mb-4">
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                  <iframe
                    src={review.videoUrl}
                    title={`${review.name}'s video review`}
                    className="w-full h-48 sm:h-56 rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            ) : null}
            
            {review.type === 'corporate' ? (
              <div className="mb-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {review.company}
                </span>
              </div>
            ) : null}
            
            {review.type === 'college' ? (
              <div className="mb-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  {review.institution}
                </span>
              </div>
            ) : null}
            
            {review.type === 'job_support' ? (
              <div className="mb-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Job Support: {review.jobTitle}
                </span>
              </div>
            ) : null}
            
            {review.type === 'complaint' ? (
              <div className="mb-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  {review.resolution}
                </span>
              </div>
            ) : null}
            
            {['mouthshut', 'justdial', 'linkedin', 'medium'].includes(review.type) ? (
              <div className="mb-2">
                <a 
                  href={review.externalUrl || review.linkedinUrl || review.mediumUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-teal-600 hover:text-teal-800 underline"
                >
                  View original review on {
                    review.type === 'mouthshut' ? 'MouthShut' :
                    review.type === 'justdial' ? 'JustDial' :
                    review.type === 'linkedin' ? 'LinkedIn' : 'Medium'
                  }
                </a>
              </div>
            ) : null}
            
            {review.type === 'reporter' ? (
              <div className="mb-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                  Featured in: {review.publication}
                </span>
              </div>
            ) : null}
            
            <div className="mb-4">
              <div className="text-gray-500 mb-1">
                <FaQuoteLeft className="text-teal-400 opacity-50 mr-2 inline-block" />
              </div>
              <p className="text-gray-700 leading-relaxed">
                {review.comment}
              </p>
            </div>
            
            {/* Review Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-gray-500 hover:text-teal-600 transition-colors cursor-pointer">
                  <FaThumbsUp className="mr-1" />
                  <span className="text-sm">{review.likes}</span>
                </div>
                <div className="flex items-center text-gray-500 hover:text-teal-600 transition-colors cursor-pointer">
                  <FaComment className="mr-1" />
                  <span className="text-sm">{review.comments}</span>
                </div>
              </div>
              <div className="flex items-center text-gray-500 hover:text-teal-600 transition-colors cursor-pointer">
                <FaShare className="mr-1" />
                <span className="text-sm">{review.shares}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    return (
      <div key={review.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
        {baseCard}
      </div>
    );
  };

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">


        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            {category}
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            {description}
          </p>

          {externalLink && (
            <a
              href={externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 sm:mt-4 px-4 sm:px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors text-sm sm:text-base"
            >
              Visit {source} for More Reviews
            </a>
          )}
        </div>
        
        {/* Stats and Filters */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-8 sm:mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Rating Summary */}
            <div className="col-span-1">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Rating Summary</h3>
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mr-3 sm:mr-4">
                  {averageRating.toFixed(1)}
                </div>
                <div>
                  <div className="flex mb-1">
                    {renderStars(averageRating)}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Based on {filteredReviews.length} reviews
                  </p>
                </div>
              </div>
              
              {/* Rating Bars */}
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map(star => (
                  <div key={star} className="flex items-center">
                    <div className="w-12 text-sm text-gray-600">{star} stars</div>
                    <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-teal-600 h-2.5 rounded-full" 
                        style={{ width: `${(ratingCounts[star] / filteredReviews.length) * 100}%` }}
                      ></div>
                    </div>
                    <div className="w-8 text-sm text-gray-600 text-right">
                      {ratingCounts[star]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Filter Options */}
            <div className="col-span-1">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Filter Reviews</h3>
              <div className="space-y-2 sm:space-y-3">

                <button 
                  onClick={() => setFilter('participant')}
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                    filter === 'participant' 
                      ? 'bg-teal-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Participant Reviews
                </button>
                <button 
                  onClick={() => setFilter('video')}
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                    filter === 'video' 
                      ? 'bg-teal-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Video Reviews
                </button>
              </div>
            </div>
            
            {/* Sort Options */}
            <div className="col-span-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Sort Reviews</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => setSortBy('newest')}
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                    sortBy === 'newest' 
                      ? 'bg-teal-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Newest First
                </button>
                <button 
                  onClick={() => setSortBy('highest')}
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                    sortBy === 'highest' 
                      ? 'bg-teal-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Highest Rated
                </button>
                <button 
                  onClick={() => setSortBy('lowest')}
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                    sortBy === 'lowest' 
                      ? 'bg-teal-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Lowest Rated
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Reviews List */}
        <div className="space-y-4 sm:space-y-6">
          {sortedReviews.map(review => renderReviewCard(review))}
        </div>

        {/* Pagination */}
        <div className="mt-8 sm:mt-10 flex justify-center">
          <nav className="inline-flex rounded-md shadow">
            <button className="px-2 sm:px-4 py-2 bg-white border border-gray-300 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-l-md">
              <span className="hidden sm:inline">Previous</span>
              <span className="sm:hidden">Prev</span>
            </button>
            <button className="px-2 sm:px-4 py-2 bg-teal-600 border border-teal-600 text-xs sm:text-sm font-medium text-white hover:bg-teal-700">
              1
            </button>
            <button className="px-2 sm:px-4 py-2 bg-white border border-gray-300 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50">
              2
            </button>
            <button className="px-2 sm:px-4 py-2 bg-white border border-gray-300 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50">
              3
            </button>
            <button className="px-2 sm:px-4 py-2 bg-white border border-gray-300 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-r-md">
              <span className="hidden sm:inline">Next</span>
              <span className="sm:hidden">Next</span>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default ReviewTemplate;