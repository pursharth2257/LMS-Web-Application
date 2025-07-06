import React, { useState } from 'react';
import StudentTemplate from './StudentTemplate';
import {
  FaCertificate,
  FaDownload,
  FaShare,
  FaCheckCircle,
  FaHourglassHalf,
  FaLock,
  FaSearch,
  FaAward,
  FaShieldAlt,
  FaLinkedin,
  FaEye,
  FaCalendarAlt,
  FaGraduationCap,
  FaStar,
  FaExternalLinkAlt
} from 'react-icons/fa';

const Certification = () => {
  const [activeTab, setActiveTab] = useState('available');
  
  // Sample certificates data with enhanced professional details
  const certificates = [
    {
      id: 1,
      course: "Web Development Fundamentals",
      issueDate: "June 15, 2024",
      expiryDate: "No Expiry",
      status: "available",
      verificationCode: "BB-WDF-240615-001",
      credentialId: "WDF-2024-001",
      hours: "40 Hours",
      level: "Beginner",
      skills: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80"
    },
    {
      id: 2,
      course: "Advanced JavaScript & ES6+",
      issueDate: "May 20, 2024",
      expiryDate: "No Expiry",
      status: "available",
      verificationCode: "BB-AJS-240520-002",
      credentialId: "AJS-2024-002",
      hours: "60 Hours",
      level: "Advanced",
      skills: ["ES6+", "Async/Await", "Modules", "Testing"],
      image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 3,
      course: "React.js Professional Certification",
      issueDate: "Pending Completion",
      expiryDate: "N/A",
      status: "pending",
      progress: 75,
      hours: "80 Hours",
      level: "Intermediate",
      skills: ["React", "Redux", "Hooks", "Testing"],
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 4,
      course: "Data Science & Analytics",
      issueDate: "Pending Completion",
      expiryDate: "N/A",
      status: "pending",
      progress: 40,
      hours: "120 Hours",
      level: "Advanced",
      skills: ["Python", "Pandas", "Machine Learning", "Visualization"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 5,
      course: "UI/UX Design Professional",
      issueDate: "Not Started",
      expiryDate: "N/A",
      status: "locked",
      hours: "100 Hours",
      level: "Intermediate",
      skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
    }
  ];
  
  // Filter certificates based on active tab
  const filteredCertificates = certificates.filter(cert => {
    if (activeTab === 'all') return true;
    return cert.status === activeTab;
  });
  
  return (
    <StudentTemplate
      title="Professional Certifications"
      subtitle="Showcase your expertise with industry-recognized credentials"
    >
      <div className="space-y-8">
        {/* Statistics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-teal-100 text-sm font-medium">Earned Certificates</p>
                <p className="text-3xl font-bold">{certificates.filter(c => c.status === 'available').length}</p>
              </div>
              <FaAward className="text-4xl text-teal-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">In Progress</p>
                <p className="text-3xl font-bold">{certificates.filter(c => c.status === 'pending').length}</p>
              </div>
              <FaGraduationCap className="text-4xl text-blue-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Total Hours</p>
                <p className="text-3xl font-bold">100+</p>
              </div>
              <FaCalendarAlt className="text-4xl text-purple-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Skills Verified</p>
                <p className="text-3xl font-bold">12+</p>
              </div>
              <FaStar className="text-4xl text-orange-200" />
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  activeTab === 'all'
                    ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/25'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <FaCertificate className="inline mr-2" />
                All Certificates
              </button>
              <button
                onClick={() => setActiveTab('available')}
                className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  activeTab === 'available'
                    ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/25'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <FaCheckCircle className="inline mr-2" />
                Earned ({certificates.filter(c => c.status === 'available').length})
              </button>
              <button
                onClick={() => setActiveTab('pending')}
                className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  activeTab === 'pending'
                    ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/25'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <FaHourglassHalf className="inline mr-2" />
                In Progress ({certificates.filter(c => c.status === 'pending').length})
              </button>
              <button
                onClick={() => setActiveTab('locked')}
                className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  activeTab === 'locked'
                    ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/25'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <FaLock className="inline mr-2" />
                Available ({certificates.filter(c => c.status === 'locked').length})
              </button>
            </div>

            <div className="relative w-full lg:w-80">
              <input
                type="text"
                placeholder="Search certificates by name or skill..."
                className="pl-12 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50 text-sm"
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
        
        {/* Certificates Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredCertificates.map(certificate => (
            <div key={certificate.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              {/* Certificate Preview */}
              <div className="relative h-56 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
                {certificate.status === 'available' ? (
                  <>
                    <img
                      src={certificate.image}
                      alt={certificate.course}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center">
                        <FaCheckCircle className="mr-1" />
                        Certified
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700">
                        {certificate.level}
                      </div>
                    </div>
                  </>
                ) : certificate.status === 'pending' ? (
                  <div className="text-center p-8 w-full">
                    <div className="bg-yellow-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                      <FaHourglassHalf className="text-yellow-600 text-3xl" />
                    </div>
                    <p className="text-gray-800 font-semibold mb-3">In Progress</p>
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                      <div
                        className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${certificate.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 font-medium">{certificate.progress}% Complete</p>
                    <p className="text-xs text-gray-500 mt-2">{certificate.hours} • {certificate.level}</p>
                  </div>
                ) : (
                  <div className="text-center p-8 w-full">
                    <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                      <FaLock className="text-gray-400 text-3xl" />
                    </div>
                    <p className="text-gray-600 font-medium mb-2">Course Available</p>
                    <p className="text-sm text-gray-500">Start learning to earn your certificate</p>
                    <p className="text-xs text-gray-400 mt-2">{certificate.hours} • {certificate.level}</p>
                  </div>
                )}
              </div>
              
              {/* Certificate Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900 leading-tight">{certificate.course}</h3>
                  {certificate.status === 'available' && (
                    <FaShieldAlt className="text-teal-600 text-lg flex-shrink-0 ml-2" />
                  )}
                </div>

                {/* Certificate Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <FaCalendarAlt className="mr-2 text-teal-600" />
                    {certificate.status === 'available' ? (
                      <span>Issued: {certificate.issueDate}</span>
                    ) : certificate.status === 'pending' ? (
                      <span>In Progress</span>
                    ) : (
                      <span>Ready to Start</span>
                    )}
                  </div>

                  {certificate.verificationCode && (
                    <div className="flex items-center text-sm text-gray-600">
                      <FaCertificate className="mr-2 text-teal-600" />
                      <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                        {certificate.verificationCode}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center text-sm text-gray-600">
                    <FaGraduationCap className="mr-2 text-teal-600" />
                    <span>{certificate.hours} • {certificate.level} Level</span>
                  </div>
                </div>

                {/* Skills Tags */}
                {certificate.skills && (
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-700 mb-2">Skills Covered:</p>
                    <div className="flex flex-wrap gap-1">
                      {certificate.skills.slice(0, 3).map((skill, index) => (
                        <span key={index} className="bg-teal-50 text-teal-700 px-2 py-1 rounded-full text-xs font-medium">
                          {skill}
                        </span>
                      ))}
                      {certificate.skills.length > 3 && (
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
                          +{certificate.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                {certificate.status === 'available' && (
                  <div className="space-y-2">
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-gradient-to-r from-teal-600 to-teal-700 text-white px-4 py-3 rounded-lg text-sm font-semibold hover:from-teal-700 hover:to-teal-800 transition-all duration-200 flex items-center justify-center shadow-lg shadow-teal-600/25">
                        <FaDownload className="mr-2" />
                        Download PDF
                      </button>
                      <button className="px-4 py-3 bg-gray-50 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors border border-gray-200 flex items-center justify-center">
                        <FaEye className="mr-2" />
                        Preview
                      </button>
                    </div>
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors flex items-center justify-center border border-blue-200">
                        <FaLinkedin className="mr-2" />
                        Add to LinkedIn
                      </button>
                      <button className="flex-1 bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors flex items-center justify-center border border-gray-200">
                        <FaShare className="mr-2" />
                        Share
                      </button>
                    </div>
                  </div>
                )}

                {certificate.status === 'pending' && (
                  <button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-4 py-3 rounded-lg text-sm font-semibold hover:from-yellow-600 hover:to-yellow-700 transition-all duration-200 shadow-lg shadow-yellow-500/25">
                    Continue Learning
                  </button>
                )}

                {certificate.status === 'locked' && (
                  <button className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white px-4 py-3 rounded-lg text-sm font-semibold hover:from-gray-700 hover:to-gray-800 transition-all duration-200 shadow-lg shadow-gray-600/25">
                    <FaExternalLinkAlt className="mr-2 inline" />
                    Enroll in Course
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Verification Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
          <div className="flex items-center mb-6">
            <div className="bg-blue-100 rounded-full p-3 mr-4">
              <FaShieldAlt className="text-blue-600 text-2xl" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Certificate Verification</h3>
              <p className="text-blue-700 font-medium">Verify the authenticity of any Brain Bridge certificate</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100">
            <p className="text-gray-700 mb-6 leading-relaxed">
              All certificates issued by Brain Bridge include a unique verification code and digital signature.
              Employers and institutions can use this system to instantly verify the authenticity and validity of any certificate.
            </p>

            <div className="flex flex-col lg:flex-row items-end gap-4">
              <div className="flex-1">
                <label htmlFor="verification-code" className="block text-sm font-semibold text-gray-700 mb-2">
                  Certificate Verification Code
                </label>
                <input
                  type="text"
                  id="verification-code"
                  placeholder="Enter code (e.g., BB-WDF-240615-001)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-sm font-mono"
                />
                <p className="text-xs text-gray-500 mt-1">Find this code on the bottom of your certificate</p>
              </div>
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg shadow-blue-600/25 whitespace-nowrap">
                <FaShieldAlt className="mr-2 inline" />
                Verify Certificate
              </button>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start">
                <FaCheckCircle className="text-blue-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-blue-900">Trusted Verification System</p>
                  <p className="text-xs text-blue-700 mt-1">
                    Our certificates are blockchain-secured and instantly verifiable by employers worldwide.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Professional Benefits Section */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-3">Why Brain Bridge Certificates Matter</h3>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Our industry-recognized certifications are designed to validate your skills and accelerate your career growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start p-4 bg-gradient-to-r from-teal-50 to-teal-100 rounded-xl border border-teal-200">
                <div className="bg-teal-600 rounded-full p-3 mr-4 flex-shrink-0">
                  <FaAward className="text-white text-xl" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg mb-2">Industry Recognition</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Recognized by 500+ leading companies including Google, Microsoft, and Amazon.
                    Our certificates carry weight in hiring decisions and career advancement.
                  </p>
                </div>
              </div>

              <div className="flex items-start p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                <div className="bg-blue-600 rounded-full p-3 mr-4 flex-shrink-0">
                  <FaLinkedin className="text-white text-xl" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg mb-2">Digital Credentials</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Receive verifiable digital badges for LinkedIn, Credly, and other professional platforms.
                    Showcase your achievements with one-click sharing.
                  </p>
                </div>
              </div>

              <div className="flex items-start p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                <div className="bg-purple-600 rounded-full p-3 mr-4 flex-shrink-0">
                  <FaShieldAlt className="text-white text-xl" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg mb-2">Blockchain Security</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Every certificate is secured with blockchain technology, ensuring tamper-proof verification
                    and lifetime authenticity guarantee.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200">
                <div className="bg-green-600 rounded-full p-3 mr-4 flex-shrink-0">
                  <FaGraduationCap className="text-white text-xl" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg mb-2">Lifetime Access</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Your certificates are permanently stored in your secure digital wallet.
                    Download, share, or verify them anytime, anywhere.
                  </p>
                </div>
              </div>

              <div className="flex items-start p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl border border-orange-200">
                <div className="bg-orange-600 rounded-full p-3 mr-4 flex-shrink-0">
                  <FaStar className="text-white text-xl" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg mb-2">Career Impact</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    87% of our certificate holders report career advancement within 6 months.
                    Average salary increase of 23% after certification completion.
                  </p>
                </div>
              </div>

              <div className="flex items-start p-4 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-xl border border-indigo-200">
                <div className="bg-indigo-600 rounded-full p-3 mr-4 flex-shrink-0">
                  <FaCheckCircle className="text-white text-xl" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg mb-2">Instant Verification</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Employers can verify your credentials instantly using our verification portal.
                    No waiting, no paperwork, just instant trust.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-8 text-center p-6 bg-gradient-to-r from-teal-600 to-blue-600 rounded-xl text-white">
            <h4 className="text-xl font-bold mb-2">Ready to Advance Your Career?</h4>
            <p className="mb-4 opacity-90">Join thousands of professionals who have transformed their careers with Brain Bridge certifications</p>
            <button className="bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg">
              Browse Available Courses
            </button>
          </div>
        </div>
      </div>
    </StudentTemplate>
  );
};

export default Certification;