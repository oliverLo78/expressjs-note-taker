const express = require('express');
const path = require('path');
const { addAbortSignal } = require('stream');

// Call express to get the object
const app = require();

// Set the port 
const PORT = 3001;

// First middleware 
app.use(express.static('public'));

// Root route -- HOME SLICE
app.get('/', (req, res) => res.send('Navigate to /send or /routes'));

// Route to send out Home page
app.get('/api/notes', (req, res) => 
    res.sendFile(path.join(__dirname, 'public/sendFile.html'))
    );
