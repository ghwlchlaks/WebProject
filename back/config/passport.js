var LocalStrategy = require('passport-local').Strategy
var User = require('../models/user')
module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    console.log('serial ' + user)
    done(null, user)
  })
  passport.deserializeUser(function (user, done) {
    User.findById(user._id, function (err, user) {
      console.log('deserial ' + user)
      done(err, user)
    })
  })
  // 프로그램 작성
  passport.use('signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function (req, email, password, done) {
    User.findOne({
      'email': email
    }, function (err, user) {
      if (err) return done(err)
      if (user) {
        return done(null, false, req.flash('signupMessage', '이메일이 존재합니다.'))
      } else {
        var newUser = new User()
        // newUser.name = req.body.name
        newUser.email = email
        newUser.password = newUser.generateHash(password)
        newUser.save(function (err) {
          if (err) { throw err }
          return done(null, newUser)
        })
      }
    })
  }))

  passport.use('signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function (req, email, password, done) {
    User.findOne({
      'email': email
    }, function (err, user) {
      if (err) { return done(err) }
      if (!user) { return done(null, false, req.flash('loginMessage', '사용자를 찾을 수 없습니다.')) }
      if (!user.validPassword(password)) { return done(null, false, req.flash('loginMessage', '비밀번호가 다릅니다.')) }
      return done(null, user)
    })
  }))
}
