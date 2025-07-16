// Core Snake Game Logic (modularized for testing)

const gridSize = 20;
const canvasSize = 400;

function createInitialState() {
    return {
        snake: [{x: 200, y: 200}],
        direction: {x: 1, y: 0},
        food: {x: 100, y: 100},
        gameOver: false,
        foodEaten: 0,
        speed: 120,
        minSpeed: 60,
        easyFoodCount: 5
    };
}

function moveSnake(state) {
    const head = {
        x: state.snake[0].x + state.direction.x * gridSize,
        y: state.snake[0].y + state.direction.y * gridSize
    };
    // Wall collision
    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {
        state.gameOver = true;
        return;
    }
    // Self collision
    for (let i = 0; i < state.snake.length; i++) {
        if (head.x === state.snake[i].x && head.y === state.snake[i].y) {
            state.gameOver = true;
            return;
        }
    }
    state.snake.unshift(head);
    // Food collision
    if (head.x === state.food.x && head.y === state.food.y) {
        state.foodEaten++;
        placeFood(state);
    } else {
        state.snake.pop();
    }
}

function placeFood(state) {
    let valid = false;
    let x, y;
    let attempts = 0;
    while (!valid && attempts < 100) {
        if (state.foodEaten < state.easyFoodCount) {
            // Place food away from walls/corners (at least 2 cells away)
            const min = 2;
            const maxX = (canvasSize / gridSize) - 3;
            const maxY = (canvasSize / gridSize) - 3;
            x = Math.floor(Math.random() * (maxX - min + 1) + min) * gridSize;
            y = Math.floor(Math.random() * (maxY - min + 1) + min) * gridSize;
        } else {
            // Place food anywhere
            x = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
            y = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
        }
        valid = true;
        for (let i = 0; i < state.snake.length; i++) {
            if (x === state.snake[i].x && y === state.snake[i].y) {
                valid = false;
                break;
            }
        }
        attempts++;
    }
    state.food.x = x;
    state.food.y = y;
}

function setDirection(state, newDirection) {
    // Prevent reversing
    if (state.direction.x === -newDirection.x && state.direction.y === -newDirection.y) return;
    state.direction = newDirection;
}

function isGameOver(state) {
    return state.gameOver;
}

function getScore(state) {
    return state.snake.length - 1;
}

// Export for testing
if (typeof module !== 'undefined') {
    module.exports = {
        createInitialState,
        moveSnake,
        placeFood,
        setDirection,
        isGameOver,
        getScore
    };
}