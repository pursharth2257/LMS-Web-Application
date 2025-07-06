// Statistics Section Component
const StatsSection = () => (
  <section className="py-10 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-sm shadow-lg border border-gray-200 p-8 lg:p-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div className="text-center">
            <div className="text-4xl lg:text-4xl font-bold text-teal-600 mb-2">1 Million+</div>
            <div className="text-lg text-gray-600 font-medium">Enrolled Learners</div>
          </div>
          <div className="text-center">
            <div className="text-4xl lg:text-4xl font-bold text-teal-600 mb-2">100+</div>
            <div className="text-lg text-gray-600 font-medium">Free Courses</div>
          </div>
          <div className="text-center">
            <div className="text-4xl lg:text-4xl font-bold text-teal-600 mb-2">100+</div>
            <div className="text-lg text-gray-600 font-medium">Job Ready Skills</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default StatsSection;