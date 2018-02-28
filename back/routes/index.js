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

router.get('/:boardId/:index', NoticeBoarderController.showNoticeBoard)
router.post('/:boardId/:stateBoard', NoticeBoarderController.addNoticeBoard)


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
module.exports = router