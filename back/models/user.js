var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')
var Schema = mongoose.Schema

//local user model
var LocalUserSchema = new Schema({
    email: { type: String, unique: true, required: true, lowercase: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    country: { type: String, required: true },
    wantedLanguage: { type: String },
    nickName: { type: String },
    sex: {type: String, required: true},
    role: { type: String, role_list: ['Client', 'Manager', 'Admin'], default: 'Client' },
    token: {type: String},
    provider : {type:String}

})

//local account pre_save
LocalUserSchema.pre('save', function (next) {
    var user = this
    if (user.isModified('password') || user.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err)
            }
            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) {
                    return next(err)
                }
                user.password = hash
                next()
            })
        })
    } else {
        return next()
    }
})

//local account compared password using bcrypt 
LocalUserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err)
        }
        cb(null, isMatch)
    })
}

//social user model
var GoogleUserSchema = new Schema({
    email: { type: String, unique: true, required: true, lowercase:true},
    accessToken: { type: String, required: true },
    name : {type: String},
    gender : {type:String},
    socialId : {type:String},
    provider : {type:String},
    jwtToken : {type:String}
})
var FacebookUserSchema = new Schema({
    email: { type: String, unique: true, required: true, lowercase:true},
    accessToken: { type: String, required: true },
    name : {type: String},
    gender : {type:String},
    socialId : {type:String},
    provider : {type:String},
    jwtToken : {type:String}
})
var LocalUser = mongoose.model('LocalUser', LocalUserSchema)
var GoogleUser = mongoose.model('GoogleUser', GoogleUserSchema)
var FacebookUser = mongoose.model('FacebookUser', FacebookUserSchema)

module.exports = {
    LocalUser : LocalUser,
    GoogleUser : GoogleUser,
    FacebookUser : FacebookUser
}