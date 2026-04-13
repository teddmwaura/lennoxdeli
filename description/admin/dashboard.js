// ==========================
// 1. SAVE CART WITH EXPIRY
// ==========================
export function saveCart(cart) {
    const cartData = {
        items: cart,
        expiry: Date.now() + 24 * 60 * 60 * 1000 // 1 day expiry
    };

    localStorage.setItem('cart', JSON.stringify(cartData));
}


// ==========================
// 2. DISPLAY SALES TODAY
// ==========================
export function salesToday() {
    const storedData = JSON.parse(localStorage.getItem('cart'));

    const appendToDashboard = document.querySelector('.append-todays-orders');

    if (!appendToDashboard) return;

    // If nothing stored
    if (!storedData) {
        appendToDashboard.innerHTML = `
            <tr>
                <td colspan="3" class="text-center py-4 text-gray-500">
                    No sales today
                </td>
            </tr>
        `;
        return;
    }

    // If expired → remove it
    if (Date.now() > storedData.expiry) {
        localStorage.removeItem('cart');

        appendToDashboard.innerHTML = `
            <tr>
                <td colspan="3" class="text-center py-4 text-gray-500">
                    No sales today (expired)
                </td>
            </tr>
        `;
        return;
    }

    const cart = storedData.items;

    let accumulatorPattern = '';

    storedData.forEach(item => {
        accumulatorPattern += `
            <tr class="border-b">
                <td class="py-2 px-3">${item.productColor}</td>
                <td class="py-2 px-3">${item.quantity} pkts/pcs/cups</td>
                <td class="py-2 px-3">${item.price}</td>
            </tr>
        `;
    });

    appendToDashboard.innerHTML = accumulatorPattern;
}