export function calculateExpenses() {
  const stockData = JSON.parse(localStorage.getItem('stockData')) || [];

  const totalExpenses = stockData.reduce((sum, item) => {
    return sum + (parseFloat(item.cost) || 0);
  }, 0);

  const calculateTotalExpenses = document.querySelector('.span-total-expenses');

  if (calculateTotalExpenses) {
    calculateTotalExpenses.innerHTML = `KES ${totalExpenses}`;
  }
}