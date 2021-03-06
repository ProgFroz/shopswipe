const express = require('express');
const router = express.Router();
const User = require('../schema/users');
const Group = require('../schema/groups');
const Shopping = require('../schema/shoppings');
const Finances = require('../schema/finances');

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

router.get('/user/:uid', (req, res) => {
  const uid = req.params.uid;
  User.findOne({uid: uid}).then((user) => {
    res.json(user);
  }).catch((err) => {
    console.log(err);
  });
});

router.get('/groups/:gid', (req, res) => {
  const gid = req.params.gid;
  Group.findOne({gid: gid}).then((group) => {
    res.json(group);
  }).catch((err) => {
    console.log(err);
  });
});

router.get('/groups/:gid/members', (req, res) => {
  const gid = req.params.gid;
  Group.findOne({gid: gid}).then((group) => {
    if (group) {
      User.find({gid: gid}).then((users) => {
        res.json(users);
      })
    }

  }).catch((err) => {
    console.log(err);
  });
});

router.get('/groups/code/:code', (req, res) => {
  const code = req.params.code;
  Group.findOne({code: code}).then((group) => {
    res.json(group);
  }).catch((err) => {
    console.log(err);
  });
});

router.get('/shopping/:gid', (req, res) => {
  const gid = req.params.gid;
  Shopping.findOne({gid: gid}).then((list) => {
    res.json(list);
  }).catch((err) => {
    console.log(err);
  });
});

router.get('/finances/:gid', (req, res) => {
  const gid = req.params.gid;
  Finances.findOne({gid: gid}).then((finances) => {
    res.json(finances);
  }).catch((err) => {
    console.log(err);
  });
});

module.exports = router;
