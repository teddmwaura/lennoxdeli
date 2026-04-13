import { renderToCart } from "./renderToCart.js";

export function plusFromCart() {
  const plusButtons = document.querySelectorAll('.plus-button-html');

  plusButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;

      let cart = JSON.parse(localStorage.getItem('cart')) || [];

      const itemIndex = cart.findIndex(
        item => String(item.productId) === String(productId)
      );

      if (itemIndex === -1) return;

      cart[itemIndex].quantity += 1;

      localStorage.setItem('cart', JSON.stringify(cart));

      renderToCart(); // re-renders + re-attaches listeners
      window.location.reload();
    });
  });
}
