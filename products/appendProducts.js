fetch('./productsSneeklab.json')
  .then(res => res.json())
  .then(data => {
    window.jsonProducts = data;
    appendToMainWebsite(); // 🔥 move it here
    
  });

function appendToMainWebsite(){
    let products = JSON.parse(localStorage.getItem('products')) || [];

    const jsonProducts = window.jsonProducts || [];

    const allProducts = [...jsonProducts, ...products]

    let accumulatorPattern = ''; // meaning its gonna be a string
    
    jsonProducts.forEach((product) =>{
        accumulatorPattern += `
        <div class="p-4 product-card w-full ">
  <div class="bg-[#efefef] flex justify-center items-center">
    <img 
      src="${product.productImage}" 
      alt="${product.productName}" 
      class="h-[100px] sm:h-[100px] md:h-[200px] mb-4 mix-blend-multiply cursor-pointer img-html-js
      see-more-button-html"
      data-product-id="${product.productId}"
      "
    data-aos="zoom-in">
  </div>

  <div class="mt-2">
    <p class="mb-2 text-base sm:text-md html-product-name">
      ${product.productName}
    </p>

    <!-- inputs -->
    <div class="flex flex-col gap-3 mb-4">
    <button 
        class="text-gray-500 text-sm sm:text-base text-left see-more-button-html"
        data-product-id="${product.productId}"
      >
        see more....
      </button>
    </div>
  </div>
</div>

        `;  
    });
    const appendContainer = document.querySelector('.products-container-html')

    if(appendContainer){
        appendContainer.innerHTML = accumulatorPattern;
    }
}
