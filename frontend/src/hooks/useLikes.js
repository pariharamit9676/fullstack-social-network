// hooks/useLikes.js
import { useEffect, useState } from "react";
import { getLikes, toggleLike } from "../services/likeService";

export const useLikes = (postId, initialIsLiked, initialLikeCount) => {
    const [likes, setLikes] = useState({});
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);


  const handleLikeToggle = async () => {
    const newState = !isLiked;
    setIsLiked(newState);
    setLikeCount((prev) => (newState ? prev + 1 : prev - 1));

    try {
      await toggleLike(postId, isLiked);
    } catch (err) {
      console.log(err);
      alert("Something went wrong!");
      // revert
      setIsLiked(!newState);
      setLikeCount((prev) => (newState ? prev - 1 : prev + 1));
    }
  };
  const fetchLikes = async () => {
    try {
      const res = await getLikes(postId);
      setLikes(res.data);
      setIsLiked(res.data.isLiked);
      setLikeCount(res.data.likeCount);
    } catch (err) {
      console.error("Error fetching likes:", err);
    }
  }; 

  useEffect(() => {
    fetchLikes();
}, [postId]);

  return { likes, isLiked, likeCount, handleLikeToggle, fetchLikes };
};


