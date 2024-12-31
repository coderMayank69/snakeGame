// Game constants and variables
let direction = { x: 0, y: 0 }; // Snake direction
let speed = 20; // Speed of the game
let lastPaintTime = 0; // Last time the game was updated
let snakeArr = [{ x: 13, y: 15 }]; // Initial snake position
let score = 0; // Score
let food = {}; // Food object

let board = document.getElementById('board'); // Get the board element
generateFood(); // Generate the initial food

// Function to generate food at a random position
function generateFood() {
    let a = 2;
    let b = 16;
    food = { x: Math.floor(a + (b - a) * Math.random()), y: Math.floor(a + (b - a) * Math.random()) };
}

// Check if the snake has collided with itself or the walls
function isCollide(snakeArr) {
    // If snake hits the wall
    if (snakeArr[0].x < 0 || snakeArr[0].x >= 18 || snakeArr[0].y < 0 || snakeArr[0].y >= 18) {
        return true;
    }
    // If snake collides with itself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snakeArr[0].x === snakeArr[i].x && snakeArr[0].y === snakeArr[i].y) {
            return true;
        }
    }
    return false;
}

// Game function
function main(currentTime) {
    window.requestAnimationFrame(main);
    if ((currentTime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = currentTime;
    gameEngine();
}

// Game engine
function gameEngine() {
    // Part 1: Updating the snake array and food
    if (isCollide(snakeArr)) {
        direction = { x: 0, y: 0 }; // Stop the game
        alert("Game Over. Press any key to play again!");
        snakeArr = [{ x: 13, y: 15 }]; // Reset snake
        score = 0; // Reset score
        generateFood(); // Regenerate food
    }

    // If snake has eaten the food, increment score and regenerate food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        snakeArr.unshift({ x: snakeArr[0].x + direction.x, y: snakeArr[0].y + direction.y });
        generateFood();
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = {...snakeArr[i] };
    }
    snakeArr[0].x += direction.x;
    snakeArr[0].y += direction.y;

    // Part 2: Display the snake
    board.innerHTML = ""; // Clear the board
    snakeArr.forEach((e, index) => {
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        snakeElement.classList.add('snake');
        if (index === 0) {
            snakeElement.classList.add('head'); // Add 'head' class for the snake's head
        }
        board.appendChild(snakeElement);
    });

    // Display the food
    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

// Start the game by generating food
generateFood();

// Game logic
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    switch (e.key) {
        case "ArrowUp":
            if (direction.y !== 1) { // Prevent reversing direction
                direction = { x: 0, y: -1 };
            }
            break;
        case "ArrowDown":
            if (direction.y !== -1) { // Prevent reversing direction
                direction = { x: 0, y: 1 };
            }
            break;
        case "ArrowLeft":
            if (direction.x !== 1) { // Prevent reversing direction
                direction = { x: -1, y: 0 };
            }
            break;
        case "ArrowRight":
            if (direction.x !== -1) { // Prevent reversing direction
                direction = { x: 1, y: 0 };
            }
            break;
        default:
            break;
    }
});