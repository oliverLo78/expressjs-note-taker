const apirouter = require('express').Router();
const app = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');

// an array of objects stringify
let db = require('../db/db.json');

// const express = require();

// Helper method for generating unique ids
const uuid = require('../helpers/uuid');

const PORT = 3001;

apirouter.get('/notes', (req, res) => {
    db = JSON.parse(fs.readFileSync('./db/db.json'));
    // res.json sending data html file
    res.json(db)
});

 apirouter.get('/notes/:id', (req, res) => {
     res.send('Got a individual note request at /notes')
});

// POST request to add a note when a new note comes this route will append
apirouter.post('/notes', (req, res) => {
    // log that a POST request was received 
    console.log(`${req.method} request received to add a note`);

    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;

    // If all the required properties are present
    if (title && text) {
        const newNote = {
            title,
            text,
            id: Math.floor((1 + Math.random())  *10000),
        };
        db.push(newNote);

        // readAndAppend(newNote, './db/db.json');
        res.json('Note added successfully 🚀');
        
        // res.error('Error in adding note!');
        }
   
        // Write updated reviews back to the file the append part
        fs.writeFile(
            './db/db.json',
            JSON.stringify(db, null, 3),
            (writeErr) =>
                writeErr
                ? console.error(err)
                : console.log(`Successfully added the note!`)
            );
            res.json(db);
        });

// DELETE request to delete a note when a new note comes this route 
apirouter.delete('/notes/:id', (req, res) => {
    res.send('Got a delete note request at /notes')
});

module.exports = apirouter;

        