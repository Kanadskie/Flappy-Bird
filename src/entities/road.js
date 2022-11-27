class Road extends Entity {

    constructor(params) {

        super(params)

        this.dx = params.dx

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
                x: this.x + this.width,
                y: this.y,
                width: this.width,
                height: this.height

            })


            this._drawEngine.drawImage({

                spriteSheet: sprites,
                image: this._frames[this._frameIdx],
                x: this.x + this.width * 2,
                y: this.y,
                width: this.width,
                height: this.height

            })
            
        })

    }

    update() {

        this.x = (this.x - this._canvas._pipes.gameSpeed) % (this.width / 2)
        
    }
    
}