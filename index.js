var express = require('express')
// var ejsLayouts = require('express-ejs-layouts')
const exphbs = require('express-handlebars')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

var bodyParser = require('body-parser')
var mongoose = require('mongoose')

var app = express()

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

// initialize passport
const passport = require('./config/passport')
app.use(passport.initialize())
// the line below must be AFTER the session setup
app.use(passport.session())

app.use(require('morgan')('dev'))
app.use(bodyParser.urlencoded({ extended: true }))

// change this to express-handlebars
// app.set('view engine', 'ejs')
// app.use(ejsLayouts)
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

app.get('/', function (req, res) {
  if (req.user) {
    return res.send('hide login link')
  }

  res.render('index')
})

app.get('/profile', function (req, res) {
  res.send({
    'currently logged in user': req.user
  })
})

// all the routes variables
const authRoutes = require('./routes/auth_routes')

// app.use('/auth', require('./controllers/auth'))
app.use('/', authRoutes)

const port = process.env.PORT || 3000
var server = app.listen(port, function () {
  console.log('express is running on port ' + port)
})

module.exports = server
