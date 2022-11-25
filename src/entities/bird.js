class Bird extends Entity {
    constructor(params) {
        super(params)
        this._flapSpeed = params.flapSpeed
        this._physicsEngine = params.physicsEngine
        this.period = params.period
        this.falling = true
    }

    update() {

        this._frameIdx += this.framesCounter % this.period == 0 ? 1 : 0;
        this._frameIdx = this._frameIdx % this._frames.length 
        this._physicsEngine.update(this)

        this.collide()
    }

    collide() {

        const collideRoad = this.y + this.height >= this._canvas.height - 112

        if(this.y < 0) {
            this.y = 0
        }

        if(collideRoad) {

            this._canvas._soundHit.play()

            setTimeout(() => {
                this._canvas._soundDie.play()
            }, 800)

            this._canvas.gameOver()
        }
    }

    flap() {
            this._canvas._soundFlap.play()
            this.speed = -this._flapSpeed
    }
}