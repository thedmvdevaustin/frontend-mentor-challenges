const slider = document.querySelector(".form__range");
const checkbox = document.querySelector(".form__checkbox");
const form = document.querySelector(".main__form");

const updateSlider = (title, price) => {
    switch(slider.value) {
        case '1': {
            let total = 8.00;
            title.textContent = '10K pageviews';
            if (checkbox.checked) {
                total*=.25;
            }
            price.textContent = `$${total.toFixed(2)}`;
            break;
        }
        case '2': {
            let total = 12.00;
            title.textContent = '50K pageviews';
            if (checkbox.checked) {
                total*=.25;
            }
            price.textContent = `$${total.toFixed(2)}`;
            break;
        }
        case '3': {
            let total = 16.00;
            title.textContent = '100K pageviews';
            if (checkbox.checked) {
                total*=.25;
            }
            price.textContent = `$${total.toFixed(2)}`;
            break;
        }
        case '4': {
            let total = 24.00;
            title.textContent = '500K pageviews';
            if (checkbox.checked) {
                total*=.25;
            }
            price.textContent = `$${total.toFixed(2)}`;
            break;
        }
        case '5': {
            let total = 36.00;
            title.textContent = '1M pageviews';
            if (checkbox.checked) {
                total*=.25;
            }
            price.textContent = `$${total.toFixed(2)}`;
            break;
        }
    }
    let percent = (slider.value - slider.min) / (slider.max - slider.min) * 100;
    slider.style.setProperty("--percent", `${percent}%`);
}

const updateCheckbox = (price) => {
    switch(slider.value) {
        case '1': {
            let total = 8.00;
            if (checkbox.checked) {
                total*=.25;
            }
            price.textContent = `$${total.toFixed(2)}`;
            break;
        }
        case '2': {
            let total = 12.00;
            if (checkbox.checked) {
                total*=.25;
            }
            price.textContent = `$${total.toFixed(2)}`;
            break;
        }
        case '3': {
            let total = 16.00;
            if (checkbox.checked) {
                total*=.25;
            }
            price.textContent = `$${total.toFixed(2)}`;
            break;
        }
        case '4': {
            let total = 24.00;
            if (checkbox.checked) {
                total*=.25;
            }
            price.textContent = `$${total.toFixed(2)}`;
            break;
        }
        case '5': {
            let total = 36.00;
            if (checkbox.checked) {
                total*=.25;
            }
            price.textContent = `$${total.toFixed(2)}`;
            break;
        }
    }
}

form.addEventListener("input", e => {
    let title = form.querySelector(".main__title");
    let price = form.querySelector(".form__price");
    if (e.target === slider) {
        updateSlider(title, price)
    }
    if (e.target === checkbox) {
        updateCheckbox(price);
    }
})

window.addEventListener("resize", e => {
    if (window.innerWidth >= 1024) {
        document.querySelector("em").textContent = '25% discount';
    } else {
        document.querySelector("em").textContent = '-25%';
    }
})