import React from "react";

const Pagination = ({ currentPage = 1, totalPages = 10, onPageChange }) => {
  const generatePageNumbers = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (currentPage > 4) pages.push("...");

      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }

      if (currentPage < totalPages - 3) pages.push("...");

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center space-x-1 mt-6 flex-wrap">
      {/* Prev Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
      >
        ← Prev
      </button>

      {/* Page Numbers */}
      {generatePageNumbers().map((num, index) => (
        <button
          key={index}
          onClick={() => typeof num === "number" && onPageChange(num)}
          className={`px-3 py-1 rounded-md text-sm ${
            num === currentPage
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          } ${num === "..." ? "cursor-default" : ""}`}
          disabled={num === "..."}
        >
          {num}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;
