import React, { useState, useEffect } from 'react';
import './TotalStocks.css';

const TotalStocks = () => {
  const [stockData, setStockData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data
  const sampleData = [
    {
      id: 1,
      product: "Science Kits",
      category: "Manipilatives",
      currentStock: 150,
      lowStockLevel: 20,
      status: "In Stock",
      lastUpdated: "2023-07-20"
    },
    {
      id: 2,
      product: "Pencils",
      category: "Writing Instrument",
      currentStock: 15,
      lowStockLevel: 25,
      status: "Low Stock",
      lastUpdated: "2023-07-19"
    },
    {
      id: 3,
      product: "Maths games",
      category: "education game",
      currentStock: 0,
      lowStockLevel: 15,
      status: "Out of Stock",
      lastUpdated: "2023-07-18"
    },
  ];

  useEffect(() => {
    setStockData(sampleData);
  }, []);

  const filteredStocks = stockData.filter(item =>
    item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="total-stocks-container">
      <div className="stocks-header">
        <h2>Inventory Management</h2>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="stock-summary-cards">
        <div className="summary-card total-products">
          <h3>Total Products</h3>
          <p>{stockData.length}</p>
        </div>
        
        <div className="summary-card in-stock">
          <h3>In Stock</h3>
          <p>{stockData.filter(item => item.status === "In Stock").length}</p>
        </div>

        <div className="summary-card low-stock">
          <h3>Low Stock</h3>
          <p>{stockData.filter(item => item.status === "Low Stock").length}</p>
        </div>

        <div className="summary-card out-of-stock">
          <h3>Out of Stock</h3>
          <p>{stockData.filter(item => item.status === "Out of Stock").length}</p>
        </div>
      </div>

      <div className="stock-table-container">
        <table className="stock-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Category</th>
              <th>Current Stock</th>
              <th>Low Stock Level</th>
              <th>Status</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {filteredStocks.map(item => (
              <tr key={item.id}>
                <td>{item.product}</td>
                <td>{item.category}</td>
                <td>{item.currentStock}</td>
                <td>{item.lowStockLevel}</td>
                <td>
                  <span className={`status-badge ${item.status.toLowerCase().replace(' ', '-')}`}>
                    {item.status}
                  </span>
                </td>
                <td>{new Date(item.lastUpdated).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TotalStocks;