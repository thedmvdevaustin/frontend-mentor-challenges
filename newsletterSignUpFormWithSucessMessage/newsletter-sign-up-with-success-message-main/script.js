const input = document.querySelector(".form__input");
const image = document.querySelector(".newsletter__img");
const section = document.querySelector(".newsletter__updated");
const main = document.querySelector("main");
const form = document.querySelector(".newsletter__form");

const isValidEmail = email => {
    return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email.trim());
}

const touched = new WeakSet();

input.addEventListener("blur", () => {
    if (!isValidEmail(input.value)) {
        input.previousElementSibling.hidden = false;
        input.setAttribute("aria-invalid", "true");
    } else {
        input.previousElementSibling.hidden = true;
        input.removeAttribute("aria-invalid");
    }
    touched.add(input);
})

input.addEventListener("input", () => {
    if (touched.has(input)) {
        input.previousElementSibling.hidden = true;
        input.removeAttribute("aria-invalid");
    }
})

main.addEventListener("click", e => {
    if ((e.target.previousElementSibling.classList.contains("form__input-container") && isValidEmail(input.value)) || (image.hidden === true)) {
        for(const child of main.children) {
            if (child.hidden === true) {
                child.hidden = false;
            } else {
                child.hidden = true;
            }
        }
        main.classList.toggle("newsletter");
        main.classList.toggle("success");
    }
})

form.addEventListener("submit", e => {
    e.preventDefault();
    if (isValidEmail(input.value)) {
        const formData = new FormData(form);
        const email = formData.get("email");
        const em = document.querySelector("em");
        em.textContent = email;
        form.reset();
    }
})