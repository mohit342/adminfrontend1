import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ReturnManagement.css';

const ReturnManagement = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReturnRequests = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orders/returns');
        
        // Format the response data
        const formattedRequests = response.data.map(request => ({
          ...request,
          items: Array.isArray(request.items) ? request.items : JSON.parse(request.items || '[]'),
          created_at: new Date(request.created_at).toLocaleDateString(),
          updated_at: request.updated_at ? new Date(request.updated_at).toLocaleDateString() : 'N/A'
        }));

        setRequests(formattedRequests);
        setLoading(false);
      } catch (err) {
        setError('Failed to load return requests');
        setLoading(false);
        console.error('Error fetching return requests:', err);
      }
    };

    fetchReturnRequests();
  }, []);

  const handleStatusUpdate = async (requestId, status) => {
    if (!['approved', 'rejected'].includes(status)) return;

    try {
      await axios.put(`http://localhost:5000/api/orders/returns/${requestId}`, { status });
      
      setRequests(prevRequests =>
        prevRequests.map(req =>
          req.id === requestId ? { ...req, status, updated_at: new Date().toLocaleDateString() } : req
        )
      );
      
      alert(`Return request ${status} successfully`);
    } catch (err) {
      alert('Failed to update return request status');
      console.error('Update error:', err);
    }
  };

  const getImageSrc = (item) => {
    try {
      if (item.images?.length > 0) {
        return `http://localhost:5000/${item.images[0].replace(/\\/g, "/")}`;
      }
      if (item.image) {
        return `http://localhost:5000/${item.image.replace(/\\/g, "/")}`;
      }
    } catch (error) {
      console.error('Error loading image:', error);
    }
    return 'http://localhost:5000/placeholder.jpg';
  };

  if (loading) return <div className="loading">Loading return requests...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="return-management-container">
      <h1>Return Requests Management</h1>
      
      {requests.length === 0 ? (
        <div className="no-requests">No return requests found</div>
      ) : (
        <div className="requests-list">
          {requests.map((request) => (
            <div key={request.id} className="request-card">
              <div className="request-header">
                <div className="request-meta">
                  <span className="request-id">Return ID: #{request.id}</span>
                  <span className="order-id">Order ID: #{request.order_id}</span>
                  <span className={`status-badge ${request.status}`}>
                    {request.status.toUpperCase()}
                  </span>
                </div>
                <div className="user-info">
                  <p>{request.fullName}</p>
                  <p>{request.email}</p>
                </div>
                <div className="dates">
                  <p>Submitted: {request.created_at}</p>
                  {request.updated_at && <p>Last Updated: {request.updated_at}</p>}
                </div>
              </div>

              <div className="request-body">
                <div className="items-section">
                  <h3>Items to Return</h3>
                  <div className="items-list">
                    {request.items.map((item, index) => (
                      <div key={index} className="item-card">
                        <img
                          src={getImageSrc(item)}
                          alt={item.name}
                          className="item-image"
                          onError={(e) => e.target.src = 'http://localhost:5000/placeholder.jpg'}
                        />
                        <div className="item-details">
                          <h4>{item.name}</h4>
                          <p>Quantity: {item.quantity}</p>
                          <p>Price: ₹{(Number(item.price) || 0).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="summary-section">
                  <div className="reason-box">
                    <h4>Return Reason</h4>
                    <p>{request.reason || 'No reason provided'}</p>
                  </div>
                  <div className="total-box">
                    <h4>Order Total</h4>
                    <p>₹{request.total?.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              {request.status === 'pending' && (
                <div className="action-buttons">
                  <button
                    className="approve-btn"
                    onClick={() => handleStatusUpdate(request.id, 'approved')}
                  >
                    Approve Return
                  </button>
                  <button
                    className="reject-btn"
                    onClick={() => handleStatusUpdate(request.id, 'rejected')}
                  >
                    Reject Return
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReturnManagement;