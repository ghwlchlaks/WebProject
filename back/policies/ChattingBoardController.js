const voiceRoom = require('../models/ChattingRoom').voiceRoom

var room = null

module.exports = {
    async showChattingRoom(req, res) {
        var route_id = req.params.boardId
        var route_index = req.params.index
        var query_string = {}

        collectionSelect(route_id, false)
        var query_id = route_id + '_id'
        var index = (parseInt(route_index) - 1) * 10
        query_string[query_id] = { "$gt": index, "$lt": index + 11 }
        // return every 10 rows of table data
        await room.find(query_string, function (err, result) {
            if (err) res.status(500).send({ success: false, message: 'an error has accured tring to fetch the Noticeboards' })
            res.send(result)
        })
    },

    async addChattingRoom(req, res) {
        var route_id = req.params.boardId
        var route_state = req.params.stateId
        console.log(route_id + ' ' + route_state)
        collectionSelect(route_id, true)
        console.log(req.body)

        if (route_state == 'Add') {
            room.roomName = req.body.roomname
            room.roomPass = req.body.roompass
            room.peopleNum = req.body.peopleNum
            await room.save(function (err) {
                if (err) { res.status(500).send({ succses: false, message: 'mongodb save fail' }) }
                res.send({ success: true, message: 'mongodb save success!' })
            })
        }
    },
    async showContent(req, res) {
        var route_id = req.params.boardId
        var route_state = req.params.stateBoard
        var route_index = req.params.index
        var query_string = {}
        var query_id = route_id + '_id'

        query_string[query_id] = route_index

        collectionSelect(route_id, false)

        if (route_state == 'View') {
            await room.findOne(query_string, function (err, result) {
                if (err) { res.status(500).send({ success: false, message: 'mongodb select fail' }) }
                res.send(result)
            })
        }
        else if (route_state == 'totalNum') {
            await room.count({}, function (err, count) {
                if (err) { res.status(500).send({ succses: false, error: 'mongodb count get fail' }) }
                res.send({ success: true, message: count })
            })
        }
    }
}

function collectionSelect(route_id, isConstruct) {
    if (!isConstruct) {
        switch (route_id) {
            case 'voice':
                room = voiceRoom
                break;
            default:
                return
        }
    }
    else {
        switch (route_id) {
            case 'voice':
                room = new voiceRoom
                break;
            default:
                return
        }
    }
}