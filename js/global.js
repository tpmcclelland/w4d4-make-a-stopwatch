//set global varibles
var tenthsCounter = 0
var secondsCounter = 0
var minsCounter = 0
var timer
var pausedTimer
var paused = true //on page load timer is "paused"

//create event listeners for click and dblclick on start btn
document.getElementById('start-btn').addEventListener('click', startBtnClickHandler)

document.getElementById('reset-btn').addEventListener('click', resetClickHandler)

document.getElementById('start-btn').addEventListener('dblclick', resetClickHandler)

//event listeners for keyboard shortcuts
window.addEventListener('keypress', keyboardShortcutsHandler)

function keyboardShortcutsHandler(e) {
    if (e.ctrlKey && e.key === 's') {
        start()
    } else if (e.ctrlKey && e.key === 'p') {
        pause()
    } else if (e.ctrlKey && e.key === 'r') {
        reset()
    }

}

//starts and pauses stopwatch, toggles paused var and blinking
function startBtnClickHandler() {

     if (paused) {
         this.innerHTML = 'Pause'
         start()
     } else {
         this.innerHTML = 'Continue'
         pause()
     }

}

//resets stopwatch
function resetClickHandler() {
    reset()
}

//increment counter and update dom
function runTimer() {
    var displayText = runCounters(true)
    document.getElementById('timer-window').innerHTML = displayText
}

//sets interval and toggle paused to false
function start() {
    clearInterval(timer)
    paused = false
    timer = setInterval(runTimer, 10)
    toggleFlashing(false)
    toggleButtonColor(false)
    toggleTextAnimation(true)
    pauseTimer()
}

//clear interval and toggle paused to true
function pause() {
    clearInterval(timer)
    paused = true
    toggleFlashing(true)
    toggleButtonColor(true)
    toggleTextAnimation(false)
    pauseTimer()
}

//start/stop pausedTimer
function pauseTimer() {
    if (paused) {
        clearTimeout(pausedTimer)
        pausedTimer = setTimeout(reset, 15000)
    } else {
        clearTimeout(pausedTimer)
    }
}

//resets watch
function reset() {
    paused = true
    clearTimeout(pausedTimer)
    clearInterval(timer)
    runCounters(false)
    document.getElementById('timer-window').innerHTML = '00:00:00'
    document.getElementById('start-btn').innerHTML = 'Start'
    toggleFlashing(false)
    toggleButtonColor(true)
    toggleTextAnimation(false)
}

function runCounters(start) {
    var totalCounter

    if (start) {
        tenthsCounter++
        document.querySelector('.tenths-container').style.transform = 'rotateZ(' + tenthsCounter * 6 + 'deg)'

        if (tenthsCounter === 100) {
            secondsCounter++
            document.querySelector('.seconds-container').style.transform = 'rotateZ(' + secondsCounter * 6 + 'deg)'
            tenthsCounter = 0
        }

        if (secondsCounter === 60) {
            minsCounter++
            document.querySelector('.minutes-container').style.transform = 'rotateZ(' + minsCounter * 6 + 'deg)'
            secondsCounter = 0
        }

        var formatedMins
        var formatedSecs

        //format mins for display
        if (minsCounter < 10) {
            formatedMins = '0' + minsCounter
        } else {
            formatedMins = minsCounter
        }

        //format seconds for display
        if (secondsCounter < 10) {
            formattedSecs = '0' + secondsCounter
        } else {
            formattedSecs = secondsCounter
        }

        return totalCounter = formatedMins + ':' + formattedSecs + ':' + tenthsCounter
    } else {
        tenthsCounter = 0
        secondsCounter = 0
        minsCounter = 0

        document.querySelector('.minutes-container').style.transform = 'rotateZ(0deg)'

        document.querySelector('.seconds-container').style.transform = 'rotateZ(0deg)'

        document.querySelector('.tenths-container').style.transform = 'rotateZ(0deg)'
        return 0
    }

}

//toggles animation using animate.css based on paused toggle
function toggleFlashing(toggle) {
    var timerWindow = document.getElementById('timer-window')

    if (toggle) {
        timerWindow.classList.add('animated')
        timerWindow.classList.add('infinite')
        timerWindow.classList.add('flash')
    } else {
        timerWindow.classList.remove('animated')
        timerWindow.classList.remove('infinite')
        timerWindow.classList.remove('flash')
    }
}

//change button color
function toggleButtonColor(toggle) {
    var timerBtn = document.getElementById('start-btn')

    if (toggle) {
        timerBtn.classList.add('btn-success')
        timerBtn.classList.remove('btn-warning')
    } else {
        timerBtn.classList.add('btn-warning')
        timerBtn.classList.remove('btn-success')
    }
}

//change the text color
var animationId
function toggleTextAnimation(toggle) {
    if (toggle) {
        startTextAnimation()
    } else {
        cancelTextAnimation()
    }

}

function getRandomNumber() {
    return Math.round(Math.random() * 10)
}

var redCounter = 0
var blueCounter = 0
var greenCounter = 0
var increaseRed = true
var increaseBlue = true
var increaseGreen = true

function startTextAnimation() {
    var timerWindow = document.getElementById('timer-window')

    increaseRed ? redCounter += getRandomNumber() : redCounter--
    increaseBlue ? blueCounter++ : blueCounter--
    increaseGreen ? greenCounter += getRandomNumber() : greenCounter--

    if (redCounter >= 250) {
        increaseRed = false
    } else if (redCounter === 25) {
        increaseRed = true
    }

    if (blueCounter >= 225) {
        increaseBlue = false
    } else if (blueCounter === 50) {
        increaseBlue = true
    }

    if (greenCounter >= 200) {
        increaseGreen = false
    } else if (greenCounter === 75) {
        increaseGreen = true
    }

    var color = `rgb(${redCounter},${greenCounter},${blueCounter})`
    timerWindow.style.color = color
    animationId = requestAnimationFrame(startTextAnimation)
}

//end the color animation loop and reset everything.
function cancelTextAnimation() {
    cancelAnimationFrame(animationId)
    var timerWindow = document.getElementById('timer-window')
    timerWindow.style.color = 'black'
    redCounter = 0
    blueCounter = 0
    greenCounter = 0
    increaseRed = true
    increaseBlue = true
    increaseGreen = true
}

//display the real time on the screen and update every second
function getTime() {
    var displayTime
    document.getElementById('time').innerHTML = moment().format('h:mm')
    clearInterval(displayTime)
    displayTime = setInterval(function() {
        document.getElementById('time').innerHTML = moment().format('h:mm')
    }, 1000)
}

getTime()
