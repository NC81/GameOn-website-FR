function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const form = document.querySelector("form");
const formDatas = document.querySelectorAll(".formData");
const modalBtnClose = document.querySelector(".close");
const inputFirst = document.querySelector("#first");
const inputLast = document.querySelector("#last");
const inputEmail = document.querySelector("#email");
const inputBirthdate = document.querySelector("#birthdate");
const inputTournamentQuantity = document.querySelector("#quantity");
const inputTermsOfUse = document.querySelector("#checkbox1");

// MODAL
// Launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// Close modal event
modalBtnClose.addEventListener("click", closeModal);

// Close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// FORM VALIDATION
// Add "novalidate" attribute to form
form.setAttribute("novalidate", "");

// Add new divs for error messages
for (const formData of formDatas) {
  const errorDiv = document.createElement("div");
  formData.appendChild(errorDiv); 
  errorDiv.classList.add("errorDiv");
  errorDiv.style.color = "#fe142f";
  errorDiv.style.fontSize = ".55em";
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
  verifyInputValue() {
    if (!this.regex.test(this.input.value)) {
      this.div.textContent = this.error;
      formIsValid = false;
    } else {
      this.div.textContent = "";
    }
  }
  // Method#2 : Verify if input is checked 
  verifyInputCheck(array) {
    let failure = 0;
    for (const input of array) {
      if (!input.checked) {
        failure++;
      } if (failure === array.length) { 
        this.div.textContent = this.error;
        formIsValid = false;
      } else {
        this.div.textContent = "";
      }
    }
  }
}    

// Elements used in method#2
const inputTournamentLocations = document.querySelectorAll("input[name='location']");
const inputTermsOfUseArray = [inputTermsOfUse];

// Regular expressions
const regexFirstAndLast = /^[a-zA-Z]{2,30}$/;
const regexLast = /^[a-zA-Z]{2,30}$/;
const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const regexBirthdate = /^((((19[0-9][0-9])|(2[0-9][0-9][0-9]))([-])(0[13578]|10|12)([-])(0[1-9]|[12][0-9]|3[01]))|(((19[0-9][0-9])|(2[0-9][0-9][0-9]))([-])(0[469]|11)([-])([0][1-9]|[12][0-9]|30))|(((19[0-9][0-9])|(2[0-9][0-9][0-9]))([-])(02)([-])(0[1-9]|1[0-9]|2[0-8]))|(([02468][048]00)([-])(02)([-])(29))|(([13579][26]00)([-])(02)([-])(29))|(([0-9][0-9][0][48])([-])(02)([-])(29))|(([0-9][0-9][2468][048])([-])(02)([-])(29))|(([0-9][0-9][13579][26])([-])(02)([-])(29)))$/;
const regexTournaments = /^[1-9]{0,1}[0-9]$/;

// Error messages
const errorMessageFirst = "Veuillez saisir entre 2 et 30 caractères pour le champ du prénom.";
const errorMessageLast = "Veuillez saisir entre 2 et 30 caractères pour le champ du nom.";
const errorMessageEmail = "Veuillez saisir un email valide.";
const errorMessageBirthdate = "Vous devez saisir votre date de naissance.";
const errorMessageTournaments = "Veuillez entrer le nombre de tournois auxquels vous avez participé (entre 0 et 99).";
const errorMessageLocation = "Vous devez choisir une option.";
const errorMessageTermsOfUse = "Vous devez vérifier que vous acceptez les termes et conditions."; 

// NodeList to catch each error div
const errorDivs = document.querySelectorAll(".errorDiv");

// Add an instance for each input type
const firstName = new InputType (inputFirst, errorMessageFirst, errorDivs[0], regexFirstAndLast);
const lastName = new InputType (inputLast, errorMessageLast, errorDivs[1], regexFirstAndLast);
const email = new InputType (inputEmail, errorMessageEmail, errorDivs[2], regexEmail);
const birthdate = new InputType (inputBirthdate, errorMessageBirthdate, errorDivs[3], regexBirthdate);
const tournaments = new InputType (inputTournamentQuantity, errorMessageTournaments, errorDivs[4], regexTournaments);
const city = new InputType ("", errorMessageLocation, errorDivs[5]);
const termsOfUse = new InputType ("", errorMessageTermsOfUse, errorDivs[6]);

// Check if form is valid
let formIsValid = true;

function checkIfFormIsValid() {
  formIsValid = true;
  // Method#1
  firstName.verifyInputValue();
  lastName.verifyInputValue();
  email.verifyInputValue();
  birthdate.verifyInputValue();
  tournaments.verifyInputValue();
  // Method#2
  city.verifyInputCheck(inputTournamentLocations);
  termsOfUse.verifyInputCheck(inputTermsOfUseArray);
}

// Validate form on submit
function validate() {
  checkIfFormIsValid();
  console.log(formIsValid)
  if (formIsValid === false) {
    return false;
  } else {
    alert("Merci ! Votre réservation a bien été envoyée.");
    return true;
  }
}