const express = require('express');

const verifyJWT = require('../middleware/verifyJWT');
const {
  getAllNotes,
  createNewNote,
  updateNote,
  deleteNote,
} = require('../controllers/notesController');

const router = express.Router();

router.use(verifyJWT);

router
  .route('/')
  .get(getAllNotes)
  .post(createNewNote)
  .patch(updateNote)
  .delete(deleteNote);

module.exports = router;
