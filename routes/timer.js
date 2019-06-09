var express = require('express')
var router = express.Router()

/* GET timer page. */
router.get(/^\/(\d+h)?(\d+m)?(\d+s)?$/, function(req, res, next) {
    const time = req.path.slice(1)
    let hours = ''
    let minutes = ''
    let seconds = ''

    const hIndex = time.indexOf('h')
    const mIndex = time.indexOf('m')
    const sIndex = time.indexOf('s')

    if (hIndex < 0 && mIndex > 0 && sIndex > 0) {
        hours = '0'
        minutes = time.slice(0, mIndex)
        seconds = time.slice(mIndex + 1, sIndex)
    } else if (mIndex < 0 && hIndex > 0 && sIndex > 0) {
        hours = time.slice(0, hIndex)
        minutes = '0'
        seconds = time.slice(hIndex + 1, sIndex)
    } else if (sIndex < 0 && hIndex > 0 && mIndex > 0) {
        hours = time.slice(0, hIndex)
        minutes = time.slice(hIndex + 1, mIndex)
        seconds = '0'
    } else if (hIndex > 0 && mIndex < 0 && sIndex < 0) {
        hours = time.slice(0, hIndex)
        minutes = '0'
        seconds = '0'
    } else if (mIndex > 0 && hIndex < 0 && sIndex < 0) {
        hours = '0'
        minutes = time.slice(0, mIndex)
        seconds = '0'
    } else if (sIndex > 0 && hIndex < 0 && mIndex < 0) {
        hours = '0'
        minutes = '0'
        seconds = time.slice(0, sIndex)
    } else {
        hours = time.slice(0, hIndex)
        minutes = time.slice(hIndex + 1, mIndex)
        seconds = time.slice(mIndex + 1, sIndex)
    }

    minutes = parseInt(minutes)
    hours = parseInt(hours)
    seconds = parseInt(seconds)

    if (seconds >= 60) {
        let q = Math.floor(seconds / 60)
        seconds = seconds % 60
        minutes += q
    }

    if (minutes >= 60) {
        let q = Math.floor(minutes / 60)
        minutes = minutes % 60
        hours += q
    }

    res.render('index', { h: hours, m: minutes, s: seconds })

})

module.exports = router
