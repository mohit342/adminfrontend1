import React, { useState, useEffect } from 'react';
import './Alluser.css';

const Alluser = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users');
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    
    try {
      console.log(`Sending DELETE request for user ID: ${userId}`);
      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: 'DELETE',
      });
      
      console.log('Response status:', response.status);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete user: ${errorText}`);
      }
      
      setUsers(users.filter(user => user.id !== userId));
      console.log('User deleted from state');
    } catch (err) {
      console.error('Delete error:', err.message);
      setError(err.message);
      fetchUsers(); // Refetch to sync with database
    }
  };

  const filteredUsers = users.filter(user =>
    user.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">Error: {error}</div>
        <button onClick={() => setError(null)}>Clear Error</button>
      </div>
    );
  }

  return (
    <div className="container13">
      <div className="header13">
        <h2 className="title13">All Users</h2>
        <div className="searchContainer13">
          <input
            type="text"
            placeholder="Search by Name, User, or Role..."
            className="searchInput13"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="table13">
        <div className="tableHeader13">
          <div>Name</div>
          <div>Email</div>
          <div>Mobile</div>
          <div>Role</div>
          <div>School Name</div>
          <div>SE ID</div>
          <div>Actions</div>
        </div>

        <div className="tableBody13">
          {loading ? (
            [...Array(5)].map((_, idx) => (
              <div key={idx} className="tableRow13 skeleton-row">
                <div className="skeleton"></div>
                <div className="skeleton"></div>
                <div className="skeleton"></div>
                <div className="skeleton"></div>
                <div className="skeleton"></div>
                <div className="skeleton"></div>
                <div className="skeleton"></div>
              </div>
            ))
          ) : filteredUsers.length > 0 ? (
            filteredUsers.map(user => (
              <div key={user.id} className="tableRow13">
                <div>{user.full_name}</div>
                <div>{user.email}</div>
                <div>{user.mobile}</div>
                <div>
                  <span className="role-badge">{user.role}</span>
                </div>
                <div>{user.school_name || '-'}</div>
                <div>{user.se_employee_id || '-'}</div>
                <div>
                  <button 
                    className="delete-button"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-data">No users found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Alluser;