document.addEventListener("DOMContentLoaded", () => {
    const gameArena = document.getElementById("game-arena");
    const arenaSize = 600;
    const cellSize = 20;
    let score = 0;
    let gameStarted = false;
    let food = {x: 300, y: 200};
    let snake = [{x: 16, y: 200}, {x: 140, y: 200}, {x:120, y:200}];
    let dx = cellSize; // Displacement on the x-axis
    let dy = 0; // Displacement on the y-axis

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

        const foodElement = drawDiv(food.x, food.y, 'food');
        gameArena.appendChild(foodElement); 

    }

    function gameLoop() {
        setInterval(() => {
            drawScoreBoard();
            drawFoodAndSnake();
        }, 1000)
    }

    function runGame() {
        gameStarted = true;
        gameLoop();
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