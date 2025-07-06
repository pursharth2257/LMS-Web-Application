import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Company Logo Components (Simple SVG representations)
const CompanyLogos = {
  Microsoft: () => (
    <div className="w-12 h-12 bg-blue-600 rounded flex items-center justify-center">
      <span className="text-white font-bold text-xs">MS</span>
    </div>
  ),
  Amazon: () => (
    <div className="w-12 h-12 bg-orange-500 rounded flex items-center justify-center">
      <span className="text-white font-bold text-xs">amazon</span>
    </div>
  ),
  Google: () => (
    <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center">
      <span className="text-white font-bold text-xs">G</span>
    </div>
  ),
  Netflix: () => (
    <div className="w-12 h-12 bg-teal-600 rounded flex items-center justify-center">
      <span className="text-white font-bold text-xs">N</span>
    </div>
  ),
  Adobe: () => (
    <div className="w-12 h-12 bg-teal-500 rounded flex items-center justify-center">
      <span className="text-white font-bold text-xs">Ae</span>
    </div>
  ),
  IBM: () => (
    <div className="w-12 h-12 bg-blue-800 rounded flex items-center justify-center">
      <span className="text-white font-bold text-xs">IBM</span>
    </div>
  ),
  Flipkart: () => (
    <div className="w-12 h-12 bg-orange-500 rounded flex items-center justify-center">
      <span className="text-white font-bold text-xs">FK</span>
    </div>
  ),
  TCS: () => (
    <div className="w-12 h-12 bg-blue-800 rounded flex items-center justify-center">
      <span className="text-white font-bold text-xs">TCS</span>
    </div>
  ),
  Wipro: () => (
    <div className="w-12 h-12 bg-blue-600 rounded flex items-center justify-center">
      <span className="text-white font-bold text-xs">W</span>
    </div>
  ),
  Cognizant: () => (
    <div className="w-12 h-12 bg-blue-500 rounded flex items-center justify-center">
      <span className="text-white font-bold text-xs">CTS</span>
    </div>
  ),
  Default: ({ name, color = "gray-600" }) => (
    <div className={`w-12 h-12 bg-${color} rounded flex items-center justify-center`}>
      <span className="text-white font-bold text-xs">{name.slice(0, 3).toUpperCase()}</span>
    </div>
  )
};

const PlacementPartners = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const threshold = windowHeight * 3; // Show after 3 sections
      
      setShowBackToTop(scrollPosition > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
    <div className="min-h-screen bg-white">
      
      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed left-6 bottom-6 z-50 w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:-translate-y-1"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-600 to-teal-700 py-20 pt-8">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            
            {/* Left Content */}
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
                Placement<br />
                Partners
              </h1>
              
              {/* Navigation Links */}
              <div className="flex flex-wrap gap-3 mt-8">
                <Link to="/about/company" className="bg-gradient-to-r from-white/20 to-white/30 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium hover:from-white/30 hover:to-white/40 cursor-pointer transition-all duration-300 shadow-md">
                  About Brain Bridge
                </Link>
                <Link to="/about/team" className="bg-gradient-to-r from-white/20 to-white/30 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium hover:from-white/30 hover:to-white/40 cursor-pointer transition-all duration-300 shadow-md">
                  Our Affiliations
                </Link>
                <Link to="/about/mission" className="bg-gradient-to-r from-white/20 to-white/30 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium hover:from-white/30 hover:to-white/40 cursor-pointer transition-all duration-300 shadow-md">
                  Our Customers
                </Link>
                <Link to="/about/testimonials" className="bg-gradient-to-r from-white/20 to-white/30 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium hover:from-white/30 hover:to-white/40 cursor-pointer transition-all duration-300 shadow-md border-2 border-white/40">
                  Placement Partners
                </Link>
                <Link to="/reviews/participant" className="bg-gradient-to-r from-white/20 to-white/30 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium hover:from-white/30 hover:to-white/40 cursor-pointer transition-all duration-300 shadow-md">
                  Participant Reviews
                </Link>
                <Link to="/reviews/corporate" className="bg-gradient-to-r from-white/20 to-white/30 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium hover:from-white/30 hover:to-white/40 cursor-pointer transition-all duration-300 shadow-md">
                  Corporate Training Reviews
                </Link>
                <Link to="/reviews/college" className="bg-gradient-to-r from-white/20 to-white/30 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium hover:from-white/30 hover:to-white/40 cursor-pointer transition-all duration-300 shadow-md">
                  College Training Reviews
                </Link>
                <Link to="/reviews/job-support" className="bg-gradient-to-r from-white/20 to-white/30 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium hover:from-white/30 hover:to-white/40 cursor-pointer transition-all duration-300 shadow-md">
                  Job Support Reviews
                </Link>
                <Link to="/courses/all" className="bg-gradient-to-r from-white/20 to-white/30 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium hover:from-white/30 hover:to-white/40 cursor-pointer transition-all duration-300 shadow-md">
                  All Courses
                </Link>
              </div>
            </div>

            {/* Right Content - Featured Image */}
            <div className="lg:w-1/2 flex justify-center lg:justify-end">
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-4 shadow-2xl max-w-md w-full border border-teal-100">
                {/* Sample Image Container */}
                <div className="w-full h-64 bg-white border-2 border-gray-200 rounded-lg shadow-inner flex items-center justify-center overflow-hidden mb-4">
                  {/* Sample image - replace with your actual image */}
                  <img
                    src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg"
                    alt="Placement Partners Featured Image"
                    className="w-full h-full object-cover rounded"
                    onError={(e) => {
                      // Fallback if image doesn't load
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  {/* Fallback content */}
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gradient-to-br from-teal-50 to-teal-100" style={{display: 'none'}}>
                    <svg className="w-16 h-16 mb-4 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm font-medium text-teal-600">Featured Image</p>
                    <p className="text-xs text-teal-500">Placement Partners</p>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-sm text-teal-600 font-medium">Brain Bridge</p>
                  <p className="text-xs text-gray-500">Connecting Talent with Opportunity</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Placement Partners Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-8">
          
          {/* Section Title */}
          <div className="mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-teal-700 bg-clip-text text-transparent mb-2">
              Placement Partners
            </h2>
          </div>

          {/* Placement Partners Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">

            {/* Row 1 */}
            <div className="text-center">
              <div className="bg-white rounded-lg p-3 sm:p-4 h-20 sm:h-24 flex flex-col justify-center items-center mb-2 sm:mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="text-green-600 font-bold text-xs sm:text-sm">Scribe EMR</div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs font-medium shadow-md">
                Scribe EMR System
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-lg p-4 h-24 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="text-blue-600 font-bold text-sm">AQuity</div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                AQuity Solutions
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-lg p-4 h-24 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="text-gray-800 font-bold text-sm">EduRun</div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                Edurun Virtuoso
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-lg p-4 h-24 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="text-orange-600 font-bold text-sm">Scribeemed</div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                Scribeemed
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-lg p-4 h-24 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="text-teal-600 font-bold text-sm">ACUSIS</div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                Acusis Software
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-lg p-4 h-24 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="text-blue-600 font-bold text-sm">ELICO</div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                Elico Healthcare
              </div>
            </div>

            {/* Row 2 */}
            <div className="text-center">
              <div className="bg-white rounded-lg p-4 h-24 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="text-purple-600 font-bold text-sm">GENESIS</div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                Genesis Transcriptions
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-lg p-4 h-24 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="text-blue-600 font-bold text-sm">StarMedix</div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                StarMedix Medical
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-lg p-4 h-24 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="text-green-600 font-bold text-sm">Seyyone</div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                Seyyone Software
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-lg p-4 h-24 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="text-teal-600 font-bold text-sm">Panacea</div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                Panacea
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-lg p-4 h-24 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="text-blue-600 font-bold text-sm">Xerox</div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                Xerox
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-lg p-4 h-24 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="text-teal-600 font-bold text-sm">Honeywell</div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                Honeywell
              </div>
            </div>

            {/* Row 3 */}
            <div className="text-center">
              <div className="bg-white rounded-lg p-4 h-24 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="text-blue-600 font-bold text-sm">Walmart</div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                Walmart
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-lg p-4 h-24 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <CompanyLogos.Amazon />
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                Amazon
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-lg p-4 h-24 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="text-teal-600 font-bold text-sm">Bosch</div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                Bosch
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-lg p-4 h-24 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="text-blue-600 font-bold text-sm">Citi India</div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                Citi India
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-lg p-4 h-24 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="text-blue-600 font-bold text-sm">Dell</div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                Dell Technologies
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-lg p-4 h-24 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="text-blue-600 font-bold text-sm">Deutsche Bank</div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                Deutsche Bank
              </div>
            </div>

            {/* Row 4 */}
            <div className="text-center">
              <div className="bg-white rounded-lg p-4 h-24 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="text-blue-600 font-bold text-sm">PepsiCo</div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                PepsiCo
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-lg p-4 h-24 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="text-teal-600 font-bold text-sm">Wells Fargo</div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                Wells Fargo
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-lg p-4 h-24 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="text-purple-600 font-bold text-sm">WPP</div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                WPP
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-lg p-4 h-24 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="text-green-600 font-bold text-sm">ITC Infotech</div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                ITC Infotech
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-lg p-4 h-24 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="text-blue-600 font-bold text-sm">LTI Mindtree</div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                LTI Mindtree
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-lg p-4 h-24 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <CompanyLogos.Adobe />
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                Adobe
              </div>
            </div>

            {/* Row 5 */}
            <div className="text-center">
              <div className="bg-white rounded-lg p-4 h-24 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <CompanyLogos.Cognizant />
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                Cognizant
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-lg p-4 h-24 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <CompanyLogos.Flipkart />
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                Flipkart
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-lg p-4 h-24 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <CompanyLogos.Google />
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                YouTube
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-lg p-4 h-24 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="text-teal-600 font-bold text-sm">Coca Cola</div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                Coca Cola
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-lg p-4 h-24 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="text-teal-600 font-bold text-sm">Air India</div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                Air India
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-lg p-4 h-24 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <CompanyLogos.IBM />
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                IBM
              </div>
            </div>

            {/* Row 6 */}
            <div className="text-center">
              <div className="bg-white rounded-lg p-4 h-24 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <CompanyLogos.Netflix />
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                Netflix
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-lg p-4 h-24 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="text-orange-600 font-bold text-sm">Firefox</div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                Firefox
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-lg p-4 h-24 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="text-purple-600 font-bold text-sm">OLX</div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                OLX
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-lg p-4 h-24 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="text-blue-600 font-bold text-sm">Twitter</div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                Twitter
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-lg p-4 h-24 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <CompanyLogos.Microsoft />
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                Microsoft
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-lg p-4 h-24 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="text-blue-600 font-bold text-sm">Hindustan Unilever</div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                Hindustan Unilever
              </div>
            </div>

            {/* Row 7 */}
            <div className="text-center">
              <div className="bg-white rounded-lg p-4 h-24 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="text-teal-600 font-bold text-sm">Axis Bank</div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                Axis Bank
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-lg p-4 h-24 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <CompanyLogos.TCS />
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                Tata Consultancy Services
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-lg p-4 h-24 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="text-teal-600 font-bold text-sm">Kotak Mahindra</div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                Kotak Mahindra Bank
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-lg p-4 h-24 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <CompanyLogos.Wipro />
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                Wipro
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-lg p-4 h-24 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="text-blue-600 font-bold text-sm">HCL Technologies</div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                HCL Technologies
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-lg p-4 h-24 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="text-blue-800 font-bold text-sm">Tata Steel</div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                Tata Steel
              </div>
            </div>

            {/* Row 8 */}
            <div className="text-center">
              <div className="bg-white rounded-lg p-4 h-24 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="text-orange-600 font-bold text-sm">Bank of Baroda</div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                Bank of Baroda
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-lg p-4 h-24 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="text-blue-600 font-bold text-sm">GAIL India</div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                GAIL India
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-lg p-4 h-24 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="text-blue-600 font-bold text-sm">Bajaj Auto</div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                Bajaj Auto
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-lg p-4 h-24 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="text-green-600 font-bold text-sm">IDBI Bank</div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                IDBI Bank
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-lg p-4 h-24 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="text-blue-600 font-bold text-sm">Motherson Sumi</div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                Motherson Sumi Systems
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-lg p-4 h-24 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="text-purple-600 font-bold text-sm">Century Textiles</div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                Century Textiles Ind
              </div>
            </div>

            {/* Row 9 */}
            <div className="text-center">
              <div className="bg-white rounded-lg p-4 h-24 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="text-blue-600 font-bold text-sm">Indraprastha Gas</div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                Indraprastha Gas
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-lg p-4 h-24 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="text-green-600 font-bold text-sm">Indian Oil</div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                Indian Oil Corporation
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-lg p-4 h-24 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="text-blue-600 font-bold text-sm">Jindal Steel</div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                Jindal Steel & Power
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
    </>
  );
};

export default PlacementPartners;
