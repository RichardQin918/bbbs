const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const morgan = require('morgan')
const path = require('path')
const ejs = require('ejs')
const PURGE = require('purgecss')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//db
const viewRoutes = require('./api/routes/views')

//set view engine
app.engine('html', ejs.renderFile)
app.set('view engine', 'html')
app.use(express.static('views'))
app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use('/img',express.static(path.join(__dirname, 'public/img')))
app.use('/js',express.static(path.join(__dirname, 'public/js')))
app.use('/css',express.static(path.join(__dirname, 'public/css')))

//route
app.use('/', viewRoutes)

//logger
app.use(morgan('dev'))



//error handling
app.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    }
  })
})


console.log('starting!')


module.exports = app

