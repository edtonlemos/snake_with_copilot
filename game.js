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
let gameOver = false; // Game over flag

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
    gameOver = false; // Reset game over flag
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

    if(snakeX < 0 || snakeY < 0 || snakeX >= 16 * box || snakeY >= 16 * box) {
        endGame();
        return;
    }

    for(let i = 1; i < snake.length; i++) {
        if(snake[i].x == snakeX && snake[i].y == snakeY) {
            endGame();
            return;
        }
    }

    if(snakeX != food.x || snakeY != food.y) {
        snake.pop();
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
        score++;
        document.getElementById('score').innerText = 'Score: ' + score;

        // Increase speed and update interval
        speed = Math.max(100, speed - 10); // Decrease speed, but not less than 100
        clearInterval(game); // Clear old interval
        game = setInterval(drawGame, speed); // Set new interval with updated speed
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
    if(gameOver) return;
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

// Game over function
function endGame() {
    clearInterval(game);
    context.fillStyle = "black";
    context.font = "75px Arial";
    context.fillText("Game Over", 2*box, 8*box);
    gameOver = true;
}

// Restart game on Enter key press
document.addEventListener('keydown', function(event) {
    if(event.keyCode == 13 && gameOver) { // 13 is the key code for Enter
        context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        startGame(); // Restart the game
    }
});

// Start game
startGame();