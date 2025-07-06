import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaQuestionCircle } from "react-icons/fa";

const FAQ = ({ title, subtitle, faqs }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-teal-500 to-teal-600 text-white rounded-full mb-4 sm:mb-6">
            <FaQuestionCircle className="text-lg sm:text-2xl" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">
            {title}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
            {subtitle}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-3 sm:mb-4">
              <div className="bg-white rounded-sm shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
                <button
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 border border-gray-100 text-left"
                  onClick={() => toggleFAQ(index)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 pr-3 sm:pr-4 leading-relaxed">
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-teal-100 rounded-full flex items-center justify-center">
                      {openIndex === index ? (
                        <FaChevronUp className="text-teal-600 text-xs sm:text-sm" />
                      ) : (
                        <FaChevronDown className="text-teal-600 text-xs sm:text-sm" />
                      )}
                    </div>
                  </div>
                </button>

                {openIndex === index && (
                  <div className="overflow-hidden">
                    <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-2">
                      <div className="border-l-4 border-teal-500 pl-3 sm:pl-4">
                        <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-lg">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
};

export default FAQ;
