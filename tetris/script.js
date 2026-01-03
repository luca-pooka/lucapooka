const grid = document.getElementById("grid");
for (let y = 20; y > 0; y--) {
    for (let x = 1; x < 11; x++) {
        const tile = document.createElement("div");
        tile.className = `tile x${x} y${y}`;
        grid.appendChild(tile);
    }
}
const blocks = [
    { color: "purple", positions: [{ x: 6, y: 20 }, { x: 5, y: 19 }, { x: 6, y: 19 }, { x: 7, y: 19 }] },
    { color: "red", positions: [{ x: 5, y: 20 }, { x: 6, y: 20 }, { x: 6, y: 19 }, { x: 7, y: 19 }] },
    { color: "lime", positions: [{ x: 5, y: 20 }, { x: 6, y: 20 }, { x: 6, y: 19 }, { x: 7, y: 19 }] },
    { color: "orange", positions: [{ x: 7, y: 20 }, { x: 5, y: 19 }, { x: 6, y: 19 }, { x: 7, y: 19 }] },
    { color: "blue", positions: [{ x: 5, y: 20 }, { x: 5, y: 19 }, { x: 6, y: 19 }, { x: 7, y: 19 }] },
    { color: "yellow", positions: [{ x: 6, y: 20 }, { x: 7, y: 20 }, { x: 6, y: 19 }, { x: 7, y: 19 }] },
    { color: "cyan", positions: [{ x: 4, y: 20 }, { x: 5, y: 20 }, { x: 6, y: 20 }, { x: 7, y: 20 }] },
]
function getNextBlock() {
    const chosenBlock = blocks[Math.floor(Math.random() * blocks.length)];
    for (let index = 0; index < 200; index++) {
        grid.childNodes.forEach(child => {
            const x = parseInt(child.classList[1].slice(1));
            const y = parseInt(child.classList[2].slice(1));
            chosenBlock.positions.forEach(position => {
                if (x === position.x && y === position.y) {
                    child.classList.add("block", "falling");
                    child.style.backgroundColor = chosenBlock.color;
                }
            });
        })
    }
}
function moveToNextBlock(currentChild, addX, addY) {
    if (!currentChild.classList.contains("falling")) return;

    const currentX = parseInt(currentChild.classList[1].slice(1));
    const currentY = parseInt(currentChild.classList[2].slice(1));
    for (const nextChild of grid.childNodes) {
        const nextX = parseInt(nextChild.classList[1].slice(1));
        const nextY = parseInt(nextChild.classList[2].slice(1));
        if (nextX === currentX + addX && nextY === currentY + addY && !nextChild.classList.contains("block")) {
            nextChild.classList.add("block", "falling");
            nextChild.style.backgroundColor = currentChild.style.backgroundColor;
            currentChild.classList.remove("block", "falling");
            currentChild.style.backgroundColor = null;
            return;
        }
    }
    if (addY === -1) {
        // when one block hits the ground, all of them also stop falling
        for (const child of grid.childNodes) {
            child.classList.remove("falling");
        }
        getNextBlock();
        return true; // stop rest of loop
    }
}
document.querySelector("body").onkeydown = event => {
    const key = event.key.toLowerCase();
    const keyValues = {"arrowleft": [-1, 0], "a": [-1, 0], "arrowright": [1, 0], "d": [1, 0], "arrowdown": [0, -1], "s": [0, -1]}
    if (key in keyValues) {
        if (keyValues[key][0] === -1) {
            for (let index = 0; index < 200; index++) {
                const child = grid.childNodes[index];
                if (moveToNextBlock(child, keyValues[key][0], keyValues[key][1])) break;
            } 
        } else {
            for (let index = 199; index >= 0; index--) {
                const child = grid.childNodes[index];
                if (moveToNextBlock(child, keyValues[key][0], keyValues[key][1])) break;
            }
        }
    }
}
getNextBlock();
setInterval(() => {
    for (let index = 199; index >= 0; index--) {
        const child = grid.childNodes[index];
        if (moveToNextBlock(child, 0, -1)) break;
    }
}, 1000);