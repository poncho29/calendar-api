const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

const register = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: 'Un usuario existe con ese correo',
      })
    }

    user = new User(req.body);

    // Encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    res.status(201).json({
      ok: true,
      msg: 'Usuario creado correctamente',
      user: {
        uid: user.id,
        name: user.name,
      }
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Fallo la creación del usuario',
    });
  }
}

const login = (req, res = response) => {
  const { email, password } = req.body;

  res.json({
    ok: true,
    msg: 'Login',
    email,
    password
  })
}

const renewToken = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'Renew Token'
  })
}

module.exports = {
  login,
  register,
  renewToken
}