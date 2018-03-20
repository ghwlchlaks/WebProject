var User = require('../models/user').LocalUser
var config = require('../config/database')

var jwt = require('jsonwebtoken')

module.exports = {
    JwtTokenGive(req, res, next) {
        User.findOne({
            email: req.body.email
        }, function (err, user) {
            if (err) throw err
            if (!user) {
                res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' })
            } else {
                // check if password matches
                user.comparePassword(req.body.password, function (err, isMatch) {
                    if (isMatch && !err) {              
                        req.accessToken = 'JWT '+ user.token
                        req.accessUser = user
                        next()
                    } else {
                        res.send({ success: false, message: 'Authencation failed . passwords did not match' })
                    }
                })
            }
        })
    },
    JwtTokenCheck(req, res, next) {
        var token = getToken(req.headers)
        console.log(token)
        if(token) {
            User.findOne({'token':token}, function(err, user){
                if(err) {res.json(err)}
                if(!user) {
                    return res.status(400).send({success: false, error:'authentication faliled'})
                } else {
                    req.acceptUser = user
                    req.accessToken = 'JWT '+ token
                    next()
                }
            })
        } else {
            return res.send({success: false, error: 'no token found'})
        }
    },
    JwtTokenCreate(req, res) {
        if(!req.body.email || !req.body.password) {
            res.json({ success: false, error: 'Please pass email and password.' })
        } else {
            var newUser = new User()
            newUser.email = req.body.email        
            newUser.password = req.body.password
            newUser.username = req.body.username
            // newUser.country = req.body.country
            // newUser.wantedLanguage = req.body.wantedLanguage
            // newUser.nickName = req.body.nickName
            newUser.sex = req.body.sex
            newUser.role = "Client"
            newUser.token = jwt.sign({newUser}, config.local_secret)           
            newUser.provider = 'local'
            newUser.save(function (err) {
                if(err) {
                    console.log(err)
                    return res.json({success: false,error: 'email already exists'})
                }
                res.json({success: true, msg: 'successful created new user', token: 'JWT '+newUser.token})
            })
        }
    },
    UserChecked(req, res) {
        let email = req.params.email
        User.findOne({'email' : email}, function(err, user) {
            if(err) {
                res.send({success: false, message: 'mongodb usercheced error'})
            }
            if(!user) {
                res.send({success: false, message: 'user not existed'})
            }
            else {
                res.send({success: true, message: 'user existed'})
            }
        })
    }
    // JwtTokenCheck(req, res, next) {
    //     var token = getToken(req.headers)
    //     if (token) {
    //         var decode = jwt.decode(token, config.secret);
    //         User.findOne({ 'local.email': decode.local.email }, function (err, user) {
    //             if (err) { res.json(err) }
    //             if (!user) {
    //                 return res.status(403).send({ success: false, msg: 'Authentication Failed' })
    //             } else {
    //                 req.acceptUser = user
    //                 next()
    //             }
    //         })
    //     } else {
    //         return res.status(403).send({ success: false, msg: 'No Token Found' })
    //     }
    // },
    // JwtTokenGive(req, res, next) {
    //     User.findOne({
    //         'local.email': req.body.email
    //     }, function (err, user) {
    //         if (err) throw err
    //         if (!user) {
    //             res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' })
    //         } else {
    //             // check if password matches
    //             user.comparePassword(req.body.password, function (err, isMatch) {
    //                 if (isMatch && !err) {
    //                     // if user is found and password is right create a token  
    //                     var token = jwt.sign(user.toJSON(), config.local_secret, {
    //                         expiresIn: 60 * 60 * 24 * 7
    //                     })
    //                     req.accessToken = 'JWT '+ token
    //                     req.accessUser = user
    //                     next()
    //                 } else {
    //                     res.send({ success: false, message: 'Authencation failed . passwords did not match' })
    //                 }
    //             })
    //         }
    //     })
    // },
}

//Split token
getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ')
        if (parted.length === 2) {
            return parted[1]
        } else {
            return null
        }
    } else {
        return null
    }
}