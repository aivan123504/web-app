






// On page load, retrieve user data from localStorage
window.addEventListener('load', () => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));

    if (user) {
        // Update the user name in the UI
        document.getElementById('user-name').textContent = `${user.name}`;
    } else {
        // If no user found, display a default message or handle the case as needed
        document.getElementById('user-name').textContent = 'Guest';
    }
});

// Hamburger button to toggle sidebar visibility
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const content = document.getElementById('content');

hamburger.addEventListener('click', () => {
    sidebar.classList.toggle('sidebar-hidden');
    content.classList.toggle('content-expanded');
});

// Search functionality
const searchBar = document.getElementById('search-bar');
const cardsContainer = document.getElementById('cards-container');

searchBar.addEventListener('input', function () {
    const searchTerm = searchBar.value.toLowerCase();
    const cards = cardsContainer.getElementsByClassName('card');
    
    for (let i = 0; i < cards.length; i++) {
        const location = cards[i].getAttribute('data-location').toLowerCase();
        if (location.includes(searchTerm)) {
            cards[i].style.display = '';
        } else {
            cards[i].style.display = 'none';
        }
    }
});
// Add event listener to the logout link
document.getElementById('logout-link').addEventListener('click', function(event) {
// Prevent the default action (navigation)
event.preventDefault();

// Show a confirmation dialog
const confirmLogout = confirm("Are you sure you want to log out?");

// If the user confirms, redirect to the index page
if (confirmLogout) {
    window.location.href = "../index.html";  // Redirect to index.html
}
});