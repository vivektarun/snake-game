document.addEventListener("DOMContentLoaded", () => {
    const gameArena = document.getElementById("game-arena");
    const arenaSize = 600;
    const cellSize = 20;
    let score = 0;
    let gameStarted = false;
    let food = {x: 300, y: 200};
    let snake = [{x: 160, y: 200}, {x: 140, y: 200}, {x:120, y:200}];
    let dx = cellSize; // Displacement on the x-axis
    let dy = 0; // Displacement on the y-axis
    let gameSpeed = 200;

    function drawScoreBoard() {
        const scoreBoard = document.getElementById('score-board');
        scoreBoard.textContent = `Score : ${score}`
    }

    function drawDiv(x, y, className) {
        const div = document.createElement('div');
        div.classList.add(className);
        div.style.top = `${y}px`;
        div.style.left = `${x}px`;
        return div;
    }

    function drawFoodAndSnake() {
        gameArena.innerHTML = ''; // if previously something is drawn remove it
        // Clean the game-arena and re-draw the new co-ordinate when snake move.


        snake.forEach((snakeCell) => {
            const element = drawDiv(snakeCell.x, snakeCell.y, 'snake');
            gameArena.appendChild(element);
        })

        const foodElement = drawDiv(food.x, food.y, 'food');
        gameArena.appendChild(foodElement); 

    }

    function moveFood() {
        let newX, newY;
        do {
            newX = Math.floor(Math.random() * ((arenaSize - cellSize)/cellSize)) * cellSize;
            newY = Math.floor(Math.random() * ((arenaSize - cellSize)/cellSize)) * cellSize;
            if(gameSpeed > 30) gameSpeed -= 10;
        } while(snake.some(snakeCell => snakeCell.x === newX && snakeCell.y === newY));

        food = {x: newX, y: newY};
    }

    function updateSnake() {
        // step 1: calculate the new co-ordinate for new head of the snake.
        const newHead = {x: snake[0].x + dx, y: snake[0].y + dy};
        snake.unshift(newHead); // Add at the front.
        if(newHead.x === food.x && newHead.y === food.y) {
            // Collision
            score += 5;
            // Don't pop the tail.
            moveFood();
            // move the food.

        } else {
            snake.pop(); // Remove from the last.
        }
    }

    function isGameOver() {
        // Check if snake hits its own body.
        for(let i = 1; i < snake.length; i++) {
            if(snake[0].x === snake[i].x && snake[0].y === snake[i].y) return true; // Game over
        }
        // Check if snake hits the wall.
        const isHittingLeftWall = snake[0].x < 0;
        const isHittingTopWall = snake[0].y < 0;
        const isHittingRightWall = snake[0].x >= arenaSize;
        const isHittingBottomWall = snake[0].y >= arenaSize;

        return isHittingLeftWall || isHittingTopWall || isHittingRightWall || isHittingBottomWall; // game over
    }

    function gameLoop() {
        setInterval(() => {
            // Check for game over
            if(!gameStarted) return;

            if(isGameOver()) {
                gameStarted = false;
                alert("Game over");
                window.location.reload();
                return;
            }
            updateSnake();
            drawScoreBoard();
            drawFoodAndSnake();
        }, gameSpeed)
    }

    function changeDirection(e) {
        const LEFT_ARROW = 37;
        const RIGHT_ARROW = 39;
        const UP_ARROW = 38;
        const DOWN_ARROW = 40;

        const keyPressed = e.keyCode;

        const isGoingUp = dy === -cellSize;
        const isGoingDown = dy === cellSize;
        const isGoingRight = dx === cellSize;
        const isGoingLeft = dx === -cellSize;

        
        if(keyPressed === LEFT_ARROW && !isGoingRight) {
            dy = 0;
            dx = -cellSize;
        }
        if(keyPressed === RIGHT_ARROW && !isGoingLeft) {
            dy = 0;
            dx = cellSize;
        }
        if(keyPressed === UP_ARROW && !isGoingDown) {
            dy = -cellSize;
            dx = 0;
        }
        if(keyPressed === DOWN_ARROW && !isGoingUp) {
            dy = cellSize;
            dx = 0;
        }
    }

    function runGame() {
        if(!gameStarted) {
            gameStarted = true;
            gameLoop();
            document.addEventListener('keydown', changeDirection);
        }
        
    }

    function inintiateGame() {
        const scoreBoard = document.createElement('div');
        scoreBoard.id = 'score-board';
        document.body.insertBefore(scoreBoard, gameArena);

        const startButton = document.createElement('button');
        startButton.textContent = 'Start Button';
        startButton.classList.add('start-button');
        document.body.appendChild(startButton);

        startButton.addEventListener('click', () => {
            startButton.style.display = 'none';
            runGame();
        })
    }

    inintiateGame(); // This is the first function that would be executed
})