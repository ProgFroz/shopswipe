const express = require('express');
const app = express(), bodyParser = require("body-parser");
const connectionDB = require('./connection');
const postsRoute = require('./routes/posts');
const getsRoute = require('./routes/gets');
const path = require('path');
connectionDB();
const PORT = process.env.PORT || 7080;
const fs = require("fs");
const exec = require("child_process").exec;

app.use(express.json());
app.use(express.static(path.join(process.cwd(), 'frontend', 'dist', 'shopswipe')));

app.get('/', (req,res) => {
  res.sendFile(path.join(process.cwd(), 'frontend', 'dist', 'shopswipe', 'index.html'));
});
app.get('/login', (req,res) => {
  console.log(fs.existsSync(path.join(process.cwd(), 'frontend')));
  res.sendFile(path.join(process.cwd(), 'frontend', 'dist', 'shopswipe', 'index.html'))
});
app.get('/home/*', (req,res) => {
  res.sendFile(path.join(process.cwd(), 'frontend', 'dist', 'shopswipe', 'index.html'));
});
app.use('/posts', postsRoute);
app.use('/gets', getsRoute);

app.listen(PORT, () => {
  console.log("Started Server");
});
