// Pagination Component
const Pagination = ({ currentPage, totalPages, handlePageChange, handlePrevious, handleNext }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    totalPages > 1 && (
      <div className="mt-8 sm:mt-10 flex justify-center">
        <nav className="flex items-center">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`px-2 sm:px-3 py-1 sm:py-2 rounded-l-md border border-gray-300 text-sm ${
              currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-500 hover:bg-gray-50'
            }`}
          >
            <span className="hidden sm:inline">Previous</span>
            <span className="sm:hidden">Prev</span>
          </button>
          {getPageNumbers().map((page, index) => (
            page === '...' ? (
              <span key={index} className="px-3 py-1 border-t border-b border-gray-300 bg-white text-gray-400">
                ...
              </span>
            ) : (
              <button
                key={index}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 border-t border-b border-gray-300 ${
                  currentPage === page
                    ? 'bg-teal-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            )
          ))}
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-2 sm:px-3 py-1 sm:py-2 rounded-r-md border border-gray-300 text-sm ${
              currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span className="hidden sm:inline">Next</span>
            <span className="sm:hidden">Next</span>
          </button>
        </nav>
      </div>
    )
  );
};

export default Pagination;