const express = require("express");
const http = require("http");
const path = require("path");
const mongoose = require("mongoose");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/realtime_chat";

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const messageSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true, maxlength: 30 },
    message: { type: String, required: true, trim: true, maxlength: 500 }
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

app.get("/api/messages", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: 1 }).limit(100);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Unable to load messages" });
  }
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

io.on("connection", (socket) => {
  socket.on("chat:message", async (data) => {
    try {
      const username = String(data?.username || "").trim();
      const message = String(data?.message || "").trim();

      if (!username || !message) return;

      const savedMessage = await Message.create({ username, message });
      io.emit("chat:message", savedMessage);
    } catch (error) {
      socket.emit("chat:error", { error: "Message could not be saved" });
    }
  });
});

async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    server.listen(PORT, () => {
      console.log(`Chat server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  start();
}

module.exports = { app, server, Message };
