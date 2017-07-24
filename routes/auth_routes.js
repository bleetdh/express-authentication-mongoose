var express = require('express')
var router = express.Router()
const authController = require('../controllers/auth_controllers')

router.get('/register', function (req, res) {
  res.render('auth/signup')
})

router.get('/login', function (req, res) {
  res.render('auth/login')
})

router.post('/register', authController.register)

module.exports = router
