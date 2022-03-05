const router = require('express').Router();
const { fstat } = require('fs');
const  db  = require('../db/db.json');
const { DBInteractions } = require('../db/dbFunctions')
const fs = require('fs');
const path = require('path');

router.get('/notes', (req, res) => {
    let results = db;
    res.send(results);
});

function createNote (body, noteList) {
    const note = body;
    noteList.push(note);
    fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(noteList))
}

router.post('/notes', (req, res) => {
    // receive new note from request body
    req.body.id = db.length.toString();
    const newNote = req.body;

    createNote(newNote, db)
    res.json(newNote) 
    
});

router.delete('/notes/:id', (req,res) => {
    // read through JSON file
    const id = req.params.id;
    const deletedNote = db.findIndex((note) => {
        return note.id === id;
    });
    const deleted = db.splice(deletedNote, 1);
    console.log(deleted);
    res.json(deleted);
})

module.exports = router;