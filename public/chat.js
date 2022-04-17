"use strict";
const socket = io();

let currentRoom;

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  const username = document.getElementById("username");
  const inp = document.getElementById("m");
  username.setAttribute("disabled", "true");
  socket.emit("chat message", inp.value, username.value, currentRoom);
  inp.value = "";
});

socket.on("chat message", (msg, user) => {
  const item = document.createElement("li");
  item.innerHTML =
    `<div class="message-line"><span class="usrnm">` +
    user +
    `</span>: <span class="msg">` +
    msg +
    `</span></div>`;
  const list = document.getElementById("messages");
  list.appendChild(item);
  list.scrollTop = list.scrollHeight;
});

const joinRoom = (room) => {
  console.log("Entering room:", room.value);
  const user = document.getElementById("username");

  const clearOld = document.getElementById("messages");
  clearOld.innerHTML = "";

  socket.emit("choose room", room.value, user.value);

  currentRoom = room.value;
};
