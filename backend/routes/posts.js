const router = require("express").Router();
const { getAllPosts, getPostDetails, addPost, deletePost, getAllFeeds } = require("../controllers/posts");
const upload = require("../middlewares/multer");
const verifyToken = require("../middlewares/verifyToken");


router.use(verifyToken); // Apply the verifyToken middleware to all routes in this router
router.get("/myposts", getPostDetails);
router.get("/:page", getAllFeeds);
router.get("/all-posts/:page", getAllPosts); // Get all posts
router.post("/", addPost);
router.delete("/:postId", deletePost);
router.post("/upload", upload.single("file"), (req, res) => {
    try {
        return res.status(200).json(req.file.filename);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
