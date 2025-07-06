import React from "react";
import {
  FaStar,
  FaAward,
  FaRocket,
  FaLightbulb,
  FaChartLine,
  FaShieldAlt,
  FaCog,
  FaGraduationCap,
} from "react-icons/fa";
import FAQ from "../../components/FAQ";

import accentureLogo from "../../assets/Logo/accenture.png";
import amazonLogo from "../../assets/Logo/Amazon.png";
import deloitteLogo from "../../assets/Logo/Deloitte.png";
import eyLogo from "../../assets/Logo/EY.png";
import googleLogo from "../../assets/Logo/Google.png";
import hclLogo from "../../assets/Logo/Hcl.png";
import ibmLogo from "../../assets/Logo/IBM.png";
import infosysLogo from "../../assets/Logo/infosys.png";
import kpmgLogo from "../../assets/Logo/KPMG.png";
import microsoftLogo from "../../assets/Logo/Microsoft.png";
import pwcLogo from "../../assets/Logo/Pwc.png";
import wiproLogo from "../../assets/Logo/Wipro.png";

// Static Counter
const AnimatedCounter = ({ end, suffix = "" }) => (
  <div className="text-3xl md:text-4xl font-bold text-teal-600 mb-2">
    {end.toLocaleString()}
    {suffix}
  </div>
);

const CorporateTraining = () => {
  const heroStats = [
    { number: 470000, label: "Global Learners", suffix: "+" },
    { number: 7000, label: "Live Classes Every Month", suffix: "+" },
    { number: 60, label: "Accreditations", suffix: "+" },
    { number: 4, label: "Countries", suffix: "+" },
  ];

  const clientLogos = [
    { name: "Infosys", logo: infosysLogo },
    { name: "Wipro", logo: wiproLogo },
    { name: "Accenture", logo: accentureLogo },
    { name: "IBM", logo: ibmLogo },
    { name: "Microsoft", logo: microsoftLogo },
    { name: "Amazon", logo: amazonLogo },
    { name: "Google", logo: googleLogo },
    { name: "Deloitte", logo: deloitteLogo },
    { name: "KPMG", logo: kpmgLogo },
    { name: "EY", logo: eyLogo },
    { name: "PwC", logo: pwcLogo },
    { name: "HCL", logo: hclLogo },
  ];

  const services = [
    {
      title: "Training Solutions",
      description:
        "Our training solutions are designed to meet the unique needs of your organization. We offer customized programs that align with your business objectives and enhance employee skills across various domains.",
      icon: FaRocket,
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      stats: [
        "7000+ Classes per day",
        "4.6/5 Average rating through reviews",
        "9+ Awards won",
      ],
      gradient: "from-teal-500 to-teal-700",
    },
    {
      title: "E-learning Solutions",
      description:
        "Our e-learning solutions offer flexible, interactive learning experiences that can be accessed anytime, anywhere. Perfect for organizations looking to scale their training programs efficiently.",
      icon: FaLightbulb,
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2342&q=80",
      stats: [
        "1800+ Hours of content",
        "95% Repeat business",
        "900+ Corporate clientele across industries",
      ],
      gradient: "from-teal-600 to-teal-800",
    },
    {
      title: "Game-Based Learning",
      description:
        "Our game-based learning solutions combine fun and education to create engaging training experiences. This innovative approach significantly improves knowledge retention and learner engagement.",
      icon: FaChartLine,
      image:
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2126&q=80",
      stats: [
        "30% reduction in attrition rates",
        "3x knowledge retention",
        "2x faster completion rates",
      ],
      gradient: "from-teal-700 to-teal-900",
    },
  ];

  const features = [
    {
      icon: FaShieldAlt,
      title: "Secure Learning",
      description: "Enterprise-grade security for all training materials",
    },
    {
      icon: FaCog,
      title: "Customizable",
      description: "Tailored programs to fit your organization's needs",
    },
    {
      icon: FaGraduationCap,
      title: "Certified Trainers",
      description: "Industry experts with proven track records",
    },
    {
      icon: FaChartLine,
      title: "Analytics",
      description: "Detailed performance tracking and reporting",
    },
  ];

  const awards = [
    { year: "2023", title: "Best Corporate Training Provider", icon: FaAward },
    { year: "2022", title: "Excellence in E-Learning", icon: FaStar },
    { year: "2021", title: "Innovation in Training", icon: FaRocket },
    { year: "2020", title: "Top Learning Platform", icon: FaGraduationCap },
  ];

  const reviewPlatforms = [
    { platform: "Forbes", rating: "4.8", reviews: "2.5k" },
    { platform: "CourseReport", rating: "4.6", reviews: "1.8k" },
    { platform: "UrbanPro", rating: "5.0", reviews: "3.2k" },
    { platform: "Google", rating: "5.0", reviews: "4.1k" },
  ];

  const faqData = [
    {
      question: "How are your training programs customized?",
      answer:
        "We begin with a thorough needs assessment to understand your organization's specific requirements, challenges, and goals. Based on this assessment, we design a tailored curriculum that addresses your unique needs, incorporating relevant case studies and practical exercises.",
    },
    {
      question: "What delivery formats are available?",
      answer:
        "We offer flexible delivery options including in-person training at your location, virtual instructor-led training, hybrid formats, and self-paced online learning. We can recommend the most effective format based on your team's needs and preferences.",
    },
    {
      question: "How many employees can participate in a training program?",
      answer:
        "Our programs can accommodate groups of various sizes, from small teams to entire departments. For optimal engagement and learning outcomes, we typically recommend 15-25 participants per session for interactive workshops, though this can be adjusted based on the training format and content.",
    },
    {
      question: "How do you measure training effectiveness?",
      answer:
        "We employ a comprehensive evaluation framework that includes pre and post-training assessments, participant feedback, knowledge retention checks, and follow-up evaluations to measure behavioral change and business impact. We provide detailed reports with actionable insights.",
    },
    {
      question: "What industries do you serve?",
      answer:
        "We provide corporate training across diverse industries including technology, finance, healthcare, manufacturing, retail, education, and government. Our instructors have industry-specific expertise to ensure relevant and applicable training content.",
    },
  ];

  return (
    <div className="min-h-screen font-['Poppins'] bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-white pt-8 pb-16 lg:pt-12 lg:pb-24 overflow-hidden min-h-[80vh] flex items-center">
        <div className="container mx-auto px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
            <div className="flex-1 lg:max-w-xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-800">
                Corporate Training
              </h1>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-6 text-teal-600">
                Reshaping The Future of Training!
              </h2>
              <p className="text-base md:text-lg lg:text-xl mb-8 leading-relaxed text-gray-600 max-w-lg">
                Invest in upskilling your workforce. Our tailored training
                programs are designed to drive measurable business outcomes and
                enhance organizational performance across all levels.
              </p>
              <button className="bg-teal-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-teal-700 transition duration-300 transform hover:scale-105 shadow-lg mb-8">
                Discover Our Solutions
              </button>
            </div>
            <div className="flex-1 lg:max-w-xl">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&"
                  alt="Corporate Training"
                  className="w-full h-80 lg:h-96 object-cover rounded-lg shadow-xl transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute -bottom-6 -left-6 bg-white rounded-lg p-4 shadow-xl border">
                  <div className="text-2xl font-bold text-teal-600">
                    <AnimatedCounter end={470000} suffix="+" />
                  </div>
                  <div className="text-sm font-medium text-gray-600">
                    Global Learners
                  </div>
                </div>
                <div className="absolute -top-6 -right-6 bg-white rounded-lg p-4 shadow-xl border">
                  <div className="text-2xl font-bold text-teal-600">
                    <AnimatedCounter end={60} suffix="+" />
                  </div>
                  <div className="text-sm font-medium text-gray-600">
                    Accreditations
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {heroStats.map((stat, index) => (
              <div
                key={index}
                className="text-center bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className="text-3xl md:text-4xl font-bold text-teal-600 mb-2">
                  <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                </div>
                <div className="text-sm md:text-base font-medium text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnerships Section */}
      <section className="py-16 relative">
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="container mx-auto px-8 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Explore a realm of opportunities with our partnerships
          </h2>
          <div className="overflow-hidden w-full">
            <div
              className="whitespace-nowrap flex items-center partnership-carousel"
              style={{
                animation: "scroll-logos 30s linear infinite",
              }}
            >
              {[...clientLogos, ...clientLogos].map((client, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 bg-white rounded-lg shadow-md mx-6 p-6 min-w-[180px] flex items-center justify-center hover:shadow-lg transition-transform duration-300 hover:scale-110"
                >
                  <img
                    src={client.logo}
                    alt={`${client.name} logo`}
                    className="h-12 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>
          {`
            @keyframes scroll-logos {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }
            .partnership-carousel::-webkit-scrollbar {
              display: none;
            }
            .partnership-carousel {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}
        </style>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Why Choose Our Platform?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-lg hover:shadow-xl transition-all duration-300 group hover:scale-105"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 text-white rounded-full mb-4 group-hover:from-teal-600 group-hover:to-teal-700 transition-all duration-300">
                  <feature.icon className="text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800">
            Get Powerful Outcome-driven Learning Solutions
          </h2>
          {services.map((service, index) => (
            <div
              key={index}
              className={`flex flex-col lg:flex-row items-center gap-12 mb-20 ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center mb-6">
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${service.gradient} text-white rounded-full mr-4`}
                  >
                    <service.icon className="text-xl" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-800">
                    {service.title}
                  </h3>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  {service.description}
                </p>
                <button className="bg-teal-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-teal-700 transition duration-300 transform hover:scale-105 shadow-lg">
                  Learn More
                </button>
              </div>
              <div className="flex-1 relative">
                <div className="relative rounded-lg overflow-hidden shadow-xl group">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                    {service.stats.map((stat, statIndex) => (
                      <div key={statIndex} className="flex items-center mb-2 last:mb-0">
                        <FaStar className="text-teal-600 mr-2" />
                        <span className="text-sm font-medium text-gray-700">
                          {stat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Awards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-6">
                {awards.map((award, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-teal-500 to-teal-600 text-white rounded-lg p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <div>
                      <award.icon className="text-white text-4xl mx-auto mb-4" />
                    </div>
                    <div className="text-2xl font-bold mb-2">{award.year}</div>
                    <div className="text-sm font-medium">{award.title}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-white">
                Reshaping The Future of Training!
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                We take pride in the numerous awards and recognitions we have received over the years. These accolades reflect our commitment to excellence in corporate training and our dedication to helping organizations achieve their learning objectives.
              </p>
              <button className="bg-teal-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-teal-700 transition duration-300 transform hover:scale-105 shadow-lg">
                View All Awards
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions about our corporate training programs."
        faqs={faqData}
      />

      {/* Contact Form */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
              Ready to Transform Your Workforce?
            </h2>
            <div className="bg-white rounded-xl p-8 shadow-xl">
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    label: "Company Name",
                    type: "text",
                    placeholder: "Your company name",
                  },
                  {
                    label: "Email",
                    type: "email",
                    placeholder: "your.email@company.com",
                  },
                  {
                    label: "Phone",
                    type: "tel",
                    placeholder: "+91 9876543210",
                  },
                  {
                    label: "Training Type",
                    type: "select",
                    options: [
                      "Leadership Development",
                      "Technical Training",
                      "Soft Skills Training",
                      "Digital Transformation",
                    ],
                  },
                ].map((field, index) => (
                  <div key={index}>
                    <label className="block text-gray-700 font-medium mb-2">
                      {field.label}
                    </label>
                    {field.type === "select" ? (
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all duration-300">
                        <option>Select Training Type</option>
                        {field.options.map((option, i) => (
                          <option key={i}>{option}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all duration-300 hover:border-teal-400"
                      />
                    )}
                  </div>
                ))}
                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-medium mb-2">
                    Type your query...
                  </label>
                  <textarea
                    rows="4"
                    placeholder="Tell us about your specific training needs and objectives..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all duration-300 hover:border-teal-400"
                  ></textarea>
                </div>
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white py-4 rounded-lg font-semibold text-lg hover:from-teal-700 hover:to-teal-800 transition duration-300 shadow-lg hover:scale-105"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Trusted by Industry Leaders
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {reviewPlatforms.map((review, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="text-2xl font-bold text-teal-700 mb-2">
                  {review.platform}
                </div>
                <div className="flex justify-center items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar className="text-teal-500 text-sm" key={i} />
                  ))}
                </div>
                <div className="text-lg font-semibold text-gray-700">
                  {review.rating}
                </div>
                <div className="text-sm text-gray-500">
                  {review.reviews} reviews
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CorporateTraining;