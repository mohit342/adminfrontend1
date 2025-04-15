import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (productId) => {
    navigate(`/edit-product/${productId}`);
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch products');
      }

      setProducts(result.data);
      setError(null);
    } catch (err) {
      setError('Failed to load products. Please try again later.');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.id.toString().includes(searchTerm)
  );

  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete product');
      }

      fetchProducts();
    } catch (err) {
      console.error('Error deleting product:', err);
      alert('Failed to delete product. Please try again.');
    }
  };

  const getStockStatus = (stockQuantity) => {
    if (stockQuantity === 0) return 'Out of Stock';
    if (stockQuantity < 10) return 'Low Stock';
    return 'In Stock';
  };

  if (loading) {
    return <div className="loading123">Loading products...</div>;
  }

  if (error) {
    return <div className="error-message123">{error}</div>;
  }

  return (
    <div className="product-list-container123">
      <div className="header-section123">
        <h2>Product List</h2>
        <div className="search-bar123">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      <table className="product-table123">
        <thead>
          <tr>
            <th>Product</th>
            <th>Product ID</th>
            <th>Price</th>
            
            <th>Stock</th>
            <th>Start Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map(product => (
            <tr key={product.id}>
              <td>
                <div className="product-info123">
                  <span>{product.name}</span>
                </div>
              </td>
              <td>#{product.id}</td>
              <td>₹{parseFloat(product.price).toFixed(2)}</td>
             
              <td>
                <span className={`stock-status123 ${getStockStatus(product.stock).toLowerCase().replace(' ', '-')}`}>
                  {getStockStatus(product.stock)}
                </span>
              </td>
              <td>{product.created_at}</td>
              <td>
                <div className="action-buttons123">
                  <button className="edit-btn123" onClick={() => handleEdit(product.id)}>Edit</button>
                  <button className="delete-btn123" onClick={() => handleDelete(product.id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
