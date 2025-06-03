module.exports = (receiverId, notification) => {
    if (global.io) {
      global.io.to(receiverId.toString()).emit("newNotification", notification);
    }
};