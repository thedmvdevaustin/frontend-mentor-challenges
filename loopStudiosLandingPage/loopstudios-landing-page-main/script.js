const button = document.querySelector(".hero__menu-btn");
const hero = document.querySelector(".hero");
const nav = document.querySelector(".hero__nav");

const openMenu = () => {
    button.setAttribute("aria-expanded", "true");
    button.setAttribute("aria-label", "Close menu");
    button.innerHTML = `<img src="./images/icon-close.svg" alt="" width="20" height="20" class="hero__close-icon">`
}

const closeMenu = () => {
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "Open menu");
    button.innerHTML = `<img src="./images/icon-hamburger.svg" alt="" width="24" height="16" class="hero__menu-icon">`;
    button.focus()
}

button.addEventListener("click", () => {
    if (button.getAttribute("aria-expanded") === 'true') {
        closeMenu();
    } else {
        openMenu();
    }
    nav.classList.toggle("open");
})

document.addEventListener("keydown", e => {
    if (e.key === 'Escape' && button.getAttribute("aria-expanded") === 'true') {
        closeMenu();
        nav.classList.remove("open");
    }
})