const Request = require('request')
var jwt = require('jsonwebtoken')

var GoogleUser = require('../models/user').GoogleUser
var config = require('../config/database')
const socialConfig = require('../config/socialConfig')

module.exports = {
   checkedValidation (req, res) {
    switch (req.params.provider) {
        case 'google':
            googleAuth(req, res)
            break
    }
   },
   //social data 유무확인 및 db에 저장
   userSaveOrCheck(req, res) {
       var socialName = req.params.socialName
       var userData= req.body.data
       var accessToken = req.body.config.headers.Authorization
       var User = null

       if(socialName == 'google') User = GoogleUser

       User.findOne({ social_id : userData.email },function(err,result){
            if (err) res.status(500).send({ success: false, message: 'an error has accured tring to find the social data' })
            if (!result) {
                newUser = new User()
                newUser.social_id = userData.email
                newUser.gender = userData.gender
                newUser.username = userData.name
                newUser.provider = socialName
                newUser.token = accessToken
                newUser.save(function(err) {
                    if(err) res.status(500).send({succss:false, message: 'an error has accured trting to save the social data '})
                    res.send({success: true, user:newUser})
                })
            }
            else {
                console.log('updated accesstoken ',accessToken)
                result.save(function(err) {
                    console.log(result)
                    if(err) res.status(500).send({succss:false, message: 'an error has accured trting to update the social data '})
                    res.json({success: true,user:result})
                })
            }
       })
   }
}
function googleAuth(req, res) {
    // 받은 authorization code를 o/oauth2/token으로 exchage 3
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
        // token response 4
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

