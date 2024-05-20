/////
// CONSTANTS / VARIABLES
/////

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeBtn = document.querySelector(".close");
const modalContent = document.querySelector(".modal-body");

// Create new DOM elements for confirmation modal
const confirmationModal = document.createElement("div");
confirmationModal.classList.add("bground");
confirmationModal.style.display = "none";  // Initially hide

const confirmationContent = document.createElement("div");
confirmationContent.classList.add("content");

const confirmationContainer = document.createElement("div");
confirmationContainer.classList.add("modal-success-body");
confirmationContainer.innerHTML = `
  <button class="close" aria-label="Fermer"></button>
  <h2><span>Merci pour</span><span> votre inscription</span></h2>
  <button class="button btn-confirmation" aria-label="Fermer">Fermer</button>
`;

// Add the elements
confirmationContent.appendChild(confirmationContainer);
confirmationModal.appendChild(confirmationContent);
document.body.appendChild(confirmationModal);  // Add the confirmation modal at body


/////
// FUNCTIONS
/////

/**
 * launch modal form
 */ 
function launchModal() {
  modalbg.style.display = "block";
  // Prevent background interaction by disabling scrolling and clicks
  document.body.classList.add("stop-effect-modalbg");

  // Enable interactions within the modal
  modalbg.style.pointerEvents = "auto";
}

/**
 * Close modal form
 */
function closeModal() {
  modalbg.style.display = "none";
  document.body.classList.remove("stop-effect-modalbg");
}

/**
 * Display the confirmation modal
 */
function showConfirmationModal() {
  modalbg.style.display = "none"; // Hide the modal form
  confirmationModal.style.display = "block";
  document.body.classList.add("stop-effect-modalbg");
  confirmationContent.style.pointerEvents = "auto"; // Detect clicks on the modal
}

/**
 * Close the confirmation modal
 */
function closeConfirmationModal() {
  confirmationModal.style.display = "none";
  document.body.classList.remove("stop-effect-modalbg");
}



/////
// EVENT LISTENERS
/////

// launch modal event
modalBtn.forEach((btn) => {
  btn.addEventListener("click", launchModal)
});

// Close the modal form 
closeBtn.addEventListener("click", () => {
  closeModal(); 
  form.reset(); // Reset the form fields
  // Iterate each input field to clear any existing error messages
  inputs.forEach(input => {
    clearError(input); // Clear the error message associated with this input
  });
});

// Close the confirmation modal if a button with '.close' or '.button' is clicked
confirmationModal.addEventListener("click", (e) => {
  if (e.target.classList.contains("close") || e.target.classList.contains("button")) {
    closeConfirmationModal(); // Close the modal if the condition is met
  }
});
