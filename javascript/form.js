/////
// CONSTANTS / VARIABLES
/////

// DOM Elements
const form = document.querySelector("form"); 
const firstNameInput = document.getElementById("first"); 
const lastNameInput = document.getElementById("last"); 


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
  
  
/////
// EVENT LISTENERS
/////
  
// Event listener for form submission
form.addEventListener("submit", (e) => {
  if (!validate()) {
    e.preventDefault();
    return;
  }
});