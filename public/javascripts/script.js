let timerSetMessage = ""

if (m == 0) {
    if (h == 1) {
        timerSetMessage = h + ' hour.'
    } else {
        timerSetMessage = h + ' hours.'
    }
} else if (h == 0) {
    if (m == 1) {
        timerSetMessage = m + ' minute.'
    } else {
        timerSetMessage = m + ' minutes.'
    }
} else {
    if (h == 1) {
        timerSetMessage = h + ' hour and '
    } else {
        timerSetMessage = h + ' hours and '
    }
    if (m == 1) {
        timerSetMessage += m + ' minute.'
    } else {
        timerSetMessage += m + ' minutes.'
    }
}

window.onload = function() {
    document.getElementById('setMessage').innerHTML = 'Timer set for ' + timerSetMessage
}
