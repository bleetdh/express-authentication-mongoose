var express = require('express')
// var ejsLayouts = require('express-ejs-layouts')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var app = express()
const exphbs = require('express-handlebars')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

if (process.env.NODE_ENV === 'test') {
  mongoose.connect('mongodb://localhost/express-authentication-test')
} else {
  mongoose.connect('mongodb://localhost/express-authentication')
}

// setup express session
app.use(session({
  store: new MongoStore({
    url: 'mongodb://localhost/express-authentication'
  }),
  secret: 'foo',
  resave: false,
  saveUninitialized: true
}))

// initialise passport
const passport = require('./config/passport')
app.use(passport.initialize())
// the line bewlow must be after the session setup
app.use(passport.session())

app.use(require('morgan')('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(ejsLayouts)
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

app.get('/', function (req, res) {
  res.render('index')
})

app.get('/profile', function (req, res) {
  res.render('profile')
})

const authRoutes = require('./routes/auth_routes')

app.use('/', authRoutes)

const port = process.env.PORT || 3000
var server = app.listen(port, function () {
  console.log('express is running on port ' + port)
})

module.exports = server
