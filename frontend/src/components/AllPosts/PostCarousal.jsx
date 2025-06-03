import React from 'react';
import PostDetails from '../PostDetails';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const PostCarousal = ({
  posts = [],
  setIsOpen,
  currentIndex = 0,
  setCurrentIndex = () => {},
}) => {
  const handleNext = () => {
    if (currentIndex < posts.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
      
      {/* Post content */}
      <PostDetails post={posts[currentIndex]} onClose={() => setIsOpen(false)} />

      {/* Prev Icon Button */}
      {currentIndex > 0 && (
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-12 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-200 text-xl text-black z-50"
        >
          <FaChevronLeft />
        </button>
      )}

      {/* Next Icon Button */}
      {currentIndex < posts.length - 1 && (
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-12 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-200 text-xl text-black z-50"
        >
          <FaChevronRight />
        </button>
      )}
    </div>
  );
};

export default PostCarousal;
