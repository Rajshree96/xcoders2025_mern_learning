function randomId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
}

function registerUser(event) {
    event.preventDefault();

    let fullname = document.getElementById('registerName').value.trim();
    let email = document.getElementById('registerEmail').value.trim().toLowerCase();
    let password = document.getElementById('registerPassword').value;
    let confirmPassword = document.getElementById('registerConfirmPassword').value;

    if (!fullname || !email || !password || !confirmPassword) {
        return alert('please fill all fields');
    }

    if (password !== confirmPassword) {
        return alert("password does not match");
    }


    let userObj = {
        user_id: randomId(),
        fullname: fullname,
        email: email,
        password: password,
    }

    let existingUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

    let emailExists = existingUsers.some((user) => { return (user.email === email) })
    if (emailExists) return alert("this email is already registered");

    existingUsers.push(userObj);

    localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));

    alert("user Registered Successfuully");

    //Reset the form fields
    document.getElementById('registerName').value = "";
    document.getElementById('registerEmail').value = "";
    document.getElementById('registerPassword').value = "";
    document.getElementById('registerConfirmPassword').value = "";

    // document.getElementById('Registeration-Form').reset();


    window.location.href = "Login.html"


}