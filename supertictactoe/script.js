const body = document.querySelector("body");
const header = document.querySelector("header");
const board = document.getElementById("board");
const turnShown = document.getElementById("turn");
const tutorialShown = document.getElementById("tutorial");
const numToPos = {1: "top left", 2: "top middle", 3: "top right", 4: "middle left", 5: "middle", 6: "middle right", 7: "bottom left", 8: "bottom middle", 9: "bottom right"}
const waysToWin = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];

let numberNeeded = -1;
let turn = "X";

for (let findex = 0; findex < board.childElementCount; findex++) {
    for (let index = 1; index < 10; index++) {
        const stile = document.createElement("div");
        stile.id = "stile";
        stile.class = index;
        stile.onclick = () => tileClicked(stile, stile.class);
        board.children[findex].appendChild(stile);
    }
}
function checkWin(tiles) {
    return waysToWin.some(winCombo => 
        winCombo.every(num => tiles.includes(num))
    );
}
function hasOpenSpace(element, parent, nextParent) {
    for (let index = 0; index < nextParent.childElementCount; index++) {
        if (!nextParent.children[index].innerHTML) {
            if (nextParent == parent && nextParent.children[index] == element) { // if the tile clicked is the tile we are looking at. do this because we don't actually put the sign on until later (i think i wrote this while going crazy).
                continue;
            }
            return true;
        }
    }
    return false;
}
function tileClicked(stileElement, numberClicked) {
    const stileParent = stileElement.parentElement;
    const nextStileParent = board.children[stileElement.class - 1];
    let tilesOpen = false;
    let stilesWithYourSign = [];

    if ((stileParent.className == numberNeeded || numberNeeded == -1) && !stileElement.innerHTML) {
        stileElement.innerHTML = turn;

        for (let index = 1; index < stileParent.childElementCount + 1; index++) {
            if (stileParent.children[index - 1].innerHTML == turn) {
                stilesWithYourSign.push(index);
            }
        }
        if (checkWin(stilesWithYourSign)) { // if you win one grid
            while (stileParent.firstChild) {
                stileParent.removeChild(stileParent.firstChild);
            }
            stileParent.innerHTML = turn;
            stileParent.style.display = "block";
            tilesWithYourSign = [];
            for (let index = 1; index < board.childElementCount + 1; index++) {
                if (board.children[index - 1].innerHTML == turn) {
                    tilesWithYourSign.push(index);
                }
            }
            if (checkWin(tilesWithYourSign)) { // if you win the whole game
                header.appendChild(Object.assign(document.createElement("h2"), {innerHTML: `${turn}s Win!`}));
                header.appendChild(Object.assign(document.createElement("button"), {innerHTML: "Reset Board"}, {onclick: () => location.reload()}));
                header.removeChild(turnShown);
                header.removeChild(tutorialShown);
                turn = "";
                numberNeeded = 0;
            }
        }
        if (!hasOpenSpace(stileElement, nextStileParent, stileParent) && stileParent.innerHTML != "X" && stileParent.innerHTML != "O") {
            stileParent.innerHTML = "—";
            stileParent.style.display = "block"; // this centers the "-" it since grid can't be centered for some reason
        }
        tilesOpen = hasOpenSpace(stileElement, stileParent, nextStileParent);
        if (turn == "") {
            numberNeeded = 0; // if the game is over, nothing else can be clicked
        } else if (tilesOpen) {
            numberNeeded = stileElement.class;
        } else {
            numberNeeded = -1;
        }
        
        if (turn == "X") {
            turn = "O";
        } else if (turn == "O") {
            turn = "X";
        } else {
            turn = "";
        }
        if (numberNeeded == -1) {
            tutorialShown.innerHTML = `The last other player's last move targeted a grid that is full, so you can place your ${turn} anywhere in any grid!`;
        } else {
            tutorialShown.innerHTML = `Since the last other player's last move was in the ${numToPos[numberNeeded]} box of their grid, you have to place your ${turn} anywhere in the ${numToPos[numberNeeded]} grid, which is highlighted in a light gray.`;
        }
        turnShown.innerHTML = `${turn}'s Turn!`;
        for (let index = 0; index < board.childElementCount; index++) {
            if (numberNeeded == board.children[index].className || numberNeeded == -1) {
                board.children[index].style.backgroundColor = "grey";
            } else {
                board.children[index].style.backgroundColor = "RGB(50, 50, 50)";
            }
        }
    } else {
        const errorMessage = header.appendChild(Object.assign(document.createElement("h3"), {innerHTML: "You cannot go there."}));
        setTimeout(() => {
            header.removeChild(errorMessage);
        }, 2000);
    }
}
function removeTutorial() {
    header.removeChild(tutorialShown);
    body.removeChild(document.querySelector("button"));
}