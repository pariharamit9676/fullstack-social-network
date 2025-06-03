import React, { useState } from "react";
import { useComments } from "../../hooks/useComments";
import { useLikes } from "../../hooks/useLikes";
import PostImage from "./PostImage";
import PostHeader from "./PostHeader";
import PostDescription from "./PostDescription";
import PostReactions from "./PostReactions";
import CommentList from "./CommentList";
import CommentInput from "./CommentInput";
import { useUserDetails } from "../../hooks/useUserDetails";

const PostDetails = ({ post, onClose }) => {
  const [newComment, setNewComment] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const { comments, submitComment, commentBoxRef } = useComments(post.id);
  const { isLiked, likeCount, handleLikeToggle } = useLikes(post.id, false, 0);
  const { userInfo } = useUserDetails(post.userId);

  const handleEmojiClick = (emoji) => setNewComment((prev) => prev + emoji.emoji);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitComment(newComment);
    setNewComment("");
    setShowEmojiPicker(false);
  };

  const isLoading = !userInfo?.name;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white w-full max-w-4xl h-full sm:h-[90vh] flex flex-col sm:flex-row rounded-md overflow-hidden">
        {/* Left - Post Image */}
        <div className="w-full h-64 sm:h-auto">
          {isLoading ? (
            <div className="w-full h-full bg-gray-200 animate-pulse" />
          ) : (
            <PostImage img={post.img} />
          )}
        </div>

        {/* Right - Post Content */}
        <div className="w-full flex flex-col text-sm h-full">
          {isLoading ? (
            <div className="p-4 space-y-4">
              <div className="h-10 bg-gray-200 rounded w-1/2 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
            </div>
          ) : (
            <>
              <PostHeader profilePic={userInfo.profilePic} name={userInfo.name} onClose={onClose} />
              <PostDescription name={userInfo.name} desc={post.desc} />
              <div className="flex-1 overflow-y-auto px-4 py-2">
                <PostReactions
                  isLiked={isLiked}
                  likeCount={likeCount}
                  handleLikeToggle={handleLikeToggle}
                />
                <CommentList comments={comments} commentBoxRef={commentBoxRef} />
              </div>
              <CommentInput
                newComment={newComment}
                setNewComment={setNewComment}
                handleSubmit={handleSubmit}
                showEmojiPicker={showEmojiPicker}
                setShowEmojiPicker={setShowEmojiPicker}
                handleEmojiClick={handleEmojiClick}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
