export function calculateProfit() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  const totalRevenue = cart.reduce((sum, item) => {
    const price = parseFloat(item.price) || 0;
    const quantity = parseFloat(item.quantity) || 0;

    return sum + (price * quantity);
  }, 0);

  const stockData = JSON.parse(localStorage.getItem('stockData')) || [];

  const totalExpenses = stockData.reduce((sum, item) => {
    return sum + (parseFloat(item.cost) || 0);
  }, 0);

  const totalProfit = totalRevenue - totalExpenses;

  const totalProfitJS = document.querySelector('.span-total-profit');

  if (totalProfitJS) {
    totalProfitJS.innerHTML = `KES ${totalProfit}`;
  }
}