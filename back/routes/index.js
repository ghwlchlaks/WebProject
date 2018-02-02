const express = require('express')
const jwt = require('jsonwebtoken')
// to use mongo.toJSON function
require('mongoose')
const router = express.Router()

// referece files
const AuthenticationControllerPolicy = require('../policies/AuthenticationControllerPolicy')
const User = require('../models/user')
const config = require('../config/database')

router.post('/signup', AuthenticationControllerPolicy.signup, function (req, res) {
  if (!req.body.username || !req.body.password) {
    res.json({success: false, msg: 'Please pass username and password.'})
  } else {
    var newUser = new User({
      username: req.body.username,
      password: req.body.password
    })
    // save the user
    newUser.save(function (err) {
      console.log('this section is save section to mongo db')
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'})
      }
      res.json({success: true, msg: 'Successful created new user.'})
    })
  }
})

router.post('/signin', function (req, res) {
  User.findOne({
    username: req.body.username
  }, function (err, user) {
    if (err) throw err

    if (!user) {
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.'})
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.sign(user.toJSON(), config.secret, {
            expiresIn: 60 * 60 * 24 * 7
          })
          // return the information including token as JSON
          res.json({success: true, token: 'JWT ' + token})
        } else {
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'})
        }
      })
    }
  })
})
// var getToken = function (headers) {
//   if (headers && headers.authorization) {
//     var parted = headers.authorization.split(' ')
//     if (parted.length === 2) {
//       return parted[1]
//     } else {
//       return null
//     }
//   } else {
//     return null
//   }
// }

module.exports = router
