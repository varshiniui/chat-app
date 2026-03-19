const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

const activeUsers = new Map();
const rooms = new Map();
const messageHistory = new Map();
const MAX_HISTORY = 50;

function getRoomUsers(room) {
  return [...(rooms.get(room) || [])];
}

function addMessage(room, message) {
  if (!messageHistory.has(room)) messageHistory.set(room, []);
  const history = messageHistory.get(room);
  history.push(message);
  if (history.length > MAX_HISTORY) history.shift();
}

io.on("connection", (socket) => {
  console.log(`[+] Client connected: ${socket.id}`);

  socket.on("join", ({ username, room }) => {
    const prev = activeUsers.get(socket.id);
    if (prev) {
      socket.leave(prev.room);
      if (rooms.has(prev.room)) {
        rooms.get(prev.room).delete(prev.username);
        io.to(prev.room).emit("room_users", getRoomUsers(prev.room));
        io.to(prev.room).emit("system_message", { text: `${prev.username} left the room.`, timestamp: new Date().toISOString() });
      }
    }

    socket.join(room);
    activeUsers.set(socket.id, { username, room });
    if (!rooms.has(room)) rooms.set(room, new Set());
    rooms.get(room).add(username);

    socket.emit("message_history", messageHistory.get(room) || []);

    const systemMsg = { text: `${username} joined the room.`, timestamp: new Date().toISOString() };
    addMessage(room, { type: "system", ...systemMsg });
    io.to(room).emit("system_message", systemMsg);
    io.to(room).emit("room_users", getRoomUsers(room));
    console.log(`[*] ${username} joined room: ${room}`);
  });

  socket.on("send_message", ({ text }) => {
    const user = activeUsers.get(socket.id);
    if (!user) return;
    const message = {
      id: `${Date.now()}-${socket.id}`,
      username: user.username,
      text,
      room: user.room,
      timestamp: new Date().toISOString(),
    };
    addMessage(user.room, { type: "chat", ...message });
    io.to(user.room).emit("receive_message", message);
  });

  socket.on("typing", (isTyping) => {
    const user = activeUsers.get(socket.id);
    if (!user) return;
    socket.to(user.room).emit("user_typing", { username: user.username, isTyping });
  });

  socket.on("disconnect", () => {
    const user = activeUsers.get(socket.id);
    if (user) {
      if (rooms.has(user.room)) {
        rooms.get(user.room).delete(user.username);
        io.to(user.room).emit("room_users", getRoomUsers(user.room));
        io.to(user.room).emit("system_message", { text: `${user.username} disconnected.`, timestamp: new Date().toISOString() });
      }
      activeUsers.delete(socket.id);
      console.log(`[-] ${user.username} disconnected`);
    }
  });
});

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Murmur server is running", activeUsers: activeUsers.size, rooms: [...rooms.keys()] });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`\n🚀 Murmur server running on http://localhost:${PORT}\n`));