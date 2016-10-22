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
        if (tenthsCounter === 100) {
            secondsCounter++
            tenthsCounter = 0
        }

        if (secondsCounter === 60) {
            minsCounter++
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

//draw the circle on the screen
function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext){
     var ctx = canvas.getContext('2d');
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.arc(100,100,95,0,Math.PI*2,true); // Outer circle
    ctx.stroke();
  }
}

function initLocalClocks() {
  // Get the local time using JS
  var date = new Date;
  var seconds = date.getSeconds();
  var minutes = date.getMinutes();
  var hours = date.getHours();

  // Create an object with each hand and it's angle in degrees
  var hands = [
    {
      hand: 'hours',
      angle: (hours * 30) + (minutes / 2)
    },
    {
      hand: 'minutes',
      angle: (minutes * 6)
    },
    {
      hand: 'seconds',
      angle: (seconds * 6)
    }
  ];
  // Loop through each of these hands to set their angle
  for (var j = 0; j < hands.length; j++) {
    var elements = document.querySelectorAll('.' + hands[j].hand);
    for (var k = 0; k < elements.length; k++) {
        elements[k].style.webkitTransform = 'rotateZ('+ hands[j].angle +'deg)';
        elements[k].style.transform = 'rotateZ('+ hands[j].angle +'deg)';
        // If this is a minute hand, note the seconds position (to calculate minute position later)
        if (hands[j].hand === 'minutes') {
          elements[k].parentNode.setAttribute('data-second-angle', hands[j + 1].angle);
        }
    }
  }
}

/*
 * Set a timeout for the first minute hand movement (less than 1 minute), then rotate it every minute after that
 */
function setUpMinuteHands() {
  // Find out how far into the minute we are
  var containers = document.querySelectorAll('.minutes-container');
  var secondAngle = containers[0].getAttribute("data-second-angle");
  if (secondAngle > 0) {
    // Set a timeout until the end of the current minute, to move the hand
    var delay = (((360 - secondAngle) / 6) + 0.1) * 1000;
    setTimeout(function() {
      moveMinuteHands(containers);
    }, delay);
  }
}

/*
 * Do the first minute's rotation
 */
function moveMinuteHands(containers) {
  for (var i = 0; i < containers.length; i++) {
    containers[i].style.webkitTransform = 'rotateZ(6deg)';
    containers[i].style.transform = 'rotateZ(6deg)';
  }
  // Then continue with a 60 second interval
  setInterval(function() {
    for (var i = 0; i < containers.length; i++) {
      if (containers[i].angle === undefined) {
        containers[i].angle = 12;
      } else {
        containers[i].angle += 6;
      }
    //   containers[i].style.webkitTransform = 'rotateZ('+ containers[i].angle +'deg)';
      containers[i].style.transform = 'rotateZ('+ containers[i].angle +'deg)';
    }
  }, 60000);
}

/*
 * Move the second containers
 */
function moveSecondHands() {
  var containers = document.querySelectorAll('.seconds-container');
  setInterval(function() {
    for (var i = 0; i < containers.length; i++) {
      if (containers[i].angle === undefined) {
        containers[i].angle = 6;
      } else {
        containers[i].angle += 6;
      }
    //   containers[i].style.webkitTransform = 'rotateZ('+ containers[i].angle +'deg)';
      containers[i].style.transform = 'rotateZ('+ containers[i].angle +'deg)';
    }
  }, 1000);
}

// draw()
getTime()
initLocalClocks()
setUpMinuteHands()
moveSecondHands()
