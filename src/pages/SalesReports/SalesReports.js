import React, { useState } from 'react';
import './SalesReports.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SalesReports = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('last_30_days');
    const [selectedRegion, setSelectedRegion] = useState('all');
    const [selectedCategory, setSelectedCategory] = useState('all');

    // Mock data - replace with real data from API
    const salesData = [
        { date: '2023-08-01', sales: 4000, orders: 24 },
        { date: '2023-08-02', sales: 3000, orders: 13 },
        { date: '2023-08-03', sales: 5000, orders: 28 },
        { date: '2023-08-04', sales: 4500, orders: 22 },
        { date: '2023-08-05', sales: 6000, orders: 31 },
    ];

    const tableData = [
        { id: 1, orderId: '#1234', date: '2023-08-01', customer: 'Sourabh Prjapati', amount: 149, status: 'Completed' },
        { id: 2, orderId: '#1235', date: '2023-08-02', customer: 'Kajal Singh', amount: 299, status: 'Pending' },
        { id: 3, orderId: '#1236', date: '2023-08-03', customer: 'Vikash Sharma', amount: 99, status: 'Completed' },
    ];

    const metrics = {
        totalRevenue: 45999,
        totalOrders: 234,
        averageOrderValue: 196,
        newCustomers: 45
    };

    const handleExport = (format) => {
        console.log(`Exporting report as ${format}`);
        alert(`Exporting report as ${format.toUpperCase()}`);
    };

    return (
        <div className="sales-reports-container">
            {/* <div className="report-header">
                <h1>Sales & Revenue Reports</h1>
                <div className="export-buttons">
                    <button className="btn btn-primary" onClick={() => handleExport('csv')}>
                        Export CSV
                    </button>
                    <button className="btn btn-success" onClick={() => handleExport('pdf')}>
                        Export PDF
                    </button>
                </div>
            </div> */}

            <div className="metrics-grid">
                <div className="metric-card">
                    <h3>Total Revenue</h3>
                    <div className="metric-value">₹{metrics.totalRevenue.toLocaleString()}</div>
                </div>
                <div className="metric-card">
                    <h3>Total Orders</h3>
                    <div className="metric-value">{metrics.totalOrders}</div>
                </div>
                <div className="metric-card">
                    <h3>Average Order Value</h3>
                    <div className="metric-value">₹{metrics.averageOrderValue.toFixed(2)}</div>
                </div>
                <div className="metric-card">
                    <h3>New Customers</h3>
                    <div className="metric-value">{metrics.newCustomers}</div>
                </div>
            </div>

            <div className="report-filters">
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
                        <option value="custom">Custom</option>
                    </select>
                </div>
                <div className="filter-group">
                    <label>Region</label>
                    <select
                        className="filter-select"
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                    >
                        <option value="all">All Regions</option>
                        <option value="north">North</option>
                        <option value="south">South</option>
                        <option value="east">East</option>
                        <option value="west">West</option>
                    </select>
                </div>
                <div className="filter-group">
                    <label>Category</label>
                    <select
                        className="filter-select"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="all">All Categories</option>
                        <option value="electronics">Electronics</option>
                        <option value="clothing">Clothing</option>
                        <option value="home">Home Goods</option>
                    </select>
                </div>
            </div>

            <div className="chart-container">
                <h2>Sales Overview</h2>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="sales" fill="#8884d8" name="Sales (₹)" />
                        <Bar dataKey="orders" fill="#82ca9d" name="Orders" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <h2>Recent Transactions</h2>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Customer</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((order) => (
                        <tr key={order.id}>
                            <td>{order.orderId}</td>
                            <td>{order.date}</td>
                            <td>{order.customer}</td>
                            <td>₹{order.amount.toFixed(2)}</td>
                            <td>
                                <span style={{
                                    color: order.status === 'Completed' ? '#28a745' : '#dc3545',
                                    fontWeight: 500
                                }}>
                                    {order.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SalesReports;