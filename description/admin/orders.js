export async function loadOrders() {
  try {
    const res = await fetch('http://localhost:3000/orders');
    const orders = await res.json();

    const table = document.getElementById('ordersTable');
    table.innerHTML = '';

    if (orders.length === 0) {
      table.innerHTML = `
        <tr>
          <td colspan="6" class="text-center py-6 text-gray-500">
            No orders yet
          </td>
        </tr>
      `;
      return;
    }

    orders.reverse().forEach(order => {
      const row = document.createElement('tr');
      row.classList.add('border-b');

      // ✅ FORMAT ITEMS (name + size + color)
      const items = order.items
        .map(item => {
          if (typeof item === "string") return item;

          //const name = item.productName || "Product";
          const size = item.productSize ? `(${item.productSize})` : "";
          const color = item.productColor ? `- ${item.productColor}` : "";

          return `${size} ${color}`;
        })
        .join('<br>'); // 👈 better display (each item on new line)

      // ✅ FORMAT DATE
      const date = new Date(order.createdAt);

      const formattedDate = date.toLocaleString('en-KE', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      // ✅ STATUS COLOR
      let statusColor = "bg-yellow-100 text-yellow-700";

      if (order.status === "paid") {
        statusColor = "bg-green-100 text-green-700";
      } else if (order.status === "cancelled") {
        statusColor = "bg-red-100 text-red-700";
      }

      row.innerHTML = `
        <td class="py-3 px-4 text-gray-500">${order.id}</td>
        <td class="py-3 px-4 text-red-500">${formattedDate}</td>
        <td class="py-3 px-4 text-gray-500">${order.phone}</td>
        <td class="py-3 px-4 text-yellow-500">${order.pickup || "N/A"}</td>
        <td class="py-3 px-4 text-green-500">${items}</td>
        <td class="py-3 px-4">
          <span class="${statusColor} px-3 py-1 rounded-full text-sm">
            ${order.status}
          </span>
        </td>
      `;

      table.appendChild(row);
    });

  } catch (error) {
    console.error("Failed to load orders:", error);
  }
}