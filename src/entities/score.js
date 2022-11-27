class Score extends Entity {
    constructor(params) {

        super(params)

        this._value = params.value

    }

    draw() {

        this._drawEngine.drawScore(this._value)

    }
    
}