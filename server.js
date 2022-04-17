"use strict";

import dotenv from "dotenv";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config();

const app = express();
app.use(express.static("public"));
const http = createServer(app);
const io = new Server(http);
const port = process.env.PORT || 3000;

io.on("connection", async (socket) => {
  console.log("a user connected", socket.id);

  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
  });

  socket.on("chat message", (msg, user, room) => {
    console.log("user: " + user + " message: " + msg);
    io.to(room).emit("chat message", msg, user);
  });

  socket.on("choose room", (newroom, user) => {
    socket.rooms.forEach((room) => {
      if (room != socket.id) {
        console.log(user + " left room: " + room);
        socket.leave(room);
      }
    });
    console.log(user + " joined room: " + newroom);
    socket.join(newroom);
  });
});

http.listen(port, () => {
  console.log(`Socket.io chat app listening on port ${port}!`);
});
