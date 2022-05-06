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

router.post('/user/update', (req, res) => {
  const u = new User({
    uid: req.body.uid,
    email: req.body.email,
    date: req.body.date,
    username: req.body.username,
    imageUrl: req.body.imageUrl,
    gid: req.body.gid,
  });
  User.findOne({uid: req.body.uid}).then((e) => {
    if (e) {
      e.uid = req.body.uid;
      e.email = req.body.email;
      e.date = req.body.date;
      e.username = req.body.username;
      e.imageUrl = req.body.imageUrl;
      e.gid = req.body.gid;
      e.save().then((data) => {
        res.json(data);
      }).catch(err => {
        res.json({message: err});
      })
    }
    else {
      u.save().then((data) => {
        res.json(data);
      }).catch(err => {
        res.json({message: err});
      });
    }
  })
});

module.exports = router;
