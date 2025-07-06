import React, { useState, useEffect } from "react";
import StudentTemplate from "./StudentTemplate";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaClock,
  FaUsers,
  FaSearch,
  FaStar,
  FaUserGraduate,
  FaLaptop,
  FaMicrophone,
  FaHandshake,
  FaRocket,
  FaChevronRight,
  FaArrowRight,
  FaCode,
  FaBrain,
  FaNetworkWired,
  FaChartLine,
  FaPlay,
  FaBookmark,
  FaFilter,
  FaHeart,
  FaShare,
  FaTicketAlt,
  FaGraduationCap,
  FaBolt,
  FaFire,
  FaGlobe,
  FaVideo,
  FaCertificate,
  FaTrophy,
  FaBuilding,
} from "react-icons/fa";

const Events = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [showFilters, setShowFilters] = useState(false);
  const [likedEvents, setLikedEvents] = useState(new Set());

  // Enhanced events data with more comprehensive content
  const events = [
    {
      id: 1,
      title: "Complete AI & Machine Learning Bootcamp 2024",
      type: "bootcamp",
      date: "2024-08-15",
      time: "9:00 AM - 5:00 PM",
      duration: "8 hours",
      location: "Online + Interactive Labs",
      description:
        "Comprehensive AI/ML bootcamp covering deep learning, neural networks, computer vision, and NLP. Build 5 real-world projects including a chatbot, image classifier, and recommendation system. Get hands-on with Python, TensorFlow, PyTorch, and industry-standard tools.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "Free",
      originalPrice: "$299",
      seats: 200,
      attendees: 147,
      featured: true,
      status: "going-fast",
      instructor: "Dr. Sarah Chen",
      instructorRole: "AI Research Scientist at Google",
      rating: 4.9,
      level: "Intermediate to Advanced",
      tags: ["Python", "TensorFlow", "Deep Learning", "Computer Vision", "NLP"],
      highlights: [
        "5 Portfolio Projects",
        "Industry Certification",
        "1-on-1 Mentorship",
        "Job Placement Support",
      ],
      agenda: [
        "AI Fundamentals & Ethics",
        "Machine Learning Algorithms",
        "Deep Learning with TensorFlow",
        "Computer Vision Projects",
        "Natural Language Processing",
        "MLOps & Model Deployment",
      ],
    },
    {
      id: 2,
      title: "Global Tech Career Fair 2024 - Virtual Hiring Event",
      type: "career",
      date: "2024-08-20",
      time: "10:00 AM - 8:00 PM",
      duration: "10 hours",
      location: "Virtual Expo Platform",
      description:
        "Largest virtual tech career fair featuring 100+ top companies including FAANG, startups, and Fortune 500 companies. Live interviews, portfolio reviews, networking lounges, and exclusive job opportunities for remote, hybrid, and on-site positions worldwide.",
      image:
        "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "Free",
      originalPrice: null,
      seats: null,
      attendees: 2847,
      featured: true,
      status: "hot",
      instructor: "Career Services Team",
      instructorRole: "Professional Placement Experts",
      rating: 4.8,
      level: "All Levels",
      tags: [
        "Career",
        "Networking",
        "Remote Jobs",
        "Interviews",
        "Tech Giants",
      ],
      highlights: [
        "100+ Hiring Companies",
        "Live Interview Slots",
        "Resume Review Sessions",
        "Salary Negotiation Tips",
      ],
      agenda: [
        "Company Showcase & Presentations",
        "Technical Interview Prep",
        "Portfolio Review Sessions",
        "Networking Lounges",
        "Panel Discussions",
        "Job Matching Algorithm",
      ],
    },
    {
      id: 3,
      title: "Full-Stack MERN Development Intensive Workshop",
      type: "workshop",
      date: "2024-08-18",
      time: "1:00 PM - 7:00 PM",
      duration: "6 hours",
      location: "Online with Live Coding",
      description:
        "Build a complete social media application from scratch using MongoDB, Express.js, React, and Node.js. Learn modern development practices, authentication, real-time features, deployment strategies, and performance optimization techniques.",
      image:
        "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "$79",
      originalPrice: "$149",
      seats: 50,
      attendees: 42,
      featured: true,
      status: "almost-full",
      instructor: "Alex Rodriguez",
      instructorRole: "Senior Full-Stack Engineer at Meta",
      rating: 4.7,
      level: "Beginner to Intermediate",
      tags: ["React", "Node.js", "MongoDB", "Express", "Full-Stack"],
      highlights: [
        "Complete App Development",
        "Real-time Features",
        "Production Deployment",
        "Code Review & Feedback",
      ],
      agenda: [
        "Project Setup & Architecture",
        "Backend API Development",
        "Database Design & Integration",
        "Frontend React Components",
        "Authentication & Security",
        "Deployment & Performance",
      ],
    },
    {
      id: 4,
      title: "Global Startup Pitch Competition & Demo Day 2024",
      type: "competition",
      date: "2024-08-25",
      time: "6:00 PM - 11:00 PM",
      duration: "5 hours",
      location: "Hybrid - SF & Virtual",
      description:
        "Present your innovative startup idea to a distinguished panel of venture capitalists, angel investors, and industry leaders. Winner receives $25K seed funding, 6-month accelerator program, and mentorship from Silicon Valley executives.",
      image:
        "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "Free",
      originalPrice: null,
      seats: 100,
      attendees: 73,
      featured: false,
      status: "new",
      instructor: "VC Panel & Industry Leaders",
      instructorRole: "Top Venture Capitalists & Entrepreneurs",
      rating: 4.6,
      level: "Advanced",
      tags: ["Entrepreneurship", "Funding", "Pitching", "Startups", "VC"],
      highlights: [
        "$25K Prize Money",
        "6-Month Accelerator",
        "VC Mentorship",
        "Media Coverage",
      ],
      agenda: [
        "Pitch Deck Workshop",
        "Startup Presentations",
        "VC Panel Judging",
        "Networking Session",
        "Awards Ceremony",
        "Post-Event Mentorship",
      ],
    },
    {
      id: 5,
      title: "AWS Cloud Architecture & Security Certification Marathon",
      type: "certification",
      date: "2024-08-22",
      time: "9:00 AM - 6:00 PM",
      duration: "9 hours",
      location: "Online + AWS Console",
      description:
        "Intensive preparation for AWS Solutions Architect and Security certifications. Hands-on labs, practice exams, real-world scenarios, and expert guidance. Master cloud architecture, security best practices, and cost optimization strategies.",
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "$149",
      originalPrice: "$249",
      seats: 75,
      attendees: 58,
      featured: false,
      status: "normal",
      instructor: "Mike Thompson",
      instructorRole: "AWS Certified Solutions Architect Expert",
      rating: 4.8,
      level: "Intermediate to Advanced",
      tags: ["AWS", "Cloud", "Security", "Architecture", "Certification"],
      highlights: [
        "2 Certification Paths",
        "Hands-on Labs",
        "Practice Exams",
        "Study Materials Included",
      ],
      agenda: [
        "Cloud Architecture Fundamentals",
        "Security & Compliance",
        "Cost Optimization",
        "Hands-on Labs",
        "Practice Exams",
        "Certification Strategy",
      ],
    },
    {
      id: 6,
      title: "Advanced UX/UI Design & Prototyping Masterclass",
      type: "workshop",
      date: "2024-08-28",
      time: "11:00 AM - 6:00 PM",
      duration: "7 hours",
      location: "Online + Design Tools",
      description:
        "Master advanced UX/UI design principles, user research methodologies, and prototyping with Figma. Work on real client projects, learn design systems, accessibility standards, and conversion optimization techniques.",
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "$99",
      originalPrice: "$179",
      seats: 40,
      attendees: 31,
      featured: false,
      status: "normal",
      instructor: "Emma Wilson",
      instructorRole: "Lead UX Designer at Airbnb",
      rating: 4.9,
      level: "Intermediate",
      tags: ["UX", "UI", "Figma", "Prototyping", "Design Systems"],
      highlights: [
        "Real Client Projects",
        "Design System Creation",
        "Portfolio Review",
        "Industry Certification",
      ],
      agenda: [
        "User Research & Personas",
        "Information Architecture",
        "Wireframing & Prototyping",
        "Visual Design Principles",
        "Usability Testing",
        "Design System Development",
      ],
    },
    {
      id: 7,
      title: "Blockchain & Web3 Development Bootcamp",
      type: "bootcamp",
      date: "2024-09-05",
      time: "10:00 AM - 8:00 PM",
      duration: "10 hours",
      location: "Online + Blockchain Networks",
      description:
        "Comprehensive introduction to blockchain technology, smart contract development, and Web3 applications. Build DeFi protocols, NFT marketplaces, and decentralized applications using Solidity, Ethereum, and modern Web3 tools.",
      image:
        "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "$199",
      originalPrice: "$399",
      seats: 60,
      attendees: 23,
      featured: false,
      status: "new",
      instructor: "David Kim",
      instructorRole: "Blockchain Architect at ConsenSys",
      rating: 4.5,
      level: "Intermediate to Advanced",
      tags: ["Blockchain", "Solidity", "Web3", "Smart Contracts", "DeFi"],
      highlights: [
        "3 DeFi Projects",
        "NFT Marketplace Build",
        "Smart Contract Auditing",
        "Job Market Insights",
      ],
      agenda: [
        "Blockchain Fundamentals",
        "Solidity Programming",
        "Smart Contract Development",
        "DeFi Protocol Building",
        "NFT Development",
        "Web3 Integration",
      ],
    },
    {
      id: 8,
      title: "Data Science & Analytics Career Summit",
      type: "career",
      date: "2024-09-12",
      time: "2:00 PM - 8:00 PM",
      duration: "6 hours",
      location: "Hybrid Event",
      description:
        "Connect with leading data science companies, learn about emerging trends, and discover career opportunities in AI, machine learning, and analytics. Features company showcases, technical interviews, and portfolio reviews.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "Free",
      originalPrice: null,
      seats: null,
      attendees: 456,
      featured: false,
      status: "normal",
      instructor: "Data Science Community",
      instructorRole: "Industry Leaders & Hiring Managers",
      rating: 4.7,
      level: "All Levels",
      tags: ["Data Science", "Analytics", "Machine Learning", "Career", "AI"],
      highlights: [
        "50+ Hiring Companies",
        "Portfolio Reviews",
        "Salary Insights",
        "Technical Challenges",
      ],
      agenda: [
        "Industry Trends Panel",
        "Company Presentations",
        "Technical Skills Assessment",
        "Portfolio Reviews",
        "Networking Sessions",
        "Career Strategy Workshop",
      ],
    },
  ];

  // Filter events
  const filteredEvents = events.filter((event) => {
    const matchesFilter = activeFilter === "all" || event.type === activeFilter;
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    const matchesTab = activeTab === "upcoming"; // For simplicity, showing all as upcoming
    return matchesFilter && matchesSearch && matchesTab;
  });

  const filters = [
    {
      id: "all",
      name: "All Events",
      icon: FaCalendarAlt,
      count: events.length,
    },
    {
      id: "workshop",
      name: "Workshops",
      icon: FaLaptop,
      count: events.filter((e) => e.type === "workshop").length,
    },
    {
      id: "career",
      name: "Career Events",
      icon: FaHandshake,
      count: events.filter((e) => e.type === "career").length,
    },
    {
      id: "bootcamp",
      name: "Bootcamps",
      icon: FaUserGraduate,
      count: events.filter((e) => e.type === "bootcamp").length,
    },
    {
      id: "certification",
      name: "Certifications",
      icon: FaCertificate,
      count: events.filter((e) => e.type === "certification").length,
    },
    {
      id: "competition",
      name: "Competitions",
      icon: FaTrophy,
      count: events.filter((e) => e.type === "competition").length,
    },
  ];

  // Enhanced testimonials data
  const testimonials = [
    {
      text: "The AI bootcamp completely transformed my career! I landed a machine learning engineer role at a Fortune 500 company within 3 months.",
      author: "Priya Sharma",
      role: "ML Engineer at Microsoft",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b47c?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      company: "Microsoft",
      salary: "$120K",
    },
    {
      text: "The virtual career fair was incredible! I connected with 12 companies and received 5 job offers. The networking opportunities were unmatched.",
      author: "Rahul Patel",
      role: "Senior Data Scientist",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      company: "Netflix",
      salary: "$140K",
    },
    {
      text: "The UX workshop helped me build an amazing portfolio. I transitioned from graphic design to UX and doubled my salary!",
      author: "Sarah Johnson",
      role: "Senior UX Designer",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      company: "Spotify",
      salary: "$110K",
    },
    {
      text: "Won the startup competition and secured $25K funding! My idea is now a thriving business with 10K+ users.",
      author: "Alex Chen",
      role: "Founder & CEO",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      company: "TechFlow AI",
      funding: "$25K",
    },
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const getStatusBadge = (status) => {
    const badges = {
      hot: {
        label: "🔥 Trending",
        color: "bg-red-50 text-red-700 border-red-200",
      },
      "going-fast": {
        label: "⚡ Filling Fast",
        color: "bg-orange-50 text-orange-700 border-orange-200",
      },
      "almost-full": {
        label: "⏰ Almost Full",
        color: "bg-yellow-50 text-yellow-700 border-yellow-200",
      },
      new: {
        label: "✨ New Event",
        color: "bg-teal-50 text-teal-700 border-teal-200",
      },
    };
    return badges[status] || { label: "", color: "" };
  };

  const toggleLike = (eventId) => {
    setLikedEvents((prev) => {
      const newLiked = new Set(prev);
      if (newLiked.has(eventId)) {
        newLiked.delete(eventId);
      } else {
        newLiked.add(eventId);
      }
      return newLiked;
    });
  };

  const featuredEvents = events.filter((event) => event.featured);

  return (
    <StudentTemplate
      title="Professional Development Events"
      subtitle="Accelerate your career with expert-led workshops, bootcamps, and networking events"
    >
      <div className="space-y-12">
        {/* Hero Section with Enhanced Stats */}
        <div className="relative bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800 rounded-2xl p-6 lg:p-8 text-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.1)_50%,transparent_75%)] bg-[length:20px_20px]"></div>
          </div>

          <div className="relative z-10">
            <div className="max-w-3xl">
              <div className="flex items-center mb-4">
                <div className="bg-white/20 p-2 rounded-full mr-3">
                  <FaRocket className="w-4 h-4 text-white" />
                </div>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                  Transform Your Career in 2024
                </span>
              </div>

              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                Exclusive Events for{" "}
                <span className="bg-gradient-to-r from-white to-teal-100 bg-clip-text text-transparent">
                  Your Success
                </span>
              </h1>

              <p className="text-lg md:text-xl text-teal-50 mb-6 leading-relaxed max-w-2xl">
                Join industry experts and top companies in hands-on workshops
                and career fairs
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <button className="bg-white text-teal-800 px-6 py-3 rounded-full font-bold hover:bg-teal-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Browse Events
                </button>
                <button className="border-2 border-white text-white px-6 py-3 rounded-full font-bold hover:bg-white hover:text-teal-800 transition-all duration-300">
                  Watch Demo
                </button>
              </div>
            </div>

            {/* Enhanced Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  number: "500K+",
                  label: "Students Trained",
                  icon: FaUserGraduate,
                },
                { number: "4.8/5", label: "Average Rating", icon: FaStar },
                {
                  number: "10K+",
                  label: "Live Events/Year",
                  icon: FaCalendarAlt,
                },
                {
                  number: "1,200+",
                  label: "Hiring Partners",
                  icon: FaBuilding,
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/20 transition-all duration-300"
                >
                  <div className="flex justify-center mb-2">
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-xl md:text-2xl font-bold text-white mb-1">
                    {stat.number}
                  </div>
                  <div className="text-teal-100 text-xs font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Events Showcase */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-black mb-1">
                Featured Events
              </h2>
              <p className="text-gray-600">
                Hand-picked events that deliver maximum value for your career
              </p>
            </div>
            <button className="flex items-center text-teal-600 font-semibold hover:text-teal-700 transition-colors">
              View All <FaChevronRight className="ml-2 w-4 h-4" />
            </button>
          </div>

          <div className="grid gap-6">
            {featuredEvents.slice(0, 2).map((event, index) => (
              <div
                key={event.id}
                className={`bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} lg:flex`}
              >
                <div className="lg:w-2/5 relative">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 lg:h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    {getStatusBadge(event.status).label && (
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(event.status).color}`}
                      >
                        {getStatusBadge(event.status).label}
                      </span>
                    )}
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button
                      onClick={() => toggleLike(event.id)}
                      className={`p-2 rounded-full backdrop-blur-sm transition-colors ${likedEvents.has(event.id) ? "bg-red-500 text-white" : "bg-white/90 text-gray-700 hover:bg-white"}`}
                    >
                      <FaHeart className="w-3 h-3" />
                    </button>
                    <button className="p-2 rounded-full bg-white/90 text-gray-700 hover:bg-white transition-colors">
                      <FaShare className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="lg:w-3/5 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <span className="bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full">
                        {event.type.toUpperCase()}
                      </span>
                      <div className="flex items-center">
                        <FaStar className="w-3 h-3 text-yellow-400 mr-1" />
                        <span className="text-xs font-semibold text-gray-700">
                          {event.rating} ({event.attendees}+ enrolled)
                        </span>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl lg:text-2xl font-bold text-black mb-3 leading-tight">
                    {event.title}
                  </h3>

                  <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                    {event.description.substring(0, 150)}...
                  </p>

                  {/* Event Highlights */}
                  <div className="grid md:grid-cols-2 gap-2 mb-4">
                    {event.highlights.slice(0, 4).map((highlight, idx) => (
                      <div
                        key={idx}
                        className="flex items-center text-xs text-gray-700"
                      >
                        <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mr-2"></div>
                        {highlight}
                      </div>
                    ))}
                  </div>

                  {/* Event Details Grid */}
                  <div className="grid md:grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center text-gray-600">
                      <FaCalendarAlt className="w-3 h-3 mr-2 text-teal-600" />
                      <div>
                        <div className="font-semibold text-black text-xs">
                          {new Date(event.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                        <div className="text-xs">{event.time}</div>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FaClock className="w-3 h-3 mr-2 text-teal-600" />
                      <div>
                        <div className="font-semibold text-black text-xs">
                          {event.duration}
                        </div>
                        <div className="text-xs">{event.level}</div>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {event.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium hover:bg-teal-100 hover:text-teal-700 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold text-teal-600">
                        {event.price}
                      </span>
                      {event.originalPrice && (
                        <span className="text-sm text-gray-500 line-through ml-2">
                          {event.originalPrice}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button className="bg-teal-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-teal-700 transition-all duration-300 text-sm">
                        Enroll Now
                      </button>
                      <button className="border border-teal-600 text-teal-600 px-3 py-2 rounded-full font-semibold hover:bg-teal-600 hover:text-white transition-all duration-300 text-sm">
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Event Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-black mb-8">
            Event Categories & Specializations
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              {
                name: "AI & Machine Learning",
                icon: FaBrain,
                count: "45+ events",
              },
              { name: "Web Development", icon: FaCode, count: "60+ events" },
              { name: "Data Science", icon: FaChartLine, count: "35+ events" },
              { name: "Cloud Computing", icon: FaGlobe, count: "40+ events" },
              {
                name: "Cybersecurity",
                icon: FaNetworkWired,
                count: "25+ events",
              },
              { name: "UX/UI Design", icon: FaLaptop, count: "30+ events" },
              {
                name: "Career Development",
                icon: FaRocket,
                count: "50+ events",
              },
              { name: "Blockchain & Web3", icon: FaBolt, count: "20+ events" },
              {
                name: "Mobile Development",
                icon: FaVideo,
                count: "25+ events",
              },
              {
                name: "Digital Marketing",
                icon: FaChartLine,
                count: "35+ events",
              },
              {
                name: "Product Management",
                icon: FaTicketAlt,
                count: "30+ events",
              },
              {
                name: "DevOps & MLOps",
                icon: FaNetworkWired,
                count: "40+ events",
              },
            ].map((category, index) => (
              <button
                key={index}
                className="group p-6 border border-gray-200 rounded-2xl text-left hover:border-teal-500 hover:bg-teal-50 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-center mb-3">
                  <category.icon className="w-6 h-6 text-gray-600 group-hover:text-teal-600 transition-colors mr-3" />
                  <div className="w-2 h-2 bg-teal-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <h3 className="font-semibold text-black mb-1 group-hover:text-teal-700 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500 group-hover:text-teal-600 transition-colors">
                  {category.count}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Enhanced Filter Section */}
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 mb-8 sticky top-4 z-30 shadow-lg">
          {/* Event Tabs */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex space-x-1">
              {["upcoming", "past"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    activeTab === tab
                      ? "bg-teal-600 text-white shadow-lg"
                      : "text-gray-700 hover:text-teal-600 hover:bg-teal-50"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)} Events
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:border-teal-500 hover:text-teal-600 transition-colors"
            >
              <FaFilter className="w-4 h-4 mr-2" />
              Filters
            </button>
          </div>

          <div
            className={`flex flex-col lg:flex-row gap-6 items-center justify-between ${showFilters ? "block" : "hidden lg:flex"}`}
          >
            {/* Category Filters */}
            <div className="flex flex-wrap gap-3">
              {filters.map((filter) => {
                const IconComponent = filter.icon;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`flex items-center px-5 py-3 rounded-full text-sm font-semibold border-2 transition-all duration-300 hover:shadow-md ${
                      activeFilter === filter.id
                        ? "bg-teal-600 text-white border-teal-600 shadow-lg"
                        : "bg-white text-gray-700 border-gray-300 hover:border-teal-500 hover:text-teal-600 hover:bg-teal-50"
                    }`}
                  >
                    <IconComponent className="w-4 h-4 mr-2" />
                    {filter.name}
                    <span
                      className={`ml-2 px-2 py-1 rounded-full text-xs ${
                        activeFilter === filter.id
                          ? "bg-white/20 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {filter.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Enhanced Search Bar */}
            <div className="relative w-full lg:w-96">
              <input
                type="text"
                placeholder="Search events, topics, or instructors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>
        </div>

        {/* All Events Section */}
        <div>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-black mb-2">
                {activeFilter === "all"
                  ? "All Professional Development"
                  : filters.find((f) => f.id === activeFilter)?.name}{" "}
                Events
              </h2>
              <p className="text-gray-600 text-lg">
                {filteredEvents.length} events found • Updated daily
              </p>
            </div>
            <div className="flex items-center gap-4 mt-4 lg:mt-0">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select className="border-2 border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                <option>Most Relevant</option>
                <option>Newest First</option>
                <option>Highest Rated</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Starting Soon</option>
              </select>
            </div>
          </div>

          {/* Info Banner */}
          <div className="bg-gradient-to-r from-teal-50 to-teal-100 border-l-4 border-teal-500 rounded-lg p-6 mb-8">
            <div className="flex items-center">
              <FaBolt className="w-6 h-6 text-teal-600 mr-4" />
              <div>
                <p className="text-black font-semibold">
                  Limited Time Offer: Free access to premium events
                </p>
                <p className="text-gray-700 text-sm">
                  All events include 30-day money-back guarantee • Lifetime
                  access to recordings • Industry-recognized certificates
                </p>
              </div>
            </div>
          </div>

          {/* Enhanced Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => {
              const badge = getStatusBadge(event.status);
              return (
                <div
                  key={event.id}
                  className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden hover:shadow-2xl hover:border-teal-300 transition-all duration-500 group"
                >
                  <div className="relative">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {badge.label && (
                      <span
                        className={`absolute top-4 left-4 px-3 py-2 rounded-full text-xs font-bold border ${badge.color}`}
                      >
                        {badge.label}
                      </span>
                    )}

                    <div className="absolute top-4 right-4 flex gap-2">
                      <button
                        onClick={() => toggleLike(event.id)}
                        className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
                          likedEvents.has(event.id)
                            ? "bg-red-500 text-white"
                            : "bg-white/90 text-gray-700 hover:bg-white hover:scale-110"
                        }`}
                      >
                        <FaHeart className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-full bg-white/90 text-gray-700 hover:bg-white hover:scale-110 transition-all duration-300">
                        <FaBookmark className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="absolute bottom-4 left-4">
                      <span className="bg-black/70 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                        {event.level}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <span className="bg-teal-100 text-teal-800 text-xs font-bold px-3 py-2 rounded-full">
                        {event.type.toUpperCase()}
                      </span>
                      <div className="flex items-center">
                        <FaStar className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className="text-sm font-semibold text-gray-700">
                          {event.rating}
                        </span>
                        <span className="text-xs text-gray-500 ml-1">
                          ({event.attendees})
                        </span>
                      </div>
                    </div>

                    <h3 className="font-bold text-gray-900 mb-3 leading-tight group-hover:text-teal-600 transition-colors text-lg">
                      {event.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {event.description}
                    </p>

                    {/* Instructor Info */}
                    <div className="flex items-center mb-4 p-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white font-bold text-sm">
                          {event.instructor.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-gray-900">
                          {event.instructor}
                        </div>
                        <div className="text-xs text-gray-600">
                          {event.instructorRole}
                        </div>
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="space-y-2 mb-4 text-xs text-gray-600">
                      <div className="flex items-center">
                        <FaCalendarAlt className="w-4 h-4 mr-3 text-teal-600" />
                        <span className="font-medium">
                          {new Date(event.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <FaClock className="w-4 h-4 mr-3 text-teal-600" />
                        <span>
                          {event.duration} • {event.time}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <FaMapMarkerAlt className="w-4 h-4 mr-3 text-teal-600" />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {event.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium hover:bg-teal-100 hover:text-teal-700 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                      {event.tags.length > 3 && (
                        <span className="text-gray-500 text-xs">
                          +{event.tags.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-teal-600 text-xl">
                          {event.price}
                        </span>
                        {event.originalPrice && (
                          <span className="text-sm text-gray-500 line-through ml-2">
                            {event.originalPrice}
                          </span>
                        )}
                      </div>
                      <button className="bg-teal-600 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        Enroll Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-300 text-8xl mb-6">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                No events found
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                We couldn't find any events matching your criteria. Try
                adjusting your search or browse our featured events.
              </p>
              <button
                onClick={() => {
                  setActiveFilter("all");
                  setSearchQuery("");
                }}
                className="bg-teal-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-teal-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Enhanced Community Testimonials */}
        <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-3xl p-8 lg:p-12 text-white">
          <div className="text-center mb-8">
            <h3 className="text-2xl lg:text-3xl font-bold mb-3">
              Success Stories from Our Community
            </h3>
            <p className="text-teal-100 text-lg">
              Real career transformations from professionals like you
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-2xl">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{
                  transform: `translateX(-${currentTestimonial * 100}%)`,
                }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
                      <div className="flex justify-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className="w-5 h-5 text-yellow-300 mx-0.5"
                          />
                        ))}
                      </div>

                      <blockquote className="text-lg italic mb-6 leading-relaxed">
                        "{testimonial.text}"
                      </blockquote>

                      <div className="flex items-center justify-center">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.author}
                          className="w-16 h-16 rounded-full mr-4 border-4 border-white/20"
                        />
                        <div className="text-left">
                          <div className="font-bold text-lg">
                            {testimonial.author}
                          </div>
                          <div className="text-teal-200 text-sm">
                            {testimonial.role} at {testimonial.company}
                          </div>
                          {testimonial.salary && (
                            <div className="text-white text-sm font-semibold">
                              Salary: {testimonial.salary}
                            </div>
                          )}
                          {testimonial.funding && (
                            <div className="text-white text-sm font-semibold">
                              Funding: {testimonial.funding}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center mt-6 space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? "bg-white scale-125"
                      : "bg-white/50 hover:bg-white/75"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Bottom CTA */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 lg:p-16 text-center border-2 border-gray-200">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="bg-teal-100 p-4 rounded-full">
                <FaRocket className="w-12 h-12 text-teal-600" />
              </div>
            </div>

            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Ready to Accelerate Your Career?
            </h3>

            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Join over 500,000 professionals who've transformed their careers
              through our expert-led events. Start your journey today with
              industry-recognized certifications and hands-on experience.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button className="bg-teal-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Browse All Events
              </button>
              <button className="border-2 border-teal-600 text-teal-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-teal-600 hover:text-white transition-all duration-300">
                Download Event Calendar
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center">
                <FaCertificate className="w-4 h-4 mr-2 text-teal-600" />
                Industry Certifications
              </div>
              <div className="flex items-center">
                <FaHandshake className="w-4 h-4 mr-2 text-teal-600" />
                Job Placement Support
              </div>
              <div className="flex items-center">
                <FaStar className="w-4 h-4 mr-2 text-teal-600" />
                4.8/5 Average Rating
              </div>
              <div className="flex items-center">
                <FaUsers className="w-4 h-4 mr-2 text-teal-600" />
                500K+ Alumni Network
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentTemplate>
  );
};

export default Events;
