import React, { useEffect } from "react";
import UserPosts from "../UserPosts";
import { useUserPosts } from "../../hooks/useUserPosts";

const PostGrid = ({ activeTab, userId }) => {

    const { posts, fetchPosts, fetchSaved, loading } = useUserPosts(userId);
    
    useEffect(() => {
      if (activeTab === "posts") {
        fetchPosts();
      } else if (activeTab === "saved") {
        fetchSaved();
      }
    },[activeTab]);

  if (!posts || posts.length === 0) return  (<div className="min-w-[px] flex items-center justify-center text-gray-500"> No posts yet.</div>);
  
  return (
    <div className="grid grid-cols-3 gap-2 mt-4 px-2">
      {posts.map((item, index) => (
        <UserPosts key={index} post={item} />
      ))}
    </div>
  );
};

export default PostGrid;
