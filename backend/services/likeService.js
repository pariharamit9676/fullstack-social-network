const db = require("../config/db");
const moment = require("moment");

addLikeToDB = async (postId, userId) => {
  const [result] = await db.query(
    "INSERT INTO likes (postId, userId) VALUES (?, ?)",
    [postId, userId]
  );
  return result;
};

getLikeDetails = async(postId, userId) => {
  const q = `SELECT 
                (SELECT COUNT(*) FROM likes WHERE postId = ?) AS likeCount,
                EXISTS (SELECT 1 FROM likes WHERE postId = ? AND userId = ?) AS isLiked
            `;
  const [[result]] = await db.query(q, [postId, postId, userId]);
  return result;
};

getPostOwner = async (postId) => {
  const [[post]] = await db.query(
    "SELECT userId FROM posts WHERE id = ?",
    [postId]
  );
  return post.userId;
};


deleteLike = async (postId, userId) => {
  const [result] = await db.query(
    "DELETE FROM likes WHERE postId = ? AND userId = ?",
    [postId, userId]
  );
  return result;
};

module.exports = {
  addLikeToDB,
  getPostOwner,
  getLikeDetails,
  deleteLike,
};
