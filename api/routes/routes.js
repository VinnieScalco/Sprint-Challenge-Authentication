const {
  authenticate,
  encryptUserPW,
  compareUserPW
} = require('../utils/middlewares');

const {
  getAllJokes,
  createUser,
  login
} = require('../controllers/index');

const router = require('express').Router();

router.post('/jokes', authenticate, getAllJokes);
router.post('/users', encryptUserPW, createUser);
router.post('/login', compareUserPW, login);

module.exports = router;