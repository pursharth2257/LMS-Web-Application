import React, { useState } from 'react';
import StudentTemplate from './StudentTemplate';
import { FaGraduationCap, FaBriefcase, FaFileAlt, FaUserTie, FaChartLine, FaLaptopCode, FaSearch, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

const CareerSupport = () => {
  const [activeTab, setActiveTab] = useState('jobBoard');
  
  // Sample job listings
  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechSolutions Inc.",
      location: "Bangalore (Hybrid)",
      salary: "₹6-10 LPA",
      experience: "1-3 years",
      skills: ["React.js", "JavaScript", "HTML/CSS", "Redux"],
      description: "We are looking for a Frontend Developer to join our team and help build responsive web applications. The ideal candidate should have experience with React.js and modern JavaScript.",
      posted: "2 days ago",
      logo: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      id: 2,
      title: "Data Scientist",
      company: "AnalyticsHub",
      location: "Remote",
      salary: "₹12-18 LPA",
      experience: "2-5 years",
      skills: ["Python", "Machine Learning", "SQL", "Data Visualization"],
      description: "Join our data science team to develop machine learning models and extract insights from large datasets. You'll work on challenging problems across various domains.",
      posted: "1 week ago",
      logo: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
      id: 3,
      title: "Full Stack Developer",
      company: "InnovateTech",
      location: "Mumbai (On-site)",
      salary: "₹8-14 LPA",
      experience: "2-4 years",
      skills: ["Node.js", "React.js", "MongoDB", "Express"],
      description: "We're seeking a Full Stack Developer to help build and maintain our web applications. You'll work on both frontend and backend development using the MERN stack.",
      posted: "3 days ago",
      logo: "https://randomuser.me/api/portraits/men/3.jpg"
    },
    {
      id: 4,
      title: "UX/UI Designer",
      company: "DesignCraft",
      location: "Hyderabad (Hybrid)",
      salary: "₹7-12 LPA",
      experience: "1-3 years",
      skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
      description: "Join our design team to create intuitive and engaging user experiences for web and mobile applications. You'll be involved in the entire design process from research to implementation.",
      posted: "5 days ago",
      logo: "https://randomuser.me/api/portraits/women/4.jpg"
    }
  ];
  
  // Sample career resources
  const resources = [
    {
      id: 1,
      title: "Resume Building Workshop",
      type: "Workshop Recording",
      description: "Learn how to create a standout technical resume that highlights your skills and projects effectively.",
      duration: "1 hour 15 minutes",
      link: "#"
    },
    {
      id: 2,
      title: "Technical Interview Preparation Guide",
      type: "PDF Guide",
      description: "Comprehensive guide covering common technical interview questions, coding challenges, and behavioral interview tips.",
      pages: "45 pages",
      link: "#"
    },
    {
      id: 3,
      title: "Salary Negotiation Strategies",
      type: "Video Tutorial",
      description: "Learn effective strategies for negotiating your salary and benefits package to maximize your compensation.",
      duration: "55 minutes",
      link: "#"
    },
    {
      id: 4,
      title: "LinkedIn Profile Optimization",
      type: "Webinar Recording",
      description: "Tips and strategies to optimize your LinkedIn profile to attract recruiters and stand out in your industry.",
      duration: "1 hour",
      link: "#"
    }
  ];
  
  // Sample upcoming events
  const events = [
    {
      id: 1,
      title: "Tech Career Fair",
      date: "July 15, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "Virtual",
      description: "Connect with top tech companies hiring for various roles. Bring your resume and be prepared for on-the-spot interviews."
    },
    {
      id: 2,
      title: "Resume Review Session",
      date: "July 20, 2024",
      time: "2:00 PM - 5:00 PM",
      location: "Virtual",
      description: "Get personalized feedback on your resume from industry professionals and career counselors."
    },
    {
      id: 3,
      title: "Mock Interview Workshop",
      date: "July 25, 2024",
      time: "11:00 AM - 1:00 PM",
      location: "Virtual",
      description: "Practice your interview skills with mock interviews conducted by experienced hiring managers."
    }
  ];
  
  return (
    <StudentTemplate 
      title="Career Support" 
      subtitle="Resources, job opportunities, and guidance to help you advance in your career"
    >
      <div className="space-y-8">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('jobBoard')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'jobBoard'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Job Board
            </button>
            <button
              onClick={() => setActiveTab('resources')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'resources'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Career Resources
            </button>
            <button
              onClick={() => setActiveTab('counseling')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'counseling'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Career Counseling
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'events'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Career Events
            </button>
          </nav>
        </div>
        
        {/* Job Board Tab */}
        {activeTab === 'jobBoard' && (
          <div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <div className="flex space-x-2 mb-4 md:mb-0 overflow-x-auto pb-2 w-full md:w-auto">
                <button className="px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap bg-teal-600 text-white">
                  All Jobs
                </button>
                <button className="px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap bg-gray-100 text-gray-700 hover:bg-gray-200">
                  Development
                </button>
                <button className="px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap bg-gray-100 text-gray-700 hover:bg-gray-200">
                  Data Science
                </button>
                <button className="px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap bg-gray-100 text-gray-700 hover:bg-gray-200">
                  Design
                </button>
              </div>
              
              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  placeholder="Search jobs..."
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            
            <div className="space-y-6">
              {jobs.map(job => (
                <div key={job.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-4">
                        <img 
                          src={job.logo} 
                          alt={job.company} 
                          className="h-12 w-12 rounded-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                            <p className="text-gray-600">{job.company}</p>
                          </div>
                          <button className="bg-teal-600 text-white px-4 py-2 rounded text-sm hover:bg-teal-700 transition-colors">
                            Apply Now
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 mb-4">
                          <div className="flex items-center text-gray-600 text-sm">
                            <FaBriefcase className="mr-2 text-gray-400" />
                            <span>{job.experience}</span>
                          </div>
                          <div className="flex items-center text-gray-600 text-sm">
                            <FaMapMarkerAlt className="mr-2 text-gray-400" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center text-gray-600 text-sm">
                            <FaChartLine className="mr-2 text-gray-400" />
                            <span>{job.salary}</span>
                          </div>
                          <div className="flex items-center text-gray-600 text-sm">
                            <FaCalendarAlt className="mr-2 text-gray-400" />
                            <span>Posted: {job.posted}</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 mb-4">{job.description}</p>
                        
                        <div className="mt-4">
                          <h4 className="font-medium text-gray-900 mb-2">Required Skills:</h4>
                          <div className="flex flex-wrap gap-2">
                            {job.skills.map((skill, index) => (
                              <span key={index} className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-200 transition-colors">
                Load More Jobs
              </button>
            </div>
          </div>
        )}
        
        {/* Career Resources Tab */}
        {activeTab === 'resources' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {resources.map(resource => (
                <div key={resource.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.title}</h3>
                  <div className="flex items-center text-sm text-teal-600 mb-3">
                    <FaFileAlt className="mr-2" />
                    <span>{resource.type}</span>
                    {resource.duration && <span className="ml-2">• {resource.duration}</span>}
                    {resource.pages && <span className="ml-2">• {resource.pages}</span>}
                  </div>
                  <p className="text-gray-700 mb-4">{resource.description}</p>
                  <a 
                    href={resource.link} 
                    className="inline-flex items-center text-teal-600 hover:text-teal-800 font-medium"
                  >
                    Access Resource
                    <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                  </a>
                </div>
              ))}
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Career Path Guides</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-teal-500 transition-colors">
                  <div className="flex items-center mb-3">
                    <FaLaptopCode className="text-teal-600 text-xl mr-3" />
                    <h4 className="font-medium text-gray-900">Web Development</h4>
                  </div>
                  <p className="text-gray-700 text-sm mb-3">
                    Explore career paths in frontend, backend, and full-stack development.
                  </p>
                  <a href="#" className="text-teal-600 hover:text-teal-800 text-sm font-medium">View Guide →</a>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 hover:border-teal-500 transition-colors">
                  <div className="flex items-center mb-3">
                    <FaChartLine className="text-teal-600 text-xl mr-3" />
                    <h4 className="font-medium text-gray-900">Data Science</h4>
                  </div>
                  <p className="text-gray-700 text-sm mb-3">
                    Discover roles in data analysis, machine learning, and AI research.
                  </p>
                  <a href="#" className="text-teal-600 hover:text-teal-800 text-sm font-medium">View Guide →</a>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 hover:border-teal-500 transition-colors">
                  <div className="flex items-center mb-3">
                    <FaUserTie className="text-teal-600 text-xl mr-3" />
                    <h4 className="font-medium text-gray-900">Product Management</h4>
                  </div>
                  <p className="text-gray-700 text-sm mb-3">
                    Learn about product management roles and career progression.
                  </p>
                  <a href="#" className="text-teal-600 hover:text-teal-800 text-sm font-medium">View Guide →</a>
                </div>
              </div>
            </div>
            
            <div className="bg-teal-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Skill Assessment</h3>
              <p className="text-gray-700 mb-4">
                Take our skill assessment tests to identify your strengths and areas for improvement. Get personalized recommendations for courses and resources to enhance your skills.
              </p>
              <button className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 transition-colors">
                Start Assessment
              </button>
            </div>
          </div>
        )}
        
        {/* Career Counseling Tab */}
        {activeTab === 'counseling' && (
          <div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Book a Career Counseling Session</h3>
              <p className="text-gray-700 mb-6">
                Our career counselors can provide personalized guidance on career planning, job search strategies, interview preparation, and more. Schedule a one-on-one session to discuss your specific needs and goals.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="border border-gray-200 rounded-lg p-4 text-center hover:border-teal-500 transition-colors">
                  <h4 className="font-medium text-gray-900 mb-2">30-Minute Quick Session</h4>
                  <p className="text-gray-700 text-sm mb-4">
                    Brief consultation to address specific questions or concerns.
                  </p>
                  <button className="bg-teal-600 text-white px-4 py-2 rounded text-sm hover:bg-teal-700 transition-colors w-full">
                    Book Now
                  </button>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 text-center hover:border-teal-500 transition-colors">
                  <h4 className="font-medium text-gray-900 mb-2">60-Minute Standard Session</h4>
                  <p className="text-gray-700 text-sm mb-4">
                    Comprehensive career guidance and personalized action plan.
                  </p>
                  <button className="bg-teal-600 text-white px-4 py-2 rounded text-sm hover:bg-teal-700 transition-colors w-full">
                    Book Now
                  </button>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 text-center hover:border-teal-500 transition-colors">
                  <h4 className="font-medium text-gray-900 mb-2">Mock Interview Session</h4>
                  <p className="text-gray-700 text-sm mb-4">
                    Practice interview with feedback and improvement strategies.
                  </p>
                  <button className="bg-teal-600 text-white px-4 py-2 rounded text-sm hover:bg-teal-700 transition-colors w-full">
                    Book Now
                  </button>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 text-center">
                All sessions are conducted virtually via video conference. You'll receive a confirmation email with the meeting link after booking.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Resume Review Service</h3>
                <p className="text-gray-700 mb-4">
                  Get your resume reviewed by our career experts. Receive detailed feedback and suggestions to make your resume stand out to employers.
                </p>
                <button className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 transition-colors">
                  Submit Resume
                </button>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">LinkedIn Profile Review</h3>
                <p className="text-gray-700 mb-4">
                  Our experts will review your LinkedIn profile and provide recommendations to optimize it for recruiters and networking opportunities.
                </p>
                <button className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 transition-colors">
                  Submit Profile
                </button>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Meet Our Career Counselors</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center">
                  <img 
                    src="https://randomuser.me/api/portraits/women/32.jpg" 
                    alt="Career Counselor" 
                    className="w-24 h-24 rounded-full object-cover mb-3"
                  />
                  <h4 className="font-medium text-gray-900">Priya Sharma</h4>
                  <p className="text-sm text-gray-600 mb-2">Tech Career Specialist</p>
                  <p className="text-xs text-gray-500 text-center">
                    10+ years experience in tech recruitment and career coaching
                  </p>
                </div>
                
                <div className="flex flex-col items-center">
                  <img 
                    src="https://randomuser.me/api/portraits/men/45.jpg" 
                    alt="Career Counselor" 
                    className="w-24 h-24 rounded-full object-cover mb-3"
                  />
                  <h4 className="font-medium text-gray-900">Rahul Verma</h4>
                  <p className="text-sm text-gray-600 mb-2">Interview Coach</p>
                  <p className="text-xs text-gray-500 text-center">
                    Former tech hiring manager with expertise in interview preparation
                  </p>
                </div>
                
                <div className="flex flex-col items-center">
                  <img 
                    src="https://randomuser.me/api/portraits/women/65.jpg" 
                    alt="Career Counselor" 
                    className="w-24 h-24 rounded-full object-cover mb-3"
                  />
                  <h4 className="font-medium text-gray-900">Anita Desai</h4>
                  <p className="text-sm text-gray-600 mb-2">Resume & LinkedIn Expert</p>
                  <p className="text-xs text-gray-500 text-center">
                    Specializes in personal branding and professional profiles
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Career Events Tab */}
        {activeTab === 'events' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {events.map(event => (
                <div key={event.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{event.title}</h3>
                    <div className="flex items-center text-gray-600 text-sm mb-2">
                      <FaCalendarAlt className="mr-2" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm mb-2">
                      <FaClock className="mr-2" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm mb-4">
                      <FaMapMarkerAlt className="mr-2" />
                      <span>{event.location}</span>
                    </div>
                    <p className="text-gray-700 mb-4">{event.description}</p>
                    <button className="bg-teal-600 text-white px-4 py-2 rounded text-sm hover:bg-teal-700 transition-colors w-full">
                      Register
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Webinars</h3>
              <div className="space-y-4">
                <div className="flex items-start border-b border-gray-100 pb-4">
                  <div className="flex-shrink-0 bg-teal-100 text-teal-800 text-xs font-medium px-2.5 py-0.5 rounded mr-3 mt-1">
                    Jul 18
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Navigating the Tech Job Market in 2024</h4>
                    <p className="text-sm text-gray-600">Learn about current trends, in-demand skills, and strategies for standing out in today's competitive tech job market.</p>
                  </div>
                </div>
                
                <div className="flex items-start border-b border-gray-100 pb-4">
                  <div className="flex-shrink-0 bg-teal-100 text-teal-800 text-xs font-medium px-2.5 py-0.5 rounded mr-3 mt-1">
                    Jul 22
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Mastering Technical Interviews</h4>
                    <p className="text-sm text-gray-600">Tips and strategies for excelling in coding challenges, system design questions, and behavioral interviews.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-teal-100 text-teal-800 text-xs font-medium px-2.5 py-0.5 rounded mr-3 mt-1">
                    Jul 29
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Building Your Personal Brand as a Tech Professional</h4>
                    <p className="text-sm text-gray-600">Learn how to establish your online presence and build a personal brand that attracts opportunities.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-teal-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Suggest an Event</h3>
              <p className="text-gray-700 mb-4">
                Is there a specific career event or workshop you'd like us to organize? Let us know your suggestions, and we'll consider them for future events.
              </p>
              <button className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 transition-colors">
                Submit Suggestion
              </button>
            </div>
          </div>
        )}
      </div>
    </StudentTemplate>
  );
};

export default CareerSupport;