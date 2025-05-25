const toggle = document.getElementById("footer-toggle");
const footer = document.querySelector("footer");
let footerShown = true;
toggle.onclick = () => {
    if (footerShown) {
        footer.classList.add("invisible");
        toggle.innerHTML = "⌃";
        toggle.style.bottom = 0;
        footerShown = false;
        setTimeout(() => {
            footer.classList.add("unobtrusive"); // this is terrible \._./
        }, 500);
    } else {
        footer.classList.remove("invisible");
        footer.classList.remove("unobtrusive");
        toggle.innerHTML = "⌄";
        toggle.style.bottom = "2%";
        footerShown = true;
    }
}