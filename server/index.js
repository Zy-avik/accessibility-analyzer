const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const cheerio = require("cheerio");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Multer config
const upload = multer({ dest: "uploads/" });

// Upload route
app.post("/upload", upload.single("file"), (req, res) => {
  const filePath = req.file.path;

  // Read uploaded HTML file
  fs.readFile(filePath, "utf-8", (err, html) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read uploaded file." });
    }

    const $ = cheerio.load(html);

    // Count images without alt
    const imagesWithoutAlt = $("img").filter((i, el) => !$(el).attr("alt")).length;

    // Count inputs without labels
    const inputs = $("input");
    let inputsWithoutLabel = 0;

    inputs.each((i, el) => {
      const id = $(el).attr("id");
      if (!id || $(`label[for="${id}"]`).length === 0) {
        inputsWithoutLabel++;
      }
    });

    // Delete uploaded file after parsing
    fs.unlink(filePath, () => {});

    // Send results to frontend
    return res.json({
      imagesWithoutAlt,
      inputsWithoutLabel
    });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
