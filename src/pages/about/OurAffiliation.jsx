import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

// Data for navigation links
const navLinks = [
  { to: '/about/company', label: 'About Brain Bridge' },
  { to: '/about/team', label: 'Our Affiliations', active: true },
  { to: '/about/mission', label: 'Our Customers' },
  { to: '/about/testimonials', label: 'Placement Partners' },
  { to: '/reviews/participant', label: 'Participant Reviews' },
  { to: '/reviews/corporate', label: 'Corporate Training Reviews' },
  { to: '/reviews/college', label: 'College Training Reviews' },
  { to: '/reviews/job-support', label: 'Job Support Reviews' },
  { to: '/courses/all', label: 'All Courses' },
];

// Data for certificates
const certificates = [
  {
    title: 'Certificate of Partnership',
    logos: [
      { text: 'GOI', subtext: ['Government of India', 'Certification from'] },
      { text: 'NSDC', subtext: ['National Skill', 'Development Corporation', 'Transforming the skill landscape'] },
    ],
  },
  {
    title: 'NSDC Partnership Certificate',
    logo: { text: 'NSDC' },
    image: {
      src: 'https://via.placeholder.com/600x400/0f766e/ffffff?text=NSDC+Partnership+Certificate%0A%0AHenry+Harvin+India+Education+LLP%0A%0AApproved+Training+Partner%0A%0ANational+Skill+Development+Corporation',
      alt: 'NSDC Partnership Certificate',
    },
    description: 'Henry Harvin India Education LLP - Approved Training Partner of NSDC',
  },
];

// Data for accreditations and affiliations
const affiliations = [
  { title: 'Skill India & NSDC', tags: ['Skill India', 'NSDC'], subtitle: 'Skill India & NSDC (Center ID- TC101984)' },
  { title: 'BFSI Sector Skill Council', placeholder: 'Certificate' },
  { title: 'Media & Entertainment Sector Skills Council', logos: [{ text: 'M&E' }, { text: 'SC' }] },
  { title: 'SAP EME', tag: 'SAP EME', subtitle: 'EME' },
  { title: 'AAPC', logo: { text: 'AAPC' } },
  { title: 'AHDI', text: 'ahdi' },
  { title: 'ACCA', tags: ['SILVER LEARNING PARTNER', 'ACCA'] },
  { title: 'Workday', text: 'workday' },
  { title: 'AAEFL', logo: { text: 'AAEFL' } },
  { title: 'TEFL Canada', tags: ['TEFL'], subtext: 'Canada' },
  { title: 'PMI', tags: ['ACCREDITATION PROVIDER'], text: 'h 2024', subtext: 'PMI' },
  { title: 'Microsoft', text: 'Microsoft' },
  { title: 'Google', text: 'Google' },
  { title: 'Amazon', text: 'Amazon' },
  { title: 'IBM', text: 'IBM' },
  { title: 'Oracle', text: 'Oracle' },
  { title: 'Salesforce', text: 'Salesforce' },
  { title: 'Adobe', text: 'Adobe' },
  { title: 'Cisco', text: 'Cisco' },
  { title: 'Contact Us', button: { label: 'WhatsApp Us', icon: '💬', badge: '$' } },
];

// Data for awards
const awards = [
  { title: '40 Under 40 Club of Achievers 2020 Award', bg: 'from-blue-100 to-blue-200', border: 'border-blue-300', text: ['40', 'UNDER', 'CLUB'], textColor: ['text-blue-600', 'text-blue-500', 'text-blue-600'] },
  { title: '30 Most Admired Companies in 2021', bg: 'from-yellow-100 to-yellow-200', border: 'border-yellow-300', text: ['MOST', 'ADMIRED', '2021'], textColor: ['text-yellow-600', 'text-yellow-600', 'text-yellow-500'] },
  { title: 'Best Education Company of the Year 2021', bg: 'from-orange-100 to-orange-200', border: 'border-orange-300', text: ['BEST', 'EDUCATION', '2021'], textColor: ['text-orange-600', 'text-orange-600', 'text-orange-500'] },
  { title: 'Game Based Learning Company of the Year 2021', bg: 'from-red-100 to-red-200', border: 'border-teal-300', text: ['GAME', 'BASED', '2021'], textColor: ['text-teal-600', 'text-teal-600', 'text-teal-500'] },
  { title: 'Best Corporate Training Award in 2021', bg: 'from-teal-100 to-teal-200', border: 'border-teal-300', text: ['BEST', 'CORPORATE', '2021'], textColor: ['text-teal-600', 'text-teal-600', 'text-teal-500'] },
  { title: 'Entrepreneur First', bg: 'from-purple-100 to-purple-200', border: 'border-purple-300', text: ['ENTREPRENEUR', 'FIRST', 'AWARD'], textColor: ['text-purple-600', 'text-purple-600', 'text-purple-500'] },
  { title: 'Excellence Award', bg: 'from-gray-800 to-gray-900', border: 'border-gray-600', text: ['AWARD', 'CERTIFICATE'], textColor: ['text-white', 'text-gray-300'], maxWidth: 'max-w-xs' },
];

// Data for degree/diploma partners
const partners = [
  { title: 'Dunster Business School, Switzerland', text: ['CERTIFICATE', 'DUNSTER'], textColor: ['text-gray-600', 'text-gray-500'], badge: 'bg-teal-600' },
  { title: 'Royale Business College United Kingdom', text: ['ROYALE', 'BUSINESS', 'COLLEGE'], textColor: ['text-blue-600', 'text-blue-500', 'text-blue-400'] },
  { title: 'Kennedy University, France', text: ['KENNEDY', 'UNIVERSITY', 'FRANCE'], textColor: ['text-blue-600', 'text-blue-500', 'text-orange-500'] },
  { title: 'R B College, UK', text: ['RB', 'COLLEGE'], textColor: ['text-white', 'text-white'], bg: 'bg-teal-600' },
  { title: 'College de Paris, France', text: ['COLLEGE', 'DE PARIS', 'FRANCE'], textColor: ['text-blue-600', 'text-blue-500', 'text-teal-500'] },
  { title: 'Jain University, India', text: ['JAIN', 'UNIVERSITY', 'INDIA'], textColor: ['text-orange-600', 'text-orange-500', 'text-green-600'] },
  { title: 'Asian International University, India', text: ['ASIAN', 'INTL', 'UNIV'], textColor: ['text-blue-600', 'text-blue-500', 'text-blue-400'], shape: 'rounded-full', bg: 'bg-white border border-blue-300' },
  { title: 'Sharda University, India', text: ['SHARDA', 'UNIVERSITY', 'INDIA'], textColor: ['text-blue-600', 'text-blue-500', 'text-green-600'] },
  { title: 'Om Sterling Global University, India', text: ['OM', 'STERLING', 'GLOBAL'], textColor: ['text-teal-600', 'text-teal-500', 'text-teal-400'] },
  { title: 'EdICT Academy, IT Guwahati, India', text: ['EdICT', 'IT', 'GUWAHATI'], textColor: ['text-white', 'text-gray-300', 'text-gray-400'], bg: 'bg-gray-800' },
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

const CertificateCard = React.memo(({ title, logos, logo, image, description }) => (
  <div className={`bg-${image ? 'gradient-to-br from-white to-teal-50' : 'white'} rounded-lg ${image ? 'shadow-lg p-4 border border-teal-300' : 'p-8'}`}>
    <div className="text-center">
      {logos && (
        <div className="flex items-center justify-center space-x-8 mb-6">
          {logos.map((l, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-2 shadow-md">
                <span className="text-white font-bold text-sm">{l.text}</span>
              </div>
              <div className="text-xs text-teal-600">
                {l.subtext.map((text, i) => (
                  <div key={i} className={text.includes('Transforming') ? 'text-teal-500 font-medium' : ''}>{text}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      {logo && (
        <div className="mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-teal-700 rounded-full flex items-center justify-center mx-auto mb-2 shadow-md">
            <div className="text-white font-bold text-xs">{logo.text}</div>
          </div>
        </div>
      )}
      <h3 className="text-lg font-bold bg-gradient-to-r from-teal-600 to-teal-700 bg-clip-text text-transparent mb-4">{title}</h3>
      {image && (
        <div className="w-full h-80 bg-white border-2 border-gray-200 rounded-lg shadow-inner flex items-center justify-center mb-4 overflow-hidden">
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-contain"
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
            <p className="text-sm font-medium text-teal-600">{image.alt}</p>
            <p className="text-xs text-teal-500">Partnership Certificate</p>
          </div>
        </div>
      )}
      {description && <p className="text-xs text-teal-600">{description}</p>}
    </div>
  </div>
));

const AffiliationCard = React.memo(({ title, tags, logos, text, subtext, subtitle, placeholder, button }) => (
  <div className="text-center">
    <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-3 sm:p-4 h-24 sm:h-28 lg:h-32 flex flex-col justify-center items-center mb-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
      {button ? (
        <button className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-4 py-2 rounded-full flex items-center space-x-1 transition-all duration-300 text-sm shadow-md">
          <span>{button.icon}</span>
          <span className="font-medium">{button.label}</span>
          <span className="bg-white text-teal-600 rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold">{button.badge}</span>
        </button>
      ) : placeholder ? (
        <div className="w-16 h-20 bg-white border border-teal-200 rounded flex items-center justify-center shadow-sm">
          <span className="text-xs text-teal-600">{placeholder}</span>
        </div>
      ) : tags ? (
        <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mb-1 sm:mb-2">
          {tags.map((tag, index) => (
            <div key={index} className={`bg-gradient-to-r from-teal-${index === 0 ? '500' : '600'} to-teal-${index === 0 ? '600' : '700'} text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs font-bold shadow-md`}>
              {tag}
            </div>
          ))}
        </div>
      ) : logos ? (
        <div className="flex space-x-2">
          {logos.map((logo, index) => (
            <div key={index} className={`w-8 h-8 bg-gradient-to-r from-teal-${index === 0 ? '500' : '600'} to-teal-${index === 0 ? '600' : '700'} rounded-full flex items-center justify-center shadow-md`}>
              <span className="text-white font-bold text-xs">{logo.text}</span>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className={`text-teal-${text === 'h 2024' ? '600' : text === 'PMI' ? '700' : '600'} font-bold ${text === 'h 2024' ? 'text-sm' : text === 'PMI' ? 'text-sm' : 'text-lg'}`}>{text}</div>
          {subtext && <div className="text-teal-600 text-xs font-medium">{subtext}</div>}
        </>
      )}
    </div>
    <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs font-medium shadow-md">
      {subtitle || title}
    </div>
  </div>
));

const AwardCard = React.memo(({ title, bg, border, text, textColor, maxWidth }) => (
  <div className={`text-center ${maxWidth || ''}`}>
    <div className="bg-gradient-to-br from-white to-teal-50 rounded-lg p-4 h-40 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-teal-100">
      <div className={`w-20 h-24 bg-gradient-to-br ${bg} rounded border ${border} flex items-center justify-center shadow-sm`}>
        <div className="text-center">
          {text.map((t, index) => (
            <div key={index} className={`${textColor[index]} ${t.includes('AWARD') || t.includes('CERTIFICATE') ? 'text-xs' : 'text-sm'} font-${t.includes('AWARD') || t.includes('CERTIFICATE') ? 'semibold' : 'bold'}`}>
              {t}
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-2 rounded text-xs font-medium shadow-md">
      {title}
    </div>
  </div>
));

const PartnerCard = React.memo(({ title, text, textColor, bg, badge, shape }) => (
  <div className="text-center">
    <div className="bg-gradient-to-br from-white to-teal-50 rounded-lg p-4 h-40 flex flex-col justify-center items-center mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-teal-100">
      <div className={`w-20 ${shape === 'rounded-full' ? 'h-20' : 'h-24'} ${bg || 'bg-white border border-gray-300'} rounded${shape ? '-full' : ''} flex items-center justify-center shadow-sm`}>
        <div className="text-center">
          {badge && <div className="w-4 h-4 bg-teal-600 rounded-full mx-auto mb-1"></div>}
          {text.map((t, index) => (
            <div key={index} className={`${textColor[index]} text-xs ${t === 'RB' ? 'font-bold text-lg' : 'font-medium'}`}>
              {t}
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-2 py-2 rounded text-xs font-medium shadow-md">
      {title}
    </div>
  </div>
));

const OurAffiliation = () => {
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
      <section className="bg-gradient-to-r from-teal-600 to-teal-700 py-10">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-white">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-8">
                Affiliations &<br />
                Accreditations
              </h1>
              <div className="flex flex-wrap gap-3 mt-8">
                {navLinks.map((link, index) => (
                  <NavigationLink key={index} {...link} />
                ))}
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-4 shadow-2xl max-w-md w-full border border-teal-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-gradient-to-r from-teal-100 to-teal-200 px-3 py-1 rounded-full shadow-sm">
                    <span className="text-sm font-medium text-teal-700">Featured Certificate</span>
                  </div>
                </div>
                <div className="w-full h-64 bg-white border-2 border-gray-200 rounded-lg shadow-inner flex items-center justify-center overflow-hidden">
                  <img
                    src="https://static.vecteezy.com/system/resources/thumbnails/024/950/072/small_2x/elegant-certificate-of-appreciation-with-gold-medal-free-editor_template.jpeg?last_updated=1687656059"
                    alt="Sample Certificate"
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
          <div className="mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">Accreditations & Affiliations</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {certificates.map((cert, index) => (
              <CertificateCard key={index} {...cert} />
            ))}
          </div>
        </div>
      </section>

      {/* Accreditations & Affiliations Grid Section */}
      <section className="bg-gradient-to-br from-white to-teal-50 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-12 text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-teal-800 to-teal-900 bg-clip-text text-transparent mb-2">
              Accreditations & Affiliations
            </h2>
            <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-teal-600 to-teal-700 rounded shadow-sm mx-auto lg:mx-0"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {affiliations.map((aff, index) => (
              <AffiliationCard key={index} {...aff} />
            ))}
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="bg-gradient-to-br from-teal-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-teal-700 bg-clip-text text-transparent mb-2">Awards</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-teal-600 to-teal-700 rounded shadow-sm"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
            {awards.slice(0, 6).map((award, index) => (
              <AwardCard key={index} {...award} />
            ))}
          </div>
          <div className="flex justify-center">
            <AwardCard {...awards[6]} />
          </div>
        </div>
      </section>

      {/* Degree/Diploma Partners Section */}
      <section className="bg-gradient-to-br from-white to-teal-50 py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-teal-700 bg-clip-text text-transparent mb-2">Degree/Diploma Partner(s)</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-teal-600 to-teal-700 rounded shadow-sm"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
            {partners.slice(0, 6).map((partner, index) => (
              <PartnerCard key={index} {...partner} />
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {partners.slice(6).map((partner, index) => (
              <PartnerCard key={index} {...partner} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurAffiliation;
