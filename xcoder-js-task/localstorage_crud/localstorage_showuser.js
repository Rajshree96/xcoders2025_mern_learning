function showuser() {
    let existingUsers = JSON.parse(localStorage.getItem("userDetails")) || [];

    let tableBody = document.getElementById("tableBody");

    let showExistingUsers = existingUsers.map((user, index) => {
        return ` 

    <tr>
        <td>${index + 1}</td>
        <td>${user.user_id}</td>
        <td>${user.fullname}</td>
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>${user.password}</td>
        <td>
            <i class="bi bi-pencil-fill text-primary" style="cursor:pointer;" onclick="edituser(event, '${user.user_id}')" title= "Edit"></i>
            &nbsp &nbsp
            <i class="bi bi-trash text-danger" style="cursor:pointer;"  onclick="removeuser(event,'${user.email}')" title= "delete"></i>
        </td> 
  </tr>
  `;
    })
    tableBody.innerHTML = showExistingUsers.join("");   // 

}

// function showuser() {
//   let existingUsers = JSON.parse(localStorage.getItem("userDetails")) || [];
//   let tableBody = document.getElementById("tableBody");

//   let rows = existingUsers.map((user, index) => {
//     let isEditing = (user.user_id === currentlyEditingUserId);

//     return `
//       <tr>
//         <td>${index + 1}</td>
//         <td>${user.user_id}</td>
        
//         <td>${isEditing 
//           ? `<input type="text" id="editFullname" value="${user.fullname}" class="form-control">` 
//           : user.fullname}</td>
        
//         <td>${isEditing 
//           ? `<input type="text" id="editUsername" value="${user.username}" class="form-control">` 
//           : user.username}</td>

//         <td>${isEditing 
//           ? `<input type="email" id="editEmail" value="${user.email}" class="form-control">` 
//           : user.email}</td>

//         <td>${isEditing 
//           ? `<input type="text" id="editPassword" value="${user.password}" class="form-control">` 
//           : user.password}</td>

//         <td>
//           ${isEditing
//             ? `
//               <button class="btn btn-success btn-sm" onclick="saveInlineEdit('${user.user_id}')">✅</button>
//               <button class="btn btn-secondary btn-sm" onclick="cancelInlineEdit()">❌</button>
//             `
//             : `
//               <i class="bi bi-pencil-fill text-primary" style="cursor:pointer;" onclick="startInlineEdit('${user.user_id}')" title="Edit"></i>
//               &nbsp;&nbsp;
//               <i class="bi bi-trash text-danger" style="cursor:pointer;" onclick="removeuser(event, '${user.email}')" title="Delete"></i>
//             `}
//         </td>
//       </tr>
//     `;
//   });

//   tableBody.innerHTML = rows.join("");
// }
