import {
  FaHeadset,
  FaEnvelope,
  FaPhone,
  FaChevronRight,
  FaPaperPlane,
} from "react-icons/fa";
import FAQ from "../../components/FAQ";

// FAQ Data
const faqs = [
  {
    question: "How do I reset my password?",
    answer: "Click on 'Forgot Password' on the login page. You'll receive an email with instructions to reset your password. Make sure to check your spam folder if you don't see the email.",
  },
  {
    question: "Where can I find my course materials?",
    answer: "All course materials are available in the 'Resources' section of each course. Some materials may be locked until you complete previous lessons.",
  },
  {
    question: "How do I download my certificate?",
    answer: "After completing all course requirements, go to 'My Certificates' in your dashboard. Click 'Download' next to the certificate you want.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and bank transfers. Some regions may have additional payment options available.",
  },
  {
    question: "Can I get a refund for my course?",
    answer: "We offer a 30-day money-back guarantee for most courses. Contact our billing department within 30 days of purchase for refund requests.",
  },
  {
    question: "How do I contact my instructor?",
    answer: "Each course has a 'Messages' section where you can directly contact your instructor. Most instructors respond within 48 hours.",
  },
  {
    question: "Why can't I access my purchased course?",
    answer: "First, try logging out and back in. If that doesn't work, check your internet connection. If issues persist, contact our technical support team.",
  },
  {
    question: "How do I update my account information?",
    answer: "Go to 'Account Settings' in your profile. You can update your personal information, email, and password from there.",
  },
  {
    question: "Are there mobile apps available?",
    answer: "Yes! We have iOS and Android apps available in their respective app stores. Search for 'BrainBridge Learning'.",
  },
  {
    question: "How do I cancel my subscription?",
    answer: "Go to 'Billing' in your account settings and click 'Cancel Subscription'. Your access will continue until the end of your current billing period.",
  },
];

const StudentTemplate = ({ title, subtitle, children }) => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white font-sans text-gray-900">
    <header className="bg-gradient-to-r from-teal-500 to-teal-700 text-white py-12 px-6 shadow-lg">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-2">{title}</h1>
        <p className="text-xl font-light">{subtitle}</p>
      </div>
    </header>
    <main className="max-w-6xl mx-auto py-10 px-6 space-y-12">{children}</main>
  </div>
);

const CustomerSupport = () => {

  return (
    <StudentTemplate
      title="Student Support"
      subtitle="We're here to help you with any questions or issues"
    >
      {/* Quick Help Section */}
      <section className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-lg">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Quick Help</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[
            {
              icon: <FaHeadset className="text-teal-600 w-5 h-5 sm:w-6 sm:h-6" />,
              title: "Live Chat",
              text: "Instant help from our team",
              action: "Start Chat",
            },
            {
              icon: <FaEnvelope className="text-teal-600 w-5 h-5 sm:w-6 sm:h-6" />,
              title: "Email Us",
              text: "Response within 24 hours",
              action: "Send Email",
              href: "mailto:support@brainbridge.com",
            },
            {
              icon: <FaPhone className="text-teal-600 w-5 h-5 sm:w-6 sm:h-6" />,
              title: "Call Us",
              text: "Mon-Fri, 9am-5pm",
              action: "+91 8012345678",
              href: "tel:+918012345678",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-4 sm:p-6 rounded-xl border-l-4 border-teal-500 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all"
            >
              <div className="flex items-start">
                <div className="bg-teal-100 p-2 sm:p-3 rounded-full mr-3 sm:mr-4">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-base sm:text-lg mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm mb-2">{item.text}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-teal-600 hover:text-teal-800 font-medium flex items-center transition"
                    >
                      {item.action}
                      <FaChevronRight className="ml-1 text-sm" />
                    </a>
                  ) : (
                    <button className="text-teal-600 hover:text-teal-800 font-medium flex items-center transition">
                      {item.action}
                      <FaChevronRight className="ml-1 text-sm" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions about our support services and platform"
        faqs={faqs}
      />

      {/* Support Form */}
      <section className="bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <FaPaperPlane className="text-teal-600 mr-3" />
          Submit a Support Request
        </h2>
        <form className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
              placeholder="What's this about?"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 bg-white"
            >
              <option value="">Select a category</option>
              <option value="technical">Technical Issue</option>
              <option value="billing">Billing & Payments</option>
              <option value="course">Course Content & Learning</option>
              <option value="account">Account Help</option>
              <option value="academic">Academic Support</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
              placeholder="Describe your issue in detail..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-sm"
          >
            Submit Request
          </button>
        </form>
      </section>
    </StudentTemplate>
  );
};

export default CustomerSupport;
