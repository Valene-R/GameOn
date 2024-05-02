/////
// CONSTANTS / VARIABLES
/////

// DOM Elements
const nav = document.getElementById("myTopnav");
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close");
const modalContent = document.querySelector(".modal-body");

// Create new DOM elements for confirmation modal
const confirmationModal = document.createElement("div");
confirmationModal.classList.add("bground");
confirmationModal.style.display = "none";  // Initially hide

const confirmationContent = document.createElement("div");
confirmationContent.classList.add("content");

const confirmationContainer = document.createElement("div");
confirmationContainer.classList.add("modal-sucess-body");
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
 * Toggle mobile navigation visibility
 */ 
function toggleNav() {
  nav.classList.toggle("responsive");
}

/**
 * launch modal form
 */ 
function launchModal() {
  modalbg.style.display = "block";
}

/**
 * Close modal
 */
function closeModal() {
  modalbg.style.display = "none";
}

/**
 * Display the confirmation modal
 */
function showConfirmationModal() {
  modalbg.style.display = "none"; // Hide the modal form
  confirmationModal.style.display = "block";
}

/**
 * Close the confirmation modal
 */
function closeConfirmationModal() {
  confirmationModal.style.display = "none";
}



/////
// EVENT LISTENERS
/////

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Close the modal
closeBtn.addEventListener("click", closeModal);

// Toggle the navigation
document.querySelector(".icon").addEventListener("click", toggleNav);

// Close the confirmation modal if a button with '.close' or '.button' is clicked
confirmationModal.addEventListener("click", (e) => {
  if (e.target.classList.contains("close") || e.target.classList.contains("button")) {
    closeConfirmationModal();
  }
});