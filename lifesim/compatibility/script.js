import { saveStat, loadStat } from "../stats.js";
const people = loadStat("people");
const select1 = document.getElementById("person1");
const select2 = document.getElementById("person2");
const bothBad = document.querySelector("p");
people.forEach(person => {
    if (person.random === undefined || person.random === null) {
        person.random = Math.random();
    }
});
saveStat("people", people);
function createOptions(selectElement) {
    people.forEach(person => {
        const option = document.createElement("option");
        option.innerHTML = `${person.first} ${person.last}`;
        option.value = person.random;
        selectElement.appendChild(option);
    });
}
createOptions(select1);
createOptions(select2);

document.getElementById("check").onclick = () => {
    if (select1.value == select2.value) {
        bothBad.style.display = "block";
    } else {
        bothBad.style.display = "none";
        const percent = Math.round((1 - Math.abs(select1.value - select2.value)) * 100);
        const percentElement = document.getElementById("percent");
        percentElement.style.transform = "scale(1)";
        const showRandomInterval = setInterval(() => percentElement.innerHTML = `${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}%`, 20);
        setTimeout(() => {
            clearInterval(showRandomInterval);
            percentElement.innerHTML = `${percent}%`;
            percentElement.style.transform = "scale(1.1)";
        }, 2000);
    }
}