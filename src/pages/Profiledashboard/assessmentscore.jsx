import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "../../contexts/ThemeContext";
import Notification from "./Notification"; 

const AssessmentScore = () => {
  const { theme } = useContext(ThemeContext);
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [assessments, setAssessments] = useState([]);
  const [selectedAssessmentId, setSelectedAssessmentId] = useState("");
  const [assessmentResult, setAssessmentResult] = useState(null);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(false);
  const [isAssessmentPopupOpen, setIsAssessmentPopupOpen] = useState(false);
  const [isResultPopupOpen, setIsResultPopupOpen] = useState(false);

  // Show notification
  const showNotification = (message, type = "error") => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 5000);
  };

  // Fetch courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("Token");
        if (!token) {
          showNotification("Please log in to view courses.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          "https://lms-backend-flwq.onrender.com/api/v1/students/courses",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const courseData = response.data.data || [];
        setCourses(courseData);
        if (courseData.length === 0) {
          showNotification("No courses found.");
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        showNotification("Failed to load courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Fetch assessments when a course is selected
  useEffect(() => {
    if (!selectedCourseId) {
      setAssessments([]);
      setSelectedAssessmentId("");
      setAssessmentResult(null);
      setIsAssessmentPopupOpen(false);
      setIsResultPopupOpen(false);
      return;
    }

    const fetchAssessments = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("Token");
        if (!token) {
          showNotification("Please log in to view assessments.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `https://lms-backend-flwq.onrender.com/api/v1/students/courses/${selectedCourseId}/assessments`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const assessmentData = response.data.data || [];
        setAssessments(assessmentData);
        setSelectedAssessmentId("");
        setAssessmentResult(null);
        if (assessmentData.length === 0) {
          showNotification("No assessments found in this course.");
        } else {
          setIsAssessmentPopupOpen(true);
        }
      } catch (error) {
        console.error("Error fetching assessments:", error);
        showNotification("Failed to load assessments.");
      } finally {
        setLoading(false);
      }
    };

    fetchAssessments();
  }, [selectedCourseId]);

  // Fetch assessment result when an assessment is selected
  useEffect(() => {
    if (!selectedCourseId || !selectedAssessmentId) {
      setAssessmentResult(null);
      setIsResultPopupOpen(false);
      return;
    }
    setIsAssessmentPopupOpen(false);
    setIsResultPopupOpen(true);

    const fetchAssessmentResult = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("Token");
        if (!token) {
          showNotification("Please log in to view assessment results.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `https://lms-backend-flwq.onrender.com/api/v1/students/courses/${selectedCourseId}/assessments/${selectedAssessmentId}/result`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const result = response.data.data;
        setAssessmentResult(result);
      } catch (error) {
        console.error("Error fetching assessment result:", error);
        showNotification("Failed to load assessment result.");
      } finally {
        setLoading(false);
      }
    };

    fetchAssessmentResult();
  }, [selectedCourseId, selectedAssessmentId]);

  // Handle course selection
  const handleCourseClick = (courseId) => {
    setSelectedCourseId(courseId);
  };

  // Close popups
  const closePopups = () => {
    setIsAssessmentPopupOpen(false);
    setIsResultPopupOpen(false);
    setSelectedAssessmentId("");
    setAssessmentResult(null);
  };

  return (
    <div
      className={`sm:p-0 mt-12 md:mt-0 h-fit px-[10px] lg:py-6 lg:px-6 rounded-lg space-y-6 max-w-7xl mx-auto transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'
      }`}
    >
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: "", type: "" })}
      />
      <h1
        className={`text-[2rem] font-bold ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        } pb-2`}
      >
        Assessment Scores
      </h1>
      <div className="space-y-5">
        {/* Loading Indicator */}
        {loading && (
          <div className="flex justify-center items-center">
            <svg
              className={`animate-spin h-5 w-5 ${
                theme === 'dark' ? 'text-blue-400' : 'text-[#49BBBD]'
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span
              className={`ml-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Loading...
            </span>
          </div>
        )}

        {/* Course List */}
        <div className="space-y-3">
          <h2
            className={`text-lg font-medium ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            Available Courses
          </h2>
          {courses.length === 0 && !loading ? (
            <p
              className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              No courses available.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {courses.map((course) =>
                course.course ? (
                  <div
                    key={course.course._id}
                    onClick={() => handleCourseClick(course.course._id)}
                    className={`p-4 rounded-lg shadow-md border cursor-pointer transition ${
                      theme === 'dark'
                        ? 'bg-gray-800 border-gray-700'
                        : 'bg-white border-gray-200'
                    } ${
                      selectedCourseId === course.course._id
                        ? theme === 'dark'
                          ? 'border-blue-400 bg-opacity-10'
                          : 'border-[#49BBBD] bg-opacity-10'
                        : theme === 'dark'
                        ? 'hover:bg-gray-700'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    {/* Dynamic Course Thumbnail */}
                    <div
                      className={`w-full h-24 rounded-md mb-2 flex items-center justify-center overflow-hidden ${
                        theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'
                      }`}
                    >
                      {course.course.thumbnail ? (
                        <img
                          src={course.course.thumbnail}
                          alt={course.course.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span
                          className={`${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                          }`}
                        >
                          {course.course.title.substring(0, 2).toUpperCase()}
                        </span>
                      )}
                    </div>
                    {/* Course Title */}
                    <h3
                      className={`text-md font-semibold ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {course.course.title}
                    </h3>
                    {/* Course Description or Subtitle */}
                    <p
                      className={`text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      } mt-1`}
                    >
                      {course.course.description || "No description available"}
                    </p>
                    {/* Instructor */}
                    <div className="flex items-center mt-2">
                      <img
                        src={
                          course.course.instructor?.avatar ||
                          "https://via.placeholder.com/24"
                        }
                        alt={course.course.instructor?.firstName || "Instructor"}
                        className="w-6 h-6 rounded-full mr-2"
                      />
                      <span
                        className={`text-sm ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}
                      >
                        {course.course.instructor?.firstName || "Unknown"}{" "}
                        {course.course.instructor?.lastName || ""}
                      </span>
                    </div>
                  </div>
                ) : null
              )}
            </div>
          )}
        </div>

        {/* Assessment Selection Popup */}
        {isAssessmentPopupOpen && (
          <div
            className={`fixed inset-0 ${
              theme === 'dark'
                ? 'bg-gray-900 bg-opacity-70'
                : 'bg-black bg-opacity-50'
            } flex items-center justify-center z-50`}
          >
            <div
              className={`p-6 rounded-lg shadow-lg w-full max-w-md ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <h2
                className={`text-lg font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                } mb-4`}
              >
                Select Assessment
              </h2>
              <select
                value={selectedAssessmentId}
                onChange={(e) => setSelectedAssessmentId(e.target.value)}
                className={`w-full border rounded-md p-3 text-base focus:ring-2 transition ${
                  theme === 'dark'
                    ? 'border-gray-600 bg-gray-700 text-gray-100 focus:ring-blue-400'
                    : 'border-gray-300 bg-white text-gray-900 focus:ring-[#49BBBD]'
                }`}
                disabled={loading || assessments.length === 0}
              >
                <option value="">Select an assessment</option>
                {assessments.map((assessment) => (
                  <option key={assessment._id} value={assessment._id}>
                    {assessment.title}
                  </option>
                ))}
              </select>
              {!loading && assessments.length === 0 && (
                <p
                  className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  } mt-2`}
                >
                  No assessments available for this course.
                </p>
              )}
              <button
                onClick={closePopups}
                className={`mt-4 w-full text-white p-2 rounded-md transition ${
                  theme === 'dark'
                    ? 'bg-blue-600 hover:bg-blue-500'
                    : 'bg-[#49BBBD] hover:bg-[#3da4a6]'
                }`}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Assessment Result Popup */}
        {isResultPopupOpen && assessmentResult && !loading && (
          <div
            className={`fixed inset-0 ${
              theme === 'dark'
                ? 'bg-gray-900 bg-opacity-70'
                : 'bg-black bg-opacity-50'
            } flex items-center justify-center z-50`}
          >
            <div
              className={`p-6 rounded-lg shadow-lg w-full max-w-md ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <h2
                className={`text-xl font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                } mb-4`}
              >
                {assessmentResult.assessment.title}
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <p
                    className={`text-sm font-medium ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Type:
                  </p>
                  <p
                    className={`text-base capitalize ${
                      theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                    }`}
                  >
                    {assessmentResult.assessment.type}
                  </p>
                </div>
                <div>
                  <p
                    className={`text-sm font-medium ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Status:
                  </p>
                  <p
                    className={`text-base capitalize ${
                      theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                    }`}
                  >
                    {assessmentResult.status}
                  </p>
                </div>
                <div>
                  <p
                    className={`text-sm font-medium ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Score:
                  </p>
                  <p
                    className={`text-base ${
                      theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                    }`}
                  >
                    {assessmentResult.score}/
                    {assessmentResult.totalPoints || "100 (based on questions)"}
                  </p>
                </div>
                <div>
                  <p
                    className={`text-sm font-medium ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Passing Score:
                  </p>
                  <p
                    className={`text-base ${
                      theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                    }`}
                  >
                    {assessmentResult.assessment.passingScore}
                  </p>
                </div>
                <div>
                  <p
                    className={`text-sm font-medium ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Due Date:
                  </p>
                  <p
                    className={`text-base ${
                      theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                    }`}
                  >
                    {new Date(assessmentResult.assessment.dueDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p
                    className={`text-sm font-medium ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Submission Date:
                  </p>
                  <p
                    className={`text-base ${
                      theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                    }`}
                  >
                    {new Date(assessmentResult.submissionDate).toLocaleString()}
                  </p>
                </div>
              </div>
              <button
                onClick={closePopups}
                className={`mt-4 w-full text-white p-2 rounded-md transition ${
                  theme === 'dark'
                    ? 'bg-blue-600 hover:bg-blue-500'
                    : 'bg-[#49BBBD] hover:bg-[#3da4a6]'
                }`}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssessmentScore;