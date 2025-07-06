import React from 'react';

const AboutTemplate = ({
  title,
  subtitle,
  content,
  image,
  additionalContent = null
}) => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>
        
        {/* Main Content */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="md:flex">
            {/* Image */}
            {image && (
              <div className="md:flex-shrink-0 md:w-1/3">
                <img 
                  className="h-full w-full object-cover md:h-full" 
                  src={image} 
                  alt={title} 
                />
              </div>
            )}
            
            {/* Text Content */}
            <div className={`p-8 ${image ? 'md:w-2/3' : 'w-full'}`}>
              <div className="prose prose-teal max-w-none">
                {content}
              </div>
            </div>
          </div>
        </div>
        
        {/* Additional Content */}
        {additionalContent && (
          <div className="mt-12">
            {additionalContent}
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutTemplate;