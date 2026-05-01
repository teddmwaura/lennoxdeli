import { displayItems } from "./checkoutDisplay.js";
import {calculateToCheckout} from "./calculateToCheckout.js"
import { showMessage } from "../scripts/showMessage.js";
import { showSpinner } from "./waitingSpinner.js";
import { hideSpinner } from "./waitingSpinner.js";

export function orderFromCheckout() {
  const form = document.querySelector(".checkout-form");
  const spinner = document.getElementById("spinner");

  const BASE_URL = "https://backend-lennoxdeli.onrender.com";

  const showSpinner = () => spinner.classList.remove("hidden");
  const hideSpinner = () => spinner.classList.add("hidden");


  async function waitForPayment(orderId) {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/payment-status/${orderId}`
        );

        const data = await res.json();

        if (data.status === "paid") {
          clearInterval(interval);
          hideSpinner();
          showMessage("💰 Payment successful!", "success");
          localStorage.removeItem("cart");
        }

        if (data.status === "failed") {
          clearInterval(interval);
          hideSpinner();
          showMessage("❌ Payment failed", "error");
        }
      } catch (err) {
        console.error("Status check error:", err);
      }
    }, 3000);
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const pickup = document.querySelector(".pickup-point").value.trim();
    let phone = document.querySelector(".phone-input").value.trim();

    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    const amount = cartItems.reduce((sum, item) => {
      return sum + item.quantity * item.price;
    }, 0);

    if (!pickup || !phone || cartItems.length === 0) {
      showMessage("Fill all fields", "error");
      return;
    }

    if (phone.startsWith("0")) {
      phone = "254" + phone.slice(1);
    }

    try {
      showSpinner();
      showMessage("Creating order...", "info");

      // 1. CREATE ORDER
      const orderRes = await fetch(`${BASE_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pickup,
          phone,
          items: cartItems,
          total: amount,
        }),
      });

      const orderData = await orderRes.json();

      if (!orderData.order) {
        throw new Error("Order creation failed");
      }

      const orderId = orderData.order.id;

      showMessage("Sending STK...", "info");

      // 2. STK PUSH
      const stkRes = await fetch(`${BASE_URL}/stkpush`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone,
          amount,
          orderId,
        }),
      });

      const stkData = await stkRes.json();

      if (!stkRes.ok) {
        throw new Error(stkData.message || "STK failed");
      }

      showMessage("📲 Check your phone", "success");

      localStorage.removeItem("cart");

      // 3. WAIT FOR PAYMENT
      waitForPayment(orderId);

    } catch (err) {
      hideSpinner();
      showMessage(err.message, "error");
    }
  });
}

displayItems();
calculateToCheckout()
orderFromCheckout()