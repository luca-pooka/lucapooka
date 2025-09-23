const body = document.querySelector("body");
const stairs = document.getElementById("stairs");
const inputs = {w: [1, 1], a: [1, 2], s: [1, 3], d: [1, 4], ArrowUp: [2, 1], ArrowLeft: [2, 2], ArrowDown: [2, 3], ArrowRight: [2, 4], i: [3, 1], j: [3, 2], k: [3, 3], l: [3, 4], j: [4, 1], f: [4, 2], g: [4, 3], h: [4, 4]}
const positions = [0, 0, 0, 0];
function guess(playerCount) {
    function keyPressed(key, com = false) {
        const playerInputNum = inputs[key];
        if (playerInputNum[0] <= playerCount || com) {
            guessed[playerInputNum[0] - 1] = playerInputNum[1];
            const guessFilter = guessed.filter(guess => guess);
            playerInfo.children[playerInputNum[0] - 1].classList.add("selected");
            document.getElementById("num-guessed").innerHTML = `${guessFilter.length}/4`;
            if (guessFilter.length === 4) {
                let someoneWon = false;
                window.onkeydown = null;
                setTimeout(() => {
                    console.log(guessed);
                    guessed.forEach((guess, index) => {
                        playerInfo.children[index].innerHTML = guess;
                        for (let index = 0; index < playerInfo.childElementCount; index++) { playerInfo.children[index].classList.remove("selected"); } // unbold the player ui
                        if (guessed.indexOf(guess) === guessed.lastIndexOf(guess)) {
                            // remove the p# class from current pos and add the p# class to the new pos
                            // i hope i don't have to edit this because i have no clue what these mean
                            stairs.children[positions[index]].children[index].classList.remove(`p${index + 1}`);
                            try {
                                stairs.children[positions[index] + guess].children[index].classList.add(`p${index + 1}`);
                            } catch (TypeError) {
                                someoneWon = true;
                                setTimeout(() => {
                                    playerInfo.innerHTML = `Player ${index + 1} wins!`;
                                    const playAgain = document.createElement("button");
                                    playAgain.onclick = () => location.reload();
                                    playAgain.innerHTML = "Play Again";
                                    body.appendChild(playAgain);
                                }, 3000);
                            }
                            positions[index] = positions[index] + guess;
                        }
                    });
                    body.removeChild(numGuessed);
                    body.removeChild(inputInfo);
                    try { body.removeChild(document.getElementById("com-info")); } catch (ReferenceError) {}
                    if (!someoneWon) {
                        setTimeout(() => {
                            body.removeChild(playerInfo);
                            guess(playerCount);
                        }, 3000);
                    }
                }, 2000);
            }
            console.log(guessFilter.length);
        }
    }
    const playerInfo = document.createElement("p");
    playerInfo.id = "players";
    playerInfo.innerHTML = '<span class="p1">P1: WASD</span> | <span class="p2">P2: ↑←↓→</span> | <span class="p3">P3: IJKL</span> | <span class="p4" style="color: black;">P4: TFGH</span>';
    body.appendChild(playerInfo);
    const numGuessed = document.createElement("p");
    numGuessed.innerHTML = "<span id='num-guessed' style='font-size: 50px'>0/4</span> players have guessed";
    body.appendChild(numGuessed);
    const inputInfo = document.createElement("p");
    inputInfo.id = "input-info";
    inputInfo.innerHTML = "Amount to move:<br>↑: 1 step, ←: 2 steps, ↓: 3 steps, →: 4 steps";
    body.appendChild(inputInfo);
    const guessed = [false, false, false, false];
    if (playerCount != 4) {
        console.log(playerCount);
        const comInfo = document.createElement("p");
        comInfo.id = "com-info";
        comInfo.innerHTML = "Since you are not playing with all four players, the non players will be bots which just choose random moves.";
        body.appendChild(comInfo);
        const filterKeys = filter => Object.entries(inputs).filter(([key, value]) => value[0] === filter).map(([key]) => key);
        if (playerCount == 1) { // 1 p
            keyPressed(filterKeys(2)[Math.floor(Math.random() * 4)], true);
        }
        if (playerCount < 3) { // 1-2 p
            keyPressed(filterKeys(3)[Math.floor(Math.random() * 4)], true);
        }
        if (playerCount < 4) { // 1-3 p
            keyPressed(filterKeys(4)[Math.floor(Math.random() * 4)], true);
        }
    }

    window.onkeydown = event => keyPressed(event.key);
}
const playerCountRange = document.getElementById("player-count");
playerCountRange.oninput = () => document.getElementById("player-count-show").innerHTML = playerCountRange.value == "1" ? `${playerCountRange.value} player` : `${playerCountRange.value} players`;
const stepCountRange = document.getElementById("step-count");
stepCountRange.oninput = () => document.getElementById("step-count-show").innerHTML = stepCountRange.value == "50" ? `${stepCountRange.value} steps (will take a while)` : `${stepCountRange.value} steps`;
function startGame() {
    const playerCount = playerCountRange.value;
    body.removeChild(document.getElementById("inputs"));
    for (let index = 0; index < stepCountRange.value; index++) {
        const stair = document.createElement("div");
        stair.className = `stair ${index}`;
        stair.style.width = `${30 / stepCountRange.value}vw`;
        stair.style.height = `${25 / stepCountRange.value}vw`;
        stair.style.bottom = `${100 / stepCountRange.value * index}%`;
        stair.style.left = `${100 / stepCountRange.value * index}%`;
        for (let index = 1; index < 5; index++) {
            const substair = document.createElement("div");
            substair.className = `substair ${index}`;
            stair.appendChild(substair);
        }
        if (index === 0) {
            for (let index = 0; index < 4; index++) {
                stair.children[index].classList.add(`p${index + 1}`);
            }
        }
        stairs.appendChild(stair);
    }
    guess(playerCount);
}
