const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/userModels');
const { mysecret } = require('../../config');
const SaltRounds = 11;

const authenticate = (req, res, next) => {
  const token = req.get('Authorization');
  if (token) {
    jwt.verify(token, mysecret, (err, decoded) => {
      if (err) return res.status(422).json(err);
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(403).json({
      error: 'No token provided, must be set on the Authorization Header'
    });
  }
};

const encryptUserPW = (req, res, next) => {

  bcrypt.genSalt(SaltRounds, (err, salt) => {
    if (err) {
      return res.status(422).json(err);
    }
    bcrypt.hash(req.body.password, salt, (error, hash) => {
      if (error) {
        return res.status(422).json(error);
      }

      req.passwordHash = hash
      next();
    });
  });

  // https://github.com/kelektiv/node.bcrypt.js#usage
  // TODO: Fill this middleware in with the Proper password encrypting, bcrypt.hash()
  // Once the password is encrypted using bcrypt, you'll need to save the user the DB.
  // Once the user is set, take the savedUser and set the returned document from Mongo on req.user
  // call next to head back into the route handler for encryptUserPW
};

const compareUserPW = async (req, res, next) => {
  try {

    const { username, password } = req.body;
    const zeUser = await User.findOne({ username });

    bcrypt.compare(password, zeUser.passwordHash, (err, check) => {
      if(err) {
        console.log("ERR HERE");
        return res.status(422).json(err);
      }

      req.username = zeUser.username
      next();
    });

  } catch (e) {
    console.log("ERROR HERE: ", e);
    return res.status(422).json(e);
  }

  // https://github.com/kelektiv/node.bcrypt.js#usage
  // TODO: Fill this middleware in with the Proper password comparing, bcrypt.compare()
  // You'll need to find the user in your DB
  // Once you have the user, you'll need to pass the encrypted pw and the plaintext pw to the compare function
  // If the passwords match set the username on `req` ==> req.username = user.username; and call next();
};

module.exports = {
  authenticate,
  encryptUserPW,
  compareUserPW
};