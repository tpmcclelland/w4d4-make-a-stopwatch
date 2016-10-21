
var name = 'Christy'


function runsLater() {
    alert(name)
}

var firstTimeout = setTimeout(runsLater, 5000)
// runsLater()
console.log(firstTimeout)

var secondTimeout = setTimeout(function() {
    alert('This comes later')
}, 5000)

clearTimeout(firstTimeout)
clearTimeout(secondTimeout)

var actionTimer
var counter = 0

document.getElementById('action').addEventListener('click', function() {
    counter++
    this.innerHTML = counter

    clearTimeout(actionTimer)

    actionTimer = setTimeout(() => {
        this.innerHTML = '0'
    }, 2000)
})


var counter = 0
function doThis() {
    // console.log('doing something')
    counter++
    console.log(counter)
}

var timer

function start() {
    timer = setInterval(doThis, 1000)
}

document.getElementById('action').addEventListener('click', function() {
    clearInterval(timer)

    if (this.innerHTML === 'Paused') {
        start()
        this.innerHTML = 'Pause'
    } else {
        this.innerHTML = 'Paused'
    }

})

start()

var animationId
function animationLoop () {
    var button = document.getElementById('action')
    var top = Number(getComputedStyle(button).top.replace('px',''))

    if (top >= 600) {
        top = 0
    }

    button.style.position = 'absolute'
    button.style.top = top + 1 + 'px'


    animationId = requestAnimationFrame(animationLoop)
}

animationLoop()
