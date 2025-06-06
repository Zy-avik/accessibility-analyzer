const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());

// Configure multer to store files in /uploads
const upload = multer({ dest: "uploads/" });

// POST endpoint to receive file upload
app.post("/upload", upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log("File uploaded:", req.file.originalname);
    // Placeholder response
    return res.json({ result: "Accessibility check passed ✅" });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ error: "Upload failed on server." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
