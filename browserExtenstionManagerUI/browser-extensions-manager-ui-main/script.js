//GLOBAL VARIABLES
const activeBtnsContainer = document.querySelector(".toggle-btns");
const toggleThemeBtn = document.querySelector(".toggle-theme");
const extensionList = document.querySelector(".extensions")
/*

FUNCTIONS


*/

//GET DATA FROM .JSON; STORE IN ARRAY
document.addEventListener("DOMContentLoaded", async function() {
    try {
        const response = await fetch('./data.json');
        if (!response.ok) {
            console.log("Network failed fetch");
        };
        const extensions = await response.json();
        extensions.forEach((extension, i) => {
            createExtension(extension, i);
        });
    } catch(error){
        console.error(`Error ${error}`)
    }
})

//SHOW ACTIVE EXTENSIONS FUNCTION
function showActiveExtensions() {
    const articles = document.querySelectorAll(".extension");
    articles.forEach(article => {
        if (article.lastElementChild.lastElementChild.firstElementChild.checked) {
            article.style.display = "grid"
        } else {
            article.style.display = "none";
        }
    })
};

//SHOW INACTIVE EXTENSIONS FUNCTION
function showInactiveExtensions() {
    const articles = document.querySelectorAll(".extension");
    articles.forEach(article => {
        if (article.lastElementChild.lastElementChild.firstElementChild.checked) {
            article.style.display = "none"
        } else {
            article.style.display = "grid";
        }
    })
};

//SHOW ALL EXTENSIONS FUNCTION
function showAllExtensions() {
    const articles = document.querySelectorAll(".extension");
    articles.forEach(article => {
        article.style.display = "grid"
    })
};

//CREATE EXTENSION FUNCTION
function createExtension(extension, i) {
    const extensionsList = document.querySelector(".extensions");
    extensionsList.innerHTML += `
        <article class="extension shadow">
            <section class="extension__flex">
                <img src="${extension.logo}" alt="#" width="60" height="60" class="extension__icon" />
                <section class="extension__grid">
                <h2 class="extension__title">
                    ${extension.name}
                </h2>
                <p class="extension__description">
                    ${extension.description}
                </p>
                </section>
            </section>
            <div class="extension__btns">
                <button class="remove">Remove</button>
                <div class="extension__toggle-container">
                <input ${extension.isActive ? "checked" : ""} type="checkbox" id="toggle-active-${i}">
                <label class="${extension.isActive ? "red--bg-light" : ""}" tabindex="0" for="toggle-active-${i}"></label>
                </div>
            </div>
        </article>`;
    return;
};
// TOGGLE ACTIVE BUTTON FUNCTION
function toggleActive(target) {
    const inputs = document.querySelectorAll("input");
    const themeIcon = document.querySelector(".theme-icon")
    inputs.forEach(input => {
        if (input===target){
            if (input.checked===false){
                input.setAttribute("checked", "");
                if (themeIcon.src.endsWith("moon.svg")){
                    input.nextElementSibling.classList.toggle("red--bg-light");
                } else {
                    input.nextElementSibling.classList.toggle("red--bg-dark");
                    input.nextElementSibling.classList.toggle("toggle-dark-inactive--bg-color");
                }
            } else {
                input.removeAttribute("checked");
                if (themeIcon.src.endsWith("moon.svg")){
                    input.nextElementSibling.classList.toggle("red--bg-light");
                } else {
                    input.nextElementSibling.classList.toggle("red--bg-dark");
                    input.nextElementSibling.classList.toggle("toggle-dark-inactive--bg-color");
                }
            };

        };
    });
};

// REMOVE BUTTON FUNCTION
function removeExtension(target){
    const removeBtns = document.querySelectorAll(".remove");
    removeBtns.forEach(removeBtn => {
        if (removeBtn===target){
            console.log(removeBtn.parentElement.parentElement.parentElement)
            console.log(removeBtn)
            removeBtn.parentElement.parentElement.parentElement.removeChild(removeBtn.parentElement.parentElement);
        };
    });
};

/*


EVENT LISTENERS


*/


//ALL/ACTIVE/INACTIVE EVENT LISTENERS
activeBtnsContainer.addEventListener("click", function(e){
    const extensionsListBtns = document.querySelectorAll(".showBtn");
    const themeIcon = document.querySelector(".theme-icon");
    if (e.target.textContent.trim()==='Active'){
        extensionsListBtns.forEach(extensionsListBtn => {
            if (extensionsListBtn===e.target) {
                if (themeIcon.src.endsWith("moon.svg")){
                    extensionsListBtn.classList.add("red--bg-light");
                    extensionsListBtn.classList.add("font--light");
                } else {
                    extensionsListBtn.classList.add("red--bg-dark");
                    extensionsListBtn.classList.remove("font--light");
                }
            } else {
                if (themeIcon.src.endsWith("moon.svg")){
                    extensionsListBtn.classList.remove("red--bg-light");
                    extensionsListBtn.classList.remove("font--light");
                } else {
                    extensionsListBtn.classList.remove("red--bg-dark");
                    extensionsListBtn.classList.add("font--light");
                }
            }
        })
        showActiveExtensions();
    }
    if (e.target.textContent.trim()==='Inactive'){
        extensionsListBtns.forEach(extensionsListBtn => {
            if (extensionsListBtn===e.target) {
                if (themeIcon.src.endsWith("moon.svg")){
                    extensionsListBtn.classList.add("red--bg-light");
                    extensionsListBtn.classList.add("font--light");
                } else {
                    extensionsListBtn.classList.add("red--bg-dark");
                    extensionsListBtn.classList.remove("font--light");
                }
            } else {
                if (themeIcon.src.endsWith("moon.svg")){
                    extensionsListBtn.classList.remove("red--bg-light");
                    extensionsListBtn.classList.remove("font--light");
                } else {
                    extensionsListBtn.classList.remove("red--bg-dark");
                    extensionsListBtn.classList.add("font--light");
                }
            }
        })
        showInactiveExtensions();
    }
    if (e.target.textContent.trim()==='All'){
        extensionsListBtns.forEach(extensionsListBtn => {
            if (extensionsListBtn===e.target) {
                if (themeIcon.src.endsWith("moon.svg")){
                    extensionsListBtn.classList.add("red--bg-light");
                    extensionsListBtn.classList.add("font--light");
                } else {
                    extensionsListBtn.classList.add("red--bg-dark");
                    extensionsListBtn.classList.remove("font--light");
                }
            } else {
                if (themeIcon.src.endsWith("moon.svg")){
                    extensionsListBtn.classList.remove("red--bg-light");
                    extensionsListBtn.classList.remove("font--light");
                } else {
                    extensionsListBtn.classList.remove("red--bg-dark");
                    extensionsListBtn.classList.add("font--light");
                }
            }
        })
        showAllExtensions();
    }
})

//DARK MODE/LIGHT MODE EVENT LISTENER
toggleThemeBtn.addEventListener("click", function(e){
    const body = document.querySelector("body");
    const header = document.querySelector("header");
    const logo = document.querySelector("svg");
    const h1 = document.querySelector("h1");
    const toggleBtns = document.querySelectorAll(".showBtn");
    const extensions = document.querySelectorAll("article");
    const h2 = document.querySelectorAll("h2");
    const p = document.querySelectorAll("p");
    const removeBtns = document.querySelectorAll(".remove");
    const toggleActiveBtns = document.querySelectorAll("label");
    if (this.firstElementChild.src.endsWith('moon.svg')){
        this.firstElementChild.src = './assets/images/icon-sun.svg';
        this.classList.toggle("toggle--bg");
        body.classList.toggle("body-bg--dark");
        header.classList.toggle("bg--dark");
        header.classList.toggle("shadow");
        logo.firstElementChild.firstElementChild.style.fill = 'var(--clr-red-400)'
        logo.firstElementChild.nextElementSibling.style.fill = 'var(--clr-neutral-0)'
        h1.classList.toggle("font--light");
        toggleBtns.forEach(toggleBtn => {
            toggleBtn.classList.toggle("shadow");
            toggleBtn.classList.toggle("bg--dark");
            toggleBtn.classList.toggle("font--light");
            toggleBtn.classList.toggle("border--dark");
            if (toggleBtn.classList.contains("red--bg-light")){
                toggleBtn.classList.toggle("red--bg-light");
                toggleBtn.classList.toggle("red--bg-dark")
            }
        });
        extensions.forEach(extension => {
            extension.classList.toggle("shadow");
            extension.classList.toggle("bg--dark");
            extension.classList.toggle("border--dark");
        });
        h2.forEach(title => {
            title.classList.toggle("font--light");
        });
        p.forEach(description => {
            description.classList.toggle("p--font-color");
        });
        removeBtns.forEach(removeBtn => {
            removeBtn.classList.toggle("bg--dark");
            removeBtn.classList.toggle("border--dark");
            removeBtn.classList.toggle("font--light")
        });
        toggleActiveBtns.forEach(toggleActiveBtn => {
            if (toggleActiveBtn.previousElementSibling.checked) {
                toggleActiveBtn.classList.toggle("red--bg-dark");
                toggleActiveBtn.classList.toggle("red--bg-light");
            } else {
                toggleActiveBtn.classList.toggle("toggle-dark-inactive--bg-color")
            }
        });
        
    } else {
        this.firstElementChild.src = './assets/images/icon-moon.svg';
        this.classList.toggle("toggle--bg");
        body.classList.toggle("body-bg--dark");
        header.classList.toggle("bg--dark");
        header.classList.toggle("shadow");
        logo.firstElementChild.firstElementChild.style.fill = '#C7231A';
        logo.firstElementChild.nextElementSibling.style.fill = '#091540';
        h1.classList.toggle("font--light");
        toggleBtns.forEach(toggleBtn => {
            toggleBtn.classList.toggle("shadow");
            toggleBtn.classList.toggle("bg--dark");
            toggleBtn.classList.toggle("font--light");
            toggleBtn.classList.toggle("border--dark");
            if (toggleBtn.classList.contains("red--bg-dark")){
                toggleBtn.classList.toggle("red--bg-light");
                toggleBtn.classList.toggle("red--bg-dark")
            }
        });
        extensions.forEach(extension => {
            extension.classList.toggle("shadow");
            extension.classList.toggle("bg--dark");
            extension.classList.toggle("border--dark");
        });
        h2.forEach(title => {
            title.classList.toggle("font--light");
        });
        p.forEach(description => {
            description.classList.toggle("p--font-color");
        });
        removeBtns.forEach(removeBtn => {
            removeBtn.classList.toggle("bg--dark");
            removeBtn.classList.toggle("border--dark");
            removeBtn.classList.toggle("font--light")
        });
        toggleActiveBtns.forEach(toggleActiveBtn => {
            if (toggleActiveBtn.previousElementSibling.checked) {
                toggleActiveBtn.classList.toggle("red--bg-dark");
                toggleActiveBtn.classList.toggle("red--bg-light");
            } else {
                toggleActiveBtn.classList.toggle("toggle-dark-inactive--bg-color")
            }
        });
    }
})

//TOGGLE ACTIVE BTN EVENT LISTENER
extensionList.addEventListener("click", function(e) {
    if (e.target.classList.contains("remove")) {
        removeExtension(e.target);
    };
    if (e.target.type==="checkbox") {
        toggleActive(e.target);
    };
});