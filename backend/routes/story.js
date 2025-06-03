const express = require('express');
const upload = require('../middlewares/multer');
const verifyToken = require('../middlewares/verifyToken');
const { addStory } = require('../controllers/story');
const router = express.Router();

router.use(verifyToken); // Verify token for all routes in this file
router.post('/', upload.single("story"), addStory);

module.exports = router;