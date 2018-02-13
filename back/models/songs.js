var mongoose = require('mongoose')
var Schema = mongoose.Schema

var SongSchema = new Schema({
   title : {type:String, require:true},
   image : {type:String, require:true},
   videolink : {type:String, require:true}
})

module.exports = mongoose.model('Song', SongSchema)
