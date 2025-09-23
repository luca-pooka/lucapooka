import { saveStat, loadStat } from "../stats.js";
import { interiors } from "./interiors.js";
const originalInteriors = [...interiors];
const myInteriors = loadStat("interiors") || [];
const moneyShown = document.getElementById("money");
const table = document.querySelector("table");
let money = loadStat("money");
moneyShown.innerHTML = money.toLocaleString();
let index = interiors.length;
const urlInfo = new URLSearchParams(window.location.search);
const personIndex = urlInfo.get("person");
if (personIndex !== null) {
    console.log(`../apartments/apartment?person=${personIndex}`);
    document.querySelector("button").onclick = () => location.href = `../apartments/apartment?person=${personIndex}`;
}
// shuffle the interiors
while (index > 0) {
    let randomIndex = Math.floor(Math.random() * index);
    index--;
    [interiors[index], interiors[randomIndex]] = [interiors[randomIndex], interiors[index]];
}
const randomInteriors = interiors.slice(0, 5);
console.log(randomInteriors);

randomInteriors.forEach(thisInterior => {
    const tr = document.createElement("tr");
    const name = document.createElement("td");
    name.innerHTML = thisInterior.name;
    name.style.background = thisInterior.color;
    name.style.color = thisInterior.textColor;
    const cost = document.createElement("td");
    cost.innerHTML = `$${thisInterior.cost}`;
    const description = document.createElement("td");
    description.innerHTML = thisInterior.description;
    const purchase = document.createElement("td");
    const purchaseButton = document.createElement("button");
    purchaseButton.innerHTML = "Purchase";
    purchaseButton.onclick = () => {
        randomInteriors.forEach(interior => {
            if (interior === thisInterior) {
                if (money >= thisInterior.cost) {
                    money -= thisInterior.cost;
                    myInteriors.push(originalInteriors.findIndex(foundInterior => foundInterior == thisInterior));
                    saveStat("interiors", myInteriors);
                    saveStat("money", money);
                    moneyShown.innerHTML = money.toLocaleString();
                    console.log(loadStat("interiors"));
                } else {
                    console.log(loadStat("money"));
                }
            }
        });
    }
    table.appendChild(tr);
    tr.appendChild(name);
    tr.appendChild(cost);
    tr.appendChild(description);
    tr.appendChild(purchase);
    purchase.appendChild(purchaseButton);
});