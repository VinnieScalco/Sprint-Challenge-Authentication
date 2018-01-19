const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
  // create your user schema here.
  username: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
  }
});

module.exports = mongoose.model('User', UserSchema);
