const db = require('../config/db');
const emitSendMessage = require('../socket/message.js');

const createConversation = async (req, res) => {
  const senderId = req.userId;
  const { receiverId } = req.body;

  try {
    // Check if conversation exists
    const [existing] = await db.query(
      `SELECT conversationId
        FROM conversation_participants
        WHERE userId IN (?, ?)
          GROUP BY conversationId
          HAVING COUNT(DISTINCT userId) = 2;`,
      [senderId, receiverId]
    );

    if (existing.length > 0) {
      return res.status(200).json({ conversationId: existing[0].conversationId });
    }

    // Create new conversation
    const [convResult] = await db.query(`INSERT INTO conversations () VALUES ()`);
    const conversationId = convResult.insertId;

    // Add participants
    await db.query(
      `INSERT INTO conversation_participants (conversationId, userId) VALUES (?, ?), (?, ?)`,
      [conversationId, senderId, conversationId, receiverId]
    );

    res.status(201).json({ conversationId });
  } catch (err) {
    console.error('Create Conversation Error:', err);
    res.status(500).json({ error: 'Failed to create conversation' });
  }
};

const getAllConversations = async (req, res) => {

  const userId = req.userId;
  try {
    const [conversations] = await db.query(
      `SELECT 
         c.id AS conversationId,
         u.id AS userId,
         u.username,
         u.name,
         u.profilePic,
         m.message AS latestMessage,
         m.createdAt AS messageTime
       FROM conversations c
       JOIN conversation_participants cp1 ON cp1.conversationId = c.id AND cp1.userId = ?
       JOIN conversation_participants cp2 ON cp2.conversationId = c.id AND cp2.userId != ?
       JOIN users u ON u.id = cp2.userId
       LEFT JOIN (
         SELECT conversationId, message, createdAt
         FROM messages
         WHERE (conversationId, createdAt) IN (
           SELECT conversationId, MAX(createdAt)
           FROM messages
           GROUP BY conversationId
         )
       ) m ON m.conversationId = c.id
       ORDER BY messageTime DESC`,
      [userId, userId]
    );

    res.status(200).json(conversations);
  } catch (err) {
    console.error('Get All Conversations Error:', err);
    res.status(500).json({ error: 'Failed to fetch conversations' });
  }
};

const sendMessage = async (req, res) => {
  const senderId = req.userId;
  const { conversationId, message, receiverId } = req.body;
  const file = req.file;

  let messageType = 'text';
  let filePath = null;

  if (file && message) {
    messageType = 'file';
    filePath = file.filename;
  } else if (file) {
    messageType = 'file';
    filePath = file.filename;
  }

  try {
    const [result] = await db.query(
      `INSERT INTO messages (conversationId, senderId, message, messageType, filePath) VALUES (?, ?, ?, ?, ?)`,
      [conversationId, senderId, message || null,  messageType, filePath || null]
    );

    const [newMessageRows] = await db.query(
      `SELECT * FROM messages WHERE id = ?`,
      [result.insertId]
    );

    const newMessage = newMessageRows[0];

    console.log('Message sent:', newMessage);

    console.log('Emitting new message to receiver:', receiverId);
    emitSendMessage(receiverId, newMessage);

    res.status(201).json(newMessage);
  } catch (err) {
    console.error('Send Message Error:', err);
    res.status(500).json({ error: err.message });
  }
};




const getMessages = async (req, res) => {
  const { conversationId } = req.params;

  console.log('getMessages');
  try {
    const [messages] = await db.query(
      `SELECT *
       FROM messages
       WHERE conversationId = ?
       ORDER BY createdAt ASC`,
      [conversationId]
    );

    res.status(200).json(messages);
  } catch (err) {
    console.error('Get Messages Error:', err);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

module.exports = { createConversation, getAllConversations, sendMessage, getMessages };
