const dialog = document.querySelector("#dialog");
const shareBtn = document.querySelector(".component__share-btn");
const componentContact = document.querySelector(".component__contact");
const componentLinks = document.querySelector(".links");
const componentInfo = document.querySelector(".flex");

shareBtn.addEventListener("click", function(e){
    if (window.innerWidth < 900){
        if (componentLinks.getAttribute("style")=='display: flex'){
            console.log("works")
            componentLinks.style.display = 'none';
            componentInfo.style.display = 'flex';
            shareBtn.firstElementChild.firstElementChild.style.display = '6E8098';
        }
        componentContact.classList.toggle("component__contact--bg-dark-grayish-blue");
        if (componentInfo.style.display=='none') {
            componentInfo.style.display = 'flex';
            componentLinks.style.display = 'none';
            shareBtn.firstElementChild.firstElementChild.style.fill = '#6E8098';
            shareBtn.style.backgroundColor = 'var(--clr-light-grayish-blue)'
        } else {
            componentInfo.style.display = 'none';
            componentLinks.style.display = 'flex';
            shareBtn.firstElementChild.firstElementChild.style.fill = 'white';
            shareBtn.style.backgroundColor = 'var(--clr-desaturated-dark-blue)'
        }
    } else {
        if (dialog.open){
            componentInfo.style.display= 'flex'
            componentLinks.style.display = 'none'
            shareBtn.firstElementChild.firstElementChild.style.fill = '#6E8098';
            componentContact.classList.remove("component__contact--bg-dark-grayish-blue");
            shareBtn.classList.toggle("share-btn--bg-dark-blue");
            dialog.close();
        } else {
            componentInfo.style.display= 'flex'
            componentLinks.style.display = 'none'
            componentContact.classList.remove("component__contact--bg-dark-grayish-blue")
            shareBtn.classList.toggle("share-btn--bg-dark-blue");
            shareBtn.firstElementChild.firstElementChild.style.fill = 'white';
            dialog.show();
        }
    }
});


//huge bug where if you are in active state and change the viewport
// size to another device width then the active states will start to 
// overlap the functionality of each other

//works fine otherwise