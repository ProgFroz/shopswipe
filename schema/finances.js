const mongoose = require('mongoose');

const Finances = mongoose.Schema({
  gid: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  },
  elements: {
    type: Array,
    default: []
  }
});

module.exports = mongoose.model('Finances', Finances);
