const express = require('express');
const router = express.Router();

XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const http = new XMLHttpRequest();

router.get('/', (req, res) => {
  res.send('gets');
});

module.exports = router;
