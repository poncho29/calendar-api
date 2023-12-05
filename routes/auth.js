/**
 * User routes / Auth
 * host + /api/auth
 */

const express = require('express');
const router = express.Router();

const { register, login, renewToken } = require('../controllers/auth');

router.post('/register', register);

router.post('/', login);

router.post('/renew', renewToken);

module.exports = router;