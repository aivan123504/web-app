// User Management Class (mock backend using local storage)
class UserAuth {
    constructor() {
        // Use localStorage to persist user data
        this.usersKey = 'users';
        if (!localStorage.getItem(this.usersKey)) {
            localStorage.setItem(this.usersKey, JSON.stringify([])); // Initialize users if not present
        }
    }

    // Fetch all users
    fetchUsers() {
        const users = localStorage.getItem(this.usersKey);
        return JSON.parse(users);
    }

    // Save updated users list to local storage
    saveUsers(users) {
        localStorage.setItem(this.usersKey, JSON.stringify(users));
    }

    // Check if a user with a specific email exists
    userExists(email) {
        const users = this.fetchUsers();
        return users.some(user => user.email === email);
    }

    // Register a new user
    registerUser(name, email, password) {
        if (this.userExists(email)) {
            throw new Error('User already exists!');
        }

        const users = this.fetchUsers();
        users.push({ name, email, password });
        this.saveUsers(users);

        return 'Account created successfully! You can login now';
    }

    // Log in a user
    loginUser(email, password) {
        const users = this.fetchUsers();
        const user = users.find(
            user => user.email === email && user.password === password
        );

        if (!user) {
            throw new Error('Invalid email or password!');
        }

        return user; // Return user details on successful login
    }
}

// UI Management Class
class ModalManager {
    constructor() {
        this.loginModal = document.getElementById('loginModal');
        this.signUpModal = document.getElementById('signUpModal');
        this.overlay = document.getElementById('overlay');
    }

    // Show a specific modal
    showModal(modal) {
        modal.style.display = 'block';
        this.overlay.style.display = 'block';
    }

    // Hide all modals
    hideModals() {
        this.loginModal.style.display = 'none';
        this.signUpModal.style.display = 'none';
        this.overlay.style.display = 'none';
    }

    // Switch between Login and Sign-Up modals
    switchModal(currentModal, targetModal) {
        currentModal.style.display = 'none';
        targetModal.style.display = 'block';
    }
}

// Instantiate classes
const auth = new UserAuth();
const modalManager = new ModalManager();

// Add event listeners for modal interactions
document.getElementById('loginBtn').addEventListener('click', () => {
    modalManager.showModal(modalManager.loginModal);
});

document.getElementById('signUpBtn').addEventListener('click', () => {
    modalManager.showModal(modalManager.signUpModal);
});

document.getElementById('toSignUp').addEventListener('click', () => {
    modalManager.switchModal(modalManager.loginModal, modalManager.signUpModal);
});

document.getElementById('toLogin').addEventListener('click', () => {
    modalManager.switchModal(modalManager.signUpModal, modalManager.loginModal);
});

document.getElementById('overlay').addEventListener('click', () => {
    modalManager.hideModals();
});

// Handle Sign-Up Form Submission
document.getElementById('signUpForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('signUpName').value.trim();
    const email = document.getElementById('signUpEmail').value.trim();
    const password = document.getElementById('signUpPassword').value;

    try {
        const message = auth.registerUser(name, email, password);
        alert(message);
        modalManager.hideModals();
    } catch (error) {
        alert(error.message);
    }
});

// Handle Login Form Submission
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    try {
        const user = auth.loginUser(email, password);
        alert(`Welcome, ${user.name}`);

        // Save user data in localStorage
        localStorage.setItem('loggedInUser', JSON.stringify(user));

        modalManager.hideModals();
        // Redirect to dashboard
        window.location.href = '../../web-app/pages/dashboard.html'; // Adjust based on your project structure
    } catch (error) {
        alert(error.message);
    }
});
