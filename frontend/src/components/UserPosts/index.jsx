import React, { useState } from "react";
import PostDetails from "../PostDetails/index";
import PostImage from "./PostImage";
import PostOverlay from "./PostOverlay";
import { useComments } from "../../hooks/useComments";
import { useLikes } from "../../hooks/useLikes";

const UserPosts = ({ post }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { comments } = useComments(post.id);
  const { likeCount, likes, fetchLikes } = useLikes(post.id, false, 0);

  return (
    <div>
      {isOpen && <PostDetails post={post} onClose={() => setIsOpen(false)} />}
      <div onClick={() => setIsOpen(true)} className="relative group cursor-pointer">
        <PostImage img={post.img} />
        <PostOverlay fetchLikes={fetchLikes} likeCount={likeCount} commentCount={comments.length} />
      </div>
    </div>
  );
};

export default UserPosts;
