const router = require('express').Router();
const uuid = require('../helpers/uuid');
const fs = require('fs');
const util = require('util');
const readFile=util.promisify(fs.readFile)
const writeFile=util.promisify(fs.writeFile)
const getNotes=()=> {
  return readFile('db/db.json','utf-8').then(rawNotes => [].concat(JSON.parse(rawNotes)))
}

// GET Route for retrieving all the feedback
router.get('/', (req, res) =>
  getNotes().then(notes => res.json(notes))
);


router.post('/', (req, res) => {
    console.log(req.body);
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        id: uuid(),
      };
  
      // readAndAppend(newNote, 'db/db.json');
      getNotes().then(oldNotes => oldNotes.concat(newNote)).then(newNotes => {
        writeFile('db/db.json', JSON.stringify(newNotes)).then(()=>res.json(`Note successfully added!✨`))
      })
      // res.json(`Note successfully added!✨`);
    } else {
      res.error('Error in adding note');
    }
  });

router.delete('/:id', (req, res)=> {
  getNotes().then(oldNotes => {
    let filteredNotes=oldNotes.filter(note => note.id !==req.params.id)
    writeFile('db/db.json', JSON.stringify(filteredNotes)).then(()=>res.json(`Note successfully added!✨`))
  }).catch(err => res.json(err))

})


module.exports = router;