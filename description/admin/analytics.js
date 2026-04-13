import { showMessage } from "../scripts/showMessage.js";

export function addStock() {
  const button = document.querySelector('.save-entry-button');
  if (!button) return;

  // Prevent duplicate listeners
  button.removeEventListener('click', handleAddStock);
  button.addEventListener('click', handleAddStock);

  // Load saved data
  loadStockData();

  // Auto set today's date
  const dateInput = document.getElementById('date');
  if (dateInput && !dateInput.value) {
    dateInput.value = new Date().toISOString().split('T')[0];
  }
}

/* =========================
   MAIN SAVE FUNCTION
========================= */
function handleAddStock() {
  const date =
    document.getElementById('date')?.value ||
    new Date().toISOString().split('T')[0];

  const product = document.getElementById('product').value.trim();
  const opening = document.getElementById('opening').value.trim();
  const closing = document.getElementById('closing').value.trim();
  const added = document.getElementById('added').value.trim();
  const cost = document.getElementById('cost').value.trim();

  // Validation
  if (!product || !opening || !closing || !cost) {
    showMessage('Please fill all required fields');
    return;
  }

  const openingNum = parseFloat(opening);
  const closingNum = parseFloat(closing);
  const addedNum = parseFloat(added) || 0;
  const costNum = parseFloat(cost);

  if (isNaN(openingNum) || isNaN(closingNum) || isNaN(costNum)) {
    showMessage('Please enter valid numbers', 'error');
    return;
  }

  if (openingNum < 0 || closingNum < 0 || addedNum < 0 || costNum < 0) {
    showMessage('Values cannot be negative', 'error');
    return;
  }

  const used = openingNum + addedNum - closingNum;

  const entry = {
    date,
    product,
    opening,
    closing,
    added,
    cost,
    used
  };

  let stockData = JSON.parse(localStorage.getItem('stockData')) || [];

  stockData.push(entry);

  localStorage.setItem('stockData', JSON.stringify(stockData));

  showMessage('entry saved successfully', 'success')

  const index = stockData.length - 1;
  appendToTable(entry, index);

  clearInputs();
}

/* =========================
   RENDER TABLE
========================= */
function appendToTable(entry, index) {
  const table = document.getElementById('stockTable');

  table.innerHTML += `
    <tr class="border-b">
      <td class="text-red-500">${entry.date}</td>
      <td class="text-gray-500">${entry.product}</td>
      <td>${entry.opening}</td>
      <td class="text-green-500">${entry.closing}</td>
      <td>${entry.added}</td>
      <td class="text-green-500">KES ${entry.cost}</td>
      <td>
        <button 
          onclick="deleteStock(${index})"
          class="bg-gray-500 text-white px-2 py-1 rounded">
          Delete
        </button>
      </td>
    </tr>
  `;
}

/* =========================
   LOAD DATA
========================= */
function loadStockData() {
  const table = document.getElementById('stockTable');
  if (!table) return;

  table.innerHTML = '';

  const stockData = JSON.parse(localStorage.getItem('stockData')) || [];

  stockData.forEach((entry, index) => {
    appendToTable(entry, index);
  });
}

/* =========================
   DELETE FUNCTION
========================= */
window.deleteStock = function (index) {
  let stockData = JSON.parse(localStorage.getItem('stockData')) || [];

  stockData.splice(index, 1);

  localStorage.setItem('stockData', JSON.stringify(stockData));

  loadStockData();

  showMessage('Entry deleted successfully');
};

/* =========================
   CLEAR INPUTS
========================= */
function clearInputs() {
  document.getElementById('product').value = '';
  document.getElementById('opening').value = '';
  document.getElementById('closing').value = '';
  document.getElementById('added').value = '';
  document.getElementById('cost').value = '';
}