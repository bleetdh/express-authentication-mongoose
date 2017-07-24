var express = require('express')
// var ejsLayouts = require('express-ejs-layouts')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var app = express()
const exphbs = require('express-handlebars')

if (process.env.NODE_ENV === 'test') {
  mongoose.connect('mongodb://localhost/express-authentication-test')
} else {
  mongoose.connect('mongodb://localhost/express-authentication')
}

// app.set('view engine', 'ejs')

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
