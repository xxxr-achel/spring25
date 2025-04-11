const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
// Configure Socket.IO to allow connections from any origin
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
const mongoose = require("mongoose");

// MongoDB connection URL - use environment variable or direct configuration
const mongoURI = "mongodb+srv://xxxrachel:<db_password>@cluster0.ac62p1p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Message model definition
const messageSchema = new mongoose.Schema({
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model("Message", messageSchema);

// Serve static files
app.use(express.static(__dirname));

// Home route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle Socket.IO connections
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  // Send previous chat history to newly connected user
  Message.find({})
    .sort({ timestamp: 1 })
    .then(messages => {
      console.log('Sending message history to client:', messages.length, 'messages');
      socket.emit('load previous messages', messages);
    })
    .catch(err => {
      console.error('Failed to fetch message history:', err);
    });

  // Handle new messages
  socket.on('chat message', (msg) => {
    console.log('Received message:', msg);
    
    // Create and save new message
    const message = new Message({ content: msg });
    message.save()
      .then(savedMessage => {
        // Broadcast message to all clients
        console.log('Broadcasting message to all clients');
        io.emit('chat message', msg);
        console.log('Message saved:', savedMessage);
      })
      .catch(err => {
        console.error('Failed to save message:', err);
        socket.emit('error', 'Unable to save message');
      });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Add error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).send('Something broke!');
});

// Async server and MongoDB connection startup
async function startServer() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoURI);
    console.log('MongoDB connection successful');
    
    server.listen(3000, () => {
      console.log('Server running at http://localhost:3000');
    });
  } catch (err) {
    console.error('MongoDB connection failed:', err);
  }
}

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
});

startServer(); 