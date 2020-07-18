const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const cors = require('cors');

const users = require('./app/user');
const places = require('./app/place');
const gallery = require('./app/gallery');
const comments = require('./app/comments');


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const port = 8000;

mongoose.connect(config.database, config.databaseOptions).then(() => {
  app.listen(port, () => {
    app.use('/users', users);
    app.use('/places', places);
    app.use('/gallery', gallery);
    app.use('/comments', comments);
    console.log(`Server started on ${port} port`);
  });
});
