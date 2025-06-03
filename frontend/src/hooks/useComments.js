// hooks/useComments.js
import { useEffect, useState, useRef } from "react";
import { getComments, addComment } from "../services/commentService";

export const useComments = (postId) => {
  const [comments, setComments] = useState([]);
  const commentBoxRef = useRef(null);

  const fetchComments = async () => {
    try {
      const data = await getComments(postId);
      setComments(data);
    } catch (err) {
      console.log(err);
    }
  };

  const submitComment = async (text) => {
    try {
      if (!text.trim()) return;
      await addComment(postId, text);
      await fetchComments();
      commentBoxRef.current?.scrollIntoView({ behavior: "smooth" });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  return { comments, submitComment, commentBoxRef };
};
