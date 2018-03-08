const express = require('express')
const router = express.Router()
const passport = require('passport')
const Request = require('request')

// reference files
const AuthenticationPolicy = require('../policies/AuthenticationPolicy')
const AuthenticationJwtManager = require('../policies/AuthenticationJwtManager')
const NoticeBoarderController = require('../policies/NoticeBoarderController')
const socialConfig = require('../config/socialConfig')

router.post('/local_signup', AuthenticationPolicy.signup, AuthenticationJwtManager.JwtTokenCreate)
router.post('/local_signin', AuthenticationJwtManager.JwtTokenGive, function (req, res) {
    res.json({ success: true, token: req.accessToken, user: req.accessUser })
})
router.get('/profile', AuthenticationJwtManager.JwtTokenCheck, function (req, res) {
    res.json({ success: true, token: req.accessToken, message: 'welcome in Area' + req.acceptUser })
})

// router.get('/:boardId/:index', NoticeBoarderController.showNoticeBoard)
// router.post('/:boardId/:stateBoard', NoticeBoarderController.addNoticeBoard)
// router.get('/:boardId/:stateBoard/:index', NoticeBoarderController.showContent)

// router.post('/auth/google', function (req, res) {
//     console.log('req', req)
//     console.log('res', res)
// })
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }))
router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }), function (req, res) {
    if (req.user)
        loginSuccessHandler(req, res)
})
router.post('/auth/:provider', function (req, res) {
    switch (req.params.provider) {
        case 'google':
            googleAuth(req, res)
            break
    }
})

function googleAuth(req, res) {
    Request({
        method: 'post',
        url: 'https://accounts.google.com/o/oauth2/token',
        form: {
            code: req.body.code,
            client_id: socialConfig.google.clientId,
            client_secret: socialConfig.google.clientSecret,
            redirect_uri: req.body.redirectUri,
            grant_type: 'authorization_code'
        },
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    }, function(err, response, body) {
        try {
            if(!err && response.statusCode ==200){
                var responseJson = JSON.parse(body)
                res.json(responseJson)
            }
            else {
                res.status(response.statusCode).json(err)
            }
        }
        catch (e) {
            res.status(500).json(err || e)
        }
    })
}

// router.get('/login', function(req, res){
//     console.log('/login',req)
// })
// router.post('/login/auth/google', function (req, res) {
//     res.send('ef')
//     // console.log('/login/auth/google',res)
// })
function loginSuccessHandler(req, res) {
    res.send({ success: true, msg: 'login success' })
}

module.exports = router




// facebook login system 
// router.get('/facebook',passport.authenticate('facebook',{scope:['email']}))
// router.get('/facebook/callback',passport.authenticate('facebook',{failureRedirect: 'http://localhost:8080/#/'}),function(req, res){
//     if(req.user){
//         loginSuccessHandler(req,res)
//     }
//     else{
//         return res.send({msg:'not found'})
//     }
// })

// function loginSuccessHandler(req, res){
//     res.send({success:true,msg:'login success', user: req.user, token: req.user.token})
//     console.log('req.user : ',req.user)
//     return res.redirect(303, 'http://localhost:8080/#/')
// }
