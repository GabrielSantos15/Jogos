const txtScore = document.querySelector("#score")
const txtRecord = document.querySelector("#record")

const canvas = document.querySelector("#tela")
const ctx = canvas.getContext("2d")

canvas.width = 600;
canvas.height = 600;

let loopId
let points = 0
let record = localStorage.getItem("record") || 0
txtRecord.innerHTML = record
let gameOverStatus = false


const snake = new Snake({
    body: [{ x: 60, y: 270 }, { x: 90, y: 270 }, { x: 120, y: 270 }],
    size: 30,
    color: "#0cff39",
    direction: ""
}
)

const food = new Food({
    x: 300,
    y: 270,
    color: "#f00"
})

function game() {
    if (gameOverStatus) return

    clearInterval(loopId)
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.lineWidth = 1
    ctx.strokeStyle = "#191919"
    for (let i = 0; i < canvas.width; i += snake.size) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, canvas.width)
        ctx.moveTo(0, i)
        ctx.lineTo(canvas.height, i)
        ctx.stroke()
    }

    food.update()
    snake.update()


    loopId = setTimeout(game, 130)
}
game()

addEventListener("keydown", (key) => {
    console.log(key.code)
    if ((key.code == "ArrowRight" || key.code == "KeyD") && snake.direction != "left") {
        snake.direction = "right"
    } else if ((key.code == "ArrowLeft" || key.code == "KeyA") && snake.direction != "right") {
        snake.direction = "left"
    } else if ((key.code == "ArrowUp" || key.code == "KeyW") && snake.direction != "down") {
        snake.direction = "up"
    } else if ((key.code == "ArrowDown" || key.code == "KeyS") && snake.direction != "up") {
        snake.direction = "down"
    }
})

function score() {
    points++
    txtScore.innerHTML = points

    if (points > record) {
        record = points
        txtRecord.innerHTML = points
        localStorage.setItem("record", record)
    }
}

function gameOver() {
    const gameScreen = document.querySelector("#game")
    const gameOverContainer = document.querySelector("#gameOver")

    gameOverStatus = true
    setTimeout(() => { gameOverContainer.classList.remove("hidden") }, 1000)

    gameScreen.classList.add("apply-shake");

    gameScreen.addEventListener("animationend", (e) => {
        gameScreen.classList.remove("apply-shake");
    });
}