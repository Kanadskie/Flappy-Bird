class Background extends Entity {
    constructor(params) {
        super(params)
		this.color = params.color
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
        
            this._drawEngine.drawImage({
				spriteSheet: sprites,
				image: this._frames[this._frameIdx],
				x: this.x + 275,
				y: this.y,
				width: this.width,
				height: this.height
			})
        })

		this._drawEngine.drawBackground({
			x: 0,
			y: 0,
			width: this._canvas.width,
			height: this._canvas.height,
			color: this.color
		})
    }
}