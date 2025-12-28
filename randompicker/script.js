const optionsText = document.getElementById("options-text");
const optionsShow = document.getElementById("options");
const hideAfter = document.getElementById("hide-after");
function createOptions() {
    const options = optionsText.value.split("\n");
    while (optionsShow.firstChild) optionsShow.removeChild(optionsShow.firstChild);
    options.forEach(option => {
        if (option.slice(0, 6) !== "(hide)") {
            const optionShow = document.createElement("div");
            optionShow.className = "option";
            const heading = document.createElement("h2");
            heading.innerHTML = option;
            optionShow.appendChild(heading);
            optionsShow.appendChild(optionShow);
        }
    });
}
function pick() {
    createOptions(); // create the options again just in case
    const options = optionsText.value.split("\n");
    const optionChosenIndex = Math.floor(Math.random() * options.length);
    // lit = lit up aka background turned white
    const timesLitChanges = 45;
    console.log(optionChosenIndex);
    //let optionLitIndex = (timesLitChanges % options.length + optionChosenIndex) % options.length;
    let optionLitIndex = (((optionChosenIndex - timesLitChanges) % options.length) + options.length) % options.length;
    console.log("OPTIONLITINDEX: " + optionLitIndex);
    //if (optionLitIndex < 0) optionLitIndex = 0;
    console.log(optionLitIndex);
    let speed = 50;
    function name() {
        optionsShow.children[optionLitIndex].style.backgroundColor = "darkgray";
        optionLitIndex = (optionLitIndex + 1) % options.length;
        optionsShow.children[optionLitIndex].style.backgroundColor = "white";
        if (speed < 300) {
            speed *= 1.05;
        } else {
            speed *= 1.1;
        }
        console.log(speed);
        if (speed < 500) {
            setTimeout(name, speed);
        } else {
            if (speed < 1000) {
                speed = 1000;
                setTimeout(name, speed);
            } else {
                if (speed < 2000) {
                    speed = 2000;
                    setTimeout(name, speed);
                } else {
                    optionsShow.children[optionLitIndex].style.backgroundColor = "darkgray";
                    const chosenChild = optionsShow.children[optionChosenIndex]
                    chosenChild.style.backgroundColor = "white";
                    const p = document.createElement("p");
                    setTimeout(() => {
                        p.innerHTML = "Option chosen!";
                        chosenChild.appendChild(p);
                        console.log(hideAfter.checked);
                        if (hideAfter.checked) {
                            setTimeout(() => {
                                const insertIndex = optionsText.value.indexOf(options[optionChosenIndex]);
                                optionsText.value = `${optionsText.value.slice(0, insertIndex)}(hide) ${optionsText.value.slice(insertIndex)}`;
                                createOptions();
                            }, speed);
                        }
                    }, speed);
                }
            }
        }
    }
    optionsShow.children[optionLitIndex].style.backgroundColor = "white";
    setTimeout(name, speed);
}
optionsText.focus();
createOptions();
optionsText.oninput = createOptions;