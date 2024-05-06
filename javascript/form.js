/////
// CONSTANTS / VARIABLES
/////

// DOM Elements 
// Get the form element
const form = document.querySelector("form"); 

// Get input fields by their 'id'
const firstNameInput = document.getElementById("first"); 
const lastNameInput = document.getElementById("last");
const emailInput = document.getElementById("email");
const birthdateInput = document.getElementById("birthdate");
const tournamentsInput = document.getElementById("quantity");

// Get all city radio buttons
const cityRadios = document.querySelectorAll('input[name="location"]');

// Get the checkboxes 
const conditionsCheckBox = document.getElementById("checkbox1");
const newsEventsCheckBox = document.getElementById("checkbox2");

// Create an array of all input elements
// Spread operator '...' is used to decompose cityRadios into individual elements
const inputs = [firstNameInput, lastNameInput, emailInput, birthdateInput, tournamentsInput, ...cityRadios, conditionsCheckBox];

// Validation constants
const minimumAge = 18; // Define minimum age for inscription
const maximumAge = 100; // Maximum age accepted to prevent input errors
const regexNotDecimal = /^\d+$/; // Regex to check if the input value contains only digits


/////
// FUNCTIONS
/////

/** Validation Rules **/
const validationRules = {
	// Validate the first name: field not empty and minimum 2 characters
	first: value => {
		if (!value.trim() || value.length < 2) {
			return "Veuillez entrer 2 caractères ou plus pour le champ du prénom.";
		}
	},

	// Validate the last name: field not empty and minimum 2 characters
	last: value => {
		if (!value.trim() || value.length < 2) {
			return "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
		}
	},

	// Validate the email address
	email: value => {
		if (!value.trim() || !isValidEmail(value)) {
			return "Veuillez entrer une adresse électronique valide.";
		}
	},

	// Validate the birthdate: fied not empty, minimum age and maximum age
	birthdate: value => {
		const participantAge = calculateAge(new Date(value)); // Calculate the age based on the birthdate value
		if (!value.trim()) {
			return "Vous devez entrer votre date de naissance.";
		} else if (participantAge < minimumAge) {
			return `Vous devez avoir au moins ${minimumAge} ans pour vous inscrire.`;
		} else if (participantAge > maximumAge) {
			return "Veuillez vérifier votre date de naissance, elle semble incorrecte.";
		}
	},

	// Validate the number of tournaments already participated: integer between 0 and 99
  // Check if the input value is an integer using a regex to exclude decimals
	quantity: value => {
		// Parse the input value as an integer using base 10 (numeric system)
		const tournamentCount = parseInt(value, 10);
		if (!regexNotDecimal.test(value)) {
			return "Veuillez entrer un nombre entier, sans décimales.";
		} else if (tournamentCount < 0 || tournamentCount > 99) {
			return "Veuillez entrer un nombre entier entre 0 et 99.";
		}
	},

	// Validate the selected city for tournament
  // Convert cityRadios to array and check if a radio button is checked
	location: () => {
		if (!Array.from(cityRadios).some(radio => radio.checked)) {
			return "Vous devez sélectionner une ville.";
		}
	},

	// Validate the conditions checkbox
	checkbox1: checked => {
		if (!checked) {
			return "Vous devez accepter les conditions d'utilisation.";
		}
	}
};

/**
 * Validate a specific form field
 * @param {HTMLElement} input The input element to validate
 * @returns {boolean} The input field is valid or not
 */
function validateField(input) {
	// Determine the appropriate value for the input type
	const value = input.type === "checkbox" ? input.checked : input.value;
	// Get the corresponding validation rule
	const rule = validationRules[input.id] || validationRules[input.name];
	// Execute rule() with the value as argument
	const errorMessage = rule(value);

	// If value doesn't pass validation, rule will return an error message
	if (errorMessage) {
		// Set error if validation failed
		setError(input, errorMessage);
		return false;
	} else {
		// Clear error if validation passed
		clearError(input);
		return true;
	}
}

/**
 * Validate the entire form
 * @returns {boolean} The form is valid or not
 */
function validateForm() {
	let isValid = true;
	// Validate all fields and determine the total validity
	inputs.forEach(input => {
		if (!validateField(input)) {
			isValid = false;
		}
	});
	return isValid;
}

/**
 * Set an error message for a form field
 * @param {HTMLElement} input The input element
 * @param {string} message The error message
 */
function setError(input, message) {
	// Find the closest parent element with ".formData" to organize error message
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

/**
 * Display a toast notification on the screen for a specified duration
 * @param {string} message The message to display in the toast
 * @param {number} duration The duration to show the toast in milliseconds. Default is 3000 ms
 */
function showToast(message, duration = 3000) {
	const toaster = document.createElement("div");
	toaster.className = "toaster";
	toaster.innerText = message;
	document.body.appendChild(toaster);

	// Set a timeout to initiate the fade-out after the specified duration
	setTimeout(() => {
		toaster.classList.add("fade-out");
		// Remove the toast from the DOM after the fade-out transition ends
		toaster.addEventListener("transitionend", () => 
			toaster.remove()
		);
	}, duration);
}


/////
// EVENT LISTENERS
/////

// Event listeners for real time validation
inputs.forEach(input => {
	input.addEventListener("input", () => validateField(input));
	input.addEventListener("change", () => validateField(input));
});

// Event listener for form submission
form.addEventListener("submit", (e) => {
	e.preventDefault();
	// Use the toLowerCase() method to convert email to lowercase for validation
	emailInput.value = emailInput.value.toLowerCase();

	if (validateForm()) {
		if (newsEventsCheckBox.checked) {
			showToast("Vous serez prévenu(e) des prochains événements !");
		}
		showConfirmationModal();
		form.reset();
	}
});
