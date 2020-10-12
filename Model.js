"use strict"

function Model() {

    /* dimensions and stuff for view and model calculations */

    var canvas = document.getElementById("breakout");
    var context = canvas.getContext("2d");

    canvas.width = window.innerWidth*0.95;
    canvas.height = window.innerHeight*0.9;

    var ballRadius = (canvas.width)*0.02;
    var ballX = (canvas.width-(ballRadius*2))/2;
    var ballY = (canvas.width-(ballRadius*2))/2;
    var radius = ballRadius;

    var paddleWidth = canvas.width/3;
    var paddleHeight = canvas.height/50;
    var paddleX = (canvas.width-paddleWidth)/2
    var paddleY = canvas.height*0.90;

    var blockGap = canvas.width/50;
    var blockWidth = (canvas.width-(9*blockGap))/8;
    var blockHeight = blockWidth/2;

    var blocks = [];
    var blockCount = 32;

    var verticalBallDirection = -1.5;
    /* random angle to start game to add a bit of variety */
    var horizontalBallDirection = -(Math.random()*2);

    /* make array of objects for the bricks, have a visibility field which will be set to 0 on contact */

    var colours = ["red", "orange", "yellow", "green"]
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 4; j++) {
            var currentBlock = {}
            currentBlock.blockX = 0 + (i*blockWidth) + ((i*blockGap)+blockGap);
            currentBlock.blockY = 0 + (j*blockHeight) + ((j*blockGap)+blockGap);
            currentBlock.colour = colours[j];
            currentBlock.visible = 1;
            blocks.push(currentBlock);
        }
    }

    /* go through each block, check if the current ball xy co-ords conflict with the individual blocks xy co-ords, if true set visibility to 0
    some nice extra long ifs to stop it acting crazy at corners */

    this.hitBlock = function() {
        for (var i = 0; i < 32; i++) {
            if (blocks[i].visible == 1) {
                if (ballX+ballRadius > blocks[i].blockX && ballX-ballRadius < (blocks[i].blockX + blockWidth) && ballY+ballRadius > blocks[i].blockY && ballY-ballRadius < (blocks[i].blockY + blockHeight)) {

                    /*ball probably less likely to hit vertical sides of block so account for that first*/

                    if ((!(ballX - radius >= blocks[i].blockX) || !(ballX + radius <= blocks[i].blockX + blockWidth)) && ballY + (0.5*radius) > blocks[i].blockY && ballY - (0.5*radius) < blocks[i].blockY + blockHeight) {
                        horizontalBallDirection *= -1;
                        blocks[i].visible = 0;
                        blockCount = blockCount - 1;
                        return;
                    }

                    // if the ball hits one of the horizontal sides

                    else {
                        verticalBallDirection *= -1;
                        blocks[i].visible = 0;
                        blockCount = blockCount - 1;
                        return;
                    }
                }
            }
        }
    }

    // changes ball direction if hits the wall

    this.hitWall = function() {
        if (Math.trunc(ballX - ballRadius) < 0) {
            horizontalBallDirection *= -1;
        }
        else if (Math.trunc(ballX+ballRadius) > canvas.width) {
            horizontalBallDirection *= -1;
        }
        else if (Math.trunc(ballY - ballRadius) < 2) {
            verticalBallDirection *= -1;
        }
    }

    //returns true if ball xy co-ord hits bottom wall

    this.detectLost = function() {
        if (Math.trunc(ballY+ballRadius) > canvas.height-2) {
            verticalBallDirection *= -1;
            return true;
        }
        return false;
    }

    //returns true if no visible blocks left

    this.detectWin = function() {
        if (blockCount > 0) {
            return false; }
        return true;
    }

    //bounces ball if ball xy co-ords hit paddle xy co-ords

    this.hitPaddle = function() {
        /* Account for if the ball hits the vertical sides of the paddle */
        if (ballY+radius > paddleY && ballY-radius < paddleY+paddleHeight && (Math.trunc(ballX - paddleX + radius) <= 0 || Math.trunc(ballX - paddleX - paddleWidth - radius) == 0)) {
            horizontalBallDirection *= -1;
            return true;
        }
        if ((Math.trunc(ballY - paddleY + radius) == 0 /*|| Math.trunc(ballY - paddleY - paddleHeight - radius) == 0 */) && ballX + radius > paddleX && ballX - radius < paddleX + paddleWidth) {
            verticalBallDirection *= -1;
            return true;
        }
    }

    //a setter for the touchmove option for testing

    this.setPaddleX = function(x) {
       paddleX = x;
    }

    //takes gamma value from event listener in controller, which is has been converted from -90 to 90 to 0 to 180. move the paddle x co-ord based on the canvas width to gamma ratio

    this.updatePaddle = function(g) {
        if ((g*(canvas.width/180)-(0.5*paddleWidth)) >= 0 && (g*(canvas.width/180)+(0.5*paddleWidth)) <= canvas.width) {
            paddleX = (g*(canvas.width/180)-(0.5*paddleWidth));
        }
    }

    //updating the ball dependent on direction

    this.updateBallX = function() {
        ballY += verticalBallDirection;
    }

    this.updateBallY = function() {
        ballX += horizontalBallDirection;
    }

    //boring stuff, getters n setters

    this.getBlockWidth = function() {
        return blockWidth;
    }

    this.getBlockHeight = function() {
        return blockHeight;
    }

    this.getBlockTop = function() {
        return blockTop;
    }

    this.getBlockGap = function() {
        return blockGap;
    }

    this.getBlocks = function() {
        return blocks;
    }

    this.getBallX = function() {
        return ballX;
    }

    this.getBallY = function() {
        return ballY;
    }

    this.getPaddleX = function() {
        return paddleX;
    }

    this.getPaddleY = function() {
        return paddleY;
    }

    this.getPaddleWidth = function() {
        return paddleWidth;
    }

    this.getPaddleHeight = function() {
        return paddleHeight;
    }

    this.getBallRadius = function() {
        return ballRadius;
    }

    this.init = function() {
    }

}