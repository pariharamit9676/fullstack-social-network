// hooks/useUserPosts.js
import { useEffect, useState } from "react";
import { addPost, getAllPosts, getPosts, getSavedPosts } from "../services/postService";

export const useUserPosts = (userId) => {
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(0); // Initialize totalPages
  const [loading, setLoading] = useState(true);


  const createPost = async (newPost) => {
     setLoading(true)

     try {
      await addPost(newPost)
     } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  const fetchPosts = async () => {
    setLoading(true);
    try {
      const data = await getPosts(userId);
      setPosts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllPosts = async (page) => {
    setLoading(true);
    try {
      const result = await getAllPosts(page);
      setTotalPages(result.totalPages); // Set total pages from the response
      setPosts(result.posts);
    } catch (err) {
      console.error("Error fetching explore posts", err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const fetchSaved = async () => {
    setLoading(true);
    try {
      const data = await getSavedPosts(userId);
      setPosts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [userId]);

  return { posts, fetchPosts, createPost, totalPages, fetchAllPosts, fetchSaved, loading };
};
