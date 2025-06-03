import API from "../axios";

export const getComments = async (postId) => {
  const res = await API.get(`/comments`, {
    params: { postId },
  });
  return res.data;
};

export const addComment = async (postId, comment) => {
  await API.post("/comments", {
    postId,
    comment,
  });
};
