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
            if (value == 1) {
                messageArray.push(value + ' ' + unit)
            } else {
                messageArray.push(value + ' ' + unit + 's')
            }
        }
    }

    // join messageArray elements together to form a comprehensible sentence
    const message = messageArray.slice(0, -1).join(', ') + ' and ' + messageArray.slice(-1) + '.'

    document.getElementById('setMessage').innerHTML = 'Timer set for ' + message
}

function remainingTime() {
    let time = new Date()
    time = new Date(time.getTime() + (s + (m + h * 60) * 60) * 1000)
    const ding = document.getElementById('ding')
    ding.load()
    
    if (time - new Date().getTime() > 1000 * 60 * 60 * 100) {
        document.getElementById('setMessage').innerHTML = 'Timer cannot be set for longer than 100 hours.'
        document.title = '99:59:59'
        return
    }

    const timer = setInterval(function() {
        const now = new Date().getTime()
        const remainder = time - now

        const hours = Math.floor((remainder % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60))
        const minutes = Math.floor((remainder % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((remainder % (1000 * 60)) / 1000)

        const timeLeft =
            (hours < 10 ? '0' + hours : hours) +
            ':' +
            (minutes < 10 ? '0' + minutes : minutes) +
            ':' +
            (seconds < 10 ? '0' + seconds : seconds)

        document.getElementById('timeRemaining').innerHTML = 'Time remaining: ' + timeLeft
        document.title = timeLeft

        if (remainder < 0) {
            clearInterval(timer)
            document.getElementById('timeRemaining').innerHTML = 'Time remaining: 00:00:00'
            ding.play()
            document.title = '00:00:00'
            flashTab()
        }
    }, 200)
}

function flashTab() {
    const flash = setInterval(function() {
        if (document.title == '00:00:00') {
            document.title = 'start.webtimer.link'
        } else {
            document.title = '00:00:00'
        }
        if (document.hasFocus()) {
            document.title = 'start.webtimer.link'
            clearInterval(flash)
        }
    } , 500)

}

window.onload = function() {
    if (h+m+s > 0) {
        timerSetMessage()
        remainingTime()
    }
}
