import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AboutBrainBridge.css'; // Import separate CSS file

// Data for founders, timeline, awards, and media
const founders = [
  {
    name: 'Ronnie Screwvala',
    title: 'Co-Founder & Chairperson',
    description: "Named in 'Asia's 25 Most Powerful People' by Fortune Magazine",
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    imageHeight: 'h-48 sm:h-56 lg:h-64',
  },
  {
    name: 'Mayank Kumar',
    title: 'Co-Founder',
    description: 'Forty under 40 achiever by Economic Times in 2023',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    imageHeight: 'h-64',
  },
  {
    name: 'Phalgun Kompalli',
    title: 'Co-Founder',
    description: "Named the 'BW Education 40 under 40 Achiever' by Business World in 2020",
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    imageHeight: 'h-64',
  },
];

const edgeCards = [
  {
    id: 'hiring',
    title: '1400+',
    subtitle: 'Hiring Partners',
    description: 'Discover your dream job with personalised career',
    icon: (
      <div className="flex flex-col items-center gap-1">
        <div className="flex gap-1">
          <div className="w-6 h-6 bg-teal-600 rounded flex items-center justify-center text-white text-xs font-bold">G</div>
          <div className="w-6 h-6 bg-purple-500 rounded flex items-center justify-center text-white text-xs font-bold">M</div>
          <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center text-white text-xs font-bold">A</div>
        </div>
        <div className="flex gap-1">
          <div className="w-6 h-6 bg-teal-600 rounded flex items-center justify-center text-white text-xs font-bold">T</div>
          <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center text-white text-xs font-bold">I</div>
        </div>
      </div>
    ),
    onClick: () => alert('Learn more about our 1400+ hiring partners!'),
  },
  {
    id: 'courses',
    title: '200+',
    subtitle: 'Courses',
    description: 'Match your goals with the right course',
    icon: (
      <div className="w-20 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center">
        <div className="w-16 h-12 bg-white rounded shadow-sm flex items-center justify-center">
          <div className="text-orange-500 text-xs font-bold">CERT</div>
        </div>
      </div>
    ),
    onClick: () => alert('Explore our 200+ courses!'),
  },
  {
    id: 'experts',
    title: '250+',
    subtitle: 'Industry Experts',
    description: 'Boost your learning with engaging live classes',
    icon: (
      <div className="w-20 h-16 bg-gradient-to-br from-teal-100 to-teal-200 rounded-lg flex items-center justify-center">
        <div className="w-16 h-12 bg-white rounded shadow-sm flex items-center justify-center">
          <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
        </div>
      </div>
    ),
    onClick: () => alert('Meet our 250+ industry experts!'),
  },
  {
    id: 'career',
    title: '500+',
    subtitle: 'Career Experts',
    description: 'Get advice on picking the right course',
    icon: (
      <div className="w-20 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center">
        <div className="flex gap-1">
          <div className="w-6 h-12 bg-gray-300 rounded flex items-center justify-center">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
          </div>
          <div className="w-6 h-12 bg-gray-300 rounded flex items-center justify-center">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
          </div>
        </div>
      </div>
    ),
    onClick: () => alert('Connect with our 500+ career experts!'),
  },
  {
    id: 'problems',
    title: '300+',
    subtitle: 'Industry Problems',
    description: 'Get job-ready with practical knowledge & real-world experience',
    icon: (
      <div className="w-32 h-24 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center">
        <div className="grid grid-cols-3 gap-1">
          <div className="w-6 h-6 bg-purple-200 rounded"></div>
          <div className="w-6 h-6 bg-purple-300 rounded"></div>
          <div className="w-6 h-6 bg-purple-400 rounded"></div>
          <div className="w-6 h-6 bg-purple-300 rounded"></div>
          <div className="w-6 h-6 bg-purple-500 rounded"></div>
          <div className="w-6 h-6 bg-purple-400 rounded"></div>
        </div>
      </div>
    ),
    onClick: () => alert('Solve 300+ real industry problems!'),
  },
];

const driveCards = [
  {
    title: 'Our Vision',
    description: 'Powering career success for every member of the global workforce as their trusted lifelong learning partner.',
    icon: (
      <div className="relative scale-150">
        <div className="w-16 h-4 bg-teal-600 rounded-full"></div>
        <div className="w-12 h-12 bg-gray-800 rounded-full absolute -right-4 -top-4"></div>
        <div className="w-6 h-6 bg-white rounded-full absolute -right-1 -top-1"></div>
        <div className="absolute -bottom-6 left-4">
          <div className="w-3 h-8 bg-gray-600"></div>
          <div className="w-8 h-3 bg-gray-600 -mt-2"></div>
        </div>
        <div className="absolute -bottom-8 -left-8">
          <div className="w-4 h-6 bg-gray-700 rounded-t-full"></div>
          <div className="w-6 h-4 bg-gray-700 rounded-full -mt-1 -ml-1"></div>
        </div>
      </div>
    ),
  },
  {
    title: 'Our Mission',
    description: 'Making our learners achieve their desired outcomes.',
    icon: (
      <div className="relative scale-150">
        <div className="w-16 h-16 border-4 border-teal-600 rounded-full"></div>
        <div className="w-12 h-12 border-4 border-teal-500 rounded-full absolute top-2 left-2"></div>
        <div className="w-6 h-6 border-4 border-teal-400 rounded-full absolute top-5 left-5"></div>
        <div className="w-2 h-2 bg-teal-600 rounded-full absolute top-7 left-7"></div>
        <div className="absolute -right-4 top-8">
          <div className="w-8 h-1 bg-teal-700"></div>
          <div className="w-3 h-3 bg-teal-700 transform rotate-45 -mt-1 ml-6"></div>
          <div className="w-2 h-2 bg-teal-700 transform rotate-45 -mt-2 ml-1"></div>
        </div>
      </div>
    ),
  },
  {
    title: 'Our Core Values',
    description: 'Powering career success for every member of the global workforce as their trusted lifelong learning partner.',
    icon: (
      <div className="relative scale-150">
        <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-600 transform rotate-45"></div>
        <div className="w-8 h-8 bg-gradient-to-br from-teal-300 to-teal-500 transform rotate-45 absolute top-2 left-2"></div>
        <div className="w-6 h-6 bg-gradient-to-br from-teal-200 to-teal-400 transform rotate-45 absolute top-3 left-3"></div>
        <div className="w-4 h-4 bg-gradient-to-br from-cyan-200 to-teal-300 transform rotate-45 absolute top-4 left-4"></div>
        <div className="absolute -top-4 -left-2">
          <div className="w-2 h-2 bg-teal-400 transform rotate-45"></div>
        </div>
        <div className="absolute -top-2 -right-4">
          <div className="w-1 h-1 bg-teal-500 transform rotate-45"></div>
        </div>
        <div className="absolute -bottom-4 -right-2">
          <div className="w-2 h-2 bg-teal-400 transform rotate-45"></div>
        </div>
      </div>
    ),
  },
];

const timelineItems = [
  {
    year: '2015',
    events: [
      'Founders Ronnie, Mayank, and Phalgun established Brain Bridge',
      'Officially launched on March 23, 2015',
      'Started an Entrepreneurship program and joined the Skill India Mission',
    ],
    position: 'left',
  },
  {
    year: '2016',
    events: [
      'Graduated the first batch of 114 learners',
      'Launched the first program: "Startup with Brain Bridge" in Entrepreneurship',
      'Forged the first university partnership with IIITB to launch a Data Science program',
    ],
    position: 'right',
  },
  {
    year: '2017 & 2018',
    events: [
      'Reached over 10,000 learners',
      'Achieved 450+ successful career transitions',
    ],
    position: 'left',
  },
  {
    year: '2019',
    events: [
      "Expanded partnerships and became India's largest online higher education company",
      'Led the market in gross revenue for the <span className="text-blue-600">Indian EdTech sector</span>',
    ],
    position: 'right',
  },
  {
    year: '2020',
    events: [
      'Surpassed 1 million registered learners',
      'Launched new verticals: Brain Bridge Degrees, Brain Bridge Rekrut, and Brain Bridge Study Abroad',
      'Launched Global MBA with UK & Australian universities',
    ],
    position: 'left',
  },
  {
    year: '2021',
    events: [
      'Attained Unicorn status with a $1.2 billion valuation',
      'Expanded to North America, Europe, Middle East & the Asia Pacific',
      'Diversified offerings to include certifications, Bootcamps, and Study Abroad programs',
      'Completed three mergers and acquisitions',
      'Reached over 2 million registered learners',
    ],
    position: 'right',
  },
];

const awardCards = [
  {
    title: 'Year',
    subtitle: 'Education Award',
    description: 'Best Education Company',
    iconBg: 'bg-orange-100',
    icon: <div className="w-12 h-12 bg-orange-200 rounded"></div>,
  },
  {
    title: 'Burgundy Private Hurun India',
    subtitle: '500',
    description: 'Brain Bridge ranks in Top brands on the 2021 & 2022 Burgundy Private Hurun India 500',
    iconBg: 'bg-gray-800',
    icon: <div className="text-white font-bold text-sm">BRAND</div>,
  },
  {
    title: 'Gold Award',
    subtitle: 'Brandon Hall',
    description: 'Brain Bridge for Business has won TWO GOLD AWARDS at Brandon Hall.',
    iconBg: 'bg-blue-900',
    icon: <div className="text-white font-bold text-xs">BRANDON HALL</div>,
  },
  {
    title: 'Most Promising Brand',
    subtitle: 'The Economic Times',
    description: "Brain Bridge recognised as The Economic Times' Most Promising Brand 2022",
    iconBg: 'bg-yellow-100',
    icon: <div className="text-yellow-800 font-bold text-lg">ET</div>,
  },
  {
    title: 'Innovation Award',
    subtitle: 'Tech Excellence',
    description: 'Recognized for innovative learning solutions',
    iconBg: 'bg-green-100',
    icon: <div className="w-12 h-12 bg-green-200 rounded"></div>,
  },
  {
    title: 'Excellence Award',
    subtitle: 'Industry Recognition',
    description: 'Outstanding contribution to online education',
    iconBg: 'bg-purple-100',
    icon: <div className="w-12 h-12 bg-purple-200 rounded"></div>,
  },
  {
    title: 'Leadership Award',
    subtitle: 'Business Excellence',
    description: 'Leading transformation in higher education',
    iconBg: 'bg-teal-100',
    icon: <div className="w-12 h-12 bg-teal-200 rounded"></div>,
  },
  {
    title: 'Growth Award',
    subtitle: 'Market Leader',
    description: 'Fastest growing EdTech platform',
    iconBg: 'bg-blue-100',
    icon: <div className="w-12 h-12 bg-blue-200 rounded"></div>,
  },
];

const mediaCards = [
  {
    source: 'BW Top Education Award 2023',
    title: 'FINANCIAL TIMES',
    subtitle: 'EdTech of the Year',
    description: 'Brain Bridge wins BW Top Education Award in Best E-Learning Company',
    date: 'Jul 11, 2023',
  },
  {
    source: 'Hurun India',
    title: 'Business Standard',
    subtitle: 'Burgundy Private Hurun India 500',
    description: 'Brain Bridge crosses 10 million enrolments across 100+ nations!',
    date: 'May 17, 2023',
  },
  {
    source: 'Brandon Hall',
    title: 'Business Standard',
    subtitle: 'Gold Award',
    description: "Brain Bridge leads the pack in EdTech Management Courses: Co-founder talks about millennials' drive to stand out!",
    date: 'June 30, 2023',
  },
  {
    source: 'The Economic Times',
    title: 'THE ECONOMIC TIMES',
    subtitle: 'Most Promising Brand',
    description: "Brain Bridge recognised as The Economic Times' Most Promising Brand 2022",
    date: 'Dec 15, 2022',
  },
  {
    source: 'Tech Innovation',
    title: 'TECH CRUNCH',
    subtitle: 'EdTech Innovation Leader',
    description: 'Brain Bridge’s innovative approach to online education transforms learning experience',
    date: 'Aug 22, 2023',
  },
  {
    source: 'Business Excellence',
    title: 'FORBES',
    subtitle: 'Unicorn Success Story',
    description: 'How Brain Bridge became India’s leading EdTech unicorn with global expansion',
    date: 'Sep 10, 2023',
  },
];

// Reusable Components
const FounderCard = ({ name, title, description, image, imageHeight }) => (
  <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
    <img src={image} alt={name} className={`w-full ${imageHeight} object-cover`} />
    <div className="p-4 sm:p-6">
      <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 leading-relaxed">{description}</p>
      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">{name}</h3>
      <p className="text-gray-600 text-xs sm:text-sm">{title}</p>
    </div>
  </div>
);

const EdgeCard = ({ id, title, subtitle, description, icon, onClick, hoveredCard, setHoveredCard }) => (
  <div
    className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 ${
      hoveredCard === id ? 'shadow-xl scale-105' : ''
    }`}
    onMouseEnter={() => setHoveredCard(id)}
    onMouseLeave={() => setHoveredCard(null)}
    onClick={onClick}
  >
    <div className="flex items-start justify-between mb-6">
      <div>
        <h3 className="text-3xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-lg font-semibold text-gray-800 mb-2">{subtitle}</p>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
      {icon}
    </div>
  </div>
);

const DriveCard = ({ title, description, icon }) => (
  <div className="bg-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow">
    <div className="w-full h-48 bg-gray-200 flex items-center justify-center relative">{icon}</div>
    <div className="p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  </div>
);

const TimelineItem = ({ year, events, position, index }) => (
  <div className="relative flex items-center">
    {position === 'left' && <div className="hidden md:block w-1/2 pr-8"></div>}
    <div className="w-full md:w-1/2 pl-16 md:pl-0 md:pr-8" style={position === 'right' ? { marginLeft: 'auto' } : {}}>
      <div className="bg-white rounded-lg p-4 md:p-6 shadow-lg">
        <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 md:mb-4">{year}</h3>
        <div className="space-y-2 md:space-y-3">
          {events.map((event, i) => (
            <div key={i} className="flex items-start gap-2 md:gap-3">
              <div className="w-3 h-3 md:w-4 md:h-4 border-2 border-gray-400 rounded-full mt-1 flex-shrink-0"></div>
              <p className="text-gray-600 text-xs md:text-sm" dangerouslySetInnerHTML={{ __html: event }}></p>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-6 h-6 md:w-8 md:h-8 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-xs md:text-sm z-20">
      {index + 1}
    </div>
    {position === 'right' && <div className="hidden md:block w-1/2 pl-8"></div>}
  </div>
);

const AwardCard = ({ title, subtitle, description, iconBg, icon }) => (
  <div className="flex-shrink-0 w-80 bg-white rounded-lg shadow-lg p-6 border">
    <div className="text-center">
      <div className={`w-20 h-20 ${iconBg} rounded-lg mx-auto mb-4 flex items-center justify-center`}>{icon}</div>
      <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-2">{subtitle}</p>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  </div>
);

const MediaCard = ({ source, title, subtitle, description, date }) => (
  <div className="w-full md:w-1/2 bg-white rounded-lg shadow-lg p-4 md:p-6 border">
    <div className="mb-4">
      <div className="text-teal-500 text-xs font-semibold mb-2">{source}</div>
      <div className="text-xl md:text-2xl font-bold text-gray-800 mb-2">{title}</div>
    </div>
    <h3 className="text-base md:text-lg font-bold text-gray-800 mb-3">{subtitle}</h3>
    <p className="text-sm text-gray-600 mb-4">{description}</p>
    <div className="text-xs text-gray-500">{date}</div>
  </div>
);

const AboutBrainBridge = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [currentMediaSlide, setCurrentMediaSlide] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 2000);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextMediaSlide = () => {
    setCurrentMediaSlide((prev) => (prev + 1) % 3);
  };

  const prevMediaSlide = () => {
    setCurrentMediaSlide((prev) => (prev - 1 + 3) % 3);
  };

  return (
    <div className="font-sans antialiased">
      {/* Hero Section */}
      <section className="bg-white pb-8 sm:pb-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <div className="max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 sm:mb-6 text-gray-800">
                We are <span className="text-teal-600">South Asia's Premier Higher EdTech</span> Platform.
              </h1>
              <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-gray-600 mb-6 sm:mb-8 font-normal">
                Empowering over 10 million learners globally, Brain Bridge leverages advanced
                technology, world-class faculty, and industry partnerships to bring impactful
                online learning. Our mission? To redefine professional growth by making
                quality education accessible to everyone.
              </p>
              <Link
                to="/about/contact"
                className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-600/30"
              >
                Talk to a career expert
              </Link>
            </div>
            <div className="flex justify-center items-center mt-8 lg:mt-0">
              <img
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Graduates celebrating with caps in the air"
                className="w-full max-w-sm sm:max-w-md lg:max-w-lg h-64 sm:h-80 lg:h-96 object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Meet our founders Section */}
      <section className="bg-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-8 sm:mb-12 text-center lg:text-left">
            Meet our <span className="text-teal-600">founders</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {founders.map((founder, index) => (
              <FounderCard key={index} {...founder} />
            ))}
          </div>
        </div>
      </section>

      {/* What gives us an edge Section */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-12 lg:gap-16">
            <div className="lg:col-span-2 lg:sticky lg:top-20 lg:self-start text-center lg:text-left">
              <p className="text-xs sm:text-sm font-semibold text-gray-600 mb-3 sm:mb-4 tracking-wide uppercase">
                LEARNER SUPPORT & SUCCESS
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">
                What gives us
              </h2>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-teal-600 mb-6 sm:mb-8">
                an edge?
              </h2>
              <button
                onClick={() => alert("Welcome! Let's get started with your learning journey!")}
                className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-teal-600/30 flex items-center gap-2 cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Get started with Brain Bridge
              </button>
            </div>
            <div className="lg:col-span-3 space-y-6 sm:space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {edgeCards.slice(0, 2).map((card) => (
                  <EdgeCard key={card.id} {...card} hoveredCard={hoveredCard} setHoveredCard={setHoveredCard} />
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {edgeCards.slice(2, 4).map((card) => (
                  <EdgeCard key={card.id} {...card} hoveredCard={hoveredCard} setHoveredCard={setHoveredCard} />
                ))}
              </div>
              <div className="w-full">
                <EdgeCard {...edgeCards[4]} hoveredCard={hoveredCard} setHoveredCard={setHoveredCard} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Top Button */}
      {showBackToTop && (
        <div className="fixed left-8 bottom-8 z-50">
          <button
            onClick={scrollToTop}
            className="w-12 h-12 bg-white border-2 border-teal-600 rounded-full flex items-center justify-center hover:bg-teal-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      )}

      {/* What drives us Section */}
      <section className="bg-white py-20 relative">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              What <span className="text-teal-600">drives</span> us?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {driveCards.map((card, index) => (
              <DriveCard key={index} {...card} />
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              A quick look at our <span className="text-teal-500">journey</span>
            </h2>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 pointer-events-none" style={{ zIndex: 0, top: 0, width: '400px', height: '100%' }}>
              <svg width="400" height="3000" style={{ overflow: 'visible' }}>
                <path
                  d="M 200 120 Q 320 220 200 380 Q 80 540 200 700 Q 320 860 200 1020 Q 80 1180 200 1340"
                  stroke="#d1d5db"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="8,4"
                />
              </svg>
            </div>
            <div className="md:hidden absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300 pointer-events-none" style={{ zIndex: 0 }}></div>
            <div className="space-y-8 md:space-y-16">
              {timelineItems.map((item, index) => (
                <TimelineItem key={index} {...item} index={index} />
              ))}
            </div>
            <div className="text-center mt-8 md:mt-16">
              <Link
                to="/"
                className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 md:py-4 md:px-8 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg text-sm md:text-base"
              >
                Begin your journey with us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Awards & Accomplishments Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Awards & <span className="text-teal-500">Accomplishments</span>
            </h2>
          </div>
          <div className="relative overflow-hidden">
            <div className="flex animate-slide-infinite space-x-8" style={{ width: 'calc(400px * 16)' }}>
              {[...awardCards, ...awardCards].map((card, index) => (
                <AwardCard key={index} {...card} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our presence in the media Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Our presence in the <span className="text-teal-500">media</span>
            </h2>
          </div>
          <div className="relative">
            <button
              onClick={prevMediaSlide}
              className="hidden md:flex absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg items-center justify-center hover:shadow-xl transition-shadow hover:bg-gray-50"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextMediaSlide}
              className="hidden md:flex absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg items-center justify-center hover:shadow-xl transition-shadow hover:bg-gray-50"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <div className="flex md:hidden justify-center mb-6 space-x-2">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  onClick={() => setCurrentMediaSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentMediaSlide === index ? 'bg-teal-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            <div className="overflow-hidden mx-0 md:mx-12">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentMediaSlide * 100}%)` }}
              >
                {[0, 1, 2].map((slideIndex) => (
                  <div key={slideIndex} className="flex-shrink-0 w-full flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
                    {mediaCards.slice(slideIndex * 2, slideIndex * 2 + 2).map((card, index) => (
                      <MediaCard key={index} {...card} />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get in touch Section */}
      <section className="bg-teal-50 py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex justify-center lg:justify-start">
              <div className="relative w-80 h-80">
                <div className="absolute top-10 left-10 w-32 h-24 bg-gray-300 rounded-lg transform rotate-12 opacity-90"></div>
                <div className="absolute top-16 left-16 w-28 h-20 bg-gray-200 rounded-lg transform rotate-12"></div>
                <div className="absolute top-8 right-12 w-12 h-12 border-4 border-pink-400 rounded-full">
                  <div className="absolute inset-2 border-2 border-pink-400 rounded-full"></div>
                  <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-pink-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                  <div className="absolute -top-1 left-1/2 w-2 h-2 bg-pink-400 transform -translate-x-1/2"></div>
                  <div className="absolute -bottom-1 left-1/2 w-2 h-2 bg-pink-400 transform -translate-x-1/2"></div>
                  <div className="absolute top-1/2 -left-1 w-2 h-2 bg-pink-400 transform -translate-y-1/2"></div>
                  <div className="absolute top-1/2 -right-1 w-2 h-2 bg-pink-400 transform -translate-y-1/2"></div>
                </div>
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-b from-pink-300 to-pink-400 rounded-full mx-auto mb-2">
                      <div className="absolute -top-2 left-2 w-12 h-8 bg-gray-600 rounded-t-full"></div>
                      <div className="absolute top-4 left-4 w-2 h-2 bg-white rounded-full"></div>
                      <div className="absolute top-4 right-4 w-2 h-2 bg-white rounded-full"></div>
                      <div className="absolute bottom-4 left-1/2 w-4 h-2 bg-gray-400 rounded-full transform -translate-x-1/2"></div>
                    </div>
                    <div className="w-20 h-24 bg-gradient-to-b from-gray-400 to-gray-500 rounded-t-3xl mx-auto">
                      <div className="absolute top-16 -left-3 w-6 h-16 bg-gray-400 rounded-full transform rotate-12"></div>
                      <div className="absolute top-16 -right-3 w-6 h-16 bg-gray-400 rounded-full transform -rotate-12"></div>
                      <div className="absolute top-28 -left-1 w-4 h-4 bg-pink-300 rounded-full"></div>
                      <div className="absolute top-28 -right-1 w-4 h-4 bg-pink-300 rounded-full"></div>
                    </div>
                    <div className="flex justify-center space-x-2 mt-1">
                      <div className="w-4 h-12 bg-teal-800 rounded-full"></div>
                      <div className="w-4 h-12 bg-teal-800 rounded-full"></div>
                    </div>
                    <div className="flex justify-center space-x-4 mt-1">
                      <div className="w-6 h-3 bg-gray-800 rounded-full"></div>
                      <div className="w-6 h-3 bg-gray-800 rounded-full"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 left-4 w-8 h-8 bg-purple-400 rounded-lg transform rotate-45 opacity-80"></div>
                <div className="absolute bottom-4 right-8 w-6 h-6 bg-yellow-400 rounded-full opacity-90"></div>
                <div className="absolute top-1/2 left-2 w-4 h-4 bg-green-400 rounded-full opacity-70"></div>
              </div>
            </div>
            <div className="text-gray-800">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">Get in touch.</h2>
              <p className="text-lg lg:text-xl leading-relaxed mb-8 text-gray-600">
                Our advisors are available around the clock to answer questions and support your educational journey. Connect with us today to explore how Brain Bridge can help you meet your career goals.
              </p>
              <Link
                to="/about/contact"
                className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-600/30"
              >
                Talk to a counsellor
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutBrainBridge;
