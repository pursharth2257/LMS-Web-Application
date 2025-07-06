import React, { useState, useRef } from 'react';
import { FaPhone, FaArrowRight } from 'react-icons/fa';

// Add CSS for hiding scrollbar
const scrollbarHideStyles = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

const WhyChooseUs = () => {
  const [email, setEmail] = useState('');
  const scrollContainerRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  const features = [
    {
      id: 1,
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="12" rx="1" />
          <path d="M7 8h6M7 12h8" />
          <circle cx="19" cy="19" r="2" />
          <path d="M19 17v-2" />
        </svg>
      ),
      title: "Certified & Experienced Instructors",
      description: "Learn from industry experts with proven track records and professional certifications."
    },
    {
      id: 2,
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      ),
      title: "Gold Membership",
      description: "Enjoy exclusive benefits with our premium membership including post-training followups."
    },
    {
      id: 3,
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      ),
      title: "Tailor Made Training",
      description: "Customized learning paths designed to meet your specific educational goals and needs."
    },
    {
      id: 4,
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      title: "Flexible Schedule",
      description: "Learn at your own pace with flexible timing options that fit your busy lifestyle."
    },
    {
      id: 5,
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          <path d="M5 3l14 14" />
        </svg>
      ),
      title: "Access to Recorded Sessions",
      description: "Review and revisit course material anytime with unlimited access to recorded classes."
    },
    {
      id: 6,
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
          <path d="M12 6l4 4-4 4" />
        </svg>
      ),
      title: "10 in 1 Program",
      description: "Get comprehensive training with our integrated program covering multiple essential skills."
    },
    {
      id: 7,
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
          <circle cx="12" cy="17" r="3" />
        </svg>
      ),
      title: "Masterclasses By Henry Harvin®",
      description: "Exclusive masterclasses conducted by industry leaders and renowned experts."
    },
    {
      id: 8,
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
        </svg>
      ),
      title: "One-to-One Training",
      description: "Personalized attention with dedicated one-on-one sessions tailored to your learning pace."
    }
  ];

  return (
    <section className="py-16 ">
      <style dangerouslySetInnerHTML={{ __html: scrollbarHideStyles }} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
          <div className="order-2 lg:order-1">
            {/* Header */}
            <div className="mb-6">
              <div className="inline-flex items-center px-6 py-2 bg-teal-600 text-white rounded-full text-sm font-medium mb-4">
                Why Choose Us
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                Transform education your Life,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-400">
                  Change the World
                </span>
              </h2>
            </div>
            
            {/* Vertical Scrollable Container */}
            <div className="relative h-[500px]">
              {/* Scroll Indicators */}
              <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none"></div>
              
              {/* Scrollable Container */}
              <div 
                ref={scrollContainerRef}
                className="h-full overflow-y-auto pr-4 scrollbar-hide space-y-4 snap-y snap-mandatory"
                style={{ 
                  scrollbarWidth: 'none', 
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch',
                  paddingRight: '10px'
                }}
              >
                {features.map((feature) => (
                  <div
                    key={feature.id}
                    className="group p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-teal-200 snap-start"
                  >
                    {/* Icon with Number */}
                    <div className="relative mb-4 w-fit">
                      
                      <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 group-hover:border-teal-300 flex items-center justify-center transition-all duration-300">
                        
                        <div className="w-12 h-12 bg-white group-hover:bg-teal-600 rounded-full flex items-center justify-center text-gray-600 group-hover:text-white shadow-sm border border-gray-100 group-hover:border-teal-600 transition-all duration-300">
                          {feature.icon}
                        </div>
                      </div>
                      
                      <div className="absolute -top-1 -left-1 w-6 h-6 bg-teal-600 group-hover:bg-teal-700 text-white rounded-full flex items-center justify-center text-xs font-semibold shadow-sm transition-all duration-300">
                        {feature.id}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-1">
                      <h3 className="text-base font-semibold text-gray-900 group-hover:text-teal-600 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-xs leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Column - Image */}
          <div className="relative order-1 lg:order-2">
            <div className="relative rounded-2xl overflow-hidden shadow-xl h-full">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
                alt="Student learning online"
                className="w-full h-[500px] object-cover"
              />
            
            {/* Floating Call Card */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-white/20">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                    <FaPhone className="w-4 h-4 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Call</p>
                    <p className="font-semibold text-gray-900 text-sm">+990214 57 89 54</p>
                  </div>
                </div>
              </div>
            </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-teal-400 to-teal-300 rounded-full opacity-20 blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-teal-400 to-teal-500 rounded-full opacity-20 blur-xl"></div>
              
              {/* Zigzag Pattern */}
              <div className="absolute -bottom-4 -right-4 opacity-30">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 10L20 20L30 10L40 20L50 10" stroke="#0D9488" strokeWidth="2" fill="none"/>
                  <path d="M10 20L20 30L30 20L40 30L50 20" stroke="#0D9488" strokeWidth="2" fill="none"/>
                  <path d="M10 30L20 40L30 30L40 40L50 30" stroke="#0D9488" strokeWidth="2" fill="none"/>
                  <path d="M10 40L20 50L30 40L40 50L50 40" stroke="#0D9488" strokeWidth="2" fill="none"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

     
      </div>
    </section>
  );
};

export default WhyChooseUs;
