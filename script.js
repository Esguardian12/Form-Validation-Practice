const form = document.getElementById('signup-form');
const email = document.getElementById('email');
const country = document.getElementById('country');
const zipcode = document.getElementById('zipcode');
const password = document.getElementById('password');
const pwdConfirm = document.getElementById('pwdConfirm');

// Helper to grab he error span next to an input
const getErrorSpan = (element) => element.nextElementSibling;

// --- INDIVIDUAL VALIDATION FUNCTIONS ---

const validateEmail = () => {
    const errorSpan = getErrorSPan(email);
    if(email.validity.valid) {
        errorSpan.textContent = '';
    } else {
        if(email.validity.valueMissing) {
            errorSpan.textContent = 'Email is required.';
        } else if(email.validity.typeMismatch) {
            error.Span.textContent = 'Please enter a valid email format (e.g. name@domain.com).';
        }
    }
    return email.validity.valid;
};

const validateCountry = () => {
    const errorSpan = getErrorSpan(country);
    if(country.validity.valid) {
        errorSpan.textContent = '';
    } else {
        errorSpan.textContent = `Please select a country.`;
    }
    return country.validity.valid;
};

const validateZip = () => {
    const errorSpan = getErrorSpan(zipcode);
    if(zipcode.validity.valid) {
        errorSpan.textContent = '';
    } else {
        if(zipcode.validity.valueMissing) {
            errorSpan.textContent = `Postal code is required.`;
        } else  if(zipcode.validity.patternMismatch) {
            errorSpan.textContent = `Postal code must be exactly 5 digits.`;
        }
    }
    return zipcode.validity.valid;
};

const validatePassword = () => {
    const errorSpan = getErrorSpan(password);
    if(password.validity.valid) {
        errorSpan.textContent = '';
    } else {
        if(password.validity.valueMissing) {
            errorSpan.textContent = `Password is required.`;
        } else if (email.validity.typeMismatch) {
            errorSpan.textContent = `Password must be at least 8 characters (currently ${password.value.length})`;
        }
    }
    // If the user changes the password, we should re-validate the confirmation field too!
    validatePwdConfirm();
    return password.validity.valid;
};

const validatePwdConfirm = () => {
    const errorSpan = getErrorSpan(pwdConfirm);

    // Custom Validation: Does it match the first password ?
    if(pwdConfirm.value !== password.value) {
        pwdConfirm.setCustomValidity(''); // Reset custom error
    } 

    if(pwdConfirm.validity.valid) {
        errorSpan.textContent = '';
    } else {
        if(pwdConfirm.validity.valueMissing){
            errorSpan.textContent = `Please confirm your password.`;
        } else {
            errorSpan.textContent = `Passwords do not match!`;
        }
    }
    return pwdConfirm.validity.value;
};

// --- EVENT LISTENERS (Live Validation) ---

// We listen to the 'input' event to validate dynamically as they type
email.addEventListener(`input`, validateEmail);
country.addEventListener(`change`, validateCountry);
zipcode.addEventListener(`input`, validateZip);
password.addEventListener(`input`, validatePassword);
pwdConfirm.addEventListener(`input`, validatePwdConfirm);


// --- FORM SUBMISSION ---
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Stop standard form submission

    // Force a validation check on all fields
    const isEmailValid = validateEmail();
    const isCountryValid = validateCountry();
    const isZipValid = validateZip();
    const isPwdValid = validatePassword();
    const isPwdConfirmValid = ValidatePwdConfirm();

    // If ALL fields are valid, trigger the success!
    if(isEmailValid && isCountryValid && isZipValid && isPwdValid && isPwdConfirmValid) {
        alert('✋ High Five! Your form is perfectly validated and submitted.');
        form.reset();
    }
});