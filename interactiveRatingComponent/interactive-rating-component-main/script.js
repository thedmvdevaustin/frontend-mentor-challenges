const ratingsContainer = document.querySelector(".rating-component__ratings");
const submitBtn = document.querySelector(".rating-component__submit");
const ratingBtns = document.querySelectorAll(".rating-component__btn");

ratingsContainer.addEventListener("click", function(e){
    if (e.target.classList.contains("rating-component__btn")){
        ratingBtns.forEach(rating => {
            if (rating.textContent===e.target.textContent){
                rating.style.backgroundColor = 'var(--clr-orange)';
            } else {
                rating.style.backgroundColor = 'var(--clr-dark-blue-400)'
            };
        });
    };
});

submitBtn.addEventListener("click", function(){
    ratingBtns.forEach(rating => {
        if (rating.style.backgroundColor==='var(--clr-orange)'){
            document.querySelector(".rating-component").style.display = 'none';
            const thankYouComponent = document.querySelector(".thankYou-component")
            thankYouComponent.style.display = 'block';
            thankYouComponent.firstElementChild.nextElementSibling.textContent = `You selected ${rating.textContent} out of 5`
        };
    });
});

