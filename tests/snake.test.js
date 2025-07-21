// Jasmine test suite for SnakeGame core logic
// Assumes snake.js is loaded in the test runner

describe('SnakeGame Core Logic', function() {
    let state;
    beforeEach(function() {
        state = createInitialState();
    });

    it('should initialize with a single snake segment', function() {
        expect(state.snake.length).toBe(1);
        expect(state.snake[0]).toEqual({x: 200, y: 200});
    });

    it('should move the snake in the current direction', function() {
        moveSnake(state);
        expect(state.snake[0]).toEqual({x: 220, y: 200});
    });

    it('should detect wall collision and set gameOver', function() {
        state.snake[0] = {x: 380, y: 200};
        state.direction = {x: 1, y: 0};
        moveSnake(state);
        expect(state.gameOver).toBeTrue();
    });

    it('should detect self collision and set gameOver', function() {
        state.snake = [
            {x: 200, y: 200},
            {x: 220, y: 200},
            {x: 220, y: 220},
            {x: 200, y: 220},
            {x: 200, y: 200} // head collides with tail
        ];
        state.direction = {x: 0, y: 0};
        moveSnake(state);
        expect(state.gameOver).toBeTrue();
    });

    it('should increase snake length when eating food', function() {
        state.food = {x: 220, y: 200};
        moveSnake(state);
        expect(state.snake.length).toBe(2);
        expect(state.foodEaten).toBe(1);
    });

    it('should not allow reversing direction', function() {
        setDirection(state, {x: -1, y: 0});
        expect(state.direction).toEqual({x: 1, y: 0});
    });
});
