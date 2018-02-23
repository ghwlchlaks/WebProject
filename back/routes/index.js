const express = require('express')
const passport = require('passport')
const router = express.Router()

// reference files
const AuthenticationPolicy = require('../policies/AuthenticationPolicy')
const AuthenticationJwtManager = require('../policies/AuthenticationJwtManager')

// const SongsController = require('../policies/SongsContoller')
const NoticeBoarderController = require('../policies/NoticeBoarderController')

router.post('/local_signup', AuthenticationPolicy.signup, AuthenticationJwtManager.JwtTokenCreate)
router.post('/local_signin',AuthenticationJwtManager.JwtTokenGive, function (req, res) {
    res.json({ success: true, token:req.accessToken, user: req.accessUser})
})
router.get('/profile', AuthenticationJwtManager.JwtTokenCheck, function (req, res) {
    res.json({ success: true, token:req.accessToken, message: 'welcome in Area' + req.acceptUser })
})
router.get('/:boardId', NoticeBoarderController.showNoticeBoard)
router.post('/:boardId/:stateBoard', NoticeBoarderController.addNoticeBoard)



// router.post('/local_signup', AuthenticationPolicy.signup, function (req, res) {
//     if (!req.body.username || !req.body.password) {
//         res.json({ success: false, msg: 'Please pass username and password.' })
//     } else {
//         var newUser = new User()
//         newUser.local.email = req.body.email        
//         newUser.local.password = req.body.password
//         newUser.local.username = req.body.username
//         newUser.local.country = req.body.country
//         newUser.local.wantedLanguage = req.body.wantedLanguage
//         newUser.local.nickName = req.body.nickName
//         newUser.local.sex = req.body.sex
//         newUser.local.role = "Client"
//         newUser.local.authencation = false
//         newUser.save(function (err) {
//             if (err) {
//                 return res.json({success: false, msg: 'Username already exists.' })
//             }
//             res.json({ success: true, msg: 'Successful created new user.' })
//         })
//     }
// })
// router.get('/songs', SongsController.index)
// router.post('/songs',SongsController.post)

module.exports = router
