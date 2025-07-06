// Category Tabs Component
const CategoryTabs = ({ categories, activeCategory, setActiveCategory, scrollRef }) => (
  <div className="mb-8">
    <div
      ref={scrollRef}
      className="overflow-x-auto scrollbar-hide pb-2"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <div className="flex space-x-2 min-w-max">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
              activeCategory === category.id
                ? 'bg-teal-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  </div>
);

export default CategoryTabs;