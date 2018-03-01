const Soccer = require('../models/NoticeBoard').soccer
const Basketball = require('../models/NoticeBoard').basketball

module.exports = {
    async showNoticeBoard(req, res) {
        var route_id = req.params.boardId
        var route_index =req.params.index
        var board = null
        var query_string ={}

        if (route_id =='soccer') board= Soccer
        else if (route_id=='basketball') board= Basketball
        
        var query_id= route_id+'_id'
        var index = (parseInt(route_index)-1) * 10
        query_string[query_id]={"$gt":index,"$lt":index+11}
        // return every 10 rows of table data
        await board.find(query_string, function (err, result) {
            if (err) res.status(500).send({ success: false, message: 'an error has accured tring to fetch the Noticeboards' })
            res.send(result)
        })
    },

    async addNoticeBoard(req, res) {
        var route_id = req.params.boardId
        var route_state = req.params.stateBoard
        var board = null

        if(route_id == 'soccer') board= new Soccer()
        else if (route_id == 'basketball') board= new Basketball()

        if (route_state == 'Add') {
            board.title = req.body.title
            board.content= req.body.content
            await board.save(function(err){
                if(err) res.status(500).send({succses:false,error:'mongodb save fail'})
                res.send({success:true,message:'mongodb save success!'})
            })
        }
    },
    async showContent(req, res) {
        var board = null
        var route_id = req.params.boardId
        var route_state = req.params.stateBoard
        var route_index = req.params.index
        var query_string ={}
        var query_id= route_id+'_id'

        query_string[query_id]=route_index
        
        if(route_id =='soccer') board = Soccer
        else if(route_id == 'basketball') board = Basketball

        if(route_state=='View'){
            await board.findOne(query_string, function(err, result){
                if(err) res.status(500).send({success: false, error: 'mongodb select fail'})
                res.send(result)
            })
        }
    }
}
