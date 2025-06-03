const moment = require("moment/moment");
const db = require("../config/db");
const {
  createNotification,
  getSenderDetails,
} = require("../services/notificationService");
const emitNotification = require("../socket/notification.js");
const { getPostOwner } = require("../services/likeService");

const getComments = async (req, res) => {
  const q =
    "SELECT c.*, u.id AS userId, name, profilePic from comments AS c JOIN users AS u ON (u.id = c.userId) WHERE c.postId = ? ORDER BY c.createdAt DESC";

  try {
    const [data] = await db.query(q, [req.query.postId]);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const addComment = async (req, res) => {
  const userId = req.userId;
  const postId = req.body.postId;
  const comment = req.body.comment;

  if (!comment) {
    return res.status(400).json("Comment cannot be empty");
  }
  const values = [
    comment,
    moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    userId,
    postId,
  ];
  const q =
    "INSERT INTO comments (`desc`, `createdAt`, `userId`, `postId`) VALUES (?,?,?,?)";

  try {
    await db.query(q, values);

      const receiverId = await getPostOwner(postId);
      if (receiverId === userId) {
       return res.status(200).json("Comment added successfully");
  }
    const { insertId, createdAt } = await createNotification(
      userId,
      receiverId,
      "comment"
    );
    const sender = await getSenderDetails(userId);
    emitNotification(receiverId, {
      id: insertId,
      senderId: userId,
      receiverId,
      name: sender.name,
      profilePic: sender.profilePic,
      type: "comment",
      isRead: 0,
      createdAt,
    });

    return res.status(201).json("Comment added successfully");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

};

module.exports = { getComments, addComment };
