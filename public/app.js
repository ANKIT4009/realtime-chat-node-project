const socket = io();

const form = document.getElementById("chatForm");
const username = document.getElementById("username");
const message = document.getElementById("message");
const messages = document.getElementById("messages");

function addMessage(data) {
  const item = document.createElement("div");
  item.className = "message";
  item.textContent = `${data.username}: ${data.message}`;
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
}

fetch("/api/messages")
  .then((response) => response.json())
  .then((data) => data.forEach(addMessage))
  .catch(() => {});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = username.value.trim();
  const text = message.value.trim();

  if (!name || !text) return;

  socket.emit("chat:message", {
    username: name,
    message: text
  });

  message.value = "";
  message.focus();
});

socket.on("chat:message", addMessage);
