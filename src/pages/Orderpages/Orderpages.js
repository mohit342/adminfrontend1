import React, { useState, useEffect } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import "./Orderpages.css";

const OrderPages = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/orders");
      if (!response.ok) throw new Error("Failed to fetch orders");
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteOrder = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete order");
      setOrders(orders.filter((order) => order.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="order-container">
      <div className="order-header">
        <input type="text" placeholder="Search Orders..." className="search-input1" />
      </div>

      <table className="order-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Order Date</th>
            <th>Customer</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Total</th>
            <th>Items</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
  {orders.length > 0 ? (
    orders.map((order) => (
      <tr key={order.id}>
        <td>{order.id}</td>
        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
        <td>{order.fullName}</td>
        <td>{order.email}</td>
        <td>
          {order.address}, {order.city}, {order.state}, {order.pincode}
        </td>
        <td>{order.phone}</td>
        <td>{Number(order.total).toFixed(2)}</td>
        <td>
          {Array.isArray(order.items) // ✅ Check if items is an array
            ? order.items.map((item) => `${item.name} (x${item.quantity})`).join(", ")
            : JSON.parse(order.items)
                .map((item) => `${item.name} (x${item.quantity})`)
                .join(", ")}
        </td>
        <td>
          <div className="action-icons">
            <Eye className="icon view-icon" />
            <Pencil className="icon edit-icon" />
            <Trash2 className="icon delete-icon" onClick={() => deleteOrder(order.id)} />
          </div>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="9">No orders found</td>
    </tr>
  )}
</tbody>


      </table>
    </div>
  );
};

export default OrderPages;
