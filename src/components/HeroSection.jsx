import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const HeroSection = () => {
  const skillTags = [
    'Artificial Intelligence',
    'Web Development',
    'Data Science',
    'Machine Learning',
    'Cybersecurity',
    'Financial Management',
    'Cloud Computing',
    'DevOps',
    'Game Development',
    'Graphic Design',
    'SEO',


  ];

  const stats = [
    { number: '460,000+', label: 'Trained' },
    { number: '6,700+', label: 'Reviews with 4.5/5 rating' },
    { number: '7,000+', label: 'Live Classes Every Month' },
    { number: '900+', label: 'Corporate Partners' },
    { number: '210+', label: 'College Partners' },
    { number: '87%', label: 'Reported Career Benefits' }
  ];

  return (
    <section className="bg-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">

          
          <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
            
            <div className="space-y-2 sm:space-y-3 text-center lg:text-left">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Master tomorrow's skills today.
              </h1>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                Excel with India's top upskilling platform.
              </p>
            </div>


            {/* Goal Selection */}
            <div className="space-y-2 sm:space-y-3">
              <p className="text-teal-600 font-medium text-sm text-center lg:text-left">Or select your goal 📌 </p>
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {skillTags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 sm:px-2.5 py-1 sm:py-1.5 text-gray-800 rounded text-xs bg-teal-50 hover:text-teal-700 cursor-pointer transition-colors duration-300 border border-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          
          <div className="relative flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative w-full max-w-sm lg:max-w-none">
          
              <div className="absolute inset-0 border-2 border-dashed border-gray-300 rounded-lg transform translate-x-2 translate-y-2 sm:translate-x-3 sm:translate-y-3"></div>

              {/* Main content container */}
              <div className="relative bg-white rounded-lg p-4 sm:p-6 border border-gray-200 shadow-lg">
                <div className="text-center">
                  {/* <h2 className="text-lg font-bold text-teal-600 mb-3">BRAIN BRIDGE</h2> */}

              
                  <div className="mb-2 sm:mb-3">
                    <img
                      src="https://images.pexels.com/photos/7034789/pexels-photo-7034789.jpeg"
                      alt="Professional instructor"
                      className="w-40 h-40 sm:w-48 sm:h-48 lg:w-50 lg:h-50 object-cover rounded-lg mx-auto"
                    />
                  </div>

                  
                  <p className="text-xs sm:text-sm text-gray-600 italic leading-relaxed">
                    "The flexibility of online learning helped me finish my degree"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="mt-8 sm:mt-12 lg:mt-16">
          <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 shadow-sm">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-8 sm:mt-10 text-center">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
            7000+ Reviews with 4.6/5 Avg Rating
          </h3>

          {/* Review cards placeholder */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-gray-100 rounded-lg h-20 sm:h-24 flex items-center justify-center">
                <div className="text-gray-400 text-xs sm:text-sm">Review Card {item}</div>
              </div>
            ))}
          </div>

          
          <Link to = "/about/team" className="bg-teal-600 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg hover:bg-teal-700 transition-colors duration-300 text-sm">
            Our Affiliations →
          </Link>
        </div>

        
      </div>
    </section>
  )
}

export default HeroSection
