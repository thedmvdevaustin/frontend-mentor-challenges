const navBtn = document.querySelector(".header__menu-btn");
const nav = document.querySelector(".header__nav");
const main = document.querySelector(".main");
const monitorLabel = document.querySelector(".main__monitor-label");
const dialog = document.querySelector(".dialog");
const checkboxes = document.querySelectorAll(".dialog__form-checkbox");
const itemNames = document.querySelectorAll(".main__about-name");
const dialogProject = document.querySelector(".dialog__project");
const dialogSupport = document.querySelector(".dialog__support");
const formInput = document.querySelector(".dialog__form-input");
const form = document.querySelector(".dialog__form");
const desktopViewport = window.matchMedia("(min-width: 46.875rem)");

let checkedWithOpenItem;
let triggerBtn;
let numberLeft;
let pledgeValue;
let labelName;

const toggleNav = () => {
    if (navBtn.getAttribute("aria-expanded") === "true") {
        navBtn.setAttribute("aria-expanded", "false");
        navBtn.setAttribute("aria-label", "Open menu");
        navBtn.innerHTML = `<img src="./images/icon-hamburger.svg" alt="" width="16" height="15" class="header__menu-icon" aria-hidden="true" />`;
        nav.setAttribute("aria-hidden", "true");
    } else {
        navBtn.setAttribute("aria-expanded", "true");
        navBtn.setAttribute("aria-label", "Close menu");
        navBtn.innerHTML = `<img src="./images/icon-close-menu.svg" alt="" width="14" height="15" class="header__menu-icon" aria-hidden="true"/>`;
        nav.removeAttribute("aria-hidden");
    }
}

const togglePledgeForm = () => {
    checkboxes.forEach(checkbox => {
        const formContainer = checkbox.closest(".dialog__form-item").querySelector(".dialog__form-container");
        if (formContainer) {
            if (checkbox.checked) {
                formContainer.removeAttribute("aria-hidden");
            } else {
                formContainer.setAttribute("aria-hidden", 'true');
            }
        }
    })
}

const removePledgeForm = () => {
    checkboxes.forEach(checkbox => {
        const formContainer = checkbox.closest(".dialog__form-item").querySelector(".dialog__form-container");
        if (formContainer) {
            formContainer.setAttribute("aria-hidden", "true");
        }
    })
}

const openModalWithItemChecked = (name) => {
    const item = [...checkboxes].find(checkbox => {
        return checkbox.closest(".dialog__form-item").querySelector(".dialog__form-label > b").innerText.trim() === name;
    })
    item.checked = true;
}

const toggleDialogSection = () => {
    if (dialogSupport.getAttribute("aria-hidden") === "true") {
        dialogSupport.removeAttribute("aria-hidden");
        dialogProject.setAttribute("aria-hidden", "true");
        document.querySelector(".dialog__support-btn").focus();
    } else {
        dialogProject.removeAttribute("aria-hidden");
        dialogSupport.setAttribute("aria-hidden", "true");
        triggerBtn.focus();
    }
}

const updateStats = () => {
    const current = document.querySelector("#current");
    const total = document.querySelector("#total");
    const newCurrentValue = Number(current.innerText.replace(/[^0-9]/g, "")) + pledgeValue;
    const newTotalValue = Number(total.innerText.replace(/[^0-9]/g, "")) + 1;
    current.innerText = `$${newCurrentValue.toLocaleString("en-US")}`;
    total.innerText = `$${newTotalValue.toLocaleString('en-US')}`;
    document.querySelector("progress").value += pledgeValue;
}

const toggleBookmark = () => {
    if (monitorLabel.innerText === 'Bookmark') {
        monitorLabel.innerText = 'Bookmarked';
    } else {
        monitorLabel.innerText = 'Bookmark';
    }
}

const updateMainRemaining = () => {
    const name = [...itemNames].find(itemName => {
        return itemName.innerText === labelName;
    });
    if (name) {
        const left = name.closest(".main__about-item").querySelector(".main__about-number");
        left.innerText = Number(left.innerText.trim()) - 1;
    }
}

navBtn.addEventListener("click", toggleNav)

main.addEventListener("click", e => {
    if (e.target.classList.contains("main__monitor-checkbox")) {
        toggleBookmark();
    }
    if (e.target.classList.contains("main__monitor-btn")) {
        dialog.showModal();
        triggerBtn = e.target;
    }
    if (e.target.classList.contains("main__about-btn")) {
        triggerBtn = e.target;
        dialog.showModal();
        openModalWithItemChecked(e.target.closest(".main__about-item").querySelector(".main__about-name").innerText);
        togglePledgeForm();
    }
})

dialog.addEventListener("click", e => {
    if (e.target.classList.contains("dialog__project-btn")) {
        removePledgeForm();
        form.reset();
        dialog.close();
        triggerBtn.focus();
    }

    if (e.target.classList.contains("dialog__form-checkbox")) {
        togglePledgeForm();
    }

    if (e.target.classList.contains("dialog__form-btn")) {
        e.preventDefault();
        const input = e.target.closest(".dialog__form-fields").querySelector(".dialog__form-input")
        if (!input.reportValidity()) {
            return;
        }
        const remaining = e.target.closest(".dialog__form-item").querySelector(".dialog__form-remaining > b");
        if (remaining) {
            numberLeft = Number(remaining.innerText.trim()) - 1;
            remaining.innerText = numberLeft;
        }
        pledgeValue = Number(input.value);
        labelName = e.target.closest(".dialog__form-item").querySelector(".dialog__form-label > b").innerText.trim();
        removePledgeForm();
        toggleDialogSection();
    }

    if (e.target.classList.contains("dialog__support-btn")) {
        form.reset();
        dialog.close();
        updateMainRemaining();
        updateStats();
        toggleDialogSection();
    }
})

desktopViewport.addEventListener("change", () => {
    if (desktopViewport.matches) {
        nav.removeAttribute("aria-hidden");
        document.querySelector(".main__monitor-details").innerText = 'A beautiful & handcrafted monitor stand to reduce neck and eye strain.';
        monitorLabel.classList.remove("sr--only");
    } else {
        nav.setAttribute("aria-hidden", "true");
        document.querySelector(".main__monitor-details").innerText = 'A beautifully handcrafted monitor stand to reduce neck and eye strain.';
        monitorLabel.classList.add("sr--only");
    }
    navBtn.setAttribute("aria-expanded", "false");
    navBtn.setAttribute("aria-label", "Open menu");
    navBtn.innerHTML = `<img src="./images/icon-hamburger.svg" alt="" width="16" height="15" class="header__menu-icon" aria-hidden="true" />`;
})

if (desktopViewport.matches) {
    nav.removeAttribute("aria-hidden");
    monitorLabel.classList.remove("sr--only");    
} else {
    nav.setAttribute("aria-hidden", "true");
    monitorLabel.classList.add("sr--only");
}

