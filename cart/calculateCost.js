export function calculateCost(){
  

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const calculateTotal = cart.reduce((sum, item)=>{
        return sum + (item.quantity * item.price )

    }, 0)
    const updateTotal = document.querySelector('.calculate-total-html')
    if(updateTotal){
        updateTotal.innerHTML = `<h1 class="text-2xl"><span class="text-gray-500 calculate-total-html">Total</span>: ksh ${calculateTotal}</h1>`
    

    }
}