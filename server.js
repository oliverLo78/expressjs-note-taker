const express = require('express');
const path = require('path');
const apirouter = require('./api/apiroutes');
// const htmlroutes = require('./routes/htmlroutes'); // Uncomment if you modularize HTML routes

// Initialize Express app
const app = express();

// Set the port
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.static('public')); // Serve static files from the 'public' directory
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(express.json()); // Parse JSON request bodies

// API Routes
app.use('/api', apirouter);

// HTML Routes
// app.use('/', htmlroutes); // Uncomment if you modularize HTML routes

// Serve the home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Serve the notes page
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'));
});

// Catch-all route for 404 errors
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public/404.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Note taker app listening at http://localhost:${PORT}`);
});