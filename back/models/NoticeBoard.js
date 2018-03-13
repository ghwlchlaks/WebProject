var mongoose = require('mongoose')
var Schema = mongoose.Schema
var AutoIncerement = require('mongoose-sequence')(mongoose)

//Game model
var shottingSchema = new Schema({
    title: { type: String, require: true },
    content: { type: String, require: true },
    writeUser: { type: String, require: true },
    createTime: { type: Date, require: true },
    modifyTime: { type: Date, require: true },
})

//Shop model

//Sports model
var soccerSchema = new Schema({
    title: { type: String, require: true },
    content: { type: String, require: true },
    writeUser: { type: String, require: true },
    createTime: { type: Date, require: true },
    modifyTime: { type: Date, require: true },
})
var basketballSchema = new Schema({
    title: { type: String, require: true },
    content: { type: String, require: true },
    writeUser: { type: String, require: true },
    createTime: { type: Date, require: true },
    modifyTime: { type: Date, require: true },
})
var baseballSchema = new Schema({
    title: { type: String, require: true },
    content: { type: String, require: true },
    writeUser: { type: String, require: true },
    createTime: { type: Date, require: true },
    modifyTime: { type: Date, require: true },
})

//Music Model
var kpopSchema = new Schema({
    title: { type: String, require: true },
    content: { type: String, require: true },
    writeUser: { type: String, require: true },
    createTime: { type: Date, require: true },
    modifyTime: { type: Date, require: true },
})
var popSchema = new Schema({
    title: { type: String, require: true },
    content: { type: String, require: true },
    writeUser: { type: String, require: true },
    createTime: { type: Date, require: true },
    modifyTime: { type: Date, require: true },
})

//Travel model
var northAmericaSchema = new Schema({
    title: { type: String, require: true },
    content: { type: String, require: true },
    writeUser: { type: String, require: true },
    createTime: { type: Date, require: true },
    modifyTime: { type: Date, require: true },
})
var asiaSchema = new Schema({
    title: { type: String, require: true },
    content: { type: String, require: true },
    writeUser: { type: String, require: true },
    createTime: { type: Date, require: true },
    modifyTime: { type: Date, require: true },
})

//auto increment field name = 'boardname'_id
shottingSchema.plugin(AutoIncerement, { inc_field: 'shotting_id' })
soccerSchema.plugin(AutoIncerement, { inc_field: 'soccer_id' })
basketballSchema.plugin(AutoIncerement, { inc_field: 'basketball_id' })
baseballSchema.plugin(AutoIncerement, { inc_field: 'baseball_id' })
kpopSchema.plugin(AutoIncerement, { inc_field: 'kpop_id' })
popSchema.plugin(AutoIncerement, { inc_field: 'pop_id' })
northAmericaSchema.plugin(AutoIncerement, { inc_field: 'northAmerica_id' })
asiaSchema.plugin(AutoIncerement, { inc_field: 'asia_id' })

var shotting = mongoose.model('shotting', shottingSchema)
var soccer = mongoose.model('soccer', soccerSchema)
var basketball = mongoose.model('basketball', basketballSchema)
var baseball = mongoose.model('baseball', baseballSchema)
var kpop = mongoose.model('kpop', kpopSchema)
var pop = mongoose.model('pop', popSchema)
var northAmerica = mongoose.model('northAmerica', northAmericaSchema)
var asia = mongoose.model('asia', asiaSchema)

module.exports = {
    shotting: shotting,
    soccer: soccer,
    basketball: basketball,
    baseball: baseball,
    kpop: kpop,
    pop: pop,
    northAmerica: northAmerica,
    asia: asia
}
