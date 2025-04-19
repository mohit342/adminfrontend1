import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminRedeemPage.css';

const AdminRedeemPage = () => {
  const [redeemRequests, setRedeemRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRedeemRequests = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/redeem-requests');
        setRedeemRequests(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching redeem requests:', err);
        setError('Failed to load redeem requests. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchRedeemRequests();
  }, []);

  const handleAction = async (requestId, action) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/redeem-request/${requestId}/approve`, {
        status: action,
      });

      if (response.status === 200) {
        setRedeemRequests(prevRequests =>
          prevRequests.map(request =>
            request.id === requestId ? { ...request, status: action } : request
          )
        );
        alert(`Request ${action} successfully!`);
      }
    } catch (error) {
      console.error(`Error ${action}ing redeem request:`, error);
      alert(`Failed to ${action} request. Please try again.`);
    }
  };

  return (
    <div className="admin-redeem-container">
      <h1>Admin Redeem Requests</h1>
      {loading ? (
        <p>Loading requests...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="redeem-requests-table">
          <div className="table-header">
            <span className="table-column">Request ID</span>
            <span className="table-column">SE ID</span>
            <span className="table-column">SE Name</span>
            <span className="table-column">Points</span>
            <span className="table-column">Status</span>
            <span className="table-column">Created At</span>
            <span className="table-column">Actions</span>
          </div>
          {redeemRequests.length === 0 ? (
            <p>No redeem requests found.</p>
          ) : (
            redeemRequests.map(request => (
              <div key={request.id} className="table-row">
                <span className="table-column">{request.id}</span>
                <span className="table-column">{request.se_id}</span>
                <span className="table-column">{request.se_name}</span>
                <span className="table-column">{request.points}</span>
                <span className="table-column">{request.status}</span>
                <span className="table-column">
                  {new Date(request.created_at).toLocaleDateString()}
                </span>
                <span className="table-column">
                  {request.status === 'pending' && (
                    <>
                      <button
                        className="btn-primary"
                        onClick={() => handleAction(request.id, 'approved')}
                      >
                        Approve
                      </button>
                      <button
                        className="btn-secondary"
                        onClick={() => handleAction(request.id, 'rejected')}
                        style={{ marginLeft: '10px' }}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AdminRedeemPage;