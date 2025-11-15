const toggle = document.getElementById("footer-toggle");
const footer = document.querySelector("footer");
let footerShown = JSON.parse(localStorage.getItem("footer-toggle"));
if (footerShown === false) {
    console.log("hide")
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
            footer.classList.add("unobtrusive"); // this is terrible \._./
        }, 500);
        localStorage.setItem("footer-toggle", JSON.stringify(false));
        console.log(JSON.parse(localStorage.getItem("footer-toggle")));
    } else {
        footer.classList.remove("invisible");
        footer.classList.remove("unobtrusive");
        toggle.innerHTML = "⌄";
        toggle.style.bottom = "2%";
        footerShown = true;
        localStorage.setItem("footer-toggle", JSON.stringify(true));
    }
}