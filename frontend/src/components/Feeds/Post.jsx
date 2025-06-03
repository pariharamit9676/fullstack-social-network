import React, { useState } from "react";
import axios from "axios";
import PostHeader from "./PostHeader";
import PostImage from "./PostImage";
import PostActions from "./PostActions";
import PostLikes from "./PostLikes";
import PostCaption from "./PostCaption";
import PostComments from "./PostComments";
import CommentInput from "./CommentInput";
import { useComments } from "../../hooks/useComments";
import { useLikes } from "../../hooks/useLikes";

const Post = ({ postDetails }) => {
  const [isBookmarked, setIsBookmarked] = useState(postDetails.isBookmarked || false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const {likes, isLiked, handleLikeToggle } = useLikes(postDetails.id)
  const { comments, submitComment } = useComments(postDetails.id);
  const toggleComments = () => setShowComments(!showComments);

  const toggleBookmark = async () => {
    if (!isBookmarked) {
      try {
        setIsBookmarked(true);
        await axios.post(`http://localhost:3000/api/saved/`, { postId: postDetails.id }, { withCredentials: true });
      } catch (error) {
        setIsBookmarked(false);
        console.log(error);
      }
    } else {
      try {
        setIsBookmarked(false);
        await axios.delete(`http://localhost:3000/api/saved?postId=${postDetails.id}`, { withCredentials: true });
      } catch (error) {
        setIsBookmarked(true);
        console.log(error);
      }
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      submitComment(newComment)
      setNewComment("");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-5 mb-6 transition-all duration-300">
      <PostHeader {...postDetails} />
      <PostImage img={postDetails.img} />
      <PostActions
        isLiked={isLiked}
        handleLikeToggle={handleLikeToggle}
        isBookmarked={isBookmarked}
        toggleBookmark={toggleBookmark}
        toggleComments={toggleComments}
      />
      <PostLikes />
      <PostCaption name={postDetails.name} desc={postDetails.desc} />
      <PostComments
        showComments={showComments}
        toggleComments={toggleComments}
        comments={comments}
      />
      <CommentInput
        newComment={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        onSubmit={handleCommentSubmit}
      />
    </div>
  );
};

export default Post;
