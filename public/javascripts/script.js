function timerSetMessage() {
    let message = ''

    if (m == 0 && s == 0) {
        if (h == 1) {
            message = h + ' hour.'
        } else {
            message = h + ' hours.'
        }
    } else if (h == 0 && s == 0) {
        if (m == 1) {
            message = m + ' minute.'
        } else {
            message = m + ' minutes.'
        }
    } else if (h == 0 && m == 0) {
        if (s == 1) {
            message = s + ' second.'
        } else {
            message = s + ' seconds.'
        }
    } else if (s == 0) {
        if (h == 1) {
            message = h + ' hour and '
        } else {
            message = h + ' hours and '
        }
        if (m == 1) {
            message += m + ' minute.'
        } else {
            message += m + ' minutes.'
        }
    } else if (m == 0) {
        if (h == 1) {
            message = h + ' hour and '
        } else {
            message = h + ' hours and '
        }
        if (s == 1) {
            message += s + ' second.'
        } else {
            message += s + ' seconds.'
        }
    } else if (h == 0) {
        if (m == 1) {
            message = m + ' minute and '
        } else {
            message = m + ' minutes and '
        }
        if (s == 1) {
            message += s + ' second.'
        } else {
            message += s + ' seconds.'
        }
    } else {
        if (h == 1) {
            message = h + ' hour, '
        } else {
            message = h + ' hours, '
        }
        if (m == 1) {
            message += m + ' minute and '
        } else {
            message += m + ' minutes and '
        }
        if (s == 1) {
            message += s + ' second.'
        } else {
            message += s + ' seconds.'
        }
    }

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
    timerSetMessage()
    remainingTime()
}
