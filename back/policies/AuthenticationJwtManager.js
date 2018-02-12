var User = require('../models/user')
var config = require('../config/database')

var jwt = require('jsonwebtoken')

module.exports = {
    JwtTokenCheck(req, res, next) {
        var token = getToken(req.headers)
        if (token) {
            var decode = jwt.decode(token, config.secret);
            User.findOne({ 'local.email': decode.local.email }, function (err, user) {
                if (err) { res.json(err) }
                if (!user) {
                    return res.status(403).send({ success: false, msg: 'Authentication Failed' })
                } else {
                    req.acceptUser = user
                    next()
                }
            })
        } else {
            return res.status(403).send({ success: false, msg: 'No Token Found' })
        }
    },

    JwtTokenGive(req, res, next) {
        User.findOne({
            'local.email': req.body.email
        }, function (err, user) {
            if (err) throw err
            if (!user) {
                res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' })
            } else {
                // check if password matches
                user.comparePassword(req.body.password, function (err, isMatch) {
                    if (isMatch && !err) {
                        // if user is found and password is right create a token  
                        var token = jwt.sign(user.toJSON(), config.local_secret, {
                            expiresIn: 60 * 60 * 24 * 7
                        })
                        req.accessToken = 'JWT '+ token
                        next()
                    } else {
                        res.send({ success: false, message: 'Authencation failed . passwords did not match' })
                    }
                })
            }
        })
    }
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