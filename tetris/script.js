const grid = document.getElementById("grid");
for (let row = 0; row < 20; row++) {
    for (let column = 0; column < 10; column++) {
        const tile = document.createElement("div");
        tile.className = "tile";
        grid.appendChild(tile);
    }
}
setInterval(() => {
    grid.children.forEach(tile => {
        if (tile.classList.contains("block")) {
            tile.classList.remove("Blo")
            
        }
    });
}, 1000);