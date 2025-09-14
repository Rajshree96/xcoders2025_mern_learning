function handleEditExpense(event, expenseId) {
  
  event.preventDefault();

  let allExpenses = JSON.parse(localStorage.getItem('userExpenses')) || [];

  let matchedExpenses = allExpenses.find((exp) => { return exp.expense_id === expenseId; })
  if (!matchedExpenses) return alert("expenses not found");

  localStorage.setItem("editSelectedExpense", JSON.stringify(matchedExpenses));   // Save selected expense in localStorage
  window.location.href = "AddExpenses.html"; // or EditExpense.html   // Redirect to form page
}

