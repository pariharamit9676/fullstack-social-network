import React, { useEffect, useState } from "react";
import axios from "axios";
import Posts from "./Posts";
import Pagination from "./Pagination";
import { useUserPosts } from "../../hooks/useUserPosts";

const AllPosts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const {posts, fetchAllPosts, loading, totalPages} = useUserPosts(1);

  useEffect(() => {
    fetchAllPosts();
  }, []);

  function handlePageChange(page) {
    setCurrentPage(page);
    fetchAllPosts(page);
  }
  return (<>
      {loading ? (
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="break-inside-avoid mb-4 rounded-lg bg-gray-200 animate-pulse w-full"
            >
              <div
                className="w-full rounded-lg"
                style={{
                  aspectRatio: "3/4", // Or you can randomize height if desired
                  height: `${Math.floor(Math.random() * 80) + 200}px`,
                }}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {posts.map((post, i) => (
            <Posts key={i} posts={posts} post={post} index={i} />
          ))}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange} // Pass the page change handler
      />
  </>
  );
};

export default AllPosts;
