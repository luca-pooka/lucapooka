const keys = {
    "w": ["shoot", "<p style='transform: scaleX(-1)'>🔫😠</span>", "p1"], "a": ["reflect", "😉🪞", "p1"], "s": ["reload", "🔁😬", "p1"], "d": ["shield", "😥🛡️", "p1"],
    "arrowup": ["shoot", "🔫😠", "p2"], "arrowleft": ["reflect", "🪞😉", "p2"], "arrowdown": ["reload", "😬🔁", "p2"], "arrowright": ["mirror", "🛡️😥", "p2"]
};
let roundNumber = 0;
const round = document.getElementById("round");
const absolute = document.getElementById("absolute");
const countdown = document.getElementById("countdown");
const replay = document.getElementById("replay");
const sections = absolute.querySelector("#sections");
const leftSection = sections.querySelector("#left-section");
const rightSection = sections.querySelector("#right-section");
const p1Emoji = document.getElementById("p1").querySelector(".emoji");
const p2Emoji = document.getElementById("p2").querySelector(".emoji");
let speed = 1250;
let waitSpeed = 1500;
let p1Ammo = 0;
let p2Ammo = 0;
let p1ChoiceList;
let p2ChoiceList;
let p1Choice;
let p2Choice;
let tieSpamming = false;
let p1SpamPoints = 0;
let p2SpamPoints = 0;
function start() {
    roundNumber = 0;
    updateAmmo(1, -p1Ammo);
    updateAmmo(2, -p2Ammo);
    document.getElementById("title").style.display = "none";
    absolute.style.display = "block";
    round.style.display = "block";
    replay.style.display = "none";
    document.querySelector("body").onkeydown = event => {
        const key = event.key.toLowerCase();
        console.log(event.key);
        if (tieSpamming) {
            if (key === "w") {
                p1SpamPoints++;
                leftSection.style.clipPath = `inset(0 ${100 - p1SpamPoints * 5}% 0 0)`;
                if (p1SpamPoints >= 20) {
                    gameEnd(1);
                }
            } else if (key === "arrowup") {
                p2SpamPoints++;
                rightSection.style.clipPath = `inset(0 0 0 ${100 - p2SpamPoints * 5}%)`;
                if (p2SpamPoints >= 20) {
                    gameEnd(2);
                }
            }
        } else if (key in keys) {
            if (keys[key][2] === "p1") {
                p1ChoiceList = keys[key];
                p1Choice = p1ChoiceList[0];
            } else if (keys[key][2] === "p2") {
                p2ChoiceList = keys[key];
                p2Choice = p2ChoiceList[0];
            }
        }
    };
    newRound();
}
function newRound() {
    const p1Options = document.getElementById("p1").querySelector(".player-options").children;
    const p2Options = document.getElementById("p2").querySelector(".player-options").children;
    increaseRound();
    setCountdownSpeed();
    p1Emoji.innerHTML = "<span style='transform: scaleX(-1);'>🤔</span>";
    p2Emoji.innerHTML = "🤔";
    countdown.className = null;
    p1ChoiceList = [null, "😦", null];
    p1Choice = null;
    p2ChoiceList = [null, "😦", null];
    p2Choice = null;
    countdown.style.display = "block";
    countdown.innerHTML = "Get Ready...";
    countdown.style.fontSize = "3em";
    setTimeout(() => {
        for (let index = 1; index < 3; index++) {
            const playerKeys = absolute.querySelector(`#p${index}`).querySelector(".player-options").children;
            playerKeys[0].innerHTML = "🔫";
            playerKeys[1].innerHTML = "🪞";
            playerKeys[2].innerHTML = "🔁";
            playerKeys[3].innerHTML = "🛡️";
        }
        for (const kbd of p1Options) {
            kbd.classList.remove("off");
        }
        for (const kbd of p2Options) {
            kbd.classList.remove("off");
        }
        if (p1Ammo < 1) {
            p1Options[0].classList.add("off");
            p1Options[1].classList.add("off");
        } else {
            p1Options[0].classList.remove("off");
            p1Options[1].classList.remove("off");
        }
        if (p2Ammo < 1) {
            p2Options[0].classList.add("off");
            p2Options[1].classList.add("off");
        } else {
            p2Options[0].classList.remove("off");
            p2Options[1].classList.remove("off");
        }
        const root = document.documentElement;
        root.style.setProperty("--section-animation-forward-time", `${speed * 3.5}ms`);
        for (const section of sections.getElementsByClassName("section")) {
            section.classList.remove("animating-back");
            section.classList.add("animating-forward");
            // for each section, give it the animating-forward class for the css to animate it and remove the old one
        };
        countdownNumber(countdown, "3", "5em", "shake-s");
        setTimeout(() => {
            countdownNumber(countdown, "2", "6em", "shake-m");
            setTimeout(() => {
                countdownNumber(countdown, "1", "7em", "shake-l");
                setTimeout(() => {
                    countdownNumber(countdown, "0", "8em", "shake-xl");
                    setTimeout(() => {
                        if (((p1Choice === "shoot" || p1Choice === "reflect") && p1Ammo < 1) || p1Choice === undefined) {
                            p1ChoiceList = [null, "😦", null];
                            p1Choice = null;
                        }
                        if (((p2Choice === "shoot" || p2Choice === "reflect") && p2Ammo < 1) || p2Choice === undefined) {
                            p2ChoiceList = [null, "😦", null];
                            p2Choice = null;
                        }
                        countdown.style.display = "none";
                        console.log(p1ChoiceList, p2ChoiceList);
                        p1Emoji.innerHTML = p1ChoiceList[1];
                        p2Emoji.innerHTML = p2ChoiceList[1];
                        if (p1Choice === "reload") {
                            updateAmmo(1, 1);
                        }
                        if (p2Choice === "reload") {
                            updateAmmo(2, 1);
                        }
                        if (p1Choice === "reflect") {
                            updateAmmo(1, -1);
                        }
                        if (p2Choice === "reflect") {
                            updateAmmo(2, -1);
                        }
                        if (p1Choice === "shoot") {
                            updateAmmo(1, -1);
                            if (p2Choice === "reload" || p2Choice === null) {
                                gameEnd(1);
                                return;
                            } else if (p2Choice === "reflect") {
                                gameEnd(2);
                                return;
                            }
                        }
                        if (p2Choice === "shoot") {
                            updateAmmo(2, -1);
                            if (p1Choice === "reload" || p1Choice === null) {
                                gameEnd(2);
                                return;
                            } else if (p1Choice === "reflect") {
                                gameEnd(1);
                                return;
                            }
                        }
                        if (p1Choice === "shoot" && p2Choice === "shoot") {
                            for (const section of sections.getElementsByClassName("section")) {
                                section.classList.remove("animating-forward");
                                section.classList.add("animating-back");
                            };
                            countdown.style.display = "block";
                            countdown.style.fontSize = "3em";
                            countdown.innerHTML = "War!<br>Spam to win!";
                            tieSpamming = true;
                            return;
                        }
                        // if either player chooses shield, nothing happens to them
                        setTimeout(() => {
                            root.style.setProperty("--section-animation-back-time", `${waitSpeed * 0.5}ms`);
                            for (const section of sections.getElementsByClassName("section")) {
                                section.classList.remove("animating-forward");
                                section.classList.add("animating-back");
                                // for each section, give it the animating-back class for the css to animate it and remove the old one
                            };
                            for (const kbd of p1Options) {
                                kbd.classList.add("off");
                            }
                            for (const kbd of p2Options) {
                                kbd.classList.add("off");
                            }
                            newRound();
                        }, 2000);
                    }, speed);
                }, speed);
            }, speed);
        }, speed);
    }, waitSpeed);
}
function gameEnd(playerNumber) {
    for (const section of sections.getElementsByClassName("section")) {
        section.style.clipPath = "inset(0)";
    };
    tieSpamming = false;
    p1SpamPoints = 0;
    p2SpamPoints = 0;
    countdown.style.display = "block";
    countdown.style.fontSize = "3em";
    countdown.innerHTML = `Player ${playerNumber} wins!`;
    replay.style.display = "inline-block";
}
function countdownNumber(countdown, text, fontSize, animationName) {
    countdown.innerHTML = text;
    countdown.style.fontSize = fontSize;
    countdown.classList = animationName;
}
function increaseRound() {
    roundNumber++;
    round.innerHTML = `Round ${roundNumber}`;
}
function updateAmmo(playerNumber, change) {
    if (playerNumber === 1) {
        p1Ammo += change;
    } else if (playerNumber === 2) {
        p2Ammo += change;
    }
    document.getElementById(`p${playerNumber}`).querySelector(".ammo").innerHTML = `Ammo: ${playerNumber === 1 ? p1Ammo : playerNumber === 2 ? p2Ammo : 0}`;
}
function setCountdownSpeed() {
    switch (roundNumber) {
        case 1:
            speed = 1250;
            waitSpeed = 1500;
            break;
        case 2:
            speed = 1000;
            waitSpeed = 1250;
            break;
        case 3:
            speed = 800;
            waitSpeed = 1000;
            break;
        case 4:
            speed = 700;
            waitSpeed = 900;
            break;
        case 5:
            speed = 600;
            waitSpeed = 800;
            break;
        case 6:
            speed = 500;
            waitSpeed = 800;
            break;
        case 7:
            speed = 400;
            waitSpeed = 700;
            break;
        case 8:
            speed = 300;
            waitSpeed = 700;
            break;
        case 9:
            speed = 250;
            waitSpeed = 600;
            break;
        default:
            speed = 200;
            waitSpeed = 600;
            break;
    }
}