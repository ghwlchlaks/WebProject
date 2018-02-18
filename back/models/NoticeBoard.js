var mongoose = require('mongoose')
var Schema = mongoose.Schema

var SoccerSchema = new Schema({
   title : {type:String, require:true},
   content : {type:String, require:true},
   comment : {type:String, require:true},
   writeUser : {type:String, require:true},
   createTime : {type:String, require:true},
   modifyTime : {type:String, require:true}
})

module.exports = mongoose.model('Soccer', SoccerSchema)
