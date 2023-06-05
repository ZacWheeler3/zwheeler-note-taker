const apiRouter = require('express').Router();
const notesRouter = require('notes');
apiRouter.use('/notes', notesRouter );

module.exports = apiRouter;