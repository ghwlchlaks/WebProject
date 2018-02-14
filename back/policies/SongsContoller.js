const Song = require('../models/songs')

module.exports = {
    async index(req, res) {
        await Song.find({
            
        },function(err,result){
            if (err) res.status(500).send({success: false, message: 'an error has accured tring to fetch the songs'})
            res.send(result)
        })
    },
    async post(req, res) {
        var newSong = new Song(req.body)
        await newSong.save(function (err) {
            if (err) res.status(500).send({success: false, message: 'an error has accured tring to create song'})
            res.send(newSong)
        })
    }
}
