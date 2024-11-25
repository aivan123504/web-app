// User class to handle user data
class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}

// UserManager class to manage user-related actions
class UserManager {
    constructor() {
        this.users = []; // In-memory storage for users
    }

    signUp(name, email, password) {
        // Check if email already exists
        if (this.users.find(user => user.email === email)) {
            return { success: false, message: "User already exists!" };
        }

        // Add new user
        const newUser = new User(name, email, password);
        this.users.push(newUser);
        return { success: true, message: "Account created successfully!" };
    }

    login(email, password) {
        // Find user by email and password
        const user = this.users.find(user => user.email === email && user.password === password);
        if (user) {
            return { success: true, message: `Welcome, ${user.name}!` };
        }
        return { success: false, message: "Invalid email or password!" };
    }
}

// App class to handle UI interactions
class App {
    constructor() {
        this.userManager = new UserManager();

        // UI Elements
        this.loginForm = document.getElementById("loginForm");
        this.signUpForm = document.getElementById("signUpForm");
        this.toSignUpLink = document.getElementById("toSignUp");
        this.toLoginLink = document.getElementById("toLogin");
        this.loginBtn = document.getElementById("loginBtn");
        this.signUpBtn = document.getElementById("signUpBtn");

        // Event Listeners
        this.addEventListeners();
    }

    addEventListeners() {
        this.toSignUpLink.addEventListener("click", () => this.showSignUpForm());
        this.toLoginLink.addEventListener("click", () => this.showLoginForm());
        this.loginBtn.addEventListener("click", () => this.handleLogin());
        this.signUpBtn.addEventListener("click", () => this.handleSignUp());
    }

    showSignUpForm() {
        this.loginForm.style.display = "none";
        this.signUpForm.style.display = "block";
    }

    showLoginForm() {
        this.signUpForm.style.display = "none";
        this.loginForm.style.display = "block";
    }

    handleSignUp() {
        const name = document.getElementById("signUpName").value;
        const email = document.getElementById("signUpEmail").value;
        const password = document.getElementById("signUpPassword").value;

        const result = this.userManager.signUp(name, email, password);
        alert(result.message);
        if (result.success) {
            this.showLoginForm();
        }
    }

    handleLogin() {
        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        const result = this.userManager.login(email, password);
        alert(result.message);
    }
}

// Initialize the app
const app = new App();
