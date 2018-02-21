var mongoose = require('mongoose')
var Schema = mongoose.Schema

var soccer = new Schema({
    title : {type:String, require:true},
    content : {type:String, require:true},
    writeUser : {type:String, require:true},
    createTime : {type:Date, require:true},
    modifyTime : {type:Date, require:true}
})

var basketball = new Schema({
    title : {type:String, require:true},
    content : {type:String, require:true},
    writeUser : {type:String, require:true},
    createTime : {type:Date, require:true},
    modifyTime : {type:Date, require:true}
})

// module.exports = mongoose.model('soccer', soccer)
// module.exports = mongoose.model('baseketball', baseketball)
var soccer = mongoose.model('soccer', soccer)
var basketball = mongoose.model('basketball', basketball)

module.exports ={
   soccer :soccer,
   basketball : basketball
}
