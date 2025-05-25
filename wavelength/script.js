const catagories = [
    {name: "Foods", ranges: [{min: "Disgusting food", max: "Delicious food"}, {min: "Basic food", max: "Fancy food"}]},
    {name: "Animals", ranges: [{min: "Boring animal", max: "Cool animal"}, {min: "Animal you'd eat", max: "Animal you'd keep as a pet"}, {min: "Animal that would beat you in a fight", max: "Animal you could beat in a fight"}]},
    {name: "Sports", ranges: [{min: "Boring sport to play", max: "Fun sport to play"}, {min: "Boring sport to watch", max: "Fun sport to watch"}, {min: "Sport you'd rather watch", max: "Sport you'd rather play"}]},
    {name: "Games", ranges: [{min: "Terrible game", max: "Favorite game"}]},
    {name: "Body", ranges: [{min: "Unnecessary body part", max: "Important body part"}]},
    {name: "Places", ranges: [{min: "Unnecessary place for society", max: "Important place for society"}, {min: "Unneccessary room", max: "Important room"}]},
    {name: "Furniture", ranges: [{min: "Unnecessary furniture", max: "Important furniture"}, {min: "Cheap furniture", max: "Expensive furniture"}]},
    {name: "Words", ranges: [{min: "Easy word to spell", max: "Hard word to spell"}, {min: "Basic word", max: "Fancy word"}]},
    {name: "People", ranges: [{min: "Someone P2 hates", max: "P2's best friend"}]},
    {name: "School", ranges: [{min: "Boring school subject", max: "Fun school subject"}]}
];
const body = document.querySelector("body");
const startButton = document.getElementById("start");
startButton.onclick = () => {
    body.removeChild(document.querySelector("p"));
    body.removeChild(startButton);
    const catagory = catagories[Math.floor(Math.random() * catagories.length)];
    const subCatagory = catagory.ranges[Math.floor(Math.random() * catagory.ranges.length)];
    console.log(subCatagory);
    console.log(catagory.ranges, catagory.ranges.length);
    const catagoryH2 = document.createElement("h2");
    catagoryH2.innerHTML = `Your catagory is "${catagory.name}".`;
    const nextButton = document.createElement("button");
    nextButton.innerHTML = "Next";
    nextButton.onclick = () => {
        body.removeChild(catagoryH2);
        body.removeChild(nextButton);
        const lookP1 = document.createElement("h2");
        lookP1.innerHTML = "Player 1, look at the screen! (Don't show P2 this.)";
        const p1Button = document.createElement("button");
        p1Button.innerHTML = "This is P1!";
        p1Button.onclick = () => {
            body.removeChild(lookP1);
            body.removeChild(p1Button);
            const number = Math.floor(Math.random() * 20) + 1;
            const numberH2 = document.createElement("h2");
            numberH2.innerHTML = `Your number is ${number}! (Out of 20.)`;
            const nextButton = document.createElement("button");
            nextButton.innerHTML = "Next";
            nextButton.onclick = () => {
                body.removeChild(nextButton);
                const tellP2 = document.createElement("h3");
                tellP2.innerHTML = `Now tell P2 a word that fits your catagory of "${catagory.name}".<br>They have to guess a number between 1-20 with 1 being "${subCatagory.min}" and 20 being "${subCatagory.max}".<br>You want to try to get them to guess the same number as the one given to you.`;
                const toldButton = document.createElement("button");
                toldButton.innerHTML = "I've told P2 the word!";
                toldButton.onclick = () => {
                    body.removeChild(numberH2);
                    body.removeChild(tellP2);
                    body.removeChild(toldButton);
                    const div = document.createElement("div");
                    const explanation = document.createElement("h2");
                    explanation.innerHTML = "Okay P2, now you have to guess the number that was given based off of what P1 told you.";
                    const info = document.createElement("h3");
                    info.innerHTML = `The catagory was "${catagory.name}".`;
                    const minLabel = document.createElement("label");
                    minLabel.innerHTML = subCatagory.min;
                    const range = document.createElement("input");
                    range.type = "range";
                    range.min = 1;
                    range.max = 20;
                    range.value = 10;
                    const maxLabel = document.createElement("label");
                    maxLabel.innerHTML = subCatagory.max;
                    const value = document.createElement("p");
                    value.innerHTML = "10/20";
                    range.oninput = () => value.innerHTML = `${range.value}/20`;
                    const submit = document.createElement("button");
                    submit.innerHTML = "Submit";
                    submit.onclick = () => {
                        const guess = range.value;
                        body.removeChild(explanation);
                        body.removeChild(info);
                        body.removeChild(div)
                        body.removeChild(value);
                        body.removeChild(submit);
                        const guessH2 = document.createElement("h2");
                        guessH2.innerHTML = `Your Guess: ${guess}`;
                        const numberH2 = document.createElement("h2");
                        numberH2.innerHTML = "Real Number: <span id='number'>0</span>";
                        body.appendChild(guessH2);
                        body.appendChild(numberH2);
                        const difference = Math.abs(number - guess);
                        const consolence = document.createElement("h3");
                        consolence.innerHTML = difference > 3 ? `You were ${difference} away...` : difference == 0 ? "You got the number exactly right! 0 away!" : `You were only ${difference} away! So close!`;
                        const replay = document.createElement("button");
                        replay.innerHTML = "Play Again";
                        replay.onclick = () => location.reload();
                        const numberSpan = document.getElementById("number");
                        const randomNumbers = setInterval(() => numberSpan.innerHTML = Math.floor(Math.random() * 20) + 1, 20);
                        setTimeout(() => {
                            clearInterval(randomNumbers);
                            numberSpan.innerHTML = number;
                        }, 2000);
                        setTimeout(() => body.appendChild(consolence), 3000);
                        setTimeout(() => body.appendChild(replay), 4000);
                    }
                    body.appendChild(explanation);
                    body.appendChild(info);
                    div.appendChild(minLabel);
                    div.appendChild(range);
                    div.appendChild(maxLabel);
                    body.appendChild(div)
                    body.appendChild(value);
                    body.appendChild(submit);
                }
                body.appendChild(tellP2);
                body.appendChild(toldButton);
            }
            body.appendChild(numberH2);
            body.appendChild(nextButton);
        }
        body.appendChild(lookP1);
        body.appendChild(p1Button);
    }
    body.appendChild(catagoryH2);
    body.appendChild(nextButton);
}
// Math.floor(0.999999999999999944488848768742172978818)