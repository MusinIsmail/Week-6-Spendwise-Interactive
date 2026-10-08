// ==========================================================================
// SpendWise - Dynamic Interactive Budget Application
// ==========================================================================

// --- 1. STATE & DATA COLLECTIONS (ARRAYS & VARIABLES) ---
const monthlyBudget = 3500;

// Array of expense objects representing initial application state
let expenses = [
  { id: 1, title: "Groceries & Dining", amount: 470.0, category: "🍔 Food & Dining" },
  { id: 2, title: "Fuel & Transportation", amount: 180.0, category: "🚗 Transportation" },
  { id: 3, title: "Monthly Rent", amount: 1200.0, category: "🏠 Rent & Housing" },
  { id: 4, title: "Movie & Concert Tickets", amount: 184.0, category: "🎬 Entertainment" },
  { id: 5, title: "Electricity & Internet", amount: 166.0, category: "⚡ Utilities" }
];

// --- 2. DOM ELEMENT REFERENCES ---
const displayBudgetEl = document.getElementById("display-budget");
const displayTotalSpentEl = document.getElementById("display-total-spent");
const displayRemainingEl = document.getElementById("display-remaining");
const statusAlertEl = document.getElementById("status-alert");
const cardsGridEl = document.getElementById("cards-grid");
const expenseFormEl = document.getElementById("expense-form");

// --- 3. CORE LOGIC & CALCULATION FUNCTIONS ---

/**
 * Calculates total expenses by iterating through the array with a loop.
 * @returns {number} Sum of all expense amounts
 */
function calculateTotalExpenses() {
  let total = 0;
  // Loop processing stored expense records
  for (let i = 0; i < expenses.length; i++) {
    total += expenses[i].amount;
  }
  return total;
}

/**
 * Evaluates budget status using conditional statements and updates alert banner.
 * @param {number} remaining Balance left after total expenses
 */
function evaluateBudgetStatus(remaining) {
  statusAlertEl.className = "alert-banner"; // Reset alert classes

  // Conditional decision making
  if (remaining < 0) {
    statusAlertEl.textContent = `⚠️ Warning: You have exceeded your budget by $${Math.abs(remaining).toFixed(2)}!`;
    statusAlertEl.classList.add("danger");
  } else if (remaining < 500) {
    statusAlertEl.textContent = `⚡ Caution: Low budget remaining ($${remaining.toFixed(2)} left). Plan carefully!`;
    statusAlertEl.classList.add("warning");
  } else {
    statusAlertEl.textContent = `✅ Great Job! Your spending is well within the allocated budget ($${remaining.toFixed(2)} remaining).`;
    statusAlertEl.classList.add("success");
  }
}

/**
 * Dynamically updates DOM elements based on application state.
 */
function updateDashboard() {
  const totalSpent = calculateTotalExpenses();
  const remaining = monthlyBudget - totalSpent;

  // 1. Update text content on the page
  displayBudgetEl.textContent = `$${monthlyBudget.toFixed(2)}`;
  displayTotalSpentEl.textContent = `$${totalSpent.toFixed(2)}`;
  displayRemainingEl.textContent = `$${remaining.toFixed(2)}`;

  // Color code remaining display based on condition
  if (remaining < 0) {
    displayRemainingEl.style.color = "var(--danger)";
  } else {
    displayRemainingEl.style.color = "var(--text)";
  }

  // 2. Evaluate condition and update status banner
  evaluateBudgetStatus(remaining);

  // 3. Clear existing grid and render cards dynamically via array loop
  cardsGridEl.innerHTML = "";

  expenses.forEach((expense) => {
    // Create card wrapper
    const cardEl = document.createElement("article");
    cardEl.className = "card";
    cardEl.setAttribute("tabindex", "0");

    // Populate inner HTML dynamically
    cardEl.innerHTML = `
      <div class="card-header">
        <span class="card-title">${expense.category}</span>
      </div>
      <div class="card-amount">$${expense.amount.toFixed(2)}</div>
      <div class="card-footer">
        <span>${expense.title}</span>
        <button class="btn-delete" data-id="${expense.id}">Delete</button>
      </div>
    `;

    cardsGridEl.appendChild(cardEl);
  });
}

// --- 4. EVENT LISTENERS & USER INTERACTIONS ---

/**
 * Handles adding a new expense record from user input.
 */
expenseFormEl.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent page refresh

  // Collect user input values from form DOM nodes
  const titleInput = document.getElementById("expense-title").value.trim();
  const amountInput = parseFloat(document.getElementById("expense-amount").value);
  const categoryInput = document.getElementById("expense-category").value;

  // Simple validation check
  if (!titleInput || isNaN(amountInput) || amountInput <= 0) {
    alert("Please enter a valid expense title and amount.");
    return;
  }

  // Create new record object
  const newExpense = {
    id: Date.now(),
    title: titleInput,
    amount: amountInput,
    category: categoryInput
  };

  // Push record into array collection
  expenses.push(newExpense);

  // Reset input form fields
  expenseFormEl.reset();

  // Trigger DOM updates
  updateDashboard();
});

/**
 * Event delegation to handle deletion of individual cards.
 */
cardsGridEl.addEventListener("click", function (event) {
  if (event.target.classList.contains("btn-delete")) {
    const recordId = Number(event.target.getAttribute("data-id"));

    // Filter out deleted record from array
    expenses = expenses.filter((item) => item.id !== recordId);

    // Re-render updated dashboard
    updateDashboard();
  }
});

// --- 5. INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
  updateDashboard();
});