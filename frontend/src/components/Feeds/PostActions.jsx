import { FaRegBookmark, FaBookmark, FaRegHeart, FaHeart, FaShareAlt } from "react-icons/fa";
import { FiMessageSquare } from "react-icons/fi";

const PostActions = ({ isLiked, handleLikeToggle, isBookmarked, toggleBookmark, toggleComments }) => (
  <div className="flex justify-between items-center mt-4">
    <div className="flex space-x-4">
      {/* Like Button */}
      <button onClick={handleLikeToggle} className="text-gray-600 hover:text-red-500 text-xl">
        {isLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
      </button>

      {/* Comment Button */}
      <button onClick={toggleComments} className="text-gray-600 hover:text-blue-500 text-xl">
        <FiMessageSquare />
      </button>

      {/* Share Button */}
      <button className="text-gray-600 hover:text-green-500 text-xl">
        <FaShareAlt />
      </button>
    </div>

    {/* Bookmark Button */}
    <button onClick={toggleBookmark} className="text-gray-600 hover:text-yellow-500 text-xl">
      {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
    </button>
  </div>
);

export default PostActions;
