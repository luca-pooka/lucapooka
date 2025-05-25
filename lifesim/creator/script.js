import { saveStat, loadStat } from "../stats.js";
const feedback = document.getElementById("feedback");
const inputOptions = {
    first: document.getElementById("first"),
    last: document.getElementById("last"),
    nickname: document.getElementById("nickname"),
    birthday: document.getElementById("bday"),
    gender: document.getElementById("gender"),
    relation: document.getElementById("relation")
}
const backButton = document.getElementById("back");
const attractedToOptions = {
    male: document.getElementById("male"),
    female: document.getElementById("female"),
    other: document.getElementById("other")
}
let changeNickname = true;
let changeAttractedTo = true;
let confirmBack = true;
inputOptions.first.oninput = () => {
    if (changeNickname) {
        inputOptions.nickname.value = inputOptions.first.value;
    }
}
inputOptions.nickname.oninput = () => changeNickname = false;
inputOptions.gender.oninput = () => {
    if (changeAttractedTo) {
        if (inputOptions.gender.value === "male") {
            attractedToOptions.male.checked = false;
            attractedToOptions.female.checked = true;
            attractedToOptions.other.checked = false;
        } else if (inputOptions.gender.value === "female") {
            attractedToOptions.male.checked = true;
            attractedToOptions.female.checked = false;
            attractedToOptions.other.checked = false;
        } else {
            attractedToOptions.male.checked = false;
            attractedToOptions.female.checked = false;
            attractedToOptions.other.checked = false;
        }
    }
}

document.getElementById("submit-button").onclick = () => {
    const attractedTo = [];
    const currentDate = new Date();
    if (attractedToOptions.male.checked) attractedTo.push("male");
    if (document.getElementById("female").checked) attractedTo.push("female");
    if (document.getElementById("other").checked) attractedTo.push("other");
    console.log("Selected options:", attractedTo);
    const loadedPeople = loadStat("people") || []; // if no people, make empty array
    const person = {
        first: inputOptions.first.value,
        last: document.getElementById("last").value,
        nickname: document.getElementById("nickname").value,
        birthday: document.getElementById("bday").value,
        gender: document.getElementById("gender").value,
        relation: document.getElementById("relation").value,
        attractedTo: attractedTo,
        level: 1,
        interior: null,
        friends: [],
        best: null,
        lover: null,
        random: Math.random(),
        date: `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`
    }
    console.log(person.date);
    console.log(new Date(person.date));
    // just get the indexes of all your people
    const peoplesIndexes = loadedPeople.map(person => parseInt(person.index));
    // get the greatest index
    const greatestIndex = Math.max(...peoplesIndexes);
    if (greatestIndex == -Infinity) { // if no people yet make this person's index 0
        person.index = 0;
    } else { // otherwise make this person's index one more than the greatest
        person.index = greatestIndex + 1;
    }

    if (person.first === "") {
        feedback.innerHTML = "First name not filled in.";
        return;
    }
    if (person.last === "") {
        feedback.innerHTML = "Last name not filled in.";
        return;
    }
    if (person.gender === "Gender") {
        feedback.innerHTML = "Gender not filled in.";
        return;
    }
    if (person.attractedTo.length === 0) {
        feedback.innerHTML = "Attracted to not filled in.";
        return;
    }
    feedback.innerHTML = `Meet new person: <b>${person.first} ${person.last}</b>`;
    const saveButton = document.createElement("button");
    saveButton.innerHTML = "Save person";
    const body = document.querySelector("body");
    saveButton.onclick = () => {
        loadedPeople.push(person);
        saveStat("people", loadedPeople);
        console.log(loadedPeople);

        body.removeChild(saveButton);
        confirmBack = false;
        backButton.innerHTML = "Go back";
        feedback.innerHTML = "or";

        const newButton = document.createElement("button");
        newButton.innerHTML = "Make new person";
        newButton.onclick = () => {
            let firstSelect = true;
            Array.from(document.querySelector("fieldset").children).forEach(element => {
                const elementName = element.nodeName;
                if (elementName === "SELECT") {
                    if (firstSelect) {
                        element.value = "Gender*";
                        firstSelect = false;
                    } else {
                        element.value = "Relation to You";
                    }
                } else if (elementName === "FIELDSET") {
                    Array.from(element.children).forEach(element => {
                        if (element.nodeName === "LABEL") {
                            Array.from(element.children).forEach(element => {
                                element.checked = false;
                            });
                        }
                    });
                } else {
                    element.value = "";
                }
            });
            feedback.innerHTML = "";
            backButton.innerHTML = "Go back without saving this person";
            body.removeChild(newButton);
            changeNickname = true;
            confirmBack = true;
        }
        body.appendChild(newButton);
    }
    body.appendChild(saveButton);
}
backButton.onclick = () => {
    if (!confirmBack || confirm("Go back without saving this person?")) {
        window.location.href = "../";
    }
}