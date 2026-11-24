const headerToggleBtn = document.querySelector(".header__toggle-btn");
const headerNav = document.querySelector(".header__nav");
const headerBtn = document.querySelector(".header__btn");
const testimonialViewport = document.querySelector(".main__testimonials-viewport");
const testimonialsList = document.querySelector(".main__testimonials-list");
const testimonialBtnsContainer = document.querySelector(".main__testimonials-btns");
const testimonialBtns = document.querySelectorAll(".main__testimonials-btn");
const emailInput = document.querySelector("#input");
const emailErrorMsg = document.querySelector("#input-error");
const form = document.querySelector(".footer__container-form");



const desktopViewport = window.matchMedia("(min-width: 64rem)");
let startx;
let pressed = false;
let currentTranslate = 0;
let previousTranslate = 0;

const toggleHeaderNav = () => {
    console.log(headerToggleBtn.ariaExpanded, headerToggleBtn.firstElementChild)
    if (headerToggleBtn.ariaExpanded === 'true') {
        headerToggleBtn.setAttribute("aria-expanded", "false");
        headerToggleBtn.setAttribute("aria-label", "Open menu");
        headerToggleBtn.innerHTML = '<img src="./images/icon-hamburger.svg" alt="" width="25" height="18" class="header__toggle-img" />'
    } else {
        headerToggleBtn.setAttribute("aria-expanded", "true");
        headerToggleBtn.setAttribute("aria-label", "Close menu");
        headerToggleBtn.innerHTML = '<img src="./images/icon-close.svg" alt="" width="21" height="22" class="header__toggle-img" />';
    }
    headerNav.hidden = !headerNav.hidden;
}
const updateSliderPosition = (index) => {
    testimonialsList.style.transform = `translateX(-${index * testimonialViewport.clientWidth}px)`;
}
const showViewportItems = () => {
    if (desktopViewport.matches) {
        headerBtn.hidden = false;
        headerNav.hidden = false;
        testimonialBtnsContainer.hidden = true;
        headerToggleBtn.setAttribute("aria-expanded", "false");
        headerToggleBtn.setAttribute("aria-label", "Open menu");
        headerToggleBtn.innerHTML = '<img src="./images/icon-hamburger.svg" alt="" width="25" height="18" class="header__toggle-img" />'
        testimonialsList.style.transform = `translateX(0px)`;
        testimonialBtns.forEach((button, index) => {
            if (!index) {
                button.setAttribute("aria-pressed", 'true');
            } else {
                button.setAttribute("aria-pressed", "false");
            }
        })
    } else {
        headerBtn.hidden = true;
        headerNav.hidden = true;
        testimonialBtnsContainer.hidden = false;
    }
}

emailInput.addEventListener("blur", () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
        emailInput.setAttribute("aria-invalid", "true");
        emailErrorMsg.setAttribute("aria-hidden", "false");
    }
})
emailInput.addEventListener("input", () => {
    emailInput.removeAttribute("aria-invalid");
    emailErrorMsg.setAttribute("aria-hidden", "true");
})
form.addEventListener("submit", e => {
    e.preventDefault();
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
        form.reset();
    }
    return;
})
headerToggleBtn.addEventListener("click", toggleHeaderNav);
testimonialBtns.forEach((button, index) => {
    button.addEventListener("click", () => {
        updateSliderPosition(index);
        testimonialBtns.forEach(btn => {
            if (btn === button) {
                btn.setAttribute("aria-pressed", "true");
            } else {
                btn.setAttribute("aria-pressed", "false");
            }
        })
    })
})
testimonialViewport.addEventListener("mousedown", e => {
    e.preventDefault();
    if (desktopViewport.matches) {
        startx = e.clientX;
        pressed = true;
    }
    console.log(startx);
})
window.addEventListener("mousemove", e => {
    if (!pressed || !desktopViewport.matches) {
        return;
    }
    
    let distance = e.clientX - startx;
    currentTranslate = previousTranslate + distance; 
    testimonialsList.style.transform = `translateX(${currentTranslate}px)`;
})
window.addEventListener("mouseup", e => {
    if (desktopViewport.matches && pressed) {
        pressed = false;
        previousTranslate = currentTranslate;
    }
})
desktopViewport.addEventListener("change", showViewportItems);
showViewportItems(); 