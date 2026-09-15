const nav = document.querySelector(".header__nav");
const main = document.querySelector(".main");
const footer = document.querySelector(".footer");
const navBtn = document.querySelector(".header__btn");

navBtn.addEventListener("click", () => {
    console.log(navBtn.getAttribute("aria-expanded"));
    if (navBtn.getAttribute("aria-expanded") === 'true') {
        navBtn.setAttribute("aria-expanded", "false");
        navBtn.firstElementChild.src = `./images/icon-hamburger.svg`;
        nav.setAttribute("aria-hidden", 'true');
        main.hidden = false;
        main.classList.remove("hide");
        footer.hidden = false;
        footer.classList.remove("hide");
    } else {
        navBtn.setAttribute("aria-expanded", "true");
        nav.removeAttribute("aria-hidden");
        navBtn.firstElementChild.src = `./images/icon-close.svg`;
        main.hidden = true;
        main.classList.add("hide");
        footer.hidden = true;
        footer.classList.add("hide");
    }
})

const mediaQuery = window.matchMedia('(min-width: 1024px)');
const updateAriaHidden = () => {
    if (mediaQuery.matches) {
        navBtn.setAttribute("aria-expanded", "false");
        navBtn.firstElementChild.src = `./images/icon-hamburger.svg`;
        nav.removeAttribute("aria-hidden");
        main.hidden = false;
        main.classList.remove("hide");
        footer.hidden = false;
        footer.classList.remove("hide");
    } else {
        nav.setAttribute("aria-hidden", "true");
    }
}
updateAriaHidden();

mediaQuery.addEventListener("change", updateAriaHidden);