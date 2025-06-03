module.exports = (receiverId, newMessage) => {
    if (global.io) {
      global.io.to(receiverId.toString()).emit("newMessage", newMessage);
    }
};

module.exports.emitTyping = (receiverId, senderId) => {
  if (global.io) {
    global.io.to(receiverId.toString()).emit("typing", { senderId });
  }
};

module.exports.emitStopTyping = (receiverId, senderId) => {
  if (global.io) {
    global.io.to(receiverId.toString()).emit("stopTyping", { senderId });
  }
};