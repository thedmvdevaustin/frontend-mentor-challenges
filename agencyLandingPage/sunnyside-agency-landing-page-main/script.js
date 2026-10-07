const menuBtn = document.querySelector(".header__menu-btn");
const nav = document.querySelector(".header__nav");
const desktopViewport = window.matchMedia("(min-width: 64rem)")
menuBtn.addEventListener("click", () => {
    if (nav.getAttribute("aria-hidden") === "true") {
        nav.removeAttribute("aria-hidden");
        menuBtn.setAttribute("aria-expanded", "true");
        menuBtn.setAttribute("aria-label", "Close menu");
    } else {
        nav.setAttribute("aria-hidden", "true");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "Open menu");
    }
})

const changeNav = () => {
    if (desktopViewport.matches) {
        nav.removeAttribute("aria-hidden");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "Open menu");
    } else {
        nav.setAttribute("aria-hidden", "true");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "Open menu");
    }
}

desktopViewport.addEventListener("change", changeNav);
