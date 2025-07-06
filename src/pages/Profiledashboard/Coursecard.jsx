import React, { useState, useEffect, useContext } from "react";
import { FaPlay, FaBookmark } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext";

const Notification = ({ message, type, onClose }) => {
  if (!message) return null;

  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded-md shadow-lg text-white transition-opacity duration-300 z-50 ${
        type === "error" ? "bg-red-500 dark:bg-red-600" : "bg-green-500 dark:bg-green-600"
      } max-w-xs w-full`}
    >
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-4 hover:text-gray-200 dark:hover:text-gray-100"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

const CoursesPage = () => {
  const [bookmarkedCourses, setBookmarkedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const API_BASE_URL = "https://new-lms-backend-vmgr.onrender.com/api/v1/students";

  const fetchBookmarkedCourses = async () => {
    try {
      const token = localStorage.getItem("Token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.get(`${API_BASE_URL}/courses/bookmarked`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setBookmarkedCourses(response.data.data);
      } else {
        setError(response.data.message || "Failed to fetch bookmarks");
      }
    } catch (err) {
      console.error("Bookmarks API Error:", err);
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to load bookmarks";
      setError(errorMessage);
      setNotification({
        message: errorMessage,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarkedCourses();
  }, []);

  const handleBookmark = async (courseId) => {
    try {
      const token = localStorage.getItem("Token");
      if (!token) {
        setNotification({ message: "Please login to manage bookmarks", type: "error" });
        return;
      }

      const isBookmarked = bookmarkedCourses.some((c) => c._id === courseId);

      const config = {
        method: isBookmarked ? "delete" : "patch",
        url: `${API_BASE_URL}/courses/${courseId}/bookmark`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      const response = await axios(config);

      if (response.data.success) {
        setNotification({
          message: isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
          type: "success",
        });
        await fetchBookmarkedCourses();
      }
    } catch (err) {
      console.error("Bookmark Error:", err);
      let errorMessage = "Bookmark operation failed";

      if (err.response) {
        if (err.response.status === 401) {
          errorMessage = "Session expired. Please login again.";
          navigate("/");
        } else if (err.response.data?.message) {
          errorMessage = err.response.data.message;
        }
      }

      setNotification({
        message: errorMessage,
        type: "error",
      });
    }
  };

  const handlePlayCourse = (courseId) => {
    navigate(`/course-player/${courseId}`);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const displayedCourses = bookmarkedCourses.slice(0, 3);

  return (
    <div
      className={`p-4 sm:p-6 w-full min-h-screen ${
        theme === "dark" ? "bg-gradient-to-r from-gray-800 to-gray-900" : "bg-gradient-to-r from-gray-100 to-gray-200"
      }`}
    >
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: "", type: "" })}
      />

      {loading ? (
        <div
          className={`flex justify-center items-center h-64 ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          <div
            className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${
              theme === "dark" ? "border-blue-400" : "border-blue-500"
            }`}
          ></div>
        </div>
      ) : error ? (
        <div
          className={`p-4 rounded-lg text-center ${
            theme === "dark" ? "bg-red-900 text-red-200" : "bg-red-100 text-red-700"
          }`}
        >
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className={`mt-2 text-sm text-white px-3 py-1 rounded ${
              theme === "dark" ? "bg-red-700 hover:bg-red-800" : "bg-red-500 hover:bg-red-600"
            }`}
          >
            Retry
          </button>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-start mb-6">
            <h2
              className={`text-xl font-semibold ${
                theme === "dark" ? "text-gray-200" : "text-gray-800"
              }`}
            >
              My Bookmarked Courses
            </h2>
          </div>

          {bookmarkedCourses.length === 0 ? (
            <div
              className={`text-center py-12 ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              <p className="text-lg">You haven't bookmarked any courses yet.</p>
              <button
                onClick={() => navigate("/courses")}
                className={`mt-4 px-8 py-3 rounded-full font-semibold text-lg text-white shadow-lg transition-colors duration-300 ${
                  theme === "dark" ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                Browse Courses
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedCourses.map((course) => (
                  <div
                    key={course._id}
                    className={`p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow relative cursor-pointer ${
                      theme === "dark" ? "bg-gray-900" : "bg-white"
                    }`}
                    onClick={() => handlePlayCourse(course._id)}
                    aria-label={`View course ${course.title}`}
                  >
                    <div
                      className={`relative h-48 rounded-lg overflow-hidden flex items-center justify-center ${
                        theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                      }`}
                    >
                      {course.thumbnail ? (
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/300x200?text=No+Thumbnail";
                          }}
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full">
                          {course.title.includes("C++") && (
                            <img
                              src="https://via.placeholder.com/300x200?text=C++"
                              alt="C++ Thumbnail"
                              className="w-full h-full object-contain"
                            />
                          )}
                          {course.title.includes("Python") && (
                            <img
                              src="https://via.placeholder.com/300x200?text=Python"
                              alt="Python Thumbnail"
                              className="w-full h-full object-contain"
                            />
                          )}
                          {course.title.includes("MERN") && (
                            <img
                              src="https://via.placeholder.com/300x200?text=MERN"
                              alt="MERN Thumbnail"
                              className="w-full h-full object-contain"
                            />
                          )}
                          {!course.title.includes("C++") &&
                            !course.title.includes("Python") &&
                            !course.title.includes("MERN") && (
                              <span className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
                                No thumbnail
                              </span>
                            )}
                        </div>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlayCourse(course._id);
                        }}
                        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white p-2 rounded-full shadow-lg hover:scale-110 z-10 ${
                          theme === "dark" ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
                        }`}
                        aria-label={`Play course ${course.title}`}
                      >
                        <FaPlay className="text-sm" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBookmark(course._id);
                        }}
                        className={`absolute top-2 right-2 p-2 rounded-full ${
                          bookmarkedCourses.some((c) => c._id === course._id)
                            ? theme === "dark"
                              ? "text-yellow-400 bg-gray-800 bg-opacity-90"
                              : "text-yellow-500 bg-white bg-opacity-90"
                            : theme === "dark"
                              ? "text-gray-400 bg-gray-800 bg-opacity-70 hover:bg-opacity-90"
                              : "text-gray-500 bg-white bg-opacity-70 hover:bg-opacity-90"
                        }`}
                        aria-label={
                          bookmarkedCourses.some((c) => c._id === course._id)
                            ? `Remove bookmark for ${course.title}`
                            : `Bookmark ${course.title}`
                        }
                      >
                        <FaBookmark />
                      </button>
                    </div>
                    <div className="p-3">
                      <h3
                        className={`font-medium text-md mb-1 truncate ${
                          theme === "dark" ? "text-gray-200" : "text-gray-800"
                        }`}
                      >
                        {course.title}
                      </h3>
                      <p
                        className={`text-sm mb-2 line-clamp-2 ${
                          theme === "dark" ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {course.description || "Learn about this course"}
                      </p>
                      <div
                        className={`flex justify-between items-center text-sm ${
                          theme === "dark" ? "text-gray-200" : "text-gray-800"
                        }`}
                      >
                        <span className="font-bold">
                          ₹{course.discountPrice ? course.price - course.discountPrice : course.price || "N/A"}
                        </span>
                        {course.price && (
                          <span
                            className={`line-through ${
                              theme === "dark" ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            ₹{course.price}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center mt-2">
                        <span className="text-yellow-500">⭐ {course.rating || 0}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {bookmarkedCourses.length > 3 && (
                <div className="flex justify-center mt-6">
                  <button
                    onClick={openModal}
                    className={`px-8 py-3 rounded-full font-semibold text-lg text-white shadow-lg transition-colors duration-300 ${
                      theme === "dark" ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
                    }`}
                  >
                    View All Courses
                  </button>
                </div>
              )}

              {isModalOpen && (
                <div
                  className={`fixed inset-0 flex items-center justify-center z-50 ${
                    theme === "dark" ? "bg-gray-900 bg-opacity-70" : "bg-black bg-opacity-50"
                  }`}
                >
                  <div
                    className={`p-6 rounded-lg shadow-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto ${
                      theme === "dark" ? "bg-gray-800" : "bg-white"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3
                        className={`text-lg font-semibold ${
                          theme === "dark" ? "text-gray-200" : "text-gray-800"
                        }`}
                      >
                        All Bookmarked Courses
                      </h3>
                      <button
                        onClick={closeModal}
                        className={`${
                          theme === "dark" ? "text-gray-300 hover:text-gray-100" : "text-gray-600 hover:text-gray-800"
                        }`}
                        aria-label="Close modal"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {bookmarkedCourses.map((course) => (
                        <div
                          key={course._id}
                          className={`p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow relative cursor-pointer ${
                            theme === "dark" ? "bg-gray-900" : "bg-white"
                          }`}
                          onClick={() => {
                            handlePlayCourse(course._id);
                            closeModal();
                          }}
                          aria-label={`View course ${course.title}`}
                        >
                          <div
                            className={`relative h-48 rounded-lg overflow-hidden flex items-center justify-center ${
                              theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                            }`}
                          >
                            {course.thumbnail ? (
                              <img
                                src={course.thumbnail}
                                alt={course.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.src = "https://via.placeholder.com/300x200?text=No+Thumbnail";
                                }}
                              />
                            ) : (
                              <div className="flex items-center justify-center w-full h-full">
                                {course.title.includes("C++") && (
                                  <img
                                    src="https://via.placeholder.com/300x200?text=C++"
                                    alt="C++ Thumbnail"
                                    className="w-full h-full object-contain"
                                  />
                                )}
                                {course.title.includes("Python") && (
                                  <img
                                    src="https://via.placeholder.com/300x200?text=Python"
                                    alt="Python Thumbnail"
                                    className="w-full h-full object-contain"
                                  />
                                )}
                                {course.title.includes("MERN") && (
                                  <img
                                    src=" https://via.placeholder.com/300x200?text=MERN"
                                    alt="MERN Thumbnail"
                                    className="w-full h-full object-contain"
                                  />
                                )}
                                {!course.title.includes("C++") &&
                                  !course.title.includes("Python") &&
                                  !course.title.includes("MERN") && (
                                    <span className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
                                      No thumbnail
                                    </span>
                                  )}
                              </div>
                            )}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePlayCourse(course._id);
                                closeModal();
                              }}
                              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white p-2 rounded-full shadow-lg hover:scale-110 z-10 ${
                                theme === "dark" ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
                              }`}
                              aria-label={`Play course ${course.title}`}
                            >
                              <FaPlay className="text-sm" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleBookmark(course._id);
                              }}
                              className={`absolute top-2 right-2 p-2 rounded-full ${
                                bookmarkedCourses.some((c) => c._id === course._id)
                                  ? theme === "dark"
                                    ? "text-yellow-400 bg-gray-800 bg-opacity-90"
                                    : "text-yellow-500 bg-white bg-opacity-90"
                                  : theme === "dark"
                                    ? "text-gray-400 bg-gray-800 bg-opacity-70 hover:bg-opacity-90"
                                    : "text-gray-500 bg-white bg-opacity-70 hover:bg-opacity-90"
                              }`}
                              aria-label={
                                bookmarkedCourses.some((c) => c._id === course._id)
                                  ? `Remove bookmark for ${course.title}`
                                  : `Bookmark ${course.title}`
                              }
                            >
                              <FaBookmark />
                            </button>
                          </div>
                          <div className="p-3">
                            <h3
                              className={`font-medium text-md mb-1 truncate ${
                                theme === "dark" ? "text-gray-200" : "text-gray-800"
                              }`}
                            >
                              {course.title}
                            </h3>
                            <p
                              className={`text-sm mb-2 line-clamp-2 ${
                                theme === "dark" ? "text-gray-300" : "text-gray-600"
                              }`}
                            >
                              {course.description || "Learn about this course"}
                            </p>
                            <div
                              className={`flex justify-between items-center text-sm ${
                                theme === "dark" ? "text-gray-200" : "text-gray-800"
                              }`}
                            >
                              <span className="font-bold">
                                ₹{course.discountPrice ? course.price - course.discountPrice : course.price || "N/A"}
                              </span>
                              {course.price && (
                                <span
                                  className={`line-through ${
                                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                                  }`}
                                >
                                  ₹{course.price}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center mt-2">
                              <span className="text-yellow-500">⭐ {course.rating || 0}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CoursesPage;