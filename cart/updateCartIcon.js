export function updateQuantityIcon(){
    const cart = JSON.parse(localStorage.getItem('cart'))   || [];

    const addQuantity = cart.reduce((sum, item) => sum + item.quantity, 0)

    const updateIcon = document.querySelector('.update-cart-quantity-icon')

    if(updateIcon){
        updateIcon.innerHTML = addQuantity;
    }
    const updateCartIcon = document.querySelector('.update-cart-checkout-page')
    

    if(updateCartIcon){
        updateCartIcon.innerHTML = `(${addQuantity} Item/s) in the Cart`
    }
}