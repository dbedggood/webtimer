// set the message displayed when a timer is set
function timerSetMessage() {
  const timeArray = [['hour', h], ['minute', m], ['second', s]]

  let messageArray = []

  // for each element, format the value and unit as a string and push to messageArray
  for (const [unit, value] of timeArray) {
    if (value > 0) {
      messageArray.push(value + ' ' + (value == 1 ? unit : unit + 's'))
    }
  }

  let message = ''
  // join messageArray elements together to form a comprehensible sentence
  if (messageArray[0] == messageArray.slice(-1)) {
    message = messageArray[0] + '.'
  } else {
    message =
      messageArray.slice(0, -1).join(', ') +
      ' and ' +
      messageArray.slice(-1) +
      '.'
  }

  document.getElementById('timer').innerHTML = 'Timer set for ' + message
}

function runTimer() {
  checkUserIdle()
  calculateAndRenderTimerDuration()
}

// calculate the time left on the timer and display on screen
function calculateAndRenderTimerDuration() {
  document.getElementById('startTimer').innerHTML = 'Reset Timer'
  document.getElementById('timer').innerHTML = ''
  document.getElementById('timer').className = 'timer'

  // get the dates that the timer begins and ends at
  let timerBegin = new Date()
  timerEnd = new Date(timerBegin.getTime() + (s + (m + h * 60) * 60) * 1000)

  // display a warning if the user enters a duration over 100 hours
  if (timerEnd - timerBegin > 360000000) {
    document.getElementById('timer').innerHTML =
      'Timer cannot be set for longer than 100 hours.'
    document.title = '99:59:59'
    return
  }

  // render timer countdown (every 200ms because 1000ms is a bit laggy)
  const timer = setInterval(function() {
    // calculate time left
    const remainder = timerEnd - new Date().getTime()

    // split remainder time into hours, minutes and seconds
    const hours = (remainder / 3600000) | 0
    const minutes = ((remainder % 3600000) / 60000) | 0
    const seconds = ((remainder % 60000) / 1000) | 0

    // format countdown timer
    const timeLeft =
      (hours < 10 ? '0' + hours : hours) +
      ':' +
      (minutes < 10 ? '0' + minutes : minutes) +
      ':' +
      (seconds < 10 ? '0' + seconds : seconds)

    // render countdown on page and in website title
    document.getElementById('timer').innerHTML = timeLeft
    document.title = timeLeft

    // if the timer has finished, stop updating it
    if (remainder < 0) {
      clearInterval(timer)
      document.getElementById('timer').innerHTML = '00:00:00'
      document.title = '00:00:00'
      // also flash the browser tab to grab the user's attention
      timerEndBehaviour()
    }
  }, 200)
}

let userIsActive = false

function timerEndBehaviour() {
  userIsActive = false
  let ding = document.getElementById('ding')
  // play audio every 8 times the browser tab flashes
  let gap = 0
  // initial volume, increases over time
  let increasingVolume = 0.1
  // set two titles to switch between
  const titles = ['start.webtimer.link', '00:00:00']

  const alertUser = setInterval(function() {
    // stop if the user is active
    if (userIsActive) {
      document.title = titles[0]
      clearInterval(alertUser)
    } else {
      // flash the title
      document.title = document.title == titles[0] ? titles[1] : titles[0]
      // play the sound and increase volume slightly
      if (gap == 0) {
        ding.volume = increasingVolume
        ding.play()
        // reset counter
        gap = 8
        if (increasingVolume < 0.9) {
          increasingVolume += 0.1
        }
      }
      gap -= 1
    }
  }, 500)
}

function checkUserIdle() {
  let time
  document.onmousemove = resetIdleTimer
  document.onmousedown = resetIdleTimer
  document.onkeypress = resetIdleTimer

  let masthead = document.querySelector('header')
  let mastfoot = document.querySelector('footer')

  function hideUI() {
    userIsActive = false
    document.body.style.cursor = 'none'
    if (!masthead.classList.contains('fadeOutElement')) {
      masthead.classList.add('fadeOutElement')
      mastfoot.classList.add('fadeOutElement')
    }
  }

  function resetIdleTimer() {
    clearTimeout(time)
    userIsActive = true
    document.body.style.cursor = 'default'
    if (masthead.classList.contains('fadeOutElement')) {
      masthead.classList.remove('fadeOutElement')
      mastfoot.classList.remove('fadeOutElement')
      masthead.classList.add('fadeInElement')
      mastfoot.classList.add('fadeInElement')
    }
    time = setTimeout(hideUI, 5000)
  }
}

window.onload = function() {
  // only activate timer functions if a duration is actually set
  if (h + m + s > 0) {
    document.getElementById('startTimer').disabled = false
    timerSetMessage()
  }
}
