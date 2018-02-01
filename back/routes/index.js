// const AuthenticationController = require('../controllers/AuthenticationController')
// const AuthenticationControllerPolicy = require('../policies/AuthenticationControllerPolicy')

const express = require('express')
const router = express.Router()
const passport = require('passport')

router.post('/signup', passport.authenticate('jwt', {session: false}),
  function (req, res) {
    res.send(req.user.profile)
  }
)

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

// router.post('/signup', passport.authenticate('signup', {
//   successRedirect: '/profile',
//   failureRedirect: '/', // 가입 실패시 redirect할 url주소
//   failureFlash: true
// }))
// router.post('/login', passport.authenticate('login', {
//   successRedirect: '/profile',
//   failureRedirect: '/', // 로그인 실패시 redirect할 url주소
//   failureFlash: true
// }))
// router.post('/register', AuthenticationControllerPolicy.register, AuthenticationController.register)
// router.post('/signup', AuthenticationControllerPolicy.register, passport.authenticate('signup'))

// router.post('/signup', passport.authenticate('signup', {
//   failureRedirect: '/'}),
// function (req, res) {
//   res.redirect('/profile')
// })
// var isLoggedIn = function (req, res, next) {
//   console.log(req.isAuthenticated())
//   if (req.isAuthenticated()) {
//     return next()
//   } else {
//     res.redirect('/login')
//   }
// }
// router.get('/profile', isLoggedIn, function (req, res, next) {
//   res.render('index', { title: 'You are logged in.' })
// })

module.exports = router
