const express = require('express');
const {getNotifications, markAllAsRead} = require('../controllers/notification');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();

router.use(verifyToken);
router.get('/', getNotifications);
router.put("/", markAllAsRead);

module.exports = router;