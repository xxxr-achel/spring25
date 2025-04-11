# Socket.IO Chat Application

A real-time chat application based on Socket.IO and MongoDB.

## Features

- Real-time message delivery
- Message history stored in MongoDB database
- Connection status indicators
- Responsive design for different device sizes
- Error handling and status notifications

## Installation

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Make sure you have set up MongoDB connection
   - Update the MongoDB connection URI in `index.js` with your own connection string

## Running the Application

There are two ways to run the application:

### Option 1: Full version with MongoDB

```bash
npm start
```

### Option 2: Simple version (no MongoDB, in-memory storage)

```bash
npm run simple
```

The application will run at http://localhost:3000.

## Troubleshooting

If you see "Failed to initialize socket connection" error:

1. Make sure you're accessing the app from http://localhost:3000 directly
2. If you're using Live Server or another development server, try the simple version:
   ```
   npm run simple
   ```
3. Check console logs for connection errors
4. Make sure MongoDB credentials are correct if using the full version

### CORS Issues

If you're accessing the application from a different origin (like 127.0.0.1:5501), 
you might encounter CORS errors. The application has been configured to allow 
cross-origin requests, but it's best to access it directly at http://localhost:3000.

## Code Structure

- `index.js` - Server-side code with MongoDB integration
- `server.js` - Simplified server for testing without MongoDB
- `index.html` - Main client application
- `simple.html` - Simplified client for testing
- `db-test.js` - Script to test MongoDB connection

## Technology Stack

- Node.js
- Express.js
- Socket.IO
- MongoDB
- Mongoose

## Fixed Issues

The original code had the following issues, which have been fixed:

1. MongoDB Connection Issues
   - Fixed connection timing issues, ensuring database connection before server startup
   - Added error handling

2. Socket.IO Event Handling
   - Fixed message event handling logic
   - Added history message loading functionality

3. User Experience Enhancements
   - Improved UI design
   - Added status and error notifications
   - Added timestamp display
   - Optimized display for mobile devices

## Notes

- Make sure your MongoDB instance is running and accessible
- Check your MongoDB URI and network settings if you have connection issues 