const Request = require('request')
const jwt = require('jsonwebtoken')

const GoogleUser = require('../models/user').GoogleUser
const config = require('../config/database')
const socialConfig = require('../config/socialConfig')

module.exports = {
    checkedValidation(req, res) {
        switch (req.params.provider) {
            case 'google':
                googleAuth(req, res)
                break
        }
    },
    //클라이언트에서 jwt token을 보낸것을 체크
    checkedJWT(req, res) {

    }
}
// user profile db에 데이터가 있는지 확인, 저장 및 갱신
function userSaveOrCheck(res,access_token, data, provider) {
    var dataJson= JSON.parse(data)
    var User = null
    var email = null
    var name = null
    var gender = null
    var socialId = null
    var accessToken = null

    if (provider == 'google') {
        User = GoogleUser
        email = dataJson.emails[0].value
        name = dataJson.displayName
        gender = dataJson.gender
        socialId = dataJson.id
        //accessToken = res.req.headers.authorization
        accessToken = access_token
    }

    User.findOne({ 'email': email }, function (err, result) {
        if (err) res.status(500).send({ success: false, message: 'an error has accured tring to find the social data' })
        if (!result) {
            newUser = new User()
            newUser.email = email
            newUser.gender = gender
            newUser.name = name
            newUser.provider = provider
            newUser.socialId = socialId
            newUser.accessToken = accessToken
            newUser.jwtToken = jwt.sign({ newUser }, config.local_secret)
            newUser.save(function (err) {
                if (err) {
                    res.status(500).send({ succss: false, message: 'an error has accured trting to save the social data ' })
                }
                else {
                    res.send({ success: true, user: newUser })
                }
            })
        }
        else {
            // console.log('before accesstoken ', result.accessToken)
            result.accessToken = accessToken
            result.save(function (err) {
                // console.log(result)
                if (err) {
                    res.status(500).send({ succss: false, message: 'an error has accured trting to update the social data ' })
                }
                else {
                    res.send({ success: true, user: result })
                }
            })
        }
    })
}

//4 google post accesstoken , idtoken using user_code
function googleAuth(req, res) {
    //3 받은 authorization code를 o/oauth2/token으로 exchage 
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
    }, function (err, response, body) {
        try {
            if (!err && response.statusCode == 200) {
                var responseJson = JSON.parse(body)
                googleGetProfile(req, res, responseJson)
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
//5google get user profile using accesstoken
function googleGetProfile(req, res, responseJson) {
    var access_token = responseJson.access_token
    Request({
        method: "get",
        url: `https://www.googleapis.com/plus/v1/people/me?access_token=${access_token}`
    }, function (err, response, body) {
        try {
            if (!err && response.statusCode == 200) {
                //google user profile save
                userSaveOrCheck(res,access_token, body, 'google')
            }
            else {
                res.status(response.statusCode).json(err)
            }

        }
        catch (e) {
            res.status(500).json(err || e)
        }
    }
    )
}