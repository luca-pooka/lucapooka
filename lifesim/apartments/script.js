import { saveStat, loadStat, getProblem } from "../stats.js";
const currentTime = new Date().getTime();
const lastUpdate = loadStat("last-update");
if (lastUpdate) { // if already played before
    const timeDifference = currentTime - parseInt(lastUpdate);
    console.log(timeDifference);
    const problemNumberToGet = Math.floor(timeDifference / 60000); // one problem for every minute (kind of fast but whatever)
    for (let index = 0; index < ((problemNumberToGet > 20) ? 20 : problemNumberToGet); index++) {
        console.log("problem");
        getProblem();
    }
} else {
    console.log("first time?");
}
saveStat("last-update", currentTime);
let people = loadStat("people");
const apartments = document.getElementById("apartments");

try {
    console.log(people.length); // if there are not people, it'll throw an error
} catch (TypeError) {
    const text = document.createElement("h2");
    text.innerHTML = "Make some people before you go to the apartment building!";
    const button = document.createElement("button");
    button.innerHTML = "Go to Person Creator";
    button.onclick = () => window.location.href = "../creator";
    apartments.appendChild(text);
    document.getElementById("creator-button-holder").appendChild(button);
    apartments.style.backgroundColor = "transparent";
}
const apartmentAmount = people.length > 50 ? Math.ceil(people.length / 10) * 10 : 50; // if amount of people is more than 50 make the amount of apartments the amount of people rounded up to the nearest 10
for (let index = 0; index < apartmentAmount; index++) {
    const apartment = document.createElement("div");
    apartment.className = "apartment";
    if (people.length > index) { // if there's a person living here
        const person = people[index];
        apartment.classList.add("person");
        if (person.problem) {
            try {
                apartment.classList.add(person.problem);
            } catch (InvalidCharacterError) {
                if (person.problem.slice(0, 6) === "friend") {
                    apartment.classList.add("friend");
                } else {
                    apartment.classList.add("love");
                }
            }
        }
        apartment.onpointerover = () => {
            document.getElementById("apartment-owner").innerHTML = `${person.first} ${person.last}`;
            document.getElementById("apartment-details").style.visibility = "visible";
        }
        apartment.onpointerleave = () => document.getElementById("apartment-details").style.visibility = "hidden";
        apartment.onclick = () => window.location.href = `apartment/?person=${person.index}`;
        const apartmentOwner = document.createElement("p");
        apartmentOwner.innerHTML = person.nickname;
        apartment.appendChild(apartmentOwner);
    }
    apartments.appendChild(apartment);
}

document.getElementById("delete").onclick = () => {
    const deleteDiv = document.getElementById("people-to-delete");
    if (deleteDiv.childElementCount === 0) {
        const lineBreak = document.createElement("br");
        deleteDiv.appendChild(lineBreak);
        people.forEach(person => {
            const button = document.createElement("button");
            button.innerHTML = person.nickname;
            button.onclick = () => {
                people = people.filter(foundPerson => foundPerson !== person);
                people.forEach(newPerson => newPerson.friends = newPerson.friends.filter(friend => friend.index !== person.index));
                saveStat("people", people);
                location.reload();
            }
            deleteDiv.appendChild(button);
        });
    } else {
        while (deleteDiv.childElementCount > 0) {
            deleteDiv.removeChild(deleteDiv.children[0]);
        }
    }
}