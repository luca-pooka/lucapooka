//const url = "http://localhost:3000";
const url = "https://lucapooka.onrender.com";
const playerText = document.getElementById("words");
const playerName = document.getElementById("name");
const allChats = document.getElementById("all-chats");
playerName.value = JSON.parse(localStorage.getItem("chat-name"));
playerName.oninput = () => localStorage.setItem("chat-name", JSON.stringify(playerName.value));
function fetchData() {
    allChats.value = "Loading chats...";
    fetch(url + "/data")
        .then(response => response.json())
        .then(data => {
            allChats.value = "";
            data.forEach(row => {
                allChats.value += `${row.name ? row.name : "Anonymous"}: ${row.words}\n\n`;
                allChats.scrollTop = allChats.scrollHeight;
            });
        })
        .catch(err => {
            console.error("error fetching data:", err);
        });
}
async function sendMessage() {
    const words = playerText.value;
    const name = playerName.value;
    playerText.value = "";
    const response = await fetch(url + "/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, words })
    });
    const data = await response.json();
    console.log(data);
    fetchData();
}
window.onkeydown = event => { if (event.key === "Enter") sendMessage() };
fetchData();
setInterval(fetchData(), 300);