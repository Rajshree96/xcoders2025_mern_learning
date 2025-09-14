// 🔢 Generate Unique ID
function randomId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
}

// 📅 Get Current Date
function currentDate() {
    return new Date().toISOString().split("T")[0];
}

// ⏱️ On Load: Prefill if Editing, Else Set Defaults
window.onload = function () {
    const editExpense = JSON.parse(localStorage.getItem("editSelectedExpense"));

    if (editExpense) {
        prefillForm(editExpense); // ✏️ Edit mode
    } else {
        document.getElementById("expenseDate").value = currentDate(); // 🆕 Add mode
        document.getElementById("expenseId").value = randomId();
    }

    // Make both readOnly
    document.getElementById("expenseDate").readOnly = true;
    document.getElementById("expenseId").readOnly = true;
};

// ✏️ Fill Form Data for Editing
function prefillForm(data) {
    const { title, date, amount, expense_id } = data;

    document.getElementById("expenseTitle").value = title;
    document.getElementById("expenseDate").value = date;
    document.getElementById("expenseAmount").value = amount;
    document.getElementById("expenseId").value = expense_id;

    // ✅ Edit Form Title 
    const expenseTitle = document.getElementById('Add-expenses-title');
    expenseTitle.innerHTML = "Update Expenses";

    // ✅ Update button style
    const submitBtn = document.getElementById("expenseForm-SubmitBtn");
    submitBtn.innerText = "✅ Update Expense";
    submitBtn.className = "btn btn-success me-2";

    // ❌ Add cancel button only once
    if (!document.getElementById("cancelBtn")) {
        const cancelBtn = document.createElement("button");
        cancelBtn.id = "cancelBtn";
        cancelBtn.innerText = "❌ Cancel";
        cancelBtn.className = "btn btn-danger";
        cancelBtn.onclick = resetForm;

        submitBtn.parentNode.insertBefore(cancelBtn, submitBtn.nextSibling);
    }
}

// ➕ Add OR ✏️ Update Expense
function addExpenses(event) {
    event.preventDefault();

    const title = document.getElementById("expenseTitle").value.trim();
    const date = document.getElementById("expenseDate").value.trim();
    const amount = document.getElementById("expenseAmount").value.trim();
    const expenseId = document.getElementById("expenseId").value.trim();

    if (!title || !date || !amount || !expenseId)
        return alert("❗Please fill all fields.");

    const allExpenses = JSON.parse(localStorage.getItem("userExpenses")) || [];
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser?.user_id) return alert("🚫 No user logged in");

    const editingData = JSON.parse(localStorage.getItem("editSelectedExpense"));

    if (editingData) {
        // ✏️ Update Flow
        const index = allExpenses.findIndex(exp => exp.expense_id === editingData.expense_id);
        if (index === -1) return alert("⚠️ Expense not found.");

        if (!confirm("Are you sure you want to update this user?")) return;  // ✅ Confirm Update

        allExpenses[index] = {
            ...allExpenses[index],
            title,
            date,
            amount,
            expense_id: expenseId,
        };

        // allExpenses[index].title = title;
        // allExpenses[index].date = date;
        // allExpenses[index].amount = amount;
        // allExpenses[index].expense_id = expenseId;


        alert("✅ Expense updated successfully!");
    } else {
        // ➕ New Add Flow
        const newExpense = {
            title,
            date,
            amount,
            expense_id: expenseId,
            user_id: loggedInUser.user_id,
        };

        allExpenses.push(newExpense);
        alert("✅ Expense added successfully!");
    }

    localStorage.setItem("userExpenses", JSON.stringify(allExpenses));
    localStorage.removeItem("editSelectedExpense");
    window.location.href = "AllExpenses.html";
}

// 🔄 Reset the form to Add mode
function resetForm() {
    document.getElementById("expenseTitle").value = "";
    document.getElementById("expenseAmount").value = "";
    document.getElementById("expenseDate").value = currentDate();
    document.getElementById("expenseId").value = randomId();

    const submitBtn = document.getElementById("expenseForm-SubmitBtn");
    submitBtn.innerText = "➕ Add Expense";
    submitBtn.className = "btn btn-warning me-2";

    const cancelBtn = document.getElementById("cancelBtn");
    if (cancelBtn) cancelBtn.remove();

    localStorage.removeItem("editSelectedExpense");
    window.location.href = "AllExpenses.html";
}
