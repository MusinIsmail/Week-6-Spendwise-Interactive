# SpendWise - Interactive Financial Dashboard

SpendWise is an interactive personal finance dashboard built to manage monthly expenses, evaluate budget health in real-time, and provide visual spending insights.

---

## Improvements Made to SpendWise

In this version, SpendWise was transformed from a static UI layout into a fully dynamic web application powered by JavaScript:

1. **Interactive Data Management**: Replaced static HTML cards with dynamic rendering driven by JavaScript arrays and objects.
2. **Real-Time Input Collection**: Added an interactive form allowing users to input new expenses directly on the page without reloading.
3. **Dynamic Feedback Banners**: Created an adaptive alert system that automatically notifies users if they are safe, low on funds, or over budget.
4. **Record Deletion**: Integrated deletion support for individual category cards, updating total balances immediately.

---

## How Conditionals Are Used

Conditional logic (`if / else if / else`) is utilized in key areas of the application:

* **Budget Status Evaluation**: The `evaluateBudgetStatus()` function checks remaining funds against predefined thresholds:
  * If `remaining < 0`: Displays a critical warning banner (`danger` class) indicating overspending.
  * If `remaining < 500`: Displays a caution banner (`warning` class) advising budget restraint.
  * Otherwise: Displays an encouraging success message (`success` class).
* **Input Validation**: Ensures users cannot submit blank titles or non-numeric/negative amounts.
* **Dynamic Styling**: Adjusts remaining balance text colors conditionally based on account health.

---

## How Arrays Are Used to Store Data

Expense entries are stored in a centralized array of objects named `expenses`:

```javascript
let expenses = [
  { id: 1, title: "Groceries & Dining", amount: 470.0, category: "🍔 Food & Dining" },
  { id: 2, title: "Fuel & Transportation", amount: 180.0, category: "🚗 Transportation" }
];