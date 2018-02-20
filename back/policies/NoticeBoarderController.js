const NoticeBoard = require('../models/NoticeBoard')

module.exports = {
    async showNoticeBoard(req, res) {
        var route_id = req.params.boardId
        await NoticeBoard.find({route_id},function(err,result){
            if (err) res.status(500).send({success: false, message: 'an error has accured tring to fetch the songs'})
            res.send(result)
        })
    }
}
