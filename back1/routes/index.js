var express = require('express')
var router = express.Router()
var passport = require('passport')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

router.get('/status', function (req, res) {
  res.send({
    message: 'hello world'
  })
})

router.post('/register', function (req, res) {
  res.send({
    message: ` Hello ${req.body.email}! Your user was registerd! have fun!`
  })
})

router.post('/signup', passport.authenticate('signup', {
  successRedirect: '/profile',
  failureRedirect: '/', // 가입 실패시 redirect할 url주소
  failureFlash: true
}))
router.post('/login', passport.authenticate('login', {
  successRedirect: '/profile',
  failureRedirect: '/', // 로그인 실패시 redirect할 url주소
  failureFlash: true
}))

var isLoggedIn = function (req, res, next) {
  console.log(req.isAuthenticated())
  if (req.isAuthenticated()) {
    return next()
  } else {
    res.redirect('/login')
  }
}

router.get('/profile', isLoggedIn, function (req, res, next) {
  res.render('index', { title: 'You are logged in.' })
})

module.exports = router
