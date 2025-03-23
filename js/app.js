let expenses = [];

// Global variable to track the entered budget amount
let budgetAmount = 0;
let mode = 'ADD_EXPENSE';
let expenseId = null;

// DOM Elements
const tableBody = document.querySelector('#expense-list-table-body');
const expenseAmountDiv = document.querySelector('#expense-amount-value');
const budgetAmountDiv = document.querySelector('#budget-amount-value');
const balanceAmountDiv = document.querySelector('#balance-amount-value');
const addOrEditExpenseButton = document.querySelector('.expense-add-edit');
const expenseTitleInput = document.querySelector('.expense-title');
const expenseAmountInput = document.querySelector('.expense-amount');
const budgetAmountInput = document.querySelector('.budget-amount');
const budgetAmountAddButton = document.querySelector('.budget-amount-add');

// Update Calculations
function calculateAndUpdateAmounts() {
  let expenseTotal = 0;
  expenses.forEach((expense) => {
    expenseTotal += expense.amount;
  });
  expenseAmountDiv.textContent = expenseTotal.toFixed(2) + '$';
  budgetAmountDiv.textContent = budgetAmount.toFixed(2) + '$';
  balanceAmountDiv.textContent = (budgetAmount - expenseTotal).toFixed(2) + '$';
}

// Updates the table body based on expense array
function updateExpenseList() {
  tableBody.innerHTML = '';
  expenses.forEach((expense, index) => {
    const tableRow = document.createElement('tr');
    tableRow.setAttribute('expense-id', `expense-${index + 1}`);

    const expenseTitleTableData = document.createElement('td');
    const expenseAmountTableData = document.createElement('td');
    const expenseActionsTableData = document.createElement('td');

    const expenseEditButton = document.createElement('button');
    const expenseRemoveButton = document.createElement('button');

    // Edit Expense
    expenseEditButton.addEventListener('click', () => {
      expenseTitleInput.value = expense.title;
      expenseAmountInput.value = expense.amount;

      mode = 'EDIT_EXPENSE';
      expenseId = expense.id;
      addOrEditExpenseButton.textContent = 'EDIT EXPENSE';
    });

    // Remove Expense
    expenseRemoveButton.addEventListener('click', () => {
      tableBody.removeChild(tableRow);
      expenses = expenses.filter((exp) => exp.id !== expense.id);
      calculateAndUpdateAmounts();
    });

    expenseEditButton.textContent = 'Edit';
    expenseRemoveButton.textContent = 'Remove';

    expenseActionsTableData.append(expenseEditButton, expenseRemoveButton);

    expenseTitleTableData.textContent = expense.title;
    expenseAmountTableData.textContent = expense.amount + '$';

    tableRow.append(expenseTitleTableData, expenseAmountTableData, expenseActionsTableData);
    tableBody.append(tableRow);
  });
}

// Add or edit expense
addOrEditExpenseButton.addEventListener('click', () => {
  const enteredExpenseTitle = expenseTitleInput.value?.trim();
  const enteredExpenseAmount = expenseAmountInput.value?.trim();

  if (mode === 'ADD_EXPENSE') {
    expenses.push({
      id: `expense-${expenses.length + 1}`,
      title: enteredExpenseTitle,
      amount: Number(enteredExpenseAmount),
    });
  } else if (mode === 'EDIT_EXPENSE' && expenseId) {
    const expense = expenses.find((exp) => exp.id === expenseId);
    expense.title = enteredExpenseTitle;
    expense.amount = Number(enteredExpenseAmount);
  }
  updateExpenseList();
  calculateAndUpdateAmounts();

  // RESET
  mode = 'ADD_EXPENSE';
  expenseId = null;
  addOrEditExpenseButton.textContent = 'ADD EXPENSE';
  expenseTitleInput.value = '';
  expenseAmountInput.value = '';
});

// Add Budget
budgetAmountAddButton.addEventListener('click', () => {
  const enteredBudgetAmountStr = budgetAmountInput.value.trim(); // '10000'
  const enteredBudgetAmount = Number(enteredBudgetAmountStr); // 10000
  if (enteredBudgetAmount > 0) {
    budgetAmount = enteredBudgetAmount;
    calculateAndUpdateAmounts(); // Call function to update calculations
  }
  budgetAmountInput.value = '';
});

// Load expenses and update calculations
document.addEventListener('DOMContentLoaded', () => {
  updateExpenseList();
  calculateAndUpdateAmounts();
});
