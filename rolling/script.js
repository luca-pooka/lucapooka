const setItem = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const getItem = key => {
    try {
        return JSON.parse(localStorage.getItem(key));
    } catch (SyntaxError) {
        return null;
    }
};
const removeItem = item => localStorage.removeItem(`rolling-${item}`);
function deleteData() {
    if (confirm("Are you sure you want to delete your data?") && confirm("Are you REALLY sure?")) {
        removeItem("items");
        removeItem("time");
        removeItem("money");
        removeItem("interval");
        removeItem("catalogue");
        removeItem("rolled");
        removeItem("used");
        alert("Save data gone...");
        location.reload();
    }
}
const rolls = [
    {name: "Common", percent: 0.3, color: "darkgray", bg: "black", outline: "black", sell: 1},
    {name: "Good", percent: 0.2, color: "white", bg: "black", outline: "black", sell: 2},
    {name: "Nice", percent: 0.15, color: "yellow", bg: "black", outline: "black", sell: 3},
    {name: "Cool", percent: 0.12, color: "black", bg: "yellow", outline: "white", sell: 4},
    {name: "Great", percent: 0.1, color: "orange", bg: "black", outline: "black", sell: 5},
    {name: "Rare", percent: 0.05, color: "blue", bg: "black", outline: "white", sell: 10},
    {name: "Crazy", percent: 0.03, color: "red", bg: "black", outline: "black", sell: 15},
    {name: "Incredible", percent: 0.025, color: "purple", bg: "black", outline: "white", sell: 25},
    {name: "Absurd", percent: 0.0125, color: "black", bg: "red", outline: "white", sell: 50},
    {name: "Unbelievable", percent: 0.00625, color: "black", bg: "linear-gradient(to right, gray, red)", outline: "white", sell: 100},
    {name: "Legendary", percent: 0.003125, color: "white", bg: "linear-gradient(to right, yellow, blue", outline: "black", sell: 500},
    {name: "Preposterous", percent: 0.0015625, color: "white", bg: "linear-gradient(to right, red, black", outline: "black", sell: 1000},
    {name: "Rainbow", percent: 0.0005208333, color: "white", bg: "linear-gradient(to right, red, orange, yellow, green, blue, purple, pink", outline: "black", sell: 2500},
    {name: "Mythical", percent: 0.00078125, color: "white", bg: "linear-gradient(to right, lightblue, blue, darkblue", outline: "black", sell: 5000},
    {name: "Divine", percent: 0.0002, color: "white", bg: "linear-gradient(to right, white, blue, black", outline: "black", sell: 10000},
    {name: "Heavenly", percent: 0.0000604167, color: "white", bg: "linear-gradient(to right, white, lightblue, blue", outline: "black", sell: 10000},
];
const shopItems = [
    {interval: 240000, cost: 20},
    {interval: 180000, cost: 40},
    {interval: 120000, cost: 70},
    {interval: 60000, cost: 150},
    {interval: 30000, cost: 350},
    {interval: 15000, cost: 800},
    {interval: 10000, cost: 2000},
    {interval: 5000, cost: 7500},
    {interval: 3000, cost: 20000}
]
/* all this helped me with make roll values
let total = 0;
rolls.forEach(roll => total += roll.percent);
console.log(total);
let rollChance = 0.05;
for (let index = 0; index < 10; index++) {
    const e = document.createElement("p");
    e.innerHTML = `{name: "", percent: ${rollChance}, color: "white", bg: "black"},`;
    document.querySelector("body").appendChild(e);
    rollChance /= 2;
}*/
const body = document.querySelector("body");
// cw = completely works
let items = getItem("rolling-items") || []; // cw
let timer = getItem("rolling-time"); // cw
let money = getItem("rolling-money") || 0; // cw
let timesRolled = getItem("rolling-rolled") || 0;
let timeInterval = getItem("rolling-interval") || 300000; // cw
let catalogue = getItem("rolling-catalogue") || []; // cw
let itemUsed = getItem("rolling-used");
let maxItemCount = getItem("rolling-max-count") || 10; // unused
let difference = Date.now() - timer;
let clicked = false;
let done = false;
setItem("rolling-items", items);
while (catalogue.length < rolls.length) {
    catalogue.push(false);
} // should also work for updates if i add more items
setItem("rolling-catalogue", catalogue);
console.log(difference);
if (getItem(Date.now() - getItem("rolling-time") > timeInterval)) {
    console.log("a");
}
const style = document.createElement("style");
let addedStyleSheet = false;
function applyItem() {
    if (!addedStyleSheet) {
        document.head.appendChild(style);
        addedStyleSheet = true;
    }
    const roll = rolls[itemUsed];
    body.style.color = roll.color;
    if (roll.bg === "black") {
        body.style.background = "linear-gradient(to right, black, gray, black)";
    } else {
        body.style.background = roll.bg;
    }
    style.textContent = `h1, h3, p, summary { background: ${roll.outline} }`;
}
if (itemUsed !== null && items.includes(itemUsed)) {
    applyItem();
}
const moneyElement = document.getElementById("money");
const shop = document.getElementById("shop");
const timeLeft = document.createElement("p");
body.insertBefore(timeLeft, shop);
const timesRolledElement = document.getElementById("rolled");
const updateTimesRolled = () => timesRolledElement.innerHTML = `Total times rolled: ${timesRolled}`;
updateTimesRolled();
function updateYourItems() {
    moneyElement.innerHTML = money;
    const details = document.getElementById("items");
    const summary = document.getElementById("items-summary");
    while (details.childElementCount > 1) {
        details.removeChild(details.children[1]);
    }
    items.forEach(item => {
        const div = document.createElement("div");
        div.className = "item";
        const self = rolls[item]; // i didn't know what else to name this :cry:
        const roll = document.createElement("p");
        roll.innerHTML = self.name;
        roll.style.color = self.color;
        roll.style.background = self.bg;
        const apply = document.createElement("button");
        apply.innerHTML = "Apply this style";
        apply.onclick = () => {
            itemUsed = item;
            setItem("rolling-used", itemUsed);
            applyItem();
        }
        const sell = document.createElement("button");
        sell.innerHTML = `Sell ($${self.sell})`;
        sell.onclick = () => {
            let removed = false;
            money += self.sell;
            items = items.filter(thisItem => {
                if (!removed && item === thisItem) {
                    removed = true;
                    return false;
                } else {
                    return true;
                }
            });
            setItem("rolling-money", money);
            setItem("rolling-items", items);
            updateYourItems();
        }
        div.appendChild(roll);
        div.appendChild(apply);
        div.appendChild(sell);
        details.appendChild(div);
    });
    summary.innerHTML = `Your Items (${items.length}/${maxItemCount})`;
}
function updateYourCatalogue() {
    const details = document.getElementById("catalogue");
    const summary = document.getElementById("catalogue-summary");
    while (details.childElementCount > 1) {
        details.removeChild(details.children[1]);
    }
    catalogue.forEach((_item, index) => {
        const roll = document.createElement("p");
        if (catalogue[index]) {
            roll.innerHTML = rolls[index].name;
            roll.style.color = rolls[index].color;
            roll.style.background = rolls[index].bg;
        } else {
            roll.innerHTML = "???";
            roll.style.color = "white";
            roll.style.background = "black";
        }
        details.appendChild(roll);
    });
    summary.innerHTML = `Your Catalogue (${catalogue.filter(item => item).length}/${catalogue.length})`;
    setItem("rolling-catalogue", catalogue);
}
function updateShop() {
    try {
        function putShopItem(index) {
            const item = shopItems[index];
            shop.querySelector("h3").innerHTML = `Shorten time between rolls to ${item.interval / 1000} seconds`;
            shop.querySelector("p").innerHTML = `Cost: $${item.cost}`;
            shop.querySelector("button").onclick = () => {
                if (money >= item.cost) {
                    money -= item.cost;
                    timeInterval = item.interval;
                    setItem("rolling-money", money);
                    setItem("rolling-interval", timeInterval);
                    updateYourItems();
                    updateShop();
                }
            }
        }
        if (timeInterval === 300000) {
            putShopItem(0);
        } else {
            shopItems.forEach((item, index) => {
                if (item.interval === timeInterval) {
                    putShopItem(index + 1);
                }
            });
        }
    } catch (TypeError) {
        body.removeChild(shop);
    }
}
//let gotGoodThing = false;
function roll() {
    //let difference = Date.now() - timer;
    if (!clicked && difference >= timeInterval) {
        clicked = true;
        const random = Math.random();
        let chance = 0;
        let index = 0;
        for (const roll of rolls) {
            chance += roll.percent;
            if (random < chance) {
                /*if (roll.name == "Heavenly") {
                    gotGoodThing = true;
                    alert("HEBEAMFM;FAS");
                }*/
                const rollGotten = document.getElementById("roll-gotten");
                rollGotten.innerHTML = roll.name;
                rollGotten.style.color = roll.color;
                rollGotten.style.background = roll.bg;
                rollGotten.classList.add("change-size");
                const rollPercent = document.getElementById("roll-percent");
                rollPercent.innerHTML = `${roll.percent * 100}% chance`;
                timesRolled++;
                updateTimesRolled();
                setItem("rolling-rolled", timesRolled);
                setItem("rolling-item", items);
                setItem("rolling-time", Date.now());
                catalogue[rolls.indexOf(roll)] = true;
                const saveDiv = document.createElement("div");
                saveDiv.id = "save";
                const saveQuestion = document.createElement("h3");
                saveQuestion.innerHTML = "Save this item?";
                const removeDiv = () => {
                    body.removeChild(saveDiv); 
                    done = true;
                }
                const saveButton = document.createElement("button");
                saveButton.innerHTML = "Save";
                saveButton.onclick = () => {
                    if (items.length < maxItemCount) {
                        items.push(index);
                        console.log(items);
                        setItem("rolling-items", items);
                        removeDiv();
                        updateYourItems();
                    } else {
                        alert("You are at the limit for items. Sell some before you can save more!")
                    }
                }
                const sellButton = document.createElement("button");
                sellButton.innerHTML = `Sell ($${roll.sell})`;
                sellButton.onclick = () => {
                    money += roll.sell;
                    setItem("rolling-money", money);
                    updateYourItems();
                    removeDiv();
                }
                
                saveDiv.appendChild(saveQuestion);
                saveDiv.appendChild(saveButton);
                saveDiv.appendChild(sellButton);
                body.insertBefore(saveDiv, moneyElement.parentElement);
                updateYourCatalogue();
                return;
            }
            index++;
        }
    }
}
/*function autoroll() {
    if (!gotGoodThing) {
        roll();
        if (gotGoodThing) {
            setTimeout(() => gotGoodThing = false, 1000);
        }
    }
}
setInterval(() => {
    autoroll();
}, 0);*/
function submitCode() {
    if (document.getElementById("code").value === "SigmAboY564") {
        money += 10000;
        updateYourItems();
    }
    if (document.getElementById("code").value === "DONT DO IT") {
        money -= 10000;
        updateYourItems();
    }
}
setInterval(() => {
    timer = getItem("rolling-time");
    difference = Date.now() - timer;
        const minutesLeft = Math.floor((timeInterval - difference) / 60000);
        const secondsLeft = Math.floor(((timeInterval - difference) % 60000) / 1000);
        if (minutesLeft <= 0 && secondsLeft <= 0 && done && clicked) {
            location.reload();
        }
        if (minutesLeft >= 0 && secondsLeft >= 0) {
            timeLeft.innerHTML = `${minutesLeft}:${secondsLeft.toString().padStart(2, "0")} left until next roll`;
            const rollButton = document.getElementById("roll");
            rollButton.style.color = "gray";
        }
}, 1000);
updateYourItems();
updateYourCatalogue();
updateShop();