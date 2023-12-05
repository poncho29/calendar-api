const { response } = require('express');

const register = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'Register'
  })
}

const login = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'Login'
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