/////
// CONSTANTS / VARIABLES
/////

// DOM Elements
const form = document.querySelector("form"); 
const firstNameInput = document.getElementById("first"); 
const lastNameInput = document.getElementById("last");
const emailInput = document.getElementById("email");
const birthdateInput = document.getElementById("birthdate");



/////
// FUNCTIONS
/////
  
/**
 * Validate form fields and show error messages if they're needed
 * @returns {boolean} the form is valid or not
 */
function validate() {
  let isValid = true;
  const participantAge = calculateAge(new Date(birthdateInput.value));
  const minimumAge = 18; // Define minimum age for inscription
  
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

  // Validate the birthdate: fied not empty and minimum age
  if (!birthdateInput.value.trim()) {
    setError(birthdateInput, "Vous devez entrer votre date de naissance.");
    isValid = false;
  } else if (participantAge < minimumAge) {
    setError(birthdateInput, `Vous devez avoir au moins ${minimumAge} ans pour vous inscrire.`);
    isValid = false;
  } else {
    clearError(birthdateInput);
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

/**
 * Calculate the age based on birthdate
 * @param {Date} birthDate The birthdate for age calculation
 * @returns {number} The calculated age
 */
function calculateAge(birthDate) {
  // Create a new Date object containing today's date
  const today = new Date();
  // Convert birthDate to a Date object 
  const birth = new Date(birthDate);
  // Use getFullYear() to get the year and calculate the age
  let calculatedAge = today.getFullYear() - birth.getFullYear();
  // Use getMonth() to get the month and calculate the month difference
  const monthDifference = today.getMonth() - birth.getMonth();

  // Adjust age if the current date is before the birthdate
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
    calculatedAge--; // Decrement the age (subtract 1) if the birthday hasn't yet passed this year
  }

  return calculatedAge; // Return the current age
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