import API from "../axios";


export const addPost = async (newPost) => {
  const res = await API.post(`/posts/`, newPost);
  return res.data;
}
export const getPosts = async (userId) => {
  const res = await API.get(`/posts/myposts?userId=${userId}`);
  return res.data;
}

export const getSavedPosts = async () => {
  const {data} = await API.get(`/saved`);
  return data;
}

export const getAllPosts = async (page) => {
  const res = await API.get(`/posts/all-posts/${page}`);
  return res.data;
}