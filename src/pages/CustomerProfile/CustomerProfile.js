import React, { useState } from 'react';
import './CustomerProfile.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CustomerProfile = () => {
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [selectedPeriod, setSelectedPeriod] = useState('all_time');

    // Mock data - replace with real data from API
    const customer = {
        id: 1001,
        name: "John Doe",
        email: "john@example.com",
        phone: "+1 555-123-4567",
        joinDate: "2022-03-15",
        lastOrder: "2023-08-20",
        totalOrders: 15,
        totalSpent: 4523.50,
        avgOrderValue: 301.57,
        loyaltyPoints: 2450,
        profileImage: "https://via.placeholder.com/150"
    };

    const orders = [
        { id: 5001, date: "2023-08-20", amount: 299.99, status: "Delivered", items: 3 },
        { id: 5002, date: "2023-08-15", amount: 149.99, status: "Processing", items: 2 },
        // Add more orders...
    ];

    const activityTimeline = [
        { date: "2023-08-20", event: "Placed Order #5001", type: "order" },
        { date: "2023-08-18", event: "Account Updated", type: "account" },
        { date: "2023-08-15", event: "Placed Order #5002", type: "order" },
        // Add more activities...
    ];

    const spendingData = [
        { month: 'Jan', amount: 400 },
        { month: 'Feb', amount: 600 },
        { month: 'Mar', amount: 800 },
        // Add more data...
    ];

    const handleExport = (format) => {
        console.log(`Exporting ${format} for customer ${customer.id}`);
        alert(`Exporting customer data as ${format.toUpperCase()}`);
    };

    return (
        <div className="customer-profile-container">
            <div className="profile-header">
                <img 
                    src={customer.profileImage} 
                    alt="Profile" 
                    className="profile-image"
                />
                <div className="profile-info">
                    <h1 className="profile-name">{customer.name}</h1>
                    <div className="profile-meta">
                        <p>Customer ID: #{customer.id}</p>
                        <p>Email: {customer.email}</p>
                        <p>Phone: {customer.phone}</p>
                        <p>Member Since: {new Date(customer.joinDate).toLocaleDateString()}</p>
                    </div>
                </div>
            </div>

            <div className="metrics-grid">
                <div className="metric-card">
                    <div className="metric-value">{customer.totalOrders}</div>
                    <div className="metric-label">Total Orders</div>
                </div>
                <div className="metric-card">
                    <div className="metric-value">${customer.totalSpent.toLocaleString()}</div>
                    <div className="metric-label">Total Spent</div>
                </div>
                <div className="metric-card">
                    <div className="metric-value">${customer.avgOrderValue.toFixed(2)}</div>
                    <div className="metric-label">Avg. Order Value</div>
                </div>
                <div className="metric-card">
                    <div className="metric-value">{customer.loyaltyPoints}</div>
                    <div className="metric-label">Loyalty Points</div>
                </div>
            </div>

            <div className="order-filters">
                <div className="filter-group">
                    <label>Order Status</label>
                    <select
                        className="filter-select"
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                        <option value="all">All Statuses</option>
                        <option value="delivered">Delivered</option>
                        <option value="processing">Processing</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
                <div className="filter-group">
                    <label>Time Period</label>
                    <select
                        className="filter-select"
                        value={selectedPeriod}
                        onChange={(e) => setSelectedPeriod(e.target.value)}
                    >
                        <option value="all_time">All Time</option>
                        <option value="last_30_days">Last 30 Days</option>
                        <option value="last_6_months">Last 6 Months</option>
                    </select>
                </div>
            </div>

            <h2>Spending Overview</h2>
            <div style={{ height: 300, marginBottom: 40 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={spendingData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line 
                            type="monotone" 
                            dataKey="amount" 
                            stroke="#007bff" 
                            strokeWidth={2}
                            name="Monthly Spending ($)"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <h2>Order History</h2>
            <table className="order-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Items</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td>#{order.id}</td>
                            <td>{new Date(order.date).toLocaleDateString()}</td>
                            <td>{order.items}</td>
                            <td>${order.amount.toFixed(2)}</td>
                            <td>
                                <span className={`badge ${
                                    order.status === 'Delivered' ? 'badge-success' :
                                    order.status === 'Processing' ? 'badge-warning' :
                                    'badge-danger'
                                }`}>
                                    {order.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Activity Timeline</h2>
            <div className="activity-timeline">
                {activityTimeline.map((activity, index) => (
                    <div key={index} className="timeline-item">
                        <div className="timeline-date">
                            {new Date(activity.date).toLocaleDateString()}
                        </div>
                        <div className="timeline-content">
                            {activity.event}
                        </div>
                    </div>
                ))}
            </div>

            <div className="export-buttons">
                <button className="btn btn-primary" onClick={() => handleExport('csv')}>
                    Export Order History (CSV)
                </button>
                <button className="btn btn-success" onClick={() => handleExport('pdf')}>
                    Export Full Profile (PDF)
                </button>
            </div>
        </div>
    );
};

export default CustomerProfile;