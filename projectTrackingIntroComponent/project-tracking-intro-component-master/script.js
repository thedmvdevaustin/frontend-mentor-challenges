const button = document.querySelector(".tracking__menu-btn");
const nav = document.querySelector(".tracking__nav");

const openMenu = () => {
    button.setAttribute("aria-expanded", "true");
    button.setAttribute("aria-label", "Close menu");
    button.innerHTML = `<img src="./images/icon-close.svg" alt="" width="20" height="20" class="tracking__menu-icon">`;
}

const closeMenu = () => {
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "Open menu");
    button.innerHTML = `<img src="./images/icon-hamburger.svg" alt="" width="24" height="16" class="tracking__menu-icon">`;
    button.focus();
}

button.addEventListener("click", () => {
    if (nav.classList.contains("open")) {
        closeMenu();
    } else {
        openMenu();
    }
    nav.classList.toggle("open");
})

document.addEventListener("keydown", e => {
    // console.log('kdkd   ')
    if (e.key === 'Escape' && button.getAttribute("aria-expanded") === 'true') {
        closeMenu();
        nav.classList.remove("open");
    }
})