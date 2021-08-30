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

// Form Elements
const inputFirst = document.querySelector("#first");
const inputLast = document.querySelector("#last");
const inputEmail = document.querySelector("#email");
const inputBirthdate = document.querySelector("#birthdate");
const inputTournamentQuantity = document.querySelector("#quantity");
const inputTermsOfUse = document.querySelector("#checkbox1");

// Regex
const regexText = /^[a-zA-Z]{2,30}$/;
const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const regexBirthdate = /^((((19[0-9][0-9])|(2[0-9][0-9][0-9]))([-])(0[13578]|10|12)([-])(0[1-9]|[12][0-9]|3[01]))|(((19[0-9][0-9])|(2[0-9][0-9][0-9]))([-])(0[469]|11)([-])([0][1-9]|[12][0-9]|30))|(((19[0-9][0-9])|(2[0-9][0-9][0-9]))([-])(02)([-])(0[1-9]|1[0-9]|2[0-8]))|(([02468][048]00)([-])(02)([-])(29))|(([13579][26]00)([-])(02)([-])(29))|(([0-9][0-9][0][48])([-])(02)([-])(29))|(([0-9][0-9][2468][048])([-])(02)([-])(29))|(([0-9][0-9][13579][26])([-])(02)([-])(29)))$/;
const regexTournamentQuantity = /^[1-9]{0,1}[0-9]$/;

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

// Add "novalidate" attribute to form
form.setAttribute("novalidate", "");

// Verify radio checkbox 
function checkLocation() {
  const formTournamentLocations = formDatas[5];
  formTournamentLocations.classList.add("formTournamentLocations");
  const inputTournamentLocations = document.querySelectorAll(".formTournamentLocations .checkbox-input");
  for (const input of inputTournamentLocations) {
    if (input.checked) {
      return true;
    }
  }
}

// Add new divs for error messages
for (const formData of formDatas) {
  const errorDiv = document.createElement("div");
  formData.appendChild(errorDiv); 
  errorDiv.classList.add("errorMessage");
  errorDiv.style.color = "#fe142f";
  errorDiv.style.fontSize = ".55em";
}

// Check if form is valid
let formIsValid = true;
function checkIfValid() {
  formIsValid = true;
  const errorDivs = document.querySelectorAll(".errorMessage");
  if (!regexText.test(inputFirst.value)) {
    errorDivs[0].textContent = "Veuillez saisir entre 2 et 30 caractères pour le champ du prénom.";
    formIsValid = false;
  } else {
    errorDivs[0].textContent = "";
  }
  if (!regexText.test(inputLast.value)) {
    errorDivs[1].textContent = "Veuillez saisir entre 2 et 30 caractères pour le champ du nom.";
    formIsValid = false;
  } else {
    errorDivs[1].textContent = "";
  }
  if (!regexEmail.test(inputEmail.value)) {
    errorDivs[2].textContent = "Veuillez saisir un email valide.";
    formIsValid = false;
  } else {
    errorDivs[2].textContent = "";
  }
  if (!regexBirthdate.test(inputBirthdate.value)) {
    errorDivs[3].textContent = "Vous devez saisir votre date de naissance.";
    formIsValid = false;
  } else {
    errorDivs[3].textContent = "";
  }
  if (!regexTournamentQuantity.test(inputTournamentQuantity.value)) {
    errorDivs[4].textContent = "Veuillez entrer le nombre de tournois auxquels vous avez participé (entre 0 et 99).";
    formIsValid = false;
  } else {
    errorDivs[4].textContent = "";
  }
  if (!checkLocation()) {
    errorDivs[5].textContent = "Vous devez choisir une option.";
    formIsValid = false;
  } else {
    errorDivs[5].textContent = "";
  }
  if (!inputTermsOfUse.checked) {
    errorDivs[6].textContent = "Vous devez vérifier que vous acceptez les termes et conditions.";
    formIsValid = false;
  } else {
    errorDivs[6].textContent = "";
  }
  return formIsValid;
}

// Validate form on submit
function validate() {
  checkIfValid();
  if (formIsValid === false) {
    return false;
  } else {
    console.log("Form is VALID"); 
    return true;
  }
}