const list = JSON.parse(localStorage.getItem("todolist")) || [];
console.log(list);
console.log(JSON.parse(localStorage.getItem("todolist")));
const table = document.querySelector("table");
const itemText = document.getElementById('item-text');
const updateList = () => localStorage.setItem("todolist", JSON.stringify(list));
function showListItem(item) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.innerHTML = item.completed ? `<s>${item.text}</s>` : item.text;
    const completeTd = document.createElement("td");
    completeTd.id = "complete";
    const removeItem = () => {
        list.splice(list.findIndex(value => value === item), 1);
        table.removeChild(tr);
        updateList();
    }
    const completeButton = document.createElement("button");
    completeButton.innerHTML = item.completed ? "Remove" : "Complete";
    completeButton.onclick = item.completed ? removeItem : () => {
        item.completed = true;
        td.innerHTML = `<s>${item.text}</s>`;
        completeButton.innerHTML = "Remove";
        completeButton.onclick = removeItem;
        updateList();
    }
    completeTd.appendChild(completeButton);
    tr.appendChild(td);
    tr.appendChild(completeTd);
    table.appendChild(tr);
}
function showOverlay() {
    const overlay = document.getElementById("overlay")
    overlay.style.display = "flex";
    overlay.onkeydown = event => {
        if (event.key === "Enter") {
            submit();
        }
    }
    itemText.focus();
}
const cancel = () => document.getElementById("overlay").style.display = "none";
function submit() {
    if (itemText.value) {
        const item = {text: itemText.value, completed: false};
        itemText.value = null;
        list.push(item);
        showListItem(item);
        updateList();
    }
    cancel();
}
list.forEach(item => showListItem(item));