import { saveStat, loadStat } from "../stats.js";
import { food } from "./food.js";
const originalFoods = [...food];
const myFood = loadStat("food") || [];
const moneyShown = document.getElementById("money");
const table = document.querySelector("table");
let money = loadStat("money");
moneyShown.innerHTML = money.toLocaleString();
let index = food.length;
const urlInfo = new URLSearchParams(window.location.search);
const personIndex = urlInfo.get("person");
console.log(personIndex);
// this doesn't work for some reason
if (personIndex !== null) {
    console.log(`../apartments/apartment?person=${personIndex}`);
    document.querySelector("button").onclick = () => location.href = `../apartments/apartment?person=${personIndex}`;
}
// shuffle the foods
while (index > 0) {
    let randomIndex = Math.floor(Math.random() * index);
    index--;
    [food[index], food[randomIndex]] = [food[randomIndex], food[index]];
}
const randomFood = food.slice(0, 5);
console.log(randomFood);

randomFood.forEach(thisFood => {
    const tr = document.createElement("tr");
    const name = document.createElement("td");
    name.innerHTML = thisFood.name;
    const cost = document.createElement("td");
    cost.innerHTML = `$${thisFood.cost}`;
    const description = document.createElement("td");
    description.innerHTML = thisFood.description;
    const purchase = document.createElement("td");
    const purchaseButton = document.createElement("button");
    purchaseButton.innerHTML = "Purchase";
    purchaseButton.onclick = () => {
        console.log(thisFood, food);
        randomFood.forEach((food, index) => {
            if (food === thisFood) {
                console.log(index);
                if (money >= thisFood.cost) {
                    money -= thisFood.cost;
                    myFood.push(originalFoods.findIndex(foundFood => foundFood == thisFood));
                    saveStat("food", myFood);
                    saveStat("money", money);
                    moneyShown.innerHTML = money.toLocaleString();
                    console.log(loadStat("food"));
                } else {
                    console.log("not enough money");
                }
                return;
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