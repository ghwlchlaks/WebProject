const Song = require('../models/songs')

module.exports = {
    async index(req, res) {
        var newSong = new Song(req.body)
        newSong.save(function (err) {
            if (err) {
                return res.json(newSong)
            }
            res.json({ success: true, msg: 'Successful created new Song' })
        })
    },
    async post(req, res) {
        var newSong = new Song(req.body)
        newSong.save(function (err) {
            if (err) {
                return res.send(newSong)
            }
            res.json({ success: true, msg: 'Successful created new Song' })
        })
    }
}
