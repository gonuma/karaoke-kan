require("dotenv").config();
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Set up default MongoDB connection
const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// Get default MongoDB connection
const db = mongoose.connection;

// Bind connection to error event
db.once("open", () => {
  console.log("Connected to MongoDB database.");
});
db.on("error", console.error.bind(console, "MongoDB connection error:"));

//Websocket Connection and Transmission
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

//Start up server
server.listen(3000, () => {
  console.log("Listening on port 3000");
});
