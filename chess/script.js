class Tile {
    constructor(column, row, color, pieceOnTile) {
        this.column = column;
        this.row = row;
        this.color = color;
        this.pieceOnTile = pieceOnTile;
        this.tileElement = document.getElementById(`${this.column} ${this.row}`);
    }
}
let castle = 0;
const board = document.getElementById("board");
const turnShown = document.querySelector("h2");
const orderOfPieces = ["black rook", "black knight", "black bishop", "black queen", "black king", "black bishop", "black knight", "black rook", "black pawn", "black pawn", "black pawn", "black pawn", "black pawn", "black pawn", "black pawn", "black pawn", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, "white pawn", "white pawn", "white pawn", "white pawn", "white pawn", "white pawn", "white pawn", "white pawn", "white rook", "white knight", "white bishop", "white queen", "white king", "white bishop", "white knight", "white rook"];
const piecesImgs = {"white rook": "pieces/lightrook.webp", "black rook": "pieces/darkrook.webp", "white knight": "pieces/lightknight.webp", "black knight": "pieces/darkknight.webp", "white bishop": "pieces/lightbishop.webp", "black bishop": "pieces/darkbishop.webp", "white queen": "pieces/lightqueen.webp", "black queen": "pieces/darkqueen.webp", "white king": "pieces/lightking.webp", "black king": "pieces/darkking.webp", "white pawn": "pieces/lightpawn.webp", "black pawn": "pieces/darkpawn.webp"};
const tileData = {};
let tileSelected;
let turn = "white";

function addImg(pieceName) {
    const img = document.createElement("img");
    img.className = "piece";
    img.src = piecesImgs[pieceName];
    img.alt = pieceName;
    img.height = 70;
    img.width = 70;
    return img;
}
function movePiece(grayTilePos) {
    const oldTileIndex = `${tileSelected.column} ${tileSelected.row}`; // tile piece is on
    const newTileIndex = grayTilePos; // tile piece wants to move to
    const oldTileData = tileData[oldTileIndex];
    const newTileData = tileData[newTileIndex];
    console.log(oldTileData);
    Object.values(tileData).forEach(function(tile) {
        const pieceImg = document.getElementById(`${tile.column} ${tile.row}`).children[0];
        if (pieceImg) {
            pieceImg.onclick = () => showMoves(tile); // the piece.onclick = showMoves(the tile's data);
        }
    });
    tileSelected.tileElement.removeChild(tileSelected.tileElement.children[0]); // get rid of the old image since you are moving
    tileSelected.tileElement.classList.remove(tileSelected.color, tileSelected.pieceOnTile);

    const newTile = document.getElementById(grayTilePos);
    if (newTileData.pieceOnTile) {
        newTile.removeChild(newTile.querySelector("img"));
        newTile.classList.remove(newTile.classList[1], newTile.classList[2]);
    }
    if ((oldTileData.pieceOnTile === "pawn" && oldTileData.color === "white" && newTileData.column === 8) || oldTileData.pieceOnTile === "pawn" && oldTileData.color === "black" && newTileData.column === 1) {
        tileSelected.pieceOnTile = "queen";
    }
    newTile.classList.add(tileSelected.color, tileSelected.pieceOnTile);
    const img = addImg(`${tileSelected.color} ${tileSelected.pieceOnTile}`);
    newTile.appendChild(img);

    newTileData.pieceOnTile = tileSelected.pieceOnTile;
    newTileData.color = tileSelected["color"];
    newTileData.tileElement = newTile;
    img.onclick = () => showMoves(tileData[newTileIndex]);
    tileSelected = tileData[newTileIndex];
    oldTileData.pieceOnTile = undefined;
    oldTileData.color = undefined;
    if (castle === 1) {
        castle = 0;
        turn = "black"; // trust me on this line it just works
        tileSelected = tileData["1 8"];
        movePiece("1 6");
    }
    if (castle === 2) {
        castle = 0;
        turn = "black";
        tileSelected = tileData["1 1"];
        movePiece("1 4");
    }
    if (castle === 3) {
        castle = 0;
        turn = "white"; // trust me on this line it just works
        tileSelected = tileData["8 8"];
        movePiece("8 6");
    }
    if (castle === 4) {
        castle = 0;
        turn = "white";
        tileSelected = tileData["8 1"];
        movePiece("8 4");
    }
    if (turn == "white") {
        turn = "Black";
    } else {
        turn = "White";
    }
    turnShown.innerHTML = `${turn} to move!`;
    turn = turn.toLowerCase();
    removeSelected();
}
function makeTileGray(position) {
    const tile = document.getElementById(position);
    tile.classList.add("clickable");
    tile.onclick = () => movePiece(position);
    if (tile.children[0]) { // if there's a piece on the tile, give it the onclick too because the img blocks you from the tile
        tile.children[0].onclick = () => movePiece(position);
    }
}
function removeSelected() {
    for (let index = 0; index < board.childElementCount; index++) {
        const tile = board.children[index];
        tile.classList.remove("clickable");
        tile.onclick = null;
    }
}
function continuousMovement(startColumn, startRow, addColumn, addRow) {
    try {
        let nextColumn = startColumn + addColumn;
        let nextRow = startRow + addRow;
        while (true) {
            if (tileData[`${nextColumn} ${nextRow}`].color == tileData[`${startColumn} ${startRow}`].color) {
                break;
            }
            makeTileGray(`${nextColumn} ${nextRow}`);
            if (tileData[`${nextColumn} ${nextRow}`].pieceOnTile) {
                break;
            }
            nextColumn += addColumn;
            nextRow += addRow;
        }
    } catch (error) {}
}
function oneTileMovement(startColumn, startRow, addColumn, addRow, isPawnUp = false, isPawnAttack = false) {
    try {
        const startPosition = `${startColumn} ${startRow}`;
        const addedPosition = `${startColumn + addColumn} ${startRow + addRow}`;
        if ((tileData[addedPosition].color != tileData[startPosition].color && tileData[addedPosition].pieceOnTile) || !tileData[addedPosition].pieceOnTile) { // if able to capture or space is open
            if (isPawnAttack) {
                if (tileData[addedPosition].pieceOnTile) {
                    makeTileGray(addedPosition);
                }
            } else if (!isPawnUp || !tileData[addedPosition].pieceOnTile) {
                makeTileGray(addedPosition);
            }
        }
    } catch (error) {}
}
function knightMovement(startColumn, startRow, addColumn, addRow) {
    if (!(Math.abs(startColumn - (startColumn + addColumn)) > 2)) { // (starting column - targeted column) > 2
        oneTileMovement(startColumn, startRow, addColumn, addRow);
    }
}
function showMoves(tileInfo) {
    console.log("tileinfo", tileInfo)
    // this happens when any piece is clicked
    removeSelected();
    if (tileInfo.color == turn) {
        console.log(tileInfo);
        tileSelected = tileInfo;
        if (tileInfo.pieceOnTile === "pawn") {
            if (turn === "white") {
                oneTileMovement(tileInfo.column, tileInfo.row, 1, 0, true);
                if (tileInfo.column == 2) {
                    oneTileMovement(tileInfo.column, tileInfo.row, 2, 0, true);
                }
                oneTileMovement(tileInfo.column, tileInfo.row, 1, 1, false, true);
                oneTileMovement(tileInfo.column, tileInfo.row, 1, -1, false, true); // this and ^ are for pawn attacking
            } else {          
                oneTileMovement(tileInfo.column, tileInfo.row, -1, 0, true);
                if (tileInfo.column == 7) {
                    oneTileMovement(tileInfo.column, tileInfo.row, -2, 0, true);
                }
                oneTileMovement(tileInfo.column, tileInfo.row, -1, 1, false, true);
                oneTileMovement(tileInfo.column, tileInfo.row, -1, -1, false, true); // this and ^ are for pawn attacking
            }
        } else if (tileInfo.pieceOnTile == "rook") {
            continuousMovement(tileInfo.column, tileInfo.row, 1, 0);
            continuousMovement(tileInfo.column, tileInfo.row, -1, 0);
            continuousMovement(tileInfo.column, tileInfo.row, 0, 1);
            continuousMovement(tileInfo.column, tileInfo.row, 0, -1);
        } else if (tileInfo.pieceOnTile == "bishop") {
            continuousMovement(tileInfo.column, tileInfo.row, 1, 1);
            continuousMovement(tileInfo.column, tileInfo.row, -1, -1);
            continuousMovement(tileInfo.column, tileInfo.row, 1, -1);
            continuousMovement(tileInfo.column, tileInfo.row, -1, 1);
        } else if (tileInfo.pieceOnTile == "queen") {
            continuousMovement(tileInfo.column, tileInfo.row, 1, 0);
            continuousMovement(tileInfo.column, tileInfo.row, -1, 0);
            continuousMovement(tileInfo.column, tileInfo.row, 0, 1);
            continuousMovement(tileInfo.column, tileInfo.row, 0, -1);
            continuousMovement(tileInfo.column, tileInfo.row, 1, 1);
            continuousMovement(tileInfo.column, tileInfo.row, -1, -1);
            continuousMovement(tileInfo.column, tileInfo.row, 1, -1);
            continuousMovement(tileInfo.column, tileInfo.row, -1, 1);
        } else if (tileInfo.pieceOnTile == "king") {
            oneTileMovement(tileInfo.column, tileInfo.row, 0, 1);
            oneTileMovement(tileInfo.column, tileInfo.row, 1, 0);
            oneTileMovement(tileInfo.column, tileInfo.row, -1, 0);
            oneTileMovement(tileInfo.column, tileInfo.row, 0, -1);
            oneTileMovement(tileInfo.column, tileInfo.row, 1, 1);
            oneTileMovement(tileInfo.column, tileInfo.row, -1, -1);
            oneTileMovement(tileInfo.column, tileInfo.row, -1, 1);
            oneTileMovement(tileInfo.column, tileInfo.row, 1, -1);
            oneTileMovement(tileInfo.column, tileInfo.row, -1, 0);
            if (turn === "white") {
                if (tileInfo.column === 1 && tileInfo.row === 5) { // king in right spot
                    if (tileData["1 6"].pieceOnTile == undefined && tileData["1 7"].pieceOnTile == undefined) {
                        castle = 1;
                        makeTileGray("1 7");
                    }
                    if (tileData["1 2"].pieceOnTile == undefined && tileData["1 3"].pieceOnTile == undefined && tileData["1 4"].pieceOnTile == undefined) {
                        castle = 2;
                        makeTileGray("1 3");
                    }
                }
            } else {
                if (tileInfo.column === 8 && tileInfo.row === 5) { // king in right spot
                    if (tileData["8 6"].pieceOnTile == undefined && tileData["8 7"].pieceOnTile == undefined) {
                        castle = 3;
                        makeTileGray("8 7");
                    }
                    if (tileData["8 2"].pieceOnTile == undefined && tileData["8 3"].pieceOnTile == undefined && tileData["8 4"].pieceOnTile == undefined) {
                        castle = 4;
                        makeTileGray("8 3");
                    }
                }
            }
        } else if (tileInfo.pieceOnTile == "knight") {
            knightMovement(tileInfo.column, tileInfo.row, 2, 1);
            knightMovement(tileInfo.column, tileInfo.row, 2, -1);
            knightMovement(tileInfo.column, tileInfo.row, -2, 1);
            knightMovement(tileInfo.column, tileInfo.row, -2, -1);
            knightMovement(tileInfo.column, tileInfo.row, 1, 2);
            knightMovement(tileInfo.column, tileInfo.row, 1, -2);
            knightMovement(tileInfo.column, tileInfo.row, -1, 2);
            knightMovement(tileInfo.column, tileInfo.row, -1, -2);
        }
    }
}

for (let columnIndex = 8; columnIndex > 0; columnIndex--) {
    for (let rowIndex = 1; rowIndex < 9; rowIndex++) {
        const tile = board.appendChild(Object.assign(document.createElement("div")));
        tile.id = `${columnIndex} ${rowIndex}`;
        tile.classList = "tile";
    }
}
for (let index = 0; index < orderOfPieces.length; index++) {
    const pieceName = orderOfPieces[index];
    const tile = board.children[index];
    if (pieceName) {
        const img = addImg(pieceName);
        tile.appendChild(img);
        tile.classList.add(pieceName.slice(0, 5), pieceName.slice(6))
        const myTile = new Tile(Number(tile.id[0]), Number(tile.id[2]), tile.classList[1], tile.classList[2]); // pos, color, piece on tile
        tileData[`${tile.id[0]} ${tile.id[2]}`] = myTile;
        img.onclick = () => showMoves(myTile);
    } else {
        const myTile = new Tile(Number(tile.id[0]), Number(tile.id[2]), undefined, undefined); // pos, color, piece on tile
        tileData[`${tile.id[0]} ${tile.id[2]}`] = myTile;
    }
}
console.log(tileData);