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
    const total = localStorage.getItem('total') || 0;

    // 🔴 validation 1: empty fields
    if (!pickup || !phone) {
      showMessage('Please fill in all required fields', 'error');
      return;
    }

    // 🔴 validation 2: empty cart
    if (cartItems.length === 0) {
      showMessage('Your cart is empty', 'error');
      return;
    }

    const orderData = {
      pickup,
      phone,
      items: cartItems,
      total,
      status: "pending",
      date: new Date()
    };

    try {
      showMessage('Placing your order...', 'info');

      const res = await fetch('http://localhost:3000/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });

      const data = await res.json();

      console.log(data);

      showMessage('Order placed successfully 🎉', 'success');

      // optional: clear cart after success
      localStorage.clear('cart');
    

    } catch (error) {
      console.error(error);
      showMessage('Something went wrong. Try again.', 'error');
    }
  });
}


displayItems();
calculateToCheckout()
orderFromCheckout()