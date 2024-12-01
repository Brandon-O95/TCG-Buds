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

const personIcon = document.getElementById("person-icon");
const dropdownForm = document.getElementById("dropdown-form");
const form = dropdownForm.querySelector("form"); // Select the form inside the dropdown

personIcon.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent default link behavior
  const isVisible = dropdownForm.style.display === "block";
  dropdownForm.style.display = isVisible ? "none" : "block";

  if (isVisible) {
    form.reset(); // Reset form inputs when closing the dropdown
  }
});

// Prevent the dropdown from closing when clicked inside
dropdownForm.addEventListener("click", function (event) {
  event.stopPropagation(); // Stop click event from bubbling to the document
});

document.addEventListener("click", function (event) {
  // Close dropdown if clicked outside
  if (!personIcon.contains(event.target)) {
    dropdownForm.style.display = "none";
    form.reset(); // Reset form inputs when the dropdown is closed by clicking outside
  }
});

const cartIcon = document.querySelector('.cart-icon');
const cartMenu = document.querySelector('.cart-menu');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.querySelector('.cart-count');
let cart = [];

// Toggle Cart Menu
cartIcon.addEventListener('click', () => {
  cartMenu.classList.toggle('open');
});

// Close Cart Menu
document.getElementById('close-cart').addEventListener('click', () => {
  cartMenu.classList.remove('open');
});

// Add to Cart
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const name = button.getAttribute('data-name');
    const price = parseFloat(button.getAttribute('data-price'));

    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ name, price, quantity: 1 });
    }

    updateCart();
  });
});

// Update Cart
function updateCart() {
  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.name} - $${item.price} x ${item.quantity}
      <button class="remove-item" data-name="${item.name}">X</button>
    `;
    cartItems.appendChild(li);
  });

  cartTotal.textContent = total.toFixed(2);
  cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Remove Item
  document.querySelectorAll('.remove-item').forEach(button => {
    button.addEventListener('click', () => {
      const name = button.getAttribute('data-name');
      cart = cart.filter(item => item.name !== name);
      updateCart();
    });
  });
}

const carouselTrack = document.querySelector('.carousel-track');
const cards = document.querySelectorAll('.card');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const cardWidth = cards[0].offsetWidth + 10; // Account for margin
let currentIndex = 0; // Start at the first card
let autoMoveInterval;
let isAutoMoving = true; // Flag to track if auto-moving is enabled

// Update the track width dynamically based on the number of cards
carouselTrack.style.width = `${cards.length * cardWidth}px`;

// Function to move the carousel by one card to the right
const moveRight = () => {
  currentIndex++;
  if (currentIndex >= cards.length) {
    currentIndex = 0; // If it's the last card, loop back to the first one
    carouselTrack.style.transition = "none"; // Disable transition when wrapping around
    carouselTrack.style.transform = `translateX(0)`; // Jump back to the start
    setTimeout(() => {
      carouselTrack.style.transition = "transform 0.5s ease-in-out"; // Re-enable transition
      carouselTrack.style.transform = `translateX(${-currentIndex * cardWidth}px)`; // Start scrolling again
    }, 50); // Small delay to ensure smooth reset
  } else {
    carouselTrack.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
  }
};

// Function to move the carousel by one card to the left
const moveLeft = () => {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = cards.length - 1; // If it's the first card, loop back to the last one
    carouselTrack.style.transition = "none"; // Disable transition when wrapping around
    carouselTrack.style.transform = `translateX(${-cards.length * cardWidth}px)`; // Jump to the last card
    setTimeout(() => {
      carouselTrack.style.transition = "transform 0.5s ease-in-out"; // Re-enable transition
      carouselTrack.style.transform = `translateX(${-currentIndex * cardWidth}px)`; // Start scrolling again
    }, 50); // Small delay to ensure smooth reset
  } else {
    carouselTrack.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
  }
};

// Event listener for right arrow button
rightArrow.addEventListener('click', () => {
  moveRight();
  stopAutoMove();
});

// Event listener for left arrow button
leftArrow.addEventListener('click', () => {
  moveLeft();
  stopAutoMove();
});

// Enable arrow key navigation (left and right arrows)
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    moveRight();
    stopAutoMove();
  } else if (e.key === 'ArrowLeft') {
    moveLeft();
    stopAutoMove();
  }
});

// Stop auto-move when an arrow is clicked
const stopAutoMove = () => {
  if (isAutoMoving) {
    clearInterval(autoMoveInterval);
    isAutoMoving = false;
    // Set a timeout to resume auto-move after 2 seconds of no interaction
    setTimeout(() => {
      if (!isAutoMoving) {
        startAutoMove(); // Resume auto-move after delay
      }
    }, 2000); // Wait 2 seconds before resuming
  }
};

// Start the auto-move functionality
const startAutoMove = () => {
  autoMoveInterval = setInterval(() => {
    moveRight();
  }, 5000); // =
  isAutoMoving = true;
};

// Start auto-move when the page loads
startAutoMove();
