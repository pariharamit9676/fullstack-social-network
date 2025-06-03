import moment from "moment";

const CommentList = ({ comments, commentBoxRef }) => (
  <div className="text-sm">
    <div className="text-gray-500 mb-2">View all {comments.length} comments</div>
    {comments.map((comment, idx) => (
      <div key={idx} className="flex items-start gap-2 mb-2">
        <img src={`/uploads/${comment.profilePic}`} className="w-7 h-7 rounded-full" />
        <div>
          <p><strong>{comment.name}</strong> {comment.desc}</p>
          <span className="text-xs text-gray-400">{moment(comment.createdAt).fromNow()}</span>
        </div>
      </div>
    ))}
    <div ref={commentBoxRef}></div>
  </div>
);

export default CommentList;
