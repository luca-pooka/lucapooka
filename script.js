const apps = [
    {name: "Watamelon", tags: ["Unity", "Game", "Single Player", "The Best"], link: "watamelon/", info: "Combine fruits to get all the way to a watamelon and get a high score!"},
    {name: "Puzzle Platform", tags: ["Unity", "Game", "Single Player", "The Best"], link: "puzzleplatform/", info: "Progress through levels in this 2D platformer puzzle game."},
    {name: "Pong", tags: ["Unity", "Game", "Multiplayer", "Co-op", "Versus", "The Best"], link: "pong/", info: "Go against another player in the classic game of hitting a ball back and forth!"},
    {name: "Super Tic Tac Toe", tags: ["Game", "Multiplayer", "Versus", "The Best", "Mobile-friendly"], link: "supertictactoe/", info: "Play games of Tic Tac Toe, and try to get three games won in a row."},
    {name: "War", tags: ["Game", "Multiplayer", "Versus", "New"], link: "war/", info: "Go against a friend in the classic game of war, choosing between reload, shoot, shield, and reflect."},
    {name: "Blackjack", tags: ["Game", "Single Player", "Mobile-friendly"], link: "blackjack/", info: "Bet your money and try to make it big without going over 21."},
    {name: "Life Simulator", tags: ["Game", "Single Player", "The Best", "Mobile-friendly"], link: "lifesim/", info: "Create people you know in real life, solve their problems, and care for them."},
    {name: "Snake", tags: ["Game", "Single Player"], link: "snake/", info: "Move around collecting fruit to grow and get a high score in this classic game."},
    {name: "Rolling", tags: ["Game", "Single Player", "Mobile-friendly"], link: "rolling/", info: "Roll and roll and try to get something good."},
    {name: "Zoo Simulator", tags: ["Game", "Single Player", "Mobile-friendly"], link: "zoosim/", info: "Raise animals that make you money, and try to get the best ones."},
    {name: "Chat", tags: ["Utility", "Single Player", "Online", "Mobile-friendly", "Beta", "New"], link: "chat/", info: "Chat with anyone online!<br><span style='font-size: 12px'>(this is basically just a test of my online servers)</span>"},
    {name: "Wavelength", tags: ["Game", "Multiplayer", "Co-op", "Mobile-friendly"], link: "wavelength/", info: "Try to get on the same 'wavelength' as your teammate and guess the right number relating to your catagory."},
    {name: "Synchrony", tags: ["Game", "Multiplayer", "Co-op"], link: "synchrony/", info: "See if you would answer the same as your teammate. How in sync are you two?"},
    {name: "Person Sort", tags: ["Game", "Single Player", "Mobile-friendly"], link: "personsort/", info: "Sort different colored squares into their correct houses."},
    {name: "Chess", tags: ["Game", "Multiplayer", "Versus", "Mobile-friendly", "Beta"], link: "chess/", info: "Advance your pieces and try to checkmate (or capture in this version) the opponent's king."},
    {name: "Connect Four", tags: ["Game", "Multiplayer", "Versus", "Mobile-friendly", "Beta"], link: "connectfour/", info: "Try to get four of your color in a row before your opponent does."},
    {name: "Calculator", tags: ["Utility", "Single Player"], link: "calculator/", info: "It's a calculator, you can do your math homework or something."},
    {name: "To-Do List", tags: ["Utility", "Single Player", "Mobile-friendly", "Beta"], link: "todo/", info: "Put your tasks in and check them off when completed."},
    {name: "Random Number Gen", tags: ["Utility", "Single Player", "Mobile-friendly"], link: "rng/", info: "Get a random number from the range you pick."},
    {name: "Find your exact age", tags: ["Utility", "Single Player", "Mobile-friendly"], link: "exactage/", info: "Put in your date and time of birth, and you will be told exactly how old you are."},
    //{name: "Stair Stepper", tags: ["Game", "Single Player", "Multiplayer", "Versus", "Beta"], link: "stairstep/", info: "Don't choose the same thing as your opponents, or else you won't climb up. (Doesn't work)"}
    //{name: "Rhythm Fighter", tags: ["Game", "Single Player", "Mobile-friendly", "Beta", "New"], link: "rhythm/", info: "this actually does not work as a game rn so maybe don't play it"}
]
const tags = [
    {n: "Unity", t: "Something made in the Unity engine.", src: "unity.png"},
    {n: "Game", t: "A game to play for fun.", src: "game.png"},
    {n: "Utility", t: "A utility to help you or give you cool information.", src: "utility.png"},
    {n: "Online", t: "Something that uses online servers.", src: "online.png"},
    {n: "Single Player", t: "Something that can only be played by one person at once.", src: "singleplayer.png"},
    {n: "Multiplayer", t: "Something that can be played by multiple (2-4) people at once.", src: "multiplayer.png"},
    {n: "Versus", t: "A multiplayer game where the players face off against each other.", src: "versus.png"},
    {n: "Co-op", t: "A multiplayer game where the players work together to accomplish something.", src: "coop.png"},
    {n: "The Best", t: "My personal favorite games where I think I've done the best on and are the most fun.", src: "best.png"},
    {n: "Mobile-friendly", t: "Things that work not just on computers but on mobile devices as well.", src: "mobile.png"},
    {n: "Beta", t: "Things that are unfinished or may not fully work properly.", src: "beta.png"}, 
    {n: "New", t: "New things.", src: "new.png"}
];
const appsDiv = document.getElementById("apps");
const checkboxes = document.getElementById("checkboxes");
let selectedApps = apps;
tags.forEach(tag => {
    const img = document.createElement("img");
    img.src = `icons/default/${tag.src}`;
    img.alt = tag.n;
    img.title = `${tag.n} Tag:\n${tag.t}`;
    img.className = "tag-img";
    img.onclick = () => {
        if (img.classList.contains("selected")) {
            img.src = img.src.replace("selected", "default");
            img.classList.remove("selected");
        } else {
            img.src = img.src.replace("default", "selected");
            img.classList.add("selected");
        }
        createApps();
    }
    if (tag.n === "Mobile-friendly" && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        img.src = img.src.replace("default", "selected");
        img.classList.add("selected");
    }
    checkboxes.appendChild(img);
});
//
function createApps() {
    const conditions = [];
    document.querySelectorAll(".selected").forEach(element => {
        conditions.push(element.alt);
    });
    selectedApps = apps.filter(app => {
        return conditions.every(item => app.tags.includes(item));
    });
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
createApps();