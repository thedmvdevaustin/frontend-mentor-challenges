const form = document.querySelector(".card__form");
const inputs = document.querySelectorAll(".card__form-input");
const completed = document.querySelector(".completed");
const completedBtn = document.querySelector(".completed__btn");
const isNameError = (name) => {
    const input = document.querySelector('#name');
    const inputError = document.querySelector("#error-name");
    if (!name) {
        return showError(input, inputError, "Can't be blank");
    }
}

const isNumberError = (number) => {
    const input = document.querySelector('#number')
    const inputError = document.querySelector("#error-cc-number");
    if (!number) {
        return showError(input, inputError, "Can't be blank");
    }
    if (/\D/.test(number)) {
        return showError(input, inputError, "Wrong format, numbers only");
    }
    if (number.length !== 16) {
        return showError(input, inputError, "invalid card number") ;
    }
}

const isMonthError = (month) => {
    const input = document.querySelector('#month')
    const inputError = document.querySelector("#error-expiration");
    if (!month) {
        return showError(input, inputError, "Can't be blank");
    }
    if (/\D/.test(month)) {
        return showError(input, inputError, "Wrong format, numbers only");
    }
    if ((month.length !== 2) || (Number(month) < 1 || Number(month) > 12)) {
        return showError(input, inputError, "invalid exp date") ;
    }
}

const isYearError = (year) => {
    const input = document.querySelector('#year')
    const inputError = document.querySelector("#error-expiration");
    if (!year) {
        return showError(input, inputError, "Can't be blank");
    }
    if (/\D/.test(year)) {
        return showError(input, inputError, "Wrong format, numbers only");
    }
    if ((year.length !== 2) || (Number(year) < 1 || Number(year) > 99)) {
        return showError(input, inputError, "invalid exp date") ;
    }
}
const isCvcError = (cvc) => {
    const input = document.querySelector('#cvc')
    const inputError = document.querySelector("#error-cvc")
    if (!cvc) {
        return showError(input, inputError, "Can't be blank");
    }
    if (/\D/.test(cvc)) {
        return showError(input, inputError, "Wrong format, numbers only");
    }
    if (cvc.length !== 3) {
        return showError(input, inputError, "invalid cvc number") ;
    }
}

const showError = (field, errorField, errorMessage) => {
    errorField.innerHTML = errorMessage;
    errorField.removeAttribute("aria-hidden");
    field.setAttribute("aria-invalid", "true");
    return false;
}

const removeError = (field, errorField) => {
    field.removeAttribute("aria-invalid");
    errorField.setAttribute("aria-hidden", "true");
}

let notError = true;notError = 
inputs.forEach(input => {
    input.addEventListener("input", e => {
        if (e.target.getAttribute("id") === 'name') {
            const p = document.querySelector(".card__info-name");
            const inputError = document.querySelector("#error-name");
            p.innerHTML = e.target.value;
            if (!notError) {
                removeError(e.target, inputError);
                notError = true;
            }
        }
        if (e.target.getAttribute("id") === 'number') {
            const p = document.querySelector(".card__front-number");
            const inputError = document.querySelector("#error-cc-number");
            p.innerHTML = e.target.value;
            if (!notError) {
                removeError(e.target, inputError);
                notError = true;
            }
        }
        if (e.target.getAttribute("id") === 'month') {
            const p = document.querySelector(".card__info-expiration");
            const inputError = document.querySelector("#error-expiration");
            p.innerHTML = `${e.target.value}/00`;
            if (!notError) {
                removeError(e.target, inputError);
                notError = true;
            }
        }
        if (e.target.getAttribute("id") === 'year') {
            const p = document.querySelector(".card__info-expiration");
            const inputError = document.querySelector("#error-expiration");
            p.innerHTML = `00/${e.target.value}`;
            if (!notError) {
                removeError(e.target, inputError);
                notError = true;
            }
        }
        if (e.target.getAttribute("id") === 'cvc') {
            const p = document.querySelector(".card__cvc");
            const inputError = document.querySelector("#error-cvc");
            p.innerHTML = e.target.value;
            if (!notError) {
                removeError(e.target, inputError);
                notError = true;
            }
        }
    })
    input.addEventListener("blur", e => {
        if (e.target.getAttribute("id") === 'name') {
            notError = isNameError(e.target.value);
        }
        if (e.target.getAttribute("id") === 'number') {
            notError = isNumberError(e.target.value.replace(/\s/g, ''));
        }
        if (e.target.getAttribute("id") === 'month') {
            notError = isMonthError(e.target.value.replace(/\s/g, ''));
        }
        if (e.target.getAttribute("id") === 'year') {
            notError = isYearError(e.target.value.replace(/\s/g, ''));
        }
        if (e.target.getAttribute("id") === 'cvc') {
            notError = isCvcError(e.target.value.replace(/\s/g, ''));
        }
    })
})

form.addEventListener("submit", e => {
    e.preventDefault();
    const formData = new FormData(form);
    const name = formData.get("name");
    const number = formData.get("number").replace(/\s/g, '');
    const month = formData.get("month").replace(/\s/g, '');
    const year = formData.get("year").replace(/\s/g, '');
    const cvc = formData.get("cvc").replace(/\s/g, '');
    if (!name || !number || !month || !year || !cvc) {
        notError = isNameError(name);
        notError = isNumberError(number);
        notError = isMonthError(month);
        notError = isYearError(year);
        notError = isCvcError(cvc);
        return;
    }
    document.querySelector(".card__info-name").innerHTML = 'Jane Appleseed'
    document.querySelector(".card__front-number").innerHTML = '0000 0000 0000 0000'
    document.querySelector(".card__info-expiration").innerHTML = '00/00'
    document.querySelector(".card__cvc").innerHTML = '000'
    completed.classList.add("show");
    completed.hidden = false;
    form.classList.add("hide");
    form.hidden = true;
    form.reset();
})

completedBtn.addEventListener("click", () => {
    completed.classList.remove("show");
    completed.hidden = true;
    form.classList.remove("hide");
    form.hidden = false;
})