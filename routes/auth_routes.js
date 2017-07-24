var express = require('express')
var router = express.Router()
const authController = require('../controllers/auth_controllers')

const passport = require('../config/passport')

router.get('/register', function (req, res) {
  res.render('auth/signup')
})

router.get('/login', function (req, res) {
  res.render('auth/login')
})

// default is username and pw
// passport.authenticate(<name of the strategy>, <post auth config, an obj>)
router.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/register'
})) // 'local' is default

router.post('/register', authController.register)

module.exports = router
