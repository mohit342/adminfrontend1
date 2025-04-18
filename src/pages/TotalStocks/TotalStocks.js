import React, { useState, useEffect } from 'react';
import './TotalStocks.css';

const TotalStocks = () => {
  const [stockData, setStockData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lowStockLevels, setLowStockLevels] = useState({});
  const [globalLowStockLevel, setGlobalLowStockLevel] = useState(10);
  const [orderProductId, setOrderProductId] = useState('');
  const [orderQuantity, setOrderQuantity] = useState(1);

  useEffect(() => {
    fetchStockData();
  }, []);

  const fetchStockData = async () => {
    try {
      setLoading(true);

      const productsResponse = await fetch('http://localhost:5000/api/products');
      if (!productsResponse.ok) {
        throw new Error(`Failed to fetch products: ${productsResponse.statusText}`);
      }
      const productsData = await productsResponse.json();
      
      if (!productsData || !Array.isArray(productsData.data)) {
        throw new Error('Invalid products data format');
      }

      const ordersResponse = await fetch('http://localhost:5000/api/orders');
      if (!ordersResponse.ok) {
        throw new Error(`Failed to fetch orders: ${ordersResponse.statusText}`);
      }
      const ordersData = await ordersResponse.json();

      const orders = Array.isArray(ordersData.data) ? ordersData.data : [];

      const processedStock = productsData.data.map(product => {
        const soldQuantity = orders
          .filter(order => order.product_id === product.id)
          .reduce((sum, order) => sum + (order.quantity || 0), 0);

        const currentStock = (product.stock_quantity || 0) - soldQuantity;
        const lowStockLevel = lowStockLevels[product.id] || product.low_stock_level || globalLowStockLevel;

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

  const handleLowStockChange = async (productId, newLevel) => {
    if (newLevel < 0) {
      alert('Low stock level cannot be negative.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ low_stock_level: newLevel }),
      });

      if (!response.ok) {
        throw new Error('Failed to update low stock level');
      }

      setLowStockLevels(prev => ({
        ...prev,
        [productId]: newLevel
      }));

      fetchStockData();
    } catch (err) {
      console.error('Error updating low stock level:', err);
      alert('Failed to update low stock level. Please try again.');
    }
  };

  const handleGlobalLowStockChange = async () => {
    if (globalLowStockLevel < 0) {
      alert('Global low stock level cannot be negative.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/products/batch-update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ low_stock_level: globalLowStockLevel }),
      });

      if (!response.ok) {
        throw new Error('Failed to update global low stock level');
      }

      setLowStockLevels({});
      fetchStockData();
      alert('Global low stock level updated successfully!');
    } catch (err) {
      console.error('Error updating global low stock level:', err);
      alert('Failed to update global low stock level. Please try again.');
    }
  };

  const handlePlaceOrder = async () => {
    if (!orderProductId || orderQuantity <= 0) {
      alert('Please select a product and enter a valid quantity.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: parseInt(orderProductId),
          quantity: orderQuantity,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to place order');
      }

      setOrderProductId('');
      setOrderQuantity(1);
      fetchStockData();
      alert('Order placed successfully!');
    } catch (err) {
      console.error('Error placing order:', err);
      alert(`Failed to place order: ${err.message}`);
    }
  };

  const filteredStocks = stockData.filter(item =>
    item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
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
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="global-low-stock">
        <label>Set Global Low Stock Level: </label>
        <input
          type="number"
          value={globalLowStockLevel}
          onChange={(e) => setGlobalLowStockLevel(parseInt(e.target.value) || 0)}
          min="0"
          style={{ width: '60px', marginRight: '10px' }}
        />
        <button onClick={handleGlobalLowStockChange}>Apply to All</button>
      </div>

      {/* <div className="place-order">
        <h3>Place Order</h3>
        <select
          value={orderProductId}
          onChange={(e) => setOrderProductId(e.target.value)}
          style={{ marginRight: '10px' }}
        >
          <option value="">Select Product</option>
          {stockData.map(item => (
            <option key={item.id} value={item.id}>{item.product}</option>
          ))}
        </select>
        <input
          type="number"
          value={orderQuantity}
          onChange={(e) => setOrderQuantity(parseInt(e.target.value) || 1)}
          min="1"
          style={{ width: '60px', marginRight: '10px' }}
        />
        <button onClick={handlePlaceOrder}>Place Order</button>
      </div> */}

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
                <td>
                  <input
                    type="number"
                    value={item.lowStockLevel}
                    onChange={(e) => handleLowStockChange(item.id, parseInt(e.target.value) || 0)}
                    min="0"
                    style={{ width: '60px' }}
                  />
                </td>
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