const express = require("express");
const router = express.Router();

// Add a new entry
router.post("/", (req, res) => {
  res.status(200).json({ message: "Entry added successfully!" });
});

// Get all entries
router.get("/", (req, res) => {
  res.status(200).json([{ title: "Test Entry", description: "This is a sample entry." }]);
});

module.exports = router;

