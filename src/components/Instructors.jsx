import React from 'react';
import { FaShare, FaArrowUp, FaBook, FaUserGraduate } from 'react-icons/fa';

const Instructors = () => {
  const instructors = [
    {
      id: 1,
      name: "Jenny Wilson",
      role: "Digital Marketer",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=400&q=80",
      bgColor: "bg-cyan-400",
      courses: "85",
      students: "1.5k"
    },
    {
      id: 2,
      name: "Darrell Steward",
      role: "Designer",
      image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=400&q=80",
      bgColor: "bg-gray-200",
      courses: "106",
      students: "2k"
    },
    {
      id: 3,
      name: "Ronald Richards",
      role: "WordPress Developer",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=400&q=80",
      bgColor: "bg-gray-200",
      courses: "92",
      students: "1.8k"
    },
    {
      id: 4,
      name: "Albert Flores",
      role: "Fitness Trainer",
      image: "https://www.upgrad.com/_ww3-next/image/?url=https%3A%2F%2Fd2o2utebsixu4k.cloudfront.net%2F4th%20persona%20(1)-3dcd8428d10845678f2b561213cbd582.webp&w=640&q=75",
      bgColor: "bg-cyan-400",
      courses: "78",
      students: "1.2k"
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-12 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-full text-sm font-medium mb-4">
            Instructors
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Our Expert Instructors
          </h2>
        </div>

        {/* Instructors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {instructors.map((instructor) => (
            <div
              key={instructor.id}
              className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className={`relative h-48 ${instructor.bgColor} overflow-hidden`}>
                <img
                  src={instructor.image}
                  alt={instructor.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(instructor.name)}&background=6366f1&color=fff&size=300`;
                  }}
                />

                {/* Share Button */}
                <button className="absolute top-3 right-3 w-8 h-8 bg-teal-600 hover:bg-teal-700 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md">
                  <FaShare className="w-3 h-3" />
                </button>
              </div>

              {/* Content */}
              <div className="p-3 text-center">
                <h3 className="text-base font-bold text-gray-900 mb-1 group-hover:text-teal-600 transition-colors duration-300">
                  {instructor.name}
                </h3>
                <p className="text-gray-600 text-xs">
                  {instructor.role}
                </p>

                {/* Stats - Hidden by default, shown on hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="flex items-center justify-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1 text-teal-600">
                      <FaBook className="w-3 h-3" />
                      <span className="font-medium">{instructor.courses} Courses</span>
                    </div>
                    <div className="flex items-center space-x-1 text-teal-600">
                      <FaUserGraduate className="w-3 h-3" />
                      <span className="font-medium">{instructor.students} Students</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Bottom spacing for scroll button */}
        <div className="mt-8"></div>
      </div>



      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-orange-400 to-teal-500 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 z-50"
      >
        <FaArrowUp className="w-4 h-4" />
      </button>

    
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-purple-200 to-teal-200 rounded-full opacity-20 blur-xl"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 blur-xl"></div>
      
      
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400 rounded-full"></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-teal-400 rounded-full"></div>
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-blue-400 rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-orange-400 rounded-full"></div>
      </div>
    </section>
  );
};

export default Instructors;
