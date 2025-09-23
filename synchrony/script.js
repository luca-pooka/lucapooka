let questions = [
    {q: "What's your favorite food?", a: ["Pizza", "Tacos", "Pasta", "Sushi"]},
    {q: "What's your favorite school subject?", a: ["Math", "English", "Science", "Social Studies"]},
    {q: "What would you rather watch?", a: ["A show", "A movie", "A YouTube video", "TikToks"]},
    {q: "What's the best Nintendo franchise?", a: ["Mario", "Zelda", "Kirby", "Other"]},
    {q: "What's would you rather use to play games?", a: ["Phone", "Computer", "Console", "Handheld"]},
    {q: "What's your favorite game?", a: ["Minecraft", "Roblox", "Fortnite", "Valorant"]},
]
const timeRange = document.querySelector("input");
const timeP = document.getElementById("time")
timeRange.oninput = () => timeP.innerHTML = timeRange.value;
// shuffle
let index = questions.length;
while (index > 0) {
    let randomIndex = Math.floor(Math.random() * index);
    index--;
    [questions[index], questions[randomIndex]] = [
        questions[randomIndex], questions[index]];
}
questions = questions.slice(0, 7);
const p1Inputs = ["w", "a", "s", "d"];
const p2Inputs = ["ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight"];
const questionsDiv = document.getElementById("question");
let questionIndex = 1;
let questionsInSync = 0;
function removeQuestion() {
    while (questionsDiv.childElementCount) {
        questionsDiv.removeChild(questionsDiv.children[0]);
    }
}
function createQuestion() {
    removeQuestion();
    const question = questions.pop();
    const questionShown = document.createElement("h2");
    questionShown.innerHTML = question.q;
    const optionsShown = document.createElement("h3");
    optionsShown.innerHTML = "Options:";
    const answersShown = document.createElement("h2");
    answersShown.innerHTML = `W/Up: ${question.a[0]}<br>A/Left: ${question.a[1]}<br>S/Down: ${question.a[2]}<br>D/Right: ${question.a[3]}`;
    const timerShown = document.createElement("h2");
    timerShown.innerHTML = `${timeRange.value}.0`;
    const hasChosen = document.createElement("h2");
    hasChosen.innerHTML = "P1: <span id='p1Status'>Not Chosen</span> | P2: <span id='p2Status'>Not Chosen</span>";
    questionsDiv.appendChild(questionShown);
    questionsDiv.appendChild(optionsShown);
    questionsDiv.appendChild(answersShown);
    questionsDiv.appendChild(timerShown);
    questionsDiv.appendChild(hasChosen);
    const p1Status = document.getElementById("p1Status");
    const p2Status = document.getElementById("p2Status");
    let p1Guess;
    let p2Guess;
    document.querySelector("body").onkeydown = event => {
        if (timer > 0) {
            const p1Index = p1Inputs.findIndex(input => event.key == input);
            const p2Index = p2Inputs.findIndex(input => event.key == input);
            if (p1Index === -1) {
                if (p2Index !== -1) {
                    p2Guess = p2Index;
                    p2Status.innerHTML = "Chosen";
                }
            } else {
                p1Guess = p1Index;
                p1Status.innerHTML = "Chosen";
            }
        }
    }
    let timer = +timeRange.value;
    const timerInterval = setInterval(() => {
        timer -= 0.1;
        timer = timer.toFixed(1)
        timerShown.innerHTML = timer;
    }, 100);
    const waitForTimerEnd = setInterval(() => {
        if (timer <= 0) {
            p1Status.innerHTML = null;
            p2Status.innerHTML = null;
            clearInterval(timerInterval);
            clearInterval(waitForTimerEnd);
        }
    }, 100);
    setTimeout(() => {
        p1Status.innerHTML = question.a[p1Guess] === undefined ? "None Chosen" : question.a[p1Guess];
        p2Status.innerHTML = question.a[p2Guess] === undefined ? "None Chosen" : question.a[p2Guess];
    }, 2000 + +timeRange.value * 1000);
    setTimeout(() => {
        const inSync = document.createElement("h3");
        if (p1Guess === undefined) {
            if (p2Guess === undefined) {
                inSync.innerHTML = "Neither of you guessed. 💀";
            } else {
                inSync.innerHTML = "Player One did not guess in time...";
            }
        } else if (p2Guess === undefined) {
            inSync.innerHTML = "Player Two did not guess in time...";
        } else if (p1Guess === p2Guess) {
            inSync.innerHTML = "You two did the same answer! You're in sync!";
            questionsInSync++;
        } else {
            inSync.innerHTML = "You two are not in sync."
        }
        questionsDiv.appendChild(inSync);
    }, 3000 + +timeRange.value * 1000);
    setTimeout(() => {
        const nextButton = document.createElement("button");
        
        if (questionIndex === 5) {
            nextButton.innerHTML = "See results";
            nextButton.onclick = () => {
                removeQuestion();
                const header = document.createElement("h2");
                header.innerHTML = "Result: ";
                const result = document.createElement("h2");
                result.innerHTML = `${questionsInSync}/5 questions in sync!`;
                const replay = document.createElement("button");
                replay.innerHTML = "Play Again";
                replay.onclick = () => location.reload();
                questionsDiv.appendChild(header);
                questionsDiv.appendChild(result);
                questionsDiv.appendChild(replay);
            }
        } else {
            nextButton.innerHTML = questionIndex === 4 ? "Final Question" : "Next Question";
            nextButton.onclick = () => {
                createQuestion();
                questionIndex++;
            };
        }
        questionsDiv.appendChild(nextButton);
    }, 4000 + +timeRange.value * 1000);
}