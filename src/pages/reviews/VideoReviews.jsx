import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import Pagination from '../../components/Pagination';

// Extended video reviews data for pagination with categories
const allVideoReviews = [
  {
    id: 1,
    title: "Diploma In Operation Theatre Technician Course Review By Ekta | Brain Bridge DOTT Course Review",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "operation-theatre"
  },
  {
    id: 2,
    title: "Diploma In Medical Laboratory Technician Course Review By Kirti | Brain Bridge DMLT Course Review",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "medical-laboratory"
  },
  {
    id: 3,
    title: "Diploma In Operation Theatre Technician Course Review By Alisha Malik | Brain Bridge DOTT Course Review",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "operation-theatre"
  },
  {
    id: 4,
    title: "Medical Coding Certification Course Review By Priya | Henry Harvin Medical Coding Training",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "medical-coding"
  },
  {
    id: 5,
    title: "Data Science Course Review By Rahul | Henry Harvin Data Science Certification Program",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "data-science"
  },
  {
    id: 6,
    title: "Digital Marketing Course Review By Sneha | Henry Harvin Digital Marketing Training",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "digital-marketing"
  },
  {
    id: 7,
    title: "Web Development Bootcamp Review By Amit | Henry Harvin Full Stack Development Course",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "web-development"
  },
  {
    id: 8,
    title: "Project Management Course Review By Kavya | Henry Harvin PMP Certification Training",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "project-management"
  },
  {
    id: 9,
    title: "Graphic Design Course Review By Arjun | Henry Harvin Creative Design Training",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "graphic-design"
  },
  {
    id: 10,
    title: "Business Analytics Course Review By Meera | Henry Harvin Analytics Certification",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "business-analytics"
  },
  {
    id: 11,
    title: "Cybersecurity Course Review By Vikash | Henry Harvin Ethical Hacking Training",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "cybersecurity"
  },
  {
    id: 12,
    title: "Cloud Computing Course Review By Anita | Henry Harvin AWS Certification Training",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "cloud-computing"
  },
  {
    id: 13,
    title: "Machine Learning Course Review By Rohit | Henry Harvin AI/ML Certification Program",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "machine-learning"
  },
  {
    id: 14,
    title: "UI/UX Design Course Review By Pooja | Henry Harvin Design Thinking Training",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "ui-ux-design"
  },
  {
    id: 15,
    title: "Content Writing Course Review By Sanjay | Henry Harvin Content Marketing Training",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "content-writing"
  },
  {
    id: 16,
    title: "SEO Course Review By Divya | Henry Harvin Search Engine Optimization Training",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "seo"
  },
  {
    id: 17,
    title: "Social Media Marketing Review By Karan | Henry Harvin SMM Certification",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "social-media-marketing"
  },
  {
    id: 18,
    title: "Financial Modeling Course Review By Shreya | Henry Harvin Finance Training",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "financial-modeling"
  },
  {
    id: 19,
    title: "Python Programming Course Review By Rajesh | Henry Harvin Python Certification",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "python-programming"
  },
  {
    id: 20,
    title: "Java Development Course Review By Neha | Henry Harvin Java Training Program",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "java-development"
  },
  {
    id: 21,
    title: "React.js Course Review By Arun | Henry Harvin Frontend Development Training",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "react-development"
  },
  {
    id: 22,
    title: "Node.js Course Review By Priyanka | Henry Harvin Backend Development Training",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "nodejs-development"
  },
  {
    id: 23,
    title: "Angular Course Review By Suresh | Henry Harvin Angular Certification Program",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "angular-development"
  },
  {
    id: 24,
    title: "DevOps Course Review By Manisha | Henry Harvin DevOps Engineering Training",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "devops"
  },
  {
    id: 25,
    title: "Blockchain Course Review By Deepak | Henry Harvin Blockchain Certification",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "blockchain"
  },
  {
    id: 26,
    title: "Artificial Intelligence Course Review By Sunita | Henry Harvin AI Training",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "artificial-intelligence"
  },
  {
    id: 27,
    title: "Database Administration Course Review By Vinod | Henry Harvin DBA Training",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "database-administration"
  },
  {
    id: 28,
    title: "Software Testing Course Review By Ritu | Henry Harvin QA Testing Certification",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "software-testing"
  },
  {
    id: 29,
    title: "Mobile App Development Review By Kiran | Henry Harvin App Development Course",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "mobile-development"
  },
  {
    id: 30,
    title: "Game Development Course Review By Aarti | Henry Harvin Game Design Training",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "game-development"
  },
  {
    id: 31,
    title: "Network Security Course Review By Manoj | Henry Harvin Network Security Training",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "network-security"
  },
  {
    id: 32,
    title: "Data Engineering Course Review By Swati | Henry Harvin Data Engineering Program",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "data-engineering"
  },
  {
    id: 33,
    title: "Salesforce Course Review By Rakesh | Henry Harvin Salesforce Certification",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "salesforce"
  },
  {
    id: 34,
    title: "SAP Course Review By Geeta | Henry Harvin SAP Training Program",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "sap"
  },
  {
    id: 35,
    title: "Oracle Course Review By Harish | Henry Harvin Oracle Database Training",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "oracle"
  },
  {
    id: 36,
    title: "Microsoft Azure Course Review By Kavita | Henry Harvin Azure Certification",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "microsoft-azure"
  },
  {
    id: 37,
    title: "Google Cloud Course Review By Ankit | Henry Harvin GCP Training",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "google-cloud"
  },
  {
    id: 38,
    title: "Kubernetes Course Review By Shilpa | Henry Harvin Container Orchestration",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "kubernetes"
  },
  {
    id: 39,
    title: "Docker Course Review By Nitin | Henry Harvin Containerization Training",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "docker"
  },
  {
    id: 40,
    title: "Jenkins Course Review By Preeti | Henry Harvin CI/CD Pipeline Training",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "jenkins"
  },
  {
    id: 41,
    title: "Terraform Course Review By Sanjiv | Henry Harvin Infrastructure as Code",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "terraform"
  },
  {
    id: 42,
    title: "Ansible Course Review By Madhuri | Henry Harvin Configuration Management",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "ansible"
  },
  {
    id: 43,
    title: "Git & GitHub Course Review By Tarun | Henry Harvin Version Control Training",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "git-github"
  },
  {
    id: 44,
    title: "Linux Administration Review By Sunita | Henry Harvin Linux System Admin",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "linux-administration"
  },
  {
    id: 45,
    title: "Windows Server Course Review By Rajat | Henry Harvin Windows Admin Training",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "windows-server"
  },
  {
    id: 46,
    title: "Networking Course Review By Deepika | Henry Harvin Network Engineering",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "networking"
  },
  {
    id: 47,
    title: "CCNA Course Review By Mohit | Henry Harvin Cisco Certification Training",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "ccna"
  },
  {
    id: 48,
    title: "Ethical Hacking Advanced Review By Ravi | Henry Harvin Penetration Testing",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "ethical-hacking"
  },
  {
    id: 49,
    title: "Information Security Review By Nisha | Henry Harvin InfoSec Certification",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "information-security"
  },
  {
    id: 50,
    title: "CISSP Course Review By Ashok | Henry Harvin Security Professional Training",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "cissp"
  },
  {
    id: 51,
    title: "CEH Course Review By Pooja | Henry Harvin Certified Ethical Hacker",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "ceh"
  },
  {
    id: 52,
    title: "CompTIA Security+ Review By Vikram | Henry Harvin Security Fundamentals",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "comptia-security"
  },
  {
    id: 53,
    title: "CISA Course Review By Meena | Henry Harvin Information Systems Auditor",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "cisa"
  },
  {
    id: 54,
    title: "CISM Course Review By Ajay | Henry Harvin Information Security Manager",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "cism"
  }
];

const VideoReviews = () => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationData, setPaginationData] = useState(null);
  const [filteredVideos, setFilteredVideos] = useState([]);

  // Filter videos based on selected course
  const getFilteredVideos = () => {
    if (!selectedCourse) {
      return allVideoReviews;
    }
    return allVideoReviews.filter(video => video.category === selectedCourse);
  };

  // Pagination function
  const getPaginatedVideos = (page = 1, itemsPerPage = 9, videosToUse = null) => {
    const videos = videosToUse || getFilteredVideos();
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = videos.slice(startIndex, endIndex);

    return {
      videos: paginatedData,
      totalPages: Math.ceil(videos.length / itemsPerPage),
      currentPage: page,
      totalVideos: videos.length,
      hasNextPage: endIndex < videos.length,
      hasPrevPage: page > 1
    };
  };

  // Handle search functionality
  const handleSearch = () => {
    const filtered = getFilteredVideos();
    setFilteredVideos(filtered);
    setCurrentPage(1);
    setSearchParams({ page: '1', course: selectedCourse || '' });
    const data = getPaginatedVideos(1, 9, filtered);
    setPaginationData(data);
  };

  useEffect(() => {
    const page = parseInt(searchParams.get('page')) || 1;
    const course = searchParams.get('course') || '';
    setSelectedCourse(course);
    setCurrentPage(page);

    const filtered = course ? allVideoReviews.filter(video => video.category === course) : allVideoReviews;
    setFilteredVideos(filtered);

    // Calculate pagination data
    const startIndex = (page - 1) * 9;
    const endIndex = startIndex + 9;
    const paginatedData = filtered.slice(startIndex, endIndex);

    const data = {
      videos: paginatedData,
      totalPages: Math.ceil(filtered.length / 9),
      currentPage: page,
      totalVideos: filtered.length,
      hasNextPage: endIndex < filtered.length,
      hasPrevPage: page > 1
    };

    setPaginationData(data);
  }, [searchParams]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    const params = { page: page.toString() };
    if (selectedCourse) {
      params.course = selectedCourse;
    }
    setSearchParams(params);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!paginationData) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading videos...</p>
        </div>
      </div>
    );
  }

  const { videos, totalPages } = paginationData;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">


        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-teal-600 mb-6">
            Brain Bridge Video Reviews
          </h1>

          {/* Description */}
          <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
            <p className="text-gray-700 leading-relaxed mb-4">
              Here we are presenting exclusive Brain Bridge Reviews which are given by our students who got benefited from our training. These Video Reviews of Brain Bridge is enough to understand and join with No.1 Career oriented training institute in Delhi NCR. As a small initiative we are uploaded first set of videos from our library. By seeing each and every person who gave review in these videos anyone can understand our motive towards education. These Brain Bridge Reviews itself speaks about how we are different from other training institutes who are just brainwashing the students mind for money.
            </p>
          </div>

          {/* For those who gave reviews section */}
          <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
            <h2 className="text-xl font-semibold text-teal-600 mb-4">
              For those who gave reviews
            </h2>
            <p className="text-gray-700 mb-4">
              Thanks for the opportunity to let us give better education at the right time in right way. We will support our students all the time if they need us.
            </p>

            {/* Search Section */}
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="flex-1 max-w-md">
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="">Select Course</option>
                  <option value="medical-coding">Medical Coding</option>
                  <option value="operation-theatre">Operation Theatre Technician</option>
                  <option value="medical-laboratory">Medical Laboratory Technician</option>
                  <option value="data-science">Data Science</option>
                  <option value="digital-marketing">Digital Marketing</option>
                  <option value="web-development">Web Development</option>
                  <option value="project-management">Project Management</option>
                  <option value="graphic-design">Graphic Design</option>
                  <option value="business-analytics">Business Analytics</option>
                  <option value="cybersecurity">Cybersecurity</option>
                  <option value="cloud-computing">Cloud Computing</option>
                  <option value="machine-learning">Machine Learning</option>
                  <option value="ui-ux-design">UI/UX Design</option>
                  <option value="content-writing">Content Writing</option>
                  <option value="seo">SEO</option>
                  <option value="social-media-marketing">Social Media Marketing</option>
                  <option value="financial-modeling">Financial Modeling</option>
                  <option value="python-programming">Python Programming</option>
                  <option value="java-development">Java Development</option>
                  <option value="react-development">React.js Development</option>
                  <option value="nodejs-development">Node.js Development</option>
                  <option value="angular-development">Angular Development</option>
                  <option value="devops">DevOps</option>
                  <option value="blockchain">Blockchain</option>
                  <option value="artificial-intelligence">Artificial Intelligence</option>
                  <option value="database-administration">Database Administration</option>
                  <option value="software-testing">Software Testing</option>
                  <option value="mobile-development">Mobile App Development</option>
                  <option value="game-development">Game Development</option>
                  <option value="network-security">Network Security</option>
                  <option value="data-engineering">Data Engineering</option>
                  <option value="salesforce">Salesforce</option>
                  <option value="sap">SAP</option>
                  <option value="oracle">Oracle</option>
                  <option value="microsoft-azure">Microsoft Azure</option>
                  <option value="google-cloud">Google Cloud</option>
                  <option value="kubernetes">Kubernetes</option>
                  <option value="docker">Docker</option>
                  <option value="jenkins">Jenkins</option>
                  <option value="terraform">Terraform</option>
                  <option value="ansible">Ansible</option>
                  <option value="git-github">Git & GitHub</option>
                  <option value="linux-administration">Linux Administration</option>
                  <option value="windows-server">Windows Server</option>
                  <option value="networking">Networking</option>
                  <option value="ccna">CCNA</option>
                  <option value="ethical-hacking">Ethical Hacking</option>
                  <option value="information-security">Information Security</option>
                  <option value="cissp">CISSP</option>
                  <option value="ceh">CEH</option>
                  <option value="comptia-security">CompTIA Security+</option>
                  <option value="cisa">CISA</option>
                  <option value="cism">CISM</option>
                </select>
              </div>
              <button
                onClick={handleSearch}
                className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-md transition-colors flex items-center gap-2"
              >
                <FaSearch className="text-sm" />
                SEARCH
              </button>

              {/* Clear Filter Button */}
              {selectedCourse && (
                <button
                  onClick={() => {
                    setSelectedCourse('');
                    setCurrentPage(1);
                    setSearchParams({ page: '1' });
                    const data = getPaginatedVideos(1, 9, allVideoReviews);
                    setPaginationData(data);
                    setFilteredVideos(allVideoReviews);
                  }}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Clear Filter
                </button>
              )}


            </div>
          </div>
        </div>

        {/* Search Results Indicator */}
        {selectedCourse && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-800">
              <span className="font-semibold">Filtered by:</span> {selectedCourse.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              <span className="ml-2 text-sm">({paginationData.totalVideos} video{paginationData.totalVideos !== 1 ? 's' : ''} found)</span>
            </p>
          </div>
        )}

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {videos.map((video) => (
            <div key={video.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
              {/* Video Thumbnail */}
              <div className="relative aspect-video bg-gray-200">
                <iframe
                  src={`https://www.youtube.com/embed/${video.videoId}`}
                  title={video.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Video Title */}
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-900 leading-tight">
                  {video.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mb-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>

        {/* Results Info */}
        <div className="text-center text-gray-600 mb-8">
          <p>
            Showing {((currentPage - 1) * 9) + 1} to {Math.min(currentPage * 9, paginationData.totalVideos)} of {paginationData.totalVideos} video reviews
          </p>
        </div>


      </div>
    </div>
  );
};

export default VideoReviews;