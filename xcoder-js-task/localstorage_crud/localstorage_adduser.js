// ✅ Regex Patterns
const nameRegex = /^[A-Za-z\s]{3,50}$/; // Full name
const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/; // Username
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/; // Email
const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,20}$/; // Password

// ✅ Reusable Error Display Function
function showErrorMessage(id, message) {
    const el = document.getElementById(id);
    el.innerHTML = message;
    el.style.color = "red";
    el.style.fontSize = "0.85rem";
    el.style.marginTop = "4px";
}

// ✅ Individual Fields Validation

function validateFullName() {
    const fullname = document.getElementById("fullname").value.trim();

    const errorMsg = !fullname
        ? "Full name is required"
        : !nameRegex.test(fullname)
            ? /\d/.test(fullname)
                ? "❌ Numbers are not allowed in name"
                : /[^A-Za-z ]/.test(fullname)
                    ? "❌ Special characters are not allowed in name"
                    : "❌ atleast minimum 3 characters"
            : "";

    showErrorMessage("fullname-error", errorMsg);
    return !errorMsg; //👉 return  if No error found, exit
}

function validateUserName() {
    const username = document.getElementById("username").value.trim();
    const errorMsg = !username
        ? "Username is required"
        : !usernameRegex.test(username)
            ? "❌Only letters, numbers or underscores (3–20 chars) accept"
            : "";

    showErrorMessage("username-error", errorMsg);
    return !errorMsg;
}

function validateEmail() {
    const email = document.getElementById("useremail").value.trim().toLowerCase();
    const errorMsg = !email
        ? "Email is required"
        : !emailRegex.test(email)
            ? "❌Invalid email format"
            : "";

    showErrorMessage("email-error", errorMsg);
    return !errorMsg;
}

function validatePassword() {
    const password = document.getElementById("userpassword").value;
    const errorMsg = !password
        ? "Password is required"
        : password.length < 8 || password.length > 20
            ? "❌Password must be 8–20 characters"
            : !/[A-Z]/.test(password)
                ? "❌Include at least one uppercase letter"
                : !/[a-z]/.test(password)
                    ? "❌Include at least one lowercase letter"
                    : !/\d/.test(password)
                        ? "❌Include at least one number"
                        : !/[@#$%^&+=!]/.test(password)
                            ? "❌Include at least one special character (@#$%^&+=!)"
                            : "";

    showErrorMessage("password-error", errorMsg);
    return !errorMsg;
}

function eyetogglePassword() {
    const password = document.getElementById("userpassword"); // Get the password input field
    const icon = document.getElementById("eyetogglePassword"); // Get the eye icon element

    const isPassword = password.type === "password"; // Check if input type is currently 'password' i.e isPassword = true

    password.type = isPassword ? "text" : "password"; // isPassword(true) - text  <-----> isPassword(false) -- password
    icon.innerHTML = isPassword
        ? '<i class="bi bi-eye"></i>'
        : '<i class="bi bi-eye-slash"></i>';
}

function validateConfirmPassword() {
    const password = document.getElementById("userpassword").value.trim();
    const confirmPassword = document
        .getElementById("confirmpassword")
        .value.trim();
    const errorMsg = !confirmPassword
        ? "❌Confirm password is required"
        : password !== confirmPassword
            ? "❌Passwords do not match"
            : "";

    showErrorMessage("confirmpassword-error", errorMsg);
    return !errorMsg;
}

// ✅ Form Validator

function validateForm() {
    return (
        validateFullName() &&
        validateUserName() &&
        validateEmail() &&
        validatePassword() &&
        validateConfirmPassword()
    );
}

// function validateForm() {  ✅ // (with array) -- all error msg show
//     const validations = [validateFullName(), validateUserName(), validateEmail(), validatePassword(), validateConfirmPassword(),];
//     return validations.every(Boolean); // Return true only if all are true --> Bollean Perfect jab array mein true/false values ho
// }

// ✅ Random Id Generate
function randomId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
}

// ================================✅ Registerd User on Submit==================================================

function adduser(event) {
    event.preventDefault(); //prevent form reload on submit

    if (!validateForm()) {
        // validate form before submit-- Form valid nahi hai to stop
        return;
    }

    // ✅ get values from input fields
    const fullname = document.getElementById("fullname").value.trim();
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("useremail").value.trim().toLowerCase();
    const password = document.getElementById("userpassword").value.trim();

    // ✅ create object & set input values
    const userObj = {
        // id: Date.now(),
        user_id: randomId(),
        fullname:fulname,
        username,
        email,
        password, // Note: In real apps, never store plain passwords!
    };

    const existingUsers = JSON.parse(localStorage.getItem("userDetails")) || []; // ✅ get data from the localstotage

   

    existingUsers.push(userObj); // ✅ insert new data to localstorage
    localStorage.setItem("userDetails", JSON.stringify(existingUsers)); // ✅ save back to localstorage
    alert("User registered successfully!"); // ✅ show message when data is save

    document.getElementById("myForm").reset(); // ✅ Reset form all fields --> using form id
    showuser();
}

// ✅Jab page load ho tab hi real-time validation lagao
window.onload = function () {
    document.getElementById("fullname").oninput = validateFullName;
    document.getElementById("username").oninput = validateUserName;
    document.getElementById("useremail").oninput = validateEmail;
    document.getElementById("userpassword").oninput = validatePassword;
    document.getElementById("confirmpassword").oninput = validateConfirmPassword;
    //  document.getElementById("myForm").addEventListener("submit", adduser);  // if btn onclick not added then this will use
    showuser();
  
};
