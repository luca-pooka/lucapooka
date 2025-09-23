const games = [
    {level: [
        {beat: 1, side: "right"},
        {beat: 2, side: "left", end: true},
        {beat: 5, side: "right"},
        {beat: 6, side: "left", end: true},
        {beat: 9, side: "right", end: true},
        {beat: 14, side: "left", end: true},
        {beat: 20, side: "left", length: 4},
        {beat: 21, side: "right", length: 4},
        {beat: 22, side: "left", length: 4},
        {beat: 23, side: "right", length: 4, end: true},
    ], song: "", bpm: 120}
]
const chooseLevel = document.getElementById("choose");
chooseLevel.oninput = () => document.getElementById("level").innerHTML = parseInt(chooseLevel.value) + 1;
const player = document.getElementById("player");
const leftEnemies = document.getElementById("left-enemies");
const rightEnemies = document.getElementById("right-enemies");
function playGame(gameIndex) {
    const game = games[gameIndex];
    const beatToMs = beat => beat * (60000 / game.bpm);
    let currentSide = "right";
    let timingIndex = 0;
    setInterval(() => {
        timingIndex += 0.01;
        if (timingIndex.toFixed(2) % 1 == 0) {
            document.querySelector("h2").innerHTML = timingIndex;
        }
    }, beatToMs(0.01));
    game.level.forEach(input => {
        console.log(input.beat * (60000 / game.bpm));
        setTimeout(() => {
            // show the enemy
            const enemy = document.createElement("span");
            enemy.innerHTML = "👺";
            if (input.side === "left") {
                leftEnemies.insertBefore(enemy, leftEnemies.firstChild);
            } else {
                rightEnemies.appendChild(enemy);
            }
            const length = input.length == undefined ? 2 : input.length;
            const end = input.end ? true : false;
            if (end) {
                new Audio("start attack.mp3").play();
            } else {
                new Audio("appear.mp3").play();
            }
            setTimeout(() => {
                enemy.innerHTML = "💥";
                setTimeout(() => {
                    // remove enemy after 2 beats
                    if (input.side === "left") {
                        leftEnemies.removeChild(enemy);
                    } else {
                        rightEnemies.removeChild(enemy);
                    }
                }, beatToMs(length));
            }, beatToMs(length)); // default is 2, change with length
        }, beatToMs(input.beat));
    });
    function closestNumber(target, level) {
        let closestObject = level.reduce((closest, obj) => {
            if (closest == undefined) {
                closest = [{beat: null}];
            }
            const closestBeat = closest.length == undefined ? closest.beat + 2 : closest.beat + closest.length;
            const objBeat = obj.length == undefined ? obj.beat + 2 : obj.beat + obj.length;
            Math.abs(objBeat - target) < Math.abs(closestBeat - target) ? obj : closest;
        });
        console.log(closestObject);
        return { closest: closestObject, difference: Math.abs((closestObject.beat + closestObject.length == undefined ? 2 : closestObject.length) - target) };
    }
    window.onpointerdown = () => {
        const attackAudio = new Audio("attack.mp3");
        attackAudio.play();
        const closestBeat = closestNumber(timingIndex, game.level);
        console.log(closestBeat);
        player.innerHTML = "💁";
        setTimeout(() => {
            player.innerHTML = "🧑";
        }, beatToMs(0.25));
    }
}
const select = document.getElementById("select");
document.getElementById("play").onclick = () => {
    while (select.childElementCount > 0) {
        select.removeChild(select.children[0]);
    }
    playGame(chooseLevel.value);
};