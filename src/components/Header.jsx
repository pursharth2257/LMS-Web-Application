import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaChevronDown, FaGraduationCap } from "react-icons/fa";
import { useSignUp } from "../contexts/SignUpContext";
import ComingSoonPopup from "./ComingSoonPopup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const parseJwt = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Error decoding JWT:", e);
    return null;
  }
};

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [comingSoonFeature, setComingSoonFeature] = useState("");
  const {
    showSignUpPopup,
    user,
    setUser,
    isLoading,
    setIsLoading,
    isLogin,
    setIsLogin,
  } = useSignUp();
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleComingSoonClick = (featureName) => {
    setComingSoonFeature(featureName);
    setShowComingSoon(true);
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("Token");
      if (token && !user) {
        setIsLoading(true);
        try {
          // Decode token to get user role
          const decodedToken = parseJwt(token);
          const userRole = decodedToken?.role;

          // Determine the appropriate endpoint based on role
          let profileEndpoint;
          if (userRole === "instructor") {
            profileEndpoint =
              "https://new-lms-backend-vmgr.onrender.com/api/v1/instructors/profile";
          } else if (userRole === "student") {
            profileEndpoint =
              "https://new-lms-backend-vmgr.onrender.com/api/v1/students/profile";
          } else {
            throw new Error("Unknown or missing user role in token");
          }

          const response = await axios.get(profileEndpoint, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.data.success) {
            setUser(response.data.data);
          } else {
            console.error("API response unsuccessful:", response.data.message);

            localStorage.removeItem("Token");
            setUser(null);
            setIsLogin(false);
          }
        } catch (error) {
          console.error(
            "Error fetching user profile:",
            error.response?.data || error.message
          );
          if (error.response?.status === 403) {
            // Handle unauthorized access
            console.warn(
              "Unauthorized access. Clearing token and redirecting to login."
            );
            localStorage.removeItem("Token");
            setUser(null);
            setIsLogin(false);
            window.location.href = "/login"; // Redirect to login page
          }
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchUserProfile();
  }, []);

  // Debugging: Log user state changes
  useEffect(() => {
    console.log("User state updated:", user);
  }, [user]);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link
              to="/"
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <div className="flex items-center">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-teal-600 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                  <FaGraduationCap className="text-white text-sm sm:text-xl" />
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                  BrainBridge
                </h3>
              </div>
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-4 lg:mx-6">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="What do you want to learn?"
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 text-sm"
                aria-label="Search courses"
              />
              <button
                className="absolute right-1 top-1 bottom-1 px-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors duration-300 flex items-center justify-center"
                aria-label="Search"
              >
                <FaSearch className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Navigation Links - Desktop */}
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6 flex-shrink-0">
            <Link
              to="/courses/all"
              className="bg-gray-100 text-gray-700 px-2 xl:px-3 py-1.5 rounded text-sm hover:bg-gray-200 transition-colors duration-300 whitespace-nowrap"
            >
              All Courses
            </Link>

            <div className="relative group">
              <button
                className="flex items-center text-gray-700 hover:text-teal-600 transition-colors duration-300 text-sm"
                aria-label="Review menu"
              >
                Review
                <FaChevronDown className="ml-1 w-2 h-2" />
              </button>
              <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  <Link
                    to="/reviews/participant"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-teal-600"
                    role="menuitem"
                  >
                    Participant Reviews
                  </Link>
                  <Link
                    to="/reviews/video"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-teal-600"
                    role="menuitem"
                  >
                    Video Reviews
                  </Link>
                  <Link
                    to="/reviews/corporate"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-teal-600"
                    role="menuitem"
                  >
                    Corporate Training Reviews
                  </Link>
                  <Link
                    to="/reviews/college"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-teal-600"
                    role="menuitem"
                  >
                    College Training Reviews
                  </Link>
                  <Link
                    to="/reviews/job-support"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-teal-600"
                    role="menuitem"
                  >
                    Job Support Reviews
                  </Link>
                  <button
                    onClick={() => handleComingSoonClick("MouthShut Reviews")}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-teal-600"
                    role="menuitem"
                  >
                    Mouth Shut Reviews
                  </button>
                  <button
                    onClick={() => handleComingSoonClick("JustDial Reviews")}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-teal-600"
                    role="menuitem"
                  >
                    Just Dial Reviews
                  </button>
                  <Link
                    to="/reviews/reporter"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-teal-600"
                    role="menuitem"
                  >
                    Reviews Reporter
                  </Link>
                  <button
                    onClick={() => handleComingSoonClick("LinkedIn Reviews")}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-teal-600"
                    role="menuitem"
                  >
                    LinkedIn Reviews
                  </button>
                  <button
                    onClick={() => handleComingSoonClick("YouTube Reviews")}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-teal-600"
                    role="menuitem"
                  >
                    YouTube Reviews
                  </button>
                  <Link
                    to="/reviews/complaints"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-teal-600"
                    role="menuitem"
                  >
                    Learner Reviews & Complaints
                  </Link>
                  <button
                    onClick={() => handleComingSoonClick("Medium Reviews")}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-teal-600"
                    role="menuitem"
                  >
                    Medium Reviews
                  </button>
                </div>
              </div>
            </div>

            <Link
              to="/corporate-training"
              className="text-gray-700 hover:text-teal-600 transition-colors duration-300 text-sm whitespace-nowrap"
            >
              Corporate Training
            </Link>

            <div className="relative group">
              <button
                className="flex items-center text-gray-700 hover:text-teal-600 transition-colors duration-300 text-sm whitespace-nowrap"
                aria-label="Existing Students menu"
              >
                Existing Students
                <FaChevronDown className="ml-1 w-2 h-2" />
              </button>
              <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  <Link
                    to="/students/student-support"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-teal-600"
                    role="menuitem"
                  >
                    Student Support
                  </Link>
                  <Link
                    to="/students/events"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-teal-600"
                    role="menuitem"
                  >
                    Events
                  </Link>
                  <button
                    onClick={() => handleComingSoonClick("Internship Support")}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-teal-600"
                    role="menuitem"
                  >
                    Internship Support
                  </button>
                  <button
                    onClick={() => handleComingSoonClick("Career Support")}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-teal-600"
                    role="menuitem"
                  >
                    Career Support
                  </button>
                  <Link
                    to="/students/certification"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-teal-600"
                    role="menuitem"
                  >
                    Certification
                  </Link>
                  <Link
                    to="/students/submit-feedback"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-teal-600"
                    role="menuitem"
                  >
                    Submit Feedback
                  </Link>
                </div>
              </div>
            </div>

            <div className="relative group">
              <button
                className="flex items-center text-gray-700 hover:text-teal-600 transition-colors duration-300 text-sm"
                aria-label="About Us menu"
              >
                About Us
                <FaChevronDown className="ml-1 w-2 h-2" />
              </button>
              <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  <Link
                    to="/about/company"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-teal-600"
                    role="menuitem"
                  >
                    About BrainBridge
                  </Link>
                  <Link
                    to="/about/team"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-teal-600"
                    role="menuitem"
                  >
                    Our Affiliation
                  </Link>
                  <Link
                    to="/about/mission"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-teal-600"
                    role="menuitem"
                  >
                    Our Student
                  </Link>
                  <Link
                    to="/about/testimonials"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-teal-600"
                    role="menuitem"
                  >
                    Placement Partners
                  </Link>
                  <Link
                    to="/about/contact"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-teal-600"
                    role="menuitem"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
            ) : user ? (
              <Link
                to="/profile-dashboard"
                className="flex items-center"
                aria-label="View profile"
              >
                <img
                  src={user.avatar || "https://via.placeholder.com/32"}
                  alt={`${user.firstName} ${user.lastName}'s profile`}
                  className="w-8 h-8 rounded-full object-cover border border-teal-600"
                />
              </Link>
            ) : (
              <div className="flex mb-4 mt-4 sm:mb-6 justify-center">
                <button
                  className={`
      px-3 py-1.5 sm:px-5 sm:py-2  
      text-white font-medium
      rounded-l-md rounded-r-md 
      ${isLogin ? "bg-teal-600" : "bg-teal-400"} 
      hover:${isLogin ? "bg-teal-700" : "bg-teal-500"}
      focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-1 
      transition-colors duration-200
      text-xs sm:text-sm  
      shadow-sm
    `}
                  onClick={() => {
                    showSignUpPopup();
                    setIsLogin(true);
                  }}
                >
                  LOGIN
                </button>

                {/* <button
                  className={`px-4 py-2 sm:px-6 sm:py-2 text-white rounded-r-md bg-teal-300 text-sm sm:text-base`}
                  onClick={() => {
                    showSignUpPopup();
                    setIsLogin(false);
                  }}
                >
                  REGISTER
                </button> */}
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden flex flex-col gap-1 p-2 text-gray-700 ml-2"
            aria-label="Toggle mobile menu"
          >
            <span
              className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
                isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            ></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? "max-h-screen pb-4" : "max-h-0"
          }`}
        >
          <nav className="px-4 py-4 bg-white border-t border-gray-200">
            {/* Mobile Search */}
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="What do you want to learn?"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                  aria-label="Search courses"
                />
                <button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
                  aria-label="Search"
                >
                  <FaSearch className="w-4 h-4" />
                </button>
              </div>
            </div>

            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  to="/courses/all"
                  className="block w-full text-left bg-gray-100 text-gray-700 px-4 py-3 rounded hover:bg-gray-200 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  All Courses
                </Link>
              </li>
              <li className="relative">
                <button
                  className="flex items-center justify-between w-full text-left text-gray-700 hover:text-teal-600 py-2 px-2 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    const submenu = e.currentTarget.nextElementSibling;
                    submenu.classList.toggle("hidden");
                    const icon = e.currentTarget.querySelector("svg");
                    icon.classList.toggle("rotate-180");
                  }}
                  aria-label="Review menu"
                >
                  <span className="font-medium">Review</span>
                  <FaChevronDown className="w-3 h-3 transition-transform duration-200" />
                </button>
                <div className="hidden mt-2 ml-4 border-l-2 border-teal-200 pl-4 space-y-1">
                  <Link
                    to="/reviews/participant"
                    className="block py-2 text-sm text-gray-600 hover:text-teal-600 hover:bg-teal-50 px-2 rounded transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Participant Reviews
                  </Link>
                  <Link
                    to="/reviews/video"
                    className="block py-2 text-sm text-gray-600 hover:text-teal-600 hover:bg-teal-50 px-2 rounded transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Video Reviews
                  </Link>
                  <Link
                    to="/reviews/corporate"
                    className="block py-2 text-sm text-gray-600 hover:text-teal-600 hover:bg-teal-50 px-2 rounded transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Corporate Training Reviews
                  </Link>
                  <Link
                    to="/reviews/college"
                    className="block py-2 text-sm text-gray-600 hover:text-teal-600 hover:bg-teal-50 px-2 rounded transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    College Training Reviews
                  </Link>
                  <Link
                    to="/reviews/job-support"
                    className="block py-2 text-sm text-gray-600 hover:text-teal-600 hover:bg-teal-50 px-2 rounded transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Job Support Reviews
                  </Link>
                  <button
                    onClick={() => {
                      handleComingSoonClick("MouthShut Reviews");
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left py-2 text-sm text-gray-600 hover:text-teal-600 hover:bg-teal-50 px-2 rounded transition-colors"
                  >
                    Mouth Shut Reviews
                  </button>
                  <button
                    onClick={() => {
                      handleComingSoonClick("JustDial Reviews");
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left py-2 text-sm text-gray-600 hover:text-teal-600 hover:bg-teal-50 px-2 rounded transition-colors"
                  >
                    Just Dial Reviews
                  </button>
                  <Link
                    to="/reviews/reporter"
                    className="block py-2 text-sm text-gray-600 hover:text-teal-600 hover:bg-teal-50 px-2 rounded transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Reviews Reporter
                  </Link>
                  <button
                    onClick={() => {
                      handleComingSoonClick("LinkedIn Reviews");
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left py-2 text-sm text-gray-600 hover:text-teal-600 hover:bg-teal-50 px-2 rounded transition-colors"
                  >
                    LinkedIn Reviews
                  </button>
                  <button
                    onClick={() => {
                      handleComingSoonClick("YouTube Reviews");
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left py-2 text-sm text-gray-600 hover:text-teal-600 hover:bg-teal-50 px-2 rounded transition-colors"
                  >
                    YouTube Reviews
                  </button>
                  <Link
                    to="/reviews/complaints"
                    className="block py-2 text-sm text-gray-600 hover:text-teal-600 hover:bg-teal-50 px-2 rounded transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Learner Reviews & Complaints
                  </Link>
                  <button
                    onClick={() => {
                      handleComingSoonClick("Medium Reviews");
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left py-2 text-sm text-gray-600 hover:text-teal-600 hover:bg-teal-50 px-2 rounded transition-colors"
                  >
                    Medium Reviews
                  </button>
                </div>
              </li>
              <li>
                <Link
                  to="/corporate-training"
                  className="block text-gray-700 hover:text-teal-600 py-2 px-2 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Corporate Training
                </Link>
              </li>
              <li className="relative">
                <button
                  className="flex items-center justify-between w-full text-left text-gray-700 hover:text-teal-600 py-2 px-2 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    const submenu = e.currentTarget.nextElementSibling;
                    submenu.classList.toggle("hidden");
                    const icon = e.currentTarget.querySelector("svg");
                    icon.classList.toggle("rotate-180");
                  }}
                  aria-label="Existing Students menu"
                >
                  <span className="font-medium">Existing Students</span>
                  <FaChevronDown className="w-3 h-3 transition-transform duration-200" />
                </button>
                <div className="hidden mt-2 ml-4 border-l-2 border-teal-200 pl-4 space-y-1">
                  <Link
                    to="/students/student-support"
                    className="block py-2 text-sm text-gray-600 hover:text-teal-600 hover:bg-teal-50 px-2 rounded transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Student Support
                  </Link>
                  <Link
                    to="/students/events"
                    className="block py-2 text-sm text-gray-600 hover:teal-600 hover:bg-teal-50 px-2 rounded transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Events
                  </Link>
                  <button
                    onClick={() => {
                      handleComingSoonClick("Internship Support");
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left py-2 text-sm text-gray-600 hover:text-teal-600 hover:bg-teal-50 px-2 rounded transition-colors"
                  >
                    Internship Support
                  </button>
                  <button
                    onClick={() => {
                      handleComingSoonClick("Career Support");
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left py-2 text-sm text-gray-600 hover:text-teal-600 hover:bg-teal-50 px-2 rounded transition-colors"
                  >
                    Career Support
                  </button>
                  <Link
                    to="/students/certification"
                    className="block py-2 text-sm text-gray-600 hover:text-teal-600 hover:bg-teal-50 px-2 rounded transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Certification
                  </Link>
                  <Link
                    to="/students/submit-feedback"
                    className="block py-2 text-sm text-gray-600 hover:text-teal-600 hover:bg-teal-50 px-2 rounded transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Submit Feedback
                  </Link>
                </div>
              </li>
              <li className="relative">
                <button
                  className="flex items-center justify-between w-full text-left text-gray-700 hover:text-teal-600 py-2 px-2 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    const submenu = e.currentTarget.nextElementSibling;
                    submenu.classList.toggle("hidden");
                    const icon = e.currentTarget.querySelector("svg");
                    icon.classList.toggle("rotate-180");
                  }}
                  aria-label="About Us menu"
                >
                  <span className="font-medium">About Us</span>
                  <FaChevronDown className="w-3 h-3 transition-transform duration-200" />
                </button>
                <div className="hidden mt-2 ml-4 border-l-2 border-teal-200 pl-4 Laboratoire-y-1">
                  <Link
                    to="/about/company"
                    className="block py-2 text-sm text-gray-600 hover:text-teal-600 hover:bg-teal-50 px-2 rounded transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    About BrainBridge
                  </Link>
                  <Link
                    to="/about/team"
                    className="block py-2 text-sm text-gray-600 hover:text-teal-600 hover:bg-teal-50 px-2 rounded transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Our Affiliation
                  </Link>
                  <Link
                    to="/about/mission"
                    className="block py-2 text-sm text-gray-600 hover:text-teal-600 hover:bg-teal-50 px-2 rounded transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Our Student
                  </Link>
                  <Link
                    to="/about/testimonials"
                    className="block py-2 text-sm text-gray-600 hover:text-teal-600 hover:bg-teal-50 px-2 rounded transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Placement Partners
                  </Link>
                  <Link
                    to="/about/contact"
                    className="block py-2 text-sm text-gray-600 hover:text-teal-600 hover:bg-teal-50 px-2 rounded transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Contact Us
                  </Link>
                </div>
              </li>
              <li className="pt-2">
                {isLoading ? (
                  <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
                ) : user ? (
                  <Link
                    to="/profile-dashboard"
                    className="flex items-center w-full text-left py-2 px-2 rounded-lg hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="View profile"
                  >
                    <img
                      src={user.avatar || "https://via.placeholder.com/32"}
                      alt={`${user.firstName} ${user.lastName}'s profile`}
                      className="w-10 h-10 rounded-full object-cover border border-teal-600 mr-2"
                    />
                    <span className="font-medium text-gray-700">{`${user.firstName} ${user.lastName}`}</span>
                  </Link>
                ) : (
                  <div className="flex mb-4 mt-4 sm:mb-6 justify-center">
                 <button
  className={`
    w-32 sm:w-40                      // ⬅️ Added width classes
    px-3 py-1.5 sm:px-5 sm:py-2  
    text-white font-medium
    rounded-l-md rounded-r-md 
    ${isLogin ? "bg-teal-600" : "bg-teal-400"} 
    hover:${isLogin ? "bg-teal-700" : "bg-teal-500"}
    focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-1 
    transition-colors duration-200
    text-xs sm:text-sm  
    shadow-sm
  `}
  onClick={() => {
    showSignUpPopup();
    setIsLogin(true);
  }}
>
  LOGIN
</button>

                    {/* <button
                      className={`px-4 py-2 sm:px-6 sm:py-2 text-white rounded-r-md bg-teal-300 text-sm sm:text-base`}
                      onClick={() => {
                        showSignUpPopup();
                        setIsLogin(false);
                      }}
                    >
                      REGISTER
                    </button> */}
                  </div>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Coming Soon Popup */}
      <ComingSoonPopup
        isOpen={showComingSoon}
        onClose={() => setShowComingSoon(false)}
        featureName={comingSoonFeature}
      />
    </header>
  );
};

export default Header;
