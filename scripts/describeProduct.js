export function descriptionProductsHTML() {
  document.addEventListener('click', (e) => {
    if (!e.target.classList.contains('see-more-button-html')) return;

    const productId = e.target.dataset.productId;

    const localProducts = JSON.parse(localStorage.getItem('products')) || [];
    const jsonProducts = window.jsonProducts || [];
    const allProducts = [...jsonProducts, ...localProducts];

    const matchingItem = allProducts.find(
      p => String(p.productId) === String(productId)
    );

    if (matchingItem) {
      localStorage.setItem('selectedProduct', JSON.stringify(matchingItem));
      window.location.href = 'description.html';
    } else {
      console.warn('Product not found for description page');
    }
  });
}