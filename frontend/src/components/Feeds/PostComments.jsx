const PostComments = ({ showComments, toggleComments, comments }) => {
  const hasComments = comments.length > 0;

  return (
    <>
      <div className="mt-2">
        {hasComments ? (
          <button
            onClick={toggleComments}
            className="text-gray-500 text-sm hover:text-gray-700 transition"
          >
            {showComments ? "Hide comments" : `View all ${comments.length} comments`}
          </button>
        ) : (
          <p className="text-gray-400 text-sm">No comments yet</p>
        )}
      </div>

      <div
        className={`transition-all duration-300 ease-in-out ${
          showComments ? "mt-3 max-h-[300px]" : "max-h-0"
        } overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100`}
      >
        <div className="space-y-3 px-1 pr-2">
          {hasComments ? (
            comments.map((comment, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 text-sm text-gray-700"
              >
                <img
                  src={`uploads/${comment.profilePic}`}
                  alt="profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <span className="font-semibold text-gray-800">{comment.name}</span>{" "}
                  {comment.desc}
                </div>
              </div>
            ))
          ) : (
            showComments && (
              <div className="text-center text-gray-400 text-sm mt-4">
                🗨️ Be the first to comment!
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default PostComments;
