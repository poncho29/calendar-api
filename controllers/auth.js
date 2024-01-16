const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

const { generateJwt } = require('../helpers/jwt');

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

    // Generate JWT
    const token = await generateJwt(user.id, user.name);

    res.status(201).json({
      token,
      ok: true,
      msg: 'Usuario creado correctamente',
      user: {
        uid: user.id,
        name: user.name,
      },
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Fallo la creación del usuario',
    });
  }
}

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: 'Crendenciales incorrectas'
      });
    }

    // Valid password
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Crendenciales incorrectas',
      })
    }

    // Generate token
    const token = await generateJwt(user.id, user.name);

    res.json({
      token,
      ok: true,
      msg: 'Inicio de sesión correcto',
      user: {
        uid: user.id,
        name: user.name,
      }
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Fallo el inicio de sesión',
    });
  }
}

const renewToken = async (req, res = response) => {
  const { uid, name } = req;

  // Generate new token
  const token = await generateJwt(uid, name);

  res.json({
    token,
    ok: true,
    msg: 'Renew Token',
    user: {
      uid,
      name
    }
  })
}

module.exports = {
  login,
  register,
  renewToken
}