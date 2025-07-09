import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../axiosConfig';
import Instructors from '../../components/Instructors';
import TrendingCourses from '../../components/TrendingCourses';
import MicrosoftAI from '../../components/MicrosoftAI';
import FAQ from '../../components/FAQ';
import SignUpPopup from '../../components/SignUpPopup';
import CategoryTabs from './AllCoursesComponents/CategoryTabs';
import CourseGrid from './AllCoursesComponents/CourseGrid';
import CourseSearch from './AllCoursesComponents/CourseSearch';
import DesktopFilters from './AllCoursesComponents/DesktopFilters';
import MobileFilters from './AllCoursesComponents/MobileFilters';
import Notification from './AllCoursesComponents/Notification';
import Pagination from './AllCoursesComponents/Pagination';
import StatsSection from './AllCoursesComponents/StatsSection';
import HeroSection from './AllCoursesComponents/HeroSection';
import DefaultImageCourse from '../../assets/DefaultImageCourse.webp';

// Constants
const ERROR_MESSAGES = {
  FETCH_COURSES: 'Error fetching courses. Please try again.',
  FETCH_PROFILE: 'Failed to fetch profile. Please log in.',
  FETCH_BOOKMARKS: 'Error fetching bookmarked courses.',
  UPDATE_BOOKMARK: 'Failed to update bookmark. Please try again.',
  LOGIN_REQUIRED: 'Please log in to manage bookmarks.',
  SESSION_EXPIRED: 'Session expired. Please log in again.',
};

const INITIAL_FILTERS = {
  price: { free: false, paid: false },
  level: { beginner: false, intermediate: false, advanced: false },
  duration: { short: false, medium: false, long: false },
  rating: { high: false, good: false, average: false },
  language: { english: false, hindi: false, other: false },
};

const COURSES_PER_PAGE = 9;

const scrollbarHideStyles = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

// Component
const AllCourses = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showSignupPopup, setShowSignupPopup] = useState(false);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookmarkedCourses, setBookmarkedCourses] = useState([]);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [isBookmarking, setIsBookmarking] = useState(false);
  const scrollRef = useRef(null);
  const coursesScrollRef = useRef(null);
  const navigate = useNavigate();

  const [filters, setFilters] = useState(INITIAL_FILTERS);

  // Fetch profile (hypothesized to check authentication status)
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('Token');
      if (!token) return;

      try {
        const response = await api.get('/students/profile');
        console.log('Profile response:', response.data);
        if (!response.data.success) {
          throw new Error(response.data.message || ERROR_MESSAGES.FETCH_PROFILE);
        }
      } catch (err) {
        console.error('Fetch Profile Error:', err.response?.data || err);
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem('Token');
          setNotification({ message: ERROR_MESSAGES.SESSION_EXPIRED, type: 'error' });
          setTimeout(() => navigate('/'), 2000);
        } else {
          setNotification({ message: ERROR_MESSAGES.FETCH_PROFILE, type: 'error' });
        }
      }
    };

    fetchProfile();
  }, [navigate]);

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await api.get('/courses');
        console.log('Courses response:', response.data);
        if (response.data.success) {
          const transformedCourses = response.data.data.map((course) => ({
            id: course._id,
            title: course.title,
            description: course.description,
            instructor: `${course.instructor.firstName} ${course.instructor.lastName}`,
            instructorAvatar: course.instructor.avatar,
            rating: course.rating,
            reviews: course.totalRatings,
            students: course.totalStudents,
            duration: `${course.duration} hours`,
            level: course.level.charAt(0).toUpperCase() + course.level.slice(1),
            category: course.category.toLowerCase(),
            originalPrice: course.price === 0 ? 'Free' : `₹${course.price}`,
            price: course.discountPrice ? `₹${course.discountPrice}` : null,
            image: course.thumbnail || DefaultImageCourse,
            language: course.language || 'english',
          }));
          setCourses(transformedCourses);
        } else {
          throw new Error(response.data.message || ERROR_MESSAGES.FETCH_COURSES);
        }
      } catch (err) {
        console.error('Fetch Courses Error:', err.response?.data || err);
        setError(err.response?.data?.message || ERROR_MESSAGES.FETCH_COURSES);
        setNotification({ message: ERROR_MESSAGES.FETCH_COURSES, type: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Fetch bookmarked courses
  useEffect(() => {
    const fetchBookmarkedCourses = async () => {
      const token = localStorage.getItem('Token');
      if (!token) return;

      try {
        const response = await api.get('/students/courses/bookmarked');
        console.log('Bookmarked courses response:', response.data);
        if (response.data.success) {
          setBookmarkedCourses(response.data.data.map((course) => course._id));
        } else {
          throw new Error(response.data.message || ERROR_MESSAGES.FETCH_BOOKMARKS);
        }
      } catch (err) {
        console.error('Fetch Bookmarks Error:', err.response?.data || err);
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem('Token');
          // Suppress notification for unauthenticated users
        } else {
          setNotification({ message: ERROR_MESSAGES.FETCH_BOOKMARKS, type: 'error' });
        }
      }
    };

    fetchBookmarkedCourses();
  }, []);

  // Handle bookmark
  const handleBookmark = useCallback(
    async (courseId, e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      setIsBookmarking(true);
      try {
        const token = localStorage.getItem('Token');
        if (!token) {
          setNotification({ message: ERROR_MESSAGES.LOGIN_REQUIRED, type: 'error' });
          setTimeout(() => navigate('/'), 2000);
          return;
        }

        const isBookmarked = bookmarkedCourses.includes(courseId);
        const response = await api.request({
          method: isBookmarked ? 'delete' : 'patch',
          url: `/students/courses/${courseId}/bookmark`,
          data: isBookmarked ? {} : { bookmarked: true },
        });
        console.log('Bookmark response:', response.data);

        if (response.data.success) {
          setNotification({
            message: isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks',
            type: 'success',
          });
          setBookmarkedCourses((prev) =>
            isBookmarked ? prev.filter((id) => id !== courseId) : [...prev, courseId]
          );
        } else {
          throw new Error(response.data.message || ERROR_MESSAGES.UPDATE_BOOKMARK);
        }
      } catch (err) {
        console.error('Bookmark Error:', err.response?.data || err);
        let errorMessage = ERROR_MESSAGES.UPDATE_BOOKMARK;
        if (err.response?.status === 401 || err.response?.status === 403) {
          errorMessage = ERROR_MESSAGES.SESSION_EXPIRED;
          localStorage.removeItem('Token');
          setTimeout(() => navigate('/'), 2000);
        } else if (err.response?.data?.message) {
          errorMessage = err.response.data.message;
        }
        setNotification({ message: errorMessage, type: 'error' });
      } finally {
        setIsBookmarking(false);
      }
    },
    [bookmarkedCourses, navigate]
  );

  // Filter handlers
  const handleFilterChange = useCallback((category, filterKey) => {
    setFilters((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [filterKey]: !prev[category][filterKey],
      },
    }));
  }, []);

  const clearAllFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
  }, []);

  // Filter functions
  const matchesPriceFilter = useCallback(
    (course) => {
      const { free, paid } = filters.price;
      if (!free && !paid) return true;
      const isFree = course.price === 'Free' || course.price === '₹0';
      const isPaid = course.price !== 'Free' && course.price !== '₹0';
      return (free && isFree) || (paid && isPaid);
    },
    [filters.price]
  );

  const matchesLevelFilter = useCallback(
    (course) => {
      const { beginner, intermediate, advanced } = filters.level;
      if (!beginner && !intermediate && !advanced) return true;
      const level = course.level.toLowerCase();
      return (
        (beginner && level.includes('beginner')) ||
        (intermediate && level.includes('intermediate')) ||
        (advanced && level.includes('advanced'))
      );
    },
    [filters.level]
  );

  const matchesDurationFilter = useCallback(
    (course) => {
      const { short, medium, long } = filters.duration;
      if (!short && !medium && !long) return true;
      const duration = parseInt(course.duration);
      return (
        (short && duration <= 10) ||
        (medium && duration > 10 && duration <= 20) ||
        (long && duration > 20)
      );
    },
    [filters.duration]
  );

  const matchesRatingFilter = useCallback(
    (course) => {
      const { high, good, average } = filters.rating;
      if (!high && !good && !average) return true;
      const rating = course.rating;
      return (
        (high && rating >= 4.5) ||
        (good && rating >= 4.0) ||
        (average && rating >= 3.5)
      );
    },
    [filters.rating]
  );

  const matchesLanguageFilter = useCallback(
    (course) => {
      const { english, hindi, other } = filters.language;
      if (!english && !hindi && !other) return true;
      const courseLanguage = course.language?.toLowerCase() || '';
      return (
        (english && courseLanguage.includes('english')) ||
        (hindi && courseLanguage.includes('hindi')) ||
        (other && !['english', 'hindi'].includes(courseLanguage))
      );
    },
    [filters.language]
  );

  const matchesSearch = useCallback(
    (course) => {
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase().trim();
      const searchFields = [
        course.title,
        course.description,
        course.instructor,
        course.level,
        course.category,
      ];
      return searchFields.some((field) => field && field.toLowerCase().includes(query));
    },
    [searchQuery]
  );

  // Memoized categories and filtered courses
  const categories = useMemo(
    () => [
      { id: 'all', name: 'All Courses' },
      ...[...new Set(courses.map((course) => course.category))].map((cat) => ({
        id: cat,
        name: cat.charAt(0).toUpperCase() + cat.slice(1),
      })),
    ],
    [courses]
  );

  const filteredCourses = useMemo(
    () =>
      courses.filter((course) => {
        const matchesCategory = activeCategory === 'all' || course.category === activeCategory;
        return (
          matchesCategory &&
          matchesSearch(course) &&
          matchesPriceFilter(course) &&
          matchesLevelFilter(course) &&
          matchesDurationFilter(course) &&
          matchesRatingFilter(course) &&
          matchesLanguageFilter(course)
        );
      }),
    [
      courses,
      activeCategory,
      matchesSearch,
      matchesPriceFilter,
      matchesLevelFilter,
      matchesDurationFilter,
      matchesRatingFilter,
      matchesLanguageFilter,
    ]
  );

  // Pagination
  const totalPages = Math.ceil(filteredCourses.length / COURSES_PER_PAGE);
  const startIndex = (currentPage - 1) * COURSES_PER_PAGE;
  const endIndex = startIndex + COURSES_PER_PAGE;
  const currentCourses = filteredCourses.slice(startIndex, endIndex);

  const handlePageChange = useCallback(
    (page) => {
      setCurrentPage(page);
      setTimeout(() => {
        if (coursesScrollRef.current) {
          coursesScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
        const coursesSection = document.querySelector('.courses-section');
        if (coursesSection) {
          const yOffset = -80;
          const y = coursesSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        } else {
          const courseGrid = document.getElementById('course-grid');
          if (courseGrid) {
            const yOffset = -100;
            const y = courseGrid.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }
      }, 100);
    },
    []
  );

  const handlePrevious = useCallback(() => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  }, [currentPage, handlePageChange]);

  const handleNext = useCallback(() => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  }, [currentPage, totalPages, handlePageChange]);

  // Reset page on filter/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery, filters]);

  // Auto-show signup popup
  useEffect(() => {
    const initialTimeout = setTimeout(() => setShowSignupPopup(true), 900000);
    const interval = setInterval(() => setShowSignupPopup(true), 900000);
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  // Handle wheel scroll
  useEffect(() => {
    const handleWheelOnCoursesArea = (e) => {
      if (!e.target.closest('.courses-scrollable-container')) {
        e.preventDefault();
        if (coursesScrollRef.current) {
          coursesScrollRef.current.scrollTop += e.deltaY;
        }
      }
    };
    const coursesSection = document.querySelector('.courses-section');
    if (coursesSection) {
      coursesSection.addEventListener('wheel', handleWheelOnCoursesArea, { passive: false });
    }
    return () => {
      if (coursesSection) {
        coursesSection.removeEventListener('wheel', handleWheelOnCoursesArea);
      }
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-2 text-gray-600">Loading courses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>
    );
  }

  return (
    <div className="min-h-screen">
      <style dangerouslySetInnerHTML={{ __html: scrollbarHideStyles }} />
      <Notification notification={notification} setNotification={setNotification} />
      <HeroSection />
      <StatsSection />
      <TrendingCourses />
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 bg-white">
          <CategoryTabs
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            scrollRef={scrollRef}
          />
          <MobileFilters
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            filters={filters}
            handleFilterChange={handleFilterChange}
            clearAllFilters={clearAllFilters}
          />
          <div className="flex flex-col md:flex-row courses-section">
            <DesktopFilters
              filters={filters}
              handleFilterChange={handleFilterChange}
              clearAllFilters={clearAllFilters}
            />
            <div className="flex-1" id="course-grid">
              <CourseSearch
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                filteredCourses={filteredCourses}
                currentPage={currentPage}
                totalPages={totalPages}
              />
              <CourseGrid
                currentCourses={currentCourses}
                coursesScrollRef={coursesScrollRef}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                bookmarkedCourses={bookmarkedCourses}
                handleBookmark={handleBookmark}
                isBookmarking={isBookmarking}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
                handlePrevious={handlePrevious}
                handleNext={handleNext}
              />
            </div>
          </div>
        </div>
      </section>
      <MicrosoftAI />
      <Instructors />
      <FAQ
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions about our courses and learning platform"
        faqs={[
          {
            question: 'How do I enroll in a course?',
            answer:
              "Simply click on the 'Enroll Now' button on any course page. You'll be guided through the enrollment process, which includes creating an account if you don't have one and completing the payment for paid courses.",
          },
          {
            question: 'Are there any free courses available?',
            answer: "Yes! We offer over 100 free courses across various categories. Look for courses marked with 'Free' or use the price filter to find all free courses.",
          },
          {
            question: 'Can I get a certificate after completing a course?',
            answer:
              'Yes, you’ll receive a certificate of completion for most courses. Premium courses also offer industry-recognized certifications that you can add to your LinkedIn profile.',
          },
          {
            question: 'What if I’m not satisfied with a course?',
            answer: 'We offer a 30-day money-back guarantee for all paid courses. If you’re not satisfied, contact our support team for a full refund.',
          },
          {
            question: 'How long do I have access to course materials?',
            answer:
              'Once enrolled, you have lifetime access to course materials, including any future updates. You can learn at your own pace and revisit content anytime.',
          },
        ]}
      />
      <SignUpPopup isOpen={showSignupPopup} onClose={() => setShowSignupPopup(false)} />
    </div>
  );
};

export default AllCourses;