function allexpenses() {
    const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const allExpenses = JSON.parse(localStorage.getItem("userExpenses")) || [];

    // 1. Filter by logged-in user
    const userFilteredExpenses = allExpenses.filter(exp => exp.user_id === currentUser.user_id);

    // 2. Get filter inputs
    const selectedYear = document.getElementById('filter-year')?.value;
    const selectedMonth = document.getElementById('filter-month')?.value;
    const selectedDay = document.getElementById('filter-day')?.value;

    // 3. Apply optional filters
    const finalFilteredExpenses = userFilteredExpenses.filter((exp) => {
        const dateObj = new Date(exp.date);
        return (
            (!selectedYear || dateObj.getFullYear() == selectedYear) &&
            (!selectedMonth || dateObj.getMonth() == selectedMonth) &&
            (!selectedDay || dateObj.getDate() == selectedDay)
        );
    });

    // 4. Render to table
    const tableBody = document.getElementById('expense-tableBody');
    if (!tableBody) return console.error("❌ Table body not found");

    if (finalFilteredExpenses.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="6" class="text-center text-danger">No expenses found</td></tr>`;
        return;
    }

    const expenseRows = finalFilteredExpenses.map((exp, index) => {
        return `
        <tr>
            <td>${index + 1}</td>
            <td>${exp.title}</td>
            <td>${exp.date}</td>
            <td>₹${exp.amount}</td>
            <td>${exp.expense_id}</td>
<td style="position: relative;">
  ${
    exp.note
      ? (exp.note.length > 40
          ? `${exp.note.slice(0, 40)}... <b class="text-primary" style="cursor:pointer; font-size:12px;" onclick="showNoteModal('${exp.note.replace(/'/g, "\\'")}', '${exp.expense_id}')">Read more</b>`
          : `<span>${exp.note}</span>`
        )
      : `<button class="btn btn-warning fw-bold" onclick="addExpenseNotes(event, '${exp.expense_id}')">➕ Add Notes</button>`
  }

  

  ${
    exp.note
      ? `<i class="bi bi-pencil-square text-success"  style="cursor:pointer; position: relative; top: 4px; right: 4px; font-size: 14px;" title="Edit Note" 
      onclick="showNoteModal('${exp.note.replace(/'/g, "\\'")}', '${exp.expense_id}', true)"></i>`
      : ''
  }

            <td>
             
                <i class="bi bi-pencil-fill text-primary" style="cursor:pointer;" 
                   onclick="handleEditExpense(event, '${exp.expense_id}')" title="Edit Expense"></i>
                &nbsp;
                <i class="bi bi-trash text-danger" style="cursor:pointer;" 
                   onclick="handleRemoveExpense(event, '${exp.expense_id}')" title="Delete Expense"></i>
                &nbsp;
              
            </td>
        </tr>`;
    });

    tableBody.innerHTML = expenseRows.join("");

    // 5. Add Total row
    const totalAmount = finalFilteredExpenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
    tableBody.innerHTML += `
        <tr class="fw-bold">
            <td colspan="3" class="text-end">Total</td>
            <td>₹${totalAmount.toFixed(2)}</td>
            <td colspan="2"></td>
        </tr>
    `;
}

// Read More Note

function showNoteModal(noteText, expenseId, editable = false) {
    const editableDiv = document.getElementById("editableNote");
    editableDiv.textContent = noteText || "No notes yet";

    if (editable) {
        // Editable mode
        editableDiv.setAttribute("contenteditable", "true");
        editableDiv.style.border = "1px solid #ccc";
        editableDiv.style.backgroundColor = "white";
        document.getElementById("saveNoteBtn").classList.remove("d-none");
    } else {
        // Read-only mode
        editableDiv.setAttribute("contenteditable", "false");
        editableDiv.style.border = "none";
        editableDiv.style.backgroundColor = "transparent";
        document.getElementById("saveNoteBtn").classList.add("d-none");
    }

    // Store expenseId for saving edits
    localStorage.setItem("editNoteExpenseId", expenseId);

    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('noteModal'));
    modal.show();
}








