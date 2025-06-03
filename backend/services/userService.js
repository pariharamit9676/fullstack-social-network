const db = require("../config/db");
const moment = require("moment");

fetchUserDetails = async(currentUserId, userId) => {
     const q = `SELECT 
   u.id AS userId,
   u.username,
   u.name,
   u.email,
   u.coverPic,
   u.profilePic,
   (SELECT COUNT(*) FROM posts WHERE userId = u.id) AS post_count,
   (SELECT COUNT(*) FROM relationships WHERE followedUserId = u.id) AS follower_count,
   (SELECT COUNT(*) FROM relationships WHERE followerUserId = u.id) AS following_count,
   EXISTS (
     SELECT 1 
     FROM relationships 
     WHERE followerUserId = ? AND followedUserId = u.id
   ) AS isFollowing
 FROM users AS u
 WHERE u.id = ?`;

   const [[result]] = await db.query(q, [currentUserId,userId]);
    return result;
};

addFollowToDB = async (followerId, followedId) => {
  console.log(followerId, followedId);
    const [result] = await db.query(
        "INSERT INTO relationships (followerUserId, followedUserId) VALUES (?, ?)",
        [followerId, followedId]
      );

      return result;
}

removeFollowFromDB = async (followerId, followedId) => {
    const [result] = await db.query(
        "DELETE FROM relationships WHERE followerUserId = ? AND followedUserId = ?",
        [followerId, followedId]
      );

      return result;
}

module.exports = {fetchUserDetails, addFollowToDB, removeFollowFromDB};