import { deleteOrder } from "./deleteOrder.js";

export async function loadOrders() {
  try {
    const res = await fetch("http://localhost:3000/orders");

    if (!res.ok) {
      throw new Error("Failed to fetch orders");
    }

    const orders = await res.json();

    // 🔥 DEBUG HERE (correct place)
    console.log("ORDERS:", orders);

    const table = document.getElementById("ordersTable");
    table.innerHTML = "";

    if (!orders || orders.length === 0) {
      table.innerHTML = `
        <tr>
          <td colspan="8" class="text-center py-6 text-gray-500">
            No orders yet
          </td>
        </tr>
      `;
      return;
    }

    orders.reverse().forEach(order => {
      console.log("ORDER ITEM:", order); // 🔥 extra safety debug

      const row = document.createElement("tr");
      row.classList.add("border-b");

      const items = order.items
        .map(item => {
          if (typeof item === "string") return item;
 const size = item.productSize ? `(${item.productSize})` : "";
          const color = item.productColor ? `${item.productColor}` : "";

          return `${size} ${color}`;
        })
        .join("<br>");

      const date = new Date(order.createdAt);

      const formattedDate = date.toLocaleString("en-KE", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      let statusColor = "bg-yellow-100 text-yellow-700";

      if (order.status === "paid") {
        statusColor = "bg-green-100 text-green-700";
      } else if (order.status === "failed") {
        statusColor = "bg-red-100 text-red-700";
      }

      const total = order.total || 0;

      row.innerHTML = `
        <td class="py-3 px-4 text-gray-500">${order.id}</td>
        <td class="py-3 px-4 text-gray-700">${formattedDate}</td>
        <td class="py-3 px-4 text-gray-500">${order.phone}</td>
        <td class="py-3 px-4 text-yellow-600">${order.pickup || "N/A"}</td>
        <td class="py-3 px-4 text-gray-600">${items}</td>
        <td class="py-3 px-4 font-semibold text-blue-600">KES ${total}</td>

        <td class="py-3 px-4">
          <span class="${statusColor} px-3 py-1 rounded-full text-sm">
            ${order.status}
          </span>
        </td>

        <td class="py-3 px-4">
          <button class="delete-btn bg-gray-500 text-white px-3 py-1 rounded hover:bg-red-600">
            Delete
          </button>
        </td>
      `;

      row.querySelector(".delete-btn").addEventListener("click", () => {
        deleteOrder(order.id);
      });

      table.appendChild(row);
    });

  } catch (error) {
    console.error("Failed to load orders:", error);

    const table = document.getElementById("ordersTable");
    table.innerHTML = `
      <tr>
        <td colspan="8" class="text-center py-6 text-red-500">
          Failed to load orders
        </td>
      </tr>
    `;
  }
}