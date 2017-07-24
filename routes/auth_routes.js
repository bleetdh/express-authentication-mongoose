var express = require('express')
var router = express.Router()

const authController = require('../controllers/auth_controllers')

const passport =
require('../config/passport')

// path name
router.get('/register', function (req, res) {
  res.render('auth/signup') // view name
})

router.get('/login', function (req, res) {
  res.render('auth/login')
})

// passport.authenticate(<name of the strategy>, <post auth configuration, an obj>)

router.post('/login',
 passport.authenticate('local', {
   successRedirect: '/profile',
   failureRedirect: '/register'
 }))

router.post('/register', authController.register)

module.exports = router
