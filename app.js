const createError = require('http-errors')
const express = require('express')
const helmet = require('helmet')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const indexRouter = require('./routes/index')
const timerRouter = require('./routes/timer')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// security
app.use(helmet())
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            fontSrc: ["'self'", 'fonts.gstatic.com'],
            imgSrc: ["'self'", 'www.google-analytics.com'],
            styleSrc: [
                "'self'",
                'fonts.googleapis.com',
                'cdnjs.cloudflare.com'
            ],
            scriptSrc: [
                "'self'",
                "'unsafe-inline'",
                'www.google-analytics.com',
                'www.googletagmanager.com'
            ]
        }
    })
)

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(indexRouter)
app.use(timerRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
})

module.exports = app
