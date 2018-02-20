var mongoose = require('mongoose')
var Schema = mongoose.Schema

var NoticeBoardSchema = new Schema({
    soccer: {
        title : {type:String, require:true},
        content : {type:String, require:true},
        comment : [{type: String},{type: Date}],
        writeUser : {type:String, require:true},
        createTime : {type:Date, require:true},
        modifyTime : {type:Date, require:true}
    },
    baseball: {
        title : {type:String, require:true},
        content : {type:String, require:true},
        comment : [{type: String},{type: Date}],
        writeUser : {type:String, require:true},
        createTime : {type:Date, require:true},
        modifyTime : {type:Date, require:true}
    }
})

module.exports = mongoose.model('NoticeBoard', NoticeBoardSchema)

