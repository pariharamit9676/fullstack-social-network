const path = require("path");
const multer = require("multer");

// ✅ Multer Storage Config


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../frontend/public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+file.originalname)
    }
})

const upload = multer({ storage });

module.exports = upload;
