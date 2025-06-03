import React, { useCallback, useEffect, useRef, useState } from "react";
import Post from "./Post";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'; // important for styling

const Feeds = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const refList = useRef([]);

  const fetchPosts = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axios.get(`http://localhost:3000/api/posts/${page}`, {
        withCredentials: true,
      });
      setData((prev) => [...prev, ...response.data]);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("Error fetching posts", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        observer.unobserve(entries[0].target);
        fetchPosts();
      }
    });

    if (refList.current.length > 0) {
      const lastPost = refList.current.at(-1);
      if (lastPost) observer.observe(lastPost);
    }

    return () => {
      observer.disconnect();
    };
  }, [data.length]);

  return (
    <div className="feeds w-full max-w-2xl mx-auto">
      {/*--------------- FEED  ------------------*/}
      {data.map((item, index) => (
        <div key={index} ref={(el) => (refList.current[index] = el)}>
          <Post index={index} postDetails={item} />
        </div>
      ))}

      {/* Skeleton loader when loading */}
      {loading && (
        <div className="p-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="mb-4">
              <Skeleton height={200} />
              <div className="mt-2">
                <Skeleton width={`60%`} />
              </div>
            </div>
          ))}
        </div>
      )}
      {/*--------------- END OF FEED  ------------------*/}
    </div>
  );
};

export default Feeds;
