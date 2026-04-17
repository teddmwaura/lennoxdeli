import { loadOrders } from "./orders.js";
import { showMessage } from "../scripts/showMessage.js"; 

export async function deleteOrder(id) {
  try {
    const res = await fetch(`http://localhost:3000/orders/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Delete failed");
    }

    showMessage("Order deleted successfully", "success");

    // refresh table
    loadOrders();

  } catch (error) {
    
    showMessage(error.message, "error");
  }
}