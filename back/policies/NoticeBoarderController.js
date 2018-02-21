const Soccer = require('../models/NoticeBoard').soccer
const Basketball = require('../models/NoticeBoard').basketball

module.exports = {
    async showNoticeBoard(req, res) {
        var route_id = req.params.boardId
        var board = null
        if (route_id =='soccer') board= Soccer
        else if (route_id=='basketball') board= Basketball

        await board.find({}, function (err, result) {
            if (err) res.status(500).send({ success: false, message: 'an error has accured tring to fetch the songs' })
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

    }
}
