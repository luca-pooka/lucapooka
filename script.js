const apps = [
    {name: "Watamelon", tags: ["Unity", "Game", "Single Player", "The Best"], link: "watamelon/", info: "Combine fruits to get all the way to a watamelon and get a high score!"},
    {name: "Pong", tags: ["Unity", "Game", "Multiplayer", "Versus", "The Best"], link: "pong/", info: "Go against another player in the classic game of hitting a ball back and forth!"},
    {name: "Life Simulator", tags: ["Game", "Single Player", "The Best", "Mobile-friendly"], link: "lifesim/", info: "Create people you know in real life, solve their problems, and care for them."},
    {name: "Rolling", tags: ["Game", "Single Player", "Mobile-friendly", "Beta"], link: "rolling/", info: "Roll and roll and try to get something good."},
    {name: "Blackjack", tags: ["Game", "Single Player", "Mobile-friendly"], link: "blackjack/", info: "Bet your money and try to make it big without going over 21."},
    {name: "Person Sort", tags: ["Game", "Single Player", "Mobile-friendly"], link: "personsort/", info: "Sort different colored squares into their correct houses."},
    {name: "Super Tic Tac Toe", tags: ["Game", "Multiplayer", "Versus", "The Best", "Mobile-friendly"], link: "supertictactoe/", info: "Play games of Tic Tac Toe, and try to get three games won in a row."},
    {name: "Zoo Simulator", tags: ["Game", "Single Player", "Mobile-friendly"], link: "zoosim/", info: "Raise animals that make you money, and try to get the best ones."},
    {name: "Wavelength", tags: ["Game", "Multiplayer", "Co-op", "Mobile-friendly"], link: "wavelength/", info: "Try to get on the same 'wavelength' as your teammate and guess the right number relating to your catagory."},
    {name: "Synchrony", tags: ["Game", "Multiplayer", "Co-op", "Beta"], link: "synchrony/", info: "See if you would answer the same as your teammate. How in sync are you two?"},
    {name: "Chess", tags: ["Game", "Multiplayer", "Versus", "Mobile-friendly", "Beta"], link: "chess/", info: "Advance your pieces and try to checkmate (or capture in this version) the opponent's king."},
    {name: "Connect Four", tags: ["Game", "Multiplayer", "Versus", "Mobile-friendly"], link: "connectfour/", info: "Try to get four of your color in a row before your opponent does."},
    {name: "Calculator", tags: ["App", "Single Player"], link: "calculator/", info: "It's a calculator, you can do your math homework or something."},
    {name: "To-Do List", tags: ["App", "Single Player", "Moblie-friendly", "Beta", "New"], link: "todo/", info: "Put your tasks in and check them off when completed."},
    {name: "Random Number Gen", tags: ["App", "Single Player", "Mobile-friendly"], link: "rng/", info: "Get a random number from the range you pick."},
    {name: "Find your exact age", tags: ["App", "Single Player", "Mobile-friendly"], link: "exactage/", info: "Put in your date and time of birth, and you will be told exactly how old you are."},
    {name: "Stair Stepper", tags: ["Game", "Single Player", "Multiplayer", "Versus", "Beta"], link: "stairstep/", info: "Don't choose the same thing as your opponents, or else you won't climb up. (Doesn't work)"}
    //{name: "Rhythm Fighter", tags: ["Game", "Single Player", "Mobile-friendly", "Beta", "New"], link: "rhythm/", info: "this actually does not work as a game rn so maybe don't play it"}
]
const tags = ["Unity", "Game", "App", "Single Player", "Multiplayer", "Versus", "Co-op", "The Best", "Mobile-friendly", "Beta", "New"];//
const appsDiv = document.getElementById("apps");
const checkboxes = document.getElementById("checkboxes");
let checkedApps = apps;
function createApps(apps) {
    // delete apps
    while (appsDiv.childElementCount > 0) {
        appsDiv.removeChild(appsDiv.children[0]);
    }
    apps.forEach(app => {
        const square = document.createElement("div");
        square.className = "app";
        const title = document.createElement("h2");
        title.innerHTML = app.name;
        square.appendChild(title);
        const tags = document.createElement("h5");
        tags.innerHTML = `Tags: ${app.tags.join(", ")}`;
        square.appendChild(tags);
        const description = document.createElement("p");
        description.innerHTML = app.info;
        square.appendChild(description);
        const link = document.createElement("a");
        link.innerHTML = "Go";
        link.href = app.link;
        square.appendChild(link);
        appsDiv.appendChild(square);
    });
}
createApps(apps);
tags.forEach(tag => {
    const label = document.createElement("label");
    label.innerHTML = tag;
    label.htmlFor = tag.toLocaleLowerCase();
    const input = document.createElement("input");
    input.type = "checkbox";
    input.id = tag.toLocaleLowerCase();
    input.value = tag;
    checkboxes.appendChild(label);
    checkboxes.appendChild(input);
});
const inputElements = document.querySelectorAll("input");
inputElements.forEach(input => {
    input.onclick = () => {
        const conditions = [];
        inputElements.forEach(input => {
            if (input.checked) {
                conditions.push(input.value);
            }
        });
        checkedApps = apps.filter(app => {
            return conditions.every(item => app.tags.includes(item));
        });
        createApps(checkedApps);
    }
});