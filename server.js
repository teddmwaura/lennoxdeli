const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const FILE = 'orders.json';


// 🧠 Helper: read orders safely
function getOrders() {
  try {
    if (!fs.existsSync(FILE)) {
      fs.writeFileSync(FILE, '[]');
      return [];
    }

    const data = fs.readFileSync(FILE, 'utf-8');
    return JSON.parse(data || '[]');
  } catch (error) {
    console.log("Error reading orders:", error);
    return [];
  }
}


// 🧠 Helper: save orders
function saveOrders(orders) {
  fs.writeFileSync(FILE, JSON.stringify(orders, null, 2));
}


// 🟢 POST: create new order
app.post('/order', (req, res) => {
  try {
    const orders = getOrders();

    const newOrder = {
      id: Date.now(), // simple unique ID
      ...req.body,
      status: "pending",
      createdAt: new Date()
    };

    orders.push(newOrder);
    saveOrders(orders);

    console.log("New order received:", newOrder);

    res.json({
      message: "Order saved successfully",
      order: newOrder
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});


// 🔵 GET: all orders (ADMIN DASHBOARD)
app.get('/orders', (req, res) => {
  try {
    const orders = getOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});


// 🟡 GET: single order (optional but useful later)
app.get('/order/:id', (req, res) => {
  const orders = getOrders();

  const order = orders.find(o => o.id == req.params.id);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  res.json(order);
});


// 🚀 START SERVER
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});