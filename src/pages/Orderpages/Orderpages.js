import React from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import "./Orderpages.css";
import seating4 from "../../assets/images/seating4.jpg";
import plush2 from "../../assets/images/plush2.jpg";
import bio1 from "../../assets/images/bio1.jpg";

const orders = [
  {
    id: "P021",
    name: "chair",
    image: seating4,
    price: "89,622",
    quantity: 1038,
    date: "14/02/2024",
    status: "Success",
  },
  {
    id: "P001",
    name: "Science kit",
    image: bio1,
    price: "2,07,600",
    quantity: 2000,
    date: "04/02/2025",
    status: "Pending",
  },
  {
    id: "P002",
    name: "soft toys",
    image: plush2,
    price: "1,45,500",
    quantity: 1638,
    date: "17/01/2025",
    status: "Cancel",
  },
  {
    id: "P021",
    name: "chair",
    image: seating4,
    price: "89,622",
    quantity: 1038,
    date: "30/01/2025",
    status: "Success",
  },
  {
    id: "P001",
    name: "Science kit",
    image: bio1,
    price: "2,07,600",
    quantity: 2000,
    date: "21/01/2025",
    status: "Pending",
  },
  {
    id: "P002",
    name: "soft toys",
    image: plush2,
    price: "1,45,500",
    quantity: 1638,
    date: "07/02/2025",
    status: "Cancel",
  },
  {
    id: "P021",
    name: "chair",
    image: seating4,
    price: "89,622",
    quantity: 1038,
    date: "02/02/2025",
    status: "Success",
  },
  {
    id: "P001",
    name: "Science kit",
    image: bio1,
    price: "2,07,600",
    quantity: 2000,
    date: "24/01/2025",
    status: "Pending",
  },
  {
    id: "P002",
    name: "soft toys",
    image: plush2,
    price: "1,45,500",
    quantity: 1638,
    date: "04/02/2025",
    status: "Cancel",
  },
  {
    id: "P021",
    name: "chair",
    image: seating4,
    price: "89,622",
    quantity: 1038,
    date: "25/01/2025",
    status: "Success",
  },
  {
    id: "P001",
    name: "Science kit",
    image: bio1,
    price: "2,07,600",
    quantity: 2000,
    date: "06/12/2024",
    status: "Pending",
  },
  {
    id: "P002",
    name: "soft toys",
    image: plush2,
    price: "1,45,500",
    quantity: 1638,
    date: "07/02/2025",
    status: "Cancel",
  },
  
   
];

const OrderPages = () => {
  return (
    <div className="order-container">
      <div className="order-header">
        <input
          type="text"
          placeholder="Search here Product..."
          className="search-input1"
        />
      </div>

      <table className="order-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Order ID</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>
                <div className="product-info">
                  <img
                    src={order.image}
                    alt={order.name}
                    className="product-image"
                  />
                  {order.name}
                </div>
              </td>
              <td>{order.id}</td>
              <td>{order.price}</td>
              <td>{order.quantity}</td>
              <td>{order.date}</td>

              {/* Status Button */}
              <td>
                <button className={`status ${order.status.toLowerCase()}`}>
                  {order.status}
                </button>
              </td>

              {/* Action Icons */}
              <td>
                <div className="action-icons">
                  <Eye className="icon view-icon" />
                  <Pencil className="icon edit-icon" />
                  <Trash2 className="icon delete-icon" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderPages;
