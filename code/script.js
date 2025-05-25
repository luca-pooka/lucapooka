const code = document.getElementById("editor");
const konsole = document.getElementById("console"); // can't name it console
const log = text => konsole.innerHTML += `${text}\n`;
function run() {
    lines = code.value.split("\n");
    lines.forEach(line => {
        if (line.startsWith("say(")) {
            log(line.slice(4, line.indexOf(")")));
        } else {
            
        }
    });
}