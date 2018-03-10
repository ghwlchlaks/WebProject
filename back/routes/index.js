const express = require('express')
const router = express.Router()
const passport = require('passport')

// reference files
//authentication
const AuthenticationPolicy = require('../policies/AuthenticationPolicy')
const AuthenticationJwtManager = require('../policies/AuthenticationJwtManager')
const SocialAuthenticationManager = require('../policies/SocialAuthenticationManager')
//board
const NoticeBoarderController = require('../policies/NoticeBoarderController')

router.post('/local_signup', AuthenticationPolicy.signup, AuthenticationJwtManager.JwtTokenCreate)
router.post('/local_signin', AuthenticationJwtManager.JwtTokenGive, function (req, res) {
    res.json({ success: true, token: req.accessToken, user: req.accessUser })
})
router.get('/profile', AuthenticationJwtManager.JwtTokenCheck, function (req, res) {
    res.json({ success: true, token: req.accessToken, message: 'welcome in Area' + req.acceptUser })
})
//앞에 url 정적인 이름 넣어서 분류하기
// router.get('/:boardId/:index', NoticeBoarderController.showNoticeBoard)
// router.post('/:boardId/:stateBoard', NoticeBoarderController.addNoticeBoard)
// router.get('/:boardId/:stateBoard/:index', NoticeBoarderController.showContent)

router.post('/auth/:provider', SocialAuthenticationManager.checkedValidation)

module.exports = router

