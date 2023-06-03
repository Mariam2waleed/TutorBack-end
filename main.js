const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();

// Replace the connection string with your own
const uri = "mongodb+srv://mariam2waleed:Mariamdalia22!@<cluster>.mongodb.net/TutorDB?retryWrites=true&w=majority";

// Connect to the MongoDB database
MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client) {
  if (err) throw err;
  console.log("Connected to MongoDB");

  // Get a reference to the database
  const db = client.db("<database>");

  // Insert a test document
  const collection = db.collection('test');
  collection.insertOne({ name: 'John Doe', email: 'johndoe@example.com' }, function(err, result) {
    if (err) throw err;
    console.log("Inserted document with ID:", result.insertedId);

    // Find the test document
    collection.findOne({ name: 'John Doe' }, function(err, document) {
      if (err) throw err;
      console.log("Found document:", document);

      // Close the MongoDB connection
      client.close();
    });
  });
});

// Start the Express server
app.listen(3000, function() {
  console.log("Server started on port 3000");
});