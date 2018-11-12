const express = require('express');
const app = express();

const postRoutes = require('./api/routes/posts');
const commentRoutes = require('./api/routes/comments');


app.use('/posts', postRoutes);
app.use('/comment', commentRoutes);

module.exports = app;