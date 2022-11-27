class Game {

    constructor() {

        this._config = new Config()

        this._canvasListener = null

        this._canvas = document.getElementById(this._config.canvas.id)
        this._canvas.width = this._config.canvas.width
        this._canvas.height = this._config.canvas.height

        this.height = this._config.canvas.height
        this.width = this._config.canvas.width

        this._soundDie = new Audio(this._config.sounds.die.src)
        this._soundFlap = new Audio(this._config.sounds.flap.src)
        this._soundPoint = new Audio(this._config.sounds.point.src)
        this._soundHit = new Audio(this._config.sounds.hit.src)

        this._drawEngine = new CanvasDrawEngine({canvas: this._canvas})
        this._physicsEngine = new PhysicsEngine({gravity: this._config.gravity})
        this._resourceLoader = new ResourceLoader()

        this._inputHandlerMouse = new MouseInputHandler({

            left: () => {

                this._bird.flap()

            }

        })

    }

    async prepare() {

        this._spriteSheet = this._resourceLoader.load({

            type: RESOURCE_TYPE.IMAGE,
            src: this._config.spritesheet.src,
            width: this._config.spritesheet.width,
            height: this._config.spritesheet.height,

        })

    }

    reset() {

        this._scoreCurrent = new Score({

            value: this._config.value,
            drawEngine: this._drawEngine,
            canvas: this

        })
        
        this._background = new Background({

            x: this._config.background.x,
            y: this._config.background.y,
            width: this._config.background.width,
            height: this._config.background.height,
            frames: this._config.background.frames,
            color: this._config.background.color,
            spriteSheet: this._spriteSheet,
            drawEngine: this._drawEngine,
            canvas: this

        })

        this._bird = new Bird({

            x: this._config.bird.x,
            y: this._config.bird.y,
            width: this._config.bird.width,
            height: this._config.bird.height,
            frames: this._config.bird.frames,
            spriteSheet: this._spriteSheet,
            flapSpeed: this._config.bird.flapSpeed,
            framesCounter: this._config.framesCounter,
            physicsEngine: this._physicsEngine,
            drawEngine: this._drawEngine,
            period: this._config.period,
            canvas: this

        })
        
        this._road = new Road({

            x: this._config.road.x,
            y: this._config.road.y,
            width: this._config.road.width,
            height: this._config.road.height,
            frames: this._config.road.frames,
            spriteSheet: this._spriteSheet,
            gameSpeed: this._config.gameSpeed,
            drawEngine: this._drawEngine,
            canvas: this

        })

        this._pipes = new Pipes({

            width: this._config.pipes.width,
            height: this._config.pipes.height,
            top: this._config.pipes.top,
            bottom: this._config.pipes.bottom,
            spriteSheet: this._spriteSheet,
            gap: this._config.pipes.gap,
            maxYPos: this._config.pipes.maxYPos,
            gameSpeed: this._config.gameSpeed,
            position: this._config.pipes.position,
            framesCounter: this._config.framesCounter,
            drawEngine: this._drawEngine,
            canvas: this,

        })

        this._startMsg = new Start({

            x: this._config.startMsg.x,
            y: this._config.startMsg.y,
            width: this._config.startMsg.width,
            height: this._config.startMsg.height,
            frames: this._config.startMsg.frames,
            spriteSheet: this._spriteSheet,
            drawEngine: this._drawEngine,
            canvas: this,

        })

        this._gameOverMsg = new GameOver({

            x: this._config.gameOverMsg.x,
            y: this._config.gameOverMsg.y,
            width: this._config.gameOverMsg.width,
            height: this._config.gameOverMsg.height,
            frames: this._config.gameOverMsg.frames,
            spriteSheet: this._spriteSheet,
            drawEngine: this._drawEngine,
            finalScoreX: this._config.gameOverMsg.finalScoreX,
            finalScoreY: this._config.gameOverMsg.finalScoreY,
            recordX: this._config.gameOverMsg.recordX,
            recordY: this._config.gameOverMsg.recordY,
            medalX: this._config.gameOverMsg.medals.x,
            medalY: this._config.gameOverMsg.medals.y,
            medalW: this._config.gameOverMsg.medals.width,
            medalH: this._config.gameOverMsg.medals.height,
            medalFrames: this._config.gameOverMsg.medals.frames,
            medalBronze: this._config.gameOverMsg.medals.medalsType.medalBronze,
            medalSilver: this._config.gameOverMsg.medals.medalsType.medalSilver,
            medalGold: this._config.gameOverMsg.medals.medalsType.medalGold,
            medalPlatinum: this._config.gameOverMsg.medals.medalsType.medalPlatinum,
            canvas: this,

        })

    }

    update() {

        this._road.update()
        this._bird.update()
        this._pipes.update()

    }

    draw() {

        this._background.draw()
        this._pipes.draw()
        this._road.draw()
        this._bird.draw()
        this._scoreCurrent.draw()

    }

    _loop() {

        ++this._pipes.framesCounter
        ++this._bird.framesCounter

        const now = Date.now()
        const delta =  now - this._lastUpdate

        this.update(delta / 1000)
        
        if (this._playing) {

            this._drawEngine.clear()
    
            this.draw()
            
            this._lastUpdate = now

            requestAnimationFrame(this._loop.bind(this))

        }

    }

    start() {

        this._canvas.removeEventListener('click', this._canvasListener)

        this._inputHandlerMouse.subscribe()

        this._playing = true

        this._lastUpdate = Date.now()
        
        this._loop()

        document.addEventListener('keydown', (e) => {

            if (e.key === "ArrowUp") {

                this._bird.flap()

            }

        })

    }

    ready() {

        this.reset()

        this._background.draw()
        this._road.draw()
        this._bird.draw()
        this._startMsg.draw()
        
        this._canvasListener = () => {

            this.start()

        }

        this._canvas.addEventListener('click', this._canvasListener)

    }

    gameOver() {

        this._inputHandlerMouse.unsubscribe()

        if (this._scoreCurrent._value > Number(localStorage.getItem('best'))) {

            localStorage.setItem('best', this._scoreCurrent._value)

        }

        this._drawEngine.clear()

        this._background.draw()
        this._pipes.draw()
        this._road.draw()
        this._bird.draw()
        this._gameOverMsg.draw()

        this._canvas.addEventListener("click", (evt) => {

            let rect = this._canvas.getBoundingClientRect()

            let clickX = evt.clientX - rect.left
            let clickY = evt.clientY - rect.top

            if (clickX >= this._config.startBtn.x && clickX <= this._config.startBtn.x + this._config.startBtn.width && clickY >= this._config.startBtn.y && clickY <= this._config.startBtn.y + this._config.startBtn.height) {
                
                location.reload()
            
            }

        })

        this._playing = false
        
    }

}
