var FBUser = require('../models/user').FBUser
var fbConfig = require('../config/fbConfig')
var FacebookStrategy = require('passport-facebook')

module.exports = function (passport) {
    passport.use(new FacebookStrategy({
        clientID: fbConfig.clientID,
        clientSecret: fbConfig.clientSecret,
        callbackURL: fbConfig.callbackURL
    }, function (accessToken, refreshToken, profile, done) {
        FBUser.findOrCreate({ email: profile.id }, function (err, user) {
            console.log(profile)
            return done(err, user)
        })
    }))
}