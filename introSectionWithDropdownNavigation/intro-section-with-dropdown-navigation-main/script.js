const openMenuBtn = document.querySelector(".header__open-menu");
const closeMenuBtn = document.querySelector(".header__close-menu");
const openSubmenuBtns = document.querySelectorAll(".header__open-submenu");
const header = document.querySelector('.header');

const openMenu = () => {
    openMenuBtn.setAttribute("aria-expanded", "true");
    openMenuBtn.nextElementSibling.classList.add("header__nav--open");
    openMenuBtn.nextElementSibling.hidden = false;
}

const closeMenu = () => {
    openMenuBtn.setAttribute("aria-expanded", "false");
    openMenuBtn.nextElementSibling.classList.remove("header__nav--open");
    openMenuBtn.nextElementSibling.hidden = true;
    openMenuBtn.focus();
}

const openSubmenu = (button) => {
    button.setAttribute("aria-expanded", "true");
    button.nextElementSibling.classList.add("header__submenu--open");
    button.nextElementSibling.hidden = false;
}
const closeSubmenu = (button) => {
    button.setAttribute("aria-expanded", "false");
    button.nextElementSibling.classList.remove("header__submenu--open");
    button.nextElementSibling.hidden = true;     
}

header.addEventListener("click", e => {
    if (e.target.classList.contains('header__open-menu')) {
        openMenu();
    } else if (e.target.classList.contains('header__close-menu')) {
        closeMenu();
    }
})

openSubmenuBtns.forEach(openSubmenuBtn => {
    let isHovered = false;
    let isClicked = false;
    openSubmenuBtn.addEventListener("mouseenter", () => {
        setTimeout(() => {
            openSubmenu(openSubmenuBtn);
        }, 150);
        isHovered = true;   
    })
    openSubmenuBtn.closest("li").addEventListener("mouseleave", () => {
        if (isClicked) return;
        setTimeout(() => {
            closeSubmenu(openSubmenuBtn);
        }, 250);
        isHovered = false;
    })
    openSubmenuBtn.addEventListener("click", () => {
        if (isHovered && !isClicked) {
            isClicked = true;
            return;
        }
        if (openSubmenuBtn.getAttribute("aria-expanded") === 'false') {
            openSubmenu(openSubmenuBtn);
        } else {
            closeSubmenu(openSubmenuBtn);
        }
        isClicked = false;
    })
})

window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) {
        closeMenu();
    }
})

header.addEventListener("keydown", e => {
    if (e.key === 'Escape') {
        let submenuOpen = false;
        openSubmenuBtns.forEach(openSubmenuBtn => {
            if (openSubmenuBtn.nextElementSibling.contains(document.activeElement)) {
                closeSubmenu(openSubmenuBtn);
                openSubmenuBtn.focus();
                submenuOpen = true;
            }
        })
        if (!submenuOpen) {
            closeMenu();
        }
    }
})