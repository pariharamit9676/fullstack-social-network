const db = require("../config/db");
const {
    addLikeToDB,
    getPostOwner,
    getLikeDetails,
    deleteLike,
  }  = require("../services/likeService.js");
const { createNotification, getSenderDetails } = require("../services/notificationService.js");
const emitNotification = require("../socket/notification.js");

const getLikes = async (req, res) => {

    const userId = req.userId;
    const postId = req.params.id;
    try{    
        const result = await getLikeDetails(postId, userId);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
};
const addLike = async (req, res) => {
    const userId = req.userId;
    const postId = req.params.id;
  
    try {
      const likeResult = await addLikeToDB(postId, userId);
      if (likeResult.affectedRows === 0) {
        return res.status(400).json({ message: "Already liked" });
      }
      const receiverId = await getPostOwner(postId);
      if(receiverId === userId) {
        return res.status(200).json({ message: "Liked successfully" });
      }
      
      const { insertId, createdAt } = await createNotification(userId, receiverId, 'like');
      const sender = await getSenderDetails(userId);

      emitNotification(receiverId, {
        id: insertId,
        senderId: userId,
        receiverId,
        name: sender.name,
        profilePic: sender.profilePic,
        type: "like",
        isRead: 0,
        createdAt,
      });
      return res.status(201).json({ message: "Liked successfully" });
    } catch (error) {
      console.error("addLike error:", error);
      return res.status(500).json({ error: error.message });
    }
  };


  const removeLike = async (req, res) => {

    const userId = req.userId;
    const postId = req.params.id;
    
    try{
      
        const result = await deleteLike(postId, userId);
        return res.status(200).json({message: "Unliked successfully"});
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
  }

module.exports = { addLike, getLikes, removeLike };