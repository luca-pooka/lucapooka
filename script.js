import { themes } from "./themes.js";
// "apps" have been renamed to "projects" but i'm not changing them here because it doesn't matter
const apps = [
    {name: "Watamelon", tags: ["Unity", "Game", "Servers", "Single Player", "The Best"], link: "watamelon/", info: "Combine fruits to get all the way to a watamelon and get a high score!", date: "February 2025", order: 13},
    {name: "Puzzle Platform", tags: ["Unity", "Game", "Single Player", "The Best"], link: "puzzleplatform/", info: "Progress through levels in this 2D platformer puzzle game.", date: "September 2025", order: 18, recentUpdate: true},
    {name: "Pong", tags: ["Unity", "Game", "Multiplayer", "Co-op", "Versus", "The Best"], link: "pong/", info: "Go against another player in the classic game of hitting a ball back and forth!", date: "March 2025; Idea by Jacob", order: 14},
    {name: "Blackjack", tags: ["Game", "Single Player", "Mobile-friendly"], link: "blackjack/", info: "Bet your money and try to make it big without going over 21.", date: "August 2024", order: 3},
    {name: "Super Tic Tac Toe", tags: ["Game", "Multiplayer", "Versus", "The Best", "Mobile-friendly"], link: "supertictactoe/", info: "Play games of Tic Tac Toe, and try to get three games won in a row.", date: "August 2024", order: 1},
    {name: "Life Simulator", tags: ["Game", "Single Player", "The Best", "Mobile-friendly"], link: "lifesim/", info: "Create people you know in real life, solve their problems, and care for them.", date: "December 2024", order: 8},
    {name: "Snake", tags: ["Game", "Single Player"], link: "snake/", info: "Move around collecting fruit to grow and get a high score in this classic game.", date: "June 2025", order: 17},
    {name: "War", tags: ["Game", "Single Player", "Multiplayer", "Versus"], link: "war/", info: "Battle a friend or bot in the classic game of war, choosing what move to make each round.", date: "November 2025", order: 19},
    {name: "Rolling", tags: ["Game", "Single Player", "Mobile-friendly"], link: "rolling/", info: "Roll and roll and try to get something good.", date: "March 2025", order: 15},
    {name: "Zoo Simulator", tags: ["Game", "Single Player", "Mobile-friendly"], link: "zoosim/", info: "Raise animals that make you money, and try to get the best ones.", date: "August 2024", order: 4},
    {name: "Wavelength", tags: ["Game", "Multiplayer", "Co-op", "Mobile-friendly"], link: "wavelength/", info: "Get on the same wavelength as your teammate! Choose the right number based off what they say.", date: "January 2025", order: 11},
    {name: "Synchrony", tags: ["Game", "Multiplayer", "Co-op"], link: "synchrony/", info: "See if you would answer the same as your teammate. How in sync are you two?", date: "February 2025", order: 12},
    {name: "Person Sort", tags: ["Game", "Single Player", "Mobile-friendly"], link: "personsort/", info: "Sort different colored squares into their correct houses.", date: "January 2025", order: 9},
    {name: "Chess", tags: ["Game", "Multiplayer", "Versus", "Mobile-friendly", "Beta"], link: "chess/", info: "Advance your pieces and try to checkmate (or capture in this version) the opponent's king.", date: "August 2024", order: 2},
    {name: "Weather", tags: ["Tool", "Servers", "Single Player", "Mobile-friendly"], link: "weather/", info: "Find the weather for your area.", date: "November 2025", order: 21},
    {name: "Chat", tags: ["Tool", "Servers", "Single Player", "Mobile-friendly"], link: "chat/", info: "Chat with anyone online!<br><span style='font-size: 12px'>(this is basically just a test of my online servers)</span>", date: "November 2025", order: 20},
    {name: "Connect Four", tags: ["Game", "Multiplayer", "Versus", "Mobile-friendly", "Beta"], link: "connectfour/", info: "Try to get four of your color in a row before your opponent does.", date: "September 2024", order: 5},
    {name: "Calculator", tags: ["Tool", "Single Player"], link: "calculator/", info: "It's a calculator, you can do your math homework or something.", date: "September 2024", order: 6},
    {name: "Countdowns", tags: ["Tool", "Single Player", "Mobile-friendly", "Beta"], link: "countdowns/", info: "Count down to your birthday, Christmas, or anything else.", date: "January 2026", order: 23},
    {name: "To-Do List", tags: ["Tool", "Single Player", "Mobile-friendly", "Beta"], link: "todo/", info: "Put your tasks in and check them off when completed.", date: "May 2025", order: 16},
    {name: "Random Picker", tags: ["Tool", "Single Player", "Mobile-friendly"], link: "randompicker/", info: "Unsure what to eat, play, or anything else? Put in options and let chance choose.", date: "December 2025", order: 22},
    {name: "Random Number Gen", tags: ["Tool", "Single Player", "Mobile-friendly"], link: "rng/", info: "Get a random number from the range you pick.", date: "January 2025", order: 10},
    {name: "Find your exact age", tags: ["Tool", "Single Player", "Mobile-friendly"], link: "exactage/", info: "Put in your date and time of birth, and you will be told exactly how old you are.", date: "October 2024", order: 7},
    //{name: "Stair Stepper", tags: ["Game", "Single Player", "Multiplayer", "Versus", "Beta"], link: "stairstep/", info: "Don't choose the same thing as your opponents, or else you won't climb up. (Doesn't work)", date: "February 2025", order 13.5}
    //{name: "Rhythm Fighter", tags: ["Game", "Single Player", "Mobile-friendly", "Beta", "New"], link: "rhythm/", info: "this actually does not work as a game rn so maybe don't play it",}
]
const tags = [
    {n: "Unity", t: "A project made in the Unity engine.", src: "unity.png"},
    {n: "Game", t: "A game to play for fun.", src: "game.png"},
    {n: "Tool", t: "A tool to help you or give you cool information.", src: "tool.png"},
    {n: "Servers", t: "A project that uses online servers to serve you information.", src: "servers.png"},
    {n: "Single Player", t: "A project that can only be played/used by one person at once.", src: "singleplayer.png"},
    {n: "Multiplayer", t: "A game that can be played by multiple (2-4) people at once.", src: "multiplayer.png"},
    {n: "Versus", t: "A multiplayer game where the players face off against each other.", src: "versus.png"},
    {n: "Co-op", t: "A multiplayer game where the players work together to accomplish something.", src: "coop.png"},
    {n: "The Best", t: "My personal favorite projects where I think I've done the best on and are the most fun.", src: "best.png"},
    {n: "Mobile-friendly", t: "projects that work not just on computers but on mobile devices as well.", src: "mobile.png"},
    {n: "Beta", t: "Projects that are unfinished or may not fully work properly.", src: "beta.png"}, 
    {n: "New", t: "New projects.", src: "new.png"}
];
const appsDiv = document.getElementById("apps");
const tagsDiv = document.getElementById("tags");
const orderBy = document.getElementById("order-select");
let selectedApps = apps;
tags.forEach(tag => {
    const tagDiv = document.createElement("div");
    tagDiv.className = "tag-div";
    tagDiv.title = `${tag.n} Tag:\n${tag.t}`;
    tagDiv.onclick = () => {
        if (img.classList.contains("selected")) {
            img.src = img.src.replace("selected", "default");
            img.classList.remove("selected");
        } else {
            img.src = img.src.replace("default", "selected");
            img.classList.add("selected");
        }
        createApps();
    }
    const img = document.createElement("img");
    img.src = `icons/default/${tag.src}`;
    img.alt = tag.n;
    img.className = "tag-img";
    if (tag.n === "Mobile-friendly" && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        img.src = img.src.replace("default", "selected");
        img.classList.add("selected");
    }
    const tagTitle = document.createElement("p");
    tagTitle.innerHTML = tag.n;
    tagTitle.className = "tag-p";
    tagDiv.appendChild(img);
    tagDiv.appendChild(tagTitle);
    tagsDiv.appendChild(tagDiv);
});
function createApps() {
    const conditions = [];
    document.querySelectorAll(".selected").forEach(element => {
        conditions.push(element.alt);
    });
    selectedApps = apps.filter(app => conditions.every(item => app.tags.includes(item)));
    console.log(selectedApps);
    // order apps
    switch (orderBy.value) {
        case "newest":
            selectedApps.sort((a, b) => b.order - a.order);
            break;
        case "oldest":
            selectedApps.sort((a, b) => a.order - b.order);
            break;
        case "alphabetical-asc":
            selectedApps.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case "alphabetical-desc":
            selectedApps.sort((a, b) => b.name.localeCompare(a.name));
            break;
        default:
            break;
    }
    // delete apps
    while (appsDiv.childElementCount > 0) {
        appsDiv.removeChild(appsDiv.children[0]);
    }
    // create apps
    selectedApps.forEach(app => {
        const square = document.createElement("div");
        square.className = "app";
        const title = document.createElement("h2");
        title.innerHTML = app.name;
        title.className = "title";
        square.appendChild(title);
        const tagsDiv = document.createElement("div");
        app.tags.forEach(tag => {
            const img = document.createElement("img");
            img.src = `icons/default/${tags.find(t => t.n === tag).src}`;
            img.alt = tag;
            img.className = "tag-app";
            tagsDiv.appendChild(img);
        });
        square.appendChild(tagsDiv);
        if (app.recentUpdate) {
            const recentUpdate = document.createElement("p");
            recentUpdate.innerHTML = "Recently Updated!";
            recentUpdate.className = "recent-update";
            square.appendChild(recentUpdate);
        }
        const description = document.createElement("p");
        description.innerHTML = app.info;
        description.className = "description";
        square.appendChild(description);
        const link = document.createElement("a");
        link.innerHTML = "Go";
        link.className = "link";
        link.href = app.link;
        square.appendChild(link);
        const dateAdded = document.createElement("p");
        dateAdded.innerHTML = `Added in ${app.date}`;
        dateAdded.className = "date-added";
        square.appendChild(dateAdded);
        appsDiv.appendChild(square);
    });
}
document.getElementById("theme-change").onclick = () => overlay.style.display = "flex";
document.getElementById("theme-change-cancel").onclick = () => overlay.style.display = "none";
orderBy.oninput = createApps;
const body = document.querySelector("body");
const overlay = document.getElementById("overlay");
const themesTable = document.getElementById("themes-table");
themes.forEach(theme => {
    const tr = document.createElement("tr");
    const name = document.createElement("td");
    name.innerHTML = theme.name;
    name.style.background = theme.bg;
    name.style.color = theme.text;
    const apply = document.createElement("td");
    const applyButton = document.createElement("button");
    applyButton.innerHTML = "Apply theme";
    applyButton.onclick = () => {
        localStorage.setItem("theme", JSON.stringify(theme.id));
        const doc = document.documentElement;
        doc.style.setProperty("--bg", theme.bg);
        doc.style.setProperty("--text", theme.text);
        doc.style.setProperty("--accent", theme.accent);
    }
    apply.appendChild(applyButton);
    tr.appendChild(name);
    tr.appendChild(apply);
    themesTable.appendChild(tr);
});
createApps();