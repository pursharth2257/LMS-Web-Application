import React, { useState } from "react";
import { Link } from 'react-router-dom';

const PopularCourses = () => {
  const courses = [
    {
      id: 1,
      provider: "ESGCI, Paris",
      title: "Doctorate of Business Administration (DBA)",
      subtitle: "1:1 Thesis Supervision",
      type: "Doctorate",
      duration: "36 Months",
    },
    {
      id: 2,
      provider: "PMI® | UpGrad KnowledgeHut",
      title: "Project Management Professional (PMP)® Certification",
      subtitle: "Guaranteed Exam Pass Study Plan",
      type: "Certification",
      duration: "36 Hrs Live Expert-Led Training",
    },
    {
      id: 3,
      provider: "Scrum Alliance | UpGrad KnowledgeHut",
      title: "CSM® Certification Training",
      subtitle: "Earn 16 PDUs and 16 SEUs",
      type: "Certification",
      duration: "16 Hours",
    },
    {
      id: 4,
      provider: "IIM Ahmedabad",
      title: "Executive MBA",
      subtitle: "IIM Alumni Status",
      type: "Degree",
      duration: "2 Years",
    },
    {
      id: 5,
      provider: "Google | Coursera",
      title: "Google UX Design Certificate",
      subtitle: "Job-ready skills",
      type: "Certification",
      duration: "6 Months",
    },
    {
      id: 6,
      provider: "MIT | edX",
      title: "MicroMasters in Data Science",
      subtitle: "Hands-on Capstone Project",
      type: "Masters",
      duration: "12 Months",
    },
    {
      id: 7,
      provider: "Stanford University",
      title: "AI and Machine Learning",
      subtitle: "Certificate of Completion",
      type: "Certification",
      duration: "8 Weeks",
    },
  ];

  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3;
  const visibleCourses = courses.slice(startIndex, startIndex + visibleCount);

  const handleNext = () => {
    if (startIndex + visibleCount < courses.length) {
      setStartIndex(startIndex + visibleCount);
    }
  };

  const handlePrev = () => {
    if (startIndex - visibleCount >= 0) {
      setStartIndex(startIndex - visibleCount);
    }
  };

  return (
    <section className="py-12 bg-white relative overflow-hidden">
      <div className="w-full px-0 sm:px-2 lg:px-4">
        {/* Header */}
        <div className="mb-8 px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-full text-sm font-medium mb-4">
            Trending Courses
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
            Choose from our{" "}
            <span className="text-teal-600">best-selling courses</span>
          </h2>
        </div>

        {/* Courses Grid with Arrows */}
        <div className="flex items-center gap-2 sm:gap-3 mx-0 px-0">
          
          <button
            onClick={handlePrev}
            disabled={startIndex === 0}
            className={`w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center transition hover:shadow-lg ${
              startIndex === 0 ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"
            }`}
          >
            <span className="text-xl text-gray-700">‹</span>
          </button>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 flex-1">
            {visibleCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 lg:p-5 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 group min-h-[360px] sm:min-h-[400px] flex flex-col w-full"
              >
                
                <div className="flex justify-center mb-3 sm:mb-4">
                  <div className="w-25 h-25 bg-gray-100 rounded-full flex items-center justify-center">
                    <img
                      src={`https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center`}
                      alt={course.provider}
                      className="w-22 h-22 object-contain rounded-full"
                    />
                  </div>
                </div>

                {/* Provider */}
                <div className="text-center mb-2">
                  <p className="text-xs text-gray-600">{course.provider}</p>
                </div>

                
                <h3 className="text-sm sm:text-base font-bold text-gray-900 text-center mb-2 sm:mb-3 group-hover:text-teal-600 transition-colors duration-300 leading-tight flex-grow">
                  {course.title}
                </h3>

              
                <p className="text-xs text-teal-600 text-center mb-3 sm:mb-4">
                  {course.subtitle}
                </p>

                {/* Course Details */}
                <div className="space-y-1 sm:space-y-2 mb-3 sm:mb-4">
                  <div className="flex items-center text-xs text-gray-600">
                    <span className="w-3 h-3 mr-2">📋</span>
                    <span>{course.type}</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <span className="w-3 h-3 mr-2">⏱️</span>
                    <span>{course.duration}</span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex space-x-2 mt-auto">
                  <Link
                    to="/courses/all"
                    className="flex-1 bg-white border border-gray-300 text-gray-700 py-1.5 sm:py-2 px-2 sm:px-3 rounded text-xs hover:bg-gray-50 transition-colors duration-300 text-center"
                  >
                    View Program
                  </Link>
                  <button className="flex-1 bg-teal-600 text-white py-1.5 sm:py-2 px-2 sm:px-3 rounded text-xs hover:bg-teal-500 transition-colors duration-300 flex items-center justify-center">
                    <span className="mr-1">📄</span>
                    Syllabus
                  </button>
                </div>
              </div>
            ))}
          </div>

          
          <button
            onClick={handleNext}
            disabled={startIndex + visibleCount >= courses.length}
            className={`w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center transition hover:shadow-lg ${
              startIndex + visibleCount >= courses.length
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
          >
            <span className="text-xl text-gray-700">›</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopularCourses;
