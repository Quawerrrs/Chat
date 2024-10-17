const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

// Liste des origines autorisées
const allowedOrigins = [
  "http://localhost:3000", // Ancien port de ton client
  "http://localhost:5173", // Nouveau port de ton client
];

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Un utilisateur s'est connecté");

  socket.on("foo", (message) => {
    console.log("Message reçu du client:", message);
    io.emit("foo", message); // Émettre le message à tous les clients
  });

  socket.on("disconnect", () => {
    console.log("Un utilisateur s'est déconnecté");
  });
});

// Le serveur écoute sur le port 4000
server.listen(4000, () => {
  console.log("Serveur Socket.IO en écoute sur le port 4000");
});
