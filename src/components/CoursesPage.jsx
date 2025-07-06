import React, { useState } from 'react';
import { FaStar, FaUsers, FaClock, FaPlay, FaFilter, FaSearch } from 'react-icons/fa';
import { FaBookmark } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CoursesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
   const [bookmarkedCourses, setBookmarkedCourses] = useState([]);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const navigate = useNavigate();

  const categories = ['All', 'Web Development', 'Data Science', 'Design', 'Business', 'Marketing'];

  const courses = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      instructor: "John Smith",
      category: "Web Development",
      price: 89.99,
      originalPrice: 199.99,
      rating: 4.8,
      students: 12500,
      duration: "42 hours",
      lessons: 156,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      level: "Beginner",
      description: "Learn HTML, CSS, JavaScript, React, Node.js and more in this comprehensive bootcamp."
    },
    {
      id: 2,
      title: "Data Science with Python",
      instructor: "Sarah Johnson",
      category: "Data Science",
      price: 79.99,
      originalPrice: 149.99,
      rating: 4.9,
      students: 8900,
      duration: "38 hours",
      lessons: 124,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      level: "Intermediate",
      description: "Master data analysis, visualization, and machine learning with Python."
    },
    {
      id: 3,
      title: "UI/UX Design Masterclass",
      instructor: "Mike Chen",
      category: "Design",
      price: 69.99,
      originalPrice: 129.99,
      rating: 4.7,
      students: 6700,
      duration: "28 hours",
      lessons: 89,
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      level: "Beginner",
      description: "Learn user interface and user experience design from scratch to advanced."
    },
    {
      id: 4,
      title: "Digital Marketing Strategy",
      instructor: "Emma Wilson",
      category: "Marketing",
      price: 59.99,
      originalPrice: 99.99,
      rating: 4.6,
      students: 5400,
      duration: "24 hours",
      lessons: 67,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      level: "Intermediate",
      description: "Master digital marketing strategies including SEO, social media, and PPC."
    },
    {
      id: 5,
      title: "Business Analytics",
      instructor: "David Brown",
      category: "Business",
      price: 74.99,
      originalPrice: 139.99,
      rating: 4.8,
      students: 4200,
      duration: "32 hours",
      lessons: 98,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      level: "Advanced",
      description: "Learn to analyze business data and make data-driven decisions."
    },
    {
      id: 6,
      title: "React Native Mobile Development",
      instructor: "Lisa Garcia",
      category: "Web Development",
      price: 84.99,
      originalPrice: 169.99,
      rating: 4.7,
      students: 3800,
      duration: "36 hours",
      lessons: 112,
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      level: "Intermediate",
      description: "Build cross-platform mobile apps with React Native and JavaScript."
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

   
  const handleBookmark = async (courseId) => {
    try {
      const token = localStorage.getItem('Token');
      if (!token) {
        setNotification({ message: 'Please login to bookmark courses', type: 'error' });
        navigate('/');
        return;
      }

      const isBookmarked = bookmarkedCourses.includes(courseId);
      
      const response = await axios.patch(
        `https://lms-backend-flwq.onrender.com/api/v1/students/courses/${courseId}/bookmark`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setNotification({
          message: isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks',
          type: 'success',
        });
        if (isBookmarked) {
          setBookmarkedCourses(bookmarkedCourses.filter(id => id !== courseId));
        } else {
          setBookmarkedCourses([...bookmarkedCourses, courseId]);
        }
      }
    } catch (err) {
      console.error('Bookmark Error:', err);
      setNotification({
        message: err.response?.data?.message || 'Failed to update bookmark',
        type: 'error',
      });
    }
  };

  // notification component
  {notification.message && (
    <div className={`fixed top-4 right-4 p-4 rounded-md shadow-lg text-white z-50 ${
      notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'
    }`}>
      <div className="flex items-center justify-between">
        <span>{notification.message}</span>
        <button onClick={() => setNotification({ message: '', type: '' })} className="ml-4">
          ✕
        </button>
      </div>
    </div>
  )}

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-poppins">
            Our Courses
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our comprehensive collection of courses designed to help you master new skills and advance your career.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <FaFilter className="text-gray-500" />
              <span className="text-gray-700 font-medium">Filter by:</span>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                      selectedCategory === category
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredCourses.length} of {courses.length} courses
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
            >

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
              {/* Course Image */}
              <div className="relative overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <FaPlay className="text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(course.level)}`}>
                  {course.level}
                </div>
              </div>

              {/* Course Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-purple-600 font-medium">{course.category}</span>
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 w-4 h-4" />
                    <span className="text-sm text-gray-600 ml-1">{course.rating}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                  {course.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>

                <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                  <div className="flex items-center">
                    <FaUsers className="w-4 h-4 mr-1" />
                    <span>{course.students.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center">
                    <FaClock className="w-4 h-4 mr-1" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-purple-600">${course.price}</span>
                    <span className="text-sm text-gray-500 line-through">${course.originalPrice}</span>
                  </div>
                  <button className="bg-teal-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-teal-700 transition-colors duration-300">
                    Enroll Now
                  </button>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-600">
                    Instructor: <span className="font-medium text-gray-900">{course.instructor}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-8 py-3 rounded-full font-semibold hover:from-teal-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl">
            Load More Courses
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
