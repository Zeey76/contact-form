const firstName = document.querySelector("#first-name");
const lastName = document.querySelector("#last-name");
const email = document.querySelector("#email");
const queryType = document.querySelectorAll('input[name="query-type"]');
const queryTypeError = document.querySelector("#query-type-error");
const message = document.querySelector("#message");
const consent = document.querySelector("#consent");
const queryTypeOption = document.querySelectorAll(".query-type-option");

queryTypeOption.forEach(option => {
    const radio = option.querySelector('input[name="query-type"]');
    option.addEventListener("click", () => {
        radio.checked = true; 
        document.querySelectorAll(".query-type-option").forEach(container => {
            container.classList.remove("selected");
        }); 
        option.classList.add("selected");  
    })
});

queryType.forEach(button => {
    button.addEventListener("change", () => {
        const container = button.parentElement;
        document.querySelectorAll(".query-type-option").forEach(container => {
            container.classList.remove("selected");
        });
        container.classList.add("selected");
    });
});

document.querySelector('form').addEventListener("submit" , (event) => {
    event.preventDefault();

    let isValid = true;
    let selectedRadioButton = false;

    if (firstName.value.trim() === "") {
        showErrorMessage(firstName);
        firstName.classList.add("error");
        isValid = false;
    } else {
        hideErrorMessage(firstName);
    }

    if (lastName.value.trim() === "") {
        showErrorMessage(lastName);
        lastName.classList.add("error");
        isValid = false;
    } else {
        hideErrorMessage(lastName);
    }

    if (email.value.trim() === "") {
        showErrorMessage(email);
        email.classList.add("error");
        isValid = false;
    } else if (!validateEmail(email.value)) {
        showErrorMessage(email);
        email.classList.add("error");
        isValid = false;
    } else {
        hideErrorMessage(email);
    }

    queryType.forEach(query => {
        if (query.checked) {
            selectedRadioButton = true;
        }
    });

    if (selectedRadioButton === false) {
        queryTypeError.style.display = "block";
    } else {
        queryTypeError.style.display = "none";
    }

    if (message.value.trim() === "") {
        showErrorMessage(message);
        message.classList.add("error");
        isValid = false;
    } else {
        hideErrorMessage(message);
    }

    if (!consent.checked) {
        showErrorMessage(consent);
        isValid = false;
    } else {
        hideErrorMessage(consent);
    }
});

function showErrorMessage(element) {
    const error = document.querySelector(`#${element.id}-error`);
    if (error) {
        error.style.display = "block";
    } 
}

function hideErrorMessage(element) {
    const error = document.querySelector(`#${element.id}-error`);
    if (error) {
        error.style.display = "none";
    } 
}

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.com+$/;
    return emailPattern.test(email);
}