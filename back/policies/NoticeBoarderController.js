const Shotting = require('../models/NoticeBoard').shotting
const Soccer = require('../models/NoticeBoard').soccer
const Basketball = require('../models/NoticeBoard').basketball
const Baseball = require('../models/NoticeBoard').baseball
const Kpop = require('../models/NoticeBoard').kpop
const Pop = require('../models/NoticeBoard').pop
const NorthAmerica = require('../models/NoticeBoard').northAmerica
const Asia = require('../models/NoticeBoard').asia

var board = null

module.exports = {
    async showNoticeBoard(req, res) {
        var route_id = req.params.boardId
        var route_index = req.params.index
        var query_string = {}

        collectionSelect(route_id, false)
        var query_id = route_id + '_id'
        var index = (parseInt(route_index) - 1) * 10
        query_string[query_id] = { "$gt": index, "$lt": index + 11 }
        // return every 10 rows of table data
        await board.find(query_string, function (err, result) {
            if (err) res.status(500).send({ success: false, message: 'an error has accured tring to fetch the Noticeboards' })
            res.send(result)
        })
    },

    async addNoticeBoard(req, res) {
        var route_id = req.params.boardId
        var route_state = req.params.stateBoard

        collectionSelect(route_id, true)

        if (route_state == 'Add') {
            board.title = req.body.title
            board.content = req.body.content
            await board.save(function (err) {
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
            await board.findOne(query_string, function (err, result) {
                if (err) { res.status(500).send({ success: false, message: 'mongodb select fail' }) }
                res.send(result)
            })
        }
        else if (route_state == 'totalNum') {
            await board.count({}, function (err, count) {
                if (err) { res.status(500).send({ succses: false, error: 'mongodb count get fail' }) }
                res.send({ success: true, message: count })
            })
        }
    }
}

function collectionSelect(route_id, isConstruct) {
    if (!isConstruct) {
        switch (route_id) {
            case 'shotting':
                board = Shotting
                break;
            case 'soccer':
                board = Soccer
                break;
            case 'basketball':
                board = Basketball
                break;
            case 'baseball':
                board = Baseball
                break;
            case 'kpop':
                board = Kpop
                break;
            case 'pop':
                board = Pop
                break;
            case 'northAmerica':
                board = NorthAmerica
                break;
            case 'asia':
                board = Asia
                break;
            default:
                return
        }
    }
    else {
        switch (route_id) {
            case 'shotting':
                board = new Shotting
                break;
            case 'soccer':
                board = new Soccer
                break;
            case 'basketball':
                board = new Basketball
                break;
            case 'baseball':
                board = new Baseball
                break;
            case 'kpop':
                board = new Kpop
                break;
            case 'pop':
                board = new Pop
                break;
            case 'northAmerica':
                board = new NorthAmerica
                break;
            case 'asia':
                board = new Asia
                break;
            default:
                return
        }
    }
}