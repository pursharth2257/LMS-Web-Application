import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const OurCustomers = () => {
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
                Our<br />
                Customers
              </h1>
              
              {/* Navigation Links */}
              <div className="flex flex-wrap gap-3 mt-8">
                <Link to="/about/company" className="bg-gradient-to-r from-white/20 to-white/30 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium hover:from-white/30 hover:to-white/40 cursor-pointer transition-all duration-300 shadow-md">
                  About Brain Bridge
                </Link>
                <Link to="/about/team" className="bg-gradient-to-r from-white/20 to-white/30 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium hover:from-white/30 hover:to-white/40 cursor-pointer transition-all duration-300 shadow-md">
                  Our Affiliations
                </Link>
                <Link to="/about/mission" className="bg-gradient-to-r from-white/20 to-white/30 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium hover:from-white/30 hover:to-white/40 cursor-pointer transition-all duration-300 shadow-md border-2 border-white/40">
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

            {/* Right Content - Forbes Card */}
            <div className="lg:w-1/2 flex justify-center lg:justify-end">
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-4 shadow-2xl max-w-md w-full border border-teal-100">

                {/* Sample Image Container */}
                <div className="w-full h-64 bg-white border-2 border-gray-200 rounded-lg shadow-inner flex items-center justify-center overflow-hidden mb-4">
                  {/* Sample image - replace with your actual image */}
                  <img
                    src="https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg"
                    alt="Our Customers Featured Image"
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
                    <p className="text-xs text-teal-500">Our Customers</p>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-sm text-teal-600 font-medium">Brain Bridge</p>
                  <p className="text-xs text-gray-500">Trusted by Leading Companies</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Customer Logos Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-8">

          {/* Customer Companies Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">

            {/* Row 1 */}
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-teal-600 font-bold text-lg">Airtel</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-blue-600 font-bold text-lg">BSNL</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-teal-600 font-bold text-lg italic">DENSO</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-blue-900 font-bold text-lg">Gillette</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-blue-600 font-bold text-lg">HCL</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-teal-600 font-bold text-lg">Hero</div>
            </div>

            {/* Row 2 */}
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-teal-600 font-bold text-lg">HITACHI</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-blue-600 font-bold text-lg">HP</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-green-600 font-bold text-sm">ITC</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-yellow-600 font-bold text-sm">Jet Airways</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-blue-600 font-bold text-sm">L&T</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-teal-600 font-bold text-sm">Maruti</div>
            </div>

            {/* Row 3 */}
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-purple-600 font-bold text-sm">Mindtree</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-orange-600 font-bold text-lg">ORA</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-green-600 font-bold text-sm">Parrys</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-blue-600 font-bold text-sm">Pricol</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-blue-700 font-bold text-lg">SAP</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-gray-700 font-bold text-sm">Standard</div>
            </div>

            {/* Row 4 */}
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-orange-600 font-bold text-lg">Sun</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-blue-800 font-bold text-lg">TATA</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-teal-600 font-bold text-sm">Vodafone</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-teal-600 font-bold text-sm">Adobe</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-blue-600 font-bold text-sm">Aegis</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-green-600 font-bold text-sm">ALSTOM</div>
            </div>

            {/* Row 5 */}
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-blue-600 font-bold text-sm">Ameriprise</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-teal-600 font-bold text-sm">American</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-green-600 font-bold text-sm">Apollo</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-blue-600 font-bold text-sm">British Telecom</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-orange-600 font-bold text-sm">CSAV</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-purple-600 font-bold text-sm">eClerx</div>
            </div>

            {/* Row 6 */}
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-green-600 font-bold text-sm">Fidelity</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-orange-600 font-bold text-sm">Flipkart</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-blue-600 font-bold text-sm">Flowserve</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-orange-600 font-bold text-sm">GoJavas</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-blue-800 font-bold text-sm">HDFC Bank</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-blue-600 font-bold text-sm">Hewlett Packard</div>
            </div>

            {/* Row 7 */}
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-teal-600 font-bold text-sm">Hind Exide</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-orange-600 font-bold text-sm">IndusInd Bank</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-blue-600 font-bold text-sm">KVK</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-green-600 font-bold text-sm">BNP Paribas</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-purple-600 font-bold text-sm">Corporate</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-blue-800 font-bold text-lg">TCS</div>
            </div>

            {/* Row 8 */}
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-teal-600 font-bold text-sm">Medium Hotwire</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-blue-600 font-bold text-sm">Microsoft</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-orange-600 font-bold text-sm">Oceaneering</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-green-600 font-bold text-sm">Olam</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-blue-600 font-bold text-sm">Perrigo</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-purple-600 font-bold text-sm">Pune</div>
            </div>

            {/* Row 9 */}
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-green-600 font-bold text-sm">Ecolab</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-gray-600 font-bold text-sm">Independent</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-blue-800 font-bold text-sm">Reliance</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-teal-600 font-bold text-sm">SASMOS HET</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-blue-600 font-bold text-sm">Smart Megh</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-orange-600 font-bold text-sm">Snapdeal</div>
            </div>

            {/* Row 10 */}
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-blue-600 font-bold text-sm">Standard Chartered</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-green-600 font-bold text-sm">Stefanini IT</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-gray-600 font-bold text-sm">Untitled</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-purple-600 font-bold text-sm">Wisemen</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-blue-600 font-bold text-sm">Xerox Corp</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-teal-600 font-bold text-sm">YASH</div>
            </div>

            {/* Row 11 */}
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-blue-600 font-bold text-sm">ABC Consultants</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-teal-600 font-bold text-sm">ABP</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-orange-600 font-bold text-sm">Aditya Birla</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-blue-600 font-bold text-sm">XL CATLIN</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-gray-600 font-bold text-sm">ANDSLITE</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-teal-600 font-bold text-sm">ANGEL</div>
            </div>

            {/* Row 12 */}
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-purple-600 font-bold text-sm">Association</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-teal-600 font-bold text-sm">Atlas Copco</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-blue-600 font-bold text-sm">BAJAJ FINANCE</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-green-600 font-bold text-sm">Bakerhill</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-orange-600 font-bold text-sm">Birla Institute</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-blue-600 font-bold text-sm">Boston Scientific</div>
            </div>

            {/* Row 13 */}
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-teal-600 font-bold text-sm">Brand Start</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-blue-600 font-bold text-sm">BWR Bharat</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-orange-600 font-bold text-sm">Careers 360</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-purple-600 font-bold text-sm">ChessMate</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-blue-600 font-bold text-sm">CII</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-green-600 font-bold text-sm">Colonel Academy</div>
            </div>

            {/* Row 14 */}
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-green-600 font-bold text-sm">Deloitte</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-yellow-600 font-bold text-sm">DHL</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-blue-600 font-bold text-sm">DREAM</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-orange-600 font-bold text-sm">Early Makers</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-blue-600 font-bold text-sm">Einfochips</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-gray-600 font-bold text-sm">Emerson</div>
            </div>

            {/* Row 15 */}
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-purple-600 font-bold text-sm">Etech Global</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-yellow-600 font-bold text-sm">EY</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-blue-600 font-bold text-sm">Faurecia</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-purple-600 font-bold text-sm">FedEx</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-green-600 font-bold text-sm">Fidelity</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-orange-600 font-bold text-sm">Fluor</div>
            </div>

            {/* Row 16 */}
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-teal-600 font-bold text-sm">Food Service</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-blue-600 font-bold text-sm">Fresenius</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-orange-600 font-bold text-sm">GEOTECH</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-blue-600 font-bold text-sm">GSK</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-gray-600 font-bold text-sm">Granite</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-teal-600 font-bold text-sm">Grant Thornton</div>
            </div>

            {/* Row 17 */}
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-blue-800 font-bold text-sm">HDFC BANK</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-teal-600 font-bold text-sm">Hindpower</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-blue-600 font-bold text-sm">Holostik</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-teal-600 font-bold text-sm">HONDA</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-blue-600 font-bold text-sm">Howden</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-teal-600 font-bold text-sm">IBN</div>
            </div>

            {/* Row 18 */}
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-purple-600 font-bold text-sm">Indus Valley</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-blue-600 font-bold text-sm">IPS</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-yellow-600 font-bold text-sm">Jet Airways</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-blue-600 font-bold text-sm">Jindal Steel</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-blue-600 font-bold text-sm">L&T Infotech</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-blue-600 font-bold text-sm">Lufthansa</div>
            </div>

            {/* Row 19 */}
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-blue-600 font-bold text-sm">Maersk</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-orange-600 font-bold text-sm">MET</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-blue-600 font-bold text-sm">Metso</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-teal-600 font-bold text-sm">Milton Cycles</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-teal-600 font-bold text-sm">Mitsubishi</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-blue-600 font-bold text-sm">Mizuho</div>
            </div>

            {/* Row 20 */}
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-blue-600 font-bold text-sm">Modern School</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-green-600 font-bold text-sm">Modi Naturals</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-blue-600 font-bold text-sm">Morgan Stanley</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-purple-600 font-bold text-sm">NAESYS</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-green-600 font-bold text-sm">NCDC</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-blue-600 font-bold text-sm">Nielsen</div>
            </div>

            {/* Row 21 */}
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-teal-600 font-bold text-sm">NIIT</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-blue-600 font-bold text-sm">Nomura</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-blue-600 font-bold text-sm">Panasonic</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-blue-600 font-bold text-sm">PHILIPS</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-orange-600 font-bold text-sm">Porteck</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-purple-600 font-bold text-sm">Quantum</div>
            </div>

            {/* Row 22 */}
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-green-600 font-bold text-sm">Quickbooks</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-blue-600 font-bold text-sm">R1</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-teal-600 font-bold text-sm">Religare</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-blue-600 font-bold text-sm">RG GROUP</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-orange-600 font-bold text-sm">Ronnie Finance</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-blue-600 font-bold text-sm">Rustomjee</div>
            </div>

            {/* Row 23 */}
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-yellow-600 font-bold text-sm">SARENS</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-blue-600 font-bold text-sm">Satyam</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-gray-600 font-bold text-sm">SHADES</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-purple-600 font-bold text-sm">Show Buzz</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-blue-600 font-bold text-sm">Software One</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-blue-800 font-bold text-sm">TATA POWER</div>
            </div>

            {/* Row 24 */}
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-blue-600 font-bold text-sm">Tech Mahindra</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-orange-600 font-bold text-sm">TechProcess</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-green-600 font-bold text-sm">Techprocompsoft</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-blue-600 font-bold text-sm">George Institute</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-teal-600 font-bold text-sm">Thomas Cook</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-blue-600 font-bold text-sm">Trent</div>
            </div>

            {/* Row 25 */}
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-teal-600 font-bold text-sm">UK INDIA</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-blue-600 font-bold text-sm">Unique Logistics</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-orange-600 font-bold text-sm">UT DALLAS</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-blue-600 font-bold text-sm">Varun Beverages</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-teal-600 font-bold text-sm">VIDEOCON</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-blue-600 font-bold text-sm">Vidya</div>
            </div>

            {/* Row 26 */}
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-blue-600 font-bold text-sm">WAPCOS</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-blue-600 font-bold text-sm">Wipro</div>
            </div>
            <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
              <div className="text-orange-600 font-bold text-sm">WNS</div>
            </div>

          </div>

        </div>
      </section>

    </div>
    </>
  );
};

export default OurCustomers;
