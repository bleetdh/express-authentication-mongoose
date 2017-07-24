const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bcrypt = require('bcrypt')

const userSchema = new Schema({
  name: String,
  email: String,
  password: String
})

userSchema.pre('save', function (next) {
  var user = this // this = the newUser obj instance

  if (!user.isModified('password')) return next()

  // hash the password
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) return next(err)

    user.password = hash
    next() // call the save function
  })
})

const User = mongoose.model('User', userSchema)

module.exports = User
