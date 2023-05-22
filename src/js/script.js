const canvasElement = document.querySelector("canvas"),
    canvasCtx = canvasElement.getContext("2d"),
    lineWidth = 10,
    field = {
        w: window.innerWidth,
        h: window.innerHeight,
        draw: function() {
            canvasCtx.fillStyle = "#009999"
            canvasCtx.fillRect(0,0, field.w, field.h)
        }
    },
    
    line = {
        x: window.innerWidth / 2 - lineWidth / 2,
        y: 0,
        w: lineWidth,
        h: field.h,
        
        draw: function() {
            canvasCtx.fillRect(this.x, this.y, this.w, this.h
            )
        }
    },
    ball = {
        x:0,
        y:0,
        r:20,
        spd:15,
        directionX: 1,
        directionY: 1,
        _calcPosition: function () {
            if (
                (this.y - this.r < 0 && this.directionY < 0) ||
                (this.y > field.h - this.r && this.directionY > 0)
            ) {
                this.__reverseY()
            }
            if (this.x > field.w - paddleRight.w -this.r && this.directionX > 0) {
                if (
                    (this.y + this.r > paddleRight.y) &&
                    (this.y - this.r < paddleRight.y + paddleRight.h)
                ) {
                    this.__reverseX();
                } else {
                    score.increasePlayer1();
                }
            }
            if (this.x < 0 + paddleLeft.w + this.r && this.directionX < 0) {
                if (
                    (this.y + this.r > paddleLeft.y) && 
                    (this.y - this.r < paddleLeft.y + paddleLeft.h)
                )   {
                    this.__reverseX()
                }
                else [
                    score.increasePlayer2()
                ]
            }
        },
        __reverseX: function() {
            this.directionX *= -1
        },
        __reverseY: function() {
            this.directionY *= -1
        },
        __scoreUp: function() {
            this.x = field.w / 2
            this.y = field.h / 2
        },
        _move: function() {
            this.x += this.directionX * this.spd
            this.y += this.directionY * this.spd
        },
        draw: function() {
            canvasCtx.beginPath()
            canvasCtx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false)
            canvasCtx.fill()

            this._calcPosition()
            this._move()
        }
    },
    paddleLeft = {
        x: 5,
        y: 200,
        w:lineWidth,
        h: 150,
        spd: 15,
        _move: function() {
            // this.y = mouse.y - this.h / 2
            if (keys["w"]) {
                if (this.y > 10) {
                    this.y -= this.spd
                }
            }
            if (keys["s"]) {
                if (this.y < window.innerHeight - this.h - 10) {
                    this.y += this.spd
                }
            }
        },
        draw: function() {
            canvasCtx.fillRect(this.x, this.y, this.w, this.h)
            this._move()
        }
    },
    paddleRight = {
        x: window.innerWidth- lineWidth - lineWidth / 2,
        y: 200,
        w: lineWidth,
        h:paddleLeft.h,
        spd:15,
        _move: function() {
            if (keys["ArrowUp"]) {
                if (this.y > 10) {
                    this.y -= this.spd
                }
            }
            if (keys["ArrowDown"]) {
                if (this.y < window.innerHeight - this.h - 10) {
                    this.y += this.spd
                }
            }
        },
        draw: function() {
            canvasCtx.fillRect(this.x, this.y, this.w, this.h)
            this._move()
        }
    },
    score = {
        score0: 0,
        score1: 0,
        increasePlayer1: function() {
            this.score0 = this.score0 + 1
            ball.__scoreUp()
        },
        increasePlayer2: function() {
            this.score1 = this.score1 + 1
            ball.__scoreUp()
        },
        draw: function() {
            canvasCtx.font = "bold 50px sans-serif"
            canvasCtx.textAlign = "center"
            canvasCtx.textBaseline = "top"
            canvasCtx.fillText(score.score0, window.innerWidth / 4, 10)
            canvasCtx.fillText(score.score1, window.innerWidth / 4 + window.innerWidth / 2, 10)
            canvasCtx.fillText("Ping Pong", window.innerWidth / 2 + 7, 10)
        }
    }
    // mouse = {
    //     x: 0,
    //     y: 0
    // }
let keys = {};

function setup() {
    canvasElement.width = canvasCtx.width = field.w
    canvasElement.height = canvasCtx.height = field.h
}

function draw() {
    //desenho geral
    field.draw()
    //cor secundária
    canvasCtx.fillStyle = "#fff"
    //desenho divisoria
    line.draw()
    //raquete esquerda    
    paddleLeft.draw()
    //raquete direita
    paddleRight.draw()
    //bola
    ball.draw()
    //placar
    score.draw()
}

window.animateFrame = (function() {
    return(
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
        return window.setTimeout(callback, 1000 / 60);
        }
    )
})();
  
function main() {
    animateFrame(main);
    draw();
}

setup();
main();

// canvasElement.addEventListener('mousemove', function(e){
//     mouse.x = e.pageX
//     mouse.y = e.pageY

//     console.log(mouse)
// })

document.addEventListener("keydown", function(e) {
    keys[e.key] = true;
});
document.addEventListener("keyup", function(e) {
    keys[e.key] = false;
});