const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const mongoose = require("mongoose");

// Create Express app
const app = express();
const server = http.createServer(app);

// Configure Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Serve static files
app.use(express.static(__dirname));

// Home route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Basic in-memory message storage for testing without MongoDB
let messages = [];

// Handle Socket.IO connections
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  // Send previous chat history to newly connected user
  socket.emit('load previous messages', messages.map(msg => ({
    content: msg,
    timestamp: new Date()
  })));
  
  // Handle new messages
  socket.on('chat message', (msg) => {
    console.log('Received message:', msg);
    messages.push(msg);
    io.emit('chat message', msg);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
}); 