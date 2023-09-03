const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("New client connected");

  // Listen for play and pause actions from the client
  socket.on("play", () => {
    console.log("Play command received");
    io.emit("play"); // Forward the play command to other clients
  });

  socket.on("pause", () => {
    console.log("Pause command received");
    io.emit("pause"); // Forward the pause command to other clients
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(3000, () => {
  console.log("Listening on port 3000");
});
