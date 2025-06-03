import React, { useState } from "react";
import PostDetails from "../PostDetails";
import PostCarousal from "./PostCarousal";

const Posts = ({ posts, post, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(index || 0);
  return (
    <>
      {isOpen && (
        <PostCarousal
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          posts={posts}
          post={posts[currentIndex]}
          setIsOpen={setIsOpen}
        />
      )}
      <div
        className="break-inside-avoid mb-4 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className="relative group rounded-lg overflow-hidden bg-black w-full">
          <img
            src={`/uploads/${post.img}`}
            alt="post"
            className="w-full h-auto object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition duration-300 ease-in-out flex items-center justify-center opacity-0 group-hover:opacity-100">
            <span className="text-white font-semibold text-sm md:text-base">
              View Post
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Posts;
