import { showMessage } from "../scripts/showMessage.js";
import { updateQuantityIcon } from "../cart/updateCartIcon.js";


export function describeProductPage() {

  const product = JSON.parse(localStorage.getItem('selectedProduct'));

  if (!product) {
    console.log('No product found');
    showMessage('no products was found', 'error')
    return;
  }

  const { productName, productColor, productPrice } = product;
  const displayDescriptionProduct = document.querySelector('.grid-contain-html');

  // ✅ Detect if product has sizes
  const hasSizes = typeof productPrice === 'object';

  // Track selections
  let selectedColor = productColor[0].name;
  let selectedImage = productColor[0].productImage;
  let selectedSize = null;

  /* ================== CREATE COLOR THUMBNAILS ================== */
  let thumbnailsHTML = '';

  productColor.forEach((color) => {
    thumbnailsHTML += `
      <div class="mr-4 cursor-pointer border-2 border-transparent">
        <img 
          src="${color.productImage}"
          data-image="${color.productImage}"
          data-color="${color.name}"
          class="thumbnail h-[70px] mix-blend-multiply rounded-2xl"
        >
        <div class="text-center"><p>${color.name}</p></div>
      </div>
    `;
  });

  /* ================== DYNAMIC PRICE + SIZE ================== */

  let priceHTML = '';
  let sizeHTML = '';

  if (hasSizes) {
    Object.entries(productPrice).forEach(([size, price]) => {
      priceHTML += `${size} - kes ${price} <br>`;

      sizeHTML += `
        <div class="size-option p-3 sm:p-4 text-white bg-gray-400 cursor-pointer rounded-xl">
          ${size}
        </div>
      `;
    });
  } else {
    priceHTML = `Ksh ${productPrice}`;
  }

  /* ================== MAIN HTML ================== */

  displayDescriptionProduct.innerHTML = `
    <div>
      <div class="flex justify-center">
        <img 
          src="${productColor[0].productImage}"
          class="product-main-image h-[200px] sm:h-[100px] md:h-[200px] mix-blend-multiply rounded-2xl"
        >
      </div>

      <div class="flex justify-center flex-wrap gap-3 mt-4">
        ${thumbnailsHTML}
      </div>
    </div>

    <div class="text-center px-4 sm:px-6 md:px-4 max-w-2xl mx-auto">
      <h2 class="mb-2 mt-3 text-lg sm:text-xl">@SnackWave</h2>
      <h1 class="text-xl sm:text-2xl md:text-3xl mb-2">${productName}</h1>

      <p class="mt-4 text-red-500 text-lg product-price">
        ${priceHTML}
      </p>

      ${
        hasSizes
          ? `
        <p class="mt-6 mb-3 font-medium">Size</p>
        <div class="flex justify-center flex-wrap gap-3">
          ${sizeHTML}
        </div>
      `
          : ''
      }

      <div class="mt-8">
        <button class="py-3 px-8 bg-gray-800 text-white rounded-2xl add-to-cart-btn">
          Add to Cart
        </button>
      </div>
    </div>
  `;
updateQuantityIcon()
  /* ================== IMAGE SWITCH ================== */

  const mainImage = document.querySelector('.product-main-image');
  const thumbnails = document.querySelectorAll('.thumbnail');

  thumbnails.forEach((thumb) => {
    thumb.addEventListener('click', () => {
      mainImage.src = thumb.dataset.image;
      selectedColor = thumb.dataset.color;
      selectedImage = thumb.dataset.image;
    });
  });

  /* ================== SIZE SELECT ================== */

  const sizes = document.querySelectorAll('.size-option');

  sizes.forEach((size) => {
    size.addEventListener('click', () => {
      sizes.forEach((s) => s.classList.remove('bg-black'));
      size.classList.add('bg-black');
      selectedSize = size.textContent.trim();
    });
  });

  /* ================== ADD TO CART ================== */

  const addToCartBtn = document.querySelector('.add-to-cart-btn');

  addToCartBtn.addEventListener('click', () => {
    // ✅ Only require size if product HAS sizes
    if (hasSizes && !selectedSize) {
   showMessage('please select size', '')
      return;
    }

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // ✅ Get correct price
    let finalPrice = hasSizes
      ? productPrice[selectedSize]
      : productPrice;

    const existingItem = cart.find(
      (item) =>
        item.productName === productName &&
        item.productColor === selectedColor &&
        item.productSize === selectedSize
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        productName: productName,
        productImage: selectedImage,
        productColor: selectedColor,
        productSize: selectedSize || '-',
        price: finalPrice,
        quantity: 1,
      
      });

      showMessage('product added successfully', 'success')
    }
    localStorage.setItem('cart', JSON.stringify(cart));

console.log(cart)

    // reset size after adding
    selectedSize = null;
    updateQuantityIcon()
  });
 
}

describeProductPage();
 