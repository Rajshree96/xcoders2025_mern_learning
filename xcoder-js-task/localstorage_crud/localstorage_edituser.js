function edituser(event, user_id) {

  event.preventDefault();

  let allUsers  = JSON.parse(localStorage.getItem("userDetails")) || [];

  let matchedUser = allUsers .find((user) => {return user.user_id === user_id; });
  if (!matchedUser) return alert("user not found");

  localStorage.setItem("edit_user_id", JSON.stringify(user_id)); //  set userid in localstorage

  
  // Destructure values for prefill
  let { fullname, username, email, password } = matchedUser;   // object destructuring name should be same of key name (use (:colon)if you want to rename)

  // prefill form fields
  document.getElementById("fullname").value = fullname.trim(); // Use .trim():✅ When reading form data to save ❌ Not when assigning values to inputs
  document.getElementById("username").value = username.trim();
  document.getElementById("useremail").value = email.trim().toLowerCase();
  document.getElementById("userpassword").value = password;
  


  const submmitBtn = document.getElementById("formSubmitBtn");

  submmitBtn.innerHTML = "🔄 Update User";
  submmitBtn.onclick = updateUser;
  submmitBtn.style.backgroundColor = "#2948afff";
}

  //--------- update users ----------------

function updateUser() {
  let userIdToUpdate = JSON.parse(localStorage.getItem("edit_user_id"));
  if (!userIdToUpdate) return alert("No user selected for update");

  let allUsers  = JSON.parse(localStorage.getItem("userDetails")) || [];

  let userIndex = allUsers .findIndex((user) => user.user_id === userIdToUpdate);    // Duplicate Check
  if (userIndex === -1) return alert("User not found for update");

  // Fetch new values
  let fullname = document.getElementById("fullname").value.trim();
  let username = document.getElementById("username").value.trim();
  let email = document.getElementById("useremail").value.trim();
  let password = document.getElementById("userpassword").value;

  if (allUsers [userIndex].email !== email) {
    if (allUsers .some((user) => user.email === email))
      return alert("email is already registered");
  }

  if (!fullname || !username || !email || !password) {    // Basic validation (you can go deeper)
    return alert("All fields are required");
  }

  if (!validateForm()) {   // validate form before submit-- Form valid nahi hai to stop
        return;  
    }
  if (!confirm("Are you sure you want to update this user?")) return;  // ✅ Confirm Update

  // Update values in the object
  allUsers [userIndex].fullname = fullname;
  allUsers [userIndex].username = username;
  allUsers [userIndex].email = email;
  allUsers [userIndex].password = password;

  // allUsers[userIndex] = {
  //   ...allUsers[userIndex], 
  //   fullname: fullname,
  //   username: username,
  //   email: email,
  //   password: password
  // };

  localStorage.setItem("userDetails", JSON.stringify(allUsers ));   // Save back to localStorage
  alert("User updated successfully!");
localStorage.removeItem("edit_user_id"); // Clean up

  //form reset to add user
  const submitBtn = document.getElementById("formSubmitBtn");
  
  submitBtn.innerText = "✅ Register Now";
  submitBtn.style.backgroundColor = "#28A745";
  submitBtn.onclick = function (event) {
    adduser(event);
  };

  document.getElementById("editForm").reset(); // if form has an id     // Optionally reset form or redirect
}














//---------------✅ Direct table mode update no need form-----------------------------

// let currentlyEditingUserId = null; // Global variable for tracking

// function saveInlineEdit(user_id) {
//   let existingUsers = JSON.parse(localStorage.getItem("userDetails")) || [];
  
//   let index = existingUsers.findIndex(user => user.user_id === user_id);
//   if (index === -1) return alert("User not found");

//   // Get updated values from inline inputs
//   let fullname = document.getElementById("editFullname").value.trim();
//   let username = document.getElementById("editUsername").value.trim();
//   let email = document.getElementById("editEmail").value.trim().toLowerCase();
//   let password = document.getElementById("editPassword").value;

//   // ✅ Basic validation
//   if (!fullname || !username || !email || !password) {
//     alert("All fields are required");
//     return;
//   }

//   // ✅ Email duplication check (exclude current user)
//   if (existingUsers.some((user, i) => user.email === email && i !== index)) {
//     alert("Email already exists!");
//     return;
//   }

//   // ✅ Update in LocalStorage
//   existingUsers[index].fullname = fullname;
//   existingUsers[index].username = username;
//   existingUsers[index].email = email;
//   existingUsers[index].password = password;

//   localStorage.setItem("userDetails", JSON.stringify(existingUsers));

//   alert("User updated successfully!");

//   // ✅ Clear edit mode
//   currentlyEditingUserId = null;
//   showuser(); // Refresh the table
// }
// function startInlineEdit(user_id) {
//   currentlyEditingUserId = user_id;
//   showuser(); // Rerender the table in edit mode
// }

// function cancelInlineEdit() {
//   currentlyEditingUserId = null;
//   showuser(); // Reset UI
// }
