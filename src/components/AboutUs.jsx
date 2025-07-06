import React from "react";
import { Link } from 'react-router-dom'

const AboutUs = () => {
  const features = [
    {
      id: 1,
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      title: "Flexible Course Plan",
      color: "text-teal-600",
    },
    {
      id: 2,
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
      title: "Expert Mentors",
      color: "text-teal-600",
    },
    {
      id: 3,
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 3v6m0 6v6m6-12h-6m-6 0h6"
          />
        </svg>
      ),
      title: "Support Expert",
      color: "text-teal-600",
    },
    {
      id: 4,
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Lifetime Access",
      color: "text-teal-600",
    },
  ];

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      <div className="w-full h-full px-4 sm:px-8 lg:px-16 xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          
          <div className="relative group">
            
            <div className="relative">
              
              <div className="relative w-full max-w-lg mx-auto">
                
                <div className="absolute top-0 left-0 w-56 h-72 rounded-3xl overflow-hidden shadow-lg transform -rotate-6 z-10 transition-all duration-500 group-hover:scale-105 group-hover:-rotate-12 group-hover:shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=600&fit=crop&crop=faces"
                    alt="Students collaborating"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                
                <div className="relative w-56 h-72 rounded-3xl overflow-hidden shadow-xl mx-auto z-20 transition-all duration-500 group-hover:scale-110 group-hover:shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&h=600&fit=crop&crop=faces"
                    alt="Student studying"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                
                <div className="absolute top-0 right-0 w-56 h-72 rounded-3xl overflow-hidden shadow-lg transform rotate-6 z-10 transition-all duration-500 group-hover:scale-105 group-hover:rotate-12 group-hover:shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500&h=600&fit=crop&crop=faces"
                    alt="Students in classroom"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Awards badge */}
                <div className="absolute bottom-8 left-8 bg-white text-teal-600 rounded-2xl p-4 shadow-xl z-30">
                  <div className="flex items-center space-x-3">
                    <svg
                      className="w-8 h-8 text-teal-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 0 0-.584.859 6.753 6.753 0 0 0 6.138 5.6 6.73 6.73 0 0 0 2.743 1.346A6.707 6.707 0 0 1 9.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 0 0-2.25 2.25c0 .414.336.75.75.75h14.25a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 0 1-1.112-3.173 6.73 6.73 0 0 0 2.743-1.347 6.753 6.753 0 0 0 6.139-5.6.75.75 0 0 0-.585-.858 47.077 47.077 0 0 0-3.07-.543V2.62a.75.75 0 0 0-.658-.744 49.22 49.22 0 0 0-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 0 0-.657.744Z" />
                    </svg>
                    <div>
                      <div className="text-2xl font-bold">280+</div>
                      <div className="text-sm opacity-90">Wonderful Awards</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            {/* <div className="absolute top-20 -right-4 w-16 h-16 bg-pink-200 rounded-full opacity-60"></div>
            <div className="absolute bottom-10 -right-8 w-24 h-24 bg-pink-100 rounded-full opacity-40"></div> */}
          </div>

          
          <div className="space-y-6 group-hover:transform group-hover:translate-x-2 transition-all duration-500">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-full text-sm font-medium">
              About Us
            </div>

          
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                Learn and Grow your Skills
                <br />
                From Brain Bridge
              </h2>
            </div>

            
            <p className="text-gray-600 leading-relaxed text-base">
              Lorem ipsum dolor sit amet consectetur adipiscing elit sed eiusmod
              ex tempor incididunt labore dolore magna aliquaenim minim veniam
              quis nostrud exercitation ullamco laboris.
            </p>

        
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <div
                  key={feature.id}
                  className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg bg-white hover:shadow-sm hover:border-l-4 hover:border-l-teal-600 transition-all duration-300 group-hover:transform group-hover:translate-x-1 group-hover:shadow-md"
                  style={{
                    transitionDelay: `${index * 100}ms`
                  }}
                >
                  <div
                    className={`w-8 h-8 ${feature.color} bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:translate-x-1 transition-all duration-300`}
                  >
                    <div className="w-4 h-4 group-hover:rotate-12 group-hover:translate-x-0.5 transition-all duration-300">{feature.icon}</div>
                  </div>
                  <span className="text-gray-900 font-medium text-sm group-hover:text-teal-600 transition-colors duration-300">
                    {feature.title}
                  </span>
                </div>
              ))}
            </div>

            
            <div className="pt-1">
              <Link to = "/about/company"
                className="bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 ease-in-out
                 hover:bg-teal-600 hover:translate-x-1 hover:shadow-lg hover:shadow-teal-600/40"
              >
                Explore More →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
