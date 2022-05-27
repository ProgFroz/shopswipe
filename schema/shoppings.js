const mongoose = require('mongoose');

const Shoppings = mongoose.Schema({
  sid: {
    type: String,
    required: true
  },
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
  },
});

module.exports = mongoose.model('Shoppings', Shoppings);
