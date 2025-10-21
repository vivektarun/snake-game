document.addEventListener("DOMContentLoaded", () => {
    const gameArean = document.getElementById("game-arena");
    const arenaSize = 600;
    const cellSize = 20;
    let score = 0;
    let gameStarted = false;
    let food = {x: 300, y: 200};
    let snake = [{x: 16, y: 200}, {x: 140, y: 200}, {x:120, y:200}];
    let dx = cellSize; // Displacement on the x-axis
    let dy = 0; // Displacement on the y-axis


    function startGame() {
        const scoreBoard = document.createElement('div');
        scoreBoard.id = 'score-board';
        document.body.insertBefore(scoreBoard, gameArean);

        const startButton = document.createElement('button');
        startButton.textContent = 'Start Button';
        startButton.classList.add('start-button');
        document.body.appendChild(startButton);
    }

    startGame();
})