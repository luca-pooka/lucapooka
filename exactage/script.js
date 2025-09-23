const differencesElement = document.getElementById("differences");
const yearsElement = document.getElementById("years");
differencesElement.style.display = "none";
yearsElement.style.display = "none";
function find() {
    const currentDate = new Date();
    const birthdayDate = new Date(document.getElementById("birthday").value);
    let difference = currentDate - birthdayDate;
    console.log("diff" + difference);
    console.log(new Date(difference).getDate());
    const differences = {};
    differences.years = difference / 31556952000;
    difference -= Math.floor(differences.years) * 31556952000;
    differences.months = difference / 2629746000;
    difference -= Math.floor(differences.months) * 2629746000;
    differences.days = difference / 8.64e+7;
    difference -= Math.floor(differences.days) * 8.64e+7;
    differences.hours = difference / 3.6e+6;
    difference -= Math.floor(differences.hours) * 3.6e+6;
    differences.minutes = difference / 60000;
    console.log(differences);
    differencesElement.innerHTML = `You are around ${Math.floor(differences.years)} years, ${Math.floor(differences.months)} months, ${Math.floor(differences.days)} days, ${Math.floor(differences.hours)} hours, and ${Math.floor(differences.minutes)} minutes old.`;
    yearsElement.innerHTML = `Or around ${Math.floor(differences.years * 1e5) / 1e5} years old!`;
    differencesElement.style.display = "block";
    yearsElement.style.display = "block";
}