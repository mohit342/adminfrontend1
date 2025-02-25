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

      // Refresh the products list
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
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="product-list-container">
      <div className="header-section">
        <h2>Product List</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      <table className="product-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Product ID</th>
            <th>Price</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Start Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map(product => (
            <tr key={product.id}>
              <td>
                <div className="product-info">
                  {product.images && product.images.length > 0 && (
                    <img
                      src={`http://localhost:5000${product.images[0]}`}
                      alt={product.name}
                      className="product-thumbnail"
                    />
                  )}
                  <span>{product.name}</span>
                </div>
              </td>
              <td>#{product.id}</td>
              <td>₹{parseFloat(product.price).toFixed(2)}</td>
              <td>{product.category_name}</td>

              <td>
                <span className={`stock-status ${getStockStatus(product.stock).toLowerCase().replace(' ', '-')}`}>
                  {getStockStatus(product.stock)}
                </span>
              </td>
              <p> {product.created_at}</p> {/* Display the formatted date */}
              <td>
                <button className="edit-btn" onClick={() => handleEdit(product.id)}>Edit</button>

                <button className="delete-btn" onClick={() => handleDelete(product.id)}>Delete</button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;