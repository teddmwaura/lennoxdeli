export function calculateOrders(){
    const cart = JSON.parse(localStorage.getItem('cart')) || []

    const totalOrders = cart.reduce((sum, item) =>{
        return sum + (item.quantity)
    }, 0)

    const totalOrdersHtml = document.querySelector('.span-total-orders')
    if(totalOrdersHtml){
        totalOrdersHtml.innerHTML = totalOrders
    }
}