const Song = require('../models/songs')

module.exports = {
    async showNoticeBoard(req, res) {
        await Song.find({
            
        },function(err,result){
            if (err) res.status(500).send({success: false, message: 'an error has accured tring to fetch the songs'})
            res.send(result)
        })
    }
}
