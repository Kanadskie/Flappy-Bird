class Entity {
    constructor({x, y, width, height, frames, framesCounter, gameSpeed, spriteSheet, drawEngine, canvas}) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.framesCounter = framesCounter
        this.falling = false
        this.speed = 0
        this.gameSpeed = gameSpeed

        this._frames = frames
        this._frameIdx = 0
        this._spriteSheet = spriteSheet
        this._drawEngine = drawEngine
        this._canvas = canvas

    }

    draw() {

		this._spriteSheet.then(sprites => {
            this._drawEngine.drawImage({
				spriteSheet: sprites,
				image: this._frames[this._frameIdx],
				x: this.x,
				y: this.y,
				width: this.width,
				height: this.height
			})
        })
    }

    update() {}
}