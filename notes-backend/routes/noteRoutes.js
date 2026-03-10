const express = require("express");
const router = express.Router();

const {
  getNotes,
  createNote,
  deleteNote,
  updateNote,
} = require("../controllers/noteController");

router.get("/", getNotes);
router.post("/", createNote);
router.delete("/:id", deleteNote);
router.patch("/:id", updateNote);

module.exports = router;
