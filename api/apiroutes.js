const apirouter = require('express').Router();
const fs = require('fs');
const path = require('path');
const uuid = require('../helpers/uuid');

// Path to the db.json file
const dbPath = path.join(__dirname, '../db/db.json');

// Helper function to read the db.json file
const readDb = () => {
  const data = fs.readFileSync(dbPath, 'utf8');
  return JSON.parse(data);
};

// Helper function to write to the db.json file
const writeDb = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// GET /notes - Fetch all notes
apirouter.get('/notes', (req, res) => {
  try {
    const db = readDb();
    res.json(db);
  } catch (err) {
    console.error('Error reading db.json:', err);
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});

// GET /notes/:id - Fetch a single note by ID
apirouter.get('/notes/:id', (req, res) => {
  try {
    const db = readDb();
    const note = db.find((n) => n.id === req.params.id);
    if (note) {
      res.json(note);
    } else {
      res.status(404).json({ error: 'Note not found' });
    }
  } catch (err) {
    console.error('Error fetching note:', err);
    res.status(500).json({ error: 'Failed to fetch note' });
  }
});

// POST /notes - Add a new note
apirouter.post('/notes', (req, res) => {
  try {
    const { title, text } = req.body;

    // Validate request body
    if (!title || !text) {
      return res.status(400).json({ error: 'Title and text are required' });
    }

    // Create a new note
    const newNote = {
      title,
      text,
      id: uuid(), // Generate a unique ID
    };

    // Add the new note to the db
    const db = readDb();
    db.push(newNote);
    writeDb(db);

    res.json({ message: 'Note added successfully 🚀', note: newNote });
  } catch (err) {
    console.error('Error adding note:', err);
    res.status(500).json({ error: 'Failed to add note' });
  }
});

// DELETE /notes/:id - Delete a note by ID
apirouter.delete('/notes/:id', (req, res) => {
  try {
    const db = readDb();
    const noteIndex = db.findIndex((n) => n.id === req.params.id);

    if (noteIndex === -1) {
      return res.status(404).json({ error: 'Note not found' });
    }

    // Remove the note from the db
    db.splice(noteIndex, 1);
    writeDb(db);

    res.json({ message: 'Note deleted successfully' });
  } catch (err) {
    console.error('Error deleting note:', err);
    res.status(500).json({ error: 'Failed to delete note' });
  }
});

module.exports = apirouter;
        