function dashboard() {

    let currentUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!currentUser) {
        alert("Please login first"); // No user logged in — redirect to login
        window.location.href = "login.html";
        return;
    }

    // Current Username 
    if (currentUser && currentUser.fullname) {
        let username = currentUser.fullname.charAt(0).toUpperCase() + currentUser.fullname.slice(1).toLowerCase();
        document.getElementById("navbar-username").textContent = username;
        document.getElementById("dashboard-username").textContent = username;
    } else {
        console.warn("No user fullname found");
    }

    let allExpenses = JSON.parse(localStorage.getItem("userExpenses")) || [];

    // Filter by current user's expenses
    let userFilteredExpenses = allExpenses.filter((expenses) => expenses.user_id === currentUser.user_id);

    //  Card 1: Total number of expenses
    let totalExpenses = userFilteredExpenses.length
    document.getElementById("user-totalExpenses").innerHTML = totalExpenses;


    // Card 2: Total amount spent (all time)   
    let totalAmount = userFilteredExpenses.reduce((sum, exp) => sum + Number(exp.amount), 0)
    document.getElementById('user-transactions').innerHTML = totalAmount;

    // 🧠 Card 3: Total amount spent in the current month

    let today = new Date();
    let currentMonthIndex = today.getMonth();        // 7 (August) (because Jan = 0, Dec = 11 )
    let currentYearValue = today.getFullYear();      //  2025

    let currentMonthExpenses = userFilteredExpenses.filter((expense) => {
        let expenseDateObj = new Date(expense.date); // 
        let expenseMonthIndex = expenseDateObj.getMonth();  // 7 (August)
        let expenseYearValue = expenseDateObj.getFullYear(); //2025

        return (
            expenseMonthIndex === currentMonthIndex && expenseYearValue === currentYearValue //  7===7 && 2025 ===2025
        );
    });

    let totalThisMonth = currentMonthExpenses.reduce((sum, expense) => sum + Number(expense.amount), 0);

    document.getElementById('user-monthlySpendingAmount').innerHTML = `₹${totalThisMonth}`;


}


function renderExpenseChart() {
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};
    let allExpenses = JSON.parse(localStorage.getItem("userExpenses")) || [];

    // ✅ Filter user-specific expenses
    let userFilteredExpenses = allExpenses.filter(exp => exp.user_id === loggedInUser.user_id);

    // ✅ Use .map() to extract titles and amounts
    let labels = userFilteredExpenses.map(exp => exp.title);
    let data = userFilteredExpenses.map(exp => Number(exp.amount));

    // ✅ Optional: random background colors for bars
    let backgroundColors = data.map(() => {
        return `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`;
    });

    // ✅ Destroy previous chart if exists
    if (window.myChart) {
        window.myChart.destroy();
    }

    // ✅ Create chart using Chart.js
    const ctx = document.getElementById("expenseChart").getContext("2d");
    window.myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: '₹ Amount Spent',
                data: data,
                backgroundColor: backgroundColors,
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: (ctx) => `₹${ctx.parsed.y}`
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: val => `₹${val}`
                    }
                }
            }
        }
    });
}
window.onload = function () {
    dashboard();       // username show karne ke liye
    renderExpenseChart();  // chart banane ke liye
};


