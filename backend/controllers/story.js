const db = require("../config/db");

const addStory = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const userId = req.userId;
    const insertQuery = "INSERT INTO stories (img, userId) VALUES (?, ?)";
    
    await db.query(insertQuery, [req.file.filename, userId])
    
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {addStory};
