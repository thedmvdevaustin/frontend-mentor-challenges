const submitBtn = document.querySelector(".component__btn");
const inputs = document.querySelectorAll(".component__input");

submitBtn.addEventListener("click", function(){
    const validEmail = /^(?!.*\.\.)[a-zA-Z0-9](\.?[a-zA-Z0-9_-])*@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/;
    inputs.forEach(input => {
        if (input.value===""){
            input.previousElementSibling.style.display = "block";
            input.nextElementSibling.style.display = "block";
            input.style.border = "1px solid var(--clr-red)"
        } else {
            input.previousElementSibling.style.display = "none";
            input.nextElementSibling.style.display = "none";
            input.style.borderColor = "hsla(300, 2%, 80%, 0.8)";
        }
        if (input.type==='email'){
            console.log("made it")
            if (!validEmail.test(input.value)){
                input.previousElementSibling.style.display = "block";
                input.nextElementSibling.style.display = "block";
                input.style.border = "1px solid var(--clr-red)";
            } else {
                input.previousElementSibling.style.display = "none";
                input.nextElementSibling.style.display = "none";
                input.style.borderColor = "hsla(300, 2%, 80%, 0.8)";
                
            }
        };
    });
});