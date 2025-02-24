import React, { useState } from 'react';
import './PaymentTransactions.css';

const PaymentTransactions = () => {
  const [transactions, setTransactions] = useState([
    {
      id: 'TX123456',
      customer: 'Rahul Singh',
      amount: 149,
      paymentMethod: 'Credit Card',
      date: '2023-07-25 14:30',
      status: 'Success'
    },
    {
      id: 'TX123457',
      customer: 'Mohit',
      amount: 299,
      paymentMethod: 'PayPal',
      date: '2023-07-24 11:15',
      status: 'Pending'
    },
    {
      id: 'TX123458',
      customer: 'Kajal',
      amount: 99,
      paymentMethod: 'Stripe',
      date: '2023-07-23 09:45',
      status: 'Failed'
    },
    // Add more sample data as needed
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMethod = selectedMethod === 'all' || transaction.paymentMethod === selectedMethod;
    const matchesStatus = selectedStatus === 'all' || transaction.status === selectedStatus;
    
    return matchesSearch && matchesMethod && matchesStatus;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleRefund = (transactionId) => {
    console.log('Processing refund for:', transactionId);
    // Add refund logic here
  };

  return (
    <div className="payment-transactions-container">
      <div className="transactions-header">
        <h2>Payment Transactions</h2>
        <div className="transaction-controls">
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select value={selectedMethod} onChange={(e) => setSelectedMethod(e.target.value)}>
            <option value="all">All Methods</option>
            <option value="Credit Card">Credit Card</option>
            <option value="PayPal">PayPal</option>
            <option value="Stripe">Stripe</option>
          </select>
          <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
            <option value="all">All Statuses</option>
            <option value="Success">Success</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>
        </div>
      </div>

      <div className="transactions-table-container">
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Payment Method</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.map(transaction => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.customer}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.paymentMethod}</td>
                <td>{new Date(transaction.date).toLocaleString()}</td>
                <td>
                  <span className={`status-badge ${transaction.status.toLowerCase()}`}>
                    {transaction.status}
                  </span>
                </td>
                <td>
                  {transaction.status === 'Success' && (
                    <button 
                      className="refund-btn"
                      onClick={() => handleRefund(transaction.id)}
                    >
                      Refund
                    </button>
                  )}
                  <button className="details-btn">Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredTransactions.length / itemsPerPage) }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            className={currentPage === i + 1 ? 'active' : ''}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PaymentTransactions;