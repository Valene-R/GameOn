/////
// CONSTANTS / VARIABLES
/////

// DOM Elements
const form = document.querySelector("form"); 
const firstNameInput = document.getElementById("first"); 
const lastNameInput = document.getElementById("last");
const emailInput = document.getElementById("email");


/////
// FUNCTIONS
/////
  
/**
 * Validate form fields and show error messages if they're needed
 * @returns {boolean} the form is valid or not
 */
function validate() {
  let isValid = true;
  
  // Validate the first name: field not empty and minimum 2 characters
  if (!firstNameInput.value.trim() || firstNameInput.value.length < 2) {
    setError(firstNameInput, "Veuillez entrer 2 caractères ou plus pour le champ du prénom.");
    isValid = false;
  } else {
    clearError(firstNameInput);
  }

  // Validate the last name: field not empty and minimum 2 characters
  if (!lastNameInput.value.trim() || lastNameInput.value.length < 2) {
    setError(lastNameInput, "Veuillez entrer 2 caractères ou plus pour le champ du nom.");
    isValid = false;
  } else {
    clearError(lastNameInput);
  }

  // Validate the email address
  if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
    setError(emailInput, "Veuillez entrer une adresse électronique valide.");
    isValid = false;
  } else {
    clearError(emailInput);
  }

  return isValid;
}
  
/**
  * Set an error message for a form field
  * @param {HTMLElement} input The input element
  * @param {string} message The error message
  */
function setError(input, message) {
  // Find the closest parent element with ".formData" class to organize error message
  const formData = input.closest(".formData");
  // Set the error message
  formData.setAttribute("data-error", message);
  // Show the error message
  formData.setAttribute("data-error-visible", "true");
}
  
/**
  * Clear the error message for a form field
  * @param {HTMLElement} input The input element
  */
function clearError(input) {
  const formData = input.closest(".formData");
  // Remove the error message attribute
  formData.removeAttribute("data-error");
  // Hide the error message
  formData.removeAttribute("data-error-visible");
}
  
/**
 * Validate an email format using regex
 * @param {string} email The email to check
 * @returns {boolean} True if the format is correct, else false 
 */
function isValidEmail(email) {
  // Define a regex pattern for a valid email format
  const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  // Use the test() method to check if the email matches the regex pattern
  return regexEmail.test(email);
}


/////
// EVENT LISTENERS
/////
  
// Event listener for form submission
form.addEventListener("submit", (e) => {
  // Use the toLowerCase() method to convert email to lowercase for validation
  emailInput.value = emailInput.value.toLowerCase();

  if (!validate()) {
    e.preventDefault();
    return;
  }
});