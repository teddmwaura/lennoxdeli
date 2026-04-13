export function minusFromCart(){
    const minusButton = document.querySelectorAll('.minus-button-html')
    const cart = JSON.parse(localStorage.getItem('cart'))  || [];

    minusButton.forEach((button) =>{
        button.addEventListener('click', ()=>{
       
           
            const productId = button.dataset.productId

         const minusProduct = cart.findIndex(p => String(p.productId) === String(productId))

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
         window.location.reload();
        })
    })
}