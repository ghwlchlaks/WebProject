var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')
var Schema = mongoose.Schema

var userSchema = new Schema({
    local: {
        username: { type: String, unique: true, required: true },
        password: { type: String, unique: true, required: true },
        email: { type: String, unique: true, required: true, lowercase: true },
        role: { type: String, role_list: ['Client', 'Manager', 'Admin'], default: 'Client' }
    },
    facebook: {
        id: { type: String },
        token: { type: String }
        //  email: {type: String},
    }
})

//local account pre_save
userSchema.pre('save', function (next) {
    var user = this.local
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
userSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.local.password, function (err, isMatch) {
        if (err) {
            return cb(err)
        }
        cb(null, isMatch)
    })
}

module.exports = mongoose.model('User', userSchema)
