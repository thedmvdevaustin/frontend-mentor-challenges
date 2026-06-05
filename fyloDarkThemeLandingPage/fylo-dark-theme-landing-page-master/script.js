const form = document.querySelector('form');
const input = document.querySelector('input');
const p = document.querySelector('.access__error');
const isValidEmail = (email) => {
     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

const updateValidationState = (state) => {
    /*
    inputs usually have 3 states: 
    idle - clean input, no error
    invalid - red underline on input + red error text appears(this case there is no red underline in the design)
    valid - presumably a success state before submit
    */
    if (state === 'invalid') {
        input.setAttribute('aria-invalid', true);
        p.classList.remove('hide-display')
    } else {
        input.removeAttribute('aria-invalid');
        p.classList.add('hide-display');
    }
}
// blur runs when the user clicks off or stops focus on it so when the user clicks off or stops focus on the input we want to validate the email. We always validate on blur and not earlier because of WCAG 3.3.1 - don't punish the users before they've finished typing
input.addEventListener('blur', () => {
    if (input.value === '') return updateValidationState('idle');
    updateValidationState(isValidEmail(input.value) ? 'valid' : 'invalid');
})
// We want to validate when the user has a valid email immediately so we are going to check for that but we won't punish them until they stop because it could be annoying and ruin the UX
input.addEventListener('input', () => {
    if (p.classList.contains('aria-invalid')) return;
    if (isValidEmail(input.value)) updateValidationState('valid');    
})

//You should have both 

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!isValidEmail(input.value)) {
        updateValidationState('invalid');
        input.focus();
        return;
    }
    updateValidationState('valid');
})
