const express = require('express');
const router = express.Router();
const User = require('../schema/users');

XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const http = new XMLHttpRequest();

router.get('/', (req, res) => {
  res.send('gets');
});

router.get('/user/:uid', (req, res) => {
  const uid = req.params.uid;
  User.findOne({uid: uid}).then((user) => {
    res.json(user);
  }).catch((err) => {
    console.log(err);
  });
});

module.exports = router;
