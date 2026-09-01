const clearBtn = document.querySelector(".main__btn");
const form = document.querySelector(".main__form");
const amount = document.querySelector("#amount");
const term = document.querySelector("#term");
const rate = document.querySelector("#rate");
const prices = document.querySelectorAll("b");
const empty = document.querySelector(".empty");
const results = document.querySelector(".results");
const mortgageOptions = form.elements.mortgage;

const monthlyRepayments = (interestRate, term, amount) => {
    let monthlyRate = (interestRate*.01)/12;
    monthlyRate = Number(monthlyRate.toFixed(6));
    const numOfPayments = term*12;
    return amount * ((monthlyRate*(1+monthlyRate)**numOfPayments)/((1+monthlyRate)**numOfPayments - 1));
}

const showError = (element) => {
    const inputContainer = element.type === 'radio' ? element.closest("fieldset") : element.parentElement;
    const error = inputContainer.querySelector("p");
    error.setAttribute("aria-hidden", "false");
}

const setSuccess = (element) => {
    const inputContainer = element.type === 'radio' ? element.closest("fieldset") : element.parentElement;
    const error = inputContainer.querySelector("p");
    error.setAttribute("aria-hidden", "true");

}

form.querySelectorAll("input").forEach(input => {
    if (input.type === 'radio') {
        input.addEventListener("change", () => {
            setSuccess(input);
        })
    } else {
        input.addEventListener("blur", () => {
            if (input.value === '') {
                showError(input);
            }
        })
        input.addEventListener("input", () => {
            if (input.value === '') return;
            setSuccess(input);
        })
    }
})

const isValidInputs = () => {
    let valid = true;
    if (amount.value === '') {
        showError(amount);
        valid = false;
    }
    if (term.value === '') {
        showError(term);
        valid = false;
    }
    if (rate.value === '') {
        showError(rate);
        valid = false;
    }
    const isOneSelected = [...mortgageOptions].some(radio => radio.checked);
    if (!isOneSelected) {
        showError(mortgageOptions[0]);
        valid = false;
    }
    return valid;
}

const showResults = () => {
    const formData = new FormData(form);
    const rate = Number(formData.get("rate"));
    const amount = Number(formData.get("amount").replace(/,/, ""));
    const term = Number(formData.get("term"));
    const monthly = monthlyRepayments(rate, term, amount);
    const termPayment = monthly * (term*12);
    empty.hidden = true;
    empty.classList.remove("show")
    results.classList.add("show");
    results.hidden = false;
    prices.forEach((price, index) => {
        if (!index) {
            price.innerHTML = `&pound;${new Intl.NumberFormat('en-US').format(monthly.toFixed(2))}`;
        } else {
            price.innerHTML = `&pound;${new Intl.NumberFormat('en-US').format(termPayment.toFixed(2))}`;
        }
    })
}

const showEmpty = () => {
    empty.hidden = false;
    empty.classList.add("show")
    results.classList.remove("show");
    results.hidden = true;
}



form.addEventListener("submit", e => {
    e.preventDefault();
    if (isValidInputs()) {
        showResults();
    } else {
        showEmpty();
    }
})

clearBtn.addEventListener("click", () => {
    form.reset();
    showEmpty();
    setSuccess(amount);
    setSuccess(term);
    setSuccess(rate);
    setSuccess(mortgageOptions[0]);
});