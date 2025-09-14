function handleEditExpenseNote(event) {
    event.preventDefault();

    const expenseId = localStorage.getItem('editNoteExpenseId');
    const allExpenses = JSON.parse(localStorage.getItem('userExpenses')) || [];

    const matchedExpense = allExpenses.find(exp => exp.expense_id === expenseId);
    if (!matchedExpense) return alert("❌ Expense not found");

    // 1. Enable editing
    const editableDiv = document.getElementById("editableNote");
    editableDiv.setAttribute("contenteditable", true);
    editableDiv.textContent = matchedExpense.note || "";

    // 2. Show Save button
    const saveBtn = document.getElementById("saveNoteBtn");
    saveBtn.classList.remove("d-none");

    // 3. Avoid duplicate listeners: remove old listener if needed
    saveBtn.onclick = function () {
        saveUpdatedNote(expenseId);
    };
}

function saveUpdatedNote(expenseId) {
    const updatedNote = document.getElementById("editableNote").textContent.trim();

    if (updatedNote.length > 150) {
        return alert("🚫 Note too long! Please limit to 150 characters.");
    }

    let allExpenses = JSON.parse(localStorage.getItem('userExpenses')) || [];
    const expenseIndex = allExpenses.findIndex(exp => exp.expense_id === expenseId);

    if (expenseIndex === -1) return alert("Expense not found for saving");

    allExpenses[expenseIndex].note = updatedNote;

    localStorage.setItem("userExpenses", JSON.stringify(allExpenses));

    alert("✅ Note updated successfully!");

    localStorage.removeItem("editNoteExpenseId", expenseId);

   // ✅ THIS IS MISSING IN MOST CASES:
    allexpenses();  // ⬅️ Call this to re-render updated data

    // Optional: Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('noteModal'));
    modal.hide();
}
