export function calculateToCheckout(){
    const cart = JSON.parse(localStorage.getItem('cart')) || []

    const updateCost = cart.reduce((sum, item) =>{
       return  sum + (item.quantity * item.price)
    }, 0)

    const updateTotal = document.querySelector('.js-display-price')

    if(updateTotal){
        updateTotal.innerHTML = `Kes ${updateCost}`
    }

      const containerPay = document.querySelector('.js-container-html')
        if(containerPay){
          containerPay.innerHTML = `pay Kes ${updateCost}`
        }
}