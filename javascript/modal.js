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
const navList = document.querySelector(".nav-list");
const iconBurger = document.querySelector(".icon");
const mainContent = document.querySelector('main');

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
 * Toggle mobile navigation visibility and manage burger menu interactions
 */ 
function toggleNav() {
  nav.classList.toggle("responsive");
  const isOpen = iconBurger.classList.toggle("toggle-nav");
  
  if (isOpen) {
    const navHeight = navList.offsetHeight; // Calculate the height of the navigation list
    document.body.classList.add("no-scroll"); // Disable scrolling on the body
    mainContent.classList.add("overlay-effect"); // Add a visual effect to the main content
    mainContent.style.marginTop = `${navHeight}px`; // Adjust the margin based on the height of the navigation
  } else {
    document.body.classList.remove("no-scroll");
    mainContent.classList.remove("overlay-effect");
    mainContent.style.marginTop = "0"; // Reset the margin of the main content to zero
  }
}

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
 * Close modal
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
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Close the modal
closeBtn.addEventListener("click", () => {
  closeModal(); 
  form.reset(); // Reset the form fields
  inputs.forEach(input => {
    clearError(input); // Clear any error messages
  });
});

// Toggle the navigation
iconBurger.addEventListener("click", toggleNav);

// Close the confirmation modal if a button with '.close' or '.button' is clicked
confirmationModal.addEventListener("click", (e) => {
  if (e.target.classList.contains("close") || e.target.classList.contains("button")) {
    closeConfirmationModal();
  }
});