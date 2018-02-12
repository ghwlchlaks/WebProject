var JwtStrategy = require('passport-jwt').Strategy
var ExtractJwt = require('passport-jwt').ExtractJwt

var config = require('./database')
const User = require('../models/user')

module.exports = function (passport) {
    var opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
    opts.secretOrKey = config.local_secret
    //opts.issuer = 'accounts.examplesoft.com'
    //opts.audience = 'yoursite.net'
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        console.log('jwt pay load', jwt_payload)
        User.findOne({ 'local.email': jwt_payload.local.email }, function (err, user) {
            if (err) {
                console.log('err')
                return done(err, false)
            }
            if (user) {
                return done(null, user)
            } else {
                console.log('not user')
                return done(null, false)
            }
        })
    }))
}
