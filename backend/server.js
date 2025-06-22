const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.json());
app.use(express.static('frontend'));

app.post('/upload', upload.single('resume'), (req, res) => {
    const filePath = path.join(__dirname, '..', req.file.path);
    exec(`python3 parser/screener.py "${filePath}"`, (error, stdout, stderr) => {
        if (error) return res.status(500).send(stderr);
        res.send(stdout);
    });
});

app.listen(3000, () => console.log('Server started on http://localhost:3000'));

