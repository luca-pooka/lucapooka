const cardValues = {
    "A": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    "J": 10,
    "Q": 10,
    "K": 10
}
class Card {
    constructor(card, suit) {
        this.card = card;
        this.suit = suit;
        this.value = cardValues[this.card];
    }
}
function shuffle(array) {
    let index = array.length;
    while (index > 0) {
        let randomIndex = Math.floor(Math.random() * index);
        index--;
        [array[index], array[randomIndex]] = [
            array[randomIndex], array[index]];
    }
}
function shuffleCards() {
    for (let suit of suits) {
        for (let card in cardValues) {
            allCards.push(new Card(card, suit));
        }
    }
    shuffle(allCards);
}

const suits = ["♥️", "♠️", "♦️", "♣️"];
const allCards = [];
const header = document.querySelector("header");
const moneyH2 = document.getElementById("money");
const betH2 = document.getElementById("bet-show");
const betDiv = document.getElementById("bet-div");
const allButton = document.getElementById("all");
const betInput = document.getElementById("bet-input")
const betButton = document.getElementById("bet");
const hitButton = document.getElementById("hit");
const standButton = document.getElementById("stand");
const doubleDownButton = document.getElementById("double-down");
const dealerDiv = document.getElementById("dealer-cards");
const dealerValueH4 = document.getElementById("dealer-value");
const playerDiv = document.getElementById("player-cards");
const playerValueH4 = document.getElementById("player-value");
let outcomeH4;
betButton.style.display = "none";
hitButton.style.display = "none";
standButton.style.display = "none";
doubleDownButton.style.display = "none";

let money = 1000;
let bet;
let playerCards = [];
let dealerCards = [];
shuffleCards();
betInput.focus();

// loads the previous high score
let highScore = localStorage.getItem("highScore");
let lowScore = localStorage.getItem("lowScore");
if (highScore !== null) {
    console.log(`loading high score of ${highScore}`);
} else {
    console.log("no high score found, resetting");
    highScore = 1000;
}
if (lowScore !== null) {
    console.log(`loading low score of ${lowScore}`);
} else {
    console.log("no low score found, resetting");
    lowScore = 1000;
}

function saveData(high, low) {
    localStorage.setItem("highScore", high);
    localStorage.setItem("lowScore", low);
    console.log(`saving high score of ${high}`);
    console.log(`saving low score of ${low}`);
    document.getElementById("high-score").innerHTML = `Your High Score: $${Number(high).toLocaleString()}`;
    document.getElementById("low-score").innerHTML = `Your Low Score: $${Number(low).toLocaleString()}`;
    highScore = high;
    lowScore = low;
}
saveData(highScore, lowScore);

function getCard(div, cardArray) {
    if (allCards.length == 0) {
        shuffleCards();
    }
    const cardDiv = div.appendChild(Object.assign(document.createElement("div")));
    const card = allCards.pop();
    cardDiv.appendChild(Object.assign(document.createElement("p"), {innerHTML: `${card.suit}  ${card.card}`}));
    cardArray.push(card);
}
function getTotal(cardArray, h4) {
    let containsHardAce = false;
    let total = 0;
    for (let index = 0; index < cardArray.length; index++) {
        const card = cardArray[index];
        if (card.card == "A" && total <= 10) {
            card.value = 11;
            containsHardAce = true;
        }
        total += Number(card.value);
        if (total > 21 && containsHardAce) {
            for (let index = 0; index < cardArray.length; index++) {
                const card = cardArray[index];
                if (card.card == "A" && card.value == 11) {
                    card.value = 1;
                    total -= 10;
                }
            }
        }
    }
    h4.innerHTML = `Total: ${total}`;
    return total;
}
function start() {
    betH2.innerHTML = `Bet: $${bet.toLocaleString()}`;
    betDiv.style.display = "none";
    setTimeout(() => { // card to player
        getCard(playerDiv, playerCards);
        getTotal(playerCards, playerValueH4);
        setTimeout(() => { // card to dealer
            getCard(dealerDiv, dealerCards);
            getTotal(dealerCards, dealerValueH4);
            setTimeout(() => { // card to player
                getCard(playerDiv, playerCards);
                getTotal(playerCards, playerValueH4);
                setTimeout(() => { // show the buttons
                    hitButton.style.display = "";
                    standButton.style.display = "";
                    doubleDownButton.style.display = "";
                }, 750);
            }, 750);
        }, 750);
    }, 750);
}
function checkBet() {
    bet = Number(betInput.value);
    if (bet <= 0 || (bet > 1000 && Math.abs(money) < bet)) {
        betInput.focus();
        return;
    }
    start();
}
function betAll() {
    if (money == 0) {
        bet = 1000;
    } else {
        bet = Math.abs(money);
    }
    start();
}
function hit() {
    getCard(playerDiv, playerCards);
    if (getTotal(playerCards, playerValueH4) > 21) {
        const bustOutcome = header.appendChild(Object.assign(document.createElement("h3"), {innerHTML: "You busted!"}));
        setTimeout(() => {
            header.removeChild(bustOutcome);
        }, 2000);
        stand();
        return false;
    } else {
        return true;
    }
}
function endRound() {
    let outcomeTiming = 1000;
    if (getTotal(dealerCards, dealerValueH4) > 21) {
        outcomeTiming += 2000;
        setTimeout(() => {
            const bustOutcome = header.appendChild(Object.assign(document.createElement("h3"), { innerHTML: "The dealer busted!" }));
            setTimeout(() => {
                header.removeChild(bustOutcome);
            }, 2000);
        }, 1000);
    }
    // check who wins
    setTimeout(() => {
        const playerTotal = getTotal(playerCards, playerValueH4);
        const dealerTotal = getTotal(dealerCards, dealerValueH4);
        if (playerTotal > 21 && dealerTotal > 21 || playerTotal == dealerTotal) {
            outcomeH4 = header.appendChild(Object.assign(document.createElement("h4"), { innerHTML: "Push, you don't lose or gain anything." }));
        } else if (playerTotal > 21) {
            outcomeH4 = header.appendChild(Object.assign(document.createElement("h4"), { innerHTML: "You lost..." }));
            money -= bet;
        } else if (dealerTotal > 21 || playerTotal > dealerTotal) {
            outcomeH4 = header.appendChild(Object.assign(document.createElement("h4"), { innerHTML: "You won!" }));
            money += bet;
        } else if (dealerTotal > playerTotal) {
            outcomeH4 = header.appendChild(Object.assign(document.createElement("h4"), { innerHTML: "You lost..." }));
            money -= bet;
        }
        if (money > highScore) {
            saveData(money, lowScore);
        }
        if (money < lowScore) {
            saveData(highScore, money);
        }
        moneyH2.innerHTML = `Money: $${money.toLocaleString()} |`;
        betH2.innerHTML = "Bet: $0";
    }, outcomeTiming); // if there was a bust, it's longer because theres text on screen saying that
    setTimeout(() => {
        header.removeChild(outcomeH4);
        // resets stuff
        playerCards = [];
        dealerCards = [];
        betDiv.style.display = "";
        betInput.value = "";
        betInput.focus();
        // removing all cards
        playerValueH4.innerHTML = "Total: 0";
        while (playerDiv.childElementCount > 2) {
            playerDiv.removeChild(playerDiv.children[2]);
        }
        dealerValueH4.innerHTML = "Total: 0";
        while (dealerDiv.childElementCount > 2) {
            dealerDiv.removeChild(dealerDiv.children[2]);
        }
    }, outcomeTiming + 2000);
}
function dealerTurn() {
    if (getTotal(dealerCards, dealerValueH4) < 17) {
        setTimeout(() => {
            getCard(dealerDiv, dealerCards);
            dealerTurn(); // Recursively call the function to draw the next card
        }, 1000);    
    } else {
        endRound();
    }
}
function stand() {
    hitButton.style.display = "none";
    standButton.style.display = "none";
    doubleDownButton.style.display = "none";
    dealerTurn();
}
function doubleDown() {
    bet *= 2;
    betH2.innerHTML = `Bet: $${bet.toLocaleString()}`;
    // if you went over, it'll be false, but if you didn't, it'll be true and it'll stand anyway
    if (hit()) {
        stand();
    }
}
betInput.oninput = () => {
    if (betInput.value.length > 0) {
        betButton.style.display = "";
    } else {
        betButton.style.display = "none";
    }
}
addEventListener("keydown", event => {
    if (event.key == "Enter" && !betButton.style.display) {
        checkBet();
    }
})