import { displayItems } from "./checkoutDisplay.js";
import {calculateToCheckout} from "./calculateToCheckout.js"
import { showMessage } from "../scripts/showMessage.js";

function orderFromCheckout() {
  const form = document.querySelector('.checkout-form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const pickup = document.querySelector('.pickup-point').value.trim();
    const phone = document.querySelector('.phone-input').value.trim();

    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const total = Number(localStorage.getItem('total')) || 0;

    if (!pickup || !phone) {
      showMessage('Please fill in all required fields', 'error');
      return;
    }

    if (cartItems.length === 0) {
      showMessage('Your cart is empty', 'error');
      return;
    }

    try {
      showMessage('Creating order...', 'info');

      // =========================
      // 1. CREATE ORDER FIRST
      // =========================
      const orderRes = await fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          pickup,
          phone,
          items: cartItems,
          total,
          date: new Date().toISOString()
        })
      });

      const orderData = await orderRes.json();
      console.log(orderData);

      showMessage('Order created. Sending payment request...', 'info');

      // =========================
      // 2. TRIGGER STK PUSH
      // =========================
      const stkRes = await fetch('http://localhost:3000/stkpush', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          phone,
          amount: total
        })
      });

      const stkData = await stkRes.json();
      console.log(stkData);

      showMessage('Check your phone to complete payment 📲', 'success');

      // clear cart AFTER request
      localStorage.removeItem('cart');

    } catch (error) {
      console.error(error);
      showMessage('Something went wrong. Try again.', 'error');
    }
  });
}

displayItems();
calculateToCheckout()
orderFromCheckout()