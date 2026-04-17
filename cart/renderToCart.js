import { plusFromCart } from "./plusQuantity.js";
import { minusFromCart } from "./minusQuantity.js";
import { removeFromCart } from "./removeFromCart.js";

export function renderToCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  let accumulatorPattern = '';

  cart.forEach((cartItem) => {
    accumulatorPattern += `
      <div>
        <div>
          <i class="fa-solid fa-trash text-lg text-gray-500 cursor-pointer remove-from-cart" data-cart-id="${cartItem.cartId}"></i>
        </div>
      </div>

      <div>
        <div class="flex justify-center">
          <img src="${cartItem.productImage}" class="h-[100px] rounded-lg">
        </div>
      </div>

      <div><h2>${cartItem.productName}</h2></div>
      <div><h2>Ksh ${cartItem.price}</h2></div>
      <div><h2>${cartItem.productColor}</h2></div>
      <div><h2>${cartItem.productSize}</h2></div>

      <div class="flex justify-center">
     <h2 
  class="cursor-pointer mr-3 plus-button-html"
  data-cart-id="${cartItem.cartId}"

>
  +
</h2>

        <h2>${cartItem.quantity}</h2>

        <h2 class="cursor-pointer ml-3 minus-button-html"
            data-cart-id="${cartItem.cartId}">
          -
        </h2>
      </div>
    `;
  });

  const renderToMainHtml = document.querySelector('.render-product-html');

  if (renderToMainHtml) {
    renderToMainHtml.innerHTML = accumulatorPattern;
  }

  // ✅ NOW attach listeners AFTER rendering
  removeFromCart()
  plusFromCart();
  minusFromCart();
}