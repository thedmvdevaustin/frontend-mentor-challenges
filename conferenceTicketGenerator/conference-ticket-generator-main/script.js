/* BUGS 
style the ticket page in desktop

add functionality; when user submits form validation occurs if all info save all inputs and put on ticket page where they belong
*/
const form = document.querySelector(".main__ticket-form");
const mainForm = document.querySelector(".main__form");
const mainTicket = document.querySelector(".main__ticket");
const ticketFirstName = document.querySelector(".main__ticket-first")
const ticketLastName = document.querySelector(".main__ticket-last");
const ticketEmail = document.querySelector(".main__ticket-email");
const ticketleftBottomContainer = document.querySelector(".main__left-bottom");
const avatarContainer = document.querySelector(".main__avatar-container");
const avatarUploaded = document.querySelector(".main__avatar-uploaded");
const avatarDescription = document.querySelector(".main__description-container");
const avatarInput = document.querySelector("#avatar");
const avatarImg = document.querySelector(".main__uploaded-img")
const fullNameInput = document.querySelector('#name');
const emailInput = document.querySelector("#email");
const usernameInput = document.querySelector("#username");
const avatarInputError = document.querySelector("#avatar-error");
const fullNameInputError = document.querySelector('#name-error');
const emailInputError = document.querySelector("#email-error");
const usernameInputError = document.querySelector("#username-error");
const inputs = document.querySelectorAll("input");

const validateFileInput = () => {
    const imageTypes = ["image/jpeg", "image/png"];
    if (!avatarInput.files.length) {
        avatarInputError.innerText = "No file selected, please upload a photo.";
        avatarInputError.closest(".main__error-container").removeAttribute("aria-hidden");
        avatarDescription.setAttribute("aria-hidden", "true");
        return false;
    }
    if (!imageTypes.includes(avatarInput.files[0].type)) {
        avatarInputError.innerText = "Wrong file type, please choose a png or jpeg type."
        avatarInputError.closest(".main__error-container").removeAttribute("aria-hidden");
        avatarDescription.setAttribute("aria-hidden", "true");
        return false;
    }
    if (avatarInput.files[0].size / 1024 >= 500) {
        avatarInputError.innerText = "File too large. Please upload a photo under 500KB."
        avatarInputError.closest(".main__error-container").removeAttribute("aria-hidden");
        avatarDescription.setAttribute("aria-hidden", "true");
        return false;
    }
    avatarInputError.innerText = "";
    avatarInputError.closest(".main__error-container").setAttribute("aria-hidden", "true");
    avatarDescription.removeAttribute("aria-hidden");
    return true;
}

const validateEmail = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
        emailInputError.innerText = "Please enter a valid email address."
        emailInput.setAttribute("aria-invalid", "true");
        emailInputError.closest(".main__error-container").removeAttribute("aria-hidden");
        return false;
    }
    return true;
}

const validateUsername = () => {
    if (!usernameInput.value.startsWith('@') ) {
        usernameInputError.innerText = 'Please enter a valid username starting with a @.';
        usernameInput.setAttribute("aria-invalid", "true");
        usernameInputError.closest(".main__error-container").removeAttribute("aria-hidden");
        return false;
    }
    return true;
}

const validateFullName = () => {
    if (!/\s/.test(fullNameInput.value.trim())) {
        fullNameInputError.innerText = 'Please enter your full name separated by a space.';
        fullNameInput.setAttribute("aria-invalid", "true");
        fullNameInputError.closest(".main__error-container").removeAttribute("aria-hidden");
        return false;
    }
    return true;
}

const changeAvatarToUploaded = () => {
    avatarContainer.setAttribute("aria-hidden", "true");
    avatarUploaded.removeAttribute("aria-hidden");
    document.querySelector(".main__avatar-btn").focus();
}

const transferImageToAvatar = () => {  
    if (validateFileInput()) {
        const imageURL = URL.createObjectURL(avatarInput.files[0]);
        avatarImg.src = imageURL;
        return true;
    }
    return false;
}

const changeAvatarToContainer = () => {
    avatarContainer.removeAttribute("aria-hidden");
    avatarUploaded.setAttribute("aria-hidden", "true");
    avatarInput.focus();
}

const changeToTicket = () => {
    mainForm.hidden = true;
    mainTicket.hidden = false;
    ticketFirstName.innerText = `${fullNameInput.value.split(" ")[0]} `;
    ticketLastName.innerText = fullNameInput.value.split(" ")[1];
    ticketEmail.innerText = emailInput.value;
    ticketleftBottomContainer.innerHTML = `<img src=${URL.createObjectURL(avatarInput.files[0])} alt=${fullNameInput.value} width="160" height="160" class="main__bottom-img" />
    <div class="main__left-container">
      <h2 class="main__left-name">
        ${fullNameInput.value}
      </h2>
      <div class="main__left-flex">
        <img src="./assets/images/icon-github.svg" alt="" width="22" height="23" class="main__left-icon" />
        <p class="main__left-username">
          ${usernameInput.value}
        </p>
      </div>
    </div>`
}

inputs.forEach((input, index) => {
    let visited = {
        'name': false,
        'email': false,
        'username': false
    };
    if (!index) {
        input.addEventListener("change", () => {
            if (transferImageToAvatar()) {
                changeAvatarToUploaded();
            }
        })
        // works because the input itself is the dropzone for the image, always put the dragover and drop events on the dropzone instead of the input unless the input is the dropzone 
        input.addEventListener("dragover", e => {
            e.preventDefault();
        })
        
        input.addEventListener("drop", e => {
            e.preventDefault();
            const files = e.dataTransfer.files;
            if (!files.length) {
                return;
            }
            input.files = files;
            if (transferImageToAvatar()) {
                changeAvatarToUploaded();
            }
        })
        
        avatarUploaded.addEventListener("click", e => {
            if (e.target.id === 'remove') {
                input.value = "";
                changeAvatarToContainer();
            }
            if (e.target.id === 'change') {
                input.click();
            }
        })
    } else {
        input.addEventListener("blur", e => {
            if (e.target.id === 'name') {
                validateFullName();
                visited['name'] = true;
            }
            if (e.target.id === 'email') {
                validateEmail();
                visited['email'] = true;
            }
            if (e.target.id === 'username') {
                validateUsername();
                visited['username'] = true;
            }
        })
        input.addEventListener("input", () => {
            if (visited[input.id]) {
                input.closest(".main__form-container").querySelector(".main__form-error").innerText = '';
                input.removeAttribute("aria-invalid");
                input.closest(".main__form-container").querySelector(".main__error-container").setAttribute("aria-hidden", "true");
            }
        })
    }
})


form.addEventListener("submit", e => {
    e.preventDefault();
    if (validateFileInput() && validateFullName() && validateEmail() && validateUsername) {
        const formData = new FormData();
        changeToTicket()
    }
})