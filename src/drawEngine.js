class DrawEngine {
    drawImage( {spriteSheet, image, x, y, width, height} ) {}

    clear() {}
}

class CanvasDrawEngine extends DrawEngine {
    constructor({canvas}) {
        super()
        this._canvas = canvas
        this._ctx = canvas.getContext('2d')
    }

    drawImage( {spriteSheet, image, x, y, width, height} ) {
        super.drawImage({spriteSheet, image, x, y, width, height})
		this._ctx.drawImage(spriteSheet, image.x, image.y, image.w, image.h, x, y, width, height)
    }

    drawPipes( {spriteSheet, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight} ) {
        super.drawImage({spriteSheet, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight})
		this._ctx.drawImage(spriteSheet, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    }
    
    drawText({text, x, y}) {
        this._ctx.lineWidth = 2;
        this._ctx.fillStyle = '#fff'
        this._ctx.strokeStyle = "#000"
        this._ctx.font = '25px Teko'
        this._ctx.fillText(text, x, y)
        this._ctx.strokeText(text, x, y);
    }

    drawScore(value) {
        this._ctx.fillStyle = "#fff"
        this._ctx.strokeStyle = "#000"
        this._ctx.lineWidth = 2
        this._ctx.font = "35px Teko"
        this._ctx.fillText(value, this._canvas.width / 2, 50)
        this._ctx.strokeText(value, this._canvas.width / 2, 50)
    }

    drawBackground({x, y, width, height, color}) {
        this._ctx.fillStyle = color
        this._ctx.fillRect(x, y, width, height)
    }

    clear() {
        super.clear()
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height)
    }
}