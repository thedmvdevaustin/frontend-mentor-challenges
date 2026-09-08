const form = document.querySelector(".calculator__form");
const inputs = document.querySelectorAll('input[type="number"]');
const resetBtn = document.querySelector(".results__btn");

const textInputs = [...inputs].filter(input => !input.classList.contains('calculator__text-input'));
textInputs.forEach((textInput, index) => {
    textInput.addEventListener("blur", () => {
        if (textInput.value === '0') {
            const p = textInput.nextElementSibling;
            p.setAttribute("aria-hidden", "false");
        }
    })
    textInput.addEventListener("input", e => {
        if (textInput.value !=='0') {
            const p = textInput.nextElementSibling;
            p.setAttribute("aria-hidden", "true");
        }
    })
})

form.addEventListener("change", e => {
    e.preventDefault();
    const formData = new FormData(form);
    const bill = Number(formData.get("bill"));
    const tip = Number(formData.get("tip"));
    const custom = Number(formData.get("custom"));
    const people = Number(formData.get("people"));
    if (!bill || (!tip && !custom) || !people) {
        return;
    }
    const newTip = custom ? custom / 100 : tip;
    const tipAmount = ((bill * newTip) / people);
    const total = (((bill * newTip) + bill) / people);
    document.querySelector("#amount").innerHTML = `&dollar;${Math.trunc(tipAmount * 100) / 100}`;
    document.querySelector("#total").innerHTML = `&dollar;${Math.ceil(total*100) / 100}`;
})

resetBtn.addEventListener("click", () => {
    form.reset();
    document.querySelectorAll(".results__number").forEach(number => {
        number.innerHTML = `&dollar;0.00`;
    })
})