class Snake {
    constructor({ body, size, color, direction }) {
        this.body = body;
        this.size = size;
        this.color = color;
        this.direction = direction;
    }
    update() {
        const head = this.body[this.body.length - 1]

        this.body.forEach((element,index)=>{
            if(index == this.body.length - 1)return
            if(element.x == head.x && element.y == head.y)gameOver()
        })

        this.body.forEach((postion, index) => {
            ctx.shadowColor = "#090",
                ctx.shadowBlur = 5,
                ctx.fillStyle = this.color
            if (index == this.body.length - 1) {
                ctx.fillStyle = "#090"
            }
            ctx.fillRect(postion.x, postion.y, this.size, this.size)
            ctx.shadowBlur = 0
        });

        if (head.x == food.x && head.y == food.y) {
            this.body.push({ x: food.x, y: food.y })
            score()
            food.randomPosition()
        }

        switch (this.direction) {
            case "right":
                this.body.push({ x: head.x + this.size, y: head.y })
                break
            case "left":
                this.body.push({ x: head.x - this.size, y: head.y })
                break
            case "up":
                this.body.push({ x: head.x, y: head.y - this.size })
                break
            case "down":
                this.body.push({ x: head.x, y: head.y + this.size })
                break
            default:
                return
        }
        this.body.shift()


        if (head.x < 0 || head.x > canvas.width - snake.size || head.y < 0 || head.y > canvas.height - snake.size)gameOver()
    }
}