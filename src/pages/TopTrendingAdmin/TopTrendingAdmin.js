// src/components/TopTrendingAdmin.js
import React, { useEffect, useState } from "react";
import "./TopTrending.css";

const TopTrendingAdmin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkedProducts, setCheckedProducts] = useState(new Set()); // Track checked product IDs

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data.data || data.products || data);
        // Initialize checkedProducts based on is_trending
        const initialChecked = new Set(
          (data.data || data.products || data)
            .filter(product => product.is_trending)
            .map(product => product.id)
        );
        setCheckedProducts(initialChecked);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleToggleTrending = async (productId, isTrending) => {
    try {
      const newChecked = new Set(checkedProducts);
      if (isTrending) {
        newChecked.delete(productId);
      } else {
        if (checkedProducts.size >= 5) {
          alert("You can select a maximum of 5 products as trending.");
          return;
        }
        newChecked.add(productId);
      }

      const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isTrending: !isTrending }),
      });
      if (!response.ok) throw new Error("Failed to update trending status");

      const updatedProduct = await response.json();
      setProducts(products.map(product =>
        product.id === productId ? { ...product, is_trending: updatedProduct.data.is_trending } : product
      ));
      setCheckedProducts(newChecked);
    } catch (error) {
      console.error("Error updating trending status:", error);
      alert("Failed to update trending status");
    }
  };

  return (
    <div className="top-trending-admin">
      <h1>Manage Top Trending Products</h1>
      {checkedProducts.size >= 5 && (
        <div className="limit-warning">Maximum 5 products can be selected as trending.</div>
      )}
      {loading ? (
        <div>Loading products...</div>
      ) : (
        <table className="products-table">
          <thead>
            <tr>
              <th>Trending</th>
              <th>Name</th>
              <th>Price</th>
              
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={product.is_trending || false}
                    onChange={() => handleToggleTrending(product.id, product.is_trending)}
                    disabled={!product.is_trending && checkedProducts.size >= 5}
                  />
                </td>
                <td>{product.name}</td>
                <td>₹{typeof product.price === 'number' ? product.price.toFixed(2) : parseFloat(product.price).toFixed(2) || '0.00'}</td>
               
                <td>{product.stock_quantity || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      
    </div>
  );
};

export default TopTrendingAdmin;