var mongoose = require('mongoose')
var Schema = mongoose.Schema
var AutoIncerement = require('mongoose-sequence')(mongoose)

// Voice Chatting Room model
var voiceRoomSchema = new Schema({
    roomName: { type: String, require: true },
    roomPass: { type: String },
    peopleNum: { type:  String, require: true },
    Admin: { type: String, require: true },
    createTime: { type: Date, require: true }
})

//auto increment field name = 'boardname'_id
voiceRoomSchema.plugin(AutoIncerement, { inc_field: 'voice_id' })

var voiceRoom = mongoose.model('voiceRoom', voiceRoomSchema)

module.exports = {
    voiceRoom: voiceRoom
}
