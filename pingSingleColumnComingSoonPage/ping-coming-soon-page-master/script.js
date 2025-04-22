const input = document.querySelector(".component__input");
const formBtn = document.querySelector(".component__btn");
const errorMessage = document.querySelector(".component__error-message");
console.log(errorMessage)
formBtn.addEventListener("click", function(){
    console.log(input.value==='')
    if (input.value==='') {
        errorMessage.innerText = 'Whoops! It looks like you forgot to add your email';
        errorMessage.style.display = "block";
        input.style.borderColor = 'var(--clr-light-red)';
        return;
    }
    const validEmail = /^(?!.*\.\.)[a-zA-Z0-9](\.?[a-zA-Z0-9_-])*@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/;
    if (!validEmail.test(input.value)){
        errorMessage.innerText = "Please provide a valid email address";
        if (window.innerWidth < 1024) {
            input.parentElement.parentElement.style.gap = '3rem';
        };
        if (window.innerWidth < 750) {
            input.parentElement.parentElement.style.gap = '1.5rem';
        };
        errorMessage.style.display = "block";
        input.style.borderColor = 'var(--clr-light-red)';
    } else {
        if (window.innerWidth < 1024) {
            input.parentElement.parentElement.style.gap = '1rem';
        };

        if (window.innerWidth < 750) {
            input.parentElement.parentElement.style.gap = '.5rem';
        };
        errorMessage.style.display = "none";
        input.style.borderColor = 'var(--clr-blue)';
    }
})