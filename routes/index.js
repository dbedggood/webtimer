var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { h: 0, m: 0, s: 0 })
})

module.exports = router
