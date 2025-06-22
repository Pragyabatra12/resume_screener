const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const upload = multer({ dest: path.join(__dirname, '..', 'uploads') });

app.use(express.json());

// Serve frontend static files
app.use(express.static(path.join(__dirname, '..', 'frontend')));

app.post('/upload', upload.single('resume'), (req, res) => {
    const filePath = path.join(__dirname, '..', 'uploads', req.file.filename);
// Change this line in app.js (inside backend folder):
exec(`python3 ../parser/parse_resume.py "${filePath}"`, (error, stdout, stderr) => {

            if (error) return res.status(500).send(stderr);
        res.send(stdout);
    });
});

app.listen(3000, () => console.log('Server started on http://localhost:3000'));


