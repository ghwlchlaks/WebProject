var mongoose = require('mongoose')
var Schema = mongoose.Schema
var AutoIncerement = require('mongoose-sequence')(mongoose)

// module.exports = mongoose.model('soccer', soccer)
// module.exports = mongoose.model('baseketball', baseketball)

var soccerSchema = new Schema({
    title : {type:String, require:true},
    content : {type:String, require:true},
    writeUser : {type:String, require:true},
    createTime : {type:Date, require:true},
    modifyTime : {type:Date, require:true},
})

var basketballSchema = new Schema({
    title : {type:String, require:true},
    content : {type:String, require:true},
    writeUser : {type:String, require:true},
    createTime : {type:Date, require:true},
    modifyTime : {type:Date, require:true},
})
//auto increment field name = 'boardname'_id
soccerSchema.plugin(AutoIncerement,{inc_field: 'soccer_id'})
basketballSchema.plugin(AutoIncerement,{inc_field: 'basketball_id'})

var soccer = mongoose.model('soccer', soccerSchema)
var basketball = mongoose.model('basketball', basketballSchema)

module.exports ={
   soccer :soccer,
   basketball : basketball
}
