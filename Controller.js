"use strict";


var view = new View();
var model = new Model();
var controller = null;

function Controller() {

    var timer;
    var timeOut;
    var g;

    /* handle the gamma values */

    this.movePaddle = function(event) {
        g = event.gamma;
        g += 90;
        model.updatePaddle(g)
    }

    /* for touchmove usage and testing */

    this.movePaddleTouch = function(event) {
        model.setPaddleX(event.touches[0].clientX);
    }

    this.pauseGame = function() {
        view.displayMessage("Paused...");
        controller.clearTimers();
        controller.clearEventListeners();
    }

    this.playGame = function() {
        controller.clearTimers();
        controller.setUpdateTimer();
        view.hideMessage();
        controller.setUpEventListeners();
    }

    this.restartGame = function(m) {
        controller.clearTimers();
        controller.clearEventListeners();
        view.displayMessage(m);
        timeOut = setTimeout(function(){
            view.hideMessage();
            view = new View();
            model = new Model();
            controller.init();
            }, 3000);
    }

    /* the stuff that happens at refresh */

    this.updateGame = function() {
        if (model.detectLost()) {
            controller.restartGame("Game Over :(")
            return;
        }
        else if (model.detectWin()) {
            controller.restartGame("You Win! :)");
             return;
             }
        else {

        view.clearCanvas();

        /* check any collisions that will affect ball direction or blocks */

        model.hitBlock();
        model.hitWall();
        model.hitPaddle();
        model.updateBallX();
        model.updateBallY();

        /* draw updated game view */

        view.drawBall(model.getBallX(), model.getBallY(), model.getBallRadius());
        view.drawBlocks(model.getBlocks());
        view.drawPaddle(model.getPaddleX(), model.getPaddleY(), model.getPaddleWidth(), model.getPaddleHeight())


        }
    }

    /* used/altered from the 317 website. i have an iphone so was needed for testing */
    this.handleSensorsClick = function() {
        if (window.DeviceOrientationEvent){
                if (typeof DeviceOrientationEvent.requestPermission === 'function') {
                    DeviceOrientationEvent.requestPermission()
                        .then(permissionState => {
                            if (permissionState === 'granted') {
                                window.addEventListener("deviceorientation", controller.movePaddle);
                                document.getElementById("sensors").innerHTML = "Sensors Enabled";
                                document.getElementById("sensors").style.color = "green";
                            }
                        })
                        .catch(console.error);
                } else {
                    window.addEventListener("deviceorientation", controller.modePaddle);
                    document.getElementById("sensors").innerHTML = "Sensors Enabled";
                    document.getElementById("sensors").style.color = "green";
                }
            }
    }

    this.setUpEventListeners = function() {

        document.getElementById("sensors").addEventListener("click", controller.handleSensorsClick);

        if (window.DeviceOrientationEvent) {
            window.addEventListener("deviceorientation", controller.movePaddle);
        } else {
            alert("Sorry, your browser doesn't support Device Orientation");
        }

    }

    this.setUpCallbacks = function() {
        view.setPauseClickCallback(function() {
            controller.pauseGame();
        });

        view.setPlayClickCallback(function() {
            controller.playGame();
        });

        view.setRestartClickCallback(function() {
            controller.restartGame("Restarting...");
        });

    }

    this.clearTimers = function() {
        clearTimeout(timeOut);
        clearTimeout(timer);
    }


    this.clearEventListeners = function() {
        document.getElementById("sensors").removeEventListener("click", controller.handleSensorsClick);

        if (window.DeviceOrientationEvent) {
            window.removeEventListener("deviceorientation", controller.movePaddle);
        } else {
            alert("Sorry, your browser doesn't support Device Orientation");
        }
    }

    this.setUpdateTimer = function() {
        timer = setInterval(function() {
            controller.updateGame();
        }, 10);
    }

    this.init = function() {

        controller.setUpEventListeners();
        controller.setUpCallbacks();
        controller.clearTimers();
        controller.setUpdateTimer();

        /* draw initial view of the game */

        view.clearCanvas();
        view.drawPaddle(model.getPaddleX(), model.getPaddleY(), model.getPaddleWidth(), model.getPaddleHeight());
        view.drawBall(model.getBallX(), model.getBallY(), model.getBallRadius());
        view.drawBlocks(model.getBlocks())
    }
}

controller = new Controller();

window.addEventListener("load", controller.init);

/* this app can also be used by dragging the paddle bar as well as the gamma change values, mostly for testing purposes  */
window.addEventListener("touchmove", controller.movePaddleTouch);





