const Entry = require('../models/Entry');

exports.getEntries = async (req, res) => {
  const entries = await Entry.find({ user: req.user._id });
  res.json(entries);
};

exports.addEntry = async (req, res) => {
  const newEntry = await Entry.create({ ...req.body, user: req.user._id });
  res.status(201).json(newEntry);
};

exports.deleteEntry = async (req, res) => {
  await Entry.findByIdAndDelete(req.params.id);
  res.json({ message: 'Entry deleted' });
};
