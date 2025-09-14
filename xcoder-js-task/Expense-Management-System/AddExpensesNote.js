function addExpenseNotes(event, expenseId) {
    event.preventDefault();

    let note = prompt("💬 Enter a note for this expense (Max 150 characters):");

    if (note === null) return; // Cancel pressed

    note = note.trim();

    if (note.length === 0) {
        alert("🚫 Note cannot be empty.");
        return;
    }

    if (note.length > 150) {
        alert("🚫 Note should not exceed 150 characters.");
        return;
    }

    const allExpenses = JSON.parse(localStorage.getItem("userExpenses")) || [];

    const index = allExpenses.findIndex(exp => exp.expense_id === expenseId);
    if (index === -1) {
        alert("🚫 Expense not found!");
        return;
    }

    allExpenses[index] = {
        ...allExpenses[index],
        note, // ✅ update or add note
    };

    localStorage.setItem("userExpenses", JSON.stringify(allExpenses));
    alert("✅ Expense note added successfully!");
    allexpenses(); // Re-render the list
}
