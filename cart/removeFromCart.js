import { showMessage } from "../scripts/showMessage.js";
import { calculateCost } from "./calculateCost.js";
import { updateQuantityIcon } from "./updateCartIcon.js";
import { renderToCart } from "./renderToCart.js";

export function removeFromCart(){ 
    const cart = JSON.parse(localStorage.getItem('cart')) || []; 
    const deleteButtons = document.querySelectorAll('.remove-from-cart')
    
    deleteButtons.forEach((button)=>{ 
        button.addEventListener('click', ()=>{ 
            const cartId = button.dataset.cartId

            console.log(cartId) 
         

            const cartItem = cart.findIndex(p => cartId === cartId) 

            if(cartItem > -1)
                { cart.splice(cartItem, 1) 

                } 
            localStorage.setItem('cart', JSON.stringify(cart)) 

            renderToCart()
            calculateCost()
            updateQuantityIcon()
            showMessage('product removed successfully', 'success')
         }) 
        }) 
    }