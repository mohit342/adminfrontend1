import React, { useState, useEffect } from 'react';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample initial data
  const initialProducts = [
    {
      id: 1,
      name: 'Laptop Pro',
      price: 999,
      quantity: 150,
      sale: 45,
      stock: 'In Stock',
      startDate: '2023-03-15'
    },
    {
      id: 2,
      name: 'Smartphone X',
      price: 699,
      quantity: 200,
      sale: 120,
      stock: 'Low Stock',
      startDate: '2023-04-01'
    },
    // Add more sample data as needed
  ];

  useEffect(() => {
    setProducts(initialProducts);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.id.toString().includes(searchTerm)
  );

  const handleDelete = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  return (
    <div className="product-list-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <table className="product-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Product ID</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Sale</th>
            <th>Stock</th>
            <th>Start Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>#{product.id}</td>
              <td>₹{product.price.toFixed(2)}</td>
              <td>{product.quantity}</td>
              <td>{product.sale}</td>
              <td>
                <span className={`stock-status ${product.stock.toLowerCase().replace(' ', '-')}`}>
                  {product.stock}
                </span>
              </td>
              <td>{new Date(product.startDate).toLocaleDateString()}</td>
              <td>
                <button className="edit-btn">Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(product.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;