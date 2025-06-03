const express = require("express");
const router = express.Router();
const { getComments, addComment } = require("../controllers/comment");
const verifyToken = require("../middlewares/verifyToken");

router.use(verifyToken); // Apply the verifyToken middleware to all routes in this router
router.get("/", getComments);
router.post("/", addComment);

module.exports = router;