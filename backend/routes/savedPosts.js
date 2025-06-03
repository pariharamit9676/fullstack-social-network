const router = require("express").Router();
const { getSavedPosts, addSavedPost, deleteSavedPost } = require("../controllers/savedPost");
const verifyToken = require("../middlewares/verifyToken");



router.use(verifyToken);
router.get("/", getSavedPosts);
router.post("/", addSavedPost);
router.delete("/", deleteSavedPost);

module.exports = router;