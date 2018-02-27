var FBUser = require('../models/user').FBUser
var fbConfig = require('../config/fbConfig')
var FacebookStrategy = require('passport-facebook')

module.exports = function (passport) {
    passport.use(new FacebookStrategy({
        clientID: fbConfig.clientID,
        clientSecret: fbConfig.clientSecret,
        callbackURL: fbConfig.callbackURL
    }, function (accessToken, refreshToken, profile, done) {
        fbuser = new FBUser({
            email : profile.id,
            token :'1',
        })
        console.log('accessToken : ',accessToken)
        fbuser.save(function (err, user) {
            console.log(profile)
            return done(err, user)
        })
    }))
    passport.serializeUser(function(user, done) {
        done(null, user);
    });
      
    passport.deserializeUser(function(user, done) {
        done(null, user);
    });
}