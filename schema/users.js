const mongoose = require('mongoose');

const Users = mongoose.Schema({
  uid: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  },
  username: {
    type: String,
    default: ""
  },
  imageUrl: {
    type: String,
    default: ""
  },
  gid: {
    type: String,
    default: ""
  },
});

module.exports = mongoose.model('Users', Users);
