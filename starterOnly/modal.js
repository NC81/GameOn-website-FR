function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalBackground = document.querySelector(".bground");
const modalButton = document.querySelectorAll(".modal-btn");
const form = document.querySelector("form");
const formDatas = document.querySelectorAll(".formData");
const modalButtonClose = document.querySelector(".close");
const inputFirst = document.querySelector("#first");
const inputLast = document.querySelector("#last");
const inputEmail = document.querySelector("#email");
const inputBirthdate = document.querySelector("#birthdate");
const inputTournamentQuantity = document.querySelector("#quantity");
const inputTermsOfUse = document.querySelector("#checkbox1");
const confirmationBlock = document.querySelector(".modal-confirm");
const confirmationButtonClose = document.querySelector(".close-confirm");

// MODAL
// Launch modal event
modalButton.forEach((btn) => btn.addEventListener("click", launchModal));

// Launch modal form
function launchModal() {
  modalBackground.style.display = "block";
}

// Close modal event
modalButtonClose.addEventListener("click", closeModal);

// Close modal form
function closeModal() {
  modalBackground.style.display = "none";
}

// VALIDATION
// Add "novalidate" attribute to form
form.setAttribute("novalidate", "");

// Add class for input types (input: DOM Element, div: ?error div?, error: error message,  regex: regular expression)
class InputType {
  constructor(input, div, error, regex) {
  this.input = input;
  this.div = div;
  this.error = error;
  this.regex = regex;
  }
  // Method#1 : Verify input value with regex
  verifyRegex() {
    if (!this.regex.test(this.input.value)) {
      this.div.setAttribute("data-error", this.error);
      this.div.setAttribute("data-error-visible", "true");
      formIsValid = false;
    } else {
      this.div.setAttribute("data-error", "");
      this.div.setAttribute("data-error-visible", "false");
    }
  }
  // Method#2 : Verify if date is valid
  verifyDate() {
    const birthdateValue = new Date(this.input.value);
    const dateDifference = Date.now() - birthdateValue.getTime();
    const ageInMilliseconds = new Date(dateDifference);
    const ageInYears = Math.abs(ageInMilliseconds.getUTCFullYear() - 1970);
    if (isNaN(birthdateValue.getTime()) || (ageInYears < 18)) {
      this.div.setAttribute("data-error", this.error);
      this.div.setAttribute("data-error-visible", "true");
      formIsValid = false;
    } else {
      this.div.setAttribute("data-error", "");
      this.div.setAttribute("data-error-visible", "false");
    }
  }
  // Method#3 : Verify if input is checked 
  verifyChecked(array) {
    let failure = 0;
    for (const input of array) {
      if (!input.checked) {
        failure++;
      } if (failure === array.length) { 
        this.div.setAttribute("data-error", this.error);
        this.div.setAttribute("data-error-visible", "true");
        formIsValid = false;
      } else {
        this.div.setAttribute("data-error", "");
        this.div.setAttribute("data-error-visible", "false");
      }
    }
  }
}

// Elements used in method#3
const inputTournamentLocations = document.querySelectorAll("input[name='location']");
const inputTermsOfUseArray = [inputTermsOfUse];

// Error messages
const errorMessageFirst = "Veuillez saisir entre 2 et 50 caractères pour le champ du prénom.";
const errorMessageLast = "Veuillez saisir entre 2 et 50 caractères pour le champ du nom.";
const errorMessageEmail = "Veuillez saisir un email valide.";
const errorMessageBirthdate = "Vous devez saisir votre date de naissance (18 ans minimum).";
const errorMessageTournaments = "Veuillez entrer le nombre de tournois auxquels vous avez participé (entre 0 et 99).";
const errorMessageLocation = "Vous devez choisir une option.";
const errorMessageTermsOfUse = "Vous devez vérifier que vous acceptez les termes et conditions.";

// Regular expressions
const regexFirstAndLast = /^[a-zA-Z]{2,50}$/;
const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const regexTournaments = /^[1-9]{0,1}[0-9]$/;

// Add an instance for each input type
const firstName = new InputType (inputFirst, formDatas[0], errorMessageFirst, regexFirstAndLast);
const lastName = new InputType (inputLast, formDatas[1], errorMessageLast, regexFirstAndLast);
const email = new InputType (inputEmail, formDatas[2], errorMessageEmail, regexEmail);
const birthdate = new InputType (inputBirthdate, formDatas[3], errorMessageBirthdate);
const tournaments = new InputType (inputTournamentQuantity, formDatas[4], errorMessageTournaments,  regexTournaments);
const city = new InputType ("", formDatas[5], errorMessageLocation);
const termsOfUse = new InputType ("", formDatas[6], errorMessageTermsOfUse);

// Check if form is valid
let formIsValid;

function checkIfFormIsValid() {
  formIsValid = true;
  // Method#1
  firstName.verifyRegex();
  lastName.verifyRegex();
  email.verifyRegex();
  tournaments.verifyRegex();
  // Method#2
  birthdate.verifyDate();
  // Method#3
  city.verifyChecked(inputTournamentLocations);
  termsOfUse.verifyChecked(inputTermsOfUseArray);
}

// Validate form on submit
function validate(e) {
  e.preventDefault();
  checkIfFormIsValid();
  if (formIsValid === false) {
    return false;
  } else {
    displayConfirmation()
    return true;
  }
}

// Validate event
form.addEventListener("submit", validate);

// Display confirmation message
function displayConfirmation() {
  form.style.display = "none";
  confirmationBlock.style.display = "block";
}

// Close confirmation box event
confirmationButtonClose.addEventListener("click", closeModal);