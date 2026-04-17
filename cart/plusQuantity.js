import { renderToCart } from "./renderToCart.js";
import { updateQuantityIcon } from "./updateCartIcon.js";
import { calculateCost } from "./calculateCost.js";


export function plusFromCart() {
  const plusButtons = document.querySelectorAll('.plus-button-html');
let cart = JSON.parse(localStorage.getItem('cart')) || [];

  plusButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const cartId = button.dataset.cartId;

       console.log(cartId)
      
      const itemIndex = cart.findIndex(item =>
       item.cartId === cartId
      );

      if (itemIndex === -1) return;

      cart[itemIndex].quantity += 1;

      localStorage.setItem('cart', JSON.stringify(cart));

      renderToCart();
      updateQuantityIcon();
      calculateCost();
    });
  });
}
