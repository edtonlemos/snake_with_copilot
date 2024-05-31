// Game variables
let canvas = document.getElementById('game');
let context = canvas.getContext('2d');
let box = 32;
let snake = [];
snake[0] = { x: 10 * box, y: 10 * box };
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}
let speed = 200; // Initial speed
let score = 0; // New score variable
let game; // Declare game variable outside of startGame function

// Start game function
function startGame() {
    snake = [{ x: 10 * box, y: 10 * box }]; // Reset snake
    direction = "right"; // Reset direction
    food = { // Reset food
        x: Math.floor(Math.random() * 15 + 1) * box,
        y: Math.floor(Math.random() * 15 + 1) * box
    }
    speed = 200; // Reset speed
    score = 0; // Reset score
    document.getElementById('score').innerText = 'Score: ' + score; // Update score display
    game = setInterval(drawGame, speed); // Start game
}

// Draw function
function drawGame() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);

    for(let i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }

    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    // Check collision with self or wall before updating snake's position
    if(snakeX < 0 || snakeY < 0 || snakeX >= 16 * box || snakeY >= 16 * box) {
        gameOver();
        return;
    }

    for(let i = 1; i < snake.length; i++) {
        if(snake[i].x == snakeX && snake[i].y == snakeY) {
            gameOver();
            return;
        }
    }

    if(snakeX != food.x || snakeY != food.y) {
        snake.pop();
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
        score++; // Increase score
        document.getElementById('score').innerText = 'Score: ' + score; // Update score display
        if(speed > 50) { // Limit the maximum speed
            speed -= 10; // Increase speed
            clearInterval(game);
            game = setInterval(drawGame, speed); // Restart game with new speed
        }
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

// Update direction based on key press
document.addEventListener('keydown', updateDirection);

function updateDirection(event) {
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

// Game over function
function gameOver() {
    clearInterval(game);
    context.fillStyle = "black";
    context.font = "75px Arial";
    context.fillText("Game Over", 2*box, 8*box);
}

// Restart game on Enter key press
document.addEventListener('keydown', function(event) {
    if(event.keyCode == 13) { // 13 is the key code for Enter
        context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        startGame(); // Restart the game
    }
});

// Start game
startGame();