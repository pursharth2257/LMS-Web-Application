import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

// Data for navigation links (shared with OurAffiliation.js)
const navLinks = [
  { to: '/about/company', label: 'About Brain Bridge' },
  { to: '/about/team', label: 'Our Affiliations' },
  { to: '/about/mission', label: 'Our Customers', active: true },
  { to: '/about/testimonials', label: 'Placement Partners' },
  { to: '/reviews/participant', label: 'Participant Reviews' },
  { to: '/reviews/corporate', label: 'Corporate Training Reviews' },
  { to: '/reviews/college', label: 'College Training Reviews' },
  { to: '/reviews/job-support', label: 'Job Support Reviews' },
  { to: '/courses/all', label: 'All Courses' },
];

// Data for customer logos
const customers = [
  { name: 'Airtel', color: 'teal-600' },
  { name: 'BSNL', color: 'blue-600' },
  { name: 'DENSO', color: 'teal-600', italic: true },
  { name: 'Gillette', color: 'blue-900' },
  { name: 'HCL', color: 'blue-600' },
  { name: 'Hero', color: 'teal-600' },
  { name: 'HITACHI', color: 'teal-600' },
  { name: 'HP', color: 'blue-600' },
  { name: 'ITC', color: 'green-600', size: 'text-sm' },
  { name: 'Jet Airways', color: 'yellow-600', size: 'text-sm' },
  { name: 'L&T', color: 'blue-600', size: 'text-sm' },
  { name: 'Maruti', color: 'teal-600', size: 'text-sm' },
  { name: 'Mindtree', color: 'purple-600', size: 'text-sm' },
  { name: 'ORA', color: 'orange-600' },
  { name: 'Parrys', color: 'green-600', size: 'text-sm' },
  { name: 'Pricol', color: 'blue-600', size: 'text-sm' },
  { name: 'SAP', color: 'blue-700' },
  { name: 'Standard', color: 'gray-700', size: 'text-sm' },
  { name: 'Sun', color: 'orange-600' },
  { name: 'TATA', color: 'blue-800' },
  { name: 'Vodafone', color: 'teal-600', size: 'text-sm' },
  { name: 'Adobe', color: 'teal-600', size: 'text-sm' },
  { name: 'Aegis', color: 'blue-600', size: 'text-sm' },
  { name: 'ALSTOM', color: 'green-600', size: 'text-sm' },
  { name: 'Ameriprise', color: 'blue-600', size: 'text-sm' },
  { name: 'American', color: 'teal-600', size: 'text-sm' },
  { name: 'Apollo', color: 'green-600', size: 'text-sm' },
  { name: 'British Telecom', color: 'blue-600', size: 'text-sm' },
  { name: 'CSAV', color: 'orange-600', size: 'text-sm' },
  { name: 'eClerx', color: 'purple-600', size: 'text-sm' },
  { name: 'Fidelity', color: 'green-600', size: 'text-sm' },
  { name: 'Flipkart', color: 'orange-600', size: 'text-sm' },
  { name: 'Flowserve', color: 'blue-600', size: 'text-sm' },
  { name: 'GoJavas', color: 'orange-600', size: 'text-sm' },
  { name: 'HDFC Bank', color: 'blue-800', size: 'text-sm' },
  { name: 'Hewlett Packard', color: 'blue-600', size: 'text-sm' },
  { name: 'Hind Exide', color: 'teal-600', size: 'text-sm' },
  { name: 'IndusInd Bank', color: 'orange-600', size: 'text-sm' },
  { name: 'KVK', color: 'blue-600', size: 'text-sm' },
  { name: 'BNP Paribas', color: 'green-600', size: 'text-sm' },
  { name: 'Corporate', color: 'purple-600', size: 'text-sm' },
  { name: 'TCS', color: 'blue-800' },
  { name: 'Medium Hotwire', color: 'teal-600', size: 'text-sm' },
  { name: 'Microsoft', color: 'blue-600', size: 'text-sm' },
  { name: 'Oceaneering', color: 'orange-600', size: 'text-sm' },
  { name: 'Olam', color: 'green-600', size: 'text-sm' },
  { name: 'Perrigo', color: 'blue-600', size: 'text-sm' },
  { name: 'Pune', color: 'purple-600', size: 'text-sm' },
  { name: 'Ecolab', color: 'green-600', size: 'text-sm' },
  { name: 'Independent', color: 'gray-600', size: 'text-sm' },
  { name: 'Reliance', color: 'blue-800', size: 'text-sm' },
  { name: 'SASMOS HET', color: 'teal-600', size: 'text-sm' },
  { name: 'Smart Megh', color: 'blue-600', size: 'text-sm' },
  { name: 'Snapdeal', color: 'orange-600', size: 'text-sm' },
  { name: 'Standard Chartered', color: 'blue-600', size: 'text-sm' },
  { name: 'Stefanini IT', color: 'green-600', size: 'text-sm' },
  { name: 'Untitled', color: 'gray-600', size: 'text-sm' },
  { name: 'Wisemen', color: 'purple-600', size: 'text-sm' },
  { name: 'Xerox Corp', color: 'blue-600', size: 'text-sm' },
  { name: 'YASH', color: 'teal-600', size: 'text-sm' },
  { name: 'ABC Consultants', color: 'blue-600', size: 'text-sm' },
  { name: 'ABP', color: 'teal-600', size: 'text-sm' },
  { name: 'Aditya Birla', color: 'orange-600', size: 'text-sm' },
  { name: 'XL CATLIN', color: 'blue-600', size: 'text-sm' },
  { name: 'ANDSLITE', color: 'gray-600', size: 'text-sm' },
  { name: 'ANGEL', color: 'teal-600', size: 'text-sm' },
  { name: 'Association', color: 'purple-600', size: 'text-sm' },
  { name: 'Atlas Copco', color: 'teal-600', size: 'text-sm' },
  { name: 'BAJAJ FINANCE', color: 'blue-600', size: 'text-sm' },
  { name: 'Bakerhill', color: 'green-600', size: 'text-sm' },
  { name: 'Birla Institute', color: 'orange-600', size: 'text-sm' },
  { name: 'Boston Scientific', color: 'blue-600', size: 'text-sm' },
  { name: 'Brand Start', color: 'teal-600', size: 'text-sm' },
  { name: 'BWR Bharat', color: 'blue-600', size: 'text-sm' },
  { name: 'Careers 360', color: 'orange-600', size: 'text-sm' },
  { name: 'ChessMate', color: 'purple-600', size: 'text-sm' },
  { name: 'CII', color: 'blue-600', size: 'text-sm' },
  { name: 'Colonel Academy', color: 'green-600', size: 'text-sm' },
  { name: 'Deloitte', color: 'green-600', size: 'text-sm' },
  { name: 'DHL', color: 'yellow-600', size: 'text-sm' },
  { name: 'DREAM', color: 'blue-600', size: 'text-sm' },
  { name: 'Early Makers', color: 'orange-600', size: 'text-sm' },
  { name: 'Einfochips', color: 'blue-600', size: 'text-sm' },
  { name: 'Emerson', color: 'gray-600', size: 'text-sm' },
  { name: 'Etech Global', color: 'purple-600', size: 'text-sm' },
  { name: 'EY', color: 'yellow-600', size: 'text-sm' },
  { name: 'Faurecia', color: 'blue-600', size: 'text-sm' },
  { name: 'FedEx', color: 'purple-600', size: 'text-sm' },
  { name: 'Fidelity', color: 'green-600', size: 'text-sm' },
  { name: 'Fluor', color: 'orange-600', size: 'text-sm' },
  { name: 'Food Service', color: 'teal-600', size: 'text-sm' },
  { name: 'Fresenius', color: 'blue-600', size: 'text-sm' },
  { name: 'GEOTECH', color: 'orange-600', size: 'text-sm' },
  { name: 'GSK', color: 'blue-600', size: 'text-sm' },
  { name: 'Granite', color: 'gray-600', size: 'text-sm' },
  { name: 'Grant Thornton', color: 'teal-600', size: 'text-sm' },
  { name: 'HDFC BANK', color: 'blue-800', size: 'text-sm' },
  { name: 'Hindpower', color: 'teal-600', size: 'text-sm' },
  { name: 'Holostik', color: 'blue-600', size: 'text-sm' },
  { name: 'HONDA', color: 'teal-600', size: 'text-sm' },
  { name: 'Howden', color: 'blue-600', size: 'text-sm' },
  { name: 'IBN', color: 'teal-600', size: 'text-sm' },
  { name: 'Indus Valley', color: 'purple-600', size: 'text-sm' },
  { name: 'IPS', color: 'blue-600', size: 'text-sm' },
  { name: 'Jet Airways', color: 'yellow-600', size: 'text-sm' },
  { name: 'Jindal Steel', color: 'blue-600', size: 'text-sm' },
  { name: 'L&T Infotech', color: 'blue-600', size: 'text-sm' },
  { name: 'Lufthansa', color: 'blue-600', size: 'text-sm' },
  { name: 'Maersk', color: 'blue-600', size: 'text-sm' },
  { name: 'MET', color: 'orange-600', size: 'text-sm' },
  { name: 'Metso', color: 'blue-600', size: 'text-sm' },
  { name: 'Milton Cycles', color: 'teal-600', size: 'text-sm' },
  { name: 'Mitsubishi', color: 'teal-600', size: 'text-sm' },
  { name: 'Mizuho', color: 'blue-600', size: 'text-sm' },
  { name: 'Modern School', color: 'blue-600', size: 'text-sm' },
  { name: 'Modi Naturals', color: 'green-600', size: 'text-sm' },
  { name: 'Morgan Stanley', color: 'blue-600', size: 'text-sm' },
  { name: 'NAESYS', color: 'purple-600', size: 'text-sm' },
  { name: 'NCDC', color: 'green-600', size: 'text-sm' },
  { name: 'Nielsen', color: 'blue-600', size: 'text-sm' },
  { name: 'NIIT', color: 'teal-600', size: 'text-sm' },
  { name: 'Nomura', color: 'blue-600', size: 'text-sm' },
  { name: 'Panasonic', color: 'blue-600', size: 'text-sm' },
  { name: 'PHILIPS', color: 'blue-600', size: 'text-sm' },
  { name: 'Porteck', color: 'orange-600', size: 'text-sm' },
  { name: 'Quantum', color: 'purple-600', size: 'text-sm' },
  { name: 'Quickbooks', color: 'green-600', size: 'text-sm' },
  { name: 'R1', color: 'blue-600', size: 'text-sm' },
  { name: 'Religare', color: 'teal-600', size: 'text-sm' },
  { name: 'RG GROUP', color: 'blue-600', size: 'text-sm' },
  { name: 'Ronnie Finance', color: 'orange-600', size: 'text-sm' },
  { name: 'Rustomjee', color: 'blue-600', size: 'text-sm' },
  { name: 'SARENS', color: 'yellow-600', size: 'text-sm' },
  { name: 'Satyam', color: 'blue-600', size: 'text-sm' },
  { name: 'SHADES', color: 'gray-600', size: 'text-sm' },
  { name: 'Show Buzz', color: 'purple-600', size: 'text-sm' },
  { name: 'Software One', color: 'blue-600', size: 'text-sm' },
  { name: 'TATA POWER', color: 'blue-800', size: 'text-sm' },
  { name: 'Tech Mahindra', color: 'blue-600', size: 'text-sm' },
  { name: 'TechProcess', color: 'orange-600', size: 'text-sm' },
  { name: 'Techprocompsoft', color: 'green-600', size: 'text-sm' },
  { name: 'George Institute', color: 'blue-600', size: 'text-sm' },
  { name: 'Thomas Cook', color: 'teal-600', size: 'text-sm' },
  { name: 'Trent', color: 'blue-600', size: 'text-sm' },
  { name: 'UK INDIA', color: 'teal-600', size: 'text-sm' },
  { name: 'Unique Logistics', color: 'blue-600', size: 'text-sm' },
  { name: 'UT DALLAS', color: 'orange-600', size: 'text-sm' },
  { name: 'Varun Beverages', color: 'blue-600', size: 'text-sm' },
  { name: 'VIDEOCON', color: 'teal-600', size: 'text-sm' },
  { name: 'Vidya', color: 'blue-600', size: 'text-sm' },
  { name: 'WAPCOS', color: 'blue-600', size: 'text-sm' },
  { name: 'Wipro', color: 'blue-600', size: 'text-sm' },
  { name: 'WNS', color: 'orange-600', size: 'text-sm' },
];

// Reusable Components
const NavigationLink = React.memo(({ to, label, active }) => (
  <Link
    to={to}
    className={`bg-gradient-to-r from-white/20 to-white/30 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium hover:from-white/30 hover:to-white/40 cursor-pointer transition-all duration-300 shadow-md ${active ? 'border-2 border-white/40' : ''}`}
  >
    {label}
  </Link>
));

const CustomerCard = React.memo(({ name, color, size, italic }) => (
  <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-20">
    <div className={`text-${color} font-bold ${size || 'text-lg'} ${italic ? 'italic' : ''}`}>
      {name}
    </div>
  </div>
));

const OurCustomers = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 2000);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
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
              <div className="flex flex-wrap gap-3 mt-8">
                {navLinks.map((link, index) => (
                  <NavigationLink key={index} {...link} />
                ))}
              </div>
            </div>
            {/* Right Content - Featured Image Card */}
            <div className="lg:w-1/2 flex justify-center lg:justify-end">
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-4 shadow-2xl max-w-md w-full border border-teal-100">
                <div className="w-full h-64 bg-white border-2 border-gray-200 rounded-lg shadow-inner flex items-center justify-center overflow-hidden mb-4">
                  <img
                    src="https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg"
                    alt="Our Customers Featured Image"
                    className="w-full h-full object-cover rounded"
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gradient-to-br from-teal-50 to-teal-100" style={{ display: 'none' }}>
                    <svg className="w-16 h-16 mb-4 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
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
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {customers.map((customer, index) => (
              <CustomerCard key={index} {...customer} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurCustomers;
