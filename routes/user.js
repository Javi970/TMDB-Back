const express = require('express')
const { generateToken } = require('../config/token')
const validateUser = require('../middlewares/validateUser')
const router = express.Router()
const { User } = require('../models/index')

//ruta para crear un usuario
router.post('/register', (req, res) => {
  const { name, email, password } = req.body
  User.create({
    name: name.toLowerCase(),
    email: email.toLowerCase(),
    password,
  })
    .then((usuarioNuevo) => {
      res.send(usuarioNuevo)
    })
    .catch((err) => {
      console.log(err)
      res.send(400)
    })
})

//ruta para loguearse
router.post('/login', (req, res) => {
  const { email, password } = req.body
  User.findOne({ where: { email } }).then((user) => {
    if (!user) return res.send(400)
    user.validatePassword(password).then((isValid) => {
      if (!isValid) return res.send(400)
      const payload = {
        id: user.id,
        email: user.email,
        name: user.name,
        /* id: user.id, */
      }
      const token = generateToken(payload)
      res.send([payload, token])
    })
  })
})

router.post('/me', validateUser, (req, res) => {
  res.send(req.user)
})

//ruta para desloguearse
router.post('/logOut', (req, res) => {
  res.clearCookie('token')
  res.sendStatus(204)
})

module.exports = router
