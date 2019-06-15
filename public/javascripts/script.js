// set the message displayed when a timer is set
function timerSetMessage() {
    
    const timeArray = [
        ['hour', h],
        ['minute', m],
        ['second', s]
    ]

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
        message = messageArray.slice(0, -1).join(', ') + ' and ' + messageArray.slice(-1) + '.'
    }

    document.getElementById('timer').innerHTML = 'Timer set for ' + message
}

// calculate the time left on the timer and display on screen
function remainingTime() {

    document.getElementById('startTimer').innerHTML = 'Reset Timer'
    document.getElementById('timer').innerHTML = ''
    document.getElementById('timer').className = 'timer'

    // get the dates that the timer begins and ends at
    let timerBegin = new Date()
    timerEnd = new Date(timerBegin.getTime() + (s + (m + (h * 60)) * 60) * 1000)
    
    // display a warning if the user enters a duration over 100 hours
    if (timerEnd - timerBegin > 360000000) {
        document.getElementById('timer').innerHTML = 'Timer cannot be set for longer than 100 hours.'
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
            // play a sound to grab the user's attention
            const ding = document.getElementById('ding')
            ding.play()
            document.title = '00:00:00'
            // also flash the browser tab to grab the user's attention
            flashTab()
        }
    }, 200)
}

function flashTab() {
    const flash = setInterval(function() {
        
        // set two titles to switch between
        const titles = ['start.webtimer.link', '00:00:00']

        // if the user is looking at the tab, stop flashing
        if (document.hasFocus()) {
            document.title = titles[0]
            clearInterval(flash)
        // otherwise, alternate the title message
        } else {
            document.title = document.title == titles[0] ? titles[1] : titles[0]
        }
        
    } , 500)

}

window.onload = function() {
    // only activate timer functions if a duration is actually set
    if (h+m+s > 0) {
        timerSetMessage()
    }
}
