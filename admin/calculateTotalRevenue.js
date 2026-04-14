export function calculateTotalRevenue(){
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const totalRevenue = cart.reduce((sum, item) =>{
        return sum + (item.price * item.quantity)
    },0)

    const totalRevenuejs = document.querySelector('.span-total-revenue')

    if(totalRevenuejs){
        totalRevenuejs.innerHTML = `Kes ${totalRevenue}`
    }
}