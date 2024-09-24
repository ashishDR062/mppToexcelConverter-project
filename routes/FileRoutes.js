const express = require("express");
const router = express.Router();
const fileController = require("../controllers/FileController");

// Endpoint to manually trigger conversion
router.post("/convert", async (req, res) => {
  try {
    const { mppFilePath } = req.body; // Pass .MPP file path in request body
    await fileController.handleFileConversion(mppFilePath);
    res.status(200).send("File converted and compressed successfully.");
  } catch (error) {
    res.status(500).send("Error during conversion.");
  }
});

module.exports = router;
