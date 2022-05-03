const express = require('express');
const router = express.Router();
const admin = require("firebase-admin");
const options = require('../config/admin');

admin.initializeApp({
  credential: admin.credential.cert(options),
  databaseURL: "https://bdotracker-de2af.firebaseio.com"});
router.get('/', (req, res) => {
  res.send('posts');
});

module.exports = router;
