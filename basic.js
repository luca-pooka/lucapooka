import { themes } from "./themes.js";
const themeString = JSON.parse(localStorage.getItem("theme")) || "Default";
const theme = themes.find(theme => themeString === theme.id);
const doc = document.documentElement;
doc.style.setProperty("--bg", theme.bg);
doc.style.setProperty("--text", theme.text);
doc.style.setProperty("--accent", theme.accent);
doc.style.setProperty("--box-shadow", theme.text === "white" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)");

const toggle = document.getElementById("footer-toggle");
const footer = document.querySelector("footer");
if (toggle !== null && footer !== null) {
    let footerShown = JSON.parse(localStorage.getItem("footer-toggle"));
    if (footerShown === false) {
        footer.classList.add("invisible");
        toggle.innerHTML = "⌃";
        toggle.style.bottom = 0;
        footer.classList.add("unobtrusive");
    } else {
        footerShown = true;
    }
    toggle.onclick = () => {
        if (footerShown) {
            footer.classList.add("invisible");
            toggle.innerHTML = "⌃";
            toggle.style.bottom = 0;
            footerShown = false;
            setTimeout(() => {
                footer.classList.add("unobtrusive");
            }, 500);
            localStorage.setItem("footer-toggle", JSON.stringify(false));
        } else {
            footer.classList.remove("invisible");
            footer.classList.remove("unobtrusive");
            toggle.innerHTML = "⌄";
            toggle.style.bottom = "2%";
            footerShown = true;
            localStorage.setItem("footer-toggle", JSON.stringify(true));
        }
    }
}