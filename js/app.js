/* app.js -- our main application code */
document.addEventListener('DOMContentLoaded', function() {
    var canvas = document.getElementById('game-canvas');
    // get context of Canvas object
    var ctx = canvas.getContext('2d');

//    ctx.fillStyle ='#FF0000';
//    ctx.strokeStyle = '#000000';
//    ctx.rect(10, 10, 100, 100);
//    ctx.fillRect(10, 10, 100, 100);
//    ctx.stroke();

    function randomInt(min, max) {
        return Math.floor((Math.random() * (max - min)) + min);
    }

    function randomColor() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }

    function createBall() {
        return {
            left: randomInt(0, canvas.width),
            top: randomInt(0, canvas.height),
            width: 10,
            height: 10,
            fillStyle: randomColor(),
            xVelocity: randomInt(1,4),
            yVelocity: randomInt(1,4)
        };
    }

    function renderBall(ball, ctx) {
        ctx.fillStyle = ball.fillStyle;
        ctx.beginPath();
        // 4 parameters: x center, y center, radius, starting angle (radians), ending, counterclockwise
        ctx.arc(ball.left + (ball.width/2), ball.top + (ball.height /2), ball.width / 2, 0, 2 * Math.PI);
        ctx.fill();
    }

    var idx;
    var ball;
    var balls = [];
    // create balls and push them into array
    for (idx = 0; idx < 10; idx++) {
        ball = createBall();
        balls.push(ball);
    }

    // call this function every 20 seconds
    window.setInterval(function() {
        // wipe the whole canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (idx = 0; idx < balls.length; idx++) {
            ball = balls[idx];

            ball.left += ball.xVelocity;
            ball.top += ball.yVelocity;

            // if went off left edge
            if (ball.left < 0) {
                ball.xVelocity = -ball.xVelocity;
                ball.left = 0;
            }

            // if went off right edge
            if (ball.left + ball.width > canvas.width) {
                ball.xVelocity = -ball.xVelocity;
                ball.left = canvas.width - ball.width;

            }

            // if went off top edge
            if (ball.top < 0) {
                ball.yVelocity = -ball.yVelocity
                ball.top = 0;
            }

            // if went off bottom edge
            if (ball.top + ball.height > canvas.height) {
                ball.yVelocity = -ball.yVelocity;
                ball.top = canvas.height - ball.height;
            }

            renderBall(ball, ctx);
        }



    }, 20);

});