import { FaComment, FaHeart } from "react-icons/fa";

const PostOverlay = ({ likeCount, commentCount, fetchLikes }) => (
  <div onMouseEnter={fetchLikes} className="absolute inset-0 flex items-center justify-center space-x-6 opacity-0 bg-black/40 group-hover:opacity-100 transition-opacity duration-300">
    <div className="flex items-center space-x-2 text-white text-lg font-semibold">
      <FaHeart /> <span>{likeCount}</span>
    </div>
    <div className="flex items-center space-x-2 text-white text-lg font-semibold">
      <FaComment /> <span>{commentCount}</span>
    </div>
  </div>
);

export default PostOverlay;
