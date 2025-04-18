const input = document.querySelector("input");
const submitBtn = document.querySelector("button");
const error = document.querySelector(".error");
const errorMessage = document.querySelector(".invalidation-message");

submitBtn.addEventListener("click", function(){
    const emailRegex = /^(?!.*\.\.)[a-zA-Z0-9](\.?[a-zA-Z0-9_-])*@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/;
    if (!emailRegex.test(input.value)){
        error.style.display = "block";
        errorMessage.style.display = "block";
    } else {
        input.value = "";
    }
})