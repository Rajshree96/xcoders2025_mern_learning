function handleRemoveExpense(event, expenseId) {
    event.preventDefault();

    const allExpenses = JSON.parse(localStorage.getItem("userExpenses")) || [];

    // Confirmation before deletion
    // const confirmDelete = confirm("Are you sure you want to delete this user?");
    // if (!confirmDelete) return; // User cancelled


    // sweetAlert2 with confirm message on delete
    Swal.fire({
        icon: "warning",
        title: "Are you sure?",
        text: "This expense will be deleted.",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel",
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.setItem("backupUserExpenses", JSON.stringify(allExpenses)); // 🛡 Backup before deleting

            const updatedExpenses = allExpenses.filter((exp) => exp.expense_id !== expenseId); // 🗑 Delete the expense
            localStorage.setItem("userExpenses", JSON.stringify(updatedExpenses));

            Swal.fire({
                // SweetAlert2 with success message on delete
                icon: "success",
                title: "Deleted!",
                text: "Your expense has been removed successfully",
                showConfirmButton: false,
                timer: 2000,
            });
            allexpenses(); // // UI refresh after delete
        }
    });
}
