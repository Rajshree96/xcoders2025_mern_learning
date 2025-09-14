function removeuser(event, email) {
    event.preventDefault();  

    if (!email) return alert('email is required to remove');

     // Confirmation before deletion
    const confirmDelete = confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return; // User cancelled

    let existingUsers = JSON.parse(localStorage.getItem('userDetails')) || [];

    //✅  filter--> Frontend approach to exclude selected data hide on UI -- not actual delete
    let removeExistingusers = existingUsers.filter((user) => { return (user.email !== email) });
        if (existingUsers.length === removeExistingusers.length) return alert("User not found — no deletion occurred");

    localStorage.setItem('userDetails', JSON.stringify(removeExistingusers));

    // // ✅ Splice --> not recomend for frontend, Actual use in backend you must know index to delete
    // let selectedIndex = existingUsers.findIndex((user) => { return (user.email === email) })
    // if (selectedIndex !== -1) {
    //     existingUsers.splice(selectedIndex, 1);
    // }
    // localStorage.setItem('userDetails', JSON.stringify(existingUsers));

showuser();
}



