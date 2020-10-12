"use strict"

function View() {
    var canvas = document.getElementById("breakout");
    canvas.width = window.innerWidth*0.95;
    canvas.height = window.innerHeight*0.9;
    var context = canvas.getContext("2d");
    var x = (canvas.width-(canvas.width/3))/2;
    var y = canvas.height*0.95;
    var paddleWidth = canvas.width/3;
    var paddleHeight = canvas.height/50;
    var moveRatio = canvas.width/180;
    var blockGap = canvas.width/50;
    var blockWidth = (canvas.width-(9*blockGap))/8;
    var blockHeight = blockWidth/2;

    this.drawPaddle = function(x, y, pw, ph) {
        context.beginPath();
        context.rect(x, y, pw, ph);
        context.fillStyle = "blue";
        context.fill();
        context.lineWidth = 1;
        context.lineStyle = "black";
        context.stroke();
        context.closePath();
    }

    this.clearPaddle = function(x, y, pw, ph) {
        context.clearRect(x*0.98, y, pw*1.04, ph);
    }

    this.drawBall = function(x, y, r) {
        context.beginPath();
        context.arc(x, y, r, 0, 360);
        context.fillStyle = "black";
        context.fill();
    }

    this.displayMessage = function(m) {
        document.getElementById("child").innerHTML = m;
        document.getElementById("parent").style.visibility = "visible";
    }

    this.hideMessage = function() {
        document.getElementById("parent").style.visibility = "hidden";
    }

    this.clearCanvas = function() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    this.drawBlocks = function(blocks) {
        for (var i = 0; i < 32; i++) {
            var current = blocks[i]
            if (current.visible == 1) {
                context.beginPath();
                context.rect(current.blockX, current.blockY, blockWidth, blockHeight);
                context.fillStyle = current.colour;
                context.fill();
                context.lineWidth = 1;
                context.lineStyle = "black";
                context.stroke();
                context.closePath();
            }
        }
    }

    this.setPauseClickCallback = function (callback) {
        pause.addEventListener("click", callback);
    };

    this.setPlayClickCallback = function (callback) {
        play.addEventListener("click", callback);
    };

    this.setRestartClickCallback = function (callback) {
        restart.addEventListener("click", callback);
    };


    this.init = function () {
    }
}
