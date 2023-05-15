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
        w: window.innerWidth / 2 - lineWidth / 2,
        h: field.h,
        
        draw: function() {
            canvasCtx.fillRect(line.w, 0, lineWidth, line.h
            )
        }
    },
    ball = {
        x:200,
        y:300,
        r:20,
        draw: function() {
            canvasCtx.beginPath()
            canvasCtx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false)
            canvasCtx.fill()
        }
    },
    raqueteLeft = {
        w:lineWidth,
        h:150,
        draw: function() {
            canvasCtx.fillRect(5, 200, raqueteLeft.w, raqueteLeft.h)
        }
    },
    raqueteRight = {
        w:window.innerWidth- lineWidth - lineWidth / 2,
        h:raqueteLeft.h,
        draw: function() {
            canvasCtx.fillRect(
                raqueteRight.w, 200, lineWidth, raqueteRight.h)
        }
    },
    score = {
        score0: 3,
        score1: 4,
        draw: function() {
            canvasCtx.font = "bold 50px Poppins"
            canvasCtx.textAlign = "center"
            canvasCtx.textBaseline = "top"
            canvasCtx.fillText(score.score0, window.innerWidth / 4, 10)
            canvasCtx.fillText(score.score1, window.innerWidth / 4 + window.innerWidth / 2, 10)
        }
    }
function setup() {
    canvasElement.width = canvasCtx.width = field.w
    canvasElement.height = canvasCtx.height = field.h
}

function draw() {
    //desenho geral
    field.draw()

    canvasCtx.fillStyle = "#fff"
    //desenho divisoria
    line.draw()
    //raquete esquerda    
    raqueteLeft.draw()
    //raquete direita
    raqueteRight.draw()
    //bola
    ball.draw()
    //placar
    score.draw()
}

setup()
draw()