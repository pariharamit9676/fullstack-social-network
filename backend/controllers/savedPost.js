const db = require("../config/db");
const jwt = require("jsonwebtoken");


const addSavedPost = async (req, res) => {

    const userId = req.userId;
    const {postId} = req.body;

    const q = "INSERT INTO saved_posts (userId, postId) VALUES (?, ?)";
    try {
        await db.query(q, [userId, postId]);
        return res.status(200).json("Post saved successfully!");
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

const getSavedPosts = async (req, res) => {

    console.log("Saved Posts: ", req.query);
    const token = req.cookies.accessToken;

    const {id:userId} = jwt.verify(token, process.env.JWT_SECRET)
    if(!userId) return res.status(403).json("Token is not valid!");
    
    const q = "SELECT p.*, u.id AS userId, u.name, u.profilePic FROM saved_posts AS sp JOIN posts AS p ON sp.postId = p.id JOIN users AS u ON sp.userId = u.id WHERE sp.userId = ?";
    try {
        const [savedPosts] = await db.query(q, [userId]);
        console.log(savedPosts);
        return res.status(200).json(savedPosts);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
    }
}

const deleteSavedPost = async (req, res) => {

    const token = req.cookies.accessToken;

    const {id:validUserId} = jwt.verify(token, process.env.JWT_SECRET)
    if(!validUserId) return res.status(403).json("Token is not valid!");
    const {postId} = req.query;

    const q = "DELETE FROM saved_posts WHERE userId = ? AND postId = ?";
    try {
        await db.query(q, [validUserId, postId]);
        return res.status(200).json("remove bookmark successfully!");
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
 
module.exports = {
    addSavedPost,
    deleteSavedPost,
    getSavedPosts

}