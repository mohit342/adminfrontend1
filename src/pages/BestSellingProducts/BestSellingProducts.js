import React, { useState } from 'react';
import './BestSellingProducts.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BestSellingProducts = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedPeriod, setSelectedPeriod] = useState('last_30_days');
    const [selectedSort, setSelectedSort] = useState('sales');

    // Mock data - replace with real data from API
    const products = [
        {
            id: 1,
            name: 'Premium Wireless Headphones',
            image: 'https://via.placeholder.com/300x200',
            price: 299.99,
            sold: 456,
            revenue: 136794.44,
            stock: 85,
            category: 'Electronics'
        },
        {
            id: 2,
            name: 'Organic Cotton T-Shirt',
            image: 'https://via.placeholder.com/300x200',
            price: 39.99,
            sold: 892,
            revenue: 35675.08,
            stock: 45,
            category: 'Apparel'
        },
        // Add more products...
    ];

    const salesData = [
        { product: 'Headphones', sales: 456 },
        { product: 'T-Shirt', sales: 892 },
        { product: 'Smart Watch', sales: 324 },
        { product: 'Running Shoes', sales: 567 },
    ];

    const handleExport = (format) => {
        console.log(`Exporting report as ${format}`);
        alert(`Exporting report as ${format.toUpperCase()}`);
    };

    return (
        <div className="bestselling-container">
            {/* <div className="page-header">
                <h1>Best Selling Products</h1>
                <div className="export-buttons">
                    <button className="btn btn-primary" onClick={() => handleExport('csv')}>
                        Export CSV
                    </button>
                    <button className="btn btn-success" onClick={() => handleExport('pdf')}>
                        Export PDF
                    </button>
                </div>
            </div> */}

            <div className="products-filter">
                <div className="filter-group">
                    <label>Category</label>
                    <select
                        className="filter-select"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="all">All Categories</option>
                        <option value="electronics">Electronics</option>
                        <option value="apparel">Apparel</option>
                        <option value="home">Home & Kitchen</option>
                    </select>
                </div>
                <div className="filter-group">
                    <label>Time Period</label>
                    <select
                        className="filter-select"
                        value={selectedPeriod}
                        onChange={(e) => setSelectedPeriod(e.target.value)}
                    >
                        <option value="last_7_days">Last 7 Days</option>
                        <option value="last_30_days">Last 30 Days</option>
                        <option value="last_quarter">Last Quarter</option>
                    </select>
                </div>
                <div className="filter-group">
                    <label>Sort By</label>
                    <select
                        className="filter-select"
                        value={selectedSort}
                        onChange={(e) => setSelectedSort(e.target.value)}
                    >
                        <option value="sales">Units Sold</option>
                        <option value="revenue">Total Revenue</option>
                        <option value="price">Price</option>
                    </select>
                </div>
            </div>

            <div className="chart-container">
                <h2>Sales Distribution</h2>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="product" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="sales" fill="#8884d8" name="Units Sold" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="products-grid">
                {products.map(product => (
                    <div key={product.id} className="product1-card">
                        <img 
                            src={product.image} 
                            alt={product.name}
                            className="product1-image"
                        />
                        <div className="product1-info">
                            <h3 className="product1-title">{product.name}</h3>
                            <div className="product1-stats">
                                <div className="stat-item">
                                    <div className="stat-label">Price</div>
                                    <div className="stat-value">${product.price}</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-label">Sold</div>
                                    <div className="stat-value">{product.sold}</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-label">Revenue</div>
                                    <div className="stat-value">₹{product.revenue.toLocaleString()}</div>
                                </div>
                            </div>
                            <div className="stock-progress">
                                <div 
                                    className="progress-bar" 
                                    style={{ width: `${product.stock}%` }}
                                ></div>
                            </div>
                            <div style={{ marginTop: '10px' }}>
                                <span className={`badge ${product.stock > 50 ? 'badge-success' : 'badge-warning'}`}>
                                    {product.stock}% in stock
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <h2>Detailed Product Performance</h2>
            <table className="products-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Units Sold</th>
                        <th>Revenue</th>
                        <th>Stock</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>₹{product.price}</td>
                            <td>{product.sold}</td>
                            <td>₹{product.revenue.toLocaleString()}</td>
                            <td>{product.stock}%</td>
                            <td>
                                <span className={`badge ${product.stock > 50 ? 'badge-success' : 'badge-warning'}`}>
                                    {product.stock > 50 ? 'In Stock' : 'Low Stock'}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BestSellingProducts;