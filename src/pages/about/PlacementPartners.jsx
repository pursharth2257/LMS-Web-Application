import React, { useState, useEffect, useCallback } from 'react';
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

// Data for navigation links (shared with OurCustomers.js and OurAffiliation.js)
const navLinks = [
  { to: '/about/company', label: 'About Brain Bridge' },
  { to: '/about/team', label: 'Our Affiliations' },
  { to: '/about/mission', label: 'Our Customers' },
  { to: '/about/testimonials', label: 'Placement Partners', active: true },
  { to: '/reviews/participant', label: 'Participant Reviews' },
  { to: '/reviews/corporate', label: 'Corporate Training Reviews' },
  { to: '/reviews/college', label: 'College Training Reviews' },
  { to: '/reviews/job-support', label: 'Job Support Reviews' },
  { to: '/courses/all', label: 'All Courses' },
];

// Data for placement partners
const partners = [
  { name: 'Scribe EMR', color: 'green-600', size: 'text-xs sm:text-sm', description: 'Scribe EMR System' },
  { name: 'AQuity', color: 'blue-600', size: 'text-sm', description: 'AQuity Solutions' },
  { name: 'EduRun', color: 'gray-800', size: 'text-sm', description: 'Edurun Virtuoso' },
  { name: 'Scribeemed', color: 'orange-600', size: 'text-sm', description: 'Scribeemed' },
  { name: 'ACUSIS', color: 'teal-600', size: 'text-sm', description: 'Acusis Software' },
  { name: 'ELICO', color: 'blue-600', size: 'text-sm', description: 'Elico Healthcare' },
  { name: 'GENESIS', color: 'purple-600', size: 'text-sm', description: 'Genesis Transcriptions' },
  { name: 'StarMedix', color: 'blue-600', size: 'text-sm', description: 'StarMedix Medical' },
  { name: 'Seyyone', color: 'green-600', size: 'text-sm', description: 'Seyyone Software' },
  { name: 'Panacea', color: 'teal-600', size: 'text-sm', description: 'Panacea' },
  { name: 'Xerox', color: 'blue-600', size: 'text-sm', description: 'Xerox' },
  { name: 'Honeywell', color: 'teal-600', size: 'text-sm', description: 'Honeywell' },
  { name: 'Walmart', color: 'blue-600', size: 'text-sm', description: 'Walmart' },
  { name: 'Amazon', color: 'orange-600', size: 'text-sm', description: 'Amazon', logo: 'Amazon' },
  { name: 'Bosch', color: 'teal-600', size: 'text-sm', description: 'Bosch' },
  { name: 'Citi India', color: 'blue-600', size: 'text-sm', description: 'Citi India' },
  { name: 'Dell', color: 'blue-600', size: 'text-sm', description: 'Dell Technologies' },
  { name: 'Deutsche Bank', color: 'blue-600', size: 'text-sm', description: 'Deutsche Bank' },
  { name: 'PepsiCo', color: 'blue-600', size: 'text-sm', description: 'PepsiCo' },
  { name: 'Wells Fargo', color: 'teal-600', size: 'text-sm', description: 'Wells Fargo' },
  { name: 'WPP', color: 'purple-600', size: 'text-sm', description: 'WPP' },
  { name: 'ITC Infotech', color: 'green-600', size: 'text-sm', description: 'ITC Infotech' },
  { name: 'LTI Mindtree', color: 'blue-600', size: 'text-sm', description: 'LTI Mindtree' },
  { name: 'Adobe', color: 'teal-600', size: 'text-sm', description: 'Adobe', logo: 'Adobe' },
  { name: 'Cognizant', color: 'blue-600', size: 'text-sm', description: 'Cognizant', logo: 'Cognizant' },
  { name: 'Flipkart', color: 'orange-600', size: 'text-sm', description: 'Flipkart', logo: 'Flipkart' },
  { name: 'Google', color: 'teal-600', size: 'text-sm', description: 'YouTube', logo: 'Google' },
  { name: 'Coca Cola', color: 'teal-600', size: 'text-sm', description: 'Coca Cola' },
  { name: 'Air India', color: 'teal-600', size: 'text-sm', description: 'Air India' },
  { name: 'IBM', color: 'blue-600', size: 'text-sm', description: 'IBM', logo: 'IBM' },
  { name: 'Netflix', color: 'teal-600', size: 'text-sm', description: 'Netflix', logo: 'Netflix' },
  { name: 'Firefox', color: 'orange-600', size: 'text-sm', description: 'Firefox' },
  { name: 'OLX', color: 'purple-600', size: 'text-sm', description: 'OLX' },
  { name: 'Twitter', color: 'blue-600', size: 'text-sm', description: 'Twitter' },
  { name: 'Microsoft', color: 'blue-600', size: 'text-sm', description: 'Microsoft', logo: 'Microsoft' },
  { name: 'Hindustan Unilever', color: 'blue-600', size: 'text-sm', description: 'Hindustan Unilever' },
  { name: 'Axis Bank', color: 'teal-600', size: 'text-sm', description: 'Axis Bank' },
  { name: 'TCS', color: 'blue-600', size: 'text-sm', description: 'Tata Consultancy Services', logo: 'TCS' },
  { name: 'Kotak Mahindra', color: 'teal-600', size: 'text-sm', description: 'Kotak Mahindra Bank' },
  { name: 'Wipro', color: 'blue-600', size: 'text-sm', description: 'Wipro', logo: 'Wipro' },
  { name: 'HCL Technologies', color: 'blue-600', size: 'text-sm', description: 'HCL Technologies' },
  { name: 'Tata Steel', color: 'blue-800', size: 'text-sm', description: 'Tata Steel' },
  { name: 'Bank of Baroda', color: 'orange-600', size: 'text-sm', description: 'Bank of Baroda' },
  { name: 'GAIL India', color: 'blue-600', size: 'text-sm', description: 'GAIL India' },
  { name: 'Bajaj Auto', color: 'blue-600', size: 'text-sm', description: 'Bajaj Auto' },
  { name: 'IDBI Bank', color: 'green-600', size: 'text-sm', description: 'IDBI Bank' },
  { name: 'Motherson Sumi', color: 'blue-600', size: 'text-sm', description: 'Motherson Sumi Systems' },
  { name: 'Century Textiles', color: 'purple-600', size: 'text-sm', description: 'Century Textiles Ind' },
  { name: 'Indraprastha Gas', color: 'blue-600', size: 'text-sm', description: 'Indraprastha Gas' },
  { name: 'Indian Oil', color: 'green-600', size: 'text-sm', description: 'Indian Oil Corporation' },
  { name: 'Jindal Steel', color: 'blue-600', size: 'text-sm', description: 'Jindal Steel & Power' },
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

const PartnerCard = React.memo(({ name, color, size, description, logo }) => {
  const LogoComponent = logo ? CompanyLogos[logo] : CompanyLogos.Default;
  return (
    <div className="text-center">
      <div className="bg-white rounded-lg p-4 h-24 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
        {logo ? (
          <LogoComponent />
        ) : (
          <div className={`text-${color} font-bold ${size}`}>{name}</div>
        )}
      </div>
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-1 rounded text-xs font-medium shadow-md">
        {description}
      </div>
    </div>
  );
});

const PlacementPartners = () => {
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
                Placement<br />
                Partners
              </h1>
              <div className="flex flex-wrap gap-3 mt-8">
                {navLinks.map((link, index) => (
                  <NavigationLink key={index} {...link} />
                ))}
              </div>
            </div>
            {/* Right Content - Featured Image */}
            <div className="lg:w-1/2 flex justify-center lg:justify-end">
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-4 shadow-2xl max-w-md w-full border border-teal-100">
                <div className="w-full h-64 bg-white border-2 border-gray-200 rounded-lg shadow-inner flex items-center justify-center overflow-hidden mb-4">
                  <img
                    src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg"
                    alt="Placement Partners Featured Image"
                    className="w-full h-full object-cover rounded"
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gradient-to-br from-teal-50 to-teal-100" style={{ display: 'none' }}>
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
          <div className="mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-teal-700 bg-clip-text text-transparent mb-2">
              Placement Partners
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
            {partners.map((partner, index) => (
              <PartnerCard key={index} {...partner} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlacementPartners;