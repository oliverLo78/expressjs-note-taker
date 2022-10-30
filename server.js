const express = require('express');

const path = require('path');


// Call express to get the object
const app = express();

// Set the port 
const PORT = 3001;

// First middleware 
app.use(express.static('public'));

// Route to send out Home page
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, 'public/index.html'))
    );

// Route that will serve up the 'public/notes.html
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, 'public/notes.html'))
    );

app.listen(PORT, () =>
    console.log(`Note taker app listening at http://localhost:${PORT}`)
);