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
const confirmBackground = document.querySelector(".bground-confirm");
const confirmMessage = document.querySelector(".modal-confirm");
const confirmButtonClose = document.querySelector(".close-confirm");

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

// Add new divs for error messages
for (const formData of formDatas) {
  const errorDiv = document.createElement("div");
  formData.appendChild(errorDiv); 
  errorDiv.classList.add("errorDiv");
}

// Add class for input types (input: DOM Element, error: error message, div: error div, regex: regular expression)
class InputType {
  constructor(input, error, div, regex) {
  this.input = input;
  this.error = error;
  this.div = div;
  this.regex = regex;
  }
  // Method#1 : Verify input value with regex
  verifyRegex() {
    if (!this.regex.test(this.input.value)) {
      this.div.classList.add("errorDivEnabled");     
      this.div.textContent = this.error; 
      formIsValid = false;
    } else {
      this.div.classList.remove("errorDivEnabled");
      this.div.textContent = "";
    }
  }
  // Method#2 : Verify if date is valid
  verifyDate() {
    const birthdateValue = new Date(this.input.value);
    const dateDifference = Date.now() - birthdateValue.getTime();
    const ageInMilliseconds = new Date(dateDifference);
    const ageInYears = Math.abs(ageInMilliseconds.getUTCFullYear() - 1970);
    if (isNaN(birthdateValue.getTime()) || (ageInYears < 18)) {
      this.div.classList.add("errorDivEnabled");
      this.div.textContent = this.error;
      formIsValid = false;
    } else {
      this.div.classList.remove("errorDivEnabled");
      this.div.textContent = "";
    }
  }
  // Method#3 : Verify if input is checked 
  verifyChecked(array) {
    let failure = 0;
    for (const input of array) {
      if (!input.checked) {
        failure++;
      } if (failure === array.length) { 
        this.div.classList.add("errorDivEnabled");
        this.div.textContent = this.error;
        formIsValid = false;
      } else {
        this.div.classList.remove("errorDivEnabled");
        this.div.textContent = "";
      }
    }
  }
}

// Elements used in method#3
const inputTournamentLocations = document.querySelectorAll("input[name='location']");
const inputTermsOfUseArray = [inputTermsOfUse];

// Regular expressions
const regexFirstAndLast = /^[a-zA-Z]{2,50}$/;
const regexLast = /^[a-zA-Z]{2,50}$/;
const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const regexTournaments = /^[1-9]{0,1}[0-9]$/;

// Error messages
const errorMessageFirst = "Veuillez saisir entre 2 et 50 caractères pour le champ du prénom.";
const errorMessageLast = "Veuillez saisir entre 2 et 50 caractères pour le champ du nom.";
const errorMessageEmail = "Veuillez saisir un email valide.";
const errorMessageBirthdate = "Vous devez saisir votre date de naissance (18 ans minimum).";
const errorMessageTournaments = "Veuillez entrer le nombre de tournois auxquels vous avez participé (entre 0 et 99).";
const errorMessageLocation = "Vous devez choisir une option.";
const errorMessageTermsOfUse = "Vous devez vérifier que vous acceptez les termes et conditions.";

// NodeList to catch each error div
const errorDivs = document.querySelectorAll(".errorDiv");

// Add an instance for each input type
const firstName = new InputType (inputFirst, errorMessageFirst, errorDivs[0], regexFirstAndLast);
const lastName = new InputType (inputLast, errorMessageLast, errorDivs[1], regexFirstAndLast);
const email = new InputType (inputEmail, errorMessageEmail, errorDivs[2], regexEmail);
const birthdate = new InputType (inputBirthdate, errorMessageBirthdate, errorDivs[3]);
const tournaments = new InputType (inputTournamentQuantity, errorMessageTournaments, errorDivs[4], regexTournaments);
const city = new InputType ("", errorMessageLocation, errorDivs[5]);
const termsOfUse = new InputType ("", errorMessageTermsOfUse, errorDivs[6]);

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
    form.style.display = "none";
    confirmMessage.style.display = "block";
    return true;
  }
}

// Validate event
form.addEventListener("submit", validate);

// Close confirmation box event
confirmButtonClose.addEventListener("click", closeModal);