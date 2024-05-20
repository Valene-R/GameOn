/////
// CONSTANTS / VARIABLES
/////

// DOM Elements
const nav = document.getElementById("myTopnav");
const navList = document.querySelector(".nav-list");
const iconBurger = document.querySelector(".icon");
const mainContent = document.querySelector("main");


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
    resetNavigation(); // Clean up styles applied for mobile view
  }
}

/**
 * Reset navigation styles when window is resized on larger screens
 */
function resetNavigation() {
  document.body.classList.remove("no-scroll");
  mainContent.classList.remove("overlay-effect");
  mainContent.style.marginTop = "0"; // Reset the margin of the main content to zero
}



/////
// EVENT LISTENERS
/////

// Toggle the navigation
iconBurger.addEventListener("click", toggleNav);

// Window resize events to adjust navigation for larger screens
window.addEventListener("resize", () => {
  // Check if the window is above or equal to a certain width: 768px
  if (window.innerWidth >= 768 && nav.classList.contains("responsive")) {
      nav.classList.remove("responsive");
      iconBurger.classList.remove("toggle-nav");
      resetNavigation();
    }
  }
);