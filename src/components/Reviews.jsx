import React, { useState, useRef } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar, FaQuoteLeft, FaThumbsUp, FaComment, FaShare, FaChevronLeft, FaChevronRight, FaArrowRight } from 'react-icons/fa';

const Reviews = () => {
  const [activeCategory, setActiveCategory] = useState('Web Development');
  const [email, setEmail] = useState('');
  const scrollRef = useRef(null);

  // Sample review data
  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      course: "Web Development Bootcamp",
      rating: 5,
      date: "March 15, 2024",
      comment: "This course exceeded all my expectations. The instructor was incredibly knowledgeable and explained complex concepts in a way that was easy to understand. I went from knowing nothing about web development to building my own portfolio website in just 8 weeks!",
      category: "Web Development",
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
      category: "Data Science",
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
      category: "Design",
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
      category: "Mobile Development",
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
      category: "Marketing",
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
      category: "Data Science",
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
      category: "Design",
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
      category: "Web Development",
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
      category: "Marketing",
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
      category: "Mobile Development",
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
      category: "Data Science",
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
      category: "Web Development",
      likes: 35,
      comments: 10,
      shares: 7
    }
  ];

  // Categories for filtering
  const categories = [
    'Web Development',
    'Data Science',
    'Design',
    'Mobile Development',
    'Marketing',
    'Programming',
    'Business',
    'Photography',
    'Music',
    'Health & Fitness',
    'Personal Development'
  ];

  // Filter reviews based on active category
  const filteredReviews = reviews.filter(review => review.category === activeCategory);

  // Scroll functions for category tabs
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  // Handle newsletter form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      alert('Thank you for subscribing to our newsletter!');
      setEmail('');
    }
  };

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

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center px-6 py-2 bg-teal-600 text-white rounded-full text-sm font-medium mb-4">
            Student Feedback
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Course Reviews & Ratings
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            See what our students have to say about their learning experiences and how our courses have helped them achieve their goals.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-10 relative">
          
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-4 transform -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-50 transition-colors"
          >
            <FaChevronLeft className="text-gray-600" />
          </button>

          
          <button
            onClick={scrollRight}
            className="absolute right-0 top-4 transform -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-50 transition-colors"
          >
            <FaChevronRight className="text-gray-600" />
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            className="overflow-x-auto scrollbar-hide pb-4 mx-10"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="flex space-x-4 min-w-max">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${activeCategory === category
                      ? 'bg-teal-600 text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredReviews.map((review) => (
            <div key={review.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="p-4 sm:p-6">
                {/* Review Header */}
                <div className="flex items-center mb-3 sm:mb-4">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover mr-3 sm:mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{review.name}</h4>
                    <div className="flex items-center flex-wrap gap-1 sm:gap-2">
                      <span className="text-xs sm:text-sm text-gray-500">{review.date}</span>
                      <span className="bg-teal-100 text-teal-800 text-xs px-2 py-0.5 rounded-full">
                        {review.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Course Name */}
                <div className="mb-3">
                  <h5 className="font-medium text-gray-800">
                    Course: {review.course}
                  </h5>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  <div className="flex mr-2">
                    {renderStars(review.rating)}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {review.rating.toFixed(1)}
                  </span>
                </div>

                {/* Review Content */}
                <div className="mb-6">
                  <div className="text-gray-500 mb-2">
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
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to share your experience?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Your feedback helps us improve our courses and helps other students make informed decisions.
          </p>
          <button className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg">
            Write a Review
          </button>
        </div>

        {/* Newsletter Section */}
        <div className="mt-24">
          <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-3xl p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              {/* Left Content */}
              <div className="text-center lg:text-left">
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                  Join our Newsletter
                </h3>
                <p className="text-teal-100 text-lg">
                  Subscribe to our Newsletter to get our Latest News
                </p>
              </div>

              {/* Right Form */}
              <div className="w-full lg:w-auto lg:min-w-[480px]">
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <div className="flex-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full px-6 py-4 rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-teal-300 text-gray-900 placeholder-gray-500 bg-white"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-teal-500 hover:bg-teal-400 text-white p-4 rounded-full transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:ring-offset-2 focus:ring-offset-teal-600"
                  >
                    <FaArrowRight className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    
  );
};

export default Reviews;