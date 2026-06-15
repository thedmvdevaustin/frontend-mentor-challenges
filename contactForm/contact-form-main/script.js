const form = document.querySelector(".contact__form");
const isValidEmail = (email) => {
    return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email.trim());
}

const updateValidationState = (field) => {
    const fieldElement = field.type === 'radio' ? field.closest('fieldset').querySelector("p") : field.closest('div').querySelector('p');
    if (field.validity.valid) {
        fieldElement.style.display = "none";
        if (field.type !== 'radio') field.removeAttribute("aria-invalid");
        return true;
    }
    fieldElement.style.display = "block";
    if (field.type !== 'radio') field.setAttribute("aria-invalid", true);
    return false;
}

form.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener("blur", () => {
        if ((field.type === 'email' && !isValidEmail(field.value))) {
            field.nextElementSibling.style.display = "block";
            field.setAttribute("aria-invalid", true);
        } else {
            updateValidationState(field);
        }
    })

    field.addEventListener("input", () => {
        if (field.value === "") return;
        if (field.type !== "email") {
            updateValidationState(field);
        }
    })
})

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fields = form.querySelectorAll('input, textarea');
    let isValid = true;
    fields.forEach(field => {
        if (!updateValidationState(field)) {
            isValid = false;
        }
    })
    console.log(isValid);
    if (isValid) {
        form.reset();
        const div = document.querySelector('.contact__toast');
        div.innerHTML = `<section class="contact__toast-message">
        <div class="contact__container">
          <img src="./assets/images/icon-success-check.svg" alt="" width="20" height="21" class="contact__img">
          <h2 id="toast-title" class="contact__toast-title">
            Message Sent!
          </h2>
        </div>
        <p class="contact__toast-description">
          Thanks for completing the form. We'll be in touch soon!
        </p>
      </section>`;
      div.classList.remove('visually-hidden');
      setTimeout(() => {
        div.classList.add('visually-hidden');
      }, 9000);
    } else if (isValid) {
        form.querySelector(":invalid").focus();
    }
})

