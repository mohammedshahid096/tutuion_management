const { getSocketIO } = require("../../socket.io");
const logger = require("../Config/logger.config");
const { admin_emit_listeners } = require("../Constants/socket.constants");

const emitNotificationToAdmin = ({ notificationData }) => {
  const io = getSocketIO();
  logger.info("Utils - emitNotificationToAdmin - Start");
  if (io) {
    let admin_name_room = "edu_excellence_admin";
    const isEmitted = io
      .to(admin_name_room)
      .emit(admin_emit_listeners.adminNotification, {
        ...notificationData,
        timestamp: new Date(),
      });
    logger.info("Utils - emitNotificationToAdmin - End");
    return isEmitted;
  } else {
    logger.info(
      "Utils - emitNotificationToAdmin - Error (Socket.IO instance not available)",
      error
    );
    return false;
  }
};

module.exports = {
  emitNotificationToAdmin,
};
