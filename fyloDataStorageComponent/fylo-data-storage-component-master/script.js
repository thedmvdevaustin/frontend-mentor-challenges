const input = document.querySelector("input");
changeBackground();

input.addEventListener("input", function(e) {
    changeBackground();
    const left = document.querySelector("b");
    const used = document.querySelector("strong");
    used.innerHTML = `${input.value} GB`;
    left.innerHTML = `${input.max - input.value}`;
});

function changeBackground() {
    const percentage = (input.value / input.max) * 100;
    input.style.background = `linear-gradient(to right, hsl(6, 100%, 80%), hsl(335, 100%, 65%) ${percentage - 1}%, hsl(229, 57%, 11%) ${percentage}%)`;
} 


