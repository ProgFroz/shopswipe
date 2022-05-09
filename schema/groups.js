const mongoose = require('mongoose');

const Groups = mongoose.Schema({
  gid: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  },
  name: {
    type: String,
    required: true
  },
  owner: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('Groups', Groups);
