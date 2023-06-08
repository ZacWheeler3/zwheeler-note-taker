const express = require("express");
const notes = express.Router();
const fs = require(`fs`);
const util = require(`util`);
const uuid = require(`../../helpers/uuid`);
// const savedNoteRouter = require(`./savedNote.js`);
const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) => {
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
    );
};

const readAndAppend = (content, file) => {
    fs.readFile(file, `utf8`, (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            writeToFile(file, parsedData);
        }
    });
};

// notes.use(`/savedNote`, savedNoteRouter);

notes.get(`/`, (req, res) => {
    readFromFile(`./db/db.json`).then((data) => {
        const notes = JSON.parse(data);
        res.json(notes);
    });
});

notes.post("/", (req, res) => {
    console.log(req.body);
    const { text, title} =req.body

    if (req.body) {
        const notes = {
            title,
            text,
            note_id: uuid(),
        };
        readAndAppend(notes, "./db/db.json");
        res.json(`Tip added successfully`);
    } else {
        res.error("error in adding note");
    }
    });
    module.exports = notes;



// const notesRouter = require('express').Router();
// notesRouter.get('/', (req, res)=>{
    
// })
// module.exports = notesRouter;