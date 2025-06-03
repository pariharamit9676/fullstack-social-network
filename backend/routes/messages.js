const express = require('express');
const router = express.Router();
const { createConversation, getAllConversations, sendMessage, getMessages } = require('../controllers/messages');
const verifyToken = require('../middlewares/verifyToken');
const upload = require('../middlewares/multer');

router.use(verifyToken);
router.post('/conversation', createConversation);
router.get('/conversations', getAllConversations);
router.post('/message/', upload.single("file"), sendMessage);
router.get('/messages/:conversationId', getMessages);

module.exports = router;
