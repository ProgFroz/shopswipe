const mongoose = require('mongoose');
require('dotenv').config();
const URI = process.env.DB_CONNECTION;

const connectionDB = async() => {
  await mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }).catch((err) => {
    console.log('DB Error: ' + err);
  });
  console.log('DB Connected!s');
};
module.exports = connectionDB;
