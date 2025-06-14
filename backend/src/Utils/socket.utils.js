const { getSocketIO } = require("../../socket.io");
const { admin_emit_listeners } = require("../Constants/socket.constants");

const emitNotificationToAdmin = (notificationData) => {
  const io = getSocketIO();

  if (io) {
    let admin_name_room = "edu_excellence_admin";
    const isEmitted = io
      .to(admin_name_room)
      .emit(admin_emit_listeners.adminNotification, {
        ...notificationData,
        timestamp: new Date(),
      });
    console.log("Notification sent to admin");
    return isEmitted;
  } else {
    console.error("Socket.IO instance not available");
    return false;
  }
};

module.exports = {
  emitNotificationToAdmin,
};
