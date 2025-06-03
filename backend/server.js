const express = require('express');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const likeRoutes = require('./routes/likes');
const userRoutes = require('./routes/users');
const storyRoutes = require('./routes/story');
const notificationRoutes = require('./routes/notifications');
const savedPostRoutes = require('./routes/savedPosts');
const http = require('http');
const { Server } = require('socket.io');
const dotenv = require('dotenv');
const app = express();
const multer = require('multer');
const cookieParser = require("cookie-parser");
const cors = require('cors');
const messagesRoutes = require('./routes/messages');
const commentRoutes = require('./routes/comments');


dotenv.config();


const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true,
    },
})

global.io = io; // make io available globally
require('./socket/index')(io); // import socket logic

//middleware
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/comments', commentRoutes)
app.use("/api/likes", likeRoutes)
app.use("/api/users", userRoutes)
app.use("/api/saved", savedPostRoutes)
app.use("/api/stories", storyRoutes)
app.use("/api/notifications", notificationRoutes);
app.use("/api/inbox", messagesRoutes);


server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});