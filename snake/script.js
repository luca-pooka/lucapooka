const grid = document.getElementById("grid");
const scoreE = document.getElementById("score");
const pause = document.getElementById("pause");
const settings = document.getElementById("settings");
const replay = document.getElementById("replay");
const change = document.getElementById("change");
const speedInput = document.getElementById("speed-input");
const speedShow = document.getElementById("speed");
const highScoreShow = document.getElementById("high-scores");
const highScores = JSON.parse(localStorage.getItem("snake-high-scores")) || [0, 0, 0, 0];
let speed = 200;
highScoreShow.innerHTML = `High Score: ${highScores[1]}`;
function startGame() {
    settings.style.display = "none";
    scoreE.style.display = "block";
    pause.style.display = "block";
    let snakeLength = 1;
    let xMovement = [0];
    let yMovement = [0];
    let justGotFruit = false;
    let score = 0;
    let paused = false;
    let gameOver = false;
    function gameInterval() {
        let newX;
        let newY;
        let snakeCount = 0;
        grid.childNodes.forEach(tile => {
            if (tile.classList.contains("snake")) {
                snakeCount++;
                if (parseInt(tile.id) == "1") {
                    if (xMovement.length > 1 && yMovement.length > 1) {
                        xMovement.splice(0, 1);
                        yMovement.splice(0, 1);
                    }
                    newX = parseInt(tile.classList[1].slice(1)) + xMovement[0];
                    newY = parseInt(tile.classList[2].slice(1)) + yMovement[0];
                    tile.classList.remove("head");
                } else {
                }
                if (tile.id == snakeLength && !justGotFruit) {
                    tile.classList.remove("snake");
                    tile.id = "";
                } else {
                    tile.id = parseInt(tile.id) + 1;
                }
            }
        });
        if (snakeCount == 0) setGameOver(interval);
        justGotFruit = false;
        grid.childNodes.forEach(newTile => {
            if (parseInt(newTile.classList[1].slice(1)) == newX && parseInt(newTile.classList[2].slice(1)) == newY) {
                if (newTile.id == "fruit") {
                    score++;
                    snakeLength++;
                    justGotFruit = true;
                    scoreE.innerHTML = `Score: ${score}`;
                    placeFruit(newX + (14 - newY) * 15);
                } else if (newTile.classList.contains("snake")) {
                    setGameOver(interval);
                }
                newTile.classList.add("snake");
                newTile.classList.add("head");
                newTile.id = "1";
            }
        });
    }
    function setGameOver(interval) {
        clearInterval(interval);
        replay.style.display = "inline-block";
        change.style.display = "inline-block";
        gameOver = true;
        if (score > highScores[speedInput.value - 1]) {
            highScores[speedInput.value - 1] = score;
            localStorage.setItem("snake-high-scores", JSON.stringify(highScores));
        }
    }
    let interval = setInterval(gameInterval, speed);
    document.querySelector("body").onkeydown = event => {
        function setMovement(x, y) {
            xMovement.push(x);
            yMovement.push(y);
        }
        const keys = {up: ["ArrowUp", "w", "W"], left: ["ArrowLeft", "a", "A"], down: ["ArrowDown", "s", "S"], right: ["ArrowRight", "d", "D"]}
        if (event.key == "Escape" && !gameOver) {
            if (paused) {
                interval = setInterval(gameInterval, speed);
                paused = false;
                pause.innerHTML = "Click esc to pause";
            } else {
                clearInterval(interval);
                pause.innerHTML = "Game paused";
                paused = true;
            }
        } else if (!paused) {
            if (keys.up.includes(event.key) && yMovement[yMovement.length - 1] != -1) {
                setMovement(0, 1); // move up
            } else if (keys.left.includes(event.key) && xMovement[xMovement.length - 1] != 1) {
                setMovement(-1, 0); // move left
            } else if (keys.down.includes(event.key) && yMovement[yMovement.length - 1] != 1) {
                setMovement(0, -1); // move down
            } else if (keys.right.includes(event.key) && xMovement[xMovement.length - 1] != -1) {
                setMovement(1, 0); // move right
            }
        } 
    }
    function placeFruit(previous) {
        function getFruitLocation(previous) {
            const place = Math.floor(Math.random() * 225);
            if (grid.children[place].classList.contains("snake") || place == previous) {
                console.log(`got ${place}, rerolling`);
                return getFruitLocation(previous);
            } else {
                console.log(place);
                return place;
            }
        }
        grid.children[getFruitLocation(previous)].id = "fruit";
    }
    grid.style.display = "grid";
    for (let y = 14; y >= 0; y--) {
        for (let x = 0; x < 15; x++) {
            const tile = document.createElement("div");
            tile.classList.add("tile", `x${x}`, `y${y}`);
            grid.appendChild(tile);
        }
    }
    grid.children[109].classList.add("snake");
    grid.children[109].classList.add("head");
    grid.children[109].id = "1";
    placeFruit(-1);
}
function reshowSettings() {
    highScoreShow.innerHTML = `High Score: ${highScores[speedInput.value - 1]}`;
    settings.style.display = "block";
    scoreE.style.display = "none";
    pause.style.display = "none";
    replay.style.display = "none";
    change.style.display = "none";
    replayGame(false);
}
function replayGame(restart = true) {
    // reset the game
    while (grid.childElementCount > 0) {
        grid.removeChild(grid.children[0]);
    }
    replay.style.display = "none";
    change.style.display = "none";
    scoreE.innerHTML = "Score: 0";
    grid.style.display = "none";
    // restart the game
    if (restart) startGame();
}
function updateSpeed() {
    speedShow.innerHTML = speedInput.value == 1 ? "Speed: Slow" : speedInput.value == 2 ? "Speed: Normal" : speedInput.value == 3 ? "Speed: Fast" : "Speed: Super Fast";
    speed = speedInput.value == 1 ? 200 : speedInput.value == 2 ? 150 : speedInput.value == 3 ? 125 : 100;
    highScoreShow.innerHTML = `High Score: ${highScores[speedInput.value - 1]}`;
}