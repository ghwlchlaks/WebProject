// reference npm module
var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var morgan = require('morgan')
var cors = require('cors')
var mongoose = require('mongoose')
var passport = require('passport')

// reference config file
var dbconfig = require('../config/database')
// reference routes file
var index = require('../routes/index')

var app = express()

mongoose.connect(dbconfig.local_collection)
mongoose.Promise = global.Promise
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error: '))
db.once('open', function (callback) {
  console.log('mongo db connected..')
})

// view engine setup
app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'ejs')
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
// app.use(session({
//  secret: 'test',
//  resave: false,
//  saveUninitialized: true,
//  cookie: {expires: new Date(Date.now() + (60 * 60 * 1000))}
// }))
require('../policies/FBAuthenticationManager')(passport)
app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.json())
app.use(cors())

// route login page
app.post('/local_signup', index)
app.post('/local_signin', index)

app.get('/profile', index)

app.get('/:boardId/:index', index)
app.post('/:boardId/:stateBoard', index)

// app.get('/facebook',index)
// app.get('/facebook/callback', index)
//app.get('/songs', index)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})
app.listen(process.env.PORT || 8082)
module.exports = app
