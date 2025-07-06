import React, { useState } from 'react';
import StudentTemplate from './StudentTemplate';
import { FaBriefcase, FaBuilding, FaMapMarkerAlt, FaCalendarAlt, FaFilter, FaSearch, FaFileAlt, FaCheckCircle, FaInfoCircle } from 'react-icons/fa';

const InternshipSupport = () => {
  const [activeTab, setActiveTab] = useState('opportunities');
  
  // Sample internship opportunities
  const internships = [
    {
      id: 1,
      title: "Frontend Developer Intern",
      company: "TechSolutions Inc.",
      location: "Bangalore (Remote)",
      duration: "3 months",
      stipend: "₹15,000/month",
      deadline: "July 30, 2024",
      description: "Assist in developing and maintaining frontend applications using React.js, HTML, CSS, and JavaScript. Work closely with senior developers to implement new features and fix bugs.",
      requirements: ["Proficiency in HTML, CSS, JavaScript", "Basic knowledge of React.js", "Understanding of responsive design", "Good problem-solving skills"],
      logo: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      id: 2,
      title: "Data Science Intern",
      company: "AnalyticsHub",
      location: "Mumbai (Hybrid)",
      duration: "6 months",
      stipend: "₹20,000/month",
      deadline: "August 5, 2024",
      description: "Work on real-world data science projects involving data cleaning, analysis, visualization, and machine learning model development. Collaborate with the data science team to extract insights from large datasets.",
      requirements: ["Knowledge of Python and data analysis libraries", "Basic understanding of machine learning algorithms", "Experience with SQL", "Strong analytical skills"],
      logo: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
      id: 3,
      title: "UI/UX Design Intern",
      company: "CreativeMinds",
      location: "Remote",
      duration: "4 months",
      stipend: "₹12,000/month",
      deadline: "July 25, 2024",
      description: "Create user-centered designs for web and mobile applications. Develop wireframes, prototypes, and visual designs. Conduct user research and usability testing to improve design solutions.",
      requirements: ["Proficiency in design tools like Figma or Adobe XD", "Understanding of UI/UX principles", "Basic knowledge of HTML/CSS", "Good communication skills"],
      logo: "https://randomuser.me/api/portraits/men/3.jpg"
    },
    {
      id: 4,
      title: "Backend Developer Intern",
      company: "ServerStack",
      location: "Hyderabad (On-site)",
      duration: "6 months",
      stipend: "₹18,000/month",
      deadline: "August 10, 2024",
      description: "Develop and maintain backend services using Node.js and Express. Work with databases, API integration, and server-side logic. Collaborate with the development team to build scalable applications.",
      requirements: ["Knowledge of Node.js and Express", "Experience with MongoDB or SQL databases", "Understanding of RESTful APIs", "Problem-solving skills"],
      logo: "https://randomuser.me/api/portraits/women/4.jpg"
    }
  ];
  
  // Sample resources
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
      title: "Internship Interview Preparation Guide",
      type: "PDF Guide",
      description: "Comprehensive guide covering common technical interview questions, coding challenges, and behavioral interview tips.",
      pages: "45 pages",
      link: "#"
    },
    {
      id: 3,
      title: "Portfolio Development for Tech Roles",
      type: "Video Tutorial",
      description: "Step-by-step tutorial on building an impressive technical portfolio to showcase your projects and skills.",
      duration: "55 minutes",
      link: "#"
    },
    {
      id: 4,
      title: "Networking for Internship Opportunities",
      type: "Webinar Recording",
      description: "Learn effective networking strategies to connect with professionals and find hidden internship opportunities.",
      duration: "1 hour 30 minutes",
      link: "#"
    }
  ];
  
  return (
    <StudentTemplate 
      title="Internship Support" 
      subtitle="Find internship opportunities, resources, and guidance to kickstart your career"
    >
      <div className="space-y-8">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('opportunities')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'opportunities'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Internship Opportunities
            </button>
            <button
              onClick={() => setActiveTab('resources')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'resources'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Resources & Guides
            </button>
            <button
              onClick={() => setActiveTab('application')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'application'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Application Tracking
            </button>
          </nav>
        </div>
        
        {/* Opportunities Tab */}
        {activeTab === 'opportunities' && (
          <div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <div className="flex space-x-2 mb-4 md:mb-0 overflow-x-auto pb-2 w-full md:w-auto">
                <button className="px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap bg-teal-600 text-white">
                  All Internships
                </button>
                <button className="px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap bg-gray-100 text-gray-700 hover:bg-gray-200">
                  Tech & Development
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
                  placeholder="Search internships..."
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            
            <div className="space-y-6">
              {internships.map(internship => (
                <div key={internship.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-4">
                        <img 
                          src={internship.logo} 
                          alt={internship.company} 
                          className="h-12 w-12 rounded-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{internship.title}</h3>
                            <p className="text-gray-600">{internship.company}</p>
                          </div>
                          <button className="bg-teal-600 text-white px-4 py-2 rounded text-sm hover:bg-teal-700 transition-colors">
                            Apply Now
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 mb-4">
                          <div className="flex items-center text-gray-600 text-sm">
                            <FaMapMarkerAlt className="mr-2 text-gray-400" />
                            <span>{internship.location}</span>
                          </div>
                          <div className="flex items-center text-gray-600 text-sm">
                            <FaCalendarAlt className="mr-2 text-gray-400" />
                            <span>{internship.duration}</span>
                          </div>
                          <div className="flex items-center text-gray-600 text-sm">
                            <FaBriefcase className="mr-2 text-gray-400" />
                            <span>{internship.stipend}</span>
                          </div>
                          <div className="flex items-center text-gray-600 text-sm">
                            <FaCalendarAlt className="mr-2 text-gray-400" />
                            <span>Apply by: {internship.deadline}</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 mb-4">{internship.description}</p>
                        
                        <div className="mt-4">
                          <h4 className="font-medium text-gray-900 mb-2">Requirements:</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            {internship.requirements.map((req, index) => (
                              <li key={index} className="text-gray-700 text-sm">{req}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-200 transition-colors">
                Load More Opportunities
              </button>
            </div>
          </div>
        )}
        
        {/* Resources Tab */}
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
            
            <div className="bg-teal-50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Internship Preparation Checklist</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <FaCheckCircle className="text-teal-600 mt-0.5 mr-3 flex-shrink-0" />
                  <p className="text-gray-700">Update your resume with relevant coursework, projects, and skills</p>
                </div>
                <div className="flex items-start">
                  <FaCheckCircle className="text-teal-600 mt-0.5 mr-3 flex-shrink-0" />
                  <p className="text-gray-700">Create a professional LinkedIn profile and connect with industry professionals</p>
                </div>
                <div className="flex items-start">
                  <FaCheckCircle className="text-teal-600 mt-0.5 mr-3 flex-shrink-0" />
                  <p className="text-gray-700">Develop a portfolio showcasing your projects and technical skills</p>
                </div>
                <div className="flex items-start">
                  <FaCheckCircle className="text-teal-600 mt-0.5 mr-3 flex-shrink-0" />
                  <p className="text-gray-700">Practice common technical interview questions and coding challenges</p>
                </div>
                <div className="flex items-start">
                  <FaCheckCircle className="text-teal-600 mt-0.5 mr-3 flex-shrink-0" />
                  <p className="text-gray-700">Research companies and prepare questions to ask during interviews</p>
                </div>
                <div className="flex items-start">
                  <FaCheckCircle className="text-teal-600 mt-0.5 mr-3 flex-shrink-0" />
                  <p className="text-gray-700">Set up email alerts for internship opportunities in your field</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Personalized Guidance?</h3>
              <p className="text-gray-700 mb-4">
                Schedule a one-on-one session with our career counselors to get personalized advice on internship applications, interview preparation, and career planning.
              </p>
              <button className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 transition-colors">
                Book a Session
              </button>
            </div>
          </div>
        )}
        
        {/* Application Tracking Tab */}
        {activeTab === 'application' && (
          <div>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FaInfoCircle className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    You haven't applied to any internships through our platform yet. Apply to internships from the Opportunities tab to track your applications here.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Tracker</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Position
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Company
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Applied On
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {/* Empty state - no applications yet */}
                    <tr>
                      <td colSpan="5" className="px-6 py-10 text-center text-gray-500">
                        No applications to display
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Track External Applications</h3>
              <p className="text-gray-700 mb-4">
                Applied to internships outside our platform? Add them here to keep track of all your applications in one place.
              </p>
              <button className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 transition-colors">
                Add External Application
              </button>
            </div>
          </div>
        )}
      </div>
    </StudentTemplate>
  );
};

export default InternshipSupport;