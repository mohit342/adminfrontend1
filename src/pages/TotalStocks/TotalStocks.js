import React, { useState, useEffect } from 'react';
import './TotalStocks.css';

const TotalStocks = () => {
  const [stockData, setStockData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const DEFAULT_LOW_STOCK_LEVEL = 10;

  useEffect(() => {
    fetchStockData();

    // Listen for storage events to refresh stock
    const handleStorageChange = (e) => {
      if (e.key === 'refreshStock') {
        fetchStockData();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Refetch when window is focused
    const handleFocus = () => {
      fetchStockData();
    };

    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const fetchStockData = async () => {
    try {
      setLoading(true);

      const productsResponse = await fetch('http://localhost:5000/api/products');
      if (!productsResponse.ok) {
        throw new Error(`Failed to fetch products: ${productsResponse.statusText}`);
      }
      const productsData = await productsResponse.json();
      console.log(productsData);

      if (!productsData || !Array.isArray(productsData.data)) {
        throw new Error('Invalid products data format');
      }

      // Process stock data directly from products table
      const processedStock = productsData.data.map(product => {
        const currentStock = Number(product.stock_quantity) || 0;
        const lowStockLevel = product.low_stock_level || DEFAULT_LOW_STOCK_LEVEL;

        let status = 'In Stock';
        if (currentStock === 0) {
          status = 'Out of Stock';
        } else if (currentStock <= lowStockLevel) {
          status = 'Low Stock';
        }

        return {
          id: product.id,
          product: product.name || 'Unknown Product',
          category: product.category || 'Uncategorized',
          currentStock,
          lowStockLevel,
          status,
          lastUpdated: product.updated_at || product.created_at || new Date().toISOString()
        };
      });

      setStockData(processedStock);
      setError(null);
    } catch (err) {
      setError(`Failed to load stock data: ${err.message}`);
      console.error('Error fetching stock data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Updated filter to include Status
  const filteredStocks = stockData.filter(item =>
    item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="loading">Loading stock data...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="total-stocks-container">
      <div className="stocks-header">
        <h2>Inventory Management</h2>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by Product, Category, or Status..."
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