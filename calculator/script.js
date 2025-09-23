let number1 = 0;
let number2 = 0;
let answer = 0;
let symbol;
let selectedNumber = 1;
const number1P = document.getElementById("number1");
const number2P = document.getElementById("number2");
const answerP = document.getElementById("answer");
const symbolP = document.getElementById("symbol");
const add = () => answer = parseFloat(number1) + parseFloat(number2);
const subtract = () => answer = parseFloat(number1) - parseFloat(number2);
const multiply = () => answer = parseFloat(number1) * parseFloat(number2);
const divide = () => answer = parseFloat(number1) / parseFloat(number2);
const a = () => answer = parseFloat(number1) / parseFloat(number2);
const doWhat = {
    "+": add,
    "-": subtract,
    "*": multiply,
    "/": divide,
};

function putNumber(addedNumber) {
    if (selectedNumber === 1) {
        number1 += addedNumber;
        number1P.innerHTML = parseFloat(number1);
    } else {
        number2 += addedNumber;
        number2P.innerHTML = parseFloat(number2);
    }
}
function putSymbol(addedSymbol) {
    symbol = addedSymbol;
    symbolP.innerHTML = addedSymbol;
    selectedNumber = 2;
}
function getOpposite() {
    if (selectedNumber === 1) {
        number1 = 0 - number1;
        number1P.innerHTML = parseFloat(number1);
    } else {
        number2 = 0 - number2;
        number2P.innerHTML = parseFloat(number2);
    }
}
function addDecimal() {
    if (selectedNumber === 1) {
        if (number1.indexOf(".") === -1) {
            number1 += ".";
            number1P.innerHTML = number1P.innerHTML + ".";
        }
    } else {
        if (number2.indexOf(".") === -1) {
            number2 += ".";
            number2P.innerHTML = number2P.innerHTML + ".";
        }
    }
}
function equals() {
    doWhat[symbol]();
    answerP.innerHTML = answer;
}
function backspace() {
    if (selectedNumber === 1) {
        number1 = number1.slice(0, -1);
        if (number1.length === 0) {
            number1 = "0";
        }
        number1P.innerHTML = parseFloat(number1);
    } else {
        number2 = number2.slice(0, -1);
        if (number2.length === 0) {
            number2 = "0";
        }
        number2P.innerHTML = parseFloat(number2);
    }
}
function clear() {
    number1 = 0;
    number2 = 0;
    answer = 0;
    number1P.innerHTML = 0;
    number2P.innerHTML = 0;
    answerP.innerHTML = 0;
    symbolP.innerHTML = "?";
    selectedNumber = 1;
}
// get the key pressed
onkeydown = event => {
    const intKeyPressed = parseFloat(event.key);
    if (intKeyPressed || intKeyPressed === 0) { // check if button pressed is a number
        putNumber(event.key);
    } else if (event.key.toLowerCase() === "c") {
        clear();
    } else if (event.key in doWhat) {
        putSymbol(event.key);
    } else if (event.key === ".") {
        addDecimal();
    } else if (event.key === "Enter" || event.key === "=") {
        equals();
    } else if (event.key === "Backspace") {
        backspace();
    }
};
document.querySelector(".button").onclick = clear;