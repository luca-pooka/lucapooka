const countdownsHolder = document.getElementById("countdowns");
const countdowns = JSON.parse(localStorage.getItem("countdowns-list")) || [];
const overlay = document.getElementById("overlay");
const titleInput = document.getElementById("title");
const dateInput = document.getElementById("date");
const allDayInput = document.getElementById("all-day");

const secondConvert = 1000;
const minuteConvert = 60 * secondConvert;
const hourConvert = 60 * minuteConvert;
const dayConvert = 24 * hourConvert;
function createCountdowns() {
    while (countdownsHolder.firstChild) countdownsHolder.removeChild(countdownsHolder.firstChild);
    countdowns.forEach((countdown, index) => {
        const holder = document.createElement("div");
        holder.className = "countdown";
        const h2 = document.createElement("h2");
        h2.innerHTML = countdown.title;
        const count = document.createElement("p");
        const difference = new Date(countdown.date).getTime() + new Date().getTimezoneOffset() * 60000 - Date.now();
        let remaining = difference;
        function convertTime(convert) {
            const difference = Math.floor(remaining / convert);
            remaining %= convert;
            return difference;
        }
        const daysDiffernence = convertTime(dayConvert);
        const hoursDifference = convertTime(hourConvert);
        const minutesDifference = convertTime(minuteConvert);
        const secondsDifference = convertTime(secondConvert);
        count.innerHTML = `In ${daysDiffernence} days, ${hoursDifference} hours, ${minutesDifference} minutes, and ${secondsDifference} seconds.`;
        /* const edit = document.createElement("button");
        edit.innerHTML = "Edit"; */
        const remove = document.createElement("button");
        remove.innerHTML = "Remove";
        remove.onclick = () => {
            countdowns.splice(index, 1);
            localStorage.setItem("countdowns-list", JSON.stringify(countdowns));
            createCountdowns();
        }
        holder.appendChild(h2);
        holder.appendChild(count);
        // holder.appendChild(edit);
        holder.appendChild(remove);
        countdownsHolder.appendChild(holder);
    });
}
createCountdowns();
setInterval(createCountdowns, 1000);
function addCountdown() {
    overlay.style.display = "flex";
    overlay.onkeydown = event => {
        if (event.key === "Enter") {
            submit();
        }
    }
    // itemText.focus();
}
allDayInput.oninput = () => {
    const currentDate = dateInput.value;
    if (allDayInput.checked) {
        dateInput.type = "date";
        dateInput.value = currentDate.slice(0, 10);
    } else {
        dateInput.type = "datetime-local";
        dateInput.value = `${currentDate}T00:00`;
    }
};
const cancel = () => overlay.style.display = "none";
function submit() {
    const countdownJSON = {title: titleInput.value, date: dateInput.value};
    countdowns.push(countdownJSON);
    console.log(countdownJSON);
    localStorage.setItem("countdowns-list", JSON.stringify(countdowns));
    createCountdowns();
    cancel();
}