const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Set up Multer for file upload
const upload = multer({ dest: 'uploads/' });

// Route for uploading the HTML file
app.post('/upload', upload.single('htmlFile'), (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  // Simulated response — you will later replace this with real analysis
  const result = {
    message: 'Accessibility check complete!',
    issues: [
      { type: 'missing-alt', detail: 'Image tag without alt text.' },
      { type: 'low-contrast', detail: 'Text with poor contrast ratio.' }
    ]
  };

  res.json(result);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
