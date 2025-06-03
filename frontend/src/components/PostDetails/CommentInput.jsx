import { FaSmile, FaPaperPlane } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";

const CommentInput = ({
  newComment,
  setNewComment,
  handleSubmit,
  showEmojiPicker,
  setShowEmojiPicker,
  handleEmojiClick,
}) => (
  <div className="border-t p-3 flex items-center relative">
    <button
      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
      className="text-gray-500 mr-2"
    >
      <FaSmile />
    </button>

    <form onSubmit={handleSubmit} className="flex items-center w-full relative">
      {showEmojiPicker && (
        <div className="absolute bottom-12 left-0 z-50 bg-white border rounded shadow-sm">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}

      <input
        type="text"
        className="flex-1 border border-gray-300 rounded px-3 py-2 outline-none"
        placeholder="Add a comment..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        onFocus={() => setShowEmojiPicker(false)}
      />
      <button type="submit" className="ml-2 px-3 py-2 bg-blue-500 text-white rounded text-xs">
        <FaPaperPlane />
      </button>
    </form>
  </div>
);

export default CommentInput;
