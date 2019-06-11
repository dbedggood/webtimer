var express = require('express')
var router = express.Router()

/* GET timer page. */
router.get(/^\/(\d+h)?(\d+m)?(\d+s)?$/, function(req, res, next) {

    // get the path from the url
    const time = req.path.slice(1)

    // find which units of time were inputted
    const unitIndexArray = [time.indexOf('h'), time.indexOf('m'), time.indexOf('s')]
    
    // array of duration by unit, i.e. [h, m, s]
    let timeArray = [0, 0, 0]

    let previousIndex = 0
    for (let i = 0; i < unitIndexArray.length; i++) {
        // update the timeArray index with the duration of the time unit entered
        if (unitIndexArray[i] >= 0) {
            timeArray[i] = parseInt(time.slice(previousIndex, unitIndexArray[i]))
            previousIndex = unitIndexArray[i] + 1
        }
    }

    for (let i = timeArray.length; i > 0; i--) {
        // change minutes and seconds into hours and minutes respectively if > 60
        if (i > 0) {
            let q = (timeArray[i]/60) | 0
            timeArray[i] = timeArray[i] % 60
            timeArray[i - 1] += q
        }
    }
    
    // render index page with time variables 
    res.render('index', { h: timeArray[0], m: timeArray[1], s: timeArray[2] })

})

module.exports = router
