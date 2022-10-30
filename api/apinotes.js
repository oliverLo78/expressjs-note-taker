const apinotes = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');

// Helper method for generating unique ids
const uuid = require('./helpers/uuid');
const { Console } = require('console');

const PORT = 3001;

// Middleware so we can post from the body
apinotes.use(express.json())
apinotes.use(express.urlencoded({ extended: true }));

apinotes.use(express.static('public'));

// Get route for the homepage
apinotes.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET request for notes data
apinotes.get('/api/notes', (req, res) => {
    // Send a message to the client
    // res.json(`${req.method} request received to get notes`);
    res.json(path.join(__dirname, '/public/notes.html'))
    // log our request to the terminal
    console.info(`${req.method} request received to get notes`);

});

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

/**
 * Function to write data to the JSON file given a destination and some content
 * @param {string} destination The file you want to write to.
 * @param {object} content The content you want to write to the file
 * @returns {void} Nothing
 */
const writeToFile = (destination, content) =>
    fs.writeFile(destination, JSON.stringify(content, null, 3), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
    );

// POST request to add a note
apinotes.post('/api/notes', (req, res) => {
    // log that a POST request was received 
    console.info(`${req.method} request received to add a note`);

    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;

    // If all the required properties are present
    if (title && text) {
        const newNote = {
            title,
            text,
            note_id: uuid(),
        };

        // Convert the data to a string so we can save it
        const noteString = JSON.stringify(newNote);

        // Write the string to a file
        fs.readFile(`./db/db.json`, 'utf8', noteString, (err) => {
        if (err) { 
             console.error(err);
        } else {
           // Convert sring to JSON object
           const parsedNote = JSON.parse(data);
        
        // Add a new note
        parsedNote.push(newNote);

        // Write updated reviews back to the file
        fs.writeFile(
            './db/db.json',
            JSON.stringify(parsedNote, null, 3),
            (writeErr) =>
                writeErr
                ? console.error(err)
                : console.log(`Successfully added the note!`)
            );
        }
    });

        const response = {
            status: 'success',
            body: newNote,
        };

        console.log(response);
        res.status(201).json(response);
    } else {
        res.status(500).json('Error in posting note');
    }
});

apinotes.listen(PORT, () => 
    console.log(`Apinotes listening at http://localhost:${PORT} 🚀`)
);