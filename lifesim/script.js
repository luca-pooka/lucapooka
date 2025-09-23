import { saveStat, loadStat, deleteData } from "./stats.js";
const info = document.getElementById("info");
const tips = [
    "Did you know that the Compatibility Tester's percent is the chance that two people become friends/love?",
    "The food and interior stores give you five random items to choose from every time you enter them.",
    "This game and everything on my website was made by one person.",
    "This game saves your progress in your browser's Local Storage, no cookies!",
]
let money = loadStat("money");
document.getElementById("delete").onclick = () => {
    if (confirm("Are you sure you want to delete your data?") && confirm("Are you really sure?")) {
        deleteData();
        alert("Save data deleted. 😢");
        location.reload();
    }
}
document.getElementById("debug").onclick = () => {
    const data = document.createElement("p");
    data.innerHTML = JSON.stringify(loadStat("people"));
    document.querySelector("body").appendChild(data);
}
info.innerHTML = tips[Math.floor(Math.random() * tips.length)];
if (money === null) {
    money = 100;
    saveStat("money", 100);
    info.innerHTML = "Go to the Person Creator (the brown box) to start creating people.";
}
document.getElementById("money").innerHTML = `Money: $${money.toLocaleString()}`;