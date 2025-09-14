function logoutUser(event){

    event.preventDefault();
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
    
    
    
}