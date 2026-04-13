import { showMessage } from "../scripts/showMessage.js";
export function removeFromCart(){ 
    const cart = JSON.parse(localStorage.getItem('cart')) || []; 
    const deleteButtons = document.querySelectorAll('.remove-from-cart')
    
    deleteButtons.forEach((button)=>{ 
        button.addEventListener('click', ()=>{ 
            const productId = button.dataset.productId 

            console.log(productId) 
         

            const cartItem = cart.findIndex(p => String(p.productId) === String(productId)) 

            if(cartItem > -1){ cart.splice(cartItem, 1) } 
            localStorage.setItem('cart', JSON.stringify(cart)) 
          
            window.location.reload();

            showMessage('product removed successfully', 'success')
         }) 
        }) 
    }