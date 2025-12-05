const headerNav = document.querySelector(".header__nav");
const sidebarContainer = document.querySelector(".sidebarContainer");
const menuBtn = document.querySelector(".header__button");
const closeBtn = document.querySelector(".sidebar__close");
const mainContainer = document.querySelector(".mainContainer");
const headerContainer = document.querySelector(".headerContainer");

menuBtn.addEventListener("click", function(e) {
    sidebarContainer.style.display = "grid";
    mainContainer.style.justifySelf = "flex-start"    
    headerContainer.style.justifySelf = "flex-start"    
})

closeBtn.addEventListener("click", function(e) {
    sidebarContainer.style.display = "none";
    headerNav.style.display = "none";
    headerContainer.style.justifySelf = "center"    
    mainContainer.style.justifySelf = "center"    
})