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
const formData = document.querySelectorAll(".formData");
const modalBtnClose = document.querySelector(".close");

// Form Elements
const inputFirst = document.querySelector("#first");
const inputLast = document.querySelector("#last");
const inputEmail = document.querySelector("#email");
const inputBirthdate = document.querySelector("#birthdate");
const inputTournamentQuantity = document.querySelector("#quantity");
const inputTermsOfUse = document.querySelector("#checkbox1");

// Regex
const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const regexText = /^[a-zA-Z]{2,}$/;
const regexNumber = /^[0-9]{1,}$/;

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

// Add "required" class to inputs 
const inputAll = [inputFirst, inputLast, inputEmail, inputBirthdate, inputTournamentQuantity];
inputAll.forEach((input) => input.classList.add("required"));

// Add "required" attribute to inputs 
const inputRequired = document.querySelectorAll(".required");
inputRequired.forEach((input) => input.setAttribute("required", ""));

// Add minlength to last name input
inputLast.setAttribute("minlength", "2");

// Verify radio checkbox 
function checkLocation() {
  const formTournamentLocations = formData[5];
  formTournamentLocations.classList.add("formTournamentLocations");
  const inputTournamentLocations = document.querySelectorAll(".formTournamentLocations .checkbox-input");
  for (const input of inputTournamentLocations) {
    if (input.checked) {
      return true;
    }
  }
}

// Validate form on submit
function validate(){
  if(!regexText.test(inputFirst.value)) {
    console.log("invalid first name");
    inputFirst.focus();
    return false;
  }
  if(!regexText.test(inputLast.value)) {
    console.log("invalid last name");
    inputLast.focus();
    return false;
  }
  if(!regexEmail.test(inputEmail.value))  {
    console.log("invalid email");
    inputEmail.focus();
    return false;
  }
  if(!regexNumber.test(inputTournamentQuantity.value)) {
    console.log("invalid number of tournaments");
    inputTournamentQuantity.focus();
    return false;
  }
  if(!checkLocation()) {
    console.log("location not checked");
    return false;
  }
  if(!inputTermsOfUse.checked) {
    console.log("terms of use not checked");
    return false;
  }
  else{
    alert("The form has been submitted !");
    return true;
  }
}