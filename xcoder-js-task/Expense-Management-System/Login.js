function loginUser(event){
       event.preventDefault();     

  let email = document.getElementById("loginEmail").value.trim();
  let password = document.getElementById("loginPassword").value.trim();

   if ( !email || !password ) {
        return alert('please fill all fields');
    }

  let existingUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

  let matchedUser = existingUsers.find((user)=>{return (user.email===email && user.password=== password)})
  if (!matchedUser) return alert ("Invalid Credentials");

  // Save login session
        localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
  
  window.location.href = "Dashboard.html";
  
    
}

