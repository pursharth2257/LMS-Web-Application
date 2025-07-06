// import React from 'react';
// import AboutTemplate from './AboutTemplate';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

const AboutBrainBridge = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [currentMediaSlide, setCurrentMediaSlide] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling past 3 sections (approximately 2000px)
      const scrollPosition = window.scrollY;
      setShowBackToTop(scrollPosition > 2000);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Media carousel navigation functions
  const nextMediaSlide = () => {
    setCurrentMediaSlide((prev) => (prev + 1) % 3); // 3 sets of 2 cards each
  };

  const prevMediaSlide = () => {
    setCurrentMediaSlide((prev) => (prev - 1 + 3) % 3);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes slideInfinite {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-slide-infinite {
            animation: slideInfinite 30s linear infinite;
          }
        `
      }} />
    <div className="font-sans antialiased">
      {/* Hero Section */}
      <section className="bg-white pb-8 sm:pb-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <div className="max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 sm:mb-6 text-gray-800">
                We are <span className="text-teal-600">South Asia's Premier Higher EdTech</span> Platform.
              </h1>
              <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-gray-600 mb-6 sm:mb-8 font-normal">
                Empowering over 10 million learners globally, Brain Bridge leverages advanced
                technology, world-class faculty, and industry partnerships to bring impactful
                online learning. Our mission? To redefine professional growth by making
                quality education accessible to everyone.
              </p>
              <Link to = "/about/contact" className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-600/30">
                Talk to a career expert
              </Link>
            </div>
            <div className="flex justify-center items-center mt-8 lg:mt-0">
              <img
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Graduates celebrating with caps in the air"
                className="w-full max-w-sm sm:max-w-md lg:max-w-lg h-64 sm:h-80 lg:h-96 object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Meet our founders Section */}
      <section className="bg-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-8 sm:mb-12 text-center lg:text-left">
            Meet our <span className="text-teal-600">founders</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Founder 1 */}
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                alt="Ronnie Screwvala"
                className="w-full h-48 sm:h-56 lg:h-64 object-cover"
              />
              <div className="p-4 sm:p-6">
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 leading-relaxed">
                  Named in 'Asia's 25 Most Powerful People' by Fortune Magazine
                </p>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">Ronnie Screwvala</h3>
                <p className="text-gray-600 text-xs sm:text-sm">Co-Founder & Chairperson</p>
              </div>
            </div>

            {/* Founder 2 */}
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
                alt="Mayank Kumar" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  Forty under 40 achiever by Economic Times in 2023
                </p>
                <h3 className="text-xl font-bold text-gray-800 mb-1">Mayank Kumar</h3>
                <p className="text-gray-600 text-sm">Co-Founder</p>
              </div>
            </div>

            {/* Founder 3 */}
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img 
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
                alt="Phalgun Kompalli" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  Named the 'BW Education 40 under 40 Achiever' by Business World in 2020
                </p>
                <h3 className="text-xl font-bold text-gray-800 mb-1">Phalgun Kompalli</h3>
                <p className="text-gray-600 text-sm">Co-Founder</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What gives us an edge Section */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-12 lg:gap-16">
            {/* Left Side - Sticky Content */}
            <div className="lg:col-span-2 lg:sticky lg:top-20 lg:self-start text-center lg:text-left">
              <p className="text-xs sm:text-sm font-semibold text-gray-600 mb-3 sm:mb-4 tracking-wide uppercase">
                LEARNER SUPPORT & SUCCESS
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">
                What gives us
              </h2>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-teal-600 mb-6 sm:mb-8">
                an edge?
              </h2>
              <button
                onClick={() => {
                  // Add click functionality
                  alert('Welcome! Let\'s get started with your learning journey!');
                  
                }}
                className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-teal-600/30 flex items-center gap-2 cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Get started with Brain Bridge
              </button>
            </div>

            {/* Right Side - Scrolling Cards */}
            <div className="lg:col-span-3 space-y-6 sm:space-y-8">
              {/* Row 1 - Two Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {/* Card 1 - Hiring Partners */}
                <div
                  className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                    hoveredCard === 'hiring' ? 'shadow-xl scale-105' : ''
                  }`}
                  onMouseEnter={() => setHoveredCard('hiring')}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => alert('Learn more about our 1400+ hiring partners!')}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-3xl font-bold text-gray-800 mb-2">1400+</h3>
                      <p className="text-lg font-semibold text-gray-800 mb-2">Hiring Partners</p>
                      <p className="text-gray-600 text-sm">
                        Discover your dream job with personalised career
                      </p>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex gap-1">
                        <div className="w-6 h-6 bg-teal-600 rounded flex items-center justify-center text-white text-xs font-bold">G</div>
                        <div className="w-6 h-6 bg-purple-500 rounded flex items-center justify-center text-white text-xs font-bold">M</div>
                        <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center text-white text-xs font-bold">A</div>
                      </div>
                      <div className="flex gap-1">
                        <div className="w-6 h-6 bg-teal-600 rounded flex items-center justify-center text-white text-xs font-bold">T</div>
                        <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center text-white text-xs font-bold">I</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 2 - Courses */}
                <div
                  className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                    hoveredCard === 'courses' ? 'shadow-xl scale-105' : ''
                  }`}
                  onMouseEnter={() => setHoveredCard('courses')}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => alert('Explore our 200+ courses!')}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-3xl font-bold text-gray-800 mb-2">200+</h3>
                      <p className="text-lg font-semibold text-gray-800 mb-2">Courses</p>
                      <p className="text-gray-600 text-sm">
                        Match your goals with the right course
                      </p>
                    </div>
                    <div className="w-20 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center">
                      <div className="w-16 h-12 bg-white rounded shadow-sm flex items-center justify-center">
                        <div className="text-orange-500 text-xs font-bold">CERT</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2 - Two Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Card 3 - Industry Experts */}
                <div
                  className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                    hoveredCard === 'experts' ? 'shadow-xl scale-105' : ''
                  }`}
                  onMouseEnter={() => setHoveredCard('experts')}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => alert('Meet our 250+ industry experts!')}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-3xl font-bold text-gray-800 mb-2">250+</h3>
                      <p className="text-lg font-semibold text-gray-800 mb-2">Industry Experts</p>
                      <p className="text-gray-600 text-sm">
                        Boost your learning with engaging live classes
                      </p>
                    </div>
                    <div className="w-20 h-16 bg-gradient-to-br from-teal-100 to-teal-200 rounded-lg flex items-center justify-center">
                      <div className="w-16 h-12 bg-white rounded shadow-sm flex items-center justify-center">
                        <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
                          <div className="w-4 h-4 bg-white rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 4 - Career Experts */}
                <div
                  className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                    hoveredCard === 'career' ? 'shadow-xl scale-105' : ''
                  }`}
                  onMouseEnter={() => setHoveredCard('career')}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => alert('Connect with our 500+ career experts!')}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-3xl font-bold text-gray-800 mb-2">500+</h3>
                      <p className="text-lg font-semibold text-gray-800 mb-2">Career Experts</p>
                      <p className="text-gray-600 text-sm">
                        Get advice on picking the right course
                      </p>
                    </div>
                    <div className="w-20 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center">
                      <div className="flex gap-1">
                        <div className="w-6 h-12 bg-gray-300 rounded flex items-center justify-center">
                          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                        </div>
                        <div className="w-6 h-12 bg-gray-300 rounded flex items-center justify-center">
                          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 3 - Full Width Card */}
              <div className="w-full">
                {/* Card 5 - Industry Problems */}
                <div
                  className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                    hoveredCard === 'problems' ? 'shadow-xl scale-105' : ''
                  }`}
                  onMouseEnter={() => setHoveredCard('problems')}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => alert('Solve 300+ real industry problems!')}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-4xl font-bold text-gray-800 mb-2">300+</h3>
                      <p className="text-xl font-semibold text-gray-800 mb-2">Industry Problems</p>
                      <p className="text-gray-600">
                        Get job-ready with practical knowledge & real-world experience
                      </p>
                    </div>
                    <div className="w-32 h-24 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center">
                      <div className="grid grid-cols-3 gap-1">
                        <div className="w-6 h-6 bg-purple-200 rounded"></div>
                        <div className="w-6 h-6 bg-purple-300 rounded"></div>
                        <div className="w-6 h-6 bg-purple-400 rounded"></div>
                        <div className="w-6 h-6 bg-purple-300 rounded"></div>
                        <div className="w-6 h-6 bg-purple-500 rounded"></div>
                        <div className="w-6 h-6 bg-purple-400 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Top Button - Fixed Left Bottom */}
      {showBackToTop && (
        <div className="fixed left-8 bottom-8 z-50">
          <button
            onClick={scrollToTop}
            className="w-12 h-12 bg-white border-2 border-teal-600 rounded-full flex items-center justify-center hover:bg-teal-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      )}

      {/* What drives us Section */}
      <section className="bg-white py-20 relative">

        <div className="max-w-7xl mx-auto px-8">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              What <span className="text-teal-600">drives</span> us?
            </h2>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Our Vision Card */}
            <div className="bg-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow">
              {/* Full Width Image Area */}
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center relative">
                {/* Telescope Icon - Full Width */}
                <div className="relative scale-150">
                  <div className="w-16 h-4 bg-teal-600 rounded-full"></div>
                  <div className="w-12 h-12 bg-gray-800 rounded-full absolute -right-4 -top-4"></div>
                  <div className="w-6 h-6 bg-white rounded-full absolute -right-1 -top-1"></div>
                  <div className="absolute -bottom-6 left-4">
                    <div className="w-3 h-8 bg-gray-600"></div>
                    <div className="w-8 h-3 bg-gray-600 -mt-2"></div>
                  </div>
                  {/* Person silhouette */}
                  <div className="absolute -bottom-8 -left-8">
                    <div className="w-4 h-6 bg-gray-700 rounded-t-full"></div>
                    <div className="w-6 h-4 bg-gray-700 rounded-full -mt-1 -ml-1"></div>
                  </div>
                </div>
              </div>
              {/* Card Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Our Vision</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Powering career success for every member of the global workforce as their trusted lifelong learning partner.
                </p>
              </div>
            </div>

            {/* Our Mission Card */}
            <div className="bg-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow">
              {/* Full Width Image Area */}
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center relative">
                {/* Target Icon - Full Width */}
                <div className="relative scale-150">
                  <div className="w-16 h-16 border-4 border-teal-600 rounded-full"></div>
                  <div className="w-12 h-12 border-4 border-teal-500 rounded-full absolute top-2 left-2"></div>
                  <div className="w-6 h-6 border-4 border-teal-400 rounded-full absolute top-5 left-5"></div>
                  <div className="w-2 h-2 bg-teal-600 rounded-full absolute top-7 left-7"></div>
                  {/* Arrow */}
                  <div className="absolute -right-4 top-8">
                    <div className="w-8 h-1 bg-teal-700"></div>
                    <div className="w-3 h-3 bg-teal-700 transform rotate-45 -mt-1 ml-6"></div>
                    <div className="w-2 h-2 bg-teal-700 transform rotate-45 -mt-2 ml-1"></div>
                  </div>
                </div>
              </div>
              {/* Card Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Our Mission</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Making our learners achieve their desired outcomes.
                </p>
              </div>
            </div>

            {/* Our Core Values Card */}
            <div className="bg-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow">
              {/* Full Width Image Area */}
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center relative">
                {/* Diamond Icon - Full Width */}
                <div className="relative scale-150">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-600 transform rotate-45"></div>
                  <div className="w-8 h-8 bg-gradient-to-br from-teal-300 to-teal-500 transform rotate-45 absolute top-2 left-2"></div>
                  <div className="w-6 h-6 bg-gradient-to-br from-teal-200 to-teal-400 transform rotate-45 absolute top-3 left-3"></div>
                  <div className="w-4 h-4 bg-gradient-to-br from-cyan-200 to-teal-300 transform rotate-45 absolute top-4 left-4"></div>
                  {/* Sparkle effects */}
                  <div className="absolute -top-4 -left-2">
                    <div className="w-2 h-2 bg-teal-400 transform rotate-45"></div>
                  </div>
                  <div className="absolute -top-2 -right-4">
                    <div className="w-1 h-1 bg-teal-500 transform rotate-45"></div>
                  </div>
                  <div className="absolute -bottom-4 -right-2">
                    <div className="w-2 h-2 bg-teal-400 transform rotate-45"></div>
                  </div>
                </div>
              </div>
              {/* Card Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Our Core Values</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Powering career success for every member of the global workforce as their trusted lifelong learning partner.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Timeline Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-8">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              A quick look at our <span className="text-teal-500">journey</span>
            </h2>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Simple Timeline connecting lines - Hidden on mobile */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 pointer-events-none" style={{zIndex: 0, top: 0, width: '400px', height: '100%'}}>
              <svg width="400" height="3000" style={{overflow: 'visible'}}>
                {/* Complete curved line from 1 to 6 - stops at circle 6 */}
                <path
                  d="M 200 120
                     Q 320 220 200 380
                     Q 80 540 200 700
                     Q 320 860 200 1020
                     Q 80 1180 200 1340"
                  stroke="#d1d5db"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="8,4"
                />
              </svg>
            </div>

            {/* Mobile Timeline - Simple vertical line */}
            <div className="md:hidden absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300 pointer-events-none" style={{zIndex: 0}}></div>

            {/* Timeline Items */}
            <div className="space-y-8 md:space-y-16">

              {/* 2015 */}
              <div className="relative flex items-center">
                <div className="w-full md:w-1/2 pl-16 md:pl-0 md:pr-8">
                  <div className="bg-white rounded-lg p-4 md:p-6 shadow-lg">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 md:mb-4">2015</h3>
                    <div className="space-y-2 md:space-y-3">
                      <div className="flex items-start gap-2 md:gap-3">
                        <div className="w-3 h-3 md:w-4 md:h-4 border-2 border-gray-400 rounded-full mt-1 flex-shrink-0"></div>
                        <p className="text-gray-600 text-xs md:text-sm">Founders Ronnie, Mayank, and Phalgun established Brain Bridge</p>
                      </div>
                      <div className="flex items-start gap-2 md:gap-3">
                        <div className="w-3 h-3 md:w-4 md:h-4 border-2 border-gray-400 rounded-full mt-1 flex-shrink-0"></div>
                        <p className="text-gray-600 text-xs md:text-sm">Officially launched on March 23, 2015</p>
                      </div>
                      <div className="flex items-start gap-2 md:gap-3">
                        <div className="w-3 h-3 md:w-4 md:h-4 border-2 border-gray-400 rounded-full mt-1 flex-shrink-0"></div>
                        <p className="text-gray-600 text-xs md:text-sm">Started an Entrepreneurship program and joined the Skill India Mission</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-6 h-6 md:w-8 md:h-8 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-xs md:text-sm z-20">
                  1
                </div>
                <div className="hidden md:block w-1/2 pl-8"></div>
              </div>

              {/* 2016 */}
              <div className="relative flex items-center">
                <div className="hidden md:block w-1/2 pr-8"></div>
                <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-6 h-6 md:w-8 md:h-8 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-xs md:text-sm z-20">
                  2
                </div>
                <div className="w-full md:w-1/2 pl-16 md:pl-8">
                  <div className="bg-white rounded-lg p-4 md:p-6 shadow-lg">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 md:mb-4">2016</h3>
                    <div className="space-y-2 md:space-y-3">
                      <div className="flex items-start gap-2 md:gap-3">
                        <div className="w-3 h-3 md:w-4 md:h-4 border-2 border-gray-400 rounded-full mt-1 flex-shrink-0"></div>
                        <p className="text-gray-600 text-xs md:text-sm">Graduated the first batch of 114 learners</p>
                      </div>
                      <div className="flex items-start gap-2 md:gap-3">
                        <div className="w-3 h-3 md:w-4 md:h-4 border-2 border-gray-400 rounded-full mt-1 flex-shrink-0"></div>
                        <p className="text-gray-600 text-xs md:text-sm">Launched the first program: "Startup with Brain Bridge" in Entrepreneurship</p>
                      </div>
                      <div className="flex items-start gap-2 md:gap-3">
                        <div className="w-3 h-3 md:w-4 md:h-4 border-2 border-gray-400 rounded-full mt-1 flex-shrink-0"></div>
                        <p className="text-gray-600 text-xs md:text-sm">Forged the first university partnership with IIITB to launch a Data Science program</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2017 & 2018 */}
              <div className="relative flex items-center">
                <div className="w-full md:w-1/2 pl-16 md:pl-0 md:pr-8">
                  <div className="bg-white rounded-lg p-4 md:p-6 shadow-lg">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 md:mb-4">2017 & 2018</h3>
                    <div className="space-y-2 md:space-y-3">
                      <div className="flex items-start gap-2 md:gap-3">
                        <div className="w-3 h-3 md:w-4 md:h-4 border-2 border-gray-400 rounded-full mt-1 flex-shrink-0"></div>
                        <p className="text-gray-600 text-xs md:text-sm">Reached over 10,000 learners</p>
                      </div>
                      <div className="flex items-start gap-2 md:gap-3">
                        <div className="w-3 h-3 md:w-4 md:h-4 border-2 border-gray-400 rounded-full mt-1 flex-shrink-0"></div>
                        <p className="text-gray-600 text-xs md:text-sm">Achieved 450+ successful career transitions</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-6 h-6 md:w-8 md:h-8 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-xs md:text-sm z-20">
                  3
                </div>
                <div className="hidden md:block w-1/2 pl-8"></div>
              </div>

              {/* 2019 */}
              <div className="relative flex items-center">
                <div className="hidden md:block w-1/2 pr-8"></div>
                <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-6 h-6 md:w-8 md:h-8 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-xs md:text-sm z-20">
                  4
                </div>
                <div className="w-full md:w-1/2 pl-16 md:pl-8">
                  <div className="bg-white rounded-lg p-4 md:p-6 shadow-lg">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 md:mb-4">2019</h3>
                    <div className="space-y-2 md:space-y-3">
                      <div className="flex items-start gap-2 md:gap-3">
                        <div className="w-3 h-3 md:w-4 md:h-4 border-2 border-gray-400 rounded-full mt-1 flex-shrink-0"></div>
                        <p className="text-gray-600 text-xs md:text-sm">Expanded partnerships and became India's largest online higher education company</p>
                      </div>
                      <div className="flex items-start gap-2 md:gap-3">
                        <div className="w-3 h-3 md:w-4 md:h-4 border-2 border-gray-400 rounded-full mt-1 flex-shrink-0"></div>
                        <p className="text-gray-600 text-xs md:text-sm">Led the market in gross revenue for the <span className="text-blue-600">Indian EdTech sector</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2020 */}
              <div className="relative flex items-center">
                <div className="w-full md:w-1/2 pl-16 md:pl-0 md:pr-8">
                  <div className="bg-white rounded-lg p-4 md:p-6 shadow-lg">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 md:mb-4">2020</h3>
                    <div className="space-y-2 md:space-y-3">
                      <div className="flex items-start gap-2 md:gap-3">
                        <div className="w-3 h-3 md:w-4 md:h-4 border-2 border-gray-400 rounded-full mt-1 flex-shrink-0"></div>
                        <p className="text-gray-600 text-xs md:text-sm">Surpassed 1 million registered learners</p>
                      </div>
                      <div className="flex items-start gap-2 md:gap-3">
                        <div className="w-3 h-3 md:w-4 md:h-4 border-2 border-gray-400 rounded-full mt-1 flex-shrink-0"></div>
                        <p className="text-gray-600 text-xs md:text-sm">Launched new verticals: Brain Bridge Degrees, Brain Bridge Rekrut, and Brain Bridge Study Abroad</p>
                      </div>
                      <div className="flex items-start gap-2 md:gap-3">
                        <div className="w-3 h-3 md:w-4 md:h-4 border-2 border-gray-400 rounded-full mt-1 flex-shrink-0"></div>
                        <p className="text-gray-600 text-xs md:text-sm">Launched Global MBA with UK & Australian universities</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-6 h-6 md:w-8 md:h-8 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-xs md:text-sm z-20">
                  5
                </div>
                <div className="hidden md:block w-1/2 pl-8"></div>
              </div>

              {/* 2021 */}
              <div className="relative flex items-center">
                <div className="hidden md:block w-1/2 pr-8"></div>
                <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-6 h-6 md:w-8 md:h-8 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-xs md:text-sm z-20">
                  6
                </div>
                <div className="w-full md:w-1/2 pl-16 md:pl-8">
                  <div className="bg-white rounded-lg p-4 md:p-6 shadow-lg">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 md:mb-4">2021</h3>
                    <div className="space-y-2 md:space-y-3">
                      <div className="flex items-start gap-2 md:gap-3">
                        <div className="w-3 h-3 md:w-4 md:h-4 border-2 border-gray-400 rounded-full mt-1 flex-shrink-0"></div>
                        <p className="text-gray-600 text-xs md:text-sm">Attained Unicorn status with a $1.2 billion valuation</p>
                      </div>
                      <div className="flex items-start gap-2 md:gap-3">
                        <div className="w-3 h-3 md:w-4 md:h-4 border-2 border-gray-400 rounded-full mt-1 flex-shrink-0"></div>
                        <p className="text-gray-600 text-xs md:text-sm">Expanded to North America, Europe, Middle East & the Asia Pacific</p>
                      </div>
                      <div className="flex items-start gap-2 md:gap-3">
                        <div className="w-3 h-3 md:w-4 md:h-4 border-2 border-gray-400 rounded-full mt-1 flex-shrink-0"></div>
                        <p className="text-gray-600 text-xs md:text-sm">Diversified offerings to include certifications, Bootcamps, and Study Abroad programs</p>
                      </div>
                      <div className="flex items-start gap-2 md:gap-3">
                        <div className="w-3 h-3 md:w-4 md:h-4 border-2 border-gray-400 rounded-full mt-1 flex-shrink-0"></div>
                        <p className="text-gray-600 text-xs md:text-sm">Completed three mergers and acquisitions</p>
                      </div>
                      <div className="flex items-start gap-2 md:gap-3">
                        <div className="w-3 h-3 md:w-4 md:h-4 border-2 border-gray-400 rounded-full mt-1 flex-shrink-0"></div>
                        <p className="text-gray-600 text-xs md:text-sm">Reached over 2 million registered learners</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-8 md:mt-16">
            <Link to = "/" className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 md:py-4 md:px-8 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg text-sm md:text-base">
              Begin your journey with us
            </Link>
          </div>
        </div>
      </section>

      {/* Awards & Accomplishments Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-8">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Awards & <span className="text-teal-500">Accomplishments</span>
            </h2>
          </div>

          {/* Auto-sliding Awards Carousel */}
          <div className="relative overflow-hidden">
            <div className="flex animate-slide-infinite space-x-8" style={{
              animation: 'slideInfinite 30s linear infinite',
              width: 'calc(400px * 16)' // 8 cards × 2 for seamless loop
            }}>

              {/* Award Card 1 */}
              <div className="flex-shrink-0 w-80 bg-white rounded-lg shadow-lg p-6 border">
                <div className="text-center">
                  <div className="w-20 h-20 bg-orange-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <div className="w-12 h-12 bg-orange-200 rounded"></div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Year</h3>
                  <p className="text-sm text-gray-600 mb-2">Education Award</p>
                  <p className="text-xs text-gray-500">Best Education Company</p>
                </div>
              </div>

              {/* Award Card 2 */}
              <div className="flex-shrink-0 w-80 bg-white rounded-lg shadow-lg p-6 border">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-800 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <div className="text-white font-bold text-sm">BRAND</div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Burgundy Private Hurun India</h3>
                  <p className="text-sm text-gray-600 mb-2">500</p>
                  <p className="text-xs text-gray-500">Brain Bridge ranks in Top brands on the 2021 & 2022 Burgundy Private Hurun India 500</p>
                </div>
              </div>

              {/* Award Card 3 */}
              <div className="flex-shrink-0 w-80 bg-white rounded-lg shadow-lg p-6 border">
                <div className="text-center">
                  <div className="w-20 h-20 bg-blue-900 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <div className="text-white font-bold text-xs">BRANDON HALL</div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Gold Award</h3>
                  <p className="text-sm text-gray-600 mb-2">Brandon Hall</p>
                  <p className="text-xs text-gray-500">Brain Bridge for Business has won TWO GOLD AWARDS at Brandon Hall.</p>
                </div>
              </div>

              {/* Award Card 4 */}
              <div className="flex-shrink-0 w-80 bg-white rounded-lg shadow-lg p-6 border">
                <div className="text-center">
                  <div className="w-20 h-20 bg-yellow-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <div className="text-yellow-800 font-bold text-lg">ET</div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Most Promising Brand</h3>
                  <p className="text-sm text-gray-600 mb-2">The Economic Times</p>
                  <p className="text-xs text-gray-500">Brain Bridge recognised as The Economic Times' Most Promising Brand 2022</p>
                </div>
              </div>

              {/* Award Card 5 */}
              <div className="flex-shrink-0 w-80 bg-white rounded-lg shadow-lg p-6 border">
                <div className="text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <div className="w-12 h-12 bg-green-200 rounded"></div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Innovation Award</h3>
                  <p className="text-sm text-gray-600 mb-2">Tech Excellence</p>
                  <p className="text-xs text-gray-500">Recognized for innovative learning solutions</p>
                </div>
              </div>

              {/* Award Card 6 */}
              <div className="flex-shrink-0 w-80 bg-white rounded-lg shadow-lg p-6 border">
                <div className="text-center">
                  <div className="w-20 h-20 bg-purple-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <div className="w-12 h-12 bg-purple-200 rounded"></div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Excellence Award</h3>
                  <p className="text-sm text-gray-600 mb-2">Industry Recognition</p>
                  <p className="text-xs text-gray-500">Outstanding contribution to online education</p>
                </div>
              </div>

              {/* Award Card 7 */}
              <div className="flex-shrink-0 w-80 bg-white rounded-lg shadow-lg p-6 border">
                <div className="text-center">
                  <div className="w-20 h-20 bg-teal-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <div className="w-12 h-12 bg-teal-200 rounded"></div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Leadership Award</h3>
                  <p className="text-sm text-gray-600 mb-2">Business Excellence</p>
                  <p className="text-xs text-gray-500">Leading transformation in higher education</p>
                </div>
              </div>

              {/* Award Card 8 */}
              <div className="flex-shrink-0 w-80 bg-white rounded-lg shadow-lg p-6 border">
                <div className="text-center">
                  <div className="w-20 h-20 bg-blue-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <div className="w-12 h-12 bg-blue-200 rounded"></div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Growth Award</h3>
                  <p className="text-sm text-gray-600 mb-2">Market Leader</p>
                  <p className="text-xs text-gray-500">Fastest growing EdTech platform</p>
                </div>
              </div>

              {/* Duplicate cards for seamless loop */}
              <div className="flex-shrink-0 w-80 bg-white rounded-lg shadow-lg p-6 border">
                <div className="text-center">
                  <div className="w-20 h-20 bg-orange-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <div className="w-12 h-12 bg-orange-200 rounded"></div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Year</h3>
                  <p className="text-sm text-gray-600 mb-2">Education Award</p>
                  <p className="text-xs text-gray-500">Best Education Company</p>
                </div>
              </div>

              <div className="flex-shrink-0 w-80 bg-white rounded-lg shadow-lg p-6 border">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-800 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <div className="text-white font-bold text-sm">BRAND</div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Burgundy Private Hurun India</h3>
                  <p className="text-sm text-gray-600 mb-2">500</p>
                  <p className="text-xs text-gray-500">Brain Bridge ranks in Top brands on the 2021 & 2022 Burgundy Private Hurun India 500</p>
                </div>
              </div>

              <div className="flex-shrink-0 w-80 bg-white rounded-lg shadow-lg p-6 border">
                <div className="text-center">
                  <div className="w-20 h-20 bg-blue-900 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <div className="text-white font-bold text-xs">BRANDON HALL</div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Gold Award</h3>
                  <p className="text-sm text-gray-600 mb-2">Brandon Hall</p>
                  <p className="text-xs text-gray-500">Brain Bridge for Business has won TWO GOLD AWARDS at Brandon Hall.</p>
                </div>
              </div>

              <div className="flex-shrink-0 w-80 bg-white rounded-lg shadow-lg p-6 border">
                <div className="text-center">
                  <div className="w-20 h-20 bg-yellow-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <div className="text-yellow-800 font-bold text-lg">ET</div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Most Promising Brand</h3>
                  <p className="text-sm text-gray-600 mb-2">The Economic Times</p>
                  <p className="text-xs text-gray-500">Brain Bridge recognised as The Economic Times' Most Promising Brand 2022</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Our presence in the media Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-8">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Our presence in the <span className="text-teal-500">media</span>
            </h2>
          </div>

          {/* Media Cards Carousel */}
          <div className="relative">
            {/* Navigation Arrows - Hidden on mobile */}
            <button
              onClick={prevMediaSlide}
              className="hidden md:flex absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg items-center justify-center hover:shadow-xl transition-shadow hover:bg-gray-50"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextMediaSlide}
              className="hidden md:flex absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg items-center justify-center hover:shadow-xl transition-shadow hover:bg-gray-50"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Mobile Navigation Dots */}
            <div className="flex md:hidden justify-center mb-6 space-x-2">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  onClick={() => setCurrentMediaSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentMediaSlide === index ? 'bg-teal-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            {/* Cards Container */}
            <div className="overflow-hidden mx-0 md:mx-12">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentMediaSlide * 100}%)` }}
              >

                {/* Slide 1 - Cards 1 & 2 */}
                <div className="flex-shrink-0 w-full flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
                  {/* Media Card 1 - Financial Times */}
                  <div className="w-full md:w-1/2 bg-white rounded-lg shadow-lg p-4 md:p-6 border">
                    <div className="mb-4">
                      <div className="text-teal-500 text-xs font-semibold mb-2">BW Top Education Award 2023</div>
                      <div className="text-xl md:text-2xl font-bold text-gray-800 mb-2">FINANCIAL TIMES</div>
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-gray-800 mb-3">EdTech of the Year</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Brain Bridge wins BW Top Education Award in Best E-Learning Company
                    </p>
                    <div className="text-xs text-gray-500">Jul 11, 2023</div>
                  </div>

                  {/* Media Card 2 - Business Standard */}
                  <div className="w-full md:w-1/2 bg-white rounded-lg shadow-lg p-4 md:p-6 border">
                    <div className="mb-4">
                      <div className="text-teal-500 text-xs font-semibold mb-2">Hurun India</div>
                      <div className="text-xl md:text-2xl font-bold text-teal-600 mb-2">Business Standard</div>
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-gray-800 mb-3">Burgundy Private Hurun India 500</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Brain Bridge crosses 10 million enrolments across 100+ nations!
                    </p>
                    <div className="text-xs text-gray-500">May 17, 2023</div>
                  </div>
                </div>

                {/* Slide 2 - Cards 3 & 4 */}
                <div className="flex-shrink-0 w-full flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
                  {/* Media Card 3 - Business Standard */}
                  <div className="w-full md:w-1/2 bg-white rounded-lg shadow-lg p-4 md:p-6 border">
                    <div className="mb-4">
                      <div className="text-teal-500 text-xs font-semibold mb-2">Brandon Hall</div>
                      <div className="text-xl md:text-2xl font-bold text-teal-600 mb-2">Business Standard</div>
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-gray-800 mb-3">Gold Award</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Brain Bridge leads the pack in EdTech Management Courses: Co-founder talks about millennials' drive to stand out!
                    </p>
                    <div className="text-xs text-gray-500">June 30, 2023</div>
                  </div>

                  {/* Media Card 4 - The Economic Times */}
                  <div className="w-full md:w-1/2 bg-white rounded-lg shadow-lg p-4 md:p-6 border">
                    <div className="mb-4">
                      <div className="text-teal-500 text-xs font-semibold mb-2">The Economic Times</div>
                      <div className="text-xl md:text-2xl font-bold text-gray-800 mb-2">THE ECONOMIC TIMES</div>
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-gray-800 mb-3">Most Promising Brand</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Brain Bridge recognised as The Economic Times' Most Promising Brand 2022
                    </p>
                    <div className="text-xs text-gray-500">Dec 15, 2022</div>
                  </div>
                </div>

                {/* Slide 3 - Cards 5 & 6 */}
                <div className="flex-shrink-0 w-full flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
                  {/* Media Card 5 - Tech Crunch */}
                  <div className="w-full md:w-1/2 bg-white rounded-lg shadow-lg p-4 md:p-6 border">
                    <div className="mb-4">
                      <div className="text-teal-500 text-xs font-semibold mb-2">Tech Innovation</div>
                      <div className="text-xl md:text-2xl font-bold text-gray-800 mb-2">TECH CRUNCH</div>
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-gray-800 mb-3">EdTech Innovation Leader</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Brain Bridge's innovative approach to online education transforms learning experience
                    </p>
                    <div className="text-xs text-gray-500">Aug 22, 2023</div>
                  </div>

                  {/* Media Card 6 - Forbes */}
                  <div className="w-full md:w-1/2 bg-white rounded-lg shadow-lg p-4 md:p-6 border">
                    <div className="mb-4">
                      <div className="text-teal-500 text-xs font-semibold mb-2">Business Excellence</div>
                      <div className="text-xl md:text-2xl font-bold text-gray-800 mb-2">FORBES</div>
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-gray-800 mb-3">Unicorn Success Story</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      How Brain Bridge became India's leading EdTech unicorn with global expansion
                    </p>
                    <div className="text-xs text-gray-500">Sep 10, 2023</div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get in touch Section */}
      <section className="bg-teal-50 py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left Side - Illustration */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative">
                {/* Main illustration container */}
                <div className="relative w-80 h-80">
                  {/* Background elements */}
                  <div className="absolute top-10 left-10 w-32 h-24 bg-gray-300 rounded-lg transform rotate-12 opacity-90"></div>
                  <div className="absolute top-16 left-16 w-28 h-20 bg-gray-200 rounded-lg transform rotate-12"></div>

                  {/* Gear/Settings icon */}
                  <div className="absolute top-8 right-12 w-12 h-12 border-4 border-pink-400 rounded-full">
                    <div className="absolute inset-2 border-2 border-pink-400 rounded-full"></div>
                    <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-pink-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                    {/* Gear teeth */}
                    <div className="absolute -top-1 left-1/2 w-2 h-2 bg-pink-400 transform -translate-x-1/2"></div>
                    <div className="absolute -bottom-1 left-1/2 w-2 h-2 bg-pink-400 transform -translate-x-1/2"></div>
                    <div className="absolute top-1/2 -left-1 w-2 h-2 bg-pink-400 transform -translate-y-1/2"></div>
                    <div className="absolute top-1/2 -right-1 w-2 h-2 bg-pink-400 transform -translate-y-1/2"></div>
                  </div>

                  {/* Person illustration */}
                  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                    {/* Person body */}
                    <div className="relative">
                      {/* Head */}
                      <div className="w-16 h-16 bg-gradient-to-b from-pink-300 to-pink-400 rounded-full mx-auto mb-2">
                        {/* Hair */}
                        <div className="absolute -top-2 left-2 w-12 h-8 bg-gray-600 rounded-t-full"></div>
                        {/* Face features */}
                        <div className="absolute top-4 left-4 w-2 h-2 bg-white rounded-full"></div>
                        <div className="absolute top-4 right-4 w-2 h-2 bg-white rounded-full"></div>
                        <div className="absolute bottom-4 left-1/2 w-4 h-2 bg-gray-400 rounded-full transform -translate-x-1/2"></div>
                      </div>

                      {/* Body */}
                      <div className="w-20 h-24 bg-gradient-to-b from-gray-400 to-gray-500 rounded-t-3xl mx-auto">
                        {/* Arms */}
                        <div className="absolute top-16 -left-3 w-6 h-16 bg-gray-400 rounded-full transform rotate-12"></div>
                        <div className="absolute top-16 -right-3 w-6 h-16 bg-gray-400 rounded-full transform -rotate-12"></div>

                        {/* Hands */}
                        <div className="absolute top-28 -left-1 w-4 h-4 bg-pink-300 rounded-full"></div>
                        <div className="absolute top-28 -right-1 w-4 h-4 bg-pink-300 rounded-full"></div>
                      </div>

                      {/* Legs */}
                      <div className="flex justify-center space-x-2 mt-1">
                        <div className="w-4 h-12 bg-teal-800 rounded-full"></div>
                        <div className="w-4 h-12 bg-teal-800 rounded-full"></div>
                      </div>

                      {/* Feet */}
                      <div className="flex justify-center space-x-4 mt-1">
                        <div className="w-6 h-3 bg-gray-800 rounded-full"></div>
                        <div className="w-6 h-3 bg-gray-800 rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  {/* Floating elements */}
                  <div className="absolute top-4 left-4 w-8 h-8 bg-purple-400 rounded-lg transform rotate-45 opacity-80"></div>
                  <div className="absolute bottom-4 right-8 w-6 h-6 bg-yellow-400 rounded-full opacity-90"></div>
                  <div className="absolute top-1/2 left-2 w-4 h-4 bg-green-400 rounded-full opacity-70"></div>
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="text-gray-800">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Get in touch.
              </h2>
              <p className="text-lg lg:text-xl leading-relaxed mb-8 text-gray-600">
                Our advisors are available around the clock to answer questions and support your educational journey. Connect with us today to explore how Brain Bridge can help you meet your career goals.
              </p>
              <Link to = "/about/contact" className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-600/30">
                Talk to a counsellor
              </Link>
            </div>

          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default AboutBrainBridge;
