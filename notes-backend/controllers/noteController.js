const Note = require("../models/noteModel");

exports.getNotes = async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
};

exports.createNote = async (req, res) => {
  const note = new Note({
    text: req.body.text,
  });

  const savedNote = await note.save();
  res.json(savedNote);
};

exports.deleteNote = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: "Note deleted" });
};

exports.updateNote = async (req, res) => {
  const note = await Note.findByIdAndUpdate(
    req.params.id,
    { text: req.body.text },
    { new: true },
  );

  res.json(note);
};
