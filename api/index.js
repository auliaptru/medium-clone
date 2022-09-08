const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
const postsRoutter = require('./routes/posts');
const usersRouter = require('./routes/users');
const categoryRouter = require('./routes/categories');
const multer = require('multer');
const path = require('path');

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '/images')));

mongoose
    .connect('mongodb://localhost/medium-clone')
    .then(console.log('Connected to MongoDB'))
    .catch((err) => console.log(err));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});

const upload = multer({ storage });
app.post('/api/upload', upload.single('file'), (req, res) => {
    res.status(200).json('File berhasil ditambahkan!');
});

app.use('/api/auth', authRouter);
app.use('/api/posts', postsRoutter);
app.use('/api/users', usersRouter);
app.use('/api/categories', categoryRouter);

app.listen('5000', () => {
    console.log('Port is running');
});
