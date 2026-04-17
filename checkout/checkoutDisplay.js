export function displayItems(){
    const cart = JSON.parse(localStorage.getItem('cart')) || []

    let accumulatorPattern = '';

    cart.forEach((product) =>{
        accumulatorPattern +=
        `<div class="flex justify-center">
        <img
          src="${product.productImage}"
          class="h-[100px] object-contain"
          alt=""/>
          </div>
        <div class="text-center">
          <p>${product.productColor}</p>
          <p>${product.productSize}</p>
          <p>${product.quantity}</p>
          </div>
        `

        const container = document.querySelector('.container-contain-html-js')

        if(container){
            container.innerHTML = accumulatorPattern
        }

      
    })
}