/**
 * User routes / Auth
 * host + /api/auth
 */

const express = require('express');
const { check } = require('express-validator');

const router = express.Router();

const { validFields } = require('../middlewares/validFields');
const { register, login, renewToken } = require('../controllers/auth');

router.post(
  '/register',
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'El email debe ser valido').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe contener minimo 6 caracteres').isLength({ min: 6 }),
    validFields
  ],
  register
);

router.post(
  '/',
  [
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe contener minimo 6 caracteres').isLength({ min: 6 }),
    validFields
  ],
  login
);

router.get('/renew', renewToken);

module.exports = router;