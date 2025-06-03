import API from "../axios";



export const getLikes = (postId) => API.get(`/likes/${postId}`);

export const toggleLike = async (postId, isLiked) => {
  if (isLiked) {
    await API.delete(`/likes/${postId}`);
  } else {
    await API.post(`/likes/${postId}`);
  }
};
