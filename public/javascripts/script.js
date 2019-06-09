function timerSetMessage() {
    let message = ''

    if (m == 0) {
        if (h == 1) {
            message = h + ' hour.'
        } else {
            message = h + ' hours.'
        }
    } else if (h == 0) {
        if (m == 1) {
            message = m + ' minute.'
        } else {
            message = m + ' minutes.'
        }
    } else {
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
    }

    document.getElementById('setMessage').innerHTML = 'Timer set for ' + message
}

function remainingTime() {
    let time = new Date()
    time = new Date(time.getTime() + (m + h * 60) * 60 * 1000)

    const timer = setInterval(function() {
        const now = new Date().getTime()
        const remainder = time - now

        const hours = Math.floor(
            (remainder % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        )
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
            document.getElementById('timeRemaining').innerHTML = '00:00:00'
            document.title = '00:00:00'
        }
    }, 1000)
}

window.onload = function() {
    timerSetMessage()
    remainingTime()
}
