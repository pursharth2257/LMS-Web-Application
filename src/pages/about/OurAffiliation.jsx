import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const OurAffiliation = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show back to top button after scrolling past 3 sections (approximately 2000px)
      setShowBackToTop(scrollPosition > 2000);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      <section className="bg-gradient-to-r from-teal-600 to-teal-700 py-10">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left Side - Title */}
            <div className="text-white">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-8">
                Affiliations &<br />
                Accreditations
              </h1>

              {/* Navigation Links */}
              <div className="flex flex-wrap gap-3 mt-8">
                <Link to="/about/company" className="bg-gradient-to-r from-white/20 to-white/30 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium hover:from-white/30 hover:to-white/40 cursor-pointer transition-all duration-300 shadow-md">
                  About Brain Bridge
                </Link>
                <Link to="/about/team" className="bg-gradient-to-r from-white/20 to-white/30 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium hover:from-white/30 hover:to-white/40 cursor-pointer transition-all duration-300 shadow-md border-2 border-white/40">
                  Our Affiliations
                </Link>
                <Link to="/about/mission" className="bg-gradient-to-r from-white/20 to-white/30 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium hover:from-white/30 hover:to-white/40 cursor-pointer transition-all duration-300 shadow-md">
                  Our Customers
                </Link>
                <Link to="/about/testimonials" className="bg-gradient-to-r from-white/20 to-white/30 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium hover:from-white/30 hover:to-white/40 cursor-pointer transition-all duration-300 shadow-md">
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

            {/* Right Side - Featured Card */}
            <div className="flex justify-center lg:justify-end">
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-4 shadow-2xl max-w-md w-full border border-teal-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-gradient-to-r from-teal-100 to-teal-200 px-3 py-1 rounded-full shadow-sm">
                    <span className="text-sm font-medium text-teal-700">Featured Certificate</span>
                  </div>
                </div>

                {/* Sample Certificate Image */}
                <div className="w-full h-64 bg-white border-2 border-gray-200 rounded-lg shadow-inner flex items-center justify-center overflow-hidden">
                  {/* Sample certificate image - replace with your actual image */}
                  <img
                    src="https://static.vecteezy.com/system/resources/thumbnails/024/950/072/small_2x/elegant-certificate-of-appreciation-with-gold-medal-free-editor_template.jpeg?last_updated=1687656059"
                    alt="Sample Certificate"
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
                    <p className="text-sm font-medium text-teal-600">Sample Certificate</p>
                    <p className="text-xs text-teal-500">Certificate Image Placeholder</p>
                  </div>
                </div>

                <div className="text-center mt-4">
                  <p className="text-sm text-teal-600 font-medium">Brain Bridge</p>
                  <p className="text-xs text-gray-500">Professional Certification</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-8">

          {/* Section Title */}
          <div className="mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Accreditations & Affiliations
            </h2>
          </div>

          {/* Certificates Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left Certificate - Government of India */}
            <div className="bg-white rounded-lg p-8">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold bg-gradient-to-r from-teal-600 to-teal-700 bg-clip-text text-transparent mb-4">Certificate of Partnership</h3>

                {/* Government of India Logo Section */}
                <div className="flex items-center justify-center space-x-8 mb-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-2 shadow-md">
                      <span className="text-white font-bold text-sm">GOI</span>
                    </div>
                    <div className="text-xs text-teal-600">
                      <div>Government of India</div>
                      <div>Certification from</div>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-teal-600 to-teal-700 rounded-full flex items-center justify-center mx-auto mb-2 shadow-md">
                      <div className="text-white font-bold text-xs">NSDC</div>
                    </div>
                    <div className="text-xs text-teal-600">
                      <div>National Skill</div>
                      <div>Development Corporation</div>
                      <div className="text-teal-500 font-medium">Transforming the skill landscape</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Certificate - NSDC Partnership */}
            <div className="bg-gradient-to-br from-white to-teal-50 rounded-lg shadow-lg p-4 border border-teal-300">
              <div className="text-center">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-teal-700 rounded-full flex items-center justify-center mx-auto mb-2 shadow-md">
                    <div className="text-white font-bold text-xs">NSDC</div>
                  </div>
                </div>

                <h3 className="text-lg font-bold bg-gradient-to-r from-teal-600 to-teal-700 bg-clip-text text-transparent mb-4">NSDC Partnership Certificate</h3>

                {/* Certificate Image Container */}
                <div className="w-full h-80 bg-white border-2 border-gray-200 rounded-lg shadow-inner flex items-center justify-center mb-4 overflow-hidden">
                  {/* Sample NSDC Certificate Image */}
                  <img
                    src="https://via.placeholder.com/600x400/0f766e/ffffff?text=NSDC+Partnership+Certificate%0A%0AHenry+Harvin+India+Education+LLP%0A%0AApproved+Training+Partner%0A%0ANational+Skill+Development+Corporation"
                    alt="NSDC Partnership Certificate"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      // Fallback if image doesn't load
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  {/* Fallback content when image is not available */}
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gradient-to-br from-teal-50 to-teal-100" style={{display: 'none'}}>
                    <svg className="w-16 h-16 mb-4 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm font-medium text-teal-600">NSDC Certificate</p>
                    <p className="text-xs text-teal-500">Partnership Certificate</p>
                  </div>
                </div>

                <p className="text-xs text-teal-600">
                  Henry Harvin India Education LLP - Approved Training Partner of NSDC
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Accreditations & Affiliations Grid Section */}
      <section className="bg-gradient-to-br from-white to-teal-50 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Title */}
          <div className="mb-8 sm:mb-12 text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-teal-800 to-teal-900 bg-clip-text text-transparent mb-2">
              Accreditations & Affiliations
            </h2>
            <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-teal-600 to-teal-700 rounded shadow-sm mx-auto lg:mx-0"></div>
          </div>

          {/* 20 Cards Grid - 4 Rows x 5 Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">

            {/* Row 1 - Cards 1-5 */}
            {/* Card 1 - Skill India & NSDC */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-3 sm:p-4 h-24 sm:h-28 lg:h-32 flex flex-col justify-center items-center mb-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                  <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs font-bold shadow-md">
                    Skill India
                  </div>
                  <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs font-bold shadow-md">
                    NSDC
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs font-medium shadow-md">
                Skill India & NSDC (Center ID- TC101984)
              </div>
            </div>

            {/* Card 2 - BFSI Sector Skill Council */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-4 h-32 flex flex-col justify-center items-center mb-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-20 bg-white border border-teal-200 rounded flex items-center justify-center shadow-sm">
                  <span className="text-xs text-teal-600">Certificate</span>
                </div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                BFSI Sector Skill Council
              </div>
            </div>

            {/* Card 3 - Media & Entertainment */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-4 h-32 flex flex-col justify-center items-center mb-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white font-bold text-xs">M&E</span>
                  </div>
                  <div className="w-8 h-8 bg-gradient-to-r from-teal-600 to-teal-700 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white font-bold text-xs">SC</span>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                Media & Entertainment Sector Skills Council
              </div>
            </div>

            {/* Card 4 - SAP EME */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-4 h-32 flex flex-col justify-center items-center mb-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-4 py-2 rounded font-bold text-sm shadow-md">
                  SAP EME
                </div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                EME
              </div>
            </div>

            {/* Card 5 - AAPC */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-4 h-32 flex flex-col justify-center items-center mb-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-teal-700 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-xs">AAPC</span>
                </div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                AAPC
              </div>
            </div>

            {/* Row 2 - Cards 6-10 */}
            {/* Card 6 - AHDI */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-4 h-32 flex flex-col justify-center items-center mb-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <span className="text-teal-600 font-bold text-xl">ahdi</span>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                AHDI
              </div>
            </div>

            {/* Card 7 - ACCA */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-4 h-32 flex flex-col justify-center items-center mb-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-2 py-1 rounded text-xs font-bold mb-1 shadow-md">
                  SILVER LEARNING PARTNER
                </div>
                <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-bold shadow-md">
                  ACCA
                </div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                ACCA
              </div>
            </div>

            {/* Card 8 - Workday */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-4 h-32 flex flex-col justify-center items-center mb-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-teal-600 font-bold text-lg">workday</div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                Workday
              </div>
            </div>

            {/* Card 9 - AAEFL */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-4 h-32 flex flex-col justify-center items-center mb-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-10 h-10 bg-gradient-to-r from-teal-600 to-teal-700 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-xs">AAEFL</span>
                </div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                AAEFL
              </div>
            </div>

            {/* Card 10 - TEFL Canada */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-4 h-32 flex flex-col justify-center items-center mb-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-2 py-1 rounded font-bold text-sm mb-1 shadow-md">
                  TEFL
                </div>
                <div className="text-teal-600 text-xs font-medium">Canada</div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                TEFL Canada
              </div>
            </div>

            {/* Row 3 - Cards 11-15 */}
            {/* Card 11 - HRCI & PMI */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-4 h-32 flex flex-col justify-center items-center mb-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs mb-1 shadow-md">
                  ACCREDITATION PROVIDER
                </div>
                <div className="text-teal-600 font-bold text-sm">h 2024</div>
                <div className="text-teal-700 font-bold text-sm">PMI</div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                PMI
              </div>
            </div>

            {/* Card 12 - Microsoft */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-4 h-32 flex flex-col justify-center items-center mb-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-teal-600 font-bold text-lg">Microsoft</div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                Microsoft
              </div>
            </div>

            {/* Card 13 - Google */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-4 h-32 flex flex-col justify-center items-center mb-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-teal-600 font-bold text-lg">Google</div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                Google
              </div>
            </div>

            {/* Card 14 - Amazon */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-4 h-32 flex flex-col justify-center items-center mb-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-teal-600 font-bold text-lg">Amazon</div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                Amazon
              </div>
            </div>

            {/* Card 15 - IBM */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-4 h-32 flex flex-col justify-center items-center mb-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-teal-700 font-bold text-lg">IBM</div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                IBM
              </div>
            </div>

            {/* Row 4 - Cards 16-20 */}
            {/* Card 16 - Oracle */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-4 h-32 flex flex-col justify-center items-center mb-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-teal-600 font-bold text-lg">Oracle</div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                Oracle
              </div>
            </div>

            {/* Card 17 - Salesforce */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-4 h-32 flex flex-col justify-center items-center mb-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-teal-600 font-bold text-lg">Salesforce</div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                Salesforce
              </div>
            </div>

            {/* Card 18 - Adobe */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-4 h-32 flex flex-col justify-center items-center mb-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-teal-600 font-bold text-lg">Adobe</div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                Adobe
              </div>
            </div>

            {/* Card 19 - Cisco */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-4 h-32 flex flex-col justify-center items-center mb-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-teal-600 font-bold text-lg">Cisco</div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                Cisco
              </div>
            </div>

            {/* Card 20 - WhatsApp Us */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-4 h-32 flex flex-col justify-center items-center mb-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <button className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-4 py-2 rounded-full flex items-center space-x-1 transition-all duration-300 text-sm shadow-md">
                  <span>💬</span>
                  <span className="font-medium">WhatsApp Us</span>
                  <span className="bg-white text-teal-600 rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold">$</span>
                </button>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                Contact Us
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="bg-gradient-to-br from-teal-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-8">

          {/* Section Title */}
          <div className="mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-teal-700 bg-clip-text text-transparent mb-2">
              Awards
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-teal-600 to-teal-700 rounded shadow-sm"></div>
          </div>

          {/* Awards Grid - First Row (6 Awards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">

            {/* Award 1 - 40 Under 40 Club */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-white to-teal-50 rounded-lg p-4 h-40 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-teal-100">
                <div className="w-20 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded border border-blue-300 flex items-center justify-center mb-2 shadow-sm">
                  <div className="text-center">
                    <div className="text-blue-600 font-bold text-lg">40</div>
                    <div className="text-blue-500 text-xs">UNDER</div>
                    <div className="text-blue-600 text-xs font-semibold">CLUB</div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-2 rounded text-xs font-medium shadow-md">
                40 Under 40 Club of Achievers 2020 Award
              </div>
            </div>

            {/* Award 2 - 30 Most Admired Companies */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-white to-teal-50 rounded-lg p-4 h-40 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-teal-100">
                <div className="w-20 h-24 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded border border-yellow-300 flex items-center justify-center shadow-sm">
                  <div className="text-center">
                    <div className="text-yellow-600 font-bold text-sm">MOST</div>
                    <div className="text-yellow-600 font-bold text-sm">ADMIRED</div>
                    <div className="text-yellow-500 text-xs">2021</div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-2 rounded text-xs font-medium shadow-md">
                30 Most Admired Companies in 2021
              </div>
            </div>

            {/* Award 3 - Best Education Company */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-white to-teal-50 rounded-lg p-4 h-40 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-teal-100">
                <div className="w-20 h-24 bg-gradient-to-br from-orange-100 to-orange-200 rounded border border-orange-300 flex items-center justify-center shadow-sm">
                  <div className="text-center">
                    <div className="text-orange-600 font-bold text-xs">BEST</div>
                    <div className="text-orange-600 font-bold text-xs">EDUCATION</div>
                    <div className="text-orange-500 text-xs">2021</div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-2 rounded text-xs font-medium shadow-md">
                Best Education Company of the Year 2021
              </div>
            </div>

            {/* Award 4 - Game Based Learning */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-white to-teal-50 rounded-lg p-4 h-40 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-teal-100">
                <div className="w-20 h-24 bg-gradient-to-br from-red-100 to-red-200 rounded border border-teal-300 flex items-center justify-center shadow-sm">
                  <div className="text-center">
                    <div className="text-teal-600 font-bold text-xs">GAME</div>
                    <div className="text-teal-600 font-bold text-xs">BASED</div>
                    <div className="text-teal-500 text-xs">2021</div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-2 rounded text-xs font-medium shadow-md">
                Game Based Learning Company of the Year 2021
              </div>
            </div>

            {/* Award 5 - Best Corporate Training */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-white to-teal-50 rounded-lg p-4 h-40 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-teal-100">
                <div className="w-20 h-24 bg-gradient-to-br from-teal-100 to-teal-200 rounded border border-teal-300 flex items-center justify-center shadow-sm">
                  <div className="text-center">
                    <div className="text-teal-600 font-bold text-xs">BEST</div>
                    <div className="text-teal-600 font-bold text-xs">CORPORATE</div>
                    <div className="text-teal-500 text-xs">2021</div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-2 rounded text-xs font-medium shadow-md">
                Best Corporate Training Award in 2021
              </div>
            </div>

            {/* Award 6 - Entrepreneur First */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-white to-teal-50 rounded-lg p-4 h-40 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-teal-100">
                <div className="w-20 h-24 bg-gradient-to-br from-purple-100 to-purple-200 rounded border border-purple-300 flex items-center justify-center shadow-sm">
                  <div className="text-center">
                    <div className="text-purple-600 font-bold text-xs">ENTREPRENEUR</div>
                    <div className="text-purple-600 font-bold text-xs">FIRST</div>
                    <div className="text-purple-500 text-xs">AWARD</div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-2 rounded text-xs font-medium shadow-md">
                Entrepreneur First
              </div>
            </div>

          </div>

          {/* Awards Grid - Second Row (1 Award) */}
          <div className="flex justify-center">
            <div className="text-center max-w-xs">
              <div className="bg-gradient-to-br from-white to-teal-50 rounded-lg p-6 h-40 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-teal-100">
                <div className="w-24 h-28 bg-gradient-to-br from-gray-800 to-gray-900 rounded border border-gray-600 flex items-center justify-center shadow-sm">
                  <div className="text-center">
                    <div className="text-white font-bold text-sm">AWARD</div>
                    <div className="text-gray-300 text-xs">CERTIFICATE</div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-3 py-2 rounded text-xs font-medium shadow-md">
                Excellence Award
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Degree/Diploma Partners Section */}
      <section className="bg-gradient-to-br from-white to-teal-50 py-20">
        <div className="max-w-7xl mx-auto px-8">

          {/* Section Title */}
          <div className="mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-teal-700 bg-clip-text text-transparent mb-2">
              Degree/Diploma Partner(s)
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-teal-600 to-teal-700 rounded shadow-sm"></div>
          </div>

          {/* Partners Grid - First Row (6 Partners) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">

            {/* Partner 1 - Dunster Business School, Switzerland */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-white to-teal-50 rounded-lg p-4 h-40 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-teal-100">
                <div className="w-20 h-24 bg-white border border-gray-300 rounded flex items-center justify-center shadow-sm">
                  <div className="text-center">
                    <div className="w-4 h-4 bg-teal-600 rounded-full mx-auto mb-1"></div>
                    <div className="text-xs text-gray-600 font-medium">CERTIFICATE</div>
                    <div className="text-xs text-gray-500">DUNSTER</div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-2 rounded text-xs font-medium shadow-md">
                Dunster Business School, Switzerland
              </div>
            </div>

            {/* Partner 2 - Royale Business College, United Kingdom */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-white to-teal-50 rounded-lg p-4 h-40 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-teal-100">
                <div className="w-20 h-24 bg-white border border-gray-300 rounded flex items-center justify-center shadow-sm">
                  <div className="text-center">
                    <div className="text-blue-600 font-bold text-xs">ROYALE</div>
                    <div className="text-blue-500 text-xs">BUSINESS</div>
                    <div className="text-blue-400 text-xs">COLLEGE</div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-2 rounded text-xs font-medium shadow-md">
                Royale Business College United Kingdom
              </div>
            </div>

            {/* Partner 3 - Kennedy University, France */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-white to-teal-50 rounded-lg p-4 h-40 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-teal-100">
                <div className="w-20 h-24 bg-white border border-gray-300 rounded flex items-center justify-center shadow-sm">
                  <div className="text-center">
                    <div className="text-blue-600 font-bold text-xs">KENNEDY</div>
                    <div className="text-blue-500 text-xs">UNIVERSITY</div>
                    <div className="text-orange-500 text-xs">FRANCE</div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-2 rounded text-xs font-medium shadow-md">
                Kennedy University, France
              </div>
            </div>

            {/* Partner 4 - R B College, UK */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-white to-teal-50 rounded-lg p-4 h-40 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-teal-100">
                <div className="w-20 h-24 bg-teal-600 rounded flex items-center justify-center shadow-sm">
                  <div className="text-center">
                    <div className="text-white font-bold text-lg">RB</div>
                    <div className="text-white text-xs">COLLEGE</div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-2 rounded text-xs font-medium shadow-md">
                R B College, UK
              </div>
            </div>

            {/* Partner 5 - College de Paris, France */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-white to-teal-50 rounded-lg p-4 h-40 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-teal-100">
                <div className="w-20 h-24 bg-white border border-gray-300 rounded flex items-center justify-center shadow-sm">
                  <div className="text-center">
                    <div className="text-blue-600 font-bold text-xs">COLLEGE</div>
                    <div className="text-blue-500 text-xs">DE PARIS</div>
                    <div className="text-teal-500 text-xs">FRANCE</div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-2 rounded text-xs font-medium shadow-md">
                College de Paris, France
              </div>
            </div>

            {/* Partner 6 - Jain University, India */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-white to-teal-50 rounded-lg p-4 h-40 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-teal-100">
                <div className="w-20 h-24 bg-white border border-gray-300 rounded flex items-center justify-center shadow-sm">
                  <div className="text-center">
                    <div className="text-orange-600 font-bold text-xs">JAIN</div>
                    <div className="text-orange-500 text-xs">UNIVERSITY</div>
                    <div className="text-green-600 text-xs">INDIA</div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-2 rounded text-xs font-medium shadow-md">
                Jain University, India
              </div>
            </div>

          </div>

          {/* Partners Grid - Second Row (4 Partners) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

            {/* Partner 7 - Asian International University, India */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-white to-teal-50 rounded-lg p-4 h-40 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-teal-100">
                <div className="w-20 h-20 bg-white border border-blue-300 rounded-full flex items-center justify-center shadow-sm">
                  <div className="text-center">
                    <div className="text-blue-600 font-bold text-xs">ASIAN</div>
                    <div className="text-blue-500 text-xs">INTL</div>
                    <div className="text-blue-400 text-xs">UNIV</div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-2 rounded text-xs font-medium shadow-md">
                Asian International University, India
              </div>
            </div>

            {/* Partner 8 - Sharda University, India */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-white to-teal-50 rounded-lg p-4 h-40 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-teal-100">
                <div className="w-20 h-24 bg-white border border-gray-300 rounded flex items-center justify-center shadow-sm">
                  <div className="text-center">
                    <div className="text-blue-600 font-bold text-xs">SHARDA</div>
                    <div className="text-blue-500 text-xs">UNIVERSITY</div>
                    <div className="text-green-600 text-xs">INDIA</div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-2 rounded text-xs font-medium shadow-md">
                Sharda University, India
              </div>
            </div>

            {/* Partner 9 - Om Sterling Global University, India */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-white to-teal-50 rounded-lg p-4 h-40 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-teal-100">
                <div className="w-20 h-24 bg-white border border-gray-300 rounded flex items-center justify-center shadow-sm">
                  <div className="text-center">
                    <div className="text-teal-600 font-bold text-xs">OM</div>
                    <div className="text-teal-500 text-xs">STERLING</div>
                    <div className="text-teal-400 text-xs">GLOBAL</div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-2 rounded text-xs font-medium shadow-md">
                Om Sterling Global University, India
              </div>
            </div>

            {/* Partner 10 - EdICT Academy, IT Guwahati, India */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-white to-teal-50 rounded-lg p-4 h-40 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-teal-100">
                <div className="w-20 h-20 bg-gray-800 rounded flex items-center justify-center shadow-sm">
                  <div className="text-center">
                    <div className="text-white font-bold text-xs">EdICT</div>
                    <div className="text-gray-300 text-xs">IT</div>
                    <div className="text-gray-400 text-xs">GUWAHATI</div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-2 rounded text-xs font-medium shadow-md">
                EdICT Academy, IT Guwahati, India
              </div>
            </div>

          </div>

        </div>
      </section>
    </div>
    </>
  );
};

export default OurAffiliation;
