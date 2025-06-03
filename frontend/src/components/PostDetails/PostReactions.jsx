const PostReactions = ({ isLiked, likeCount, handleLikeToggle }) => (
    <div className="flex items-center gap-2 mb-3">
      <button onClick={handleLikeToggle}>
        {isLiked ? "❤️" : "🤍"}
      </button>
      <span>{likeCount} Likes</span>
    </div>
  );
  
  export default PostReactions;
  