const express = require('express')
const router = express.Router()
const passport = require('passport')

// reference files
//authentication
const AuthenticationPolicy = require('../policies/AuthenticationPolicy')
const AuthenticationJwtManager = require('../policies/AuthenticationJwtManager')
const AuthenticationMailerServices = require('../policies/AuthenticationMailerService')
const SocialAuthenticationManager = require('../policies/SocialAuthenticationManager')
//board
const NoticeBoarderController = require('../policies/NoticeBoarderController')


//authentication router
router.post('/local_signup', AuthenticationPolicy.signup, AuthenticationJwtManager.JwtTokenCreate)
router.post('/local_signup/:state',AuthenticationMailerServices.services)
router.post('/local_signin', AuthenticationJwtManager.JwtTokenGive, function (req, res) {
    res.json({ success: true, token: req.accessToken, user: req.accessUser })
})
router.post('/auth/:provider', SocialAuthenticationManager.checkedValidation)


//noticeboard router
router.get('/board/:boardId/:index', NoticeBoarderController.showNoticeBoard)
router.post('/board/:boardId/:stateBoard', NoticeBoarderController.addNoticeBoard)
router.get('/board/:boardId/:stateBoard/:index', NoticeBoarderController.showContent)

//user page after Login
router.get('/profile', AuthenticationJwtManager.JwtTokenCheck, function (req, res) {
    res.json({ success: true, token: req.accessToken, message: 'welcome in Area' + req.acceptUser })
})
module.exports = router

