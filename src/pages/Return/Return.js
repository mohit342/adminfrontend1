import React, { useState } from 'react';
import { ArrowUpRight, DollarSign, Package } from 'lucide-react';
import "./Return.css"
const Return = () => {
    const [requests, setRequests] = useState([
        {
          id: '1',
          orderId: 'ORD-2024-001',
          customer: 'Vikash Sharma',
          amount: 129,
          reason: 'Wrong size received',
          status: 'pending',
          date: '2024-03-15'
        },
        {
          id: '2',
          orderId: 'ORD-2024-002',
          customer: 'Anupam Singh',
          amount: 79,
          reason: 'Defective product',
          status: 'approved',
          date: '2024-03-14'
        },
        {
          id: '3',
          orderId: 'ORD-2024-003',
          customer: 'Sourabh prajapati',
          amount: 199,
          reason: 'Changed mind',
          status: 'rejected',
          date: '2024-03-13'
        },
      ]);
    
      const [statusFilter, setStatusFilter] = useState('all');
    
      const stats = {
        totalRequests: requests.length,
        pendingAmount: requests
          .filter(r => r.status === 'pending')
          .reduce((acc, curr) => acc + curr.amount, 0),
        approvalRate: (requests.filter(r => r.status === 'approved').length / requests.length * 100).toFixed(1)
      };
    
      const handleStatusChange = (requestId, newStatus) => {
        setRequests(requests.map(request =>
          request.id === requestId ? { ...request, status: newStatus } : request
        ));
      };
    
      const filteredRequests = requests.filter(request =>
        statusFilter === 'all' ? true : request.status === statusFilter
      );
    
      return (
        <div className="admin-container">
          <div className="header">
            <h1>Returns & Refunds Management</h1>
          </div>
    
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Total Requests</h3>
              <div className="value">
                <Package className="inline-block mr-2" size={20} />
                {stats.totalRequests}
              </div>
            </div>
            <div className="stat-card">
              <h3>Pending Amount</h3>
              <div className="value">
                {/* <DollarSign className="inline-block mr-2" size={20} /> */}
                ₹{stats.pendingAmount.toFixed(2)}
              </div>
            </div>
            <div className="stat-card">
              <h3>Approval Rate</h3>
              <div className="value">
                <ArrowUpRight className="inline-block mr-2" size={20} />
                {stats.approvalRate}%
              </div>
            </div>
          </div>
    
          <div className="requests-table">
            <div className="table-header">
              <h2>Recent Requests</h2>
            </div>
            
            <div className="filters">
              <select 
                className="filter-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Requests</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
    
            <table className="table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Reason</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((request) => (
                  <tr key={request.id}>
                    <td>{request.orderId}</td>
                    <td>{request.customer}</td>
                    <td>₹{request.amount.toFixed(2)}</td>
                    <td>{request.reason}</td>
                    <td>{request.date}</td>
                    <td>
                      <span className={`status-badge status-{request.status}`}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      {request.status === 'pending' && (
                        <>
                          <button
                            className="action-button approve-button"
                            onClick={() => handleStatusChange(request.id, 'approved')}
                          >
                            Approve
                          </button>
                          <button
                            className="action-button reject-button"
                            onClick={() => handleStatusChange(request.id, 'rejected')}
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
}

export default Return
