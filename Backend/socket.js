const  { Server } = require("socket.io");
const userModel = require("../Backend/models/user.model.js");
const captainModel = require("../Backend/models/captain.model.js");

let io;

function initializeSocket(server) {
  if (io) return io;

  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);
    
      socket.on('join' , async(data) => {
        const {userId , userType }= data;

        if(userType === "user"){
            await userModel.findByIdAndUpdate(userId, {
                socketId: socket.id
            });
        } else if (userType === "captain"){
            await (captainModel.findByIdAndUpdate(userId, {sockedId : socket.id}));
        }
      });
  });

  return io;
}

function sendMessageSocketId(socketId, event, message) {
  if (!io) throw new Error("Socket not initialized. Call initializeSocket(server) first.");

  // socket.io v4 stores sockets in a Map; fallback for older versions
  const target = io.sockets && io.sockets.sockets
    ? (typeof io.sockets.sockets.get === "function" ? io.sockets.sockets.get(socketId) : io.sockets.sockets[socketId])
    : null;

  if (target) {
    target.emit(event, message);
    return true;
  }

  return false;
}

module.exports = { initializeSocket, sendMessageSocketId };
