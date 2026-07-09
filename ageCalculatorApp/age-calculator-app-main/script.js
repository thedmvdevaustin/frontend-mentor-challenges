const form = document.querySelector(".calculator__form");
const inputs = form.querySelectorAll('input');

const isInputValid = input => {
    if (input.value === '' || parseInt(input.value) < parseInt(input.min) || parseInt(input.value) > parseInt(input.max)) {
        input.nextElementSibling.style.opacity = '1';
        input.nextElementSibling.removeAttribute("aria-hidden");
        input.setAttribute("aria-invalid", "true");
    }
    if (input.value === '') {
        input.nextElementSibling.textContent = 'This field is required';
        return;
    }
    if (parseInt(input.value) < parseInt(input.min) || parseInt(input.value) > parseInt(input.max)) {
        if (input.id!=='year') {
            input.nextElementSibling.textContent = `Must be a valid ${input.id}`;
        } else {
            input.nextElementSibling.textContent = `Must be in the past`;
        }
    }
}

const touched = new WeakSet();

inputs.forEach(input => {
    input.addEventListener("blur", () => {
        isInputValid(input);
        touched.add(input);
    })
    input.addEventListener("input", () => {
    if (touched.has(input)) {
            input.nextElementSibling.setAttribute("aria-hiden", "true");
            input.removeAttribute("aria-invalid");
            input.nextElementSibling.style.opacity = '0';
        }
    })
})

const isValidDate = (month, day, year) => {
    const date = new Date();
    if ((year === date.getFullYear() && (month > date.getMonth() + 1 || (month === date.getMonth()+ 1 && day >= date.getDay()) ) ) ) {
        return false;
    }
    if (year < date.getFullYear()) {
        if ((month <= 7 && (month===2 && day > 28) || (month%2===0 && day > 30) || (month%2===1 && day > 31)) || (month > 7 && (month%2===0 && day > 31) || (month%2===1 && day > 30))) {
            return false;
        }
    }
    return true;
}


form.addEventListener("submit", e => {
    e.preventDefault();
    const formData = new FormData(form);
    const date = new Date();
    const day = parseInt(formData.get("day"));
    const month = parseInt(formData.get("month"));
    const year = parseInt(formData.get("year"));
    if (isValidDate(month, day, year)) {
        const listItem = document.querySelectorAll(".calculator__list-item");
            for (const [index, item] of listItem.entries()) {
                if (!index) {
                    item.querySelector("em").textContent = `${Math.abs(date.getFullYear() - year)}`
                } else if (index === 1) {
                    item.querySelector("em").textContent = `${Math.abs(date.getMonth() + 1 - month)}`
                } else {
                    item.querySelector("em").textContent = `${Math.abs(date.getDate() - day)}`
                }
            }
    } else {
        inputs.forEach((input, index) => {
            index===0 ? input.nextElementSibling.textContent = 'Must be a valid date' : 0;
            index===0 ? input.nextElementSibling.style.opacity = '1' : 0;
            index===0 && input.focus();
            index===0 && input.nextElementSibling.removeAttribute("aria-hidden");
            input.setAttribute("aria-invalid", "true");
            
        })
    }
})