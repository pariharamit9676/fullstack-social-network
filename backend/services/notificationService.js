const db = require("../config/db");
const moment = require("moment");
createNotification = async (senderId, receiverId, type) => {
  const createdAt = moment().format("YYYY-MM-DD HH:mm:ss");
  const [result] = await db.query(
    "INSERT INTO notifications (senderId, receiverId, type, createdAt) VALUES (?, ?, ?, ?)",
    [senderId, receiverId, type, createdAt]
  );
  return { insertId: result.insertId, createdAt };
};

deleteNotification = async (notificationId) => {
  const [result] = await db.query("DELETE FROM notifications WHERE id = ?", [
    notificationId,
  ]);
  return result;
};

getSenderDetails = async (userId) => {
  const [[user]] = await db.query(
    "SELECT name, profilePic FROM users WHERE id = ?",
    [userId]
  );
  return user;
};

module.exports = {
    createNotification,
    getSenderDetails
}