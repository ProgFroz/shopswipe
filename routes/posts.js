const express = require('express');
const router = express.Router();
const admin = require("firebase-admin");
const options = require('../config/admin');
const User = require('../schema/users');
const Group = require('../schema/groups');

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
      e.uid = req.body.uid ? req.body.uid : e.uid;
      e.email = req.body.email ? req.body.email : e.email;
      e.date = req.body.date ? req.body.date : e.date;
      e.username = req.body.username ? req.body.username : e.username;
      e.imageUrl = req.body.imageUrl ? req.body.imageUrl : e.imageUrl;
      e.gid = req.body.gid ? req.body.gid : e.gid;
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
router.post('/user/updateGroupId', (req, res) => {
  User.findOne({uid: req.body.uid}).then((e) => {
    if (e) {
      e.gid = req.body.gid;
      e.save().then((data) => {
        res.json(data);
      }).catch(err => {
        res.json({message: err});
      })
    }
  })
});
router.post('/groups/update', (req, res) => {
  const u = new Group({
    gid: req.body.gid,
    name: req.body.name,
    date: req.body.date,
    owner: req.body.owner,
    members: req.body.members,
    code: req.body.code
  });
  Group.findOne({gid: req.body.gid}).then((e) => {
    if (e) {
      e.gid = req.body.gid;
      e.name = req.body.name;
      e.date = req.body.date;
      e.owner = req.body.owner;
      e.members = req.body.members;
      e.code = req.body.code;
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
