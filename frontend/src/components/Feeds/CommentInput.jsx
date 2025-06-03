const CommentInput = ({ newComment, onChange, onSubmit }) => (
    <form onSubmit={onSubmit} className="flex items-center mt-3 m-1 space-x-2">
      <input
        type="text"
        value={newComment}
        onChange={onChange}
        placeholder="Add a comment..."
        className="flex-1 px-3 py-1.5 border rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
      />
      <button type="submit" className="text-sm text-blue-500 hover:underline">
        Post
      </button>
    </form>
  );
  
  export default CommentInput;
  