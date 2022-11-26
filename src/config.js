class Config {
    gravity = 0.25
    value = 0
    framesCounter = 0
    period = 7
    gameSpeed = 2

    canvas = {
        id: 'game',
        width: 340,
        height: 480,
    }

    spritesheet = {
        width: 606,
        height: 428,
        src: 'assets/spritesheet.png'
    }

    sounds = {
        die: {
            src: 'audio/die.wav'
        },

        flap: {
            src: 'audio/flap.wav'
        },

        point: {
            src: 'audio/point.wav'
        },

        hit: {
            src: 'audio/hit.wav'
        }
    }

    background = {
        x: 0,
        y: 255,
        width: 275,
        height: this.canvas.height - 252,
        frames: [
            {
                x: 0,
                y: 0,
                w: 275,
                h: 228,
            }, 
        ],
        color: '#70c5ce'
    }

    road = {
        x: 0,
        y: this.canvas.height - 112,
        width: 224,
        height: 122,
        frames: [
            {
                x: 276,
                y: 0,
                w: 224,
                h: 112,
            }
        ],
    }

    bird = {
        x: 50,
        y: 150,
        width: 34,
        height: 26,

        flapSpeed: 4.6,
        
        frames:  [
            {
                x: 276,
                y: 164,
                w: 34,
                h: 26,
            },
            
            {
                x: 276,
                y: 139,
                w: 34,
                h: 26,
            },
            
            {
                x: 276,
                y: 112,
                w: 34,
                h: 26,
            },

            {
                x: 276,
                y: 139,
                w: 34,
                h: 26,
            },
        ]
    }

    pipes = {
        position: [],

        width: 53,
        height: 400,
        gap: 100,
        maxYPos: -175,
    
        top: {
            sX: 553,
            sY: 0
        },
        bottom: {
            sX: 502,
            sY: 0
        }

    }

    startMsg = {
        x: this.canvas.width / 2 - 173 / 2,
        y: 80,
        width: 173,
        height: 152,
        frames: [
            {
                x: 0,
                y: 228,
                w: 173,
                h: 152,
            }
        ],
    }

    gameOverMsg = {
        x: this.canvas.width / 2 - 225 / 2,
        y: 90,
        width: 228,
        height: 202,
        frames: [
            {
                x: 175,
                y: 228,
                w: 225,
                h: 202,
            }
        ],

        finalScoreX: 240,
        finalScoreY: 185,

        recordX: 240,
        recordY: 227,

        medals: {
            x: 82,
            y: 177,
            width: 45,
            height: 44,
            frames: [
                {
                    x: 312,
                    y: 112,
                    w: 45,
                    h: 44,
                },
                {
                    x: 312,
                    y: 158,
                    w: 45,
                    h: 44,
                },
                {
                    x: 359,
                    y: 112,
                    w: 45,
                    h: 44,
                },
                {
                    x: 359,
                    y: 158,
                    w: 45,
                    h: 44,
                },
            ],
            medalsType: {
                medalBronze: 10,
                medalSilver: 20,
                medalGold: 30,
                medalPlatinum: 40
            }
        }
    }

    startBtn = {
        x: 132,
        y: 263,
        width: 83,
        height: 29
    }
}
