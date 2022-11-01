const express = require('express');
const apirouter = require('./api/apiroutes')
const path = require('path');
const { application } = require('express');
// const htmlroutes = require('htmlroutes.js');

// Call express to get the object
const app = express();

// Set the port 
const PORT = process.env.PORT || 3001;

// First middleware 
app.use(express.static('public'));

// Middleware so we can post from the body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', apirouter);
// app.use('/', htmlroutes);



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