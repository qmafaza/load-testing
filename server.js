const express = require('express');
const multer = require('multer');
const app = express();
const port = 3000;

const upload = multer({ storage: multer.memoryStorage() });

app.post('/upload', upload.single('file'), (req, res) => {
  console.log('📦 Received buffer length:', req.file.buffer.length); // file in memory
  res.status(200).send('✅ File received !');
});

app.listen(port, () => {
  console.log(`🚀 Dummy server running at http://localhost:${port}`);
});
