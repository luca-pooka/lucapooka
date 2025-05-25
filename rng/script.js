const minRange = document.getElementById("min-range");
const minNumber = document.getElementById("min");
const maxRange = document.getElementById("max-range");
const maxNumber = document.getElementById("max");
const decimal = document.getElementById("decimal");
const decimalRange = document.getElementById("place-range");
const decimalNumber = document.getElementById("place");
minRange.oninput = () => minNumber.value = minRange.value;
minNumber.oninput = () => minRange.value = minNumber.value;
maxRange.oninput = () => maxNumber.value = maxRange.value;
maxNumber.oninput = () => maxRange.value = maxNumber.value;
decimalRange.oninput = () => decimalNumber.value = decimalRange.value;
decimalNumber.oninput = () => decimalRange.value = decimalNumber.value;
decimal.oninput = () => document.getElementById("places").style.display = decimal.checked ? "block" : "none";
document.querySelector("button").onclick = () => {
    if (decimal.checked) {
        document.getElementById("number").innerHTML = ((Math.random() * (parseFloat(maxNumber.value) - parseFloat(minNumber.value))) + parseFloat(minNumber.value)).toFixed(decimalNumber.value);
    } else {
        document.getElementById("number").innerHTML = Math.floor((Math.random() * (parseFloat(maxNumber.value) - parseFloat(minNumber.value) + 1)) + parseFloat(minNumber.value));
    }
}