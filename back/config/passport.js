const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user._id)
  })
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
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
    User.findOne({ 'email': email }, function (err, user) {
      if (err) {
        // res.status(400).send({error: 'passport module error!'})
        done(err)
      }
      if (!user) {
        console.log('exist')
        // res.status(400).send({error: 'This E-mail account is already in use '})
        return done(null, false, {error: 'Thie E-mail account is already in use'})
      } else {
        const newUser = new User()
        newUser.email = email
        newUser.password = newUser.generateHash(password)
        // newUser.major_language = req.body.major_language
        newUser.save(function (err) {
          if (err) {
            // res.status(400).send({error: 'Between passport-server and mongodb occur problem!'})
            return done(null, false, {error: 'Between passport-server and mongodb occur problem!'})
          } else {
            return done(null, user)
          }
        })
      }
    })
  }))

  passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function (req, email, password, done) {
    User.findOne({ 'email': email }, function (err, user) {
      if (err) { return done(err) }
      if (!user) { return done(null, false, req.flash('loginMessage', '사용자를 찾을 수 없습니다.')) }
      if (!user.validPassword(password)) { return done(null, false, req.flash('loginMessage', '비밀번호가 다릅니다.')) }
      return done(null, user)
    })
  }))
}
