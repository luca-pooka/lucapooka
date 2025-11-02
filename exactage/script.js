const differencesElement = document.getElementById("differences");
const yearsElement = document.getElementById("years");
const birthdayElement = document.getElementById("birthday");
differencesElement.style.display = "none";
yearsElement.style.display = "none";
birthdayElement.value = "2000-01-01T00:00"

function find() {
    const birthdayDate = new Date(birthdayElement.value);
    const fades = document.querySelectorAll(".fade");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            entry.target.style = `rotate: ${(birthdayDate.getMonth + 1) * 30}deg`;
            console.log(entry.target.style);
            console.log(entry.target.id + " rotating");
        } else {
            entry.target.classList.remove("visible");
            entry.target.style = `rotate: 0`;
            console.log("not rotating");
        }
        });
    }, { threshold: 0.2 }); // triggers when 20% of element is visible
    fades.forEach(element => observer.observe(element));
    const currentDate = new Date();
    let difference = currentDate - birthdayDate;
    console.log("diff: " + difference);
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
    differencesElement.innerHTML = `You are <span style='font-weight: 100000'>${Math.floor(differences.years)}</span> years, ${Math.floor(differences.months)} months, ${Math.floor(differences.days)} days, ${Math.floor(differences.hours)} hours, and ${Math.floor(differences.minutes)} minutes old.`;
    yearsElement.innerHTML = `Or around ${Math.floor(differences.years * 1e5) / 1e5} years old!`;
    differencesElement.style.display = "block";
    yearsElement.style.display = "block";
    
}