const mongoose = require('mongoose');

// MongoDB connection URL
const mongoURI = "mongodb+srv://xxxrachel:heyitsme_02@cluster0.ac62p1p.mongodb.net/chatDB";

async function testConnection() {
  try {
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(mongoURI);
    console.log('MongoDB connection successful!');
    
    // Define a test schema and model
    const TestSchema = new mongoose.Schema({
      name: String,
      testDate: { type: Date, default: Date.now }
    });
    
    const Test = mongoose.model('Test', TestSchema);
    
    // Create a test document
    console.log('Creating test document...');
    const testDoc = new Test({ name: 'Connection Test' });
    await testDoc.save();
    console.log('Test document created successfully: ', testDoc);
    
    // Try to fetch documents
    console.log('Fetching documents...');
    const documents = await Test.find({});
    console.log(`Found ${documents.length} test documents`);
    
    // Close the connection
    await mongoose.connection.close();
    console.log('Connection closed successfully');
    
  } catch (err) {
    console.error('MongoDB connection or operation failed:', err);
  }
}

testConnection(); 