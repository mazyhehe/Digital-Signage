const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public')); // Serve static files
app.use(fileUpload());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    
    let uploadedFile = req.files.uploadedFile;
    let uploadPath = __dirname + '/public/uploads/' + uploadedFile.name;

    uploadedFile.mv(uploadPath, function(err) {
        if (err)
            return res.status(500).send(err);
        res.send('File uploaded to ' + uploadPath);
    });
});

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});
