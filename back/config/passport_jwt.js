var JwtStrategy = require('passport-jwt').Strategy
var ExtractJwt = require('passport-jwt').ExtractJwt

const User = require('../models/user')
// const config = require('./databse')

module.exports = function (passport) {
  var opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
  opts.secretOrKey = 'secret'
  opts.issuer = 'accounts.examplesoft.com'
  opts.audience = 'yoursite.net'

  passport.use(new JwtStrategy(opts, function (payload, done) {
    console.log('jwt pay load', payload)
    User.findOne({id: payload.id}, function (err, user) {
      if (err) {
        return done(err, false)
      }
      if (user) {
        return done(null, user)
      } else {
        return done(null, false)
      }
    })
  }))
}
