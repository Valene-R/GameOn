/////
// CONSTANTS / VARIABLES
/////

// DOM Elements
const nav = document.getElementById("myTopnav");
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close");


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


/**** Events listener ****/

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Close the modal
closeBtn.addEventListener("click", closeModal);

// Toggle the navigation
document.querySelector('.icon').addEventListener("click", toggleNav);