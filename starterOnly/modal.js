// ------
// NAVBAR
// ------

// Icon
const iconFontAwesome = document.querySelector(".fa-bars");
const icon = document.querySelector(".icon");

// Launch navbar
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
    iconFontAwesome.style.color = "white";
    icon.style.backgroundColor = "#ff0000";
  } else {
    x.className = "topnav";
    iconFontAwesome.style.color = null;
    icon.style.backgroundColor = null;
  }
}

// -----
// MODAL 
// -----

// DOM Elements
const modalBackground = document.querySelector(".bground");
const modalButton = document.querySelectorAll(".modal-btn");
const modalButtonClose = document.querySelector(".close");
const form = document.querySelector("form");
const formDatas = document.querySelectorAll(".formData");
const inputFirst = document.querySelector("#first");
const inputLast = document.querySelector("#last");
const inputEmail = document.querySelector("#email");
const inputBirthdate = document.querySelector("#birthdate");
const inputTournamentQuantity = document.querySelector("#quantity");
const inputTermsOfUse = document.querySelector("#checkbox1");
const confirmationBlock = document.querySelector(".modal-confirm");
const confirmationButtonClose = document.querySelector(".close-confirm");

// Error messages
const errorMessageFirst = "Veuillez saisir entre 2 et 50 caractères pour le champ du prénom.";
const errorMessageLast = "Veuillez saisir entre 2 et 50 caractères pour le champ du nom.";
const errorMessageEmail = "Veuillez saisir un email valide (80 caractères maximum).";
const errorMessageBirthdate = "Vous devez saisir votre date de naissance (18 ans minimum).";
const errorMessageTournaments = "Veuillez entrer le nombre de tournois auxquels vous avez participé (entre 0 et 99).";
const errorMessageLocation = "Vous devez choisir une option.";
const errorMessageTermsOfUse = "Vous devez vérifier que vous acceptez les termes et conditions.";

// Regular expressions
const regexFirstAndLast = /^[a-zA-Z]{2,50}$/;
const regexEmail = /^(?!.{80})([a-zA-Z0-9_\.\-]{3,})+\@(([a-zA-Z0-9\-]{3,})+\.)+([a-zA-Z0-9]{2,})+$/;
const regexTournaments = /^[1-9]{0,1}[0-9]$/;

// Launch modal event
modalButton.forEach((btn) => btn.addEventListener("click", launchModal));

// Launch modal form
function launchModal(e) {
  e.stopPropagation();
  modalBackground.style.display = "block";
  form.style.display = "block";
}

// Close modal event
modalButtonClose.addEventListener("click", closeModal);

// Close modal form
function closeModal(e) {
  e.stopPropagation();
  modalBackground.style.display = "none";
}

// Add "novalidate" attribute to form
form.setAttribute("novalidate", "");

// Add class for input types 
class InputType {
  // Input: DOM Element, div: parent of the pseudo-element displaying error message, error: error message, regex: regular expression
  constructor(input, div, error, regex) {
  this.input = input;
  this.div = div;
  this.error = error;
  this.regex = regex;
  }
  // Method #1 : Verify input value with regex
  verifyRegex() {
    // Check if input value is different from regex
    if (!this.regex.test(this.input.value)) {
      // Add attribute and its value to display error message
      this.div.setAttribute("data-error", this.error);
      // Add attribute to display red border
      this.div.setAttribute("data-error-visible", "true");
      // Focus the last input with error
      this.input.focus();
      // Make validate returns false
      formIsValid = false;
    } else {
      // Remove attributes to remove their effects
      this.div.removeAttribute("data-error");
      this.div.removeAttribute("data-error-visible");
    }
  }
  // Method #2 : Verify if date is valid
  verifyDate() {
    // Catch input date containing number (milliseconds since 1970)
    const birthdateValue = new Date(this.input.value);
    // Calculate difference in milliseconds between now and input date
    const differenceInMilliseconds = Date.now() - birthdateValue.getTime();
    // Convert difference into date format
    const differenceInDate = new Date(differenceInMilliseconds);
    // Calculate age
    const age = Math.abs(differenceInDate.getUTCFullYear() - 1970);
    // Check if (input value is not a date), (age is under 18) and (input value is a date set in the future)
    if (isNaN(birthdateValue.getTime()) || (age < 18) || (differenceInMilliseconds < 0)) {
      this.div.setAttribute("data-error", this.error);
      this.div.setAttribute("data-error-visible", "true");
      this.input.focus();
      formIsValid = false;
    } else {
      this.div.removeAttribute("data-error");
      this.div.removeAttribute("data-error-visible");
    }
  }
  // Method #3 : Verify if input is checked 
  verifyChecked(array) {
    // Count failures
    let failure = 0;
    // Repeat action for all elements in array
    for (const input of array) {
      // When an element is not checked, add "1" to failure
      if (!input.checked) {
        failure++;
      // If the number of failures is equal to the array's length, no element has been checked 
      } if (failure === array.length) { 
        this.div.setAttribute("data-error", this.error);
        this.div.setAttribute("data-error-visible", "true");
        formIsValid = false;
      } else {
        this.div.removeAttribute("data-error");
        this.div.removeAttribute("data-error-visible");
      }
    }
  }
}

// Method #3 needs an array-like object for the loop to work
const inputTournamentLocations = document.querySelectorAll("input[name='location']");
const inputTermsOfUseArray = [inputTermsOfUse];

// Add an instance for each input type
const firstName = new InputType (inputFirst, formDatas[0], errorMessageFirst, regexFirstAndLast);
const lastName = new InputType (inputLast, formDatas[1], errorMessageLast, regexFirstAndLast);
const email = new InputType (inputEmail, formDatas[2], errorMessageEmail, regexEmail);
const birthdate = new InputType (inputBirthdate, formDatas[3], errorMessageBirthdate);
const tournaments = new InputType (inputTournamentQuantity, formDatas[4], errorMessageTournaments, regexTournaments);
const city = new InputType ("", formDatas[5], errorMessageLocation);
const termsOfUse = new InputType ("", formDatas[6], errorMessageTermsOfUse);

// Dictate if form is valid or not
let formIsValid;

// Give a "false" value to formIsValid when an arror is detected and display error messages
function checkIfFormIsValid() {
  formIsValid = true;
  // Method #1
  firstName.verifyRegex();
  lastName.verifyRegex();
  email.verifyRegex();
  tournaments.verifyRegex();
  // Method #2
  birthdate.verifyDate();
  // Method #3
  city.verifyChecked(inputTournamentLocations);
  termsOfUse.verifyChecked(inputTermsOfUseArray);
}

// Validate form on submit
function validate(e) {
  // Prevent page from reloading
  e.preventDefault();
  e.stopPropagation();
  // Launch checking process
  checkIfFormIsValid();
  if (formIsValid === false) {
    return false;
  // Return "true" and display confirmation message if no error has been detected
  } else {
    displayConfirmation();
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

// Close confirmation event
confirmationButtonClose.addEventListener("click", closeConfirmation);

// Close confirmation message
function closeConfirmation(e) {
  e.stopPropagation();
  confirmationBlock.style.display = "none";
  modalBackground.style.display = "none";
}