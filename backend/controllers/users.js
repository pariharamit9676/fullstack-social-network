const jwt = require("jsonwebtoken");
const db = require("../config/db");
const moment = require("moment/moment");
const { fetchUserDetails, addFollowToDB, removeFollowFromDB } = require("../services/userService");
const { createNotification, getSenderDetails } = require("../services/notificationService");
const emitNotification = require("../socket/notification.js");

const getUserDetails = async (req, res) => {
    
    const userId = req.params.userId;
    const currentUserId = req.userId;
     
    try {
        const result = await fetchUserDetails(currentUserId, userId);
        return res.status(200).json(result);
        
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}


const followUser = async (req, res) => {
    const { userId } = req.params;
    const currentUserId = req.userId;

    try {

    // 1. Insert into relationships table
     const followResult = await addFollowToDB(currentUserId, userId);

    if (followResult.affectedRows === 0) {
        return res.status(400).json({ message: "Already following" });}

    // 2. Don't notify if following yourself (edge case)
    if (userId !== currentUserId) {

        const {insertId, createdAt} = createNotification(currentUserId, userId, 'follow');

      const sender = await getSenderDetails(currentUserId);

      // Emit socket event to receiver
      emitNotification(userId, {
             id: insertId,
             senderId: currentUserId,
             receiverId: userId,
             name: sender.name,
             profilePic: sender.profilePic,
             type: "follow",
             isRead: 0,
             createdAt,
           });

           return res.status(200).json("User followed successfully!");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

const unfollowUser = async (req, res) => {
    const currentUserId = req.userId;
    const {userId} = req.params;

    try {
        await removeFollowFromDB(currentUserId, userId);
        return res.status(200).json("User unfollowed successfully!");
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const findUsers = async (req, res) => {

    const userId = req.userId;
    try {
        const { query } = req.query; // 'query' can be username or name

        const q = `SELECT id, username, name, profilePic 
                   FROM users 
                   WHERE (username LIKE ? OR name LIKE ?) 
                   AND id != ?`;

        const values = [`%${query}%`, `%${query}%`, userId];

        const [users] = await db.query(q, values);
        return res.status(200).json(users);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const getAllFollowers = async (req, res) => {
    const userId = req.params.userId;
    const currentUserId = req.userId;
    
    const q = `SELECT u.id AS id, u.username, u.name, u.profilePic, exists(SELECT 1 FROM relationships WHERE followerUserId = ? AND followedUserId = u.id) AS isFollowing FROM users AS u JOIN relationships AS r ON r.followerUserId = u.id WHERE r.followedUserId = ?`

    try {
        const [followers] = await db.query(q, [currentUserId, userId]);
        return res.status(200).json(followers);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

const getAllFollowing = async (req, res) => {
    const userId = req.params.userId;
    const currentUserId = req.userId;
     const q = `SELECT u.id AS id, u.username, u.name, u.profilePic, exists(SELECT 1 FROM relationships WHERE followerUserId = ? AND followedUserId = u.id) AS isFollowing FROM users AS u JOIN relationships AS r ON r.followedUserId = u.id WHERE r.followerUserId = ?`;

    try {
        const [following] = await db.query(q, [currentUserId, userId]);
        return res.status(200).json(following);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}


module.exports = {getAllFollowers, getAllFollowing, getUserDetails, followUser, unfollowUser,findUsers};