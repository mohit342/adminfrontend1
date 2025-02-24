import React, { useState } from 'react';
import './InvoiceBilling.css';

const InvoiceBilling = () => {
  const [invoices, setInvoices] = useState([
    {
      id: 'INV-001',
      client: 'Rahul Singh',
      date: '2023-07-25',
      dueDate: '2023-08-25',
      amount: 1499,
      status: 'Paid',
      items: 5
    },
    {
      id: 'INV-002',
      client: 'Mohit',
      date: '2023-07-20',
      dueDate: '2023-08-20',
      amount: 2999,
      status: 'Pending',
      items: 8
    },
    {
      id: 'INV-003',
      client: 'Design Studio',
      date: '2023-07-18',
      dueDate: '2023-08-18',
      amount: 899.99,
      status: 'Overdue',
      items: 3
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || invoice.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const deleteInvoice = (invoiceId) => {
    setInvoices(invoices.filter(invoice => invoice.id !== invoiceId));
  };

  return (
    <div className="invoice-container">
      <div className="invoice-header">
        <h2>Invoice Management</h2>
        <div className="invoice-controls">
          <input
            type="text"
            placeholder="Search invoices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">All Statuses</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Overdue">Overdue</option>
          </select>
          <button className="new-invoice-btn">+ New Invoice</button>
        </div>
      </div>

      <div className="invoice-summary-cards">
        <div className="summary-card total-invoices">
          <h3>Total Invoices</h3>
          <p>{invoices.length}</p>
        </div>
        <div className="summary-card total-paid">
          <h3>Total Paid</h3>
          <p>₹{invoices.filter(i => i.status === 'Paid').reduce((sum, i) => sum + i.amount, 0).toFixed(2)}</p>
        </div>
        <div className="summary-card total-pending">
          <h3>Pending</h3>
          <p>₹{invoices.filter(i => i.status === 'Pending').reduce((sum, i) => sum + i.amount, 0).toFixed(2)}</p>
        </div>
        <div className="summary-card total-overdue">
          <h3>Overdue</h3>
          <p>₹{invoices.filter(i => i.status === 'Overdue').reduce((sum, i) => sum + i.amount, 0).toFixed(2)}</p>
        </div>
      </div>

      <div className="invoice-table-container">
        <table className="invoice-table">
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Client</th>
              <th>Date</th>
              <th>Due Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Items</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.map(invoice => (
              <tr key={invoice.id}>
                <td>{invoice.id}</td>
                <td>{invoice.client}</td>
                <td>{new Date(invoice.date).toLocaleDateString()}</td>
                <td>{new Date(invoice.dueDate).toLocaleDateString()}</td>
                <td>₹{invoice.amount.toFixed(2)}</td>
                <td>
                  <span className={`status-badge ${invoice.status.toLowerCase()}`}>
                    {invoice.status}
                  </span>
                </td>
                <td>{invoice.items}</td>
                <td>
                  <button className="view-btn">View</button>
                  <button className="download-btn">Download</button>
                  <button 
                    className="delete-btn"
                    onClick={() => deleteInvoice(invoice.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceBilling;