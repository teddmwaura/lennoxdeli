export function generateSystemInsights() {
  const insights = [];

  const stockData = JSON.parse(localStorage.getItem('stockData')) || [];
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const products = JSON.parse(localStorage.getItem('products')) || [];

  /* =========================
     INVENTORY INSIGHTS
  ========================= */
  stockData.forEach(item => {
    const opening = parseFloat(item.opening) || 0;
    const added = parseFloat(item.added) || 0;
    const closing = parseFloat(item.closing) || 0;

    const used = opening + added - closing;

    if (closing === 0) {
      insights.push(`⚠️ ${item.product} ran out of stock`);
    }

    if (used < opening * 0.5) {
      insights.push(`📉 Low usage of ${item.product}`);
    }
  });

  /* =========================
     ORDERS INSIGHTS
  ========================= */
  let totalRevenue = 0;

  orders.forEach(order => {
    totalRevenue += order.total || 0;
  });

  if (totalRevenue === 0) {
    insights.push("No sales recorded yet");
  }

  if (totalRevenue > 5000) {
    insights.push("🔥 High sales today!");
  }

  /* =========================
     CART INSIGHTS
  ========================= */
  if (cart.length > 0) {
    insights.push("🛒 You have pending items in cart");
  }

  /* =========================
     PRODUCT INSIGHTS
  ========================= */
  products.forEach(p => {
    if (p.stock <= 5) {
      insights.push(`⚠️ ${p.name} is low on stock`);
    }
  });

  return insights;
}