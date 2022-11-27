class Pipes extends Entity {

    constructor(params) {

        super(params)

        this.position = params.position
        this.canvas = params.canvas
        this.top = params.top
        this.bottom = params.bottom
        this.dx = params.dx
        this.maxYPos = params.maxYPos
        this.gap = params.gap

    }

    draw() {
        
        for(let i = 0; i < this.position.length; i++) {

            let p = this.position[i]       
            
            let topYPos = p.y

            let bottomYPos = p.y + this.height + this.gap

            this._spriteSheet.then(sprites => {

                this._drawEngine.drawPipes({

                    spriteSheet: sprites,
                    sx: this.top.sX,
                    sy: this.top.sY,
                    sWidth: this.width,
                    sHeight: this.height,
                    dx: p.x,
                    dy: topYPos,
                    dWidth: this.width,
                    dHeight: this.height

                })

                this._drawEngine.drawPipes({

                    spriteSheet: sprites,
                    sx: this.bottom.sX,
                    sy: this.bottom.sY,
                    sWidth: this.width,
                    sHeight: this.height,
                    dx: p.x,
                    dy: bottomYPos,
                    dWidth: this.width,
                    dHeight: this.height   

                })

            })

        }

    }

    update() {

        if (this.framesCounter % 100 == 0) {

            this.position.push({

                x : this.canvas.width,
                y : this.maxYPos * (Math.random() + 1)

            })

        }

        for (let i = 0; i < this.position.length; i++) {

            let p = this.position[i]

            const pipeX1 = p.x
            const pipeX2 = p.x + this.width

            const topPipeY = p.y + this.height
            const botPipeY = p.y + this.height + this.gap

            const topRBirdX = this._canvas._bird.x + this._canvas._bird.width
            const topRBirdY = this._canvas._bird.y // same as topLBirdY
    
            const botRBirdX = this._canvas._bird.x + this._canvas._bird.width
            const botRBirdY = this._canvas._bird.y + this._canvas._bird.height

            const topLBirdX = this._canvas._bird.x 
    
            const conditionForBottomPipe_R = ((botRBirdX >= pipeX1) && (botRBirdX < pipeX2)) && (botRBirdY >= botPipeY) 
            
            const conditionForBottomPipe_L = ((topLBirdX >= pipeX1) && (topLBirdX < pipeX2)) && (botRBirdY >= botPipeY)
            
            const conditionForTopPipe_R = ((topRBirdX >= pipeX1) && (topRBirdX < pipeX2)) && (topRBirdY <= topPipeY) 
            
            const conditionForTopPipe_L = ((topLBirdX >= pipeX1) && (topLBirdX < pipeX2)) && (topRBirdY <= topPipeY)

            const conditionGameOver =

                conditionForBottomPipe_R 

                || conditionForBottomPipe_L

                || conditionForTopPipe_R 

                || conditionForTopPipe_L

            if (conditionGameOver) {

                this._canvas._soundHit.play()

                setTimeout(() => {

                    this._canvas._soundDie.play()

                }, 800)

                this._canvas.gameOver()

            }

            p.x -= this.gameSpeed
        
            if (p.x + this.width <= 0) {

                this.position.shift()

            }

            if (p.x === this._canvas._bird.x) {

                ++this._canvas._scoreCurrent._value

                this._canvas._soundPoint.play()

            }

        }

    }

}

