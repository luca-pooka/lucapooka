class Animal {
    constructor(animal, name, income, upgradeCost, animalDiv, incomeH4, upgradeButton) {
        this.animal = animal;
        this.name = name;
        this.income = income || 1;
        this.upgradeCost = upgradeCost;
        this.animalDiv = animalDiv;
        this.incomeH4 = incomeH4;
        this.upgradeButton = upgradeButton;
    }
}

const statsHolder = document.getElementById("stats-holder");
const animalHolder = document.getElementById("animal-holder");
const otherHolder = document.getElementById("other-holder");
const tutorialButton = document.querySelector("button");
const shopDiv = document.getElementById("shop");

const animals = ["Chicken", "Duck", "Pig", "Cow", "Monkey", "Giraffe", "Gorilla", "Elephant", "Dragon", "Unicorn"];
const shopItems = [
    {name: "Chicken", cost: 100, income: 1},
    {name: "Duck", cost: 175, income: 2},
    {name: "Pig", cost: 425, income: 5},
    {name: "Cow", cost: 800, income: 10},
    {name: "Monkey", cost: 1875, income: 25},
    {name: "Giraffe", cost: 3500, income: 50},
    {name: "Gorilla", cost: 6875, income: 100},
    {name: "Elephant", cost: 10000, income: 150},
    {name: "Dragon", cost: 30000, income: 500},
    {name: "Unicorn", cost: 100000, income: 1750},
    {name: "2x Multipler (30 Seconds)", cost: 80000, info: "Doubles all income for 30 seconds.", callback: () => {
        incomeMultiplier *= 2;
        updateMultipler();
        startTimer(30);
    }},
    {name: "2x Multipler (1 Minute)", cost: 150000, info: "Doubles all income for a minute.", callback: () => {
        incomeMultiplier *= 2;
        updateMultipler();
        startTimer(60);
    }},
    {name: "2x Multipler (Permanent)", cost: 10000000, info: "Doubles all income PERMANENTLY.", callback: () => {
        incomeMultiplier *= 2;
        updateMultipler();
    }}
]
/* amount item is worth divided by how much they make
shopItems.forEach(item => {
    console.log(item.name, item.cost / item.income);
}); */
let yourAnimals = [];
let money = 0;
let moneyPerSecond = 0;
let gotToInfinity = false;
const updateMoney = () => document.getElementById("money").innerHTML = `Current Money: $${money.toLocaleString()}`;
const updateMoneyPerSecond = () => document.getElementById("money-per-sec").innerHTML = `Money Made per Second: $${moneyPerSecond.toLocaleString()}`;
const updateMultipler = () => document.getElementById("multipler").innerHTML = `Current Multipler: ${incomeMultiplier.toLocaleString()}x`;
const addToOtherHolder = (elementType, textToAdd) => otherHolder.appendChild(Object.assign(document.createElement(elementType), {innerHTML: textToAdd}));
const removeFromOtherHolder = child => otherHolder.removeChild(child);
const tutorialMessages = ["Hello, and welcome to zoo simulator!", "In this game, you have animals for your zoo.", "These animals will make you money, a little bit every second.", "With your money, you can purchase upgrades for your animals, as well as more animals and other bonuses from the shop.", "Here, I'll give you a chicken and $75 to start with."];
let tutorialIndex = 0;
let incomeMultiplier = 1;
// creates the shop's items
shopItems.forEach(item => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "for-sale";
    const itemName = document.createElement("h3");
    itemName.innerHTML = item.name;
    itemDiv.appendChild(itemName);
    const itemCost = document.createElement("h4");
    itemCost.innerHTML = `Cost: $${item.cost.toLocaleString()}`;
    itemDiv.appendChild(itemCost);
    if (item.income) {
        const itemIncome = document.createElement("h4");
        itemIncome.innerHTML = `Income: $${item.income}`;
        itemDiv.appendChild(itemIncome);
    } else {
        const itemInfo = document.createElement("h4");
        itemInfo.innerHTML = item.info;
        itemDiv.appendChild(itemInfo);
    }
    const purchaseButton = document.createElement("button");
    purchaseButton.innerHTML = "Purchase";
    purchaseButton.onclick = () => purchaseItem(item);

    itemDiv.appendChild(purchaseButton);
    shopDiv.appendChild(itemDiv);
})
// get saved data
const savedMoney = JSON.parse(localStorage.getItem("zoo-money"));
const savedYourAnimals = JSON.parse(localStorage.getItem("your-animals"));
console.log(savedMoney);
console.log(savedYourAnimals);
if (savedMoney) {
    if (confirm("Save data found. Use this?")) {
        money = savedMoney;
        yourAnimals = savedYourAnimals;
        otherHolder.removeChild(document.getElementById("tutorial-text"));
        document.querySelector("body").removeChild(document.querySelector("button"));
        savedYourAnimals.forEach(animal => {
            const animalDiv = animalHolder.appendChild(Object.assign(document.createElement("div")));
            const incomeH4 = document.createElement("h4");
            const upgradeButton = document.createElement("button");
            const newAnimal = new Animal(animal.animal, animal.name, animal.income, animal.upgradeCost, animalDiv, incomeH4, upgradeButton);
            showAnimal(newAnimal);
        });
    }
}
function getAnimal(animalIndex, income) {
    const nameInput = addToOtherHolder("input");
    nameInput.placeholder = "Name";
    nameInput.id = "marginRight";
    const theAnimal = addToOtherHolder("h4", `the ${animals[animalIndex]}`);
    theAnimal.id = "inlineBlock";
    const lineBreak = addToOtherHolder("br");
    const nameButton = addToOtherHolder("button", "Name it This");
    nameButton.onclick = () => createAnimal(animalIndex, nameInput.value, income);
    nameButton.id = "nameConfirm";
    nameInput.focus();
}
function createAnimal(animalIndex, name, income) {
    let upgradeCost;
    for (let index = 0; index < shopItems.length; index++) {
        upgradeCost = (shopItems.find((item) => item.name === animals[animalIndex]).cost) * 2;
    }
    const animalDiv = animalHolder.appendChild(Object.assign(document.createElement("div")));
    const incomeH4 = document.createElement("h4");
    const upgradeButton = document.createElement("button");
    const newAnimal = new Animal(animals[animalIndex], name, income, upgradeCost, animalDiv, incomeH4, upgradeButton);
    yourAnimals.push(newAnimal);
    
    showAnimal(newAnimal);
    // removes the naming related stuff since you finished that
    document.querySelector("input").remove();
    document.getElementById("inlineBlock").remove();
    document.querySelector("br").remove();
    document.getElementById("nameConfirm").remove();
}
function showAnimal(newAnimal) {
    newAnimal.animalDiv.className = `animal-div ${newAnimal.animal.toLowerCase()}`;
    // adds elements to the shown animal div
    const newAnimalTitle = newAnimal.animalDiv.appendChild(Object.assign(document.createElement("h4")));
    if (newAnimal.name) {
        newAnimalTitle.innerHTML = `${newAnimal.name} the ${newAnimal.animal}`;
    } else {
        newAnimalTitle.innerHTML = newAnimal.animal;
    }
    newAnimal.animalDiv.appendChild(Object.assign(newAnimal.incomeH4, { innerHTML: `Income: $${newAnimal.income.toLocaleString()} / sec` }));
    newAnimal.animalDiv.appendChild(Object.assign(newAnimal.upgradeButton, { innerHTML: `Upgrade (Cost $${newAnimal.upgradeCost.toLocaleString()})` }));
    newAnimal.upgradeButton.onclick = () => upgradeAnimal(newAnimal);
    newAnimal.upgradeButton.id = "marginRight";
    const sellButton = newAnimal.animalDiv.appendChild(Object.assign(document.createElement("button"), { innerHTML: "Sell" }));
    sellButton.onclick = () => sellAnimal(newAnimal);
}

function nextClicked() {
    tutorialIndex++;
    addToOtherHolder("h3", tutorialMessages[tutorialIndex]);
    if (tutorialIndex === 4) {
        tutorialButton.innerHTML = "Claim Chicken and $75!";
    }
    if (tutorialIndex === 5) {
        while (otherHolder.firstChild) { // removes all things in the otherHolder div
            removeFromOtherHolder(otherHolder.firstChild);
        }
        tutorialButton.remove();
        money = 75;
        getAnimal(0);
    }
}
function purchaseItem(item) {
    if (money >= item.cost) { // if have enough money
        money -= item.cost; // pay money
        if (item.income) { // if animal
            getAnimal(animals.indexOf(item.name), item.income); // create purchased animal
        } else if (item.callback) {
            item.callback();
        }
    }
    updateMoney();
    // play sound
}
function startTimer(duration) {
    const multiplerTimeLeftH5 = statsHolder.appendChild(Object.assign(document.createElement("h4"), {innerHTML: "Time left: "}));
    let timer = duration, minutes, seconds;
    const countdown = setInterval(() => {
        minutes = Math.floor(timer / 60);
        seconds = timer % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        multiplerTimeLeftH5.innerHTML = `Time left: ${minutes}:${seconds}`;
        if (--timer < 0) {
        clearInterval(countdown);
        incomeMultiplier /= 2;
        updateMultipler();
        multiplerTimeLeftH5.remove();
        }
    }, 1000);
}
function upgradeAnimal(animal) {
    if (money >= animal.upgradeCost) { // if have enough money
        money -= animal.upgradeCost; // pay money
        animal.income *= 2; // doubles the income
        animal.incomeH4.innerHTML = `Income: $${animal.income.toLocaleString()} / sec`;
        animal.upgradeCost *= Math.random() + 1.5;
        animal.upgradeCost = Math.round(animal.upgradeCost / 10);
        animal.upgradeCost *= 10;
        animal.upgradeButton.innerHTML = `Upgrade (Cost $${animal.upgradeCost})`;
        updateMoney();
        // play sound
    }
}
function sellAnimal(animal) {
    sellPrice = animal.income * 75;
    money += sellPrice;
    animalHolder.removeChild(animal.animalDiv);
    const index = yourAnimals.indexOf(animal);
    yourAnimals.splice(index, 1);
    const countdownText = document.createElement("h3");
    countdownText.innerHTML = `Sold ${animal.name} the ${animal.animal} for $${sellPrice}.`;
    otherHolder.appendChild(countdownText);
    setInterval(() => {
        removeFromOtherHolder(countdownText);
    }, 3000);
}
setInterval(() => {
    yourAnimals.forEach(animal => {
        money += animal.income * incomeMultiplier;
    });
    moneyPerSecond = yourAnimals.reduce((prev, curr) => prev + curr.income, 0) * incomeMultiplier;
    updateMoney();
    updateMoneyPerSecond();
    localStorage.setItem("zoo-money", JSON.stringify(money));
    localStorage.setItem("your-animals", JSON.stringify(yourAnimals));
    if (money === Infinity && !gotToInfinity) {
        gotToInfinity = true;
        alert("Wow. You got to infinite money. Good job!");
        alert("I guess you can keep playing, but there's not much you can really do.");
    }
}, 1000);