import { renderToCart } from "./renderToCart.js";
import { updateQuantityIcon } from "./updateCartIcon.js";
import { calculateCost } from "./calculateCost.js";

export function minusFromCart(){
    const minusButton = document.querySelectorAll('.minus-button-html')
    const cart = JSON.parse(localStorage.getItem('cart'))  || [];

    minusButton.forEach((button) =>{
        button.addEventListener('click', ()=>{
       
           
            const cartId = button.dataset.cartId

         const minusProduct = cart.findIndex(p => p.cartId === cartId)

         if(minusProduct === -1){
            return
         }

         if(cart[minusProduct].quantity > 1){
            cart[minusProduct].quantity -= 1
         }
         else{
            cart.splice(minusProduct, 1)
         }
         localStorage.setItem('cart', JSON.stringify(cart))
         

          renderToCart()
             updateQuantityIcon()
             calculateCost()
        })
    })
}