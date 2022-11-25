class GameOver extends Entity {
    constructor(params) {
        super(params)
        this._finalScoreX = params.finalScoreX
        this._finalScoreY = params.finalScoreY

        this._recordX = params.recordX
        this._recordY = params.recordY

        this._medalX = params.medalX
        this._medalY = params.medalY
        this._medalW = params.medalW
        this._medalH = params.medalH
        this._medalFrames = params.medalFrames

        this._medalBronze = params.medalBronze
        this._medalSilver = params.medalSilver
        this._medalGold = params.medalGold
        this._medalPlatinum = params.medalPlatinum
    }

    draw() {
        this.drawResults()
    }

   async drawResults() {

        await super.draw()

        this._drawEngine.drawText({
            x: this._finalScoreX,
            y: this._finalScoreY,
            text: this._canvas._scoreCurrent._value,
        })

        this._drawEngine.drawText({
            x: this._recordX,
            y: this._recordY,
            text: this._scoreBest = !localStorage.getItem('best') ? 0 : localStorage.getItem('best')
        })


        if (this._canvas._scoreCurrent._value >= this._medalBronze && this._canvas._scoreCurrent._value < this._medalSilver) {
            this.drawMedal(3)
        }

        if (this._canvas._scoreCurrent._value >= this._medalSilver && this._canvas._scoreCurrent._value < this._medalGold) {
            this.drawMedal(2)
        }
        
        if (this._canvas._scoreCurrent._value >= this._medalGold && this._canvas._scoreCurrent._value < this._medalPlatinum) {
            this.drawMedal(1)
        }

        if (this._canvas._scoreCurrent._value >= this._medalPlatinum) {
            this.drawMedal(0)
        }
             
    }

    drawMedal(medalNum) {
        this._spriteSheet.then(sprites => {
            this._drawEngine.drawImage({
                spriteSheet: sprites,
                image: this._medalFrames[medalNum],
                x: this._medalX,
                y: this._medalY,
                width: this._medalW,
                height: this._medalH
            })
        })
    }

}