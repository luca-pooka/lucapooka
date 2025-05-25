let score = 0;
let lives = 3;
let creationSpeed = 9000; // one created every 9 seconds (this is in ms)
let movementSpeed = 1500; // moves every 1.5 seconds (this is in ms)
const grid = document.getElementById("grid");
const directions = {
    up: {symbol: "▲", x: 0, y: 1},
    down: {symbol: "▼", x: 0, y: -1},
    left: {symbol: "◄", x: -1, y: 0},
    right: {symbol: "►", x: 1, y: 0},
}
const colors = {
    red: {x: 0, y: 9},
    blue: {x: 9, y: 9},
    yellow: {x: 0, y: 0},
    green: {x: 9, y: 0}
}
const updateScore = () => document.getElementById("score").innerHTML = score;
function removeLive() {
    lives--;
    if (lives > 0) {
        document.getElementById(`x${lives}`).innerHTML = "";
    } else {
        document.querySelector("h3").innerHTML = "You Lose...";
        creationSpeed = Infinity;
        movementSpeed = Infinity;
    }
}
for (let yIndex = 9; yIndex >= 0; yIndex--) {
  for (let xIndex = 0; xIndex < 10; xIndex++) {
    const tile = document.createElement("div");
    tile.className = `tile x${xIndex} y${yIndex}`;
    function makeTileFixedColored(color) {
        tile.classList.add("fixed");
        tile.classList.add(color);
    }
    switch (tile.className) {
        case "tile x0 y9":
            makeTileFixedColored("red");
            break;
        case "tile x9 y9":
            makeTileFixedColored("blue");
            break;
        case "tile x0 y0":
            makeTileFixedColored("yellow");
            break;
        case "tile x9 y0":
            makeTileFixedColored("green");
            break;
        default:
            break;
    }
    tile.contextmenu = event => {
        event.preventDefault(); // Prevent the default right-click menu

        // Position and show the custom message
        customMessage.style.display = 'block';
        customMessage.style.left = `${event.pageX}px`;
        customMessage.style.top = `${event.pageY}px`;
         // Hide the custom message when clicking elsewhere
    document.addEventListener('click', () => {
        customMessage.style.display = 'none';
    });
    };
    grid.appendChild(tile);
  }
}
function makeTile(tileX, tileY, directionKey, color) {
    grid.childNodes.forEach(tile => {
    if (tile.classList[1].slice(1) == tileX && tile.classList[2].slice(1) == tileY && !tile.classList.contains("filled")) {
        if (tile.classList[3] === "fixed") {
            if (tile.classList[4] === color) {
                score += 100;
                console.log("+ 100 points with " + color);
                updateScore();
            } else {
                removeLive();
            }
            return;
        }
        tile.classList.add("filled");
        tile.classList.add(directionKey);
        tile.classList.add(color);
        tile.innerHTML = directions[directionKey].symbol;
        tile.onclick = () => {
            switch (directionKey) {
                case "up":
                    tile.classList.replace(directionKey, "right");
                    break;
                case "right":
                    tile.classList.replace(directionKey, "down");
                    break;
                case "down":
                    tile.classList.replace(directionKey, "left");
                    break;
                case "left":
                    tile.classList.replace(directionKey, "up");
                    break;
            }
            try {
                tile.innerHTML = directions[tile.classList[4]].symbol;
            } catch (error) {
                console.log(tile.classList, error);
            }
        }
        setTimeout(() => {
            // move the tile by removing the current one and remaking it on the tile where it would go to
            const tileX = parseInt(tile.classList[1].slice(1));
            const tileY = parseInt(tile.classList[2].slice(1));
            const tileDirection = tile.classList[4];
            const tileColor = tile.classList[5];
            tile.classList.remove("filled");
            tile.classList.remove(tileDirection); // remove direction
            tile.classList.remove(tileColor); // remove color
            tile.innerHTML = "";
            // console.log("old tile " + tileX, tileY, tileDirection, tileColor);
            let foundTile = false;
            grid.childNodes.forEach(tile => {
                const newTileX = tileX + directions[tileDirection].x;
                const newTileY = tileY + directions[tileDirection].y;
                if (tile.classList[1].slice(1) == newTileX && tile.classList[2].slice(1) == newTileY) {
                    // console.log("new tile: " + newTileX, newTileY, tileDirection, tileColor);
                    makeTile(newTileX, newTileY, tileDirection, tileColor);
                    foundTile = true;
                }
            });
            if (!foundTile) {
                removeLive();
            }
        }, movementSpeed);
        return false;
    }
    return true;
    });
}
function makeRandomTile() {
    // random numbers between 1 and 8 (no edge numbers)
    const randomTileX = Math.floor(Math.random() * 8) + 1;
    const randomTileY = Math.floor(Math.random() * 8) + 1;
    const directionKeys = Object.keys(directions);
    const randomDirectionKey = directionKeys[Math.floor(Math.random() * directionKeys.length)];
    const colorKeys = Object.keys(colors);
    const randomColorKey = colorKeys[Math.floor(Math.random() * colorKeys.length)];
    if (makeTile(randomTileX, randomTileY, randomDirectionKey, randomColorKey)) { // if the tile is already filled
    console.log(`${randomTileX} ${randomTileY} is already filled`);
        makeRandomTile();
        return;
    }
    setTimeout(makeRandomTile, creationSpeed);
}
setInterval(() => {
    if (creationSpeed > 2000) {
        creationSpeed -= 5;
    }
    if (movementSpeed > 300) {
        movementSpeed -= 2;
    }
    document.getElementById("creation-speed").innerHTML = creationSpeed;
    document.getElementById("movement-speed").innerHTML = movementSpeed;
}, 1000);
makeRandomTile();