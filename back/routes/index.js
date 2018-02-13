const express = require('express')
const passport = require('passport')
const router = express.Router()

// reference files
const AuthenticationPolicy = require('../policies/AuthenticationPolicy')
const AuthenticationJwtManager = require('../policies/AuthenticationJwtManager')
const User = require('../models/user')
const config = require('../config/database')

router.post('/local_signup', AuthenticationPolicy.signup, function (req, res) {
    if (!req.body.username || !req.body.password) {
        res.json({ success: false, msg: 'Please pass username and password.' })
    } else {
        var newUser = new User()
        newUser.local.email = req.body.email
        newUser.local.username = req.body.username
        newUser.local.password = req.body.password
        newUser.local.role = "Client"
        newUser.save(function (err) {
            if (err) {
                return res.json({ success: false, msg: 'Username already exists.' })
            }
            res.json({ success: true, msg: 'Successful created new user.' })
        })
    }
})

router.post('/local_signin', AuthenticationJwtManager.JwtTokenGive, function (req, res) {
    res.json({ success: true, token:req.accessToken})
})
router.get('/profile', AuthenticationJwtManager.JwtTokenCheck, function (req, res) {
    res.json({ success: true, message: 'welcome in Area' + req.acceptUser })
})




module.exports = router
