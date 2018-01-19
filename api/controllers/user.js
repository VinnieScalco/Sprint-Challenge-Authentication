const User = require('../models/userModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { mysecret } = require('../../config');

const createUser = (req, res) => {
  const { username } = req.body;
  const passwordHash = req.passwordHash;

  User.findOne({ where: { username } })
    .then(taken => {
      if (taken !== null) {
        if (taken.username && taken.username === username) {
          res.status(200);
          res.json({"warning": "USER ALREADY IN DB"});
          return;
        }
      }
    })
  User.create({
    username,
    passwordHash,
  })
  .then(newUser => {
    const payload = { username };

    const token = jwt.sign(payload, mysecret);

    res.json({user: newUser.username, token });
  })
  .catch(err => {
    res.status(422);
    res.json({ 'Need both username and password': err.message });
  })
};

module.exports = {
  createUser
};