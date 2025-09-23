import { saveStat, loadStat } from "../../stats.js";
import { food as foodOptions } from "../../food/food.js";
import { interiors as interiorOptions } from "../../interior/interiors.js";
const people = loadStat("people");
const personShown = document.getElementById("person");
const textbox = document.getElementById("textbox");
const moneySpan = document.getElementById("money");
const extraDiv = document.getElementById("extra");
const urlInfo = new URLSearchParams(window.location.search);
const personIndex = parseInt(urlInfo.get("person"));
const body = document.querySelector("body");
const setRandomSpeech = array => textbox.innerHTML = `"${array[Math.floor(Math.random() * array.length)]}"`;
const getPersonFromIndex = personIndex => people.find(person => person.index == personIndex);
const person = getPersonFromIndex(personIndex);
let todayIsBirthday = false;
document.getElementById("name").innerHTML = person.nickname;
document.querySelector("title").innerHTML = `${person.nickname}'s Apartment - LucaPooka`;
let money = loadStat("money");
moneySpan.innerHTML = money.toLocaleString();
function updateLevel() {
    document.getElementById("level").innerHTML = Math.floor(person.level);
    document.getElementById("level-progress").value = person.level - Math.floor(person.level);
}
updateLevel();
try {
    body.style.background = interiorOptions[person.interior].color;
    body.style.color = interiorOptions[person.interior].textColor;
} catch (TypeError) {
    console.log("no interior; default used");
}
const dialogue = {
    greetings: ["What's up?", "How are you doing?", "Hm.", "I woke up too early today...", "Hi, how are you?", "Hi, how are you doing today?", "Sup."],
    hungerGreetings: ["I'm hungry! Can you feed me?", "I'm starving, feed me!", "Feed me please, I'm starving!"],
    fedResponses: ["Mmm, tasty!", "Thank you for the food!", "Wow, that was good!", "Mm, that tasted alright...", "Hey, that was good!"],
    interiorGreetings: ["I'd like a new interior.", "I want a new interior, please!", "Can I have a new interior?"],
    interiorGivenResponses: ["Woah, this is awesome!", "Ooh, thank you!", "Wow, this is a cool new interior!", "Woah, this is really different.", "It's very... different."],
    noFriendResponses: ["Ah, okay.", "If you say so...", "I wasn't feeling it anyway.", "I was worried anyway...", "Really? Man..."],
    yesFriendRespones: ["Let's see how this goes.", "Alright, I'll go talk to them.", "Okay, I'll invite them over and we'll see how we get along."],
    birthdayGreetings: ["Today's my birthday!", "Happy birthday to me today!"],
    fedBirthdayCakeResponses: ["Thank you so much for this cake on my birthday!", "Wow, you're giving me a birthday cake? Thanks!"],
    yesLoveResponses: ["Okay. I'm going to ask them out now.", "I'll invite them over and we'll see what happens now.", "I'm worried but I'll try."],
    sadGreetings: ["Ugh...", "I don't wanna talk to you right now...", "Get out...", "Stop bothering me..."],
    removedSadResponses: ["Alright, I'm over it now.", "Okay, I'm good now.", "Yeah, I think I'm alright now"],
}
function changeMoney(change) {
    money += change;
    textbox.innerHTML = `${textbox.innerHTML}<br>${person.nickname} gave you $${change}!`;
    moneySpan.innerHTML = money.toLocaleString();
    saveStat("money", money);
}

if (person.problem) {
    if (person.problem === "hungry") {
        personShown.innerHTML = "🤤";
        setRandomSpeech(dialogue.hungerGreetings);
    } else if (person.problem === "interior") {
        personShown.innerHTML = "😮";
        setRandomSpeech(dialogue.interiorGreetings);
    } else if (person.problem.slice(0, 6) === "friend") { // because it is "friend PERSONINDEX", like "friend 16"              
        const wantedFriendIndex = person.problem.slice(7);
        const wantedFriend = getPersonFromIndex(wantedFriendIndex);
        console.log(wantedFriend);
        personShown.innerHTML = "🤔";
        setRandomSpeech([`I want to be friends with ${wantedFriend.nickname}.`]);
        const yes = document.createElement("button");
        yes.innerHTML = "Go for it!";
        yes.onclick = () => {
            setRandomSpeech(dialogue.yesFriendRespones);
            extraDiv.removeChild(yes);
            extraDiv.removeChild(no);
            setTimeout(() => {
                textbox.innerHTML = "";
                personShown.innerHTML = "🙋 🙋";
                setTimeout(() => {
                    personShown.innerHTML = "🗣 👤";
                    setTimeout(() => {
                        console.log(1 - Math.abs(person.random - wantedFriend.random));
                        if (Math.random() < (1 - Math.abs(person.random - wantedFriend.random)) * 1.3) { // compat chance times 1.3
                            const currentDate = new Date();
                            personShown.innerHTML = "👥";
                            textbox.innerHTML = `${person.nickname} and ${wantedFriend.nickname} became friends!`;
                            person.friends.push({index: wantedFriend.index, date: `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`});
                            wantedFriend.friends.push({index: person.index, date: `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`});
                            console.log(wantedFriend);
                            person.problem = null;
                            console.log(person.friends);
                            saveStat("people", people);
                            setTimeout(() => {
                                personShown.innerHTML = "😄";
                                textbox.innerHTML = "";
                            }, 3000);
                        } else {
                            personShown.innerHTML = `${Math.random() < 0.5 ? "😶" : "😑"} ${Math.random() < 0.5 ? "😶" : "😑"}`;   
                            textbox.innerHTML = `It didn't work out between ${person.nickname} and ${wantedFriend.nickname}.`;
                            person.problem = null;
                            saveStat("people", people);
                            setTimeout(() => {
                                personShown.innerHTML = "😐";
                                textbox.innerHTML = "";
                            }, 3000);
                        }
                    }, 3000);
                }, 2000);
            }, 3000);
        };
        const no = document.createElement("button");
        no.innerHTML = "No, don't.";
        no.onclick = () => {
            setRandomSpeech(dialogue.noFriendResponses);
            person.problem = null;
            personShown.innerHTML = "😐";
            extraDiv.removeChild(yes);
            extraDiv.removeChild(no);
            saveStat("people", people);
        };
        extraDiv.appendChild(yes);
        extraDiv.appendChild(no);
    } else if (person.problem.slice(0, 4) === "love") {
        const wantedFriendIndex = person.problem.slice(5);
        const wantedFriend = getPersonFromIndex(wantedFriendIndex);
        console.log(wantedFriend);
        personShown.innerHTML = "😍";
        setRandomSpeech([`I want to ask out ${wantedFriend.nickname}...`]);
        // a lot of this was copied and pasted from the 'friend' problem but whatever i'm not making a function for it
        const yes = document.createElement("button");
        yes.innerHTML = "Go for it!";
        yes.onclick = () => {
            setRandomSpeech(dialogue.yesLoveResponses);
            extraDiv.removeChild(yes);
            extraDiv.removeChild(no);
            setTimeout(() => {
                textbox.innerHTML = "";
                personShown.innerHTML = "🙋 🙋";
                setTimeout(() => {
                    personShown.innerHTML = "😚 😳";
                    setTimeout(() => {
                        let chancePercent = 1 - Math.abs(person.random - wantedFriend.random);
                        console.log(1 - Math.abs(person.random - wantedFriend.random));
                        if (wantedFriend.lover) {
                            chancePercent = 0.3; // lesser chance if already dating someone else
                        }
                        if (Math.random() < chancePercent) {
                            personShown.innerHTML = `${Math.random() < 0.5 ? "😊" : "☺️"} ${Math.random() < 0.5 ? "😊" : "☺️"}`;
                            textbox.innerHTML = `${person.nickname} and ${wantedFriend.nickname} are in love!`;
                            person.lover = wantedFriend.index;
                            wantedFriend.lover = person.index;
                            person.problem = null;
                            saveStat("people", people);
                            setTimeout(() => {
                                personShown.innerHTML = "😄";
                                textbox.innerHTML = "";
                            }, 3000);
                        } else {
                            personShown.innerHTML = `${Math.random() < 0.5 ? "😞" : "😕"} ${Math.random() < 0.5 ? "😶" : "😑"}`;   
                            textbox.innerHTML = `It didn't work out between ${person.nickname} and ${wantedFriend.nickname}.<br>${wantedFriend.nickname}: "I already am in love with ${getPersonFromIndex(wantedFriend.lover).nickname} you know..."`;
                            person.problem = "sad";
                            saveStat("people", people);
                            setTimeout(() => {
                                personShown.innerHTML = "😞";
                                textbox.innerHTML = "";
                            }, 3000);
                        }
                    }, 3000);
                }, 2000);
            }, 3000);
        };
        const no = document.createElement("button");
        no.innerHTML = "No, don't.";
        no.onclick = () => {
            setRandomSpeech(dialogue.noFriendResponses); // use this for both love and friend
            person.problem = null;
            personShown.innerHTML = "😐";
            extraDiv.removeChild(yes);
            extraDiv.removeChild(no);
            saveStat("people", people);
        };
        extraDiv.appendChild(yes);
        extraDiv.appendChild(no);
    } else if (person.problem === "sad") {
        personShown.innerHTML = "😞";
        setRandomSpeech(dialogue.sadGreetings);
    }
} else {
    const currentDate = new Date();
    if (currentDate.getMonth() + 1 == person.birthday.slice(5, 7) && currentDate.getDate() == person.birthday.slice(8)) { // if today is their birthday
        setRandomSpeech(dialogue.birthdayGreetings);
        personShown.innerHTML = "🥳";
        todayIsBirthday = true;
    } else {
        setRandomSpeech(dialogue.greetings);
    }
}
document.getElementById("food").onclick = () => {
    const table = document.getElementById("food-table");
    if (!table.children.length) {
        console.log(foodOptions);
        const tr = document.createElement("tr");
        const food = document.createElement("th");
        food.innerHTML = "Food";
        const description = document.createElement("th");
        description.innerHTML = "Description<br><br>";
        const give = document.createElement("th");
        give.innerHTML = "Give";
        const button = document.createElement("button");
        button.innerHTML = "Go to Food Store";
        button.onclick = () => location.href = `../../food/?person=${personIndex}`;
        description.appendChild(button);
        table.appendChild(tr);
        tr.appendChild(food);
        tr.appendChild(description);
        tr.appendChild(give);
        const myFood = loadStat("food");
        myFood.forEach((thisFoodIndex, index) => {
            const thisFood = foodOptions[thisFoodIndex];
            const tr = document.createElement("tr");
            const name = document.createElement("td");
            name.innerHTML = thisFood.name;
            const description = document.createElement("td");
            description.innerHTML = thisFood.description;
            const give = document.createElement("td");
            const giveButton = document.createElement("button");
            giveButton.innerHTML = "Give";
            giveButton.onclick = () => {
                let moneyDivisor = 2;
                myFood.splice(index, 1); // remove the item from array
                table.removeChild(tr);
                saveStat("food", myFood);
                if (person.problem === "hungry") {
                    person.problem = null;
                    moneyDivisor = 1.6;
                }
                personShown.innerHTML = "😋";
                while (table.children.length) {
                    table.removeChild(table.children[0]);
                }
                if (todayIsBirthday && thisFood.name === "🎂") {
                    setRandomSpeech(dialogue.fedBirthdayCakeResponses);
                    if ((Math.floor((new Date() - new Date(person.date)) / (1000 * 60 * 60 * 24))) >= 4) { // if been four days since
                        moneyDivisor = 1;
                    }
                    console.log(Math.floor(currentDate - new Date(person.date)) / (1000 * 60 * 60 * 24))
                } else {
                    setRandomSpeech(dialogue.fedResponses);
                }
                const moneyGiven = Math.floor(Math.random() * thisFood.cost + thisFood.cost / moneyDivisor);
                changeMoney(moneyGiven); // gives random amount of money based on the cost of the food
                if (person.problem === "sad") {
                    person.problem = null;
                    setRandomSpeech(dialogue.removedSadResponses);
                } else {
                    person.level += moneyGiven / 30;
                    updateLevel();
                }
                saveStat("people", people);
            }
            table.appendChild(tr);
            tr.appendChild(name);
            tr.appendChild(description);
            tr.appendChild(give);
            give.appendChild(giveButton);
        });
    } else {
        while (table.children.length) {
            table.removeChild(table.children[0]);
        }
    }
}
document.getElementById("interior").onclick = () => {
    const table = document.getElementById("interior-table");
    if (!table.children.length) {
        console.log(interiorOptions);
        const tr = document.createElement("tr");
        const interior = document.createElement("th");
        interior.innerHTML = "Interior";
        const description = document.createElement("th");
        description.innerHTML = "Description<br><br>";
        const give = document.createElement("th");
        give.innerHTML = "Give";
        const button = document.createElement("button");
        button.innerHTML = "Go to Interior Store";
        button.onclick = () => location.href = `../../interior/?person=${personIndex}`;
        description.appendChild(button);
        table.appendChild(tr);
        tr.appendChild(interior);
        tr.appendChild(description);
        tr.appendChild(give);
        const myInteriors = loadStat("interiors");
        myInteriors.forEach((thisInteriorIndex, index) => {
            const thisInterior = interiorOptions[thisInteriorIndex];
            const tr = document.createElement("tr");
            const name = document.createElement("td");
            name.innerHTML = thisInterior.name;
            name.style.background = thisInterior.color;
            name.style.color = thisInterior.textColor;
            const description = document.createElement("td");
            description.innerHTML = thisInterior.description;
            const give = document.createElement("td");
            const giveButton = document.createElement("button");
            giveButton.innerHTML = "Give";
            giveButton.onclick = () => {
                let moneyDivisor = 2;
                person.interior = thisInteriorIndex;
                body.style.background = thisInterior.color;
                body.style.color = thisInterior.textColor;
                myInteriors.splice(index, 1); // remove the item from array
                table.removeChild(tr);
                saveStat("interiors", myInteriors);
                if (person.problem === "interior") {
                    console.log("interoior decetoed");
                    person.problem = null;
                    moneyDivisor = 1.6;
                }
                personShown.innerHTML = "😁";
                while (table.children.length) {
                    table.removeChild(table.children[0]);
                }
                setRandomSpeech(dialogue.interiorGivenResponses);
                const moneyGiven = Math.floor(Math.random() * thisInterior.cost + thisInterior.cost / moneyDivisor);
                changeMoney(moneyGiven); // gives random amount of money based on the cost of the interior
                if (person.problem === "sad") {
                    person.problem = null;
                    setRandomSpeech(dialogue.removedSadResponses);
                } else {
                    person.level += moneyGiven / 30;
                    updateLevel();
                }
                saveStat("people", people);
            }
            table.appendChild(tr);
            tr.appendChild(name);
            tr.appendChild(description);
            tr.appendChild(give);
            give.appendChild(giveButton);
        });
    } else {
        while (table.children.length) {
            table.removeChild(table.children[0]);
        }
    }
}//
document.getElementById("friends").onclick = () => {
    const table = document.getElementById("friend-table");
    if (!table.children.length) {
        const tr = document.createElement("tr");
        const friend = document.createElement("th");
        friend.innerHTML = "Friend";
        /* don't think i'll use level
        const level = document.createElement("th");
        level.innerHTML = "Level";*/
        table.appendChild(tr);
        tr.appendChild(friend);
        //tr.appendChild(level);
        person.friends.forEach(friend => {
            const person = getPersonFromIndex(friend.index);
            console.log(person);
            const tr = document.createElement("tr");
            const name = document.createElement("td");
            name.innerHTML = person.nickname;
            /*const level = document.createElement("td");
            level.innerHTML = "idk";*/
            table.appendChild(tr);
            tr.appendChild(name);
            //tr.appendChild(level);
        });
    } else {
        while (table.children.length) {
            table.removeChild(table.children[0]);
        }
    }
}
document.getElementById("this").onclick = () => {
    const infoDiv = document.getElementById("info");
    if (!infoDiv.children.length) {
        const first = document.createElement("p");
        first.innerHTML = `First Name: ${person.first}`
        const last = document.createElement("p");
        last.innerHTML = `Last Name: ${person.last}`;
        const nickname = document.createElement("p");
        nickname.innerHTML = `Nickname: ${person.nickname}`;
        const birthday = document.createElement("p");
        birthday.innerHTML = `Birthday: ${person.birthday}`;
        const gender = document.createElement("p");
        gender.innerHTML = `Gender: ${person.gender}`;
        const relation = document.createElement("p");
        const dateMade = document.createElement("p");
        dateMade.innerHTML = `Date Made: ${person.date}`;
        relation.innerHTML = `Relation to you: ${person.relation}`;
        const attractedTo = document.createElement("p");
        attractedTo.innerHTML = `Gender(s) attracted to: ${person.attractedTo}`;
        infoDiv.appendChild(first);
        infoDiv.appendChild(last);
        infoDiv.appendChild(nickname);
        infoDiv.appendChild(birthday);
        infoDiv.appendChild(gender);
        infoDiv.appendChild(dateMade);
        infoDiv.appendChild(relation);
        infoDiv.appendChild(attractedTo);
    } else {
        while (infoDiv.children.length) {
            infoDiv.removeChild(infoDiv.children[0]);
        }
    }
}