import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminRedeemPoints.css';

const AdminRedeemPoints = () => {
  const [redeemRequests, setRedeemRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRedeemRequests = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/school-redeem-requests');
      setRedeemRequests(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching redeem requests:', err);
      setError('Failed to load redeem requests. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleApproveReject = async (id, status) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/school-redeem-request/${id}/approve`, { status });
      alert(response.data.message);
      fetchRedeemRequests(); // Refresh the list after action
    } catch (err) {
      console.error(`Error processing redeem request ${id}:`, err);
      alert(err.response?.data?.error || `Failed to ${status} redeem request.`);
    }
  };

  useEffect(() => {
    fetchRedeemRequests();
  }, []);

  return (
    <div className="admin-redeem-points-container">
      <h1>Redeem Points for School</h1>
      {loading ? (
        <p>Loading redeem requests...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="redeem-table">
          <div className="table-header">
            <span className="table-column">School ID</span>
            <span className="table-column">School Name</span>
            <span className="table-column">Points</span>
            <span className="table-column">Status</span>
            <span className="table-column">Created At</span>
            <span className="table-column">Actions</span>
          </div>
          {redeemRequests.length === 0 ? (
            <p>No redeem requests found.</p>
          ) : (
            redeemRequests.map((request) => (
              <div key={request.id} className="table-row">
                <span className="table-column">{request.school_id}</span>
                <span className="table-column">{request.school_name}</span>
                <span className="table-column">{request.points} pts</span>
                <span className="table-column">{request.status}</span>
                <span className="table-column">{new Date(request.created_at).toLocaleDateString()}</span>
                <span className="table-column">
                  {request.status === 'pending' && (
                    <>
                      <button
                        className="btn-primary"
                        onClick={() => handleApproveReject(request.id, 'approved')}
                      >
                        Approve
                      </button>
                      <button
                        className="btn-secondary"
                        onClick={() => handleApproveReject(request.id, 'rejected')}
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

export default AdminRedeemPoints;