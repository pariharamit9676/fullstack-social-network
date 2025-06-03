const moment = require("moment/moment");
const db = require("../config/db");
const jwt = require("jsonwebtoken");



const getAllPosts = async (req, res) => {
 
  let page = parseInt(req.params.page) || 1;
  let limit = 10;
  let offset = (page - 1) * limit;

  // Query for paginated data
  const dataQuery = `SELECT * FROM posts ORDER BY createdAt DESC LIMIT ${limit} OFFSET ${offset}`;

  // Query to count total number of posts
  const countQuery = `SELECT COUNT(*) AS total FROM posts`;

  try {
    const [posts] = await db.query(dataQuery);
    const [countResult] = await db.query(countQuery);
    const totalPosts = countResult[0].total;

    return res.status(200).json({
      posts,
      totalPosts,
      currentPage: page,
      totalPages: Math.ceil(totalPosts / limit)
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getPostDetails = async (req, res) => {
    const token = req.cookies.accessToken;
    const userId = req.query.userId;

    if(!token) return res.status(401).json("Not authenticated!");

    const {id:validUserId} = jwt.verify(token, process.env.JWT_SECRET)

    if(!validUserId) return res.status(403).json("Token is not valid!");

     const q = `SELECT p.* , u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON p.userId = u.id WHERE p.userId = ?`;
    try {
        const [post] = await db.query(q, [userId]);
        return res.status(200).json(post);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

const getAllFeeds = async (req, res) => {
   const userId = req.userId
  
    let page = parseInt(req.params.page) || 1;
    let limit = 5;
    let offset = (page - 1) * limit;
  
    const q = `
      SELECT 
        p.*, 
        u.id AS userId, 
        u.name, 
        u.profilePic,
        EXISTS (
          SELECT 1 
          FROM saved_posts sp 
          WHERE sp.postId = p.id AND sp.userId = ?
        ) AS isBookmarked
      FROM posts AS p 
      JOIN users AS u ON p.userId = u.id 
      ORDER BY p.createdAt DESC
      LIMIT ${limit} OFFSET ${offset}
    `;
  
    try {
      const [posts] = await db.query(q, [userId]);
      const formattedPosts = posts.map(post => ({
        ...post,
        isBookmarked: !!post.isBookmarked,
      }));
  
      if (formattedPosts.length > 0) {
        return res.status(200).json(formattedPosts);
      } else {
        return res.status(404).json({ message: "No posts found" });
      }
  
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };
  

const addPost = async (req, res) => {
        const userId = req.userId;
        const q = "INSERT INTO posts (`desc`, `img`, `createdAt`,`userId`) VALUES (?)";

        const values = [
            req.body.desc,
            req.body.img,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            userId,
        ];

        try {
          await db.query(q, [values])
           return res.status(200).json("Post has been created");

        } catch (error) {
          return res.status(500).json(err); 
        }
}
const deletePost = async (req, res) => {

  try {
      const q = "DELETE FROM posts WHERE id = ?";
      
      const result = await db.query(q, [req.params.postId]);

      if (result[0].affectedRows === 0) {  
          return res.status(404).json("Post not found!");
      }

      return res.status(200).json("Post has been deleted");

  } catch (err) {
      console.error("Error:", err);
      return res.status(500).json(err);
  }
};

module.exports = { getPostDetails, addPost, deletePost, getAllFeeds, getAllPosts };