const moment = require("moment/moment");
const db = require("../config/db");
const jwt = require("jsonwebtoken");


const getNotifications = async (req, res) => { 
    
    const userId = req.userId;
    const q = "SELECT n.*, u.name, u.profilePic FROM notifications AS n JOIN users AS u ON n.senderId = u.id WHERE n.receiverId = ?  ORDER BY createdAt DESC";
    try {
        const [notifications] = await db.query(q, [userId]);

        return res.status(200).json(notifications);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
    }
}

const markAllAsRead = async(req,res) => {
    
    const userId = req.userId;
    const q = "UPDATE notifications SET isRead = 1 WHERE receiverId = ? AND isRead = 0";
    try {
        await db.query(q, [userId]);
        return res.status(200).json("All notifications marked as read!");
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
    }
}

module.exports = {getNotifications, markAllAsRead}