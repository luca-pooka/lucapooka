class Tile {
    constructor(column, row, thisElement) {
        this.column = column;
        this.row = row;
        this.thisElement = thisElement;
        this.shownColor = null;
        this.containsTile = false;
    }
}
const grid = document.getElementById("grid");
const header = document.querySelector("header");
const turnShown = document.getElementById("turn");
let tileData = {};
let turn = "red";
function checkMoves(myTileData) {
    for (let index = 1; index < 7; index++) {
        const tile = document.getElementById(`${index} ${myTileData.row}`);
        const thisTileData = tileData[tile.id];
        try {
            if (tileData[`${thisTileData.column + 1} ${myTileData.row}`].shownColor) {
                if (tileData[`${thisTileData.column} ${myTileData.row}`].shownColor) { // if that column is full
                    break;
                }
                thisTileData.thisElement.classList.add(turn);
                tileData[thisTileData.thisElement.id].shownColor = turn;
                break;
            }
        } catch (TypeError) {
            tileData[`6 ${myTileData.row}`].thisElement.classList.add(turn);
            tileData[`6 ${myTileData.row}`].shownColor = turn;
        }
    }
}
function removeMoves(myRow) {
    for (let index = 1; index < 7; index++) {
        const thisTileData = tileData[`${index} ${myRow}`];
        if (thisTileData.shownColor && !thisTileData.containsTile) {
            thisTileData.shownColor = null;
            thisTileData.thisElement.classList.remove(turn);
            break;
        }
    }
}
function placeTile(myTileData) {
    for (let index = 1; index < 7; index++) {
        const thisTileData = tileData[`${index} ${myTileData.row}`];
        if (thisTileData.shownColor && !thisTileData.containsTile) {
            thisTileData.containsTile = true;
            thisTileData.thisElement.classList.add("fixed");
            if (turn === "red") {
                turn = "Yellow";
            } else {
                turn = "Red";
            }
            turnShown.innerHTML = `<span style="color: ${turn};">${turn}</span>'s Turn!`;
            turn = turn.toLowerCase();
        }
    }
    function checkWin(columnIndex, rowIndex, redValue, yellowValue) {
        const thisTileData = tileData[`${columnIndex} ${rowIndex}`];
        if (thisTileData.shownColor === "red") {
            redValue++;
            yellowValue = 0;
        } else if (thisTileData.shownColor === "yellow") {
            yellowValue++;
            redValue = 0;
        } else {
            redValue = 0;
            yellowValue = 0;
        }
        function setWin(color) {
            turnShown.innerHTML = `<span style="color: ${color};">${color}</span> Wins!`;
            header.appendChild(Object.assign(document.createElement("button"), {innerHTML: "Reset Board"}, {onclick: () => location.reload()}));
            //header.appendChild(Object.assign(document.createElement("h3"), {innerHTML: "Refresh the page to play again."}));
            for (let index = 0; index < grid.childElementCount; index++) {
                const tile = grid.children[index];
                tile.onmouseover = null;
                tile.onmouseleave = null;
                tile.onclick = null;
                tile.classList.add("end");
            }
        }
        if (redValue >= 4) {
            setWin("Red");
            return false;
        } else if (yellowValue >= 4) {
            setWin("Yellow");
            return false;
        }
        return [redValue, yellowValue];
    }
    // check row wins
    for (let columnIndex = 1; columnIndex < 7; columnIndex++) {
        let redValue = 0;
        let yellowValue = 0;
        for (let rowIndex = 1; rowIndex < 8; rowIndex++) {
            const colorValues = checkWin(columnIndex, rowIndex, redValue, yellowValue);
            if (!colorValues) {
                break;
            } else {
                redValue = colorValues[0];
                yellowValue = colorValues[1];
            }
        }
    }
    // check column wins
    for (let rowIndex = 1; rowIndex < 8; rowIndex++) {
        let redValue = 0;
        let yellowValue = 0;
        for (let columnIndex = 1; columnIndex < 7; columnIndex++) {
            const colorValues = checkWin(columnIndex, rowIndex, redValue, yellowValue);
            if (!colorValues) {
                break;
            } else {
                redValue = colorValues[0];
                yellowValue = colorValues[1];
            }
        }
    }
}
for (let columnIndex = 1; columnIndex < 7; columnIndex++) {
    for (let rowIndex = 1; rowIndex < 8; rowIndex++) {
        const tileElement = document.createElement("div");
        tileElement.id = `${columnIndex} ${rowIndex}`;
        tileElement.classList = "tile";
        const tileClass = new Tile(columnIndex, rowIndex, tileElement);
        tileElement.onmouseover = () => checkMoves(tileClass);
        tileElement.onmouseleave = () => removeMoves(tileClass.row);
        tileElement.onclick = () => placeTile(tileClass);
        tileData[tileElement.id] = tileClass;
        grid.appendChild(tileElement);
    }
}
console.log(tileData);