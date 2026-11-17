const toggleMenuBtn = document.querySelector(".header__toggle-menu");
const nav = document.querySelector(".header__nav");
const desktopViewport = window.matchMedia("(min-width: 64rem");


const toggleMenu = () => {
    if (nav.hidden) {
        nav.hidden = false;
        toggleMenuBtn.setAttribute("aria-expanded", "true");
        toggleMenuBtn.setAttribute("aria-label", "Close menu");
        toggleMenuBtn.innerHTML = '<svg class="header__close-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="19"><g fill="#2D314D" fill-rule="evenodd"><path d="M.868.661l16.97 16.97-.706.708L.162 1.369z"/><path d="M.161 17.632L17.131.662l.708.706-16.97 16.97z"/></g></svg>';
    } else {
        nav.hidden = true;
        toggleMenuBtn.setAttribute("aria-expanded", "false");
        toggleMenuBtn.setAttribute("aria-label", "Open menu");
        toggleMenuBtn.innerHTML = '<svg class="header__open-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="11"><g fill="#2D314D" fill-rule="evenodd"><path d="M0 0h24v1H0zM0 5h24v1H0zM0 10h24v1H0z"/></g></svg>'
    }
}
const toggleViewportChanges = () => {
    const headerBtn = document.querySelector(".header__btn");
    if (desktopViewport.matches) {
        headerBtn.hidden = false;
        toggleMenuBtn.hidden = true;
        nav.hidden = false;
        toggleMenuBtn.setAttribute("aria-expanded", "true");
        toggleMenuBtn.setAttribute("aria-label", "Close menu");
        toggleMenuBtn.innerHTML = '<svg class="header__close-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="19"><g fill="#2D314D" fill-rule="evenodd"><path d="M.868.661l16.97 16.97-.706.708L.162 1.369z"/><path d="M.161 17.632L17.131.662l.708.706-16.97 16.97z"/></g></svg>';
    } else {
        headerBtn.hidden = true;
        toggleMenuBtn.hidden = false;
        nav.hidden = true;
        toggleMenuBtn.setAttribute("aria-expanded", "false");
        toggleMenuBtn.setAttribute("aria-label", "Open menu");
        toggleMenuBtn.innerHTML = '<svg class="header__open-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="11"><g fill="#2D314D" fill-rule="evenodd"><path d="M0 0h24v1H0zM0 5h24v1H0zM0 10h24v1H0z"/></g></svg>'
    }
}

toggleViewportChanges();
toggleMenuBtn.addEventListener("click", toggleMenu);
desktopViewport.addEventListener("change", toggleViewportChanges)