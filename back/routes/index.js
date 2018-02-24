const express = require('express')
const router = express.Router()
const passport = require('passport')

// reference files
const AuthenticationPolicy = require('../policies/AuthenticationPolicy')
const AuthenticationJwtManager = require('../policies/AuthenticationJwtManager')
const NoticeBoarderController = require('../policies/NoticeBoarderController')

router.post('/local_signup', AuthenticationPolicy.signup, AuthenticationJwtManager.JwtTokenCreate)
router.post('/local_signin',AuthenticationJwtManager.JwtTokenGive, function (req, res) {
    res.json({ success: true, token:req.accessToken, user: req.accessUser})
})
router.get('/profile', AuthenticationJwtManager.JwtTokenCheck, function (req, res) {
    res.json({ success: true, token:req.accessToken, message: 'welcome in Area' + req.acceptUser })
})

router.get('/facebook',passport.authenticate('facebook'))
router.get('/facebook/callback',passport.authenticate('facebook',{failureRedirect: '/'}),function(req, res){
    loginSuccessHandler(req, res)
})

function loginSuccessHandler(req, res){
    res.send({success:true, msg:'login success', token: user.accessToken , user:user })
}

router.get('/:boardId', NoticeBoarderController.showNoticeBoard)
router.post('/:boardId/:stateBoard', NoticeBoarderController.addNoticeBoard)

module.exports = router