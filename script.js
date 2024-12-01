// Toggle the navigation menu and overlay when hamburger is clicked
document.getElementById("hamburger").addEventListener("click", function () {
  var navLinks = document.getElementById("nav-links");
  var overlay = document.getElementById("overlay");

  // Toggle active class to show/hide the menu and overlay
  navLinks.classList.toggle("active");
  overlay.classList.toggle("active");
});

// Close the menu when the overlay is clicked
document.getElementById("overlay").addEventListener("click", function () {
  var navLinks = document.getElementById("nav-links");
  var overlay = document.getElementById("overlay");

  // Remove active class to hide the menu and overlay
  navLinks.classList.remove("active");
  overlay.classList.remove("active");
});

// Reset the navigation menu when the screen size changes
window.addEventListener("resize", function () {
  var navLinks = document.getElementById("nav-links");

  // Check if the screen size is greater than 768px
  if (window.innerWidth > 768) {
    navLinks.classList.remove("active");  // Hide the menu if on larger screen
    var overlay = document.getElementById("overlay");
    overlay.classList.remove("active");   // Hide the overlay if on larger screen
  }
});