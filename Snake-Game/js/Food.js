class Food {
    constructor({ x, y, color }) {
        this.x = x,
            this.y = y,
            this.color = color
    }
    update() {
        ctx.shadowColor = this.color,
            ctx.shadowBlur = 20,

            ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, snake.size, snake.size)
        ctx.shadowBlur = 0
    }
    randomPosition() {
        const randomNumber = (min, max) => {
            const number = Math.round(Math.random() * (max - min) + min)
            return Math.round(number / snake.size) * snake.size

        }

        
        while (snake.body.some((element) => element.x == this.x && element.y == this.y)) {
            this.x = randomNumber(0, canvas.width - snake.size)
            this.y = randomNumber(0, canvas.height - snake.size)
        }

    }
}