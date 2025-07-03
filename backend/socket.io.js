// const app = require("./app");
// const { createServer } = require("http");
const { Server } = require("socket.io");
const { CORS_ALLOW_ORIGINS } = require("./src/Config/index.config");

let ioInstance = null;

function initializeSocketServer(httpServer) {
  // const serverHttp = createServer(app);
  ioInstance = new Server(httpServer, { cors: CORS_ALLOW_ORIGINS });
  ioInstance.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // Admin joins their room
    socket.on("joinAdminRoom", (adminId) => {
      socket.join(adminId);
      console.log(`Admin ${adminId} joined room`);
    });

    socket.on("joinStudentRoom", (studentId) => {
      socket.join(studentId);
      console.log(`Student ${studentId} joined room`);
    });

    // Client disconnect
    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
  // return serverHttp;
}

const getSocketIO = () => {
  if (!ioInstance) {
    throw new Error("Socket.IO is not initialized.");
  }
  return ioInstance;
};

module.exports = {
  initializeSocketServer,
  getSocketIO,
};
