var tempUser = require('../models/user').tempUser
var config = require('../config/database')

const nodemailer = require('nodemailer')

module.exports = {
    services(req, res) {
        var state = req.params.state
        var rand = ''

        if (state == 'sendToEmail') {
            let email = req.body.email
            let condition_string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
            for (var i = 0; i < 6; i++) {
                rand += condition_string.charAt(Math.floor(Math.random() * condition_string.length))
            }
            let transport = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'ghwlchlaks@gmail.com',  //gmail 게정 아이디
                    pass: 'zmtlvgusfuhscbvb'
                }
            })
            let mailOptions = {
                from: 'ghwlchlaks@gmail.com',  //송신 메일 주소 
                to: email, //발송 메일 주소
                subject: 'vue.js signup request email', //제목
                html: '<img src="https://kr.vuejs.org/images/logo.png">' +
                    '<h1> 이 인증 번호를 입력해주세요 </h1>' +
                    '<p1>' + rand + '</p1>'
                // 파일 추가
                // attachments: [{
                //     filename: 'logo',
                //     filepath: ''
                // }]
            }
            transport.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error)
                    res.send({ success: false, msg: 'email send failed' })
                }
                else {
                    var temp = new tempUser()
                    temp.email = req.body.email
                    temp.authenticationCode = rand
                    temp.save(function(err){
                        if (err) { console.log(err) 
                            res.send({success:false, msg:'temp user save failed'})
                        }
                        else {res.send({ success: true, msg: "email send success" })}
                    })
                }
            })
        }
        else if (state == 'confirmCode') {
            tempUser.findOne({email: req.body.email, authenticationCode: req.body.authenticationCode}, function(err, result) {
                if(err) {res.send({success: false, msg: 'mongodb temp model find error'})}
                if(!result) {res.send({success: false, msg: 'Not match to authentication code and your email'})}
                else {
                    res.send({success: true, data: result})
                }
            })
        }
    }
}