var express = require('express');
var router = express.Router();

/* GET home page. */
router.get(/^\/(\d+h)?(\d+m)?$/, function(req, res, next) {
  const time  = req.path.slice(1)
  let hours = ""
  let minutes = ""
  let output = ""
  const hIndex = time.indexOf("h")
  const mIndex = time.indexOf("m")

  if (hIndex < 0) {
    hours = "0"
    minutes = time.slice(0, mIndex)
  } else if (mIndex < 0) {
    hours = time.slice(0, hIndex)
    minutes = "0"
  } else {
    hours = time.slice(0, hIndex)
    minutes = time.slice(hIndex + 1, mIndex)
  }

  minutes = parseInt(minutes)
  hours = parseInt(hours)

  if (minutes >= 60) {
    let q = Math.floor(minutes/60)
    minutes = minutes % 60
    hours += q
  }

  if (minutes == 0) {
    if (hours == 1) {
      output = hours + ' hour.'
    } else {
      output = hours + ' hours.'
    }
  } else if (hours == 0) {
    if (minutes == 1) {
      output = minutes + ' minute.'
    } else {
      output = minutes + ' minutes.'
    }
  } else {
    if (hours == 1) {
      output = hours + ' hour and '
    } else {
      output = hours + ' hours and '
    }
    if (minutes == 1) {
      output += minutes + ' minute.'
    } else {
      output += minutes + ' minutes.'
    }
  }
  
  res.render('index', {message: output});

});

module.exports = router;
