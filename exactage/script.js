const differencesElement = document.getElementById("differences");
differencesElement.style.display = "none";
function find() {
    const birthday = document.getElementById("birthday").value;
    const birthdayDates = {
        year: parseInt(birthday.slice(0, 4)),
        month: parseInt(birthday.slice(5, 7)),
        day: parseInt(birthday.slice(8, 10)),
        hours: parseInt(birthday.slice(11, 13)),
        minutes: parseInt(birthday.slice(14, 16))
    }
    for (const date of Object.values(birthdayDates)) {
        if (isNaN(date)) {
            return;
        }
    }
    const currentDate = new Date();
    const birthdayDate = new Date(birthday);
    console.log(birthdayDate); // nothing rn (and probably will never do anything)
    const currentDates = {
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1, // +1 because it starts from 0
        day: currentDate.getDate(),
        hours: currentDate.getHours(),
        minutes: currentDate.getMinutes()
    }
    console.log(birthday);
    console.log(birthdayDates);
    console.log(currentDate);
    console.log(currentDates);
    const differences = {}
    differences["minutes"] = currentDates["minutes"] - birthdayDates["minutes"];
    let lowerHours = false;
    if (differences["minutes"] < 0) {
        differences["minutes"] = currentDates["minutes"] + 60 - birthdayDates["minutes"];
        lowerHours = true;
    }
    differences["hours"] = currentDates["hours"] - birthdayDates["hours"];
    let lowerDay = false;
    if (differences["hours"] < 0) {
        differences["hours"] = currentDates["hours"] + 24 - birthdayDates["hours"];
        lowerDay = true;
    }
    if (lowerHours) {
        differences["hours"]--;
    }
    differences["day"] = currentDates["day"] - birthdayDates["day"];
    let lowerMonth = false;
    if (differences["day"] < 0) {
        differences["day"] = currentDates["day"] + 30 - birthdayDates["day"];
        lowerMonth = false;
    }
    if (lowerDay) {
        differences["month"]--;
    }
    differences["month"] = currentDates["month"] - birthdayDates["month"];
    let lowerYear = false;
    if (differences["month"] < 0) {
        differences["month"] = currentDates["month"] + 12 - birthdayDates["month"];
        lowerYear = true;
    }
    if (lowerMonth) {
        differences["hours"]--;
    }
    differences["year"] = currentDates["year"] - birthdayDates["year"];
    if (lowerYear) {
        differences["year"]--;
    }
    console.log(differences);
    document.getElementById("year").innerHTML = differences["year"];
    document.getElementById("month").innerHTML = differences["month"];
    document.getElementById("day").innerHTML = differences["day"];
    document.getElementById("hours").innerHTML = differences["hours"];
    document.getElementById("minutes").innerHTML = differences["minutes"];

    differencesElement.style.display = "";
}