var express = require('express')
var router = express.Router()
var passport = require('passport')

router.post('/register', function (req, res) {
  res.send({
    message: `Hello ${req.body.email}! Your user was registerd! have fun!`
  })
})

// router.post('/signup', passport.authenticate('signup', {
//   successRedirect: '/profile',
//   failureRedirect: '/', // 가입 실패시 redirect할 url주소
//   failureFlash: true
// }))

router.post('/signup', passport.authenticate('signup', {
  successRedirect: '/dashboard',
  failureRedirect: '/', // 가입 실패시 redirect할 url주소
  failureFlash: true
}))

router.post('/signin', passport.authenticate('signin', {
  successRedirect: '/profile',
  failureRedirect: '/', // 로그인 실패시 redirect할 url주소
  failureFlash: true
}))

var isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  } else {
    res.redirect('/login')
  }
}

router.get('/dashboard', isLoggedIn, function (req, res, next) {
  res.render('index', { title: 'You are logged in.' })
  console.log('signup success')
})

module.exports = router
