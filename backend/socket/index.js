const onlineUsers = new Map();  // To store userId and socketId

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

       
        socket.on('join', (userId, username) => {
            socket.userId = userId;  // Custom userId to socket object
            socket.join(userId.toString());  // Join the room based on userId

            // Add user to online users map
            onlineUsers.set(userId, { username, socketId: socket.id });

            console.log(`User ${username} with ID ${userId} joined`);
            
            // Emit online users list to all connected clients
            io.emit('updateOnlineUsers', Array.from(onlineUsers.keys()));

            console.log('Current online users:', Array.from(onlineUsers.keys()));
        });

        // Handle disconnect event
        socket.on('disconnect', () => {
            if (socket.userId) {
                onlineUsers.delete(socket.userId);  // Remove user from online list
                console.log(`User ${socket.userId} disconnected. Remaining online users:`, Array.from(onlineUsers.keys()));

                // Emit updated online users list to all clients
                io.emit('updateOnlineUsers', Array.from(onlineUsers.keys()));
            }
        });
    });
};
