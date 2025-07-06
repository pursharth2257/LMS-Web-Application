import React, { useState } from 'react';

const MicrosoftAI = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const courses = [
    {
      id: 1,
      title: 'Generative AI Mastery Certificate for Data Analysis',
      subtitle: 'Learn to use ChatGPT & Power BI, & more',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop',
      type: 'Certification',
      duration: '2 Months',
      bgColor: 'linear-gradient(135deg, #1e3a8a 0%, #f97316 100%)'
    },
    {
      id: 2,
      title: 'Generative AI Mastery Certificate for Development',
      subtitle: 'Learn to use GitHub copilot, Azure & more',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop',
      type: 'Certification',
      duration: '2 months',
      bgColor: 'linear-gradient(135deg, #059669 0%, #eab308 100%)'
    },
    {
      id: 3,
      title: 'Generative AI Mastery Certificate for Excellence',
      subtitle: 'Learn to use Copilot, M365 copilot & more',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop',
      type: 'Certification',
      duration: '2 months',
      bgColor: 'linear-gradient(135deg, #dc2626 0%, #f59e0b 100%)'
    },
    {
      id: 4,
      title: 'Generative AI Mastery Certificate for Marketing',
      subtitle: 'Learn to use AI tools for content & campaigns',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=200&fit=crop',
      type: 'Certification',
      duration: '2 months',
      bgColor: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)'
    },
    {
      id: 5,
      title: 'Generative AI Mastery Certificate for Finance',
      subtitle: 'Learn to use AI for financial analysis & reporting',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=200&fit=crop',
      type: 'Certification',
      duration: '2 months',
      bgColor: 'linear-gradient(135deg, #0891b2 0%, #10b981 100%)'
    },
    {
      id: 6,
      title: 'Generative AI Mastery Certificate for Healthcare',
      subtitle: 'Learn to use AI for medical insights & patient care',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=200&fit=crop',
      type: 'Certification',
      duration: '2 months',
      bgColor: 'linear-gradient(135deg, #be185d 0%, #f59e0b 100%)'
    },
    {
      id: 7,
      title: 'Generative AI Mastery Certificate for Education',
      subtitle: 'Learn to use AI for teaching & learning enhancement',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=200&fit=crop',
      type: 'Certification',
      duration: '2 months',
      bgColor: 'linear-gradient(135deg, #1d4ed8 0%, #059669 100%)'
    },
     {
      id: 8,
      title: 'Generative AI Mastery Certificate for Education',
      subtitle: 'Learn to use AI for teaching & learning enhancement',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=200&fit=crop',
      type: 'Certification',
      duration: '2 months',
      bgColor: 'linear-gradient(135deg, #1d4ed8 0%, #059669 100%)'
    }
  ];

  const cardsPerSlide = 2;
  const totalSlides = Math.ceil(courses.length / cardsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getVisibleCourses = () => {
    const startIndex = currentSlide * cardsPerSlide;
    return courses.slice(startIndex, startIndex + cardsPerSlide);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-left mb-12 text-gray-900">
          Master Generative AI with <span className="text-teal-600">Microsoft</span> Technologies
        </h2>

        <div className="relative">
          <button
            className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-teal-600 transition-colors duration-300 ${currentSlide === 0 ? 'hidden' : ''}`}
            onClick={prevSlide}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className="overflow-hidden">
            <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-20 lg:px-40">
                    {courses.slice(slideIndex * cardsPerSlide, (slideIndex + 1) * cardsPerSlide).map((course) => (
                      <div key={course.id} className="bg-white rounded-sm shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200">
                        <div className="p-6 pb-4">
                          <div className="flex items-center gap-2 mb-4">
                            <div className="flex gap-1">
                              <div className="w-2 h-2 bg-red-500 rounded-sm"></div>
                              <div className="w-2 h-2 bg-green-500 rounded-sm"></div>
                              <div className="w-2 h-2 bg-blue-500 rounded-sm"></div>
                              <div className="w-2 h-2 bg-yellow-500 rounded-sm"></div>
                            </div>
                            <span className="text-sm font-semibold text-gray-700">Microsoft</span>
                          </div>
                        </div>

                        <div
                          className="h-32 relative overflow-hidden mx-6 rounded-lg"
                          style={{ background: course.bgColor }}
                        >
                          <img src={course.image} alt={course.title} className="w-full h-full object-cover opacity-80" />
                        </div>

                        <div className="p-6">
                          <h3 className="text-lg font-bold text-gray-900 mb-2 overflow-hidden" style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical'
                          }}>{course.title}</h3>
                          <p className="text-gray-600 mb-4 text-sm">{course.subtitle}</p>

                          <div className="flex items-center gap-4 mb-6 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M12 2L3 7L12 12L21 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M3 17L12 22L21 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M3 12L12 17L21 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              <span>{course.type}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                                <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              <span>{course.duration}</span>
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <button className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-300 font-medium">
                              View Program
                            </button>
                            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-300 font-medium flex items-center gap-2">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M21 15V19A2 2 0 0119 21H5A2 2 0 013 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <polyline points="7,10 12,15 17,10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                              </svg>
                              Syllabus
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-teal-600 transition-colors duration-300 ${currentSlide === totalSlides - 1 ? 'hidden' : ''}`}
            onClick={nextSlide}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
};

export default MicrosoftAI;
